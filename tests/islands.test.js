import {buildNavigation} from '../src/island-terrain.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {WorldGenerator,Ocean} from '../src/world.js';
import {EventBus,seededRandom} from '../src/systems.js';
import {BIOMES} from '../src/data.js';
import {disposeObject} from '../src/assets.js';
import {occupiedAt,obstacleTop} from '../src/island-generation.js';
import {puzzleSequence,validExplorationProgress,islandSeed} from '../src/exploration.js';
import {normalizeSave} from '../src/persistence.js';
import {QUALITY_PRESETS} from '../src/performance.js';
const make=()=>new WorldGenerator(new THREE.Scene(),new EventBus());
const create=(world,biome=0,seed=4281,radius=12.5,id='0,-1')=>{const i=world.generateIsland(id,28,-61,radius,biome,seed);world.islands.push(i);return i;};
function approach(world,island,r){
  for(const k of island.nav.reachable){const q=island.nav.point(k),d=Math.hypot(q.x-r.local.x,q.z-r.local.z,(q.y-r.position.y)*.65);if(d>2.1||Math.abs(q.y-r.position.y)>1.6)continue;const p=new THREE.Vector3(island.x+q.x,q.y,island.z+q.z);if(world.interactionClear(island,p,r.position,r.id))return p;}
  return null;
}
test('Six biome plans have distinct land/water silhouettes, layered geometry and finite routes',()=>{
 const signatures=new Set();for(let b=0;b<6;b++){const w=make(),i=create(w,b,4281,13);assert.ok(i.plan.heights.every(Number.isFinite));assert.equal(i.plan.heights.length,65*65);assert.ok(i.nav.reachable.length>70);assert.ok(i.plan.viewpoint.y>i.plan.landing.y+.5);signatures.add(i.plan.profile.shape);assert.ok(i.resources.some(r=>r.type==='journal'));assert.ok(i.resources.some(r=>r.type==='treasure'));assert.ok(i.vegetation.trees>=12);const bay=i.plan.toLocal(0,.55),center=i.plan.toLocal(0,0);if(b===0)assert.ok(i.plan.sample(bay.x,bay.z)<0);if(b===1)assert.ok(i.plan.sample(center.x,center.z)<0);disposeObject(i.group);}assert.equal(signatures.size,6);
});
test('Near rendered triangle height and walking sampler agree, including coves and cliffs',()=>{
 const random=seededRandom(7714);for(const b of [0,1,4]){const w=make(),i=create(w,b),ray=new THREE.Raycaster();i.terrain.updateMatrixWorld(true);for(let k=0;k<65;k++){const x=(random()*2-1)*i.plan.extent*.94,z=(random()*2-1)*i.plan.extent*.94;ray.set(new THREE.Vector3(x,30,z),new THREE.Vector3(0,-1,0));const hit=ray.intersectObject(i.terrain)[0];assert.ok(hit);assert.ok(Math.abs(hit.point.y-i.plan.sample(x,z))<.0003,`${b}: ${x},${z}`);}disposeObject(i.group);}
});
test('54 seeded biome layouts keep all legacy resources, separated pickups and reachable interactions',()=>{
 for(let b=0;b<6;b++)for(let s=0;s<9;s++){
  const w=make(),seed=1907+s*7103+b*43,id=`${s+20},${b+30}`,i=create(w,b,seed,10+s*.68,id),family=BIOMES[b%3];
  const secret=i.resources.find(r=>r.type==='treasure');assert.ok(Math.hypot(secret.local.x-i.plan.grotto.x,secret.local.z-i.plan.grotto.z)<1.2,'Hidden loot remains inside its accessible shelter');
  for(const p of [i.plan.landmark,i.plan.viewpoint,i.plan.grotto]){const q=i.nav.point(i.nav.closest(p,true));assert.ok(Math.hypot(q.x-p.x,q.z-p.z)<2.0,`${b}/${seed} landmark/viewpoint/grotto at ${p.x},${p.z}: nearest ${Math.hypot(q.x-p.x,q.z-p.z)}`);}
  const ids=i.resources.map(r=>r.id);assert.equal(new Set(ids).size,ids.length);for(let k=0;k<6;k++)assert.equal(i.resources.find(r=>r.id===`${id}:resource${k}`).type,family.resources[k%family.resources.length]);assert.equal(i.resources.find(r=>r.id===`${id}:special`).type,family.special);assert.ok(i.resources.some(r=>r.id===`${id}:poi:${family.poi.id}`));
  for(const r of i.resources){assert.ok(r.position.y>=-.10,`${b}/${seed}/${r.id} underwater`);assert.ok(approach(w,i,r),`${b}/${seed}/${r.id} inaccessible after ${i.placementRepairs} repairs`);assert.ok(w.navigationPath(i,r).length>0);}
  for(let a=0;a<i.resources.length;a++)for(let c=a+1;c<i.resources.length;c++){const p=i.resources[a],q=i.resources[c];assert.ok(Math.hypot(p.local.x-q.local.x,p.local.z-q.local.z)>.49,`${b}/${seed} overlapping ${p.id}/${q.id}`);}
  i.land.traverse(m=>{if(!m.isInstancedMesh)return;const mat=new THREE.Matrix4(),p=new THREE.Vector3();for(let j=0;j<m.instanceMatrix.count;j++){m.getMatrixAt(j,mat);p.setFromMatrixPosition(mat);const contact=p.y-i.plan.sample(p.x,p.z);assert.ok(contact<.022&&contact>(m.name.includes('-log-')?-.08:-.022),`${m.name} ground contact ${contact}`);}});
  disposeObject(i.group);
 }
});
test('Ordered waystones require the journal, persist prefixes, gate one-time treasure and retain architecture',()=>{
 const w=make();w.update(new THREE.Vector3());let i=w.islands.find(i=>i.id==='0,-1');const resource=t=>i.resources.find(r=>r.type===t),take=r=>w.collect({original:r,island:i}),treasure=resource('treasure');assert.equal(take(treasure),false);assert.equal(take(resource('rune')),false);assert.equal(take(resource('journal')),true);const sequence=i.puzzle.sequence;for(let k=0;k<3;k++){const rune=i.resources.find(r=>r.type==='rune'&&r.index===sequence[k]);assert.equal(take(rune),true);assert.equal(rune.mesh.visible,true);assert.ok(validExplorationProgress(w.toJSON().collected));}
 let treasureEvents=0;w.bus.on('resourceCollected',e=>{if(e.type==='treasure')treasureEvents++;});assert.equal(take(treasure),true);assert.equal(take(treasure),false);assert.equal(treasureEvents,1);assert.equal(treasure.collider.disabled,true);assert.equal(i.structures.visible,true);w.update(new THREE.Vector3(1000,0,1000));w.update(new THREE.Vector3());i=w.islands.find(i=>i.id==='0,-1');assert.equal(resource('treasure').collected,true);assert.equal(resource('treasure').mesh.visible,false);assert.ok(i.resources.filter(r=>r.type==='rune').every(r=>r.mesh.visible));assert.equal(take(resource('treasure')),false);
});
test('Height, reach and solid walls prevent through-ground and through-cave collection; camera stops before a roof',()=>{
 const w=make(),i=create(w),r=i.resources.find(r=>r.type==='journal'),copy={original:r,island:i};assert.equal(w.collect(copy,r.position.clone().add(new THREE.Vector3(0,-4,0))),false);assert.equal(w.collect(copy,r.position.clone().add(new THREE.Vector3(100,0,0))),false);const player=approach(w,i,r);assert.ok(player);assert.equal(w.collect(copy,player),true);
 const cave=i.cave,cs=Math.cos(cave.yaw),sn=Math.sin(cave.yaw),left=new THREE.Vector3(i.x+cave.x-3.1*cs,cave.y+.05,i.z+cave.z+3.1*sn),right=new THREE.Vector3(i.x+cave.x+3.1*cs,cave.y+.05,i.z+cave.z-3.1*sn);assert.equal(w.interactionClear(i,left,right),false);
 const target=new THREE.Vector3(i.x+cave.x,cave.y+.8,i.z+cave.z),desired=target.clone().add(new THREE.Vector3(0,8,0));w.cameraClip(target,desired);assert.ok(desired.y<cave.y+2.5);assert.ok(desired.y>cave.y+.8);assert.ok(!occupiedAt(i,desired.x-i.x,desired.y-.1,desired.z-i.z,.1,.18));
});
test('Coastal atlas is bounded, 16-bit precise, reused across frames, and encodes actual irregular terrain',()=>{
 const w=make();w.update(new THREE.Vector3());const ocean=new Ocean(new THREE.Scene());ocean.update(1,new THREE.Vector3(),'clear',1,w.islands);assert.equal(ocean.coastPixels.length,65*65*4*4);assert.equal(ocean.mesh.material.transparent,true);assert.equal(ocean.mesh.material.depthWrite,false);const version=ocean.coastTexture.version;for(let k=0;k<30;k++)ocean.update(k/60,new THREE.Vector3(),'clear',1,w.islands);assert.equal(ocean.coastTexture.version,version);const center=ocean.uniforms.islands.value[0],i=w.islands.find(i=>i.x===center.x&&i.z===center.y);assert.ok(i);for(const [x,z]of [[10,8],[20,40],[42,32],[32,32]]){const p=(z*65+x)*4,q=(ocean.coastPixels[p]*256+ocean.coastPixels[p+1])/65535*16-5,h=i.plan.sample((x/64*2-1)*i.plan.extent,(z/64*2-1)*i.plan.extent);assert.ok(Math.abs(q-h)<.0003);}
 ocean.setQuality(48);assert.equal(ocean.uniforms.microDetail.value,.45);
});
test('Low LOD keeps every nearby solid tree/rock visible; instance buffers dispose without destroying shared assets',()=>{
 const w=make(),i=create(w);w.setDetail({x:i.x,z:i.z},QUALITY_PRESETS.low);for(const b of i.foliage)if(b.canopy||['rock','log'].includes(b.kind))for(const mesh of b.meshes){assert.equal(mesh.count,b.count);assert.equal(mesh.visible,true);if(b.canopy)assert.equal(mesh.geometry,mesh.userData.farGeometry);}
 const meshes=[];i.group.traverse(m=>{if(m.isInstancedMesh)meshes.push(m);});let instances=0,shared=0;for(const m of meshes){m.addEventListener('dispose',()=>instances++);m.geometry.addEventListener('dispose',()=>shared++);}disposeObject(i.group);assert.equal(instances,meshes.length);assert.equal(shared,0);
});
test('Bounded sea routes go around irregular land and end in a navigable sheltered approach',()=>{
 for(const b of [0,1,3,4]){const w=make(),i=create(w,b),back=i.plan.toLocal(0,-2.0),start={x:i.x+back.x,z:i.z+back.z},goal=w.dockFor(i,3.5),path=w.seaRoute(start,goal,3.5);assert.ok(path.length>0&&path.length<=64,`${b}: no bounded sea route`);let p=start;for(const q of path){const d=Math.hypot(q.x-p.x,q.z-p.z),n=Math.ceil(d/1.5);for(let t=0;t<=n;t++)assert.ok(w.seaClear(p.x+(q.x-p.x)*t/n,p.z+(q.z-p.z)*t/n,3.5),`${b}: route intersects land`);p=q;}assert.ok(Math.hypot(p.x-goal.x,p.z-goal.z)<.1);}
});
test('Generation-3 save progress roundtrips; old IDs/inventory survive and malformed puzzle prefixes are rejected',()=>{
 const base=normalizeSave({version:1,inventory:{wood:19,signal:1},stats:{health:90,hunger:80,thirst:70},blocks:[{type:'foundation',x:0,y:0,z:0,core:true,hp:100}],raftPosition:[0,0,0],playerPosition:[0,.27,0],world:{collected:['0,-1:cache','3,4:resource2'],discovered:['0,-1']},progress:{caches:1},quickbar:['hook','hammer','spear','cookedFish','water','fishingRod','paddle',null]});
 assert.equal(base.world.generationVersion,2);const sequence=puzzleSequence(islandSeed('0,-1'));base.world.generationVersion=3;base.world.collected.push('0,-1:explore:journal',`0,-1:explore:rune${sequence[0]}`);base.progress.journals=1;const round=normalizeSave(JSON.stringify(base));assert.deepEqual(round.inventory,base.inventory);assert.deepEqual(round.world,base.world);assert.equal(round.progress.journals,1);for(const version of [0,4,-1,1.5]){const future=structuredClone(base);future.world.generationVersion=version;assert.throws(()=>normalizeSave(future));}const bad=structuredClone(base);bad.world.collected.push(`0,-1:explore:rune${sequence[2]}`);assert.throws(()=>normalizeSave(bad),/waystone/);const missing=structuredClone(base);missing.world.collected=missing.world.collected.filter(id=>!id.endsWith(':journal'));assert.throws(()=>normalizeSave(missing),/journal/);
});

