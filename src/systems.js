import { ITEMS, BLOCKS, RESEARCH, STARTER_ITEMS } from './data.js';

export class EventBus {
  constructor() { this.listeners = new Map(); }
  on(name, fn) { if (!this.listeners.has(name)) this.listeners.set(name, new Set()); this.listeners.get(name).add(fn); return () => this.listeners.get(name)?.delete(fn); }
  emit(name, payload) { this.listeners.get(name)?.forEach(fn => fn(payload)); }
}

// Inventory mutations are integer, finite, known-item transactions.
const quantity = n => Number.isSafeInteger(n) && n >= 0;
const itemId = id => Object.hasOwn(ITEMS, id);
export class Inventory {
  constructor(bus, initial = STARTER_ITEMS) {
    this.bus=bus; this.items={};
    if (!initial || typeof initial!=='object' || Array.isArray(initial)) throw new TypeError('Invalid inventory');
    for(const [id,n] of Object.entries(initial)) {
      if(!itemId(id)||!quantity(n)) throw new TypeError(`Invalid inventory entry: ${id}`);
      this.items[id]=n;
    }
  }
  count(id) { return itemId(id) ? this.items[id] || 0 : 0; }
  has(cost) {
    return !!cost && typeof cost==='object' && !Array.isArray(cost) &&
      Object.entries(cost).every(([id,n])=>itemId(id)&&quantity(n)&&n>0&&this.count(id)>=n);
  }
  add(id, amount=1) {
    if(!itemId(id)||!quantity(amount)||amount===0||!quantity(this.count(id)+amount)) return false;
    this.items[id]=this.count(id)+amount; this.bus.emit('inventory',{id,amount}); return true;
  }
  grant(items) {
    if(!items||typeof items!=='object'||Array.isArray(items)||Object.entries(items).some(([id,n])=>!itemId(id)||!quantity(n)||n===0||!quantity(this.count(id)+n)))return false;
    for(const [id,n] of Object.entries(items))this.items[id]=this.count(id)+n;
    if(Object.keys(items).length)this.bus.emit('inventory',{});return true;
  }
  remove(id, amount=1) {
    if(!itemId(id)||!quantity(amount)||amount===0||this.count(id)<amount) return false;
    this.items[id]=this.count(id)-amount; this.bus.emit('inventory',{id,amount:-amount}); return true;
  }
  spend(cost) {
    if(!this.has(cost)) return false;
    // Validate everything before changing anything; emit only after the transaction.
    for(const [id,n] of Object.entries(cost)) this.items[id]-=n;
    this.bus.emit('inventory',{}); return true;
  }
  toJSON() { return {...this.items}; }
}

export class SurvivalStats {
  constructor(bus, saved = {}) { this.bus = bus; this.health = saved.health ?? 100; this.hunger = saved.hunger ?? 92; this.thirst = saved.thirst ?? 88; this.stung = saved.stung ?? 0; this.alive = this.health > 0; this._tick = 0; }
  update(dt, relaxed = false) {
    if (!this.alive) return;
    this.stung = Math.max(0, this.stung - dt);
    if (!relaxed) {
      this.thirst = Math.max(0, this.thirst - .5 * dt);
      this.hunger = Math.max(0, this.hunger - .2 * dt);
      let damage = (this.thirst <= 0 ? 2 : 0) + (this.hunger <= 0 ? .5 : 0);
      if (damage) this.damage(damage * dt);
      else if (this.thirst > 80 && this.hunger > 80) this.health = Math.min(100, this.health + dt);
    }
    this._tick += dt;
    if (this._tick > .2) { this._tick = 0; this.bus.emit('stats', this); }
  }
  consume(id, inventory) {
    const item = ITEMS[id];
    if (!item?.consumable || !inventory.remove(id)) return false;
    this.hunger = Math.min(100, Math.max(0, this.hunger + (item.hunger || 0)));
    this.thirst = Math.min(100, Math.max(0, this.thirst + (item.thirst || 0)));
    this.health = Math.min(100, Math.max(0, this.health + (item.health || 0)));
    this.bus.emit('stats', this); this.checkDeath(); return true;
  }
  damage(amount) { if(!Number.isFinite(amount)||amount<0)return; this.health = Math.max(0, this.health - amount); if (amount >= 2) this.bus.emit('damage', amount); this.checkDeath(); }
  checkDeath() { if (this.health <= 0 && this.alive) { this.alive = false; this.bus.emit('death'); } }
  sting() { this.damage(5); this.stung = 10; this.bus.emit('sting'); }
  toJSON() { return { health: this.health, hunger: this.hunger, thirst: this.thirst, stung: this.stung, alive: this.alive }; }
}

