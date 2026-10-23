// Pure save boundary: whitelist, validate, migrate, then (and only then) write storage.
import { META, ITEMS, BLOCKS, RESEARCH, RECIPES, QUESTS, QUICKBAR, WEATHER } from './data.js';
import { EventBus, GridManager, gridKey } from './systems.js';

import {validExplorationProgress} from './exploration.js';
import { normalizePreferences } from './config.js';

export const SAVE_KEY='tidebound.save.v2';
export const LEGACY_SAVE_KEY='tidebreak.save.v1';
export const PREVIOUS_SAVE_KEY='tidebound.save.previous.v2';
export const IMPORT_BACKUP_KEY='tidebound.save.backup.v2';
// An exact raw copy used only after explicit confirmation to replace an unreadable save.
export const RECOVERY_SAVE_KEY='tidebound.save.recovery.raw';
export const MAX_SAVE_BYTES=2*1024*1024;
export class SaveError extends Error { constructor(message){super(message);this.name='SaveError';} }
const fail=message=>{throw new SaveError(message);};
const own=(table,id)=>typeof id==='string'&&Object.hasOwn(table,id);
const object=(v,name)=>{if(!v||typeof v!=='object'||Array.isArray(v))fail(`Invalid ${name}.`);return v;};
const number=(v,name,min=-1e7,max=1e7)=>{if(typeof v!=='number'||!Number.isFinite(v)||v<min||v>max)fail(`Invalid ${name}.`);return v;};
const integer=(v,name,min=0,max=Number.MAX_SAFE_INTEGER)=>{number(v,name,min,max);if(!Number.isSafeInteger(v))fail(`Invalid ${name}.`);return v;};
const boolean=(v,name)=>{if(typeof v!=='boolean')fail(`Invalid ${name}.`);return v;};
const text=(v,name,max=2000)=>{if(typeof v!=='string'||v.length>max)fail(`Invalid ${name}.`);return v;};
const array=(v,name,max=20000)=>{if(!Array.isArray(v)||v.length>max)fail(`Invalid ${name}.`);return v;};
const vector=(v,name,limit=1e7)=>{array(v,name,3);if(v.length!==3)fail(`Invalid ${name}.`);return v.map(n=>number(n,name,-limit,limit));};
const islandId=/^-?\d{1,7},-?\d{1,7}$/;
const collectedId=/^-?\d{1,7},-?\d{1,7}:(cache|resource\d{1,3}|special|poi:(spring|wreck|observatory)|explore:(journal|treasure|reef|rune[0-2]))$/;
const cellId=/^-?\d{1,2},[0-8],-?\d{1,2}$/;
const unique=(v,name,valid,max)=>{const a=array(v,name,max);if(a.some(id=>typeof id!=='string'||!valid(id))||new Set(a).size!==a.length)fail(`Invalid ${name}.`);return [...a];};