test('Collected-state restoration cannot move uncollected island resources or vegetation',()=>{
 const w=make();w.update(new THREE.Vector3());const before=w.islands.map(i=>({id:i.id,resources:i.resources.map(r=>[r.id,r.position.toArray()])}));for(const i of w.islands){const r=i.resources.find(r=>r.type==='cache');w.collect({island:i,original:r});}w.update(new THREE.Vector3(1200,0,1200));w.update(new THREE.Vector3());assert.deepEqual(w.islands.map(i=>({id:i.id,resources:i.resources.map(r=>[r.id,r.position.toArray()])})),before);
});

// The accelerator must not change a single reachable cell or swept edge.
test('Spatially accelerated navigation exactly matches brute-force rotated collider clearance',()=>{
 for(const b of [0,3,5]){const w=make(),i=create(w,b,4281+b*1907,12.5,`28,${b+40}`),brute=buildNavigation(i.plan,(x,y,z)=>!occupiedAt(i,x,y,z,.30,1.72,null,false));
  assert.deepEqual(i.nav.walkable,brute.walkable);assert.deepEqual(i.nav.parents,brute.parents);assert.deepEqual(i.nav.reachable,brute.reachable);disposeObject(i.group);
 }
});

test('Large atoll wrecks have a physically boardable stern and an accessible landmark center',()=>{
 for(const [seed,radius]of [[736134941,15.802902512717992],[1744867951,15.915437652729452]]){const w=make(),i=create(w,1,seed,radius,'500,401'),p=i.plan.landmark,q=i.nav.point(i.nav.closest(p,true));assert.ok(Math.hypot(q.x-p.x,q.z-p.z)<2);
  const deck=i.colliders.find(c=>c.w===2.1&&c.d===4.4);assert.ok(deck.walkable);assert.ok(Math.abs(deck.y+deck.h*.5-p.y-.36)<.00001);assert.equal(occupiedAt(i,p.x,p.y,p.z,.28,1.72),false);disposeObject(i.group);
 }
});
