import test from 'node:test';
import assert from 'node:assert/strict';
import {EventBus,Inventory,GridManager,CraftingManager,FixedStepClock,SurvivalStats} from '../src/systems.js';
import {ITEMS,BLOCKS,RECIPES,RESEARCH,QUESTS,BIOMES,QUICKBAR} from '../src/data.js';
import {normalizeSave,reservedRecipe,readStoredSave,writeStoredSave,readBackup,SAVE_KEY,LEGACY_SAVE_KEY,IMPORT_BACKUP_KEY,PREVIOUS_SAVE_KEY,MAX_SAVE_BYTES} from '../src/persistence.js';
import {QuestManager} from '../src/progression.js';
const bus=()=>new EventBus();
const legacy=()=>({version:1,savedAt:100,simTime:30,inventory:{leaf:4,wood:8,rawFish:2},stats:{health:82,hunger:55,thirst:41},blocks:[{type:'foundation',x:0,y:0,z:0,core:true,hp:80,rotation:0},{type:'foundation',x:1,y:0,z:0,core:false,hp:100,rotation:0},{type:'workbench',x:0,y:1,z:0,core:false,hp:120,rotation:0},{type:'grill',x:1,y:1,z:0,core:false,hp:100,rotation:1}],research:['vine','copper'],time:{elapsed:482,weather:'storm'},raftPosition:[100,.02,-200],playerPosition:[100.4,.29,-199.7],world:{collected:['0,-1:cache'],discovered:['0,-1']},progress:{salvaged:8,built:2,water:1,islands:1,caches:1,rescued:false},notebook:[],quickbar:QUICKBAR,settings:{quality:'auto',volume:.2,relaxed:false,dynamicWeather:true,showHints:true}});
const memoryStorage=()=>{const data=new Map();return {data,getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};};

