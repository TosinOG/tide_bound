// CPU-only streaming diagnostic. Not a frame-rate / graphics-card benchmark.
import * as THREE from 'three';
import {WorldGenerator} from '../src/world.js';
import {disposeObject} from '../src/assets.js';
import {EventBus} from '../src/systems.js';
import {performance} from 'node:perf_hooks';
import fs from 'node:fs';
const label=process.argv[2]||'after',w=new WorldGenerator(new THREE.Scene(),new EventBus()),timings=[];
for(let k=0;k<10;k++){
 const before=new Set(w.chunks.keys()),t=performance.now();w.update(new THREE.Vector3(k*100,0,k*100));const ms=performance.now()-t;
 timings.push({crossing:k,ms,newChunks:[...w.chunks.keys()].filter(id=>!before.has(id)).length,islands:w.islands.length});
}
const result={label,environment:'Sandbox Node / blocking complete 3×3 streaming batches; not the budgeted browser frame loop or a hardware-GPU benchmark',initialMs:timings[0].ms,warmedBatchMeanMs:timings.slice(1).reduce((n,t)=>n+t.ms,0)/9,timings};
fs.writeFileSync(`reports/generation-${label}.json`,JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
for(const island of w.islands)disposeObject(island.group);
