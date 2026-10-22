import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {WorldGenerator,waveHeight,SharkAI} from '../src/world.js';
import {EventBus,GridManager} from '../src/systems.js';
import {box,sphere,bakeStatic,disposeObject,assetCounts,createBlock} from '../src/assets.js';
import {QualityController,PerformanceMonitor,QUALITY_PRESETS} from '../src/performance.js';
const origin=new THREE.Vector3();
const generator=()=>{const scene=new THREE.Scene(),bus=new EventBus(),world=new WorldGenerator(scene,bus);return {scene,bus,world};};
const fingerprint=world=>world.islands.map(i=>({id:i.id,seed:i.seed,biome:i.biome.id,name:i.name,terrain:[...i.terrain.geometry.attributes.position.array],resources:i.resources.map(r=>({id:r.id,type:r.type,position:r.position.toArray(),loot:r.loot,amount:r.amount}))}));

test('Islands, terrain, resource coordinates and biome POIs are deterministic across regeneration',()=>{
 const a=generator(),b=generator();a.world.update(origin);b.world.update(origin);assert.deepEqual(fingerprint(a.world),fingerprint(b.world));const home=a.world.islands.find(i=>i.id==='0,-1'),before=home.resources.map(r=>[r.id,r.position.toArray()]);a.world.update(new THREE.Vector3(1200,0,1200));a.world.update(origin);assert.deepEqual(a.world.islands.find(i=>i.id==='0,-1').resources.map(r=>[r.id,r.position.toArray()]),before);
});
test('Each biome has a meaningful finite landmark and its own research resource',()=>{
 const {world}=generator();const kinds=[];for(let biome=0;biome<3;biome++){const i=world.generateIsland(`${biome},5`,500,500,13,biome,4281+biome);const poi=i.resources.find(r=>r.type==='poi');assert.ok(poi?.loot);assert.ok(poi.story.length>40);assert.ok(i.resources.some(r=>r.type===i.biome.special));kinds.push(i.biome.poi.kind);disposeObject(i.group);}assert.equal(new Set(kinds).size,3);
});
test('Double collection and stale chunk resources cannot duplicate island loot',()=>{
 const {world,bus}=generator();world.update(origin);const island=world.islands[0],original=island.resources.find(r=>r.type==='poi');let collections=0;bus.on('resourceCollected',()=>collections++);const target={original,island};assert.equal(world.collect(target),true);assert.equal(world.collect(target),false);world.update(new THREE.Vector3(900,0,900));assert.equal(world.collect(target),false);assert.equal(collections,1);world.update(origin);const restored=world.islands.find(i=>i.id===island.id).resources.find(r=>r.id===original.id);assert.equal(restored.collected,true);assert.equal(restored.mesh.visible,false);
});
test('Chunk cleanup disposes all owned buffers but never shared geometry or cached materials',()=>{
 const {world}=generator();world.update(origin);const owned=new Set(),shared=new Set(),sharedMaterials=new Set();for(const i of world.islands)i.group.traverse(m=>{if(m.geometry)(m.geometry.userData.shared?shared:owned).add(m.geometry);if(m.material?.userData.shared)sharedMaterials.add(m.material);});let ownedDisposals=0,sharedDisposals=0;for(const g of owned)g.addEventListener('dispose',()=>ownedDisposals++);for(const g of shared)g.addEventListener('dispose',()=>sharedDisposals++);for(const m of sharedMaterials)m.addEventListener('dispose',()=>sharedDisposals++);world.update(new THREE.Vector3(1500,0,-1500));assert.ok(owned.size>0);assert.equal(ownedDisposals,owned.size);assert.equal(sharedDisposals,0);
});
test('Long sailing stress: 120 deterministic chunk crossings keep only nine chunks and bounded shared caches',()=>{
 const {world,scene}=generator();world.update(origin);const start=assetCounts();for(let i=1;i<=120;i++){world.update(new THREE.Vector3(i*110,0,-i*80));assert.equal(world.chunks.size,9);assert.equal(scene.children.length,world.islands.length);assert.ok(world.islands.length<=9);assert.equal(world.pending.length,0);}const end=assetCounts();assert.ok(end.geometries<=start.geometries+12);assert.ok(end.materials<=start.materials+12);world.update(origin);assert.equal(world.chunks.size,9);
});
test('Budgeted streaming does at most one chunk decision per frame and discards obsolete queues',()=>{
 const {world}=generator();world.update(origin);world.update(new THREE.Vector3(1000,0,1000),1);assert.equal(world.chunks.size,1);assert.equal(world.pending.length,8);world.update(new THREE.Vector3(-1000,0,-1000),1);assert.ok([...world.chunks.keys()].every(k=>k.startsWith('-')));for(let i=0;i<8;i++)world.update(new THREE.Vector3(-1000,0,-1000),1);assert.equal(world.chunks.size,9);assert.equal(world.pending.length,0);
});
test('Shared unit primitives preserve their dimensions; static batching preserves world bounds',()=>{
 const a=box(2,3,4,0x888888),b=box(3,2,1,0x888888);assert.equal(a.geometry,b.geometry);assert.equal(sphere(.1,0xffffff).geometry,sphere(.4,0xffffff).geometry);const size=new THREE.Box3().setFromObject(a).getSize(new THREE.Vector3());assert.deepEqual(size.toArray(),[2,3,4]);const group=new THREE.Group();group.position.set(40,3,-80);a.position.x=2;group.add(a,b);const before=new THREE.Box3().setFromObject(group);bakeStatic(group);const after=new THREE.Box3().setFromObject(group);assert.ok(before.min.distanceTo(after.min)<1e-6);assert.ok(before.max.distanceTo(after.max)<1e-6);assert.equal(group.children.length,1);
});
test('Block model templates share merged buffers without sharing mutable transforms',()=>{
 for(const type of ['armor','rainCollector','windcatcher','wall','floor']){const a=createBlock(type),b=createBlock(type);assert.equal(a.children[0].geometry,b.children[0].geometry);assert.ok(a.children[0].geometry.userData.shared);a.position.x=99;assert.notEqual(a.position.x,b.position.x);}
});
test('Sharks stop an existing charge immediately in calm-seas mode and respawn with a correct position alias',()=>{
 const scene=new THREE.Scene(),bus=new EventBus(),g=new GridManager(bus);const target=g.add('foundation',0,0,0,true),raft=new THREE.Group(),s=new SharkAI(scene,bus);s.state='attacking';s.target=target;s.position.set(0,0,0);s.update(1/30,1,raft,g,true);assert.equal(target.hp,100);assert.equal(s.state,'circling');s.health=0;s.pool.release(s.mesh);s.timer=56;s.update(1/30,2,raft,g,false);assert.equal(s.position,s.mesh.position);assert.equal(s.health,100);assert.ok(s.position.distanceTo(raft.position)<25);
});
test('Raft plating halves a shark bite; repeated hits during initial stun cannot spam loot',()=>{
 const scene=new THREE.Scene(),bus=new EventBus(),g=new GridManager(bus),target=g.add('foundation',0,0,0,true);g.add('armor',0,1,0);const s=new SharkAI(scene,bus);s.state='attacking';s.target=target;s.position.set(0,0,0);s.update(1/30,0,new THREE.Group(),g,false);assert.equal(target.hp,90);assert.equal(g.at(0,1,0).hp,136);assert.equal(s.hit(),true);assert.equal(s.hit(),false);assert.equal(s.health,85);
});
test('Storm waves retain exactly four times the calm analytical height',()=>{for(const [x,z,t] of [[1,2,3],[30,-14,4],[500,800,100]])assert.equal(waveHeight(x,z,t,4),waveHeight(x,z,t,1)*4);});