test('Inventory rejects unknown IDs, NaN, infinities, fractional and negative transactions atomically',()=>{
 const i=new Inventory(bus(),{wood:5});for(const n of [NaN,Infinity,-1,.5]){assert.equal(i.add('wood',n),false);assert.equal(i.remove('wood',n),false);assert.equal(i.spend({wood:n}),false);}assert.equal(i.spend({wood:2,unknown:1}),false);assert.equal(i.add('__proto__',2),false);assert.equal(i.count('wood'),5);assert.throws(()=>new Inventory(bus(),{unknown:1}));assert.equal(i.spend({}),true);
});
test('Directed support prevents stations from holding up unsupported structures sideways',()=>{
 const g=new GridManager(bus());g.add('foundation',0,0,0,true);g.add('foundation',1,0,0);g.add('workbench',0,1,0);g.add('grill',1,1,0);const detached=g.previewRemoval(g.at(1,0,0));assert.deepEqual(detached.map(b=>b.type),['grill']);assert.equal(g.blocks.size,4);g.remove(1,0,0);assert.equal(g.blocks.size,2);
});
test('Dismantle preview exactly matches cascaded removal; vertical decks retain a core path',()=>{
 const g=new GridManager(bus());g.add('foundation',0,0,0,true);g.add('foundation',1,0,0);g.add('wall',1,1,0);g.add('floor',1,2,0);g.add('floor',2,2,0);g.add('purifier',2,3,0);const expected=g.previewRemoval(g.at(1,1,0));const removed=g.remove(1,1,0);assert.deepEqual(removed.slice(1).map(b=>b.id),expected.map(b=>b.id));assert.equal(g.blocks.size,2);
});
test('Grid rejects fractional placement and accidental overwrites',()=>{const g=new GridManager(bus());g.add('foundation',0,0,0,true);assert.equal(g.canPlace('foundation',.2,0,0).valid,false);assert.throws(()=>g.add('foundation',0,0,0));});
test('Craft cancellation settles before callbacks; reentrancy cannot duplicate a refund',()=>{
 const b=bus(),i=new Inventory(b,{leaf:4}),c=new CraftingManager(i,b);c.start(RECIPES[0]);let callbacks=0;b.on('inventory',()=>{callbacks++;c.cancel();});c.cancel();assert.equal(i.count('leaf'),4);assert.equal(callbacks,1);assert.equal(c.job,null);
});
test('Craft completion clears reservations before output events or save callbacks',()=>{
 const b=bus(),i=new Inventory(b,{leaf:2}),c=new CraftingManager(i,b);c.start(RECIPES[0]);let observed;b.on('inventory',()=>observed=c.job);c.update(2);assert.equal(observed,null);assert.equal(i.count('rope'),2);c.cancel();assert.equal(i.count('leaf'),0);
});
test('V1 migration preserves inventory/progress, changes quality safely, does not replay old quest rewards',()=>{
 const v=legacy(),before=JSON.stringify(v),s=normalizeSave(v);assert.equal(s.version,2);assert.deepEqual(s.inventory,v.inventory);assert.deepEqual(s.raft.position,v.raftPosition);assert.deepEqual(s.player.position,v.playerPosition);assert.equal(s.settings.quality,'medium');assert.equal(s.settings.adaptiveQuality,true);assert.equal(s.crafting,null);assert.deepEqual(s.stationJobs,[]);assert.ok(s.quests.completed.includes('salvage'));assert.equal(JSON.stringify(v),before);
});
test('V2 roundtrip preserves motion, anchor, sail, player debuffs, camera and fires',()=>{
 const s=normalizeSave(legacy());Object.assign(s.raft,{velocity:[1.2,.1,-.4],verticalVelocity:.3,rotation:[.02,0,-.01],anchored:true,sailOpen:false,helming:false});Object.assign(s.player,{velocity:[.2,3,-.5],grounded:false,onRaft:false,swimming:true,stingCooldown:7,attackCooldown:.6});s.stats.stung=7;s.camera.selectedSlot=2;s.fires=[{key:'0,1,0',timer:4}];assert.deepEqual(normalizeSave(JSON.stringify(s)),s);
});
test('Saving/restoring an active reservation repeatedly neither refunds nor spends twice',()=>{
 let s=normalizeSave(legacy());s.inventory.leaf=2;s.crafting={recipeId:'rope',stationKey:'0,1,0',elapsed:1,variant:'default'};for(let k=0;k<10;k++)s=normalizeSave(JSON.stringify(s));assert.equal(s.inventory.leaf,2);
 const i=new Inventory(bus(),s.inventory),c=new CraftingManager(i,bus());c.job={recipe:reservedRecipe(s.crafting),elapsed:s.crafting.elapsed,stationKey:s.crafting.stationKey};c.update(1);c.update(3);assert.equal(i.count('rope'),2);assert.equal(i.count('leaf'),2);
});
test('A restored reservation cancels exactly once and returns its exact ingredients',()=>{
 const s=normalizeSave(legacy());s.inventory.leaf=2;s.crafting={recipeId:'rope',stationKey:'0,1,0',elapsed:.5,variant:'default'};const clean=normalizeSave(s),i=new Inventory(bus(),clean.inventory),c=new CraftingManager(i,bus());c.job={recipe:reservedRecipe(clean.crafting),elapsed:.5};assert.equal(c.cancel(),true);assert.equal(c.cancel(),false);assert.equal(i.count('leaf'),4);
});
test('Rainwater variants reserve no wood; a forged variant/output is rejected',()=>{
 const s=normalizeSave(legacy());s.blocks[3]={type:'purifier',x:1,y:1,z:0,hp:100,core:false,rotation:0,production:0};s.stationJobs=[{recipeId:'water',stationKey:'1,1,0',time:4,variant:'rain'}];const clean=normalizeSave(s);assert.deepEqual(reservedRecipe(clean.stationJobs[0]).ingredients,{});s.stationJobs[0].recipeId='spear';assert.throws(()=>normalizeSave(s),/rainwater/);
});
test('Import boundary rejects invalid versions, nonfinite stats, quantities, unknown IDs, duplicates and bad structures',()=>{
 for(const mutate of [s=>s.version=99,s=>s.version=0,s=>s.stats.thirst=NaN,s=>s.inventory.wood=-1,s=>s.inventory.wood=.5,s=>s.inventory.fake=1,s=>s.blocks.push({...s.blocks[0]}),s=>s.blocks[0].x=.2,s=>s.blocks[0].core=false,s=>s.blocks[2].x=5,s=>s.quickbar=['fake'],s=>s.world.collected=['not-a-resource']]) {const s=structuredClone(normalizeSave(legacy()));mutate(s);assert.throws(()=>normalizeSave(s));}
 assert.throws(()=>normalizeSave('{bad json'));assert.throws(()=>normalizeSave('{"version":2,"__proto__":{}}'),/Unsafe/);assert.throws(()=>normalizeSave(' '.repeat(MAX_SAVE_BYTES+1)),/2 MB/);
});
test('Import boundary rejects missing stations, completed jobs, double reservations and missing prerequisites',()=>{
 for(const job of [{recipeId:'rope',stationKey:'5,1,0',elapsed:0},{recipeId:'rope',stationKey:'0,1,0',elapsed:2},{recipeId:'water',stationKey:'0,1,0',elapsed:0}]){const s=normalizeSave(legacy());s.crafting=job;assert.throws(()=>normalizeSave(s));}
 const s=normalizeSave(legacy());s.crafting={recipeId:'cookedFish',stationKey:'1,1,0',elapsed:1};s.stationJobs=[{recipeId:'cookedFish',stationKey:'1,1,0',time:1}];assert.throws(()=>normalizeSave(s),/duplicate/);s.crafting=null;s.stationJobs=[];s.research=['relic'];assert.throws(()=>normalizeSave(s),/prerequisite/);
});
test('Storage migration prefers v2 and retains the original legacy save',()=>{
 const st=memoryStorage();st.setItem(LEGACY_SAVE_KEY,JSON.stringify(legacy()));const read=readStoredSave(st);assert.equal(read.migrated,true);writeStoredSave(st,read.data);assert.equal(readStoredSave(st).migrated,false);assert.ok(st.getItem(LEGACY_SAVE_KEY));
});
test('Invalid imports and storage failure leave the current voyage untouched',()=>{
 const st=memoryStorage(),s=normalizeSave(legacy());writeStoredSave(st,s);const before=st.getItem(SAVE_KEY);assert.throws(()=>writeStoredSave(st,{version:99},{importing:true}));assert.equal(st.getItem(SAVE_KEY),before);
 const unavailable={getItem:st.getItem,setItem:()=>{throw Error('quota');}};assert.throws(()=>writeStoredSave(unavailable,s),/quota/);assert.equal(st.getItem(SAVE_KEY),before);
});
test('Rotating and pre-import backups are valid and independent',()=>{
 const st=memoryStorage(),s=normalizeSave(legacy());writeStoredSave(st,s);s.inventory.wood=9;writeStoredSave(st,s);assert.equal(normalizeSave(st.getItem(PREVIOUS_SAVE_KEY)).inventory.wood,8);s.inventory.wood=10;writeStoredSave(st,s,{importing:true});assert.equal(normalizeSave(st.getItem(IMPORT_BACKUP_KEY)).inventory.wood,9);s.inventory.wood=11;writeStoredSave(st,s);assert.equal(readBackup(st).data.inventory.wood,9);
});
test('Fixed timestep is deterministic at 60, 15 and 5 FPS without catch-up drift',()=>{
 const results=[60,15,5].map(fps=>{const c=new FixedStepClock(),s=new SurvivalStats(bus(),{health:100,hunger:100,thirst:100});let elapsed=0;for(let i=0;i<fps*10;i++)c.advance(1/fps,dt=>{elapsed+=dt;s.update(dt);});return {steps:c.totalSteps,elapsed,thirst:s.thirst};});for(const r of results){assert.equal(r.steps,300);assert.ok(Math.abs(r.elapsed-10)<1e-8);assert.ok(Math.abs(r.thirst-95)<1e-8);}
});
test('Low FPS and hidden-tab stalls cap work, discard backlog and reset safely',()=>{
 const c=new FixedStepClock();let steps=0;c.advance(120,()=>steps++);assert.ok(steps<=8);assert.ok(c.droppedSeconds>119);c.reset();assert.equal(c.advance(0,()=>steps++),0);for(const dt of [NaN,Infinity,-1])assert.equal(c.advance(dt,()=>steps++),0);assert.equal(c.accumulator,0);
});
test('Quest rewards are exactly once across save/reload and reentrant callbacks',()=>{
 const b=bus(),i=new Inventory(b,{}),p={salvaged:4},research=new Set(),q=new QuestManager(b,i);b.on('inventory',()=>q.update(p,research));q.update(p,research);q.update(p,research);assert.equal(i.count('wood'),2);const restored=new QuestManager(b,i,q.toJSON());restored.update(p,research);assert.equal(i.count('wood'),2);
});
test('Research branches enforce discovery/prerequisites and preserve their materials',()=>{
 const i=new Inventory(bus(),{vine:1,resin:1}),c=new CraftingManager(i,bus());assert.equal(c.researchItem('resin'),false);assert.equal(c.researchItem('vine'),true);assert.equal(c.researchItem('resin'),true);assert.equal(i.count('resin'),1);assert.equal(c.researchItem('resin'),false);
});
test('All data-driven research, quest rewards and biome loot reference real content',()=>{
 for(const [id,r] of Object.entries(RESEARCH)){assert.ok(ITEMS[id]);assert.ok(BLOCKS[r.unlock]);for(const prerequisite of r.requires)assert.ok(RESEARCH[prerequisite]);}
 for(const q of QUESTS)for(const [id,n] of Object.entries(q.reward||{})){assert.ok(ITEMS[id]);assert.ok(Number.isInteger(n)&&n>0);}
 for(const b of BIOMES){assert.ok(ITEMS[b.special]);for(const id of Object.keys(b.poi.loot))assert.ok(ITEMS[id]);}
});