// Shared 1 m grid. Foundation + a station occupy distinct vertical cells.
export const gridKey = (x, y, z) => `${x},${y},${z}`;
export const NEIGHBORS = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
export class GridManager {
  constructor(bus) { this.bus = bus; this.blocks = new Map(); this.sequence = 0; }
  at(x, y, z) { return this.blocks.get(gridKey(x,y,z)); }
  neighbors(block) { return NEIGHBORS.map(([dx,dy,dz]) => this.at(block.x+dx,block.y+dy,block.z+dz)).filter(Boolean); }
  canPlace(type, x, y, z, research = new Set()) {
    const data = BLOCKS[type];
    if (!data) return { valid: false, reason: 'Unknown structure' };
    if (![x,y,z].every(Number.isInteger)) return { valid: false, reason: 'Use the one-meter building grid' };
    if (this.blocks.size>=2000) return { valid: false, reason: 'Raft structure limit reached (2000)' };
    if (this.at(x,y,z)) return { valid: false, reason: 'This space is occupied' };
    if (data.research && !research.has(data.research)) return { valid: false, reason: `Research ${ITEMS[data.research].name.toLowerCase()} first` };
    if (Math.abs(x)>35 || Math.abs(z)>35 || y>8 || y<0) return { valid: false, reason: 'Outside the building area' };
    if (type === 'foundation' || type === 'net') {
      if (y!==0) return { valid: false, reason: 'Foundations belong at sea level' };
      const support = [[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dz]) => { const b=this.at(x+dx,0,z+dz); return b && BLOCKS[b.type].buoyant; });
      return { valid: support, reason: support ? 'Ready to build' : 'Connect to an existing foundation' };
    }
    const below=this.at(x,y-1,z);
    if (type==='armor') return {valid:!!below&&!!BLOCKS[below.type].buoyant,reason:below&&BLOCKS[below.type].buoyant?'Ready to build':'Place plating directly over a foundation'};
    if (type==='floor') {
      const support=below && ['wall','stairs'].includes(below.type);
      const adjacent=[[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dz])=>this.at(x+dx,y,z+dz)?.type==='floor');
      return { valid: !!(support || (y>0&&adjacent)), reason: support||adjacent?'Ready to build':'Requires a wall or stairs below' };
    }
    const valid=!!below && ['foundation','floor','net'].includes(below.type);
    return { valid, reason: valid?'Ready to build':'Needs a supporting floor' };
  }
  add(type,x,y,z,core=false,hp=null,extra={}) {
    if(!Object.hasOwn(BLOCKS,type)||![x,y,z].every(Number.isInteger)||this.at(x,y,z)) throw new TypeError('Invalid or occupied grid cell');
    const b={id:++this.sequence,type,x,y,z,core:!!core,hp:hp??BLOCKS[type].hp,rotation:extra.rotation||0,production:extra.production||0};
    this.blocks.set(gridKey(x,y,z),b); this.bus.emit('blockAdded',b); return b;
  }
  // Directed structural support, not generic adjacency: stations cannot suspend a deck.
  connectedKeys(excluded=null) {
    const connected=new Set(), queue=[];
    const enqueue=b=>{if(!b)return;const k=gridKey(b.x,b.y,b.z);if(k!==excluded&&!connected.has(k)){connected.add(k);queue.push(b);}};
    for(const b of this.blocks.values()) if(b.core&&b.hp>0&&b.y===0&&BLOCKS[b.type].buoyant) enqueue(b);
    for(let i=0;i<queue.length;i++) {
      const b=queue[i];
      if(b.y===0&&BLOCKS[b.type].buoyant) {
        for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]) { const n=this.at(b.x+dx,0,b.z+dz);if(n&&BLOCKS[n.type].buoyant)enqueue(n); }
      } else if(b.type==='floor') {
        for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]) { const n=this.at(b.x+dx,b.y,b.z+dz);if(n?.type==='floor')enqueue(n); }
      }
      const above=this.at(b.x,b.y+1,b.z);
      if(!above)continue;
      if(above.type==='floor'&&['wall','stairs'].includes(b.type)) enqueue(above);
      else if(above.type==='armor'){if(b.y===0&&BLOCKS[b.type].buoyant)enqueue(above);}
      else if(!BLOCKS[above.type].buoyant&&above.type!=='floor'&&(['foundation','net','floor'].includes(b.type))) enqueue(above);
    }
    return connected;
  }
  previewRemoval(block) {
    if(!block)return [];
    const excluded=gridKey(block.x,block.y,block.z),connected=this.connectedKeys(excluded);
    return [...this.blocks.values()].filter(b=>gridKey(b.x,b.y,b.z)!==excluded&&!connected.has(gridKey(b.x,b.y,b.z)));
  }
  remove(x,y,z,check=true) {
    const key=gridKey(x,y,z),b=this.blocks.get(key);if(!b)return [];
    this.blocks.delete(key);this.bus.emit('blockRemoved',b);
    return check?[b,...this.checkIntegrity()]:[b];
  }
  checkIntegrity() {
    const connected=this.connectedKeys(),detached=[];
    for(const [key,b] of this.blocks) if(!connected.has(key)) {this.blocks.delete(key);detached.push(b);this.bus.emit('blockDetached',b);}
    return detached;
  }
  damage(block,amount) {
    if(!block||!Number.isFinite(amount)||amount<0||this.at(block.x,block.y,block.z)!==block)return;
    block.hp=Math.max(0,block.hp-amount);this.bus.emit('blockDamaged',block);if(block.hp<=0)this.remove(block.x,block.y,block.z);
  }

  exposedFoundations() { return [...this.blocks.values()].filter(b => BLOCKS[b.type].buoyant && [[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dz])=>!this.at(b.x+dx,0,b.z+dz))); }
  toJSON() { return [...this.blocks.values()].map(({mesh,...b})=>b); }
}

