// Broad deterministic placement sweep. The separate browser suite proves real
// controller traversal; this checks generation/clearance on many more layouts.
import * as THREE from 'three';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {WorldGenerator} from '../src/world.js';
import {EventBus,seededRandom} from '../src/systems.js';
import {disposeObject} from '../src/assets.js';
const random=seededRandom(918471),result={layouts:0,biomes:6,perBiome:60,maxSecretOffset:0,repairs:0,failures:[],environment:'Node deterministic generation and physical-clearance sweep; not 360 real-controller playthroughs'};
const started=performance.now();
for(let biome=0;biome<6;biome++)for(let n=0;n<60;n++){
 const seed=Math.floor(random()*0x7fffffff),radius=10+random()*6,w=new WorldGenerator(new THREE.Scene(),new EventBus());let i;
 try{
  i=w.generateIsland(`${n+300},${biome+400}`,28,-61,radius,biome,seed);
  const secret=i.resources.find(r=>r.type==='treasure'),distance=Math.hypot(secret.local.x-i.plan.grotto.x,secret.local.z-i.plan.grotto.z);
  assert.ok(distance<1.2,'Secret left its sheltered interior');result.maxSecretOffset=Math.max(result.maxSecretOffset,distance);
  for(const p of [i.plan.landmark,i.plan.viewpoint,i.plan.grotto]){const q=i.nav.point(i.nav.closest(p,true));assert.ok(Math.hypot(q.x-p.x,q.z-p.z)<2,'Unreachable adventure terminus');}
  assert.equal(new Set(i.resources.map(r=>r.id)).size,i.resources.length);
  assert.ok(i.resources.every(r=>r.position.toArray().every(Number.isFinite)&&r.position.y>=-.1));
  result.repairs+=i.placementRepairs;result.layouts++;
 }catch(error){result.failures.push({biome,seed,radius,message:error.message});}
 finally{if(i)disposeObject(i.group);}
}
result.ms=performance.now()-started;fs.writeFileSync('reports/islands-seed-sweep.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));if(result.failures.length)process.exitCode=1;