export function validateInventory(input) {
  object(input,'inventory');const result={};
  for(const [id,n] of Object.entries(input)) {if(!own(ITEMS,id))fail(`Unknown inventory item: ${id}.`);result[id]=integer(n,`${id} quantity`);}
  return result;
}
function safeKeys(input,depth=0) {
  if(depth>30)fail('Save nesting is too deep.');
  if(input&&typeof input==='object')for(const [key,v] of Object.entries(input)) {
    if(['__proto__','prototype','constructor'].includes(key))fail('Unsafe save property.');
    safeKeys(v,depth+1);
  }
}
function settings(input={}) {
  object(input,'settings');
  // Validate legacy fields strictly, then apply additive bounded defaults for the
  // independent music/ambience/effects and mouse-sensitivity preferences.
  let quality=input.quality??'medium';if(quality==='auto')quality='medium';
  if(!['low','medium','high'].includes(quality))fail('Unknown quality preset.');
  number(input.volume??.35,'audio volume',0,1);
  boolean(input.adaptiveQuality??(input.quality==='auto'),'adaptive quality');
  number(input.pixelRatio??1.25,'pixel ratio',.5,2);
  boolean(input.relaxed??false,'calm seas setting');
  boolean(input.dynamicWeather??true,'dynamic weather');
  boolean(input.showHints??true,'hint setting');
  return normalizePreferences(input);
}
function progress(input) {
  object(input,'progress');const p={};
  for(const id of ['salvaged','built','crafted','water','islands','caches','poi','secrets','journals','puzzles','sharks','reefs'])p[id]=integer(input[id]??0,`${id} progress`);
  p.rescued=boolean(input.rescued??false,'rescue progress');return p;
}
export function reservedRecipe(job) {
  const base=RECIPES.find(r=>r.id===job.recipeId&&!r.block);if(!base)fail('Unknown crafting recipe.');
  if(job.variant==='rain') {if(base.id!=='water')fail('Invalid rainwater recipe.');return {...base,ingredients:{},name:'Collected rainwater'};}
  if(job.variant&&job.variant!=='default')fail('Unknown crafting variant.');return base;
}
function reservation(input,blocks,name,elapsedName) {
  object(input,name);const r=reservedRecipe(input),stationKey=text(input.stationKey,`${name} station`,32),station=blocks.get(stationKey);
  if(!station||station.type!==(r.station||'workbench'))fail(`${name} is missing its workstation.`);
  const elapsed=number(input[elapsedName],`${name} time`,0,r.seconds);
  if(elapsed>=r.seconds)fail(`${name} was already completed.`);
  return {recipeId:r.id,stationKey,[elapsedName]:elapsed,variant:input.variant==='rain'?'rain':'default'};
}