export class CraftingManager {
  constructor(inventory,bus) { this.inventory=inventory;this.bus=bus;this.job=null;this.research=new Set(); }
  start(recipe,stationAvailable=true,stationKey=null) {
    if(!recipe||!itemId(recipe.output)||!Number.isFinite(recipe.seconds)||recipe.seconds<=0)return {ok:false,reason:'Select a craftable recipe'};
    if(this.job)return {ok:false,reason:'Your workbench is already busy'};
    if(recipe.research&&!this.research.has(recipe.research))return {ok:false,reason:'Research the required item first'};
    if(stationKey===null&&this.resolveStation){stationKey=this.resolveStation(recipe);stationAvailable=stationAvailable&&!!stationKey;}
    if(!stationAvailable)return {ok:false,reason:`Stand near a ${recipe.station||'workbench'}`};
    if(recipe.block)return {ok:false,reason:'Select this structure in build mode'};
    if(!this.inventory.spend(recipe.ingredients))return {ok:false,reason:'Not enough materials'};
    this.job={recipe,elapsed:0,stationKey};this.bus.emit('craftStarted',this.job);return {ok:true};
  }
  update(dt) {
    if(!this.job||!Number.isFinite(dt)||dt<=0)return;
    this.job.elapsed+=dt;
    if(this.job.elapsed>=this.job.recipe.seconds) {
      const {recipe:r}=this.job;this.job=null; // settle reservation before inventory callbacks/save
      if(this.inventory.add(r.output,r.amount))this.bus.emit('craftComplete',r);
      else {this.inventory.grant(r.ingredients);this.bus.emit('craftCancelled');}
    }
  }
  cancel() {
    if(!this.job)return false;
    const {recipe}=this.job;this.job=null; // a reentrant callback cannot refund twice
    this.inventory.grant(recipe.ingredients);
    this.bus.emit('craftCancelled');return true;
  }
  canResearch(id) {const r=RESEARCH[id];return !!r&&this.inventory.count(id)>0&&!this.research.has(id)&&r.requires.every(p=>this.research.has(p));}
  researchItem(id) {if(!this.canResearch(id))return false;this.research.add(id);this.bus.emit('researched',id);return true;}
}

