import * as THREE from 'three';
import { ITEMS, BLOCKS, RECIPES, QUICKBAR, WEATHER, LORE, STARTER_ITEMS, META, RESEARCH } from './data.js';
import { EventBus, Inventory, SurvivalStats, GridManager, CraftingManager, TimeAndWeather, clamp, gridKey, FixedStepClock } from './systems.js';
import { material, box, cylinder, sphere, beam, createBlock, createAvatar, createHook, createSpear, createPaddle, createFish, disposeObject } from './assets.js';
import { Ocean, WorldGenerator, DebrisSpawner, SharkAI, ParticlePool, Atmosphere, waveHeight } from './world.js';
import { SeaAudio } from './audio.js';
import { UI } from './ui.js';
import { UnderwaterWorld, DIVE_OXYGEN_BASE } from './underwater.js';

import { SAVE_KEY, LEGACY_SAVE_KEY, PREVIOUS_SAVE_KEY, IMPORT_BACKUP_KEY, MAX_SAVE_BYTES, normalizeSave, reservedRecipe, readStoredSave, writeStoredSave, readBackup } from './persistence.js';
import { QualityController, PerformanceMonitor, QUALITY_PRESETS } from './performance.js';
import { QuestManager } from './progression.js';
import { normalizePreferences, readPreferences, writePreferences } from './config.js';
import { KeyboardBindings, keyboardCodeFromEvent } from './input-bindings.js';
import { COLLISION_LAYERS, PLAYER_COLLISION, raftBlockColliders, raftWalkSurface, resolveRaftHorizontal, resolveRaftVertical } from './raft-collision.js';
const V3=THREE.Vector3;
const LEGACY_KEY_NAMES={Space:' ',ArrowUp:'arrowup',ArrowDown:'arrowdown',ArrowLeft:'arrowleft',ArrowRight:'arrowright',ShiftLeft:'shift',ShiftRight:'shift',ControlLeft:'control',ControlRight:'control',Tab:'tab',Escape:'escape'};
const legacyKeyForCode=code=>LEGACY_KEY_NAMES[code]||(code?.startsWith('Key')?code.slice(3).toLowerCase():code?.startsWith('Digit')?code.slice(5):code?.toLowerCase());
const SWIM_FEET_OFFSET=1.05;
const SWIM_ENTRY_DEPTH=.58;
const SWIM_EXIT_HEIGHT=.10;
export class Game {
  constructor(options={}){
    this.bus=new EventBus();
    if(Object.hasOwn(options,'saved')){this.saved=options.saved;this.loadStatus=options.loadStatus||{data:this.saved};}else this.saved=this.readSave();
    this.onMainMenu=options.onMainMenu||null;this.lifecycle=new AbortController();this.disposed=false;
    let preferences={};try{preferences=readPreferences(localStorage,this.saved?.settings||{});}catch{preferences=normalizePreferences(this.saved?.settings||{});}
    this.started=false;this.paused=false;this.ready=false;this.simTime=this.saved?.simTime||0;this.lastFrame=null;this.performanceWindow=0;this.performanceFrames=0;this.autoLow=false;this.accumulator=0;this.clock=new FixedStepClock();this.contextLost=false;this.renderNeeded=true;this.savingBlocked=!!this.loadStatus?.error&&!this.loadStatus?.unavailable;this.storageAvailable=!this.loadStatus?.unavailable;this.frameCount=0;this.fps=60;this.saveTimer=0;this.statsTimer=0;this.weatherNotice=0;
    this.settings=normalizePreferences({...this.saved?.settings,...preferences,...options.settings});
    this.scene=new THREE.Scene();this.renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.25));this.renderer.setSize(innerWidth,innerHeight);this.renderer.shadowMap.enabled=this.settings.quality!=='low';this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.14;this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.domElement.id='ocean-canvas';this.renderer.domElement.setAttribute('aria-label',META.title+' 3D survival game. Use WASD to move and click to use your equipped tool.');this.renderer.domElement.tabIndex=0;document.getElementById('stage').appendChild(this.renderer.domElement);
    this.camera=new THREE.PerspectiveCamera(48,innerWidth/innerHeight,.08,1200);this.cameraYaw=this.saved?.camera.yaw??-.35;this.cameraPitch=this.saved?.camera.pitch??.30;this.cameraDistance=this.saved?.camera.distance??10.5;this.cameraDiveBlend=0;this.cameraTarget=new V3(.5,.7,.5);this.camera.position.set(7,6,10);
    this.raycaster=new THREE.Raycaster();this.pointer=new THREE.Vector2(.12,.05);this.pointerScreen={x:innerWidth*.56,y:innerHeight*.52};this.aimPoint=new V3(3,0,6);this.oceanPlane=new THREE.Plane(new V3(0,1,0),0);this.keys=new Set();this.virtualActions=new Set();this.inputBindings=options.inputBindings||new KeyboardBindings();this.raftColliderBuckets=new Map();this.raftColliderDirty=true;this.mouse={down:false,right:false,dragged:false,startX:0,startY:0};this.touchMove={x:0,y:0};this.mobileVertical=0;this.gamepadButtons={};this.gamepadMove={x:0,y:0};
    this.inventory=new Inventory(this.bus,this.saved?.inventory||STARTER_ITEMS);this.stats=new SurvivalStats(this.bus,this.saved?.stats);this.grid=new GridManager(this.bus);this.crafting=new CraftingManager(this.inventory,this.bus);this.crafting.research=new Set(this.saved?.research||[]);this.time=new TimeAndWeather(this.bus,this.saved?.time);this.time.dynamic=this.settings.dynamicWeather;
    this.quickbar=[...this.saved?.quickbar||QUICKBAR];this.selectedSlot=this.saved?.camera.selectedSlot??0;this.buildType=this.saved?.camera.buildType??'foundation';this.buildRotation=this.saved?.camera.buildRotation??0;this.toolVisuals=new Map();this.dismantle=null;this.dismantleTarget=null;this.ghost=null;this.ghostCell=null;this.ghostValid=false;this.helming=this.saved?.raft.helming??false;this.anchored=this.saved?.raft.anchored??false;this.autopilot=this.saved?.raft.autopilot??null;this.sailOpen=this.saved?.raft.sailOpen??true;this.raftVelocity=new V3().fromArray(this.saved?.raft.velocity??[0,0,-.12]);this.raftVerticalVelocity=this.saved?.raft.verticalVelocity??0;this.jobs=[];this.fires=new Map();this.reefDamageTimer=0;this.lightningCooldown=0;
    this.progress={salvaged:0,built:0,crafted:0,water:0,islands:0,caches:0,poi:0,secrets:0,journals:0,puzzles:0,sharks:0,reefs:0,wrecks:0,rescued:false,...this.saved?.progress};this.notebook=[...this.saved?.notebook||[]];this.quests=new QuestManager(this.bus,this.inventory,this.saved?.quests);
    this.ocean=new Ocean(this.scene);this.atmosphere=new Atmosphere(this.scene);this.world=new WorldGenerator(this.scene,this.bus,this.saved?.world);this.debris=new DebrisSpawner(this.scene);this.particles=new ParticlePool(this.scene);this.shark=new SharkAI(this.scene,this.bus);this.audio=options.audio||new SeaAudio(this.settings);this.audio.applySettings(this.settings);this.audio.setScene('game');
    this.raft=new THREE.Group();this.raft.position.fromArray(this.saved?.raft.position||[0,0,0]);if(this.saved)this.raft.rotation.set(...this.saved.raft.rotation);this.scene.add(this.raft);this.blockMeshes=new Map();this.setupEvents();this.createRaft();
    this.player={position:new V3().fromArray(this.saved?.player.position||[.5,.3,.8]),velocity:new V3().fromArray(this.saved?.player.velocity||[0,0,0]),grounded:this.saved?.player.grounded??true,onRaft:this.saved?.player.onRaft??true,swimming:this.saved?.player.swimming??false,diving:this.saved?.player.diving??false,surfacing:this.saved?.player.surfacing??false,oxygen:this.saved?.player.oxygen??DIVE_OXYGEN_BASE,heading:this.saved?.player.heading??2.8,anim:0,action:0,jumpCooldown:this.saved?.player.jumpCooldown??0,stingCooldown:this.saved?.player.stingCooldown??0,attackCooldown:this.saved?.player.attackCooldown??0};this.avatar=createAvatar();this.avatar.position.copy(this.player.position);this.avatar.rotation.y=this.player.heading;this.scene.add(this.avatar);this.crafting.resolveStation=recipe=>{const b=this.nearStation(recipe.station||'workbench',4);return b&&!this.jobs.some(j=>j.blockId===b.id)?gridKey(b.x,b.y,b.z):null;};this.equipVisual();
    this.hook={mesh:createHook(),state:'idle',velocity:new V3(),time:0,charge:0,caught:null,origin:new V3(),target:new V3()};this.scene.add(this.hook.mesh);this.hook.mesh.visible=false;
    const ropeGeo=new THREE.BufferGeometry();ropeGeo.setAttribute('position',new THREE.BufferAttribute(new Float32Array(33*3),3));this.rope=new THREE.Line(ropeGeo,new THREE.LineBasicMaterial({color:0xd8c9a4,transparent:true,opacity:.9}));this.rope.frustumCulled=false;this.rope.visible=false;this.scene.add(this.rope);
    this.fishing={state:'idle',time:0,biteAt:0,position:new V3(),float:new THREE.Group()};this.fishing.float.add(sphere(.06,0xc66c4b,0,.02,0,8),sphere(.065,0xe9e3c8,0,-.04,0,8));this.fishing.float.visible=false;this.scene.add(this.fishing.float);
    this.aimRing=new THREE.Mesh(new THREE.RingGeometry(.34,.365,48),new THREE.MeshBasicMaterial({color:0xe9e7c8,transparent:true,opacity:.65,side:THREE.DoubleSide,depthWrite:false}));this.aimRing.rotation.x=-Math.PI/2;this.scene.add(this.aimRing);
    this.createGhost();
    this.dismantleOutline=new THREE.BoxHelper(undefined,0xe8bc80);this.dismantleOutline.visible=false;this.dismantleOutline.material.depthTest=false;this.dismantleOutline.renderOrder=20;this.scene.add(this.dismantleOutline);
    this.threatRing=new THREE.Mesh(new THREE.RingGeometry(.58,.66,24),new THREE.MeshBasicMaterial({color:0xd48361,transparent:true,opacity:.9,depthWrite:false,side:THREE.DoubleSide}));this.threatRing.rotation.x=-Math.PI/2;this.threatRing.visible=false;this.scene.add(this.threatRing);
    this.world.update(this.raft.position);this.underwater=new UnderwaterWorld(this.scene,this.world,this.bus,this.saved?.underwater);this.recoverPlayerAfterLoad();this.reconcileIslandUpgrade();this.debris.seed(this.raft.position);this.restoreReservations();this.shark.restore(this.saved?.shark,this.grid);
    for(const d of this.saved?.salvage||[]){const drop=this.debris.spawn(d.type,d.x,d.z);drop.loot={...d.loot};}
    this.ui=new UI(this);this.monitor=new PerformanceMonitor(this);this.quality=new QualityController(this);this.bindInput();this.resize();this.ready=true;this.renderCamera(1);this.ui.update(true);this.frame=this.frame.bind(this);this.animationFrameId=requestAnimationFrame(this.frame);
    // Expose a read-only-friendly inspector for local development and automated tests.
    window.tidebound=this;window.tidebreak=this; // legacy inspector/test alias
  }
  setupEvents(){
    this.bus.on('blockAdded',b=>{this.hullDirty=true;this.raftColliderDirty=true;const mesh=createBlock(b.type);mesh.position.set(b.x,b.y===0?0:.26+b.y-1,b.z);mesh.rotation.y=b.rotation*Math.PI/2;mesh.userData.block=b;mesh.traverse(m=>m.userData.block=b);b.mesh=mesh;if(b.type==='sail')mesh.userData.sail.visible=this.sailOpen;this.blockMeshes.set(b.id,mesh);this.raft.add(mesh);});
    const remove=b=>{
      this.hullDirty=true;this.raftColliderDirty=true;
      this.cancelReservationsFor(b);this.fires.delete(b.id);this.raft.remove(b.mesh);this.blockMeshes.delete(b.id);disposeObject(b.mesh);
      if(this.ready){const pos=this.raft.localToWorld(new V3(b.x,.2,b.z));this.particles.burst(pos,0xc19b67,20,1.5);if(!b.dismantled){this.dropReclaimed(b,pos);this.ui.toast(`${BLOCKS[b.type].name} broke away`,'foundation','warning');}}
    };
    this.bus.on('blockRemoved',remove);this.bus.on('blockDetached',remove);this.bus.on('blockRemoved',()=>{if(this.ready&&this.stats.alive&&![...this.grid.blocks.values()].some(b=>b.core)){this.stats.damage(100);}});
    this.bus.on('blockDamaged',b=>{if(b.hp/BLOCKS[b.type].hp<.6&&b.mesh){b.mesh.traverse(m=>{if(m.isMesh&&!m.userData.damaged){m.userData.baseMaterial=m.material;m.material=m.material.clone();m.material.userData={owned:true};m.userData.baseColor=m.material.color.clone();m.material.color.lerp(new THREE.Color(0x754e3e),.26);m.userData.damaged=true;}});}});
    this.bus.on('damage',()=>{this.audio.play('damage');this.ui?.damageFlash();});
    this.bus.on('death',()=>{this.paused=true;this.ui.death();});
    this.bus.on('sting',()=>this.ui.toast('Jellyfish sting · movement slowed for 10s','lightning','warning'));
    this.bus.on('craftStarted',()=>this.audio.play('click'));
    this.bus.on('craftComplete',r=>{this.progress.crafted++;if(r.output==='water')this.progress.water++;this.audio.play('craft');this.ui.toast(`${r.name} is ready`,ITEMS[r.output]?.icon||'check','success');this.ui.renderInventory();});
    this.bus.on('researched',id=>{this.audio.play('discover');const unlock=BLOCKS[RESEARCH[id]?.unlock]?.name||ITEMS[RESEARCH[id]?.unlock]?.name||'new equipment';this.ui.toast(`${unlock} unlocked`,'research','success');this.ui.renderInventory();});
    this.bus.on('questComplete',q=>{if(this.ready){this.ui.toast(`${q.title} · journal updated`,'check','success');this.ui.renderQuests();}});
    this.bus.on('weather',id=>{if(this.ready){this.ui.toast(WEATHER[id].label,id==='storm'?'storm':WEATHER[id].icon,id==='storm'?'warning':'info');if(id==='storm')this.audio.play('warning');}});
    this.bus.on('islandDiscovered',island=>{this.progress.islands++;if(this.ready){this.audio.play('discover');this.ui.discover(island);}});
    this.bus.on('sharkWarning',()=>{this.audio.play('warning');this.ui.toast('A shark is eyeing your foundations. Ready your spear.','spear','warning',6000);});
    this.bus.on('sharkCharge',()=>this.ui.toast('Shark charging! Strike now with your spear.','spear','warning',4000));
    this.bus.on('sharkBite',b=>{this.audio.play('damage');this.particles.burst(this.raft.localToWorld(new V3(b.x,.2,b.z)),0xc8e4d8,22,2);this.ui.toast(`A foundation took ${this.shark.lastBiteDamage||20} damage · ${this.ui.keyLabel('repairBlock')} to repair`,'repair','warning');});
    this.bus.on('sharkHit',()=>{this.audio.play('damage');this.ui.toast('Good hit! The shark is retreating.','spear','success');});
    this.bus.on('sharkDefeated',()=>{this.progress.sharks++;this.inventory.grant({rawFish:3,scrap:1,...(Math.random()<.3?{coral:1}:{})});this.ui.toast('Shark repelled · +3 raw fish, +1 scrap, sometimes sea glass','fish','success');});
    this.bus.on('inventory',()=>{this.ui?.renderQuickbar();this.ui?.updateResources();});
    this.bus.on('islandHint',message=>this.ui?.toast(message,'book','info',6500));
    this.bus.on('landmarkDiscovered',landmark=>{if(this.ready){this.audio.play('discover');this.ui.discoverLandmark(landmark);}});
    this.bus.on('resourceCollected',({type,island,resource})=>{
      this.audio.play('collect');
      if(type==='wreckKey') {
        this.ui.toast('Lanternwake brass key recovered · the sealed locker can now be opened','key','success',6500);
      } else if(type==='wreckJournal') {
        this.progress.journals++;const note={title:resource.name,text:resource.story};this.notebook.push({...note,island:island?.name||'The Lanternwake wreck'});this.ui.toast('Captain’s log recorded · a lead on pressure gear','book','success',6000);this.ui.showLore(note,island?.name||'The Lanternwake wreck');
      } else if(type==='wreckCache') {
        if(resource.loot)this.inventory.grant(resource.loot);this.progress.wrecks++;this.progress.reefs++;
        const note={title:resource.name,text:resource.story};this.notebook.push({...note,island:island?.name||'The Lanternwake wreck'});this.ui.toast('Lanternwake locker opened · pressure tank, diving fins, and recovered stores','chest','success',7000);this.ui.showLore(note,island?.name||'The Lanternwake wreck');
      } else if(type==='cache') {
        this.inventory.grant({signal:1,copper:2,vine:3,wood:4,coconut:2});
        this.progress.caches++;const note=LORE[(this.progress.caches-1)%LORE.length];this.notebook.push({...note,island:island.name});this.ui.toast('Supply cache found · signal fragment + rare supplies','signal','success',6500);this.ui.showLore(note,island.name);
      } else if(type==='rune') {
        const activated=island.puzzle.sequence.filter(k=>this.world.collected.has(`${island.id}:explore:rune${k}`)).length;
        this.ui.toast(`${resource.name} answered · ${activated} / 3`, 'sun','success');if(activated===3){this.progress.puzzles++;this.ui.toast('The grotto latch opens. Return beyond the overlook.','backpack','success',7000);}
      } else if(type==='journal'||type==='treasure'||type==='reefCache') {
        if(resource.loot)this.inventory.grant(resource.loot);
        if(type==='journal')this.progress.journals++;else if(type==='treasure')this.progress.secrets++;else this.progress.reefs++;
        const note={title:resource.name,text:resource.story};this.notebook.push({...note,island:island.name});this.ui.toast(type==='journal'?'Trail journal recorded':type==='treasure'?'Hidden provisions recovered':'Sunken cache recovered · sea glass, scrap, and rope',type==='journal'?'book':type==='treasure'?'backpack':'compass','success');this.ui.showLore(note,island.name);
      } else if(type==='poi') {
        this.inventory.grant(resource.loot);
        this.progress.poi++;const note={title:resource.name,text:resource.story};this.notebook.push({...note,island:island.name});this.ui.toast(`${resource.name} · a finite discovery`,'compass','success');this.ui.showLore(note,island.name);
      } else {
        const n=resource.amount??(type==='copper'?2:type==='vine'?3:type==='wood'?4:2);this.inventory.add(type,n);this.ui.toast(`+${n} ${ITEMS[type].name}`,ITEMS[type].icon,'success');
      }
    });
  }

  createRaft(){if(this.saved?.blocks?.length){for(const b of this.saved.blocks)this.grid.add(b.type,b.x,b.y,b.z,b.core,b.hp,{rotation:b.rotation||0,production:b.production||0});}else{for(let x=-1;x<=2;x++)for(let z=-1;z<=2;z++)this.grid.add('foundation',x,0,z,(x===0||x===1)&&(z===0||z===1));this.grid.add('sail',-1,1,-1);this.grid.add('workbench',2,1,-1);this.grid.add('purifier',-1,1,2);this.grid.add('grill',2,1,2);}
    // Lashings and a small hand-painted trail marker lend the starter raft a lived-in feel.
    const details=new THREE.Group();for(const[x,z]of [[-1.45,-1.45],[2.45,-1.45],[-1.45,2.45],[2.45,2.45]]){details.add(cylinder(.027,.038,.42,0x876746,x,.38,z),cylinder(.045,.045,.035,0xd2bb8b,x,.51,z));}
    const placard=box(.4,.13,.025,0xd6c59c,.5,.4,2.46);details.add(placard);this.raft.add(details);for(const b of this.grid.blocks.values())if(b.type==='sail')b.mesh.userData.sail.visible=this.sailOpen;
  }
  start() {
    if(this.started)return;this.started=true;this.clock.reset();this.lastFrame=null;this.audio.init();this.ui.start();this.ui.mobileControls?.updateContext(true);
    this.ui.toast(this.saved?'Welcome back, castaway. Your raft is just as you left it.':'Welcome aboard. Hold the mouse to cast your hook.','anchor','info',5000);
    if(this.loadStatus?.migrated)this.ui.toast('Original voyage migrated safely. The old save is retained as a backup.','save','success',7000);
    if(this.loadStatus?.compensatedBlocks)this.ui.toast(`${this.loadStatus.compensatedBlocks} unsupported old structure(s) converted back into their full building materials.`,'backpack','success',9000);
    if(this.savingBlocked)this.ui.toast('The local save could not be read. It will not be overwritten. Use Settings to restore a backup or import.','save','warning',10000);
    else if(!this.storageAvailable)this.ui.toast('Browser storage is unavailable in this preview. Export your voyage to keep it.','save','warning',8000);
  }
  readSave() {
    try{this.loadStatus=readStoredSave(localStorage);}catch(error){this.loadStatus={data:null,unavailable:true,error:error.message};}
    return this.loadStatus.data;
  }
  snapshot() {
    const blocksById=new Map([...this.grid.blocks.values()].map(b=>[b.id,b]));
    const reservation=(job,elapsedName)=>{
      const b=job.blockId?blocksById.get(job.blockId):this.grid.blocks.get(job.stationKey)||[...this.grid.blocks.values()].find(b=>b.type===(job.recipe.station||'workbench'));
      return {recipeId:job.recipe.id,stationKey:b?gridKey(b.x,b.y,b.z):'',variant:job.recipe.id==='water'&&!Object.keys(job.recipe.ingredients).length?'rain':'default',[elapsedName]:job[elapsedName]};
    };
    return normalizeSave({version:META.saveVersion,game:'tosins-tidebound',savedAt:Date.now(),simTime:this.simTime,inventory:this.inventory.toJSON(),stats:this.stats.toJSON(),blocks:this.grid.toJSON(),research:[...this.crafting.research],time:this.time.toJSON(),
      raft:{position:this.raft.position.toArray(),rotation:[this.raft.rotation.x,this.raft.rotation.y,this.raft.rotation.z],velocity:this.raftVelocity.toArray(),verticalVelocity:this.raftVerticalVelocity,anchored:this.anchored,sailOpen:this.sailOpen,helming:this.helming,autopilot:this.autopilot},
      player:{position:this.player.position.toArray(),velocity:this.player.velocity.toArray(),heading:this.player.heading,grounded:this.player.grounded,onRaft:this.player.onRaft,swimming:this.player.swimming,diving:this.player.diving,surfacing:this.player.surfacing,oxygen:this.player.oxygen,jumpCooldown:this.player.jumpCooldown,stingCooldown:this.player.stingCooldown,attackCooldown:this.player.attackCooldown},
      camera:{yaw:this.cameraYaw,pitch:this.cameraPitch,distance:this.cameraDistance,selectedSlot:this.selectedSlot,buildType:this.buildType,buildRotation:this.buildRotation},
      crafting:this.crafting.job?reservation(this.crafting.job,'elapsed'):null,stationJobs:this.jobs.map(j=>reservation(j,'time')),
      fires:[...this.fires].filter(([id])=>blocksById.has(id)).map(([id,f])=>{const b=blocksById.get(id);return {key:gridKey(b.x,b.y,b.z),timer:f.timer};}),
      salvage:this.debris.active.filter(d=>d.loot).map(d=>({type:d.type,x:d.x,z:d.z,loot:{...d.loot}})),shark:this.shark.toJSON(this.grid),world:this.world.toJSON(),progress:{...this.progress},quests:this.quests.toJSON(),notebook:this.notebook,quickbar:[...this.quickbar],settings:{...this.settings}});
  }
  save(manual=false) {
    if(this.suppressUnloadSave||!this.started||!this.stats.alive)return false;let data;
    try{data=this.snapshot();}catch(error){if(manual)this.ui.toast(`Save was not changed: ${error.message}`,'save','warning',8000);console.warn('Save validation:',error.message);return false;}
    if(this.savingBlocked){if(manual)this.ui.toast('Your unreadable save is protected. Export this temporary voyage or restore/import a backup.','save','warning');return data;}
    try{writeStoredSave(localStorage,data);this.storageAvailable=true;this.ui.savedAt=performance.now();if(manual)this.ui.toast('Voyage saved on this device','save','success');}
    catch{this.storageAvailable=false;if(manual)this.ui.toast('Storage is unavailable or full. Export your save instead.','save','warning');}
    return data;
  }
  newGame(){this.suppressUnloadSave=true;try{for(const key of [SAVE_KEY,LEGACY_SAVE_KEY,PREVIOUS_SAVE_KEY,IMPORT_BACKUP_KEY])localStorage.removeItem(key);}catch{}location.reload();}
  exportSave() {
    const data=this.save(false);if(!data){this.ui.toast('Begin a living voyage before saving','save');return;}
    const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='tosins-tidebound-voyage-v2.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  async importSave(file) {
    try {if(file.size>MAX_SAVE_BYTES)throw Error('Save files must be smaller than 2 MB.');const text=await file.text();this.pendingImport=normalizeSave(text);const old=JSON.parse(text),repairs=old.version===1?old.blocks.length-this.pendingImport.blocks.length:0;this.ui.confirmImport(this.pendingImport,false,repairs);return true;}
    catch(error){this.pendingImport=null;this.ui.toast(`Import rejected: ${error.message}`,'save','warning',8000);return false;}
  }
  commitImport() {
    try {
      const data=normalizeSave(this.pendingImport); // validate again before touching storage
      if(this.started&&this.stats.alive&&!this.savingBlocked){const current=this.snapshot();writeStoredSave(localStorage,current);}
      writeStoredSave(localStorage,data,{importing:true});this.pendingImport=null;this.suppressUnloadSave=true;location.reload();return true;
    } catch(error){this.ui.toast(`Import was not applied: ${error.message}`,'save','warning',8000);return false;}
  }
  getBackup(){try{return readBackup(localStorage);}catch{return null;}}
  restoreBackup(){const backup=this.getBackup();if(!backup){this.ui.toast('No valid local backup was found','save','warning');return false;}this.pendingImport=backup.data;this.ui.confirmImport(backup.data,true);return true;}
  restoreReservations() {
    const s=this.saved;if(!s)return;
    if(s.crafting)this.crafting.job={recipe:reservedRecipe(s.crafting),elapsed:s.crafting.elapsed,stationKey:s.crafting.stationKey};
    for(const j of s.stationJobs){const b=this.grid.blocks.get(j.stationKey);this.jobs.push({blockId:b.id,recipe:reservedRecipe(j),time:j.time});}
    for(const fire of s.fires){const b=this.grid.blocks.get(fire.key);this.fires.set(b.id,{timer:fire.timer});}
  }
  beginCraft(recipe) {
    const station=this.nearStation(recipe.station||'workbench',4);
    if(station&&this.jobs.some(j=>j.blockId===station.id))return {ok:false,reason:'That workstation is already busy'};
    return this.crafting.start(recipe,!!station,station?gridKey(station.x,station.y,station.z):null);
  }
  cancelStationJob(blockId,notify=true) {
    const at=this.jobs.findIndex(j=>j.blockId===blockId);if(at<0)return false;
    const [job]=this.jobs.splice(at,1);this.inventory.grant(job.recipe.ingredients);
    if(notify)this.ui?.toast('Work interrupted · reserved ingredients returned','backpack');return true;
  }
  cancelReservationsFor(block) {
    const key=gridKey(block.x,block.y,block.z);
    if(this.crafting.job?.stationKey===key){this.crafting.cancel();this.ui?.toast('Workbench removed · crafting ingredients returned','backpack');}
    this.cancelStationJob(block.id,this.ready);
  }
  dropReclaimed(block,position) {
    // Consolidate large structural cascades instead of allocating thousands of meshes.
    const bundles=this.debris.active.filter(d=>d.loot);let d=bundles.length>=12?bundles[0]:this.debris.spawn('wood',position.x,position.z);d.loot??={};
    for(const [id,n] of Object.entries(BLOCKS[block.type].cost))d.loot[id]=(d.loot[id]||0)+Math.max(1,Math.floor(n/2));
  }
  clearInput() {
    this.keys.clear();this.virtualActions.clear();this.mouse.down=false;this.mouse.right=false;this.mouse.dragged=false;this.touchMove={x:0,y:0};this.mobileVertical=0;this.gamepadMove={x:0,y:0};this.gamepadButtons={};this.gamepadRequireNeutral=true;this.touchCameraStart=null;this.dismantle=null;this.ui?.resetTouch?.();
    if(this.hook?.state==='charging')this.hook.state='idle';
  }
  isActionDown(action) {
    if(this.virtualActions.has(action))return true;
    for(const code of this.inputBindings?.codesForAction(action)||[])if(this.keys.has(code)||this.keys.has(legacyKeyForCode(code)))return true;
    return false;
  }
  setActionDown(action,down=true) {if(down)this.virtualActions.add(action);else this.virtualActions.delete(action);}
  pulseAction(action,duration=150) {this.setActionDown(action,true);setTimeout(()=>this.setActionDown(action,false),duration);}
  suspend() {this.clearInput();this.clock.reset();this.lastFrame=null;this.monitor?.resetWindow();if(this.started&&!this.paused){this.save();this.ui.openModal('pause');}}
  setPaused(value) {
    if(this.contextLost&&!value)return;this.renderNeeded=true;this.paused=value;this.clearInput();this.clock.reset();this.lastFrame=null;if(!value)this.renderer.domElement.focus({preventScroll:true});
  }
  applyQuality(preset=this.activeQuality) {this.quality?.apply(preset);}
  persistSettings(){try{return writePreferences(localStorage,this.settings);}catch{return false;}}
  mainMenu(){if(this.disposed)return;if(this.onMainMenu)this.onMainMenu(this);else{this.save();this.suppressUnloadSave=true;location.reload();}}
  selectSlot(index){this.selectedSlot=(index+8)%8;if(this.hook?.state==='charging')this.hook.state='idle';this.cancelFishing();this.equipVisual();this.ui.renderQuickbar();this.ui.renderBuildBar();this.audio.play('click');}
  get equipped(){return this.quickbar[this.selectedSlot];}
  equipVisual(){if(!this.avatar)return;const hand=this.avatar.userData.tool;hand.clear();if(this.toolVisuals.has(this.equipped)){hand.add(this.toolVisuals.get(this.equipped));return;}let m;switch(this.equipped){case'hook':m=createHook();m.rotation.z=.4;break;case'hammer':m=new THREE.Group();m.add(cylinder(.025,.025,.4,0x9d744c),box(.22,.13,.11,0x7e9286,0,.2,0));break;case'spear':m=createSpear();m.scale.setScalar(.7);m.rotation.x=.6;break;case'paddle':m=createPaddle();m.scale.setScalar(.7);m.rotation.x=.2;break;case'fishingRod':m=new THREE.Group();m.add(cylinder(.012,.02,1.35,0xbba174,0,.5,0));m.rotation.x=.5;break;case'water':m=cylinder(.065,.065,.19,0x83b1ae);break;case'cookedFish':m=createFish(true);m.scale.setScalar(.45);break;case'coconut':m=sphere(.12,0xa28559);break;}if(m){this.toolVisuals.set(this.equipped,m);hand.add(m);}}
  listen(target,type,handler,options={}){target.addEventListener(type,handler,{...options,signal:this.lifecycle.signal});}
  handleKeyboardAction(action){
    if(action==='performance'){this.monitor.toggle();return;}
    if(action==='inventory'){if(this.ui.modal==='inventory')this.ui.closeModal();else this.ui.openModal('inventory');return;}
    if(action==='map'){if(this.ui.modal==='map')this.ui.closeModal();else this.ui.openModal('map');return;}
    if(action==='journal'){if(this.ui.modal==='journal')this.ui.closeModal();else this.ui.openModal('journal');return;}
    if(action==='help'){this.ui.openModal('help');return;}
    if(action==='toggleHUD'){this.ui.toggleHUD();return;}
    if(this.paused)return;
    this.start();
    if(/^slot[1-8]$/.test(action)){this.selectSlot(Number(action.slice(4))-1);return;}
    switch(action){
      case'interact':this.interact();break;
      case'dive':this.toggleDive();break;
      case'helm':this.toggleHelm();break;
      case'removeBlock':this.removeTargetBlock();break;
      case'repairBlock':this.repairBlock();break;
      case'rotateBuild':this.buildRotation=(this.buildRotation+1)%4;if(this.ghost)this.ghost.rotation.y=this.buildRotation*Math.PI/2;break;
      case'quickbarPrevious':this.selectSlot(this.selectedSlot-1);break;
      case'quickbarNext':this.selectSlot(this.selectedSlot+1);break;
      case'zoomIn':this.cameraDistance=clamp(this.cameraDistance-1,5,20);break;
      case'zoomOut':this.cameraDistance=clamp(this.cameraDistance+1,5,20);break;
    }
  }
  bindInput(){
    const canvas=this.renderer.domElement;
    this.listen(window,'resize',()=>this.resize());
    this.listen(window,'blur',()=>this.suspend());
    this.listen(document,'visibilitychange',()=>{if(document.hidden)this.suspend();else{this.clock.reset();this.lastFrame=null;}});
    this.listen(canvas,'webglcontextlost',e=>{e.preventDefault();this.contextLost=true;this.suspend();this.ui.openModal('context-lost');});
    this.listen(canvas,'webglcontextrestored',()=>{this.contextLost=false;this.applyQuality();this.clock.reset();this.lastFrame=null;this.ui.openModal('pause');this.ui.toast('Graphics context restored. Your voyage is safe; resume when ready.','check','success');});
    this.listen(window,'keydown',e=>{
      const code=keyboardCodeFromEvent(e);
      // Escape is intentionally unbound and always available as a safe exit.
      if(code==='Escape'){e.preventDefault();if(this.ui.modal)this.ui.closeModal();else this.ui.openModal('pause');return;}
      if(e.target.closest?.('input,textarea,select,[contenteditable]:not([contenteditable="false"])'))return;
      if(['Space','Tab','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(code))e.preventDefault();
      if(code){this.keys.add(code);this.keys.add(e.key.toLowerCase());}
      if(e.repeat)return;
      const action=this.inputBindings.actionForCode(code);
      if(action)this.handleKeyboardAction(action);
    });
    this.listen(window,'keyup',e=>{
      const code=keyboardCodeFromEvent(e),action=this.inputBindings.actionForCode(code);
      this.keys.delete(code);this.keys.delete(e.key.toLowerCase());
      if(action==='removeBlock')this.dismantle=null;
    });
    this.listen(canvas,'pointercancel',()=>this.clearInput());
    this.listen(canvas,'contextmenu',e=>e.preventDefault());
    this.listen(canvas,'pointerdown',e=>{
      if(this.ui?.mobileControls?.handleCanvasPointerDown(e))return;
      if(this.paused)return;this.start();this.audio.init();canvas.focus({preventScroll:true});this.updatePointer(e);this.mouse.startX=e.clientX;this.mouse.startY=e.clientY;this.mouse.dragged=false;
      if(e.button===2){this.mouse.right=true;}else if(e.button===0){this.mouse.down=true;if(this.equipped==='hook'&&this.hook.state==='idle'){this.hook.state='charging';this.hook.charge=.22;}else this.primaryAction();}
      if(e.pointerType==='touch'){this.touchCameraStart={x:e.clientX,y:e.clientY};}
    });
    this.listen(window,'pointermove',e=>{
      if(e.target===canvas||this.mouse.right)this.updatePointer(e);
      if(this.mouse.right&&!this.paused){const dx=e.clientX-this.mouse.startX,dy=e.clientY-this.mouse.startY,sensitivity=this.settings.mouseSensitivity;if(Math.abs(dx)+Math.abs(dy)>3)this.mouse.dragged=true;this.cameraYaw-=dx*.006*sensitivity;this.cameraPitch=clamp(this.cameraPitch+dy*.004*sensitivity,.12,1.2);this.mouse.startX=e.clientX;this.mouse.startY=e.clientY;}
      if(e.pointerType==='touch'&&this.mouse.down&&e.target===canvas&&this.touchCameraStart){const dx=e.clientX-this.touchCameraStart.x,dy=e.clientY-this.touchCameraStart.y,sensitivity=this.settings.mouseSensitivity;if(Math.abs(dx)+Math.abs(dy)>8){this.cameraYaw-=dx*.004*sensitivity;this.cameraPitch=clamp(this.cameraPitch+dy*.003*sensitivity,.12,1.1);this.touchCameraStart={x:e.clientX,y:e.clientY};this.mouse.dragged=true;}}
    });
    this.listen(window,'pointerup',e=>{if(e.button===2){if(this.mouse.right&&!this.mouse.dragged&&!this.paused&&this.equipped==='hammer')this.placeBlock();this.mouse.right=false;}else if(e.button===0){if(this.hook.state==='charging'){if(!this.paused&&!this.mouse.dragged)this.castHook();else this.hook.state='idle';}this.mouse.down=false;this.touchCameraStart=null;}});
    this.listen(canvas,'wheel',e=>{e.preventDefault();if(this.paused)return;if(e.shiftKey)this.cameraDistance=clamp(this.cameraDistance+e.deltaY*.008,5,22);else this.selectSlot(this.selectedSlot+(e.deltaY>0?1:-1));},{passive:false});
    this.listen(window,'beforeunload',()=>this.save());
  }
  updatePointer(e){this.pointerScreen={x:e.clientX,y:e.clientY};this.pointer.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);}
  resize(){this.camera.aspect=innerWidth/innerHeight;this.camera.updateProjectionMatrix();this.renderer.setSize(innerWidth,innerHeight);this.renderNeeded=true;this.ui?.resize();}
  primaryAction(){if(this.paused)return;const id=this.equipped;if(id==='hook'){if(this.hook.state!=='idle')this.hook.state='reeling';}
    else if(id==='hammer')this.placeBlock();else if(id==='spear')this.attack();else if(id==='paddle')this.paddle();else if(id==='fishingRod')this.fish();else if(ITEMS[id]?.consumable){if(this.stats.consume(id,this.inventory)){this.player.action=.5;this.audio.play('collect');this.ui.toast(`${ITEMS[id].name} · ${ITEMS[id].thirst?`+${ITEMS[id].thirst} thirst`: `+${ITEMS[id].hunger} hunger`}`,ITEMS[id].icon,'success');}else this.ui.toast(`No ${ITEMS[id].name.toLowerCase()} left. Open crafting with Tab.`,ITEMS[id].icon,'warning');}else this.ui.toast('Select a tool or consumable from your quickbar','info');}
  castHook(){const h=this.hook;this.avatar.userData.tool.getWorldPosition(h.origin);h.mesh.position.copy(h.origin);h.target.copy(this.aimPoint);h.target.y=.02;const flat=h.target.clone().sub(h.origin);flat.y=0;const maxRange=7+h.charge*20;if(flat.length()>maxRange)h.target.copy(h.origin).add(flat.normalize().multiplyScalar(maxRange)).setY(.02);
    // Slight magnetic assistance makes small, bobbing salvage practical with a mouse.
    let best=1.65;for(const d of this.debris.active){const dist=Math.hypot(d.x-h.target.x,d.z-h.target.z);if(dist<best&&h.origin.distanceTo(d.mesh.position)<maxRange+1){best=dist;h.target.copy(d.mesh.position);}}
    const distance=Math.hypot(h.target.x-h.origin.x,h.target.z-h.origin.z),flight=clamp(distance/12,.4,1.7);h.velocity.copy(h.target).sub(h.origin).divideScalar(flight);h.velocity.y+=.5*8*flight;h.state='flying';h.time=0;h.mesh.visible=true;this.rope.visible=true;this.avatar.userData.tool.visible=false;this.player.action=.5;this.audio.play('hook');}
  updateHook(dt){const h=this.hook;if(h.state==='charging'){h.charge=clamp(h.charge+dt*.6,.22,1);return;}if(h.state==='idle')return;h.time+=dt;const hand=this.avatar.userData.tool.getWorldPosition(new V3());
    if(h.state==='flying'){h.velocity.y-=8*dt;h.mesh.position.addScaledVector(h.velocity,dt);h.mesh.rotation.z+=dt*5;const d=this.debris.nearest(h.mesh.position,.85);if(d){h.caught=d;d.hooked=true;h.state='reeling';this.audio.play('splash');this.particles.burst(d.mesh.position,0xd8e9d5,10,.9);}else if(h.mesh.position.y<=waveHeight(h.mesh.position.x,h.mesh.position.z,this.simTime)+.03){h.mesh.position.y=.06;h.state='floating';h.time=0;this.audio.play('splash');this.particles.burst(h.mesh.position,0xe2ede0,8,.8);}if(h.mesh.position.distanceTo(hand)>28)h.state='reeling';}
    if(h.state==='floating'){h.mesh.position.y=waveHeight(h.mesh.position.x,h.mesh.position.z,this.simTime)+.05;const d=this.debris.nearest(h.mesh.position,1.2);if(d){h.caught=d;d.hooked=true;h.state='reeling';}if(h.time>.75)h.state='reeling';}
    if(h.state==='reeling'){const diff=hand.clone().sub(h.mesh.position);const dist=diff.length();h.mesh.position.addScaledVector(diff.normalize(),Math.min(dt*12,dist));if(h.caught){h.caught.mesh.position.copy(h.mesh.position).add(new V3(0,-.08,0));h.caught.x=h.mesh.position.x;h.caught.z=h.mesh.position.z;}if(dist<.5){if(h.caught)this.collectDebris(h.caught);h.caught=null;h.state='idle';h.mesh.visible=false;this.rope.visible=false;this.avatar.userData.tool.visible=true;}}
    if(h.state!=='idle')this.updateRope(hand,h.mesh.position,h.state==='reeling'?.12:.5);
  }
  collectDebris(d,automatic=false){if(!this.debris.active.includes(d))return false;if(d.loot){this.inventory.grant(d.loot);this.ui.toast('Reclaimed supplies from your raft','wood','success');}else if(d.type==='barrel'){this.inventory.grant({wood:3,plastic:2,scrap:2,[Math.random()>.5?'leaf':'rawFish']:2});this.ui.toast('Supply barrel · timber, plastic, scrap + a little extra','backpack','success');}else{const n=d.type==='wood'?3:2;this.inventory.add(d.type,n);this.ui.toast(`+${n} ${ITEMS[d.type].name}`,ITEMS[d.type].icon,'success');}this.progress.salvaged++;this.particles.burst(d.mesh.position,0xe4d4a2,12,.7);this.debris.release(d);this.audio.play('collect');}
  updateRope(from,to,sag){const a=this.rope.geometry.attributes.position.array;for(let i=0;i<=32;i++){const f=i/32;a[i*3]=THREE.MathUtils.lerp(from.x,to.x,f);a[i*3+1]=THREE.MathUtils.lerp(from.y,to.y,f)-Math.sin(f*Math.PI)*sag;a[i*3+2]=THREE.MathUtils.lerp(from.z,to.z,f);}this.rope.geometry.attributes.position.needsUpdate=true;}
  fish(){const f=this.fishing;if(f.state==='idle'){if(this.hook.state!=='idle'){this.ui.toast('Reel your hook in first','hook');return;}f.position.copy(this.aimPoint);const dir=f.position.clone().sub(this.player.position);dir.y=0;if(dir.length()>12)f.position.copy(this.player.position).addScaledVector(dir.normalize(),12);f.position.y=.02;f.state='waiting';f.time=0;f.biteAt=4+Math.random()*5;f.float.visible=true;f.float.position.copy(f.position);this.rope.visible=true;this.audio.play('splash');this.ui.toast('Line cast. Wait for the float to dip…','fishing');}
    else if(f.state==='bite'){this.inventory.add('rawFish',1);this.audio.play('collect');this.ui.toast('A fine catch! +1 raw fish','fish','success');this.particles.burst(f.float.position,0xc8e2ce,14,1);this.cancelFishing();}else{this.ui.toast('Nothing on the line yet. Try again.','fishing');this.cancelFishing();}}
  updateFishing(dt){const f=this.fishing;if(f.state==='idle')return;f.time+=dt;f.float.position.copy(f.position);f.float.position.y=waveHeight(f.position.x,f.position.z,this.simTime)+.07+(f.state==='bite'?Math.sin(this.simTime*22)*.07:0);if(f.state==='waiting'&&f.time>=f.biteAt){f.state='bite';f.time=0;this.ui.toast('A bite! Click now to reel it in.','fish','success',3000);this.audio.play('collect');}else if(f.state==='bite'&&f.time>3){this.ui.toast('That one got away. Cast again.','fish');this.cancelFishing();}if(f.state!=='idle'){this.rope.visible=true;this.updateRope(this.avatar.userData.tool.getWorldPosition(new V3()),f.float.position,.2);}}
  cancelFishing(){if(!this.fishing)return;this.fishing.state='idle';this.fishing.float.visible=false;if(this.hook?.state==='idle')this.rope.visible=false;}
  attack(){if(this.player.attackCooldown>0)return false;this.player.attackCooldown=.65;this.player.action=.55;this.audio.play('hook');const distance=this.player.position.distanceTo(this.shark.position);if(distance<4.2&&this.shark.mesh.visible){if(!this.shark.hit())return false;this.particles.burst(this.shark.position.clone().add(new V3(0,.2,0)),0xe1e7ce,18,1.7);}else this.ui.toast('Spear thrust · get closer to the shark','spear','info',1400);}
  paddle(){if(!this.player.onRaft){this.ui.toast('Climb aboard your raft to paddle','paddle');return;}this.anchored=false;this.autopilot=null;const direction=this.aimPoint.clone().sub(this.raft.position).setY(0).normalize();this.raftVelocity.addScaledVector(direction,1.2);if(this.raftVelocity.length()>2.8)this.raftVelocity.setLength(2.8);this.player.action=.55;this.audio.play('splash');this.particles.burst(this.player.position.clone().setY(.1),0xd3e8d9,9,.7);}
  toggleHelm(){if(!this.player.onRaft){this.ui.toast('Return to your raft to take the helm','sail');return;}this.helming=!this.helming;this.autopilot=null;this.anchored=false;this.ui.toast(this.helming?`At the helm · ${this.ui.keyLabel('moveForward')} ${this.ui.keyLabel('moveLeft')} ${this.ui.keyLabel('moveBackward')} ${this.ui.keyLabel('moveRight')} to steer · ${this.ui.keyLabel('helm')} to let go`:'Back on deck · the currents are in charge','sail');}
  hull(){
    if(!this.hullDirty&&this.hullSamples)return this.hullSamples;
    const map=new Map(),cs=Math.cos(this.raft.rotation.y),sn=Math.sin(this.raft.rotation.y),add=(x,z)=>{const p={x:x*cs+z*sn,z:z*cs-x*sn};map.set(`${x},${z}`,p);};
    for(const b of this.grid.blocks.values())if(BLOCKS[b.type].buoyant){add(b.x,b.z);for(const [x,z] of [[-.48,-.48],[.48,-.48],[-.48,.48],[.48,.48]])add(b.x+x,b.z+z);}
    this.hullSamples=[...map.values()];this.hullRadius=this.hullSamples.reduce((r,p)=>Math.max(r,Math.hypot(p.x,p.z)),1);this.hullDirty=false;return this.hullSamples;
  }
  reconcileIslandUpgrade(){
    if(!this.saved||this.saved.world.generationVersion>=3)return;
    this.hull();this.islandRecovery={raft:false,player:false};
    if(this.world.boatContact(this.raft.position,this.hullSamples)){
      const i=[...this.world.islands].sort((a,b)=>Math.hypot(a.x-this.raft.position.x,a.z-this.raft.position.z)-Math.hypot(b.x-this.raft.position.x,b.z-this.raft.position.z))[0],q=i&&this.world.dockFor(i,this.hullRadius+1);
      if(q){const delta=new V3(q.x-this.raft.position.x,0,q.z-this.raft.position.z);this.raft.position.add(delta);if(this.player.onRaft)this.player.position.add(delta);this.raftVelocity.set(0,0,0);this.anchored=true;this.raft.updateMatrixWorld(true);this.islandRecovery.raft=true;}
    }
    if(!this.player.onRaft){
      const p=this.player.position,i=this.world.islands.find(i=>Math.hypot(p.x-i.x,p.z-i.z)<i.radius*1.3);
      if(i&&!this.player.swimming){const at=i.nav.closest({x:p.x-i.x,z:p.z-i.z},true);if(at>=0){const q=i.nav.point(at);p.set(i.x+q.x,q.y,i.z+q.z);this.player.velocity.set(0,0,0);this.player.grounded=true;this.player.swimming=false;this.islandRecovery.player=true;}}
    }
    if(this.autopilot){const i=this.world.islands.find(i=>i.id===this.autopilot.id);if(i){const p=this.world.dockFor(i,this.hullRadius);Object.assign(this.autopilot,p,{radius:1,dock:true});}}
    this.avatar.position.copy(this.player.position);
  }
  setCourse(island){this.hull();const target=this.world.dockFor(island,this.hullRadius);this.autopilot={id:island.id,name:island.name,x:target.x,z:target.z,radius:1,dock:true};this.helming=false;this.anchored=false;this.ui.closeModal();this.ui.toast(`Course set for ${island.name} · following a sheltered approach · ${this.ui.keyLabel('helm')} for manual steering`,'compass','success',5500);}
  toggleDive(){
    const p=this.player;
    if(p.diving){p.diving=false;p.surfacing=true;p.swimming=true;p.velocity.y=Math.max(p.velocity.y,1.2);this.ui.toast(`Surfacing · ${Math.ceil(p.oxygen)} seconds of oxygen remain`,'water','info');this.ui.update(true);return true;}
    if(!p.swimming){this.ui.toast(`Swim clear of the deck, then press ${this.ui.keyLabel('dive')} to dive`,'water');return false;}
    const surface=waveHeight(p.position.x,p.position.z,this.simTime,this.ocean.uniforms.amplitude.value);
    const floor=this.underwater.floorAt(p.position.x,p.position.z)+.48;
    if(surface-floor<SWIM_FEET_OFFSET+.22){this.ui.toast('The water is too shallow to dive here. Swim out from the reef shelf.','water','warning');return false;}
    p.diving=true;p.surfacing=false;p.grounded=false;p.onRaft=false;p.velocity.y=Math.min(p.velocity.y,-.7);this.oxygenWarnings=new Set();this.oxygenEmpty=false;
    this.audio.play('splash');this.audio.setUnderwater(true);
    const reserve=Math.ceil(this.underwater.oxygenCapacity(this.inventory));
    this.ui.toast(`Dive ready · ${reserve} seconds of air · hold ${this.ui.keyLabel('swimUp')} to ascend`,'water','info',5000);this.ui.update(true);return true;
  }
  nearestResource(max=3.1){
    const position=this.player.position;
    const land=this.world.nearestResource(position,max,this.player.diving);
    const water=this.underwater.nearestResource(position,max,this.player.diving);
    if(!land){return water;}
    if(!water){return {...land,source:'island'};}
    return position.distanceTo(water.position)<position.distanceTo(land.position)?water:{...land,source:'island'};
  }
  updateOxygen(dt){
    const p=this.player,capacity=this.underwater.oxygenCapacity(this.inventory);
    p.oxygen=clamp(Number.isFinite(p.oxygen)?p.oxygen:capacity,0,capacity);
    if(p.diving&&p.swimming){
      const surface=waveHeight(p.position.x,p.position.z,this.simTime,this.ocean.uniforms.amplitude.value);
      const depth=Math.max(0,surface-p.position.y);
      p.oxygen=Math.max(0,p.oxygen-dt*this.underwater.oxygenDrainRate(depth,this.inventory));
      for(const threshold of [20,10,5])if(p.oxygen<=threshold&&!this.oxygenWarnings?.has(threshold)){
        this.oxygenWarnings??=new Set();this.oxygenWarnings.add(threshold);
        this.ui.toast(threshold===20?'Low oxygen · begin returning toward the surface':threshold===10?'Critical oxygen · swim up now':'One last breath · surface immediately','water','warning',5500);
      }
      if(p.oxygen<=0){
        if(!this.oxygenEmpty){this.oxygenEmpty=true;this.ui.toast('Out of air · your body is forcing an ascent','water','warning',6000);}
        this.stats.damage(dt*1.1);
      }
    }else{
      const surface=waveHeight(p.position.x,p.position.z,this.simTime,this.ocean.uniforms.amplitude.value);
      const atSurface=p.position.y>=surface-SWIM_FEET_OFFSET+.16||p.onRaft||p.grounded;
      p.oxygen=Math.min(capacity,p.oxygen+dt*(atSurface?5:2.1));
      if(p.oxygen>=capacity-.1){this.oxygenWarnings=new Set();this.oxygenEmpty=false;}
    }
  }
  interact(){const fire=this.nearFire();if(fire){if(this.inventory.remove('water')){this.fires.delete(fire.id);this.ui.toast('Fire extinguished','water','success');}else this.ui.toast('You need fresh water to put out this fire','water','warning');return;}const r=this.nearestResource(3.2);if(r){if(r.source==='underwater')this.underwater.collect(r,this.player.position,this.player.diving);else this.world.collect(r,this.player.position,this.player.diving);return;}const station=this.nearStation();if(station){if(station.type==='sail'){this.setSailOpen(!this.sailOpen);this.ui.toast(this.sailOpen?'Sail unfurled · following the trade winds':'Sail furled · drifting slowly','sail');}else if(station.type==='workbench'){this.ui.openModal('inventory');}else if(station.type==='purifier'||station.type==='grill'){if(this.jobs.some(j=>j.blockId===station.id)||this.crafting.job?.stationKey===gridKey(station.x,station.y,station.z)){this.ui.toast('Still working. Give it a few seconds.','sun');return;}const baseRecipe=RECIPES.find(r=>r.id===(station.type==='purifier'?'water':'cookedFish')),rainCatch=station.type==='purifier'&&['rain','storm'].includes(this.time.weather);const recipe=rainCatch?{...baseRecipe,ingredients:{},name:'Collected rainwater'}:baseRecipe;if(!this.inventory.spend(recipe.ingredients)){this.ui.toast(station.type==='grill'?'You need one raw fish and one driftwood':'You need one driftwood to light the purifier','wood','warning');return;}this.jobs.push({blockId:station.id,recipe,time:0});this.audio.play('build');this.ui.toast(rainCatch?'Collecting rainwater · ready in 8 seconds':station.type==='purifier'?'Purifying seawater · ready in 8 seconds':'Fish on the grill · ready in 8 seconds',station.type,'info');}else if(station.type==='windcatcher')this.toggleHelm();else if(station.type==='rainCollector')this.ui.toast('Rain collector · one water per 35 seconds of rain · reserve limit 30','water');else if(station.type==='beacon')this.rescue();return;}this.ui.toast(`${this.ui.keyLabel('interact')} interacts with nearby workstations and island supplies`,'info');}
  setSailOpen(open) {this.sailOpen=!!open;for(const b of this.grid.blocks.values())if(b.type==='sail')b.mesh.userData.sail.visible=this.sailOpen;}
  nearStation(type=null,radius=1.9){let nearest=null,best=radius;for(const b of this.grid.blocks.values()){if(!BLOCKS[b.type].station||(type&&b.type!==type))continue;const p=this.raft.localToWorld(new V3(b.x,.5,b.z));const d=p.distanceTo(this.player.position);if(d<best){best=d;nearest=b;}}return nearest;}
  hasStation(type='workbench',radius=4){return !!this.nearStation(type,radius);}
  nearFire(){for(const[id]of this.fires){const b=[...this.grid.blocks.values()].find(b=>b.id===id);if(b&&this.raft.localToWorld(new V3(b.x,0,b.z)).distanceTo(this.player.position)<2)return b;}return null;}
  createGhost() {
    if(this.ghost)this.scene.remove(this.ghost);
    this.ghostMaterial??=new THREE.MeshBasicMaterial({color:0x8fcbb0,transparent:true,opacity:.48,depthWrite:false});
    this.ghost=createBlock(this.buildType);this.ghost.traverse(m=>{if(m.isMesh){m.material=this.ghostMaterial;m.castShadow=false;m.receiveShadow=false;}});this.ghost.visible=false;this.scene.add(this.ghost);
  }
  chooseBuild(type){this.buildType=type;this.createGhost();if(this.equipped!=='hammer')this.selectSlot(1);this.ui.renderBuildBar();this.ui.closeModal();}
  targetBlock() {
    this.raft.updateMatrixWorld(true);this.raycaster.setFromCamera(this.pointer,this.camera);
    const hit=this.raycaster.intersectObjects([...this.blockMeshes.values()],true).find(h=>h.object.userData.block);
    // Decorative gaps between planks must not select a structure behind the deck.
    const deckPoint=new V3(),plane=new THREE.Plane(new V3(0,1,0),-(this.raft.position.y+.26));
    if(this.raycaster.ray.intersectPlane(plane,deckPoint)) {
      const local=deckPoint.clone().sub(this.raft.position),deck=this.grid.at(Math.round(local.x),0,Math.round(local.z));
      if(deck&&BLOCKS[deck.type].buoyant&&(!hit||hit.distance>this.raycaster.ray.origin.distanceTo(deckPoint)+.08))return deck;
    }
    return hit?.object.userData.block||null;
  }
  updateBuilding(){this.ghost.visible=this.equipped==='hammer'&&!this.paused&&this.started;if(!this.ghost.visible)return;this.raycaster.setFromCamera(this.pointer,this.camera);const plane=new THREE.Plane(new V3(0,1,0),-(this.raft.position.y+.26));const point=new V3();if(!this.raycaster.ray.intersectPlane(plane,point))return;const local=point.clone().sub(this.raft.position);let x=Math.round(local.x),z=Math.round(local.z),y=0;const buoyant=BLOCKS[this.buildType].buoyant;
    if(buoyant){if(this.grid.at(x,0,z)){const dx=local.x-x,dz=local.z-z;if(Math.abs(dx)>Math.abs(dz))x+=dx>0?1:-1;else z+=dz>0?1:-1;}}else{const target=this.targetBlock();if(target){x=target.x;z=target.z;y=target.y+1;if(BLOCKS[target.type].station)y=target.y;}else y=1;}
    this.ghostCell={x,y,z};const result=this.grid.canPlace(this.buildType,x,y,z,this.crafting.research);this.ghostValid=result.valid&&this.inventory.has(BLOCKS[this.buildType].cost)&&this.player.position.distanceTo(this.raft.position.clone().add(new V3(x,0,z)))<8;this.ghostReason=!result.valid?result.reason:!this.inventory.has(BLOCKS[this.buildType].cost)?'Not enough materials':this.ghostValid?'Ready to build':'Too far from the raft';this.ghost.position.set(this.raft.position.x+x,this.raft.position.y+(y===0?0:.26+y-1),this.raft.position.z+z);this.ghost.rotation.y=this.buildRotation*Math.PI/2;this.ghostMaterial.color.setHex(this.ghostValid?0x8ccda9:0xdb7963);}
  placeBlock(){if(this.paused||this.equipped!=='hammer')return false;if(!this.ghostCell){this.ui.toast('Point at an edge of your raft to build','hammer');return;}this.updateBuilding();if(!this.ghostValid){this.ui.toast(this.ghostReason||'Find a connected, empty space','hammer','warning');return;}const{x,y,z}=this.ghostCell;if(!this.inventory.spend(BLOCKS[this.buildType].cost))return;this.grid.add(this.buildType,x,y,z,false,null,{rotation:this.buildRotation});this.progress.built++;this.audio.play('build');this.particles.burst(this.ghost.position.clone().add(new V3(0,.3,0)),0xd9c699,16,.9);this.ui.toast(`${BLOCKS[this.buildType].name} built`,'hammer','success',2000);}
  removalStatus(block) {
    if(!block)return {ok:false,reason:'Point at a structure to dismantle it'};
    if(this.equipped!=='hammer')return {ok:false,reason:'Equip the hammer before dismantling'};
    if(block.core)return {ok:false,reason:'Core foundation · protected'};
    if(this.raft.localToWorld(new V3(block.x,block.y,block.z)).distanceTo(this.player.position)>4)return {ok:false,reason:'Move within four meters to dismantle'};
    const detached=this.grid.previewRemoval(block);
    return {ok:true,detached,reason:detached.length?`${detached.length} connected structure${detached.length===1?'':'s'} will detach`:'Some materials will be returned',duration:detached.length?1600:950};
  }
  removeTargetBlock() {
    const block=this.targetBlock(),status=this.removalStatus(block);
    if(!status.ok){this.ui.toast(status.reason,'hammer','warning');return false;}
    this.dismantle={id:block.id,key:gridKey(block.x,block.y,block.z),start:performance.now(),duration:status.duration,detached:status.detached.length};
    this.ui.toast(`Keep holding ${this.ui.keyLabel('removeBlock')} · ${status.reason}`,'hammer',status.detached.length?'warning':'info',2200);return true;
  }
  updateDismantle(now) {
    const active=this.started&&!this.paused&&this.equipped==='hammer';const block=active?this.targetBlock():null;this.dismantleTarget=block;
    this.dismantleOutline.visible=!!block;
    if(block){this.dismantleOutline.setFromObject(block.mesh);this.dismantleOutline.material.color.setHex(block.core?0x83c5b0:0xe8bc80);}
    if(!this.dismantle)return;
    if(!this.isActionDown('removeBlock')||!block||block.id!==this.dismantle.id||!this.removalStatus(block).ok){this.dismantle=null;return;}
    if(now-this.dismantle.start>=this.dismantle.duration) {
      block.dismantled=true;this.dismantle=null;this.grid.remove(block.x,block.y,block.z);
      this.inventory.grant(Object.fromEntries(Object.entries(BLOCKS[block.type].cost).map(([id,n])=>[id,Math.max(1,Math.floor(n/2))])));
      this.audio.play('build');this.ui.toast('Dismantled safely · partial materials returned; detached supplies float nearby','hammer','success');
    }
  }
  repairBlock(){const b=this.targetBlock();if(!b)return;if(this.raft.localToWorld(new V3(b.x,b.y,b.z)).distanceTo(this.player.position)>4){this.ui.toast('Move within four meters to repair','repair','warning');return;}if(b.hp>=BLOCKS[b.type].hp){this.ui.toast('This structure is in good shape','repair');return;}if(!this.inventory.remove('wood')){this.ui.toast('One driftwood needed for repairs','wood','warning');return;}b.hp=BLOCKS[b.type].hp;b.mesh?.traverse(m=>{if(m.isMesh&&m.userData.baseColor){if(m.userData.baseMaterial){m.material.dispose();m.material=m.userData.baseMaterial;delete m.userData.baseMaterial;}else m.material.color.copy(m.userData.baseColor);m.userData.damaged=false;delete m.userData.baseColor;}});this.audio.play('build');this.ui.toast(`${BLOCKS[b.type].name} repaired`,'repair','success');}
  updateRaft(dt){this.raft.updateMatrixWorld(true);const riderLocal=this.player?.onRaft?this.raft.worldToLocal(this.player.position.clone()):null,old=this.raft.position.clone();const windBoost=[...this.grid.blocks.values()].some(b=>b.type==='windcatcher')?1.2:1,hasSail=[...this.grid.blocks.values()].some(b=>b.type==='sail');let desired=new V3(0,0,this.sailOpen&&hasSail?-.4:-.12);
    if(this.anchored)desired.set(0,0,0);
    if(this.autopilot){const a=this.autopilot;this.hull();const distance=Math.hypot(a.x-this.raft.position.x,a.z-this.raft.position.z),stop=a.dock?2.4:a.radius+5;
      if(distance<stop){this.ui.toast(`Anchor down at ${a.name}. Swim ashore to explore.`,'island','success',6000);this.autopilot=null;this.anchored=true;this.raftVelocity.set(0,0,0);desired.set(0,0,0);}
      else {
        if(!a._route?.length||a._chunk!==this.world.lastChunk){a._route=this.world.seaRoute(this.raft.position,a,this.hullRadius);a._chunk=this.world.lastChunk;}
        while(a._route?.length>1&&Math.hypot(a._route[0].x-this.raft.position.x,a._route[0].z-this.raft.position.z)<1.5)a._route.shift();
        const target=a._route?.[0]||a,dir=new V3(target.x-this.raft.position.x,0,target.z-this.raft.position.z),d=dir.length();
        if(a._route?.length===1&&d<1.5&&distance>stop+1)a._route=null;
        desired.copy(dir.normalize().multiplyScalar(2.4*windBoost*clamp(d/5,.30,1)));
      }
    }
    if(this.helming){const ix=(this.isActionDown('moveRight')?1:0)-(this.isActionDown('moveLeft')?1:0)+this.touchMove.x+this.gamepadMove.x,iz=(this.isActionDown('moveBackward')?1:0)-(this.isActionDown('moveForward')?1:0)+this.touchMove.y+this.gamepadMove.y;desired.set(Math.cos(this.cameraYaw)*ix+Math.sin(this.cameraYaw)*iz,0,-Math.sin(this.cameraYaw)*ix+Math.cos(this.cameraYaw)*iz).multiplyScalar(2.2*windBoost);if(desired.length()>2.5*windBoost)desired.setLength(2.5*windBoost);}
    this.raftVelocity.lerp(desired,1-Math.exp(-dt*.38));this.raft.position.addScaledVector(this.raftVelocity,dt);
    const samples=this.hull();
    if(this.world.boatContact(this.raft.position,samples)){
      const x=this.raft.position.x,z=this.raft.position.z;this.raft.position.x=old.x;
      if(this.world.boatContact(this.raft.position,samples)){this.raft.position.x=x;this.raft.position.z=old.z;if(this.world.boatContact(this.raft.position,samples))this.raft.position.set(old.x,this.raft.position.y,old.z);}
      this.raftVelocity.multiplyScalar(.2);if(this.autopilot)this.autopilot._route=null;
      this.reefDamageTimer+=dt;if(this.reefDamageTimer>1&&!this.settings.relaxed){this.reefDamageTimer=0;const exposed=this.grid.exposedFoundations().filter(b=>this.grid.at(b.x,b.y+1,b.z)?.type!=='armor');if(exposed.length)this.grid.damage(exposed[Math.floor(Math.random()*exposed.length)],5);this.ui.toast('Reef scraping the raft · steer into deeper water','foundation','warning');}
    }
    const amp=this.ocean.uniforms.amplitude.value,points=[];let sum=0,count=0,sx=0,sz=0,wx=0,wz=0;
    for(const b of this.grid.blocks.values())if(BLOCKS[b.type].buoyant){for(const[dx,dz]of [[-.4,-.4],[.4,-.4],[-.4,.4],[.4,.4],[0,0]]){const x=b.x+dx,z=b.z+dz,h=waveHeight(this.raft.position.x+x,this.raft.position.z+z,this.simTime,amp);sum+=h;count++;sx+=x*h;sz+=z*h;wx+=x*x;wz+=z*z;}}
    const target=count?sum/count:0;this.raftVerticalVelocity+=(target-this.raft.position.y)*12*dt-this.raftVerticalVelocity*4.2*dt;this.raft.position.y+=this.raftVerticalVelocity*dt;this.raft.rotation.z=THREE.MathUtils.lerp(this.raft.rotation.z,clamp(wx?sx/wx:0,-.12,.12),dt*2);this.raft.rotation.x=THREE.MathUtils.lerp(this.raft.rotation.x,clamp(wz?-sz/wz:0,-.12,.12),dt*2);this.raft.updateMatrixWorld(true);
    if(riderLocal){const carried=this.raft.localToWorld(riderLocal.clone());this.player.position.copy(carried);this.avatar.position.copy(carried);}
    // Collection nets share the same pooled salvage, rather than spawning inventory from nothing.
    for(const b of this.grid.blocks.values())if(b.type==='net'){const p=this.raft.localToWorld(new V3(b.x,.1,b.z));const d=this.debris.nearest(p,.8);if(d)this.collectDebris(d,true);}
  }
  rebuildRaftColliderBuckets(){
    this.raftColliderBuckets.clear();
    for(const block of this.grid.blocks.values())for(const collider of raftBlockColliders(block)){
      if(collider.layer!==COLLISION_LAYERS.raftSolid)continue;
      const reach=Math.hypot(collider.hx,collider.hz)+.55,minX=Math.floor(collider.cx-reach),maxX=Math.floor(collider.cx+reach),minZ=Math.floor(collider.cz-reach),maxZ=Math.floor(collider.cz+reach);
      for(let x=minX;x<=maxX;x++)for(let z=minZ;z<=maxZ;z++){const key=`${x},${z}`;if(!this.raftColliderBuckets.has(key))this.raftColliderBuckets.set(key,[]);this.raftColliderBuckets.get(key).push(collider);}
    }
    this.raftColliderDirty=false;
  }
  raftCollisionCandidates(localX,localZ,reach=1.6){
    if(this.raftColliderDirty)this.rebuildRaftColliderBuckets();
    const minX=Math.floor(localX-reach),maxX=Math.floor(localX+reach),minZ=Math.floor(localZ-reach),maxZ=Math.floor(localZ+reach),result=new Set();
    for(let x=minX;x<=maxX;x++)for(let z=minZ;z<=maxZ;z++)for(const collider of this.raftColliderBuckets.get(`${x},${z}`)||[])result.add(collider);
    return[...result];
  }
  raftGround(position){
    const local=this.raft.worldToLocal(position.clone()),x=Math.round(local.x),z=Math.round(local.z);let highest=null;
    for(let y=0;y<9;y++){const block=this.grid.at(x,y,z);if(!block)continue;const localSurface=raftWalkSurface(block,local.x,local.z);if(localSurface===null)continue;const worldSurface=this.raft.localToWorld(new V3(local.x,localSurface,local.z)).y;if(worldSurface<=position.y+PLAYER_COLLISION.stepHeight&&(!highest||worldSurface>highest.height))highest={height:worldSurface,block};}
    return highest;
  }
  recoverPlayerAfterLoad(){
    const player=this.player;if(!player)return;const support=this.raftGround(player.position);
    if(player.onRaft&&support&&Math.abs(player.position.y-support.height)<.65){player.position.y=support.height;player.grounded=true;player.onRaft=true;player.swimming=false;player.diving=false;player.surfacing=false;}
    else if(player.onRaft){player.onRaft=false;player.grounded=false;}
    const local=this.raft.worldToLocal(player.position.clone()),height=player.swimming?PLAYER_COLLISION.swimmingHeight:PLAYER_COLLISION.standingHeight,candidates=this.raftCollisionCandidates(local.x,local.z);
    const horizontal=resolveRaftHorizontal(local.x,local.z,candidates,local.y,height,PLAYER_COLLISION.radius);
    const vertical=resolveRaftVertical(local.y,local.y,horizontal.x,horizontal.z,candidates,height,PLAYER_COLLISION.radius,player.onRaft);
    if(horizontal.collided||vertical.blocked){local.x=horizontal.x;local.z=horizontal.z;local.y=vertical.y;player.position.copy(this.raft.localToWorld(local));}
  }
  updatePlayer(dt){
    const p=this.player;
    p.action=Math.max(0,p.action-dt);p.attackCooldown=Math.max(0,p.attackCooldown-dt);p.jumpCooldown=Math.max(0,p.jumpCooldown-dt);p.stingCooldown=Math.max(0,p.stingCooldown-dt);
    const old=p.position.clone(),wasSwimming=p.swimming,wasDiving=p.diving,wasSurfacing=p.surfacing,wasOnRaft=p.onRaft;
    let ix=(this.isActionDown('moveRight')?1:0)-(this.isActionDown('moveLeft')?1:0)+this.touchMove.x+this.gamepadMove.x;
    let iz=(this.isActionDown('moveBackward')?1:0)-(this.isActionDown('moveForward')?1:0)+this.touchMove.y+this.gamepadMove.y;
    if(this.helming){ix=0;iz=0;}
    const movement=new V3(Math.cos(this.cameraYaw)*ix+Math.sin(this.cameraYaw)*iz,0,-Math.sin(this.cameraYaw)*ix+Math.cos(this.cameraYaw)*iz);
    if(movement.length()>1)movement.normalize();
    const moving=movement.length()>.05,swimmingMode=wasSwimming||wasDiving||wasSurfacing,sprinting=this.isActionDown('sprint');
    const finBoost=wasDiving&&this.inventory.count('divingFins')>0?1.35:1;
    const speed=(swimmingMode?(wasDiving?2.45:2.15):(sprinting?4.3:2.65))*finBoost*(this.stats.stung>0?.7:1);
    const horizontalRate=swimmingMode?(moving?4.8:2.4):(moving?16:13),blend=1-Math.exp(-horizontalRate*dt);
    p.velocity.x=THREE.MathUtils.lerp(p.velocity.x,movement.x*speed,blend);p.velocity.z=THREE.MathUtils.lerp(p.velocity.z,movement.z*speed,blend);
    p.position.x+=p.velocity.x*dt;p.position.z+=p.velocity.z*dt;
    this.world.resolveMovement(old,p.position,swimmingMode);
    let local=this.raft.worldToLocal(p.position.clone()),raftCandidates=this.raftCollisionCandidates(local.x,local.z),horizontal=resolveRaftHorizontal(local.x,local.z,raftCandidates,local.y,swimmingMode?PLAYER_COLLISION.swimmingHeight:PLAYER_COLLISION.standingHeight,PLAYER_COLLISION.radius);
    if(horizontal.collided){local.x=horizontal.x;local.z=horizontal.z;p.position.copy(this.raft.localToWorld(local));p.velocity.x*=.18;p.velocity.z*=.18;}
    const wreck=this.underwater?.wreck;let wreckOldLocal=null,wreckColliders=null;
    if(wreck&&Math.min(Math.hypot(old.x-wreck.position.x,old.z-wreck.position.z),Math.hypot(p.position.x-wreck.position.x,p.position.z-wreck.position.z))<24){wreck.group.updateWorldMatrix(true,false);wreckOldLocal=wreck.group.worldToLocal(old.clone());wreckColliders=wreck.colliders;const wreckLocal=wreck.group.worldToLocal(p.position.clone()),wreckHorizontal=resolveRaftHorizontal(wreckLocal.x,wreckLocal.z,wreckColliders,wreckLocal.y,swimmingMode?PLAYER_COLLISION.swimmingHeight:PLAYER_COLLISION.standingHeight,PLAYER_COLLISION.radius);if(wreckHorizontal.collided){wreckLocal.x=wreckHorizontal.x;wreckLocal.z=wreckHorizontal.z;p.position.copy(wreck.group.localToWorld(wreckLocal));p.velocity.x*=.2;p.velocity.z*=.2;}}
    const jumpPressed=this.isActionDown('jump');let jumpedFromWater=false;
    if(jumpPressed&&p.jumpCooldown<=0&&(p.grounded||wasSwimming||wasDiving||wasSurfacing)){
      if(wasDiving){p.diving=false;p.surfacing=true;p.swimming=true;p.velocity.y=Math.max(p.velocity.y,1.35);}
      else if(wasSwimming){p.diving=false;p.surfacing=false;p.swimming=false;p.velocity.y=3.45;jumpedFromWater=true;p.onRaft=false;}
      else{p.diving=false;p.surfacing=false;p.velocity.y=4.7;}
      p.grounded=false;p.jumpCooldown=.62;this.audio.play('hook');
    }
    const waterSurface=waveHeight(p.position.x,p.position.z,this.simTime,this.ocean.uniforms.amplitude.value),waterline=waterSurface-SWIM_FEET_OFFSET,seabedFoot=this.underwater.floorAt(p.position.x,p.position.z)+.48;
    const swimUp=this.isActionDown('swimUp')?1:0,swimDown=this.isActionDown('swimDown')?1:0;
    if(p.diving&&(wasSwimming||p.swimming)){
      const ceiling=waterSurface-(PLAYER_COLLISION.swimmingHeight+.08),clearance=ceiling-seabedFoot;
      if(clearance<.18){p.diving=false;p.surfacing=false;p.position.y=Math.max(seabedFoot,waterline);p.velocity.y=0;}
      else{
        let vertical=clamp(this.mobileVertical+swimUp-swimDown,-1,1);if(p.oxygen<=0)vertical=Math.max(vertical,1);
        const target=vertical===0?.16:vertical*2.55;p.velocity.y=THREE.MathUtils.lerp(p.velocity.y,target,1-Math.exp(-4.2*dt));p.position.y+=p.velocity.y*dt;
        if(p.position.y<seabedFoot){p.position.y=seabedFoot;p.velocity.y=Math.max(0,p.velocity.y);}
        if(p.position.y>ceiling){p.position.y=ceiling;p.velocity.y=Math.min(0,p.velocity.y);}
        p.swimming=true;
      }
    }else if(p.surfacing&&(wasSwimming||wasSurfacing)){
      p.velocity.y=THREE.MathUtils.lerp(p.velocity.y,2.7,1-Math.exp(-4.4*dt));p.position.y+=p.velocity.y*dt;
      if(p.position.y<seabedFoot){p.position.y=seabedFoot;p.velocity.y=Math.max(0,p.velocity.y);}
      if(p.position.y>=waterline){p.position.y=waterline;p.velocity.y=0;p.surfacing=false;p.swimming=true;}
      else p.swimming=true;
    }else if(wasSwimming&&!jumpedFromWater&&!p.grounded){
      const control=clamp(this.mobileVertical+swimUp-swimDown,-1,1);
      const buoyancy=control?control*2.15:clamp((waterline-p.position.y)*3.1,-1.15,1.15);
      p.velocity.y=THREE.MathUtils.lerp(p.velocity.y,buoyancy,1-Math.exp(-(control?3.8:2.8)*dt));p.position.y+=p.velocity.y*dt;
      if(p.position.y<seabedFoot){p.position.y=seabedFoot;p.velocity.y=Math.max(0,p.velocity.y);}
      const surfaceCeiling=waterSurface-(PLAYER_COLLISION.swimmingHeight+.04);
      if(p.position.y>surfaceCeiling){p.position.y=surfaceCeiling;p.velocity.y=Math.min(0,p.velocity.y);}
      p.swimming=true;
    }else{
      p.velocity.y-=12*dt;p.position.y+=p.velocity.y*dt;
    }
    const caveCeiling=this.world.ceilingAt(p.position,old.y);if(caveCeiling!==null){p.position.y=caveCeiling;p.velocity.y=Math.min(0,p.velocity.y);}
    local=this.raft.worldToLocal(p.position.clone());raftCandidates=this.raftCollisionCandidates(local.x,local.z);
    const collisionHeight=(p.swimming||p.diving||p.surfacing)?PLAYER_COLLISION.swimmingHeight:PLAYER_COLLISION.standingHeight;
    const oldLocal=this.raft.worldToLocal(old.clone()),vertical=resolveRaftVertical(oldLocal.y,local.y,local.x,local.z,raftCandidates,collisionHeight,PLAYER_COLLISION.radius,wasOnRaft);
    if(vertical.blocked){local.y=vertical.y;p.position.copy(this.raft.localToWorld(local));p.velocity.y=vertical.grounded?0:Math.min(0,p.velocity.y);}
    if(wreckOldLocal&&wreckColliders){const wreckLocal=this.underwater.wreck.group.worldToLocal(p.position.clone()),wreckHeight=(p.swimming||p.diving||p.surfacing)?PLAYER_COLLISION.swimmingHeight:PLAYER_COLLISION.standingHeight,wreckVertical=resolveRaftVertical(wreckOldLocal.y,wreckLocal.y,wreckLocal.x,wreckLocal.z,wreckColliders,wreckHeight,PLAYER_COLLISION.radius,false);if(wreckVertical.blocked){wreckLocal.y=wreckVertical.y;p.position.copy(this.underwater.wreck.group.localToWorld(wreckLocal));p.velocity.y=wreckVertical.grounded?0:Math.min(0,p.velocity.y);}}
    const raftGround=this.raftGround(p.position),islandGround=this.world.groundAt(p.position.x,p.position.z,p.position.y);
    let ground=raftGround?.height??-Infinity,onRaftGround=!!raftGround;
    if(islandGround&&islandGround.height>ground){ground=islandGround.height;onRaftGround=false;}
    const shallowSeabed=seabedFoot>=waterline-.02;
    if(shallowSeabed&&!p.diving&&!p.surfacing&&p.position.y<=seabedFoot&&p.velocity.y<=0){ground=seabedFoot;onRaftGround=false;}
    p.grounded=false;p.onRaft=false;
    if(Number.isFinite(ground)&&p.position.y<=ground+.015&&p.velocity.y<=0&&!p.diving&&!p.surfacing){
      p.position.y=ground;p.velocity.y=0;p.grounded=true;p.onRaft=onRaftGround;p.swimming=false;p.diving=false;p.surfacing=false;
    }else if(p.diving){p.swimming=true;}
    else if(p.surfacing){p.swimming=true;}
    else if(jumpedFromWater){p.swimming=false;}
    else if(wasSwimming&&p.position.y<=waterSurface+SWIM_EXIT_HEIGHT){p.swimming=true;}
    else if(p.position.y<=waterSurface-SWIM_ENTRY_DEPTH&&p.velocity.y<.35){p.swimming=true;p.diving=false;if(!wasSwimming)this.audio.play('splash');}
    else p.swimming=false;
    if(!p.swimming){p.diving=false;p.surfacing=false;}
    const submerged=p.swimming&&(p.diving||p.surfacing||waterSurface-p.position.y>.65);
    if(this.underwaterAudio!==submerged){this.underwaterAudio=submerged;this.audio.setUnderwater(submerged);}
    if(moving){const heading=Math.atan2(movement.x,movement.z);p.heading+=(THREE.MathUtils.euclideanModulo(heading-p.heading+Math.PI,Math.PI*2)-Math.PI)*Math.min(1,dt*12);}
    else if(this.mouse.down||p.action>0){const heading=Math.atan2(this.aimPoint.x-p.position.x,this.aimPoint.z-p.position.z);p.heading+=(THREE.MathUtils.euclideanModulo(heading-p.heading+Math.PI,Math.PI*2)-Math.PI)*Math.min(1,dt*10);}
    p.anim+=dt*(moving?speed:1.1);this.avatar.position.copy(p.position);this.avatar.scale.set(1,p.swimming?.72:1,1);this.avatar.rotation.y=p.heading;this.avatar.userData.body.position.y=moving?Math.sin(p.anim*2)*.016:Math.sin(this.simTime*1.4)*.01;
    const swing=moving?Math.sin(p.anim)*(p.swimming?.7:.42):0;this.avatar.userData.legs[0].rotation.x=swing;this.avatar.userData.legs[1].rotation.x=-swing;this.avatar.userData.arms[0].rotation.x=-swing*.7;this.avatar.userData.arms[1].rotation.x=swing*.7-(p.action>0?Math.sin(p.action/.55*Math.PI)*1.2:0);if(this.hook.state==='charging')this.avatar.userData.arms[1].rotation.x=-1.1;
    if(p.swimming){this.avatar.rotation.x=p.diving?.72:p.surfacing?.08:.25;if(this.shark.mesh.visible&&p.position.distanceTo(this.shark.position)<2.7&&this.shark.biteCooldown<=0&&!this.settings.relaxed){this.stats.damage(10);this.shark.biteCooldown=5;this.ui.toast('Shark nearby! Get back to the raft.','spear','warning');}}else this.avatar.rotation.x=0;
    for(const island of this.world.islands)for(const jelly of island.jellies){jelly.position.y=-.28+Math.sin(this.simTime*1.5+jelly.position.x)*.1;const jpos=jelly.getWorldPosition(new V3());if(p.swimming&&p.position.distanceTo(jpos)<.7&&p.stingCooldown<=0){p.stingCooldown=10;this.stats.sting();}}
    if(p.position.distanceTo(this.raft.position)>230){p.position.copy(this.raft.position).add(new V3(.5,.5,.5));p.velocity.set(0,0,0);p.diving=false;p.surfacing=false;p.swimming=false;this.ui.toast('The current carried you home. Stay within sight of your raft.','anchor');}
  }
  updateJobs(dt) {
    const byId=new Map([...this.grid.blocks.values()].map(b=>[b.id,b]));
    for(let i=this.jobs.length-1;i>=0;i--) {
      const job=this.jobs[i];if(!byId.has(job.blockId)){this.cancelStationJob(job.blockId);continue;}
      job.time+=dt;
      if(job.time+1e-9>=job.recipe.seconds) {
        this.jobs.splice(i,1); // settle first, so a save/inventory listener sees no reservation
        this.inventory.add(job.recipe.output,job.recipe.amount);
        if(job.recipe.output==='water')this.progress.water++;this.progress.crafted++;
        this.ui.toast(`${job.recipe.name} is ready`,ITEMS[job.recipe.output].icon,'success');this.audio.play('craft');
      }
    }
    for(const b of this.grid.blocks.values())if(b.type==='rainCollector'&&['rain','storm'].includes(this.time.weather)&&this.inventory.count('water')<30) {
      b.production+=dt;if(b.production+1e-9>=35){b.production=0;this.inventory.add('water',1);this.progress.water++;this.ui.toast('Rain collector · +1 fresh water','water','success');}
    }
    for(const [id,fire] of this.fires) {
      const b=byId.get(id);if(!b){this.fires.delete(id);continue;}fire.timer+=dt;this.grid.damage(b,3*dt);
      if(Math.random()<dt*14)this.particles.burst(this.raft.localToWorld(new V3(b.x,.55+b.y,b.z)),0xe4a052,2,.7);
      if(fire.timer>18)this.fires.delete(id);
    }
  }
  renderCamera(dt){const submerged=!!(this.player?.swimming&&(this.player?.diving||this.player?.surfacing)),target=(this.player?.position||new V3(.5,0,.5)).clone().add(new V3(0,submerged ? .42 : .8,0));if(this.helming)target.copy(this.raft.position).add(new V3(.5,.8,.5));this.cameraTarget.lerp(target,1-Math.exp(-dt*5));this.cameraDiveBlend=THREE.MathUtils.lerp(this.cameraDiveBlend,submerged?1:0,1-Math.exp(-dt*2.6));const pitch=THREE.MathUtils.lerp(this.cameraPitch,-.08,this.cameraDiveBlend),cp=Math.cos(pitch),sp=Math.sin(pitch),distance=THREE.MathUtils.lerp(this.cameraDistance,Math.min(this.cameraDistance,3.8),this.cameraDiveBlend)*clamp(1/this.camera.aspect,1,1.6);this.camera.position.set(this.cameraTarget.x+Math.sin(this.cameraYaw)*distance*cp,this.cameraTarget.y+sp*distance,this.cameraTarget.z+Math.cos(this.cameraYaw)*distance*cp);this.world?.cameraClip(this.cameraTarget,this.camera.position);this.camera.lookAt(this.cameraTarget);this.camera.updateMatrixWorld();this.raycaster.setFromCamera(this.pointer,this.camera);if(!this.raycaster.ray.intersectPlane(this.oceanPlane,this.aimPoint))this.aimPoint.copy(this.player.position).add(new V3(0,0,-10));const max=40;if(this.aimPoint.distanceTo(this.player.position)>max){const d=this.aimPoint.clone().sub(this.player.position).normalize();this.aimPoint.copy(this.player.position).addScaledVector(d,max);this.aimPoint.y=0;}}
  gamepad(dt){
    let pads;try{pads=navigator.getGamepads?.();}catch{return;}
    const pad=pads&&[...pads].find(Boolean);this.gamepadMove={x:0,y:0};if(!pad)return;if(this.gamepadRequireNeutral){if(pad.buttons.some(b=>b.pressed)||pad.axes.some(a=>Math.abs(a)>.17))return;this.gamepadRequireNeutral=false;}
    const dead=v=>Math.abs(v)>.17?v:0;
    const pressed=(id,fn)=>{const down=!!pad.buttons[id]?.pressed;if(down&&!this.gamepadButtons[id])fn();this.gamepadButtons[id]=down;};
    pressed(3,()=>this.ui.modal?this.ui.closeModal():this.ui.openModal('inventory'));
    pressed(9,()=>this.ui.modal?this.ui.closeModal():this.ui.openModal('pause'));
    if(this.paused){
      const navigate=delta=>{const buttons=[...document.querySelectorAll('#modal-panel button:not(:disabled),#modal-panel select,#modal-panel input')];const index=Math.max(0,buttons.indexOf(document.activeElement));buttons[(index+delta+buttons.length)%buttons.length]?.focus({preventScroll:false});};
      pressed(12,()=>navigate(-1));pressed(13,()=>navigate(1));pressed(14,()=>navigate(-1));pressed(15,()=>navigate(1));
      pressed(0,()=>{if(document.activeElement?.closest('#modal-panel'))document.activeElement.click();});pressed(1,()=>this.ui.closeModal());
      this.gamepadButtons[7]=!!pad.buttons[7]?.pressed;return;
    }
    this.gamepadMove.x=dead(pad.axes[0]);this.gamepadMove.y=dead(pad.axes[1]);
    this.cameraYaw-=dead(pad.axes[2]||0)*dt*2*this.settings.mouseSensitivity;this.cameraPitch=clamp(this.cameraPitch+dead(pad.axes[3]||0)*dt*this.settings.mouseSensitivity,.12,1.2);
    if(this.gamepadMove.x||this.gamepadMove.y||dead(pad.axes[2]||0)||dead(pad.axes[3]||0))this.pointer.set(0,.25);
    pressed(0,()=>{this.pulseAction('jump',150);this.start();});pressed(1,()=>this.toggleHelm());
    pressed(4,()=>this.selectSlot(this.selectedSlot-1));pressed(5,()=>this.selectSlot(this.selectedSlot+1));pressed(2,()=>this.interact());
    pressed(6,()=>{if(this.equipped==='hammer')this.placeBlock();});
    const trigger=!!pad.buttons[7]?.pressed;
    if(trigger&&!this.gamepadButtons[7]){this.start();this.pointer.set(0,.25);if(this.equipped==='hook'&&this.hook.state==='idle'){this.hook.state='charging';this.hook.charge=.22;}else this.primaryAction();}
    if(!trigger&&this.gamepadButtons[7]&&this.hook.state==='charging')this.castHook();
    this.gamepadButtons[7]=trigger;
  }
  rescue(){if(this.progress.rescued){this.ui.toast('Your signal is still out there. Keep exploring.','signal','success');return;}this.progress.rescued=true;this.audio.play('rescue');this.paused=true;this.ui.victory();this.save();}
  revive(){this.stats.health=100;this.stats.hunger=65;this.stats.thirst=65;this.stats.alive=true;for(const id of['wood','leaf','plastic','scrap'])this.inventory.items[id]=Math.ceil(this.inventory.count(id)*.7);if(![...this.grid.blocks.values()].some(b=>b.core)){for(let x=0;x<=1;x++)for(let z=0;z<=1;z++)this.grid.add('foundation',x,0,z,true);}this.player.position.copy(this.raft.position).add(new V3(.5,.4,.5));this.player.velocity.set(0,0,0);this.player.onRaft=true;this.player.diving=false;this.player.surfacing=false;this.ui.closeModal();this.ui.toast('A new breath. Some supplies were lost to the sea.','heart');}
  simulate(dt) {
    if(this.paused||!this.stats.alive)return;
    this.simTime+=dt;this.time.update(dt);this.stats.update(dt,this.settings.relaxed);
    if(!this.stats.alive)return;
    const craft=this.crafting.job;
    if(craft?.stationKey&&!this.grid.blocks.has(craft.stationKey))this.crafting.cancel();
    this.crafting.update(dt);this.updateRaft(dt);this.updatePlayer(dt);this.updateOxygen(dt);this.updateHook(dt);this.updateFishing(dt);this.updateJobs(dt);
    this.debris.update(dt,this.simTime,this.raft.position,this.camera,this.ocean.uniforms.amplitude.value);this.shark.update(dt,this.simTime,this.raft,this.grid,this.settings.relaxed);this.particles.update(dt);
    this.questTimer=(this.questTimer||0)+dt;if(this.questTimer>=.25){this.questTimer=0;this.quests.update(this.progress,this.crafting.research);}
    this.saveTimer+=dt;if(this.saveTimer>20){this.saveTimer=0;this.save();}
  }
  updatePresentation(dt,active) {
    const atm=this.atmosphere.update(dt,this.simTime,this.player.position,this.time,this.time.weather);
    const submerged=this.player.swimming&&(this.player.diving||this.player.surfacing);if(submerged)atm.fog.setHex(0x176b73);
    this.ocean.uniforms.fogColor.value.copy(atm.fog);this.ocean.uniforms.sunDirection.value.copy(this.atmosphere.sun.position).sub(this.player.position).normalize();this.ocean.update(this.simTime,this.player.position,this.time.weather,atm.daylight,this.world.islands,dt);if(submerged){this.ocean.uniforms.fogDensity.value=.026;this.scene.fog.density=.028;}
    this.world.setDetail(this.player.position,QUALITY_PRESETS[this.activeQuality]);this.underwater?.update(dt,this.player.position);this.ui?.mobileControls?.update(dt);this.world.animate(this.simTime,atm.daylight,this.time.weather==='storm'?2:this.time.weather==='rain'?1.35:1);
    if(atm.lightning&&active) {
      this.audio.play('damage');if(!this.settings.relaxed&&Math.random()<.6){const blocks=[...this.grid.blocks.values()].filter(b=>BLOCKS[b.type].wooden),target=blocks[Math.floor(Math.random()*blocks.length)];if(target){this.fires.set(target.id,{timer:0});this.ui.toast('Lightning struck! Use fresh water nearby to put out the fire.','storm','warning',6000);}}
    }
  }
  frame(now) {
    if(this.disposed)return;
    const rawDt=this.lastFrame===null?0:Math.max(0,(now-this.lastFrame)/1000);this.lastFrame=now;this.frameCount++;if(rawDt>0)this.fps=THREE.MathUtils.lerp(this.fps,1/rawDt,.05);
    if(!document.hidden&&!this.contextLost) {
      this.gamepad(Math.min(rawDt,.1));const active=this.started&&!this.paused&&this.stats.alive;let simulated=0;
      if(!this.paused) {
        if(active){this.world.update(this.raft.position,1);simulated=this.clock.advance(rawDt,dt=>this.simulate(dt));}
        else {const dt=Math.min(rawDt,.1);this.introTime=(this.introTime||0)+dt;simulated=dt;this.avatar.userData.body.position.y=Math.sin((this.simTime+this.introTime)*1.4)*.01;if(!this.saved){this.simTime+=dt;this.raft.position.y=waveHeight(this.raft.position.x,this.raft.position.z,this.simTime)*.15;this.debris.update(dt,this.simTime,this.raft.position,this.camera);this.shark.update(dt,this.simTime,this.raft,this.grid,true);}}
        this.updatePresentation(simulated,active);
      }
      this.renderCamera(Math.min(rawDt,.1));this.updateBuilding();this.updateDismantle(now);
      this.aimRing.visible=this.started&&!this.paused&&['hook','fishingRod','paddle'].includes(this.equipped);this.aimRing.position.set(this.aimPoint.x,waveHeight(this.aimPoint.x,this.aimPoint.z,this.simTime)+.025,this.aimPoint.z);this.aimRing.scale.setScalar(this.hook.state==='charging'?1+this.hook.charge*.35:1);
      const target=this.shark.target;this.threatRing.visible=!this.paused&&!!target&&['targeting','attacking'].includes(this.shark.state)&&this.grid.at(target.x,target.y,target.z)===target;
      if(this.threatRing.visible){this.threatRing.position.copy(this.raft.localToWorld(new V3(target.x,.29,target.z)));this.threatRing.material.opacity=.55+Math.sin(this.simTime*7)*.35;}
      this.statsTimer+=rawDt;if(this.statsTimer>=.1&&(!this.paused||this.renderNeeded)){this.statsTimer=0;this.ui.update();}
      if(!this.paused||this.renderNeeded){this.renderer.render(this.scene,this.camera);this.renderNeeded=false;}
      this.quality.update(rawDt,active&&this.lastFrame!==null);this.monitor.recordFrame(rawDt,now,!this.paused&&this.lastFrame!==null);
    } else {this.clock.reset();this.monitor.recordFrame(0,now,false);}
    if(!this.disposed)this.animationFrameId=requestAnimationFrame(this.frame);
  }

  dispose({save=true}={}) {
    if(this.disposed)return;
    if(save)this.save();
    this.disposed=true;this.ready=false;
    if(this.animationFrameId)cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId=null;this.lifecycle.abort();this.clearInput();
    this.ui?.dispose();this.monitor?.element.remove();
    this.underwater?.dispose();this.world?.dispose();
    disposeObject(this.scene);this.scene.clear();
    this.renderer.dispose();this.renderer.forceContextLoss();this.renderer.domElement.remove();
    document.body.classList.remove('voyage-started','menu-open','is-building','hide-hud','underwater');this.audio.setUnderwater(false);
    if(window.tidebound===this)delete window.tidebound;
    if(window.tidebreak===this)delete window.tidebreak;
  }
}