function qualityMock(){return {settings:{quality:'high',pixelRatio:1.5,adaptiveQuality:true},renderer:{setPixelRatio(n){this.ratio=n;},shadowMap:{}},ocean:{setQuality(){}},atmosphere:{setQuality(){}},particles:{setQuality(){}},debris:{},world:{setDetail(){}},player:{position:origin},resize(){}};}
test('Adaptive quality steps down under sustained load, recovers with hysteresis, never exceeds the requested preset',()=>{
 const g=qualityMock(),q=new QualityController(g);for(let i=0;i<500;i++)q.update(.05);assert.equal(q.current,'low');assert.ok(g.renderer.ratio>=.5&&g.renderer.ratio<=.75);for(let i=0;i<7200;i++)q.update(1/60);assert.equal(q.current,'high');g.settings.quality='medium';q.configure();for(let i=0;i<4000;i++)q.update(1/60);assert.equal(q.current,'medium');assert.ok(q.scale<=1);
});
test('Manual quality and pixel limits are respected; paused frames do not influence adaptive decisions',()=>{
 const g=qualityMock(),q=new QualityController(g);g.settings.adaptiveQuality=false;for(let i=0;i<400;i++)q.update(1);assert.equal(q.current,'high');g.settings.pixelRatio=.5;q.apply('low');assert.equal(g.renderer.ratio,.5);g.settings.adaptiveQuality=true;q.configure();for(let i=0;i<100;i++)q.update(1,false);assert.equal(q.current,'high');assert.equal(q.frames,0);assert.equal(QUALITY_PRESETS.low.shadows,false);
});
test('F3 monitor computes rolling rates correctly, paints at most four times per second, and does no hidden DOM work',()=>{
 const m=Object.create(PerformanceMonitor.prototype);Object.assign(m,{samples:new Float32Array(240),index:0,count:0,visible:false,lastPaint:-Infinity,paintCount:0,paint(){this.paintCount++;}});for(let i=0;i<20;i++)m.recordFrame(.05,i*50);assert.equal(m.paintCount,0);m.visible=true;for(let i=0;i<20;i++)m.recordFrame(.05,1000+i*50);assert.equal(m.paintCount,4);const s=m.snapshot();assert.equal(s.currentFPS,20);assert.equal(s.averageFPS,20);assert.equal(s.minFPS,20);assert.equal(s.maxFPS,20);m.resetWindow();assert.equal(m.snapshot().samples,0);
});

test('F3 excludes missing, zero, negative, nonfinite and paused frame intervals instead of inventing FPS',()=>{
 const m=Object.create(PerformanceMonitor.prototype);Object.assign(m,{samples:new Float32Array(240),index:0,count:0,visible:false,lastPaint:-Infinity});for(const dt of [0,-1,NaN,Infinity,undefined])m.recordFrame(dt,0);assert.equal(m.snapshot().samples,0);m.recordFrame(.02,10);m.recordFrame(.0001,20,false);assert.equal(m.snapshot().samples,1);assert.equal(m.snapshot().maxFPS,50);m.resetWindow();assert.equal(m.snapshot().maxFPS,0);
});