export function normalizeSave(input) {
  let raw=input;
  if(typeof raw==='string') {
    if(new TextEncoder().encode(raw).length>MAX_SAVE_BYTES)fail('Save files must be smaller than 2 MB.');
    try{raw=JSON.parse(raw);}catch{fail('This file is not valid JSON.');}
  }
  object(raw,'save');safeKeys(raw);
  if(raw.version!==1&&raw.version!==META.saveVersion)fail(raw.version>META.saveVersion?'This save is from a newer version. Your current voyage was not changed.':'Unsupported save version. Your current voyage was not changed.');
  const legacy=raw.version===1;
  const s={version:META.saveVersion,game:'tosins-tidebound',savedAt:number(raw.savedAt??0,'save date',0,1e15),simTime:number(raw.simTime??0,'simulation time',0,1e12),inventory:validateInventory(raw.inventory)};
  const stats=object(raw.stats,'survival statistics');s.stats={health:number(stats.health,'health',Number.MIN_VALUE,100),hunger:number(stats.hunger,'hunger',0,100),thirst:number(stats.thirst,'thirst',0,100),stung:number(stats.stung??0,'sting timer',0,10),alive:true};
  if(stats.alive!==undefined&&stats.alive!==true)fail('This save has no living player.');
  s.blocks=array(raw.blocks,'raft structures',2000).map(b=>{
    object(b,'structure');if(!own(BLOCKS,b.type))fail('Unknown structure type.');
    const out={type:b.type,x:integer(b.x,'grid X',-35,35),y:integer(b.y,'grid height',0,8),z:integer(b.z,'grid Z',-35,35),hp:number(b.hp,'structure health',Number.MIN_VALUE,BLOCKS[b.type].hp),core:boolean(b.core??false,'core marker'),rotation:integer(b.rotation??0,'structure rotation',0,3),production:number(b.production??0,'production timer',0,35)};
    if(out.core&&(out.type!=='foundation'||out.y!==0||![0,1].includes(out.x)||![0,1].includes(out.z)))fail('Invalid core foundation.');
    if(BLOCKS[out.type].buoyant&&out.y!==0)fail('A floating foundation must be at sea level.');
    return out;
  });
  if(!s.blocks.length||!s.blocks.some(b=>b.core))fail('A raft needs at least one original core foundation.');
  const grid=new GridManager(new EventBus());
  for(const b of s.blocks) {if(grid.at(b.x,b.y,b.z))fail('Two structures occupy the same grid cell.');grid.add(b.type,b.x,b.y,b.z,b.core,b.hp,{rotation:b.rotation,production:b.production});}
  const supported=grid.connectedKeys();
  if(supported.size!==s.blocks.length) {
    // V1 used undirected adjacency, so a legitimate old raft could leave a station
    // hanging from the side of another. Recover its FULL build cost once, rather
    // than losing it or accepting an inconsistent V2 structure graph.
    const oldConnected=new Set(),queue=[];
    for(const b of grid.blocks.values())if(b.core){oldConnected.add(gridKey(b.x,b.y,b.z));queue.push(b);}
    for(let i=0;i<queue.length;i++)for(const n of grid.neighbors(queue[i])){const key=gridKey(n.x,n.y,n.z);if(!oldConnected.has(key)){oldConnected.add(key);queue.push(n);}}
    if(!legacy||oldConnected.size!==s.blocks.length)fail('The raft contains disconnected or unsupported structures. No items were changed.');
    const retained=[];
    for(const b of s.blocks) {
      if(supported.has(gridKey(b.x,b.y,b.z)))retained.push(b);
      else for(const [id,n] of Object.entries(BLOCKS[b.type].cost))s.inventory[id]=integer((s.inventory[id]||0)+n,`${id} migration refund`);
    }
    s.blocks=retained;
  }
  const blockMap=new Map(s.blocks.map(b=>[gridKey(b.x,b.y,b.z),b]));
  s.research=unique(raw.research??[],'research discoveries',id=>own(RESEARCH,id),100);
  if(s.research.some(id=>RESEARCH[id].requires.some(p=>!s.research.includes(p))))fail('A research prerequisite is missing.');
  const t=object(raw.time??{},'world clock');const weather=t.weather??'clear';if(!own(WEATHER,weather))fail('Unknown weather.');
  s.time={elapsed:number(t.elapsed??270,'world time',0,1e12),weather,weatherTime:number(t.weatherTime??0,'weather timer',0,10000)};
  s.settings=settings(raw.settings);s.progress=progress(raw.progress??{});
  const w=object(raw.world??{},'world progress');if(w.generationVersion!==undefined&&![1,2,3].includes(w.generationVersion))fail('Unsupported island generation. Your voyage was not changed.');s.world={generationVersion:w.generationVersion===3?3:2,collected:unique(w.collected??[],'collected resources',id=>collectedId.test(id),20000),discovered:unique(w.discovered??[],'charted islands',id=>islandId.test(id),20000)};
  if(!validExplorationProgress(s.world.collected))fail('Invalid waystone sequence or missing trail journal.');
  s.notebook=array(raw.notebook??[],'journal',10000).map(n=>{object(n,'journal entry');return {title:text(n.title,'journal title',160),text:text(n.text,'journal message',4000),island:text(n.island,'journal island',160)};});
  s.quickbar=array(raw.quickbar??QUICKBAR,'quickbar',8).map(id=>{if(id!==null&&!own(ITEMS,id))fail('Unknown quickbar item.');return id;});if(s.quickbar.length!==8)fail('The quickbar must have eight slots.');
  const r=legacy?{}:object(raw.raft,'raft state');
  let autopilot=r.autopilot??null;
  if(autopilot!==null) {object(autopilot,'charted course');if(!islandId.test(autopilot.id))fail('Invalid destination.');autopilot={id:autopilot.id,name:text(autopilot.name,'destination name',160),x:number(autopilot.x,'destination X'),z:number(autopilot.z,'destination Z'),radius:number(autopilot.radius,'island radius',1,30),dock:boolean(autopilot.dock??false,'sheltered approach')};}
  s.raft={position:vector(legacy?raw.raftPosition:r.position,'raft position'),rotation:vector(r.rotation??[0,0,0],'raft rotation',Math.PI*2),velocity:vector(r.velocity??[0,0,-.12],'raft velocity',12),verticalVelocity:number(r.verticalVelocity??0,'raft vertical velocity',-30,30),anchored:boolean(r.anchored??false,'anchor state'),sailOpen:boolean(r.sailOpen??true,'sail state'),helming:boolean(r.helming??false,'helm state'),autopilot};
  const p=legacy?{}:object(raw.player,'player state');
  s.player={position:vector(legacy?raw.playerPosition:p.position,'player position'),velocity:vector(p.velocity??[0,0,0],'player velocity',30),heading:number(p.heading??2.8,'player heading',-10000,10000),grounded:boolean(p.grounded??true,'grounded state'),onRaft:boolean(p.onRaft??true,'deck state'),swimming:boolean(p.swimming??false,'swimming state'),diving:boolean(p.diving??false,'diving state'),jumpCooldown:number(p.jumpCooldown??0,'jump cooldown',0,1),stingCooldown:number(p.stingCooldown??0,'sting cooldown',0,10),attackCooldown:number(p.attackCooldown??0,'attack cooldown',0,2)};
  if(legacy) {
    const dx=Math.round(s.player.position[0]-s.raft.position[0]),dz=Math.round(s.player.position[2]-s.raft.position[2]),deck=blockMap.get(gridKey(dx,0,dz));
    s.player.onRaft=!!deck&&BLOCKS[deck.type].buoyant&&Math.abs(s.player.position[1]-s.raft.position[1]-.27)<.5;
    s.player.swimming=!s.player.onRaft&&s.player.position[1]<-.1;s.player.grounded=s.player.onRaft||(!s.player.swimming&&s.player.position[1]>=0);
  }
  if(s.player.onRaft&&s.player.swimming)fail('A player cannot be on deck and swimming at the same time.');
  if(s.player.diving&&!s.player.swimming)s.player.diving=false;
  if(Math.hypot(s.player.position[0]-s.raft.position[0],s.player.position[2]-s.raft.position[2])>250)fail('The player is too far from their raft.');
  const c=object(raw.camera??{},'camera state');s.camera={yaw:number(c.yaw??-.35,'camera yaw',-1e6,1e6),pitch:number(c.pitch??.3,'camera pitch',.12,1.2),distance:number(c.distance??10.5,'camera distance',5,22),selectedSlot:integer(c.selectedSlot??0,'selected slot',0,7),buildType:c.buildType??'foundation',buildRotation:integer(c.buildRotation??0,'building rotation',0,3)};if(!own(BLOCKS,s.camera.buildType))fail('Unknown selected structure.');
  // V1 snapshots already refunded reservations. Never restore/refund them a second time.
  s.crafting=legacy||!raw.crafting?null:reservation(raw.crafting,blockMap,'Crafting job','elapsed');
  s.stationJobs=legacy?[]:array(raw.stationJobs??[],'workstation jobs',2000).map(j=>reservation(j,blockMap,'Workstation job','time'));
  const busy=new Set();for(const j of [s.crafting,...s.stationJobs].filter(Boolean)){if(busy.has(j.stationKey))fail('A workstation has duplicate reservations.');busy.add(j.stationKey);}
  s.fires=legacy?[]:array(raw.fires??[],'fires',2000).map(f=>{object(f,'fire');if(!cellId.test(f.key)||!blockMap.has(f.key)||!BLOCKS[blockMap.get(f.key).type].wooden)fail('A fire is missing its wooden structure.');return {key:f.key,timer:number(f.timer,'fire timer',0,60)};});
  if(new Set(s.fires.map(f=>f.key)).size!==s.fires.length)fail('Duplicate fires.');
  s.salvage=legacy?[]:array(raw.salvage??[],'reclaimed salvage',2000).map(d=>{object(d,'salvage');if(!['wood','leaf','plastic','scrap','barrel'].includes(d.type))fail('Unknown salvage type.');return {type:d.type,x:number(d.x,'salvage X'),z:number(d.z,'salvage Z'),loot:validateInventory(d.loot)};});
  const completed=legacy?QUESTS.filter(q=>(q.research?s.research.includes(q.research)?1:0:Number(s.progress[q.counter]||0))>=q.target).map(q=>q.id):(raw.quests?.completed??[]);
  s.quests={completed:unique(completed,'quest completions',id=>QUESTS.some(q=>q.id===id),100)};
  s.shark=null;
  if(!legacy&&raw.shark) {
    const a=object(raw.shark,'shark state');if(!['circling','targeting','attacking','fleeing','stunned','defeated'].includes(a.state))fail('Unknown shark behavior.');
    const targetKey=a.targetKey??null;if(targetKey!==null&&!blockMap.has(targetKey))fail('The shark targets a missing structure.');
    s.shark={state:a.state,position:vector(a.position,'shark position'),health:number(a.health,'shark health',0,100),timer:number(a.timer,'shark timer',0,10000),angle:number(a.angle,'shark angle',-1e9,1e9),attackCooldown:number(a.attackCooldown,'shark cooldown',0,600),biteCooldown:number(a.biteCooldown,'swim bite cooldown',0,10),targetKey};
    if(['targeting','attacking'].includes(a.state)&&targetKey===null)fail('The shark is missing its target.');
    if((a.state==='defeated')!==(a.health<=0))fail('Inconsistent shark health.');
  }
  return s;
}