test('Multi-item grants/refunds are atomic to inventory callbacks and reject partial malformed grants',()=>{
 const b=bus(),i=new Inventory(b,{wood:2}),snapshots=[];b.on('inventory',()=>snapshots.push(i.toJSON()));assert.equal(i.grant({wood:3,scrap:2}),true);assert.deepEqual(snapshots,[{wood:5,scrap:2}]);assert.equal(i.grant({wood:2,scrap:NaN}),false);assert.deepEqual(i.toJSON(),{wood:5,scrap:2});
});
test('A legitimate V1 side-supported station migrates into a full-cost refund exactly once',()=>{
 const s=legacy();s.blocks=s.blocks.filter(b=>!(b.type==='foundation'&&b.x===1));const v2=normalizeSave(s);assert.equal(v2.blocks.some(b=>b.type==='grill'),false);assert.equal(v2.inventory.wood,s.inventory.wood+BLOCKS.grill.cost.wood);assert.equal(v2.inventory.scrap,BLOCKS.grill.cost.scrap);assert.deepEqual(normalizeSave(JSON.stringify(v2)),v2);const store=memoryStorage();store.setItem(LEGACY_SAVE_KEY,JSON.stringify(s));assert.equal(readStoredSave(store).compensatedBlocks,1);assert.equal(JSON.parse(store.getItem(LEGACY_SAVE_KEY)).blocks.length,s.blocks.length);
});
test('Truly detached V1 components are rejected safely, not converted into free materials',()=>{
 const s=legacy();s.blocks.push({type:'foundation',x:10,y:0,z:10,core:false,hp:100,rotation:0});assert.throws(()=>normalizeSave(s),/disconnected/);
});

test('Very small positive HP from fractional simulation damage is still a valid living snapshot',()=>{
 const s=legacy();s.stats.health=1e-12;s.blocks[0].hp=1e-12;const clean=normalizeSave(s);assert.equal(clean.stats.health,1e-12);assert.equal(clean.blocks[0].hp,1e-12);s.stats.health=0;assert.throws(()=>normalizeSave(s));
});