// One accumulator, one existing RAF owner. Excess wall time is deliberately discarded.
export class FixedStepClock {
  constructor(step=1/30,maxSteps=8,maxFrame=.25) {this.step=step;this.maxSteps=maxSteps;this.maxFrame=maxFrame;this.accumulator=0;this.droppedSeconds=0;this.totalSteps=0;this.lastSteps=0;}
  reset() {this.accumulator=0;this.lastSteps=0;}
  advance(elapsed,simulate) {
    if(!Number.isFinite(elapsed)||elapsed<0){this.reset();return 0;}
    const accepted=Math.min(elapsed,this.maxFrame);this.droppedSeconds+=elapsed-accepted;this.accumulator+=accepted;let steps=0;
    while(this.accumulator+1e-9>=this.step&&steps<this.maxSteps) {simulate(this.step);this.accumulator-=this.step;steps++;}
    if(this.accumulator<0)this.accumulator=0;
    if(this.accumulator>=this.step) {const dropped=this.accumulator-this.accumulator%this.step;this.droppedSeconds+=dropped;this.accumulator%=this.step;}
    this.lastSteps=steps;this.totalSteps+=steps;return steps*this.step;
  }
}

export class ObjectPool {
  constructor(create,size=0,onRelease=()=>{}) {this.create=create;this.free=[];this.active=new Set();this.onRelease=onRelease;for(let i=0;i<size;i++)this.free.push(create());}
  acquire(){const item=this.free.pop()||this.create();this.active.add(item);item.visible=true;return item;}
  release(item){if(!this.active.delete(item))return;item.visible=false;this.onRelease(item);this.free.push(item);}
  releaseAll(){for(const item of [...this.active])this.release(item);}
}

export class TimeAndWeather {
  constructor(bus,saved={}) {this.bus=bus;this.elapsed=saved.elapsed??270;this.weather=saved.weather||'clear';this.weatherTime=saved.weatherTime??0;this.dayLength=1200;this.dynamic=true;}
  update(dt){this.elapsed+=dt;this.weatherTime+=dt;if(this.dynamic&&this.weatherTime> (this.weather==='clear'?180:105)){const choices=this.weather==='clear'?['rain','fog','clear','storm']:['clear','clear','rain'];this.setWeather(choices[Math.floor(Math.random()*choices.length)]);}}
  setWeather(id){if(!['clear','rain','fog','storm'].includes(id))return false;this.weather=id;this.weatherTime=0;this.bus.emit('weather',id);}
  get day(){return 1+Math.floor(this.elapsed/this.dayLength);}
  get fraction(){return (this.elapsed/this.dayLength+.18)%1;}
  get clock(){const h=this.fraction*24;return `${String(Math.floor(h)).padStart(2,'0')}:${String(Math.floor(h%1*60)).padStart(2,'0')}`;}
  toJSON(){return {elapsed:this.elapsed,weather:this.weather,weatherTime:this.weatherTime};}
}

export function hash2(x,z,seed=7341){let n=Math.imul(x^seed,374761393)+Math.imul(z,668265263);n=Math.imul(n^(n>>>13),1274126177);return ((n^(n>>>16))>>>0)/4294967295;}
export function seededRandom(seed){return ()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}
export function clamp(n,min,max){return Math.max(min,Math.min(max,n));}
export function smoothstep(a,b,x){const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t);}