export function readStoredSave(storage) {
  try {
    const current=storage.getItem(SAVE_KEY),legacy=current===null?storage.getItem(LEGACY_SAVE_KEY):null;
    if(current===null&&legacy===null)return {data:null};
    const data=normalizeSave(current??legacy),original=JSON.parse(current??legacy);return {data,migrated:original.version===1,compensatedBlocks:original.version===1?original.blocks.length-data.blocks.length:0,source:current===null?LEGACY_SAVE_KEY:SAVE_KEY};
  } catch(error) {return {data:null,error:error.message,unavailable:!(error instanceof SaveError)};}
}
export function quarantineUnreadableSave(storage) {
  const current=storage.getItem(SAVE_KEY);
  if(current===null)return false;
  // Copy first. If storage is full or denied, the original remains untouched.
  storage.setItem(RECOVERY_SAVE_KEY,current);
  storage.removeItem(SAVE_KEY);
  return true;
}

export function readRawSave(storage,key=SAVE_KEY) {
  try{return storage?.getItem(key)??null;}catch{return null;}
}

export function writeStoredSave(storage,data,{importing=false}={}) {
  const normalized=normalizeSave(data),encoded=JSON.stringify(normalized),current=storage.getItem(SAVE_KEY);
  if(new TextEncoder().encode(encoded).length>MAX_SAVE_BYTES)fail('This voyage exceeds the 2 MB save limit. Export a backup and reduce the raft/journal size.');
  if(current) {
    // Keep a known-good previous snapshot; never replace a valid backup with malformed data.
    try {normalizeSave(current);storage.setItem(importing?IMPORT_BACKUP_KEY:PREVIOUS_SAVE_KEY,current);}catch(error){if(!(error instanceof SaveError))throw error;}
  }
  storage.setItem(SAVE_KEY,encoded);return normalized;
}
export function readBackup(storage) {
  for(const key of [IMPORT_BACKUP_KEY,PREVIOUS_SAVE_KEY,LEGACY_SAVE_KEY]) {
    try {const raw=storage.getItem(key);if(raw)return {data:normalizeSave(raw),key};}catch{}
  }
  return null;
}
