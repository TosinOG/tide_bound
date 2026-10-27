import * as THREE from 'three';
import { ITEMS, BLOCKS, RECIPES, QUICKBAR, WEATHER, LORE, STARTER_ITEMS, META, RESEARCH, TOOL_TIERS, BUFFS, DIFFICULTIES, STORY_ISLANDS, STORY_BY_CHUNK, PALETTE, TRADES, FISH_TABLE, ACHIEVEMENTS, TUTORIAL_STEPS } from './data.js';
import { EventBus, Inventory, SurvivalStats, GridManager, CraftingManager, TimeAndWeather, clamp, gridKey, FixedStepClock } from './systems.js';
import { material, box, cylinder, sphere, beam, createBlock, createAvatar, createHook, createSpear, createPaddle, createFish, disposeObject } from './assets.js';
import { Ocean, WorldGenerator, DebrisSpawner, SharkAI, SeagullAI, ParticlePool, Atmosphere, waveHeight } from './world.js';
import { SeaAudio } from './audio.js';
import { UI } from './ui.js';

import { SAVE_KEY, LEGACY_SAVE_KEY, PREVIOUS_SAVE_KEY, IMPORT_BACKUP_KEY, MAX_SAVE_BYTES, normalizeSave, reservedRecipe, readStoredSave, writeStoredSave, readBackup } from './persistence.js';
import { QualityController, PerformanceMonitor, QUALITY_PRESETS } from './performance.js';
import { QuestManager, VoyageLog, Tutorial, voyageMetrics } from './progression.js';
import { normalizePreferences, readPreferences, writePreferences } from './config.js';
const V3=THREE.Vector3;
export class Game {
  constructor(options={}){
    this.bus=new EventBus();
    if(Object.hasOwn(options,'saved')){this.saved=options.saved;this.loadStatus=options.loadStatus||{data:this.saved};}else this.saved=this.readSave();
    this.onMainMenu=options.onMainMenu||null;this.lifecycle=new AbortController();this.disposed=false;
    let preferences={};try{preferences=readPreferences(localStorage,this.saved?.settings||{});}catch{preferences=normalizePreferences(this.saved?.settings||{});}
    this.started=false;this.paused=false;this.ready=false;this.simTime=this.saved?.simTime||0;this.lastFrame=null;this.performanceWindow=0;this.performanceFrames=0;this.autoLow=false;this.accumulator=0;this.clock=new FixedStepClock();this.contextLost=false;this.renderNeeded=true;this.savingBlocked=!!this.loadStatus?.error&&!this.loadStatus?.unavailable;this.storageAvailable=!this.loadStatus?.unavailable;this.frameCount=0;this.fps=60;this.saveTimer=0;this.statsTimer=0;this.weatherNotice=0;
    this.settings=normalizePreferences({...this.saved?.settings,...preferences,...options.settings});
    this.scene=new THREE.Scene();this.renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.25));this.renderer.setSize(innerWidth,innerHeight);this.renderer.shadowMap.enabled=this.settings.quality!=='low';this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.14;this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.domElement.id='ocean-canvas';this.renderer.domElement.setAttribute('aria-label',META.title+' 3D survival game. Use WASD to move and click to use your equipped tool.');this.renderer.domElement.tabIndex=0;document.getElementById('stage').appendChild(this.renderer.domElement);
    this.camera=new THREE.PerspectiveCamera(48,innerWidth/innerHeight,.08,1200);this.cameraYaw=this.saved?.camera.yaw??-.35;this.cameraPitch=this.saved?.camera.pitch??.30;this.cameraDistance=this.saved?.camera.distance??10.5;this.cameraTarget=new V3(.5,.7,.5);this.camera.position.set(7,6,10);
    this.raycaster=new THREE.Raycaster();this.pointer=new THREE.Vector2(.12,.05);this.pointerScreen={x:innerWidth*.56,y:innerHeight*.52};this.aimPoint=new V3(3,0,6);this.oceanPlane=new THREE.Plane(new V3(0,1,0),0);this.keys=new Set();this.mouse={down:false,right:false,dragged:false,startX:0,startY:0};this.touchMove={x:0,y:0};this.gamepadButtons={};this.gamepadMove={x:0,y:0};
    this.inventory=new Inventory(this.bus,this.saved?.inventory||STARTER_ITEMS);this.stats=new SurvivalStats(this.bus,this.saved?.stats);this.grid=new GridManager(this.bus);this.crafting=new CraftingManager(this.inventory,this.bus);this.crafting.research=new Set(this.saved?.research||[]);this.time=new TimeAndWeather(this.bus,this.saved?.time);this.time.dynamic=this.settings.dynamicWeather;
    this.quickbar=[...this.saved?.quickbar||QUICKBAR];this.selectedSlot=this.saved?.camera.selectedSlot??0;this.buildType=this.saved?.camera.buildType??'foundation';this.buildRotation=this.saved?.camera.buildRotation??0;this.toolVisuals=new Map();this.dismantle=null;this.dismantleTarget=null;this.ghost=null;this.ghostCell=null;this.ghostValid=false;this.helming=this.saved?.raft.helming??false;this.anchored=this.saved?.raft.anchored??false;this.autopilot=this.saved?.raft.autopilot??null;this.sailOpen=this.saved?.raft.sailOpen??true;this.raftVelocity=new V3().fromArray(this.saved?.raft.velocity??[0,0,-.12]);this.raftVerticalVelocity=this.saved?.raft.verticalVelocity??0;this.jobs=[];this.fires=new Map();this.reefDamageTimer=0;this.lightningCooldown=0;
    const extraCounters={cooked:0,courses:0,trades:0,painted:0,upgrades:0,codes:0,finale:0,endless:0};
    this.progress={salvaged:0,built:0,crafted:0,water:0,islands:0,caches:0,poi:0,secrets:0,journals:0,puzzles:0,sharks:0,reefs:0,rescued:false,...extraCounters,...this.saved?.progress};
    this.notebook=[...this.saved?.notebook||[]];this.quests=new QuestManager(this.bus,this.inventory,this.saved?.quests);
    const fresh={achievements:[],tutorial:{step:0,done:false},codes:[],storyVisited:[],difficulty:this.settings.difficulty||'castaway',worldSeed:this.settings.worldSeed||0,endless:false,bossDefeated:false,engineFuel:0,paintCharges:2,storage:{},biomesSeen:[]};
    this.voyage=this.saved?.voyage?{...fresh,...structuredClone(this.saved.voyage)}:fresh;
    this.voyageLog=new VoyageLog(this.bus,{earned:this.voyage.achievements});
    this.tutorial=new Tutorial(this.bus,this.voyage.tutorial);
    this.difficulty=this.voyage.difficulty||this.settings.difficulty||'castaway';
    this.fx={shake:0,hitStop:0,flash:0};
    this.firstPerson=!!this.settings.firstPerson;
    this.photoMode=false;this.photoRequested=false;
    this.freeRotation=0;this.rotateHeld=false;this.rotateDragged=false;
    this.stepTimer=0;this.heartbeatTimer=0;this.wakeTimer=0;
    this.lastWeather='';this.threatLevel=0;
    this.ocean=new Ocean(this.scene);this.atmosphere=new Atmosphere(this.scene);this.world=new WorldGenerator(this.scene,this.bus,this.saved?.world,{seed:this.voyage.worldSeed,biomesSeen:this.voyage.biomesSeen});this.debris=new DebrisSpawner(this.scene);this.particles=new ParticlePool(this.scene);this.shark=new SharkAI(this.scene,this.bus);this.gull=new SeagullAI(this.scene,this.bus);this.audio=options.audio||new SeaAudio(this.settings);this.audio.applySettings(this.settings);this.audio.setScene('game');
    this.raft=new THREE.Group();this.raft.position.fromArray(this.saved?.raft.position||[0,0,0]);if(this.saved)this.raft.rotation.set(...this.saved.raft.rotation);this.scene.add(this.raft);this.blockMeshes=new Map();this.setupEvents();this.createRaft();
    this.player={position:new V3().fromArray(this.saved?.player.position||[.5,.3,.8]),velocity:new V3().fromArray(this.saved?.player.velocity||[0,0,0]),grounded:this.saved?.player.grounded??true,onRaft:this.saved?.player.onRaft??true,swimming:this.saved?.player.swimming??false,diving:this.saved?.player.diving??false,heading:this.saved?.player.heading??2.8,anim:0,action:0,jumpCooldown:this.saved?.player.jumpCooldown??0,stingCooldown:this.saved?.player.stingCooldown??0,attackCooldown:this.saved?.player.attackCooldown??0};this.avatar=createAvatar();this.avatar.position.copy(this.player.position);this.avatar.rotation.y=this.player.heading;this.scene.add(this.avatar);this.crafting.resolveStation=recipe=>{const b=this.nearStation(recipe.station||'workbench',4);return b&&!this.jobs.some(j=>j.blockId===b.id)?gridKey(b.x,b.y,b.z):null;};this.equipVisual();
    this.hook={mesh:createHook(),state:'idle',velocity:new V3(),time:0,charge:0,caught:null,origin:new V3(),target:new V3()};this.scene.add(this.hook.mesh);this.hook.mesh.visible=false;
    const ropeGeo=new THREE.BufferGeometry();ropeGeo.setAttribute('position',new THREE.BufferAttribute(new Float32Array(33*3),3));this.rope=new THREE.Line(ropeGeo,new THREE.LineBasicMaterial({color:0xd8c9a4,transparent:true,opacity:.9}));this.rope.frustumCulled=false;this.rope.visible=false;this.scene.add(this.rope);
    this.fishing={state:'idle',time:0,biteAt:0,position:new V3(),float:new THREE.Group()};this.fishing.float.add(sphere(.06,0xc66c4b,0,.02,0,8),sphere(.065,0xe9e3c8,0,-.04,0,8));this.fishing.float.visible=false;this.scene.add(this.fishing.float);
    this.aimRing=new THREE.Mesh(new THREE.RingGeometry(.34,.365,48),new THREE.MeshBasicMaterial({color:0xe9e7c8,transparent:true,opacity:.65,side:THREE.DoubleSide,depthWrite:false}));this.aimRing.rotation.x=-Math.PI/2;this.scene.add(this.aimRing);
    this.createGhost();
    this.dismantleOutline=new THREE.BoxHelper(undefined,0xe8bc80);this.dismantleOutline.visible=false;this.dismantleOutline.material.depthTest=false;this.dismantleOutline.renderOrder=20;this.scene.add(this.dismantleOutline);
    this.threatRing=new THREE.Mesh(new THREE.RingGeometry(.58,.66,24),new THREE.MeshBasicMaterial({color:0xd48361,transparent:true,opacity:.9,depthWrite:false,side:THREE.DoubleSide}));this.threatRing.rotation.x=-Math.PI/2;this.threatRing.visible=false;this.scene.add(this.threatRing);
    this.world.update(this.raft.position);this.reconcileIslandUpgrade();this.debris.seed(this.raft.position);this.restoreReservations();this.shark.restore(this.saved?.shark,this.grid);
    this.shark.baseCooldown=(DIFFICULTIES[this.difficulty]||DIFFICULTIES.castaway).sharkCooldown;
    if(!this.saved)this.shark.attackCooldown=this.shark.baseCooldown;
    for(const d of this.saved?.salvage||[]){const drop=this.debris.spawn(d.type,d.x,d.z);drop.loot={...d.loot};}
    // First-person viewmodel and a 3D objective marker for the interactive guide.
    this.viewModel=new THREE.Group();this.viewModel.position.set(.38,-.32,-.72);this.camera.add(this.viewModel);this.scene.add(this.camera);
    this.objectiveMarker=new THREE.Mesh(new THREE.CylinderGeometry(.11,.11,5,8),new THREE.MeshBasicMaterial({color:0xe9c67e,transparent:true,opacity:.24,depthWrite:false}));
    this.objectiveMarker.visible=false;this.scene.add(this.objectiveMarker);
    this.ui=new UI(this);this.monitor=new PerformanceMonitor(this);this.quality=new QualityController(this);this.bindInput();this.applyViewMode();this.resize();this.ready=true;this.renderCamera(1);this.ui.update(true);this.frame=this.frame.bind(this);this.animationFrameId=requestAnimationFrame(this.frame);
    // Expose a read-only-friendly inspector for local development and automated tests.
    window.tidebound=this;window.tidebreak=this; // legacy inspector/test alias
  }
  setupEvents(){
    this.bus.on('blockAdded',b=>{this.hullDirty=true;const mesh=createBlock(b.type);mesh.position.set(b.x,b.y===0?0:.26+b.y-1,b.z);mesh.rotation.y=b.rotation*Math.PI/2;mesh.userData.block=b;mesh.traverse(m=>m.userData.block=b);b.mesh=mesh;if(b.type==='sail')mesh.userData.sail.visible=this.sailOpen;this.blockMeshes.set(b.id,mesh);this.raft.add(mesh);});
    const remove=b=>{
      this.hullDirty=true;
      this.cancelReservationsFor(b);this.fires.delete(b.id);this.raft.remove(b.mesh);this.blockMeshes.delete(b.id);disposeObject(b.mesh);
      if(this.ready){const pos=this.raft.localToWorld(new V3(b.x,.2,b.z));this.particles.burst(pos,0xc19b67,20,1.5);if(!b.dismantled){this.dropReclaimed(b,pos);this.ui.toast(`${BLOCKS[b.type].name} broke away`,'foundation','warning');}}
    };
    this.bus.on('blockRemoved',remove);this.bus.on('blockDetached',remove);this.bus.on('blockRemoved',()=>{if(this.ready&&this.stats.alive&&![...this.grid.blocks.values()].some(b=>b.core)){this.stats.damage(100);}});
    this.bus.on('blockDamaged',b=>{if(b.hp/BLOCKS[b.type].hp<.6&&b.mesh){b.mesh.traverse(m=>{if(m.isMesh&&!m.userData.damaged){m.userData.baseMaterial=m.material;m.material=m.material.clone();m.material.userData={owned:true};m.userData.baseColor=m.material.color.clone();m.material.color.lerp(new THREE.Color(0x754e3e),.26);m.userData.damaged=true;}});}});
    this.bus.on('damage',a=>{this.audio.play('damage');this.ui?.damageFlash();this.kick(.45,.07);});
    this.bus.on('death',()=>{this.paused=true;this.ui.death();});
    this.bus.on('sting',()=>this.ui.toast('Jellyfish sting · movement slowed for 10s','lightning','warning'));
    this.bus.on('craftStarted',()=>this.audio.play('click'));
    this.bus.on('craftComplete',r=>{this.progress.crafted++;if(r.output==='water')this.progress.water++;if(['chainHook','scrapHook','metalSpear','axe','paintBrush'].includes(r.output))this.progress.upgrades++;if(['seaStew','reefSalad','spicedFish','cookedFish','heartyMeal'].includes(r.output))this.progress.cooked++;this.audio.play('craft');this.ui.toast(`${r.name} is ready`,ITEMS[r.output]?.icon||'check','success');this.ui.renderInventory();});
    this.bus.on('researched',id=>{this.audio.play('discover');this.ui.toast(`${BLOCKS[RESEARCH[id].unlock].name} unlocked`,'research','success');this.ui.renderInventory();});
    this.bus.on('questComplete',q=>{if(this.ready){this.ui.toast(`${q.title} · journal updated`,'check','success');this.ui.renderQuests();}});
    this.bus.on('weather',id=>{if(this.ready){this.ui.toast(WEATHER[id].label,id==='storm'?'storm':WEATHER[id].icon,id==='storm'?'warning':'info');if(id==='storm'){this.audio.play('warning');this.kick(.3,.05);}}this.audio.setMood(id,this.threatLevel);});
    this.bus.on('islandDiscovered',island=>{this.progress.islands++;if(island.biome?.id)this.world.biomesSeen.add(island.biome.id);if(island.story&&!this.voyage.storyVisited.includes(island.story.id))this.voyage.storyVisited.push(island.story.id);if(this.ready){this.audio.play('discover');this.ui.discover(island);}});
    this.bus.on('sharkWarning',()=>{this.audio.play('shark');this.threatLevel=1;this.ui.toast('A shark is eyeing your foundations. Ready your spear.','spear','warning',6000);});
    this.bus.on('sharkCharge',()=>{this.threatLevel=1;this.ui.toast('Shark charging! Strike now with your spear.','spear','warning',4000);});
    this.bus.on('sharkBite',b=>{this.audio.play('bite');this.kick(1,.1);this.particles.burst(this.raft.localToWorld(new V3(b.x,.2,b.z)),0xc8e4d8,22,2);const pos=this.raft.localToWorld(new V3(b.x,.6,b.z));this.ui.floatText(`−${Math.round(this.shark.lastBiteDamage||20)}`,pos,'hurt');this.ui.toast(`A foundation took ${Math.round(this.shark.lastBiteDamage||20)} damage · T to repair`,'repair','warning');});
    this.bus.on('sharkHit',()=>{this.audio.play('damage');this.ui.toast('Good hit! The shark is retreating.','spear','success');});
    this.bus.on('sharkDefeated',e=>{this.progress.sharks++;this.threatLevel=0;const boss=this.shark.boss;
      this.inventory.grant(boss?{rawFish:5,scrap:4,copperIngot:2,tradeToken:2}:{rawFish:3,scrap:1,...(Math.random()<.3?{coral:1}:{})});
      this.audio.play('levelup');this.kick(.6,.12);
      if(boss){this.voyage.bossDefeated=true;this.finale();}
      else this.ui.toast('Shark repelled · +3 raw fish, +1 scrap, sometimes sea glass','fish','success');});
    this.bus.on('inventory',()=>{this.ui?.renderQuickbar();this.ui?.updateResources();});
    this.bus.on('buffStarted',id=>{if(this.ready){this.audio.play('buff');this.ui.toast(`${BUFFS[id].name} · ${BUFFS[id].description}`,'cookedFish','success',5000);}});
    this.bus.on('achievement',a=>{if(this.ready){this.audio.play('achievement');this.ui.toast(`Voyage Log · ${a.title}`,a.icon,'success',6000);}this.inventory.grant({tradeToken:1});});
    this.bus.on('tutorialStep',step=>{if(this.ready){this.audio.play('levelup');this.ui.toast(`Next step · ${step.title}`,'book','info',6000);this.ui.renderGuideCard();}});
    this.bus.on('tutorialComplete',()=>{if(this.ready){this.audio.play('achievement');this.ui.toast('You have your sea legs. The rest is up to you.','anchor','success',7000);this.ui.renderGuideCard();}});
    this.bus.on('gullWarning',()=>{if(this.ready)this.ui.toast('A gull is circling your crop plots. A spear thrust will scare it off.','spear','warning');});
    this.bus.on('gullStole',()=>{if(this.ready){this.ui.toast('A gull made off with a harvest. Build a scarecrow or keep a spear handy.','fish','warning');}});
    this.bus.on('blockAdded',b=>{if(b.paint!==null&&b.paint!==undefined)this.applyPaint(b.mesh,b.paint);});
    this.bus.on('islandHint',message=>this.ui?.toast(message,'book','info',6500));
    this.bus.on('resourceCollected',({type,island,resource})=>{
      this.audio.play('collect');
      if(type==='code') {
        const code=island.storyCode;
        if(code&&!this.voyage.codes.includes(code)){this.voyage.codes.push(code);this.progress.codes=this.voyage.codes.length;this.audio.play('code');this.ui.toast(`Keeper code ${code} recorded · use a charting table`,'map','success',7000);}
        if(resource.loot)this.inventory.grant(resource.loot);
        const note={title:resource.name,text:resource.story};this.notebook.push({...note,island:island.name});this.ui.showLore(note,island.name);return;
      } else if(type==='storyCache') {
        if(resource.loot)this.inventory.grant(resource.loot);
        const note={title:resource.name,text:resource.story};this.notebook.push({...note,island:island.name});this.ui.toast('Keeper’s supply cache recovered','backpack','success');return;
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

  // -------------------------------------------------------------------------
  // Voyager update: feel, view modes, tools, stations, story and meta systems
  // -------------------------------------------------------------------------
  kick(shake = 0, stop = 0) { this.fx.shake = Math.min(1.8, this.fx.shake + shake); this.fx.hitStop = Math.max(this.fx.hitStop, stop); }

  applyViewMode() {
    const fp = !!this.firstPerson;
    if (this.avatar) this.avatar.visible = !fp;
    if (this.viewModel) { this.viewModel.visible = fp; this.updateViewModel(); }
    document.body.classList.toggle('first-person', fp);
    this.renderNeeded = true;
  }
  toggleView() {
    this.firstPerson = !this.firstPerson; this.settings.firstPerson = this.firstPerson; this.persistSettings();
    this.applyViewMode(); this.ui?.toast(this.firstPerson ? 'First-person view · V to return' : 'Third-person view · V to switch', 'eye');
  }
  updateViewModel() {
    if (!this.viewModel) return;
    this.viewModel.clear();
    const id = this.equipped;
    if (!id || ITEMS[id]?.consumable) return;
    let m = null;
    if (id === 'hook' || id === 'scrapHook' || id === 'chainHook') { m = createHook(); m.rotation.z = .35; m.scale.setScalar(.8); }
    else if (id === 'spear' || id === 'metalSpear') { m = createSpear(); m.scale.setScalar(.45); m.rotation.x = -.5; }
    else if (id === 'paddle') { m = createPaddle(); m.scale.setScalar(.45); m.rotation.x = -.4; }
    else if (id === 'fishingRod') { m = new THREE.Group(); m.add(cylinder(.012, .02, 1.35, 0xbba174, 0, .5, 0)); m.scale.setScalar(.6); }
    else if (id === 'axe') { m = new THREE.Group(); m.add(cylinder(.02, .02, .42, 0x9d744c), box(.2, .12, .1, 0x8e9c92, 0, .24, 0)); m.scale.setScalar(.9); }
    else if (id === 'paintBrush') { m = new THREE.Group(); m.add(cylinder(.015, .015, .4, 0xb58b61), box(.1, .1, .04, 0xd98a63, 0, .24, 0)); m.scale.setScalar(.9); }
    else if (id === 'hammer') { m = new THREE.Group(); m.add(cylinder(.025, .025, .4, 0x9d744c), box(.22, .13, .11, 0x7e9286, 0, .2, 0)); m.scale.setScalar(.9); }
    if (m) { m.traverse(o => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; } }); this.viewModel.add(m); }
  }
  togglePhotoMode() {
    this.photoMode = !this.photoMode;
    document.body.classList.toggle('photo-mode', this.photoMode);
    this.ui?.toast(this.photoMode ? 'Photo mode · HUD hidden · F9 saves a postcard' : 'Photo mode off', 'eye', 'info', 5000);
    this.renderNeeded = true;
  }
  capturePhoto() { this.photoRequested = true; this.renderNeeded = true; this.audio.play('photo'); }
  savePhoto() {
    this.photoRequested = false;
    try {
      const url = this.renderer.domElement.toDataURL('image/png');
      const a = document.createElement('a'); a.href = url; a.download = `tidebound-postcard-day${this.time.day}.png`; a.click();
      this.ui.toast('Postcard saved · share your little home', 'fullscreen', 'success');
    } catch { this.ui.toast('This browser blocked the screenshot. Try opening the game in a new tab.', 'info', 'warning'); }
  }

  repaintBlockMesh(b) {
    const old = b.mesh; if (!old) return;
    this.raft.remove(old); this.blockMeshes.delete(b.id); disposeObject(old);
    const mesh = createBlock(b.type);
    mesh.position.set(b.x, b.y === 0 ? 0 : .26 + b.y - 1, b.z); mesh.rotation.y = b.rotation * Math.PI / 2;
    mesh.userData.block = b; mesh.traverse(m => { m.userData.block = b; });
    b.mesh = mesh; this.blockMeshes.set(b.id, mesh); this.raft.add(mesh);
    if (b.paint) this.applyPaint(mesh, b.paint);
    if (b.type === 'sail') mesh.userData.sail.visible = this.sailOpen;
  }
  applyPaint(mesh, index) {
    const color = PALETTE[index]?.color; if (!mesh || !color) return;
    mesh.traverse(m => {
      if (m.isMesh && m.material?.color) {
        m.material = m.material.clone(); m.material.userData = { owned: true };
        m.material.color.lerp(new THREE.Color(color), .72);
      }
    });
  }
  paintBlock() {
    if (this.voyage.paintCharges <= 0) { this.ui.toast('No paint left · mix pigment at a paint mill', 'flag', 'warning'); return false; }
    const b = this.targetBlock();
    if (!b) { this.ui.toast('Point at a structure to paint it', 'flag', 'warning'); return false; }
    if (this.raft.localToWorld(new V3(b.x, b.y, b.z)).distanceTo(this.player.position) > 5) { this.ui.toast('Move closer to paint that structure', 'flag', 'warning'); return false; }
    b.paint = ((b.paint ?? 0) + 1) % PALETTE.length;
    this.voyage.paintCharges--; this.progress.painted++;
    this.repaintBlockMesh(b); this.audio.play('paint');
    const pos = this.raft.localToWorld(new V3(b.x, .8 + b.y, b.z));
    this.particles.burst(pos, PALETTE[b.paint].color || 0xe9c67e, 12, .9);
    this.ui.floatText(PALETTE[b.paint].name, pos, 'buff');
    return true;
  }

  bestTool(family) {
    if (family === 'hook') {
      if (this.inventory.count('chainHook') > 0) return { ...TOOL_TIERS.chainHook, id: 'chainHook' };
      if (this.inventory.count('scrapHook') > 0) return { ...TOOL_TIERS.scrapHook, id: 'scrapHook' };
      return { ...TOOL_TIERS.hook, id: 'hook' };
    }
    if (family === 'spear') return this.inventory.count('metalSpear') > 0 ? { ...TOOL_TIERS.metalSpear, id: 'metalSpear' } : { ...TOOL_TIERS.spear, id: 'spear' };
    return null;
  }
  crateLoot() {
    const pool = ['seaChart', 'brassGear', 'steamCore', 'pigment', 'recipeBook', 'gearBlueprint', 'brassHinge'];
    return { [pool[Math.floor(Math.random() * pool.length)]]: 1, scrap: 2, rope: 1 };
  }
  stationRecipe(type) { return { smelter: 'copperIngot', recycler: 'tradeToken', cookingPot: this.selectedMeal || 'seaStew' }[type]; }
  startStationJob(station, recipeId) {
    const recipe = RECIPES.find(r => r.id === recipeId);
    if (!recipe) return false;
    if (this.jobs.some(j => j.blockId === station.id)) { this.ui.toast('That workstation is already busy', 'sun'); return false; }
    if (recipe.research && !this.crafting.research.has(recipe.research)) { this.ui.toast(`Research ${ITEMS[recipe.research]?.name || 'this'} first`, 'research', 'warning'); return false; }
    if (!this.inventory.spend(recipe.ingredients)) { this.ui.toast('Not enough ingredients · open your backpack', 'backpack', 'warning'); return false; }
    this.jobs.push({ blockId: station.id, recipe, time: 0 });
    this.audio.play('build'); this.ui.toast(`${recipe.name} · ready in ${recipe.seconds}s`, ITEMS[recipe.output]?.icon || 'sun');
    return true;
  }
  mixPaint(station) {
    if (!this.inventory.remove('pigment')) { this.ui.toast('The mill needs one island pigment', 'flag', 'warning'); return false; }
    this.voyage.paintCharges += 2; this.audio.play('paint');
    this.ui.toast('Two paint charges mixed · equip your brush', 'flag', 'success'); return true;
  }
  feedEngine(station) {
    if (this.voyage.engineFuel > 0) { this.ui.toast(`Engine running · ${Math.ceil(this.voyage.engineFuel)}s of pressure left`, 'wind'); return true; }
    if (!this.inventory.remove('wood')) { this.ui.toast('The engine needs one driftwood for five minutes of steam', 'wood', 'warning'); return false; }
    this.voyage.engineFuel = 300; this.audio.play('engine');
    this.ui.toast('Engine running · sail against the wind for five minutes', 'wind', 'success'); return true;
  }
  plantCrop(station) {
    if (station.cropPlanted) { this.ui.toast(`Crop growing · ${Math.max(0, Math.ceil((BLOCKS.cropPlot.interval || 90) - station.production))}s to harvest`, 'leaf'); return true; }
    if (!this.inventory.remove('palmSeed')) { this.ui.toast('A crop plot needs one palm seed', 'leaf', 'warning'); return false; }
    station.cropPlanted = true; station.production = 0;
    this.audio.play('craft'); this.ui.toast('Palm seed planted · harvest in 90 seconds', 'leaf', 'success'); return true;
  }
  chartCourse(story) {
    this.hull();
    const dx = story.x - this.raft.position.x, dz = story.z - this.raft.position.z, d = Math.hypot(dx, dz) || 1;
    this.autopilot = { id: story.id, name: story.name, x: story.x + dx / d * (story.radius + 6), z: story.z + dz / d * (story.radius + 6), radius: 1, dock: true };
    this.helming = false; this.anchored = false; this.progress.courses++;
    this.ui.closeModal(); this.audio.play('discover');
    this.ui.toast(`Course set for ${story.name} · follow the keeper’s code`, 'map', 'success', 6500);
    return true;
  }
  enterCode(raw) {
    const code = String(raw || '').trim();
    const story = STORY_ISLANDS.find(i => i.code === code);
    if (!story) { this.ui.toast('No destination answers that code. Check the keeper’s journal.', 'map', 'warning'); return false; }
    if (!this.voyage.codes.includes(code)) { this.ui.toast('You have not found that chart fragment yet', 'book', 'warning'); return false; }
    return this.chartCourse(story);
  }
  lightTheLamp() {
    if(this.voyage.bossDefeated){this.finale();return;}
    if(this.progress.caches<3){this.ui.toast('The lamp is cold. Three signal fragments must be gathered before it can be lit.','beacon','warning');return;}
    if(!this.shark.boss){this.ui.toast('LIGHT THE LAST LIGHT · the keeper’s log is still here. Press F again when you are ready to defend it.','book','info',7000);this.startBoss();return;}
    this.ui.toast('The great shark still circles. Strike it with your spear!','spear','warning');
  }
  startBoss() {
    if (this.voyage.bossDefeated || this.shark.boss) return false;
    this.shark.setVariant({ boss: true, armored: true, cooldown: 22 });
    if (!this.shark.mesh.visible) { this.shark.mesh = this.shark.pool.acquire(); this.shark.position = this.shark.mesh.position; }
    this.shark.health = this.shark.maxHealth; this.shark.state = 'circling'; this.shark.timer = 0; this.shark.target = null;
    this.shark.position.copy(this.raft.position).add(new V3(15, 0, 15));
    this.audio.play('boss'); this.kick(1.3, .22);
    this.ui.toast('THE LAST LIGHT · a great shark guards the lamp. Defend your beacon!', 'spear', 'warning', 10000);
    return true;
  }
  finale() {
    if (this.progress.finale) return;
    this.progress.finale = 1; this.progress.rescued = true;
    this.audio.play('rescue'); this.kick(.6, .1);
    this.paused = true; this.ui.victory(); this.save();
  }
  enableEndless() {
    this.voyage.endless = true; this.progress.endless = 1;
    this.endlessTimer = 0; this.shark.setVariant({ armored: true, cooldown: 42 });
    this.ui.closeModal(); this.audio.play('levelup');
    this.ui.toast('Endless voyage · the ocean grows wilder from here', 'wind', 'success', 8000);
  }

  guideTarget() {
    const step = this.tutorial?.current(); if (!step) return null;
    const station = type => { const b = [...this.grid.blocks.values()].find(x => x.type === type); return b ? this.raft.localToWorld(new V3(b.x, .6 + b.y, b.z)) : null; };
    if (step.id === 'salvage') { let best = null, d = 40; for (const x of this.debris.active) { const q = x.mesh.position.distanceTo(this.player.position); if (q < d) { d = q; best = x.mesh.position.clone(); } } return best; }
    if (step.id === 'build') return this.raft.position.clone().add(new V3(2, .5, 2));
    if (step.id === 'water') return station('purifier');
    if (step.id === 'chart') { const i = this.world.islands[0]; return i ? new V3(i.x, 1.5, i.z) : null; }
    if (step.id === 'research') return station('workbench');
    if (step.id === 'defend' && this.shark.mesh.visible) return this.shark.position.clone();
    return null;
  }

  createRaft(){if(this.saved?.blocks?.length){for(const b of this.saved.blocks)this.grid.add(b.type,b.x,b.y,b.z,b.core,b.hp,{rotation:b.rotation||0,production:b.production||0,paint:b.paint??null});}else{for(let x=-1;x<=2;x++)for(let z=-1;z<=2;z++)this.grid.add('foundation',x,0,z,(x===0||x===1)&&(z===0||z===1));this.grid.add('sail',-1,1,-1);this.grid.add('workbench',2,1,-1);this.grid.add('purifier',-1,1,2);this.grid.add('grill',2,1,2);}
    // Lashings and a small hand-painted trail marker lend the starter raft a lived-in feel.
    const details=new THREE.Group();for(const[x,z]of [[-1.45,-1.45],[2.45,-1.45],[-1.45,2.45],[2.45,2.45]]){details.add(cylinder(.027,.038,.42,0x876746,x,.38,z),cylinder(.045,.045,.035,0xd2bb8b,x,.51,z));}
    const placard=box(.4,.13,.025,0xd6c59c,.5,.4,2.46);details.add(placard);this.raft.add(details);for(const b of this.grid.blocks.values())if(b.type==='sail')b.mesh.userData.sail.visible=this.sailOpen;
  }
  start() {
    if(this.started)return;this.started=true;this.clock.reset();this.lastFrame=null;this.audio.init();this.ui.start();
    this.audio.setMood(this.time.weather,this.threatLevel);this.ui.renderGuideCard();
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
      player:{position:this.player.position.toArray(),velocity:this.player.velocity.toArray(),heading:this.player.heading,grounded:this.player.grounded,onRaft:this.player.onRaft,swimming:this.player.swimming,diving:this.player.diving,jumpCooldown:this.player.jumpCooldown,stingCooldown:this.player.stingCooldown,attackCooldown:this.player.attackCooldown},
      camera:{yaw:this.cameraYaw,pitch:this.cameraPitch,distance:this.cameraDistance,selectedSlot:this.selectedSlot,buildType:this.buildType,buildRotation:this.buildRotation},
      crafting:this.crafting.job?reservation(this.crafting.job,'elapsed'):null,stationJobs:this.jobs.map(j=>reservation(j,'time')),
      fires:[...this.fires].filter(([id])=>blocksById.has(id)).map(([id,f])=>{const b=blocksById.get(id);return {key:gridKey(b.x,b.y,b.z),timer:f.timer};}),
      salvage:this.debris.active.filter(d=>d.loot).map(d=>({type:d.type,x:d.x,z:d.z,loot:{...d.loot}})),shark:this.shark.toJSON(this.grid),world:this.world.toJSON(),progress:{...this.progress},quests:this.quests.toJSON(),notebook:this.notebook,quickbar:[...this.quickbar],settings:{...this.settings},
      voyage:{achievements:this.voyageLog.toJSON().earned,tutorial:this.tutorial.toJSON(),codes:[...this.voyage.codes],storyVisited:[...this.voyage.storyVisited],difficulty:this.difficulty,worldSeed:this.voyage.worldSeed,endless:this.voyage.endless,bossDefeated:this.voyage.bossDefeated,engineFuel:this.voyage.engineFuel,paintCharges:this.voyage.paintCharges,storage:{...this.voyage.storage},biomesSeen:[...this.world.biomesSeen]}});
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
    for(const b of this.grid.blocks.values())if(b.type==='cropPlot'&&b.production>0)b.cropPlanted=true;
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
    this.keys.clear();this.mouse.down=false;this.mouse.right=false;this.mouse.dragged=false;this.touchMove={x:0,y:0};this.gamepadMove={x:0,y:0};this.gamepadButtons={};this.gamepadRequireNeutral=true;this.touchCameraStart=null;this.dismantle=null;this.ui?.resetTouch?.();
    if(this.hook?.state==='charging')this.hook.state='idle';
  }
  suspend() {this.clearInput();this.clock.reset();this.lastFrame=null;this.monitor?.resetWindow();if(this.started&&!this.paused){this.save();this.ui.openModal('pause');}}
  setPaused(value) {
    if(this.contextLost&&!value)return;this.renderNeeded=true;this.paused=value;this.clearInput();this.clock.reset();this.lastFrame=null;if(!value)this.renderer.domElement.focus({preventScroll:true});
  }
  applyQuality(preset=this.activeQuality) {this.quality?.apply(preset);}
  persistSettings(){try{return writePreferences(localStorage,this.settings);}catch{return false;}}
  mainMenu(){if(this.disposed)return;if(this.onMainMenu)this.onMainMenu(this);else{this.save();this.suppressUnloadSave=true;location.reload();}}
  selectSlot(index){this.selectedSlot=(index+8)%8;if(this.hook?.state==='charging')this.hook.state='idle';this.cancelFishing();this.equipVisual();this.ui.renderQuickbar();this.ui.renderBuildBar();this.audio.play('click');}
  get equipped(){return this.quickbar[this.selectedSlot];}
  equipVisual(){this.updateViewModel();if(!this.avatar)return;const hand=this.avatar.userData.tool;hand.clear();if(this.toolVisuals.has(this.equipped)){hand.add(this.toolVisuals.get(this.equipped));return;}let m;switch(this.equipped){case'hook':case'scrapHook':case'chainHook':m=createHook();m.rotation.z=.4;if(this.equipped!=='hook')m.scale.setScalar(1.12);break;case'hammer':m=new THREE.Group();m.add(cylinder(.025,.025,.4,0x9d744c),box(.22,.13,.11,0x7e9286,0,.2,0));break;case'spear':case'metalSpear':m=createSpear();m.scale.setScalar(this.equipped==='metalSpear'?.8:.7);m.rotation.x=.6;break;case'paddle':m=createPaddle();m.scale.setScalar(.7);m.rotation.x=.2;break;case'fishingRod':m=new THREE.Group();m.add(cylinder(.012,.02,1.35,0xbba174,0,.5,0));m.rotation.x=.5;break;case'axe':m=new THREE.Group();m.add(cylinder(.022,.022,.44,0x9d744c),box(.19,.13,.09,0x93a19a,0,.24,0));m.scale.setScalar(.75);break;case'paintBrush':m=new THREE.Group();m.add(cylinder(.015,.015,.38,0xb58b61),box(.1,.1,.035,0xd98a63,0,.23,0));m.scale.setScalar(.8);break;case'water':m=cylinder(.065,.065,.19,0x83b1ae);break;case'cookedFish':case'seaStew':case'spicedFish':m=createFish(true);m.scale.setScalar(.45);break;case'coconut':case'reefSalad':m=sphere(.12,0xa28559);break;}if(m){this.toolVisuals.set(this.equipped,m);hand.add(m);}}
  listen(target,type,handler,options={}){target.addEventListener(type,handler,{...options,signal:this.lifecycle.signal});}
  bindInput(){
    const canvas=this.renderer.domElement;
    this.listen(window,'resize',()=>this.resize());
    this.listen(window,'blur',()=>this.suspend());
    this.listen(document,'visibilitychange',()=>{if(document.hidden)this.suspend();else{this.clock.reset();this.lastFrame=null;}});
    this.listen(canvas,'webglcontextlost',e=>{e.preventDefault();this.contextLost=true;this.suspend();this.ui.openModal('context-lost');});
    this.listen(canvas,'webglcontextrestored',()=>{this.contextLost=false;this.applyQuality();this.clock.reset();this.lastFrame=null;this.ui.openModal('pause');this.ui.toast('Graphics context restored. Your voyage is safe; resume when ready.','check','success');});
    this.listen(window,'keydown',e=>{
      if(e.target.closest?.('input,textarea,select,[contenteditable]:not([contenteditable="false"])'))return;
      const k=e.key.toLowerCase();if([' ','tab','arrowup','arrowdown','arrowleft','arrowright'].includes(k))e.preventDefault();if(e.repeat)return;
      if(k==='f3'){e.preventDefault();this.monitor.toggle();return;}
      if(k==='tab'||k==='i'){if(this.ui.modal==='inventory')this.ui.closeModal();else this.ui.openModal('inventory');return;}
      if(k==='escape'){if(this.ui.modal)this.ui.closeModal();else this.ui.openModal('pause');return;}
      if(k==='m'){this.ui.openModal('map');return;}if(k==='j'){this.ui.openModal('journal');return;}if(k==='b'){this.ui.openModal('achievements');return;}if(k==='h'){this.ui.toggleHUD();return;}if(k==='?'||k==='f1'){e.preventDefault();this.ui.openModal('help');return;}
      if(k==='f9'){e.preventDefault();this.capturePhoto();return;}
      if(this.paused)return;this.start();this.keys.add(k);
      if(/^[1-8]$/.test(k)){this.selectSlot(Number(k)-1);return;}
      if(k==='q')this.selectSlot(this.selectedSlot-1);if(k==='e')this.selectSlot(this.selectedSlot+1);
      if(k==='r'){this.rotateHeld=true;this.rotateDragged=false;this.freeRotation=this.buildRotation*Math.PI/2;}
      if(k==='v')this.toggleView();if(k==='p')this.togglePhotoMode();
      if(k==='f')this.interact();if(k==='c')this.toggleDive();if(k==='g')this.toggleHelm();if(k==='x')this.removeTargetBlock();if(k==='t')this.repairBlock();if(k==='+'||k==='=')this.cameraDistance=clamp(this.cameraDistance-1,5,20);if(k==='-')this.cameraDistance=clamp(this.cameraDistance+1,5,20);
    });
    this.listen(window,'keyup',e=>{const k=e.key.toLowerCase();this.keys.delete(k);if(k==='x')this.dismantle=null;
      if(k==='r'&&this.rotateHeld){this.rotateHeld=false;if(this.rotateDragged){this.buildRotation=((Math.round(this.freeRotation/(Math.PI/2))%4)+4)%4;}else this.buildRotation=(this.buildRotation+1)%4;this.freeRotation=this.buildRotation*Math.PI/2;if(this.ghost)this.ghost.rotation.y=this.freeRotation;}});
    this.listen(canvas,'pointercancel',()=>this.clearInput());
    this.listen(canvas,'contextmenu',e=>e.preventDefault());
    this.listen(canvas,'pointerdown',e=>{
      if(this.paused)return;this.start();this.audio.init();canvas.focus({preventScroll:true});this.updatePointer(e);this.mouse.startX=e.clientX;this.mouse.startY=e.clientY;this.mouse.dragged=false;
      if(e.button===2){this.mouse.right=true;}else if(e.button===0){this.mouse.down=true;if(this.equipped==='hook'&&this.hook.state==='idle'){this.hook.state='charging';this.hook.charge=.22;}else this.primaryAction();}
      if(e.pointerType==='touch'){this.touchCameraStart={x:e.clientX,y:e.clientY};}
    });
    this.listen(window,'pointermove',e=>{
      if(e.target===canvas||this.mouse.right)this.updatePointer(e);
      if(this.rotateHeld&&this.equipped==='hammer'&&!this.paused){this.freeRotation-=(e.movementX||0)*.012;this.rotateDragged=true;if(this.ghost)this.ghost.rotation.y=this.freeRotation;}
      if(this.mouse.right&&!this.paused){const dx=e.clientX-this.mouse.startX,dy=e.clientY-this.mouse.startY,sensitivity=this.settings.mouseSensitivity;if(Math.abs(dx)+Math.abs(dy)>3)this.mouse.dragged=true;this.cameraYaw-=dx*.006*sensitivity;this.cameraPitch=clamp(this.cameraPitch+dy*.004*sensitivity,.12,1.2);this.mouse.startX=e.clientX;this.mouse.startY=e.clientY;}
      if(e.pointerType==='touch'&&this.mouse.down&&e.target===canvas&&this.touchCameraStart){const dx=e.clientX-this.touchCameraStart.x,dy=e.clientY-this.touchCameraStart.y,sensitivity=this.settings.mouseSensitivity;if(Math.abs(dx)+Math.abs(dy)>8){this.cameraYaw-=dx*.004*sensitivity;this.cameraPitch=clamp(this.cameraPitch+dy*.003*sensitivity,.12,1.1);this.touchCameraStart={x:e.clientX,y:e.clientY};this.mouse.dragged=true;}}
    });
    this.listen(window,'pointerup',e=>{if(e.button===2){if(this.mouse.right&&!this.mouse.dragged&&!this.paused&&this.equipped==='hammer')this.placeBlock();this.mouse.right=false;}else if(e.button===0){if(this.hook.state==='charging'){if(!this.paused&&!this.mouse.dragged)this.castHook();else this.hook.state='idle';}this.mouse.down=false;this.touchCameraStart=null;}});
    this.listen(canvas,'wheel',e=>{e.preventDefault();if(this.paused)return;if(e.shiftKey)this.cameraDistance=clamp(this.cameraDistance+e.deltaY*.008,5,22);else this.selectSlot(this.selectedSlot+(e.deltaY>0?1:-1));},{passive:false});
    this.listen(window,'beforeunload',()=>this.save());
  }
  updatePointer(e){this.pointerScreen={x:e.clientX,y:e.clientY};if(this.firstPerson){this.pointer.set(0,0);return;}this.pointer.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);}
  resize(){this.camera.aspect=innerWidth/innerHeight;this.camera.updateProjectionMatrix();this.renderer.setSize(innerWidth,innerHeight);
    const coarse=matchMedia('(pointer:coarse)').matches||navigator.maxTouchPoints>0;
    document.body.classList.toggle('touch-landscape',!!(coarse&&innerWidth>innerHeight));
    document.body.classList.toggle('touch-device',!!coarse);this.touchDevice=!!coarse;
    this.renderNeeded=true;this.ui?.resize();}
  primaryAction(){if(this.paused)return;const id=this.equipped;
    if(id==='hook'||id==='scrapHook'||id==='chainHook'){if(this.hook.state!=='idle')this.hook.state='reeling';}
    else if(id==='hammer')this.placeBlock();
    else if(id==='spear'||id==='metalSpear')this.attack();
    else if(id==='paintBrush')this.paintBlock();
    else if(id==='axe')this.chop();
    else if(id==='paddle')this.paddle();else if(id==='fishingRod')this.fish();
    else if(ITEMS[id]?.consumable){if(this.stats.consume(id,this.inventory)){this.player.action=.5;this.player.actionKind='eat';this.audio.play('collect');this.particles.burst(this.player.position.clone().add(new V3(0,1,0)),0xe4d4a2,8,.6);this.ui.toast(`${ITEMS[id].name} · ${ITEMS[id].thirst?`+${ITEMS[id].thirst} thirst`: `+${ITEMS[id].hunger} hunger`}`,ITEMS[id].icon,'success');}else this.ui.toast(`No ${ITEMS[id].name.toLowerCase()} left. Open crafting with Tab.`,ITEMS[id].icon,'warning');}
    else this.ui.toast('Select a tool or consumable from your quickbar','info');}
  chop(){
    this.player.action=.55;this.player.actionKind='chop';this.audio.play('hook');
    const r=this.world.nearestResource(this.player.position,3.2,false);
    if(r&&r.original&&['wood','coconut'].includes(r.original.type)){this.inventory.add('wood',2);this.ui.floatText('+2 Driftwood',this.player.position.clone().add(new V3(0,1.2,0)),'gain');this.ui.toast('The axe finds extra timber','wood','success');}
    else this.ui.toast('Axe swing · find island timber or coconuts to gather extra wood','repair');
  }
  castHook(){const h=this.hook;this.avatar.userData.tool.getWorldPosition(h.origin);h.mesh.position.copy(h.origin);h.target.copy(this.aimPoint);h.target.y=.02;const flat=h.target.clone().sub(h.origin);flat.y=0;const maxRange=7+h.charge*20;if(flat.length()>maxRange)h.target.copy(h.origin).add(flat.normalize().multiplyScalar(maxRange)).setY(.02);
    // Slight magnetic assistance makes small, bobbing salvage practical with a mouse.
    let best=1.65;for(const d of this.debris.active){const dist=Math.hypot(d.x-h.target.x,d.z-h.target.z);if(dist<best&&h.origin.distanceTo(d.mesh.position)<maxRange+1){best=dist;h.target.copy(d.mesh.position);}}
    const distance=Math.hypot(h.target.x-h.origin.x,h.target.z-h.origin.z),flight=clamp(distance/(12*tier.speed),.35,1.7);h.velocity.copy(h.target).sub(h.origin).divideScalar(flight);h.velocity.y+=.5*8*flight;h.state='flying';h.time=0;h.mesh.visible=true;this.rope.visible=true;this.avatar.userData.tool.visible=false;this.player.action=.5;this.audio.play('hook');}
  updateHook(dt){const h=this.hook,tier=this.bestTool('hook');if(h.state==='charging'){h.charge=clamp(h.charge+dt*.6*tier.speed,.22,1);return;}if(h.state==='idle')return;h.time+=dt;const hand=this.avatar.userData.tool.getWorldPosition(new V3());
    if(h.state==='flying'){h.velocity.y-=8*dt;h.mesh.position.addScaledVector(h.velocity,dt);h.mesh.rotation.z+=dt*5;const d=this.debris.nearest(h.mesh.position,tier.catchRadius);if(d){h.caught=d;d.hooked=true;this.haulExtra(h,tier);h.state='reeling';this.audio.play('splash');this.particles.burst(d.mesh.position,0xd8e9d5,10,.9);}else if(h.mesh.position.y<=waveHeight(h.mesh.position.x,h.mesh.position.z,this.simTime)+.03){h.mesh.position.y=.06;h.state='floating';h.time=0;this.audio.play('splash');this.particles.burst(h.mesh.position,0xe2ede0,8,.8);}if(h.mesh.position.distanceTo(hand)>28)h.state='reeling';}
    if(h.state==='floating'){h.mesh.position.y=waveHeight(h.mesh.position.x,h.mesh.position.z,this.simTime)+.05;const d=this.debris.nearest(h.mesh.position,tier.catchRadius*1.4);if(d){h.caught=d;d.hooked=true;this.haulExtra(h,tier);h.state='reeling';}if(h.time>.75)h.state='reeling';}
    if(h.state==='reeling'){const diff=hand.clone().sub(h.mesh.position);const dist=diff.length();h.mesh.position.addScaledVector(diff.normalize(),Math.min(dt*12*tier.speed,dist));if(h.caught){h.caught.mesh.position.copy(h.mesh.position).add(new V3(0,-.08,0));h.caught.x=h.mesh.position.x;h.caught.z=h.mesh.position.z;}if(h.extra)for(const e of h.extra){if(!this.debris.active.includes(e))continue;e.mesh.position.copy(h.mesh.position).add(new V3((Math.random()-.5)*.4,0,(Math.random()-.5)*.4));e.x=e.mesh.position.x;e.z=e.mesh.position.z;}if(dist<.5){if(h.caught)this.collectDebris(h.caught);for(const e of h.extra||[])this.collectDebris(e);h.extra=[];h.caught=null;h.state='idle';h.mesh.visible=false;this.rope.visible=false;this.avatar.userData.tool.visible=true;}}
    if(h.state!=='idle')this.updateRope(hand,h.mesh.position,h.state==='reeling'?.12:.5);
  }
  haulExtra(h,tier){
    h.extra=[];const wanted=(tier.haul||1)-1;if(wanted<=0)return;
    const near=[...this.debris.active].filter(d=>!d.hooked&&d!==h.caught&&d.mesh.position.distanceTo(h.mesh.position)<3.2).sort((a,b)=>a.mesh.position.distanceToSquared(h.mesh.position)-b.mesh.position.distanceToSquared(h.mesh.position));
    for(const d of near.slice(0,wanted)){d.hooked=true;h.extra.push(d);}
  }
  collectDebris(d,automatic=false){if(!this.debris.active.includes(d))return false;const mult=DIFFICULTIES[this.difficulty]?.loot??1;let label='';
    if(d.loot){this.inventory.grant(d.loot);this.ui.toast('Reclaimed supplies from your raft','wood','success');}
    else if(d.type==='barrel'){const n=Math.max(1,Math.round(2*mult));this.inventory.grant({wood:Math.max(1,Math.round(3*mult)),plastic:2,scrap:2,[Math.random()>.5?'leaf':'rawFish']:n});this.ui.toast('Supply barrel · timber, plastic, scrap + a little extra','backpack','success');}
    else if(d.type==='crate'){this.inventory.grant(this.crateLoot());this.audio.play('crate');this.ui.toast('Keeper’s crate · a research discovery and spare parts','research','success',6500);label='BLUEPRINT';}
    else{const n=Math.max(1,Math.round((d.type==='wood'?3:2)*mult));this.inventory.add(d.type,n);this.ui.toast(`+${n} ${ITEMS[d.type].name}`,ITEMS[d.type].icon,'success');label=`+${n} ${ITEMS[d.type].name}`;}
    this.progress.salvaged++;this.particles.burst(d.mesh.position,0xe4d4a2,12,.7);
    if(label)this.ui.floatText(label,d.mesh.position.clone().add(new V3(0,.4,0)),'gain');
    this.debris.release(d);this.audio.play('collect');}
  updateRope(from,to,sag){const a=this.rope.geometry.attributes.position.array;for(let i=0;i<=32;i++){const f=i/32;a[i*3]=THREE.MathUtils.lerp(from.x,to.x,f);a[i*3+1]=THREE.MathUtils.lerp(from.y,to.y,f)-Math.sin(f*Math.PI)*sag;a[i*3+2]=THREE.MathUtils.lerp(from.z,to.z,f);}this.rope.geometry.attributes.position.needsUpdate=true;}
  fish(){const f=this.fishing;if(f.state==='idle'){if(this.hook.state!=='idle'){this.ui.toast('Reel your hook in first','hook');return;}f.position.copy(this.aimPoint);const dir=f.position.clone().sub(this.player.position);dir.y=0;if(dir.length()>12)f.position.copy(this.player.position).addScaledVector(dir.normalize(),12);f.position.y=.02;f.state='waiting';f.time=0;f.biteAt=4+Math.random()*5;f.float.visible=true;f.float.position.copy(f.position);this.rope.visible=true;this.audio.play('splash');this.ui.toast('Line cast. Wait for the float to dip…','fishing');}
    else if(f.state==='bite'){this.inventory.add('rawFish',1);let extra='';
      if(Math.random()<.38){const table=FISH_TABLE.filter(x=>x.id!=='rawFish'),total=table.reduce((s,x)=>s+x.weight,0);let roll=Math.random()*total;const pick=table.find(x=>(roll-=x.weight)<=0)||table[0];this.inventory.add(pick.id,1);extra=` +1 ${ITEMS[pick.id].name}`;}
      this.audio.play('collect');this.ui.toast(`A fine catch! +1 raw fish${extra}`,'fish','success');this.particles.burst(f.float.position,0xc8e2ce,14,1);this.ui.floatText('+1 catch',f.float.position.clone(),'gain');this.cancelFishing();}else{this.ui.toast('Nothing on the line yet. Try again.','fishing');this.cancelFishing();}}
  updateFishing(dt){const f=this.fishing;if(f.state==='idle')return;f.time+=dt;f.float.position.copy(f.position);f.float.position.y=waveHeight(f.position.x,f.position.z,this.simTime)+.07+(f.state==='bite'?Math.sin(this.simTime*22)*.07:0);if(f.state==='waiting'&&f.time>=f.biteAt){f.state='bite';f.time=0;this.ui.toast('A bite! Click now to reel it in.','fish','success',3000);this.audio.play('collect');}else if(f.state==='bite'&&f.time>3){this.ui.toast('That one got away. Cast again.','fish');this.cancelFishing();}if(f.state!=='idle'){this.rope.visible=true;this.updateRope(this.avatar.userData.tool.getWorldPosition(new V3()),f.float.position,.2);}}
  cancelFishing(){if(!this.fishing)return;this.fishing.state='idle';this.fishing.float.visible=false;if(this.hook?.state==='idle')this.rope.visible=false;}
  attack(){if(this.player.attackCooldown>0)return false;this.player.attackCooldown=.65;this.player.action=.55;this.player.actionKind='thrust';this.audio.play('hook');
    const tier=this.bestTool('spear'),damage=(tier.damage||15)*(this.stats.hasBuff('spearMight')?2:1);
    const distance=this.player.position.distanceTo(this.shark.position);
    if(distance<4.2&&this.shark.mesh.visible){if(!this.shark.hit(damage))return false;this.particles.burst(this.shark.position.clone().add(new V3(0,.2,0)),0xe1e7ce,18,1.7);this.ui.floatText(`−${Math.round(damage*(this.shark.armored?.6:1))}`,this.shark.position.clone().add(new V3(0,.6,0)),'hurt');this.kick(.35,.06);}
    else if(this.gull&&this.gull.state!=='away'&&this.gull.scare()){this.audio.play('levelup');this.ui.toast('Gull scared off · your crops are safe','spear','success');}
    else this.ui.toast('Spear thrust · get closer to the shark','spear','info',1400);}
  paddle(){if(!this.player.onRaft){this.ui.toast('Climb aboard your raft to paddle','paddle');return;}this.anchored=false;this.autopilot=null;const direction=this.aimPoint.clone().sub(this.raft.position).setY(0).normalize();this.raftVelocity.addScaledVector(direction,1.2);if(this.raftVelocity.length()>2.8)this.raftVelocity.setLength(2.8);this.player.action=.55;this.audio.play('splash');this.particles.burst(this.player.position.clone().setY(.1),0xd3e8d9,9,.7);}
  toggleHelm(){if(!this.player.onRaft){this.ui.toast('Return to your raft to take the helm','sail');return;}this.helming=!this.helming;this.autopilot=null;this.anchored=false;this.ui.toast(this.helming?'At the helm · WASD to steer · G to let go':'Back on deck · the currents are in charge','sail');}
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
  setCourse(island){this.hull();const target=this.world.dockFor(island,this.hullRadius);this.autopilot={id:island.id,name:island.name,x:target.x,z:target.z,radius:1,dock:true};this.helming=false;this.anchored=false;this.ui.closeModal();this.ui.toast(`Course set for ${island.name} · following a sheltered approach · G for manual steering`,'compass','success',5500);}
  toggleDive(){
    const p=this.player;
    if(p.diving){p.diving=false;p.velocity.y=2.2;this.audio.setUnderwater(false);this.ui.toast('Returning to the surface','water');return true;}
    if(!p.swimming){this.ui.toast('Swim away from the deck, then press C to shallow-dive','water');return false;}
    p.diving=true;p.grounded=false;p.onRaft=false;p.velocity.y=-.55;this.audio.play('splash');this.audio.setUnderwater(true);this.ui.toast('Shallow dive · C or Space to surface · no oxygen limit','water','info',4500);return true;
  }
  interact(){const fire=this.nearFire();if(fire){if(this.inventory.remove('water')){this.fires.delete(fire.id);this.ui.toast('Fire extinguished','water','success');}else this.ui.toast('You need fresh water to put out this fire','water','warning');return;}const r=this.world.nearestResource(this.player.position,2.4,this.player.diving);if(r){if(r.type==='finaleBeacon'){this.lightTheLamp();return;}this.world.collect(r,this.player.position,this.player.diving);return;}const station=this.nearStation();if(station){if(station.type==='sail'){this.setSailOpen(!this.sailOpen);this.ui.toast(this.sailOpen?'Sail unfurled · following the trade winds':'Sail furled · drifting slowly','sail');}else if(station.type==='workbench'){this.ui.openModal('inventory');}else if(station.type==='purifier'||station.type==='grill'){if(this.jobs.some(j=>j.blockId===station.id)||this.crafting.job?.stationKey===gridKey(station.x,station.y,station.z)){this.ui.toast('Still working. Give it a few seconds.','sun');return;}const baseRecipe=RECIPES.find(r=>r.id===(station.type==='purifier'?'water':'cookedFish')),rainCatch=station.type==='purifier'&&['rain','storm'].includes(this.time.weather);const recipe=rainCatch?{...baseRecipe,ingredients:{},name:'Collected rainwater'}:baseRecipe;if(!this.inventory.spend(recipe.ingredients)){this.ui.toast(station.type==='grill'?'You need one raw fish and one driftwood':'You need one driftwood to light the purifier','wood','warning');return;}this.jobs.push({blockId:station.id,recipe,time:0});this.audio.play('build');this.ui.toast(rainCatch?'Collecting rainwater · ready in 8 seconds':station.type==='purifier'?'Purifying seawater · ready in 8 seconds':'Fish on the grill · ready in 8 seconds',station.type,'info');}else if(station.type==='windcatcher')this.toggleHelm();else if(station.type==='rainCollector')this.ui.toast('Rain collector · one water per 35 seconds of rain · reserve limit 30','water');
      else if(['smelter','recycler'].includes(station.type))this.startStationJob(station,this.stationRecipe(station.type));
      else if(station.type==='cookingPot')this.ui.openModal('cookbook');
      else if(station.type==='chartTable')this.ui.openModal('chart');
      else if(station.type==='tradingPost')this.ui.openModal('trade');
      else if(station.type==='storageChest')this.ui.openModal('storage');
      else if(station.type==='cropPlot')this.plantCrop(station);
      else if(station.type==='engine')this.feedEngine(station);
      else if(station.type==='paintMill')this.mixPaint(station);
      else if(station.type==='beacon')this.rescue();return;}this.ui.toast('F interacts with nearby workstations and island supplies','info');}
  setSailOpen(open) {this.sailOpen=!!open;for(const b of this.grid.blocks.values())if(b.type==='sail')b.mesh.userData.sail.visible=this.sailOpen;}
  nearStation(type=null,radius=1.9){let nearest=null,best=radius;for(const b of this.grid.blocks.values()){if(!BLOCKS[b.type].station||(type&&b.type!==type))continue;const p=this.raft.localToWorld(new V3(b.x,.5,b.z));const d=p.distanceTo(this.player.position);if(d<best){best=d;nearest=b;}}return nearest;}
  hasStation(type='workbench',radius=4){return !!this.nearStation(type,radius);}
  nearFire(){for(const[id]of this.fires){const b=[...this.grid.blocks.values()].find(b=>b.id===id);if(b&&this.raft.localToWorld(new V3(b.x,0,b.z)).distanceTo(this.player.position)<2)return b;}return null;}
  createGhost() {
    if(this.ghost)this.scene.remove(this.ghost);
    this.ghostMaterial??=new THREE.MeshBasicMaterial({color:0x8fcbb0,transparent:true,opacity:.48,depthWrite:false});
    this.ghost=createBlock(this.buildType);this.ghost.traverse(m=>{if(m.isMesh){m.material=this.ghostMaterial;m.castShadow=false;m.receiveShadow=false;}});this.ghost.visible=false;this.scene.add(this.ghost);
  }
  chooseBuild(type){this.buildType=type;this.createGhost();if(this.ui)this.ui.buildCategory=BLOCKS[type].category||'structure';if(this.equipped!=='hammer')this.selectSlot(1);this.ui.renderBuildBar();this.ui.closeModal();}
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
    this.ghostCell={x,y,z};const result=this.grid.canPlace(this.buildType,x,y,z,this.crafting.research);this.ghostValid=result.valid&&this.inventory.has(BLOCKS[this.buildType].cost)&&this.player.position.distanceTo(this.raft.position.clone().add(new V3(x,0,z)))<8;this.ghostReason=!result.valid?result.reason:!this.inventory.has(BLOCKS[this.buildType].cost)?'Not enough materials':this.ghostValid?'Ready to build':'Too far from the raft';this.ghost.position.set(this.raft.position.x+x,this.raft.position.y+(y===0?0:.26+y-1),this.raft.position.z+z);this.ghost.rotation.y=this.rotateHeld?this.freeRotation:this.buildRotation*Math.PI/2;this.ghostMaterial.color.setHex(this.ghostValid?0x8ccda9:0xdb7963);}
  placeBlock(){if(this.paused||this.equipped!=='hammer')return false;if(!this.ghostCell){this.ui.toast('Point at an edge of your raft to build','hammer');return;}this.updateBuilding();if(!this.ghostValid){this.ui.toast(this.ghostReason||'Find a connected, empty space','hammer','warning');return;}const{x,y,z}=this.ghostCell;if(!this.inventory.spend(BLOCKS[this.buildType].cost))return;this.grid.add(this.buildType,x,y,z,false,null,{rotation:this.buildRotation});this.progress.built++;this.audio.play('build');this.particles.burst(this.ghost.position.clone().add(new V3(0,.3,0)),0xd9c699,16,.9);this.ui.toast(`${BLOCKS[this.buildType].name} built`,'hammer','success',2000);}
  removalStatus(block) {
    if(!block)return {ok:false,reason:'Point at a structure to dismantle it'};
    if(this.equipped!=='hammer'&&this.equipped!=='axe')return {ok:false,reason:'Equip the hammer or axe before dismantling'};
    if(block.core)return {ok:false,reason:'Core foundation · protected'};
    if(this.raft.localToWorld(new V3(block.x,block.y,block.z)).distanceTo(this.player.position)>4)return {ok:false,reason:'Move within four meters to dismantle'};
    const detached=this.grid.previewRemoval(block);
    const duration=(detached.length?1600:950)*(this.equipped==='axe'?.5:1);
    return {ok:true,detached,reason:detached.length?`${detached.length} connected structure${detached.length===1?'':'s'} will detach`:'Some materials will be returned',duration};
  }
  removeTargetBlock() {
    const block=this.targetBlock(),status=this.removalStatus(block);
    if(!status.ok){this.ui.toast(status.reason,'hammer','warning');return false;}
    this.dismantle={id:block.id,key:gridKey(block.x,block.y,block.z),start:performance.now(),duration:status.duration,detached:status.detached.length};
    this.ui.toast(`Keep holding X · ${status.reason}`,'hammer',status.detached.length?'warning':'info',2200);return true;
  }
  updateDismantle(now) {
    const active=this.started&&!this.paused&&(this.equipped==='hammer'||this.equipped==='axe');const block=active?this.targetBlock():null;this.dismantleTarget=block;
    this.dismantleOutline.visible=!!block;
    if(block){this.dismantleOutline.setFromObject(block.mesh);this.dismantleOutline.material.color.setHex(block.core?0x83c5b0:0xe8bc80);}
    if(!this.dismantle)return;
    if(!this.keys.has('x')||!block||block.id!==this.dismantle.id||!this.removalStatus(block).ok){this.dismantle=null;return;}
    if(now-this.dismantle.start>=this.dismantle.duration) {
      block.dismantled=true;this.dismantle=null;this.grid.remove(block.x,block.y,block.z);
      this.inventory.grant(Object.fromEntries(Object.entries(BLOCKS[block.type].cost).map(([id,n])=>[id,Math.max(1,Math.floor(n/2))])));
      this.audio.play('build');this.ui.toast('Dismantled safely · partial materials returned; detached supplies float nearby','hammer','success');
    }
  }
  repairBlock(){const b=this.targetBlock();if(!b)return;if(this.raft.localToWorld(new V3(b.x,b.y,b.z)).distanceTo(this.player.position)>4){this.ui.toast('Move within four meters to repair','repair','warning');return;}if(b.hp>=BLOCKS[b.type].hp){this.ui.toast('This structure is in good shape','repair');return;}if(!this.inventory.remove('wood')){this.ui.toast('One driftwood needed for repairs','wood','warning');return;}b.hp=BLOCKS[b.type].hp;b.mesh?.traverse(m=>{if(m.isMesh&&m.userData.baseColor){if(m.userData.baseMaterial){m.material.dispose();m.material=m.userData.baseMaterial;delete m.userData.baseMaterial;}else m.material.color.copy(m.userData.baseColor);m.userData.damaged=false;delete m.userData.baseColor;}});this.audio.play('build');this.ui.toast(`${BLOCKS[b.type].name} repaired`,'repair','success');}
  updateRaft(dt){const old=this.raft.position.clone();const hasEngine=[...this.grid.blocks.values()].some(b=>b.type==='engine')&&this.voyage.engineFuel>0;
    const windBoost=([...this.grid.blocks.values()].some(b=>b.type==='windcatcher')?1.2:1)*(hasEngine?1.55:1),hasSail=[...this.grid.blocks.values()].some(b=>b.type==='sail');let desired=new V3(0,0,this.sailOpen&&hasSail?-.4:-.12);
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
    if(this.helming){const ix=(this.keys.has('d')?1:0)-(this.keys.has('a')?1:0)+this.touchMove.x+this.gamepadMove.x,iz=(this.keys.has('s')?1:0)-(this.keys.has('w')?1:0)+this.touchMove.y+this.gamepadMove.y;desired.set(Math.cos(this.cameraYaw)*ix+Math.sin(this.cameraYaw)*iz,0,-Math.sin(this.cameraYaw)*ix+Math.cos(this.cameraYaw)*iz).multiplyScalar(2.2*windBoost);if(desired.length()>2.5*windBoost)desired.setLength(2.5*windBoost);}
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
    const delta=this.raft.position.clone().sub(old);if(this.player.onRaft)this.player.position.add(delta);
    // Collection nets share the same pooled salvage, rather than spawning inventory from nothing.
    for(const b of this.grid.blocks.values())if(b.type==='net'){const p=this.raft.localToWorld(new V3(b.x,.1,b.z));const d=this.debris.nearest(p,.8);if(d)this.collectDebris(d,true);}
  }
  raftGround(position){const x=Math.round(position.x-this.raft.position.x),z=Math.round(position.z-this.raft.position.z);let highest=null;for(let y=0;y<9;y++){const b=this.grid.at(x,y,z);if(!b)continue;let h;if(y===0&&BLOCKS[b.type].buoyant)h=this.raft.position.y+.27;else if(b.type==='floor')h=this.raft.position.y+.34+y-1;else if(b.type==='stairs'){const dx=position.x-this.raft.position.x-x,dz=position.z-this.raft.position.z-z,a=b.rotation*Math.PI/2,lz=dx*Math.sin(a)+dz*Math.cos(a);h=this.raft.position.y+.34+(y-1)+clamp((lz+.5),0,1);}if(h!==undefined&&h<=position.y+.46&&(!highest||h>highest.height))highest={height:h,block:b};}return highest;}
  updatePlayer(dt){const p=this.player;p.action=Math.max(0,p.action-dt);p.attackCooldown=Math.max(0,p.attackCooldown-dt);p.jumpCooldown=Math.max(0,p.jumpCooldown-dt);p.stingCooldown=Math.max(0,p.stingCooldown-dt);const old=p.position.clone();let ix=(this.keys.has('d')?1:0)-(this.keys.has('a')?1:0)+this.touchMove.x+this.gamepadMove.x,iz=(this.keys.has('s')?1:0)-(this.keys.has('w')?1:0)+this.touchMove.y+this.gamepadMove.y;if(this.helming){ix=0;iz=0;}
    const movement=new V3(Math.cos(this.cameraYaw)*ix+Math.sin(this.cameraYaw)*iz,0,-Math.sin(this.cameraYaw)*ix+Math.cos(this.cameraYaw)*iz);if(movement.length()>1)movement.normalize();const moving=movement.length()>.05,speed=(this.keys.has('shift')?4.3:2.65)*(p.swimming?(p.diving?.78:.62):1)*(this.stats.stung>0?.7:1)*(p.swimming&&this.stats.hasBuff('swiftSwim')?1.5:1);p.velocity.x=THREE.MathUtils.lerp(p.velocity.x,movement.x*speed,dt*12);p.velocity.z=THREE.MathUtils.lerp(p.velocity.z,movement.z*speed,dt*12);p.position.x+=p.velocity.x*dt;p.position.z+=p.velocity.z*dt;
    // Stations and walls are solid; the deck perimeter is deliberately open for swimming.
    const local=p.position.clone().sub(this.raft.position);
    for(const b of this.grid.blocks.values()) {
      if(!['workbench','purifier','grill','wall','rainCollector','windcatcher'].includes(b.type))continue;
      const dx=local.x-b.x,dz=local.z-b.z,a=b.rotation*Math.PI/2,rx=dx*Math.cos(a)-dz*Math.sin(a),rz=dx*Math.sin(a)+dz*Math.cos(a),isWall=b.type==='wall',maxX=isWall?.55:.46,maxZ=isWall?.16:.42,cz=isWall?-.43:0,bottom=this.raft.position.y+.26+b.y-1;
      if(p.position.y<bottom+.9&&p.position.y+1.4>bottom&&Math.abs(rx)<maxX&&Math.abs(rz-cz)<maxZ){p.position.x=old.x;p.position.z=old.z;break;}
    }
    this.world.resolveMovement(old,p.position,p.swimming);
    let raftGround=this.raftGround(p.position),islandGround=this.world.groundAt(p.position.x,p.position.z,p.position.y);let ground=raftGround?.height??islandGround?.height??-100;const wasSwimming=p.swimming;
    if(this.keys.has(' ')&&p.jumpCooldown<=0&&(p.grounded||p.swimming)){p.diving=false;p.velocity.y=p.swimming?3.5:4.7;p.grounded=false;p.jumpCooldown=.6;if(p.swimming)p.position.y+=.15;this.audio.play('hook');}
    if(p.diving&&wasSwimming){
      const surface=waveHeight(p.position.x,p.position.z,this.simTime,this.ocean.uniforms.amplitude.value),floor=this.world.terrainHeight(p.position.x,p.position.z)+.34;
      if(floor>surface-.85){p.diving=false;p.velocity.y=1.2;}
      else{const target=Math.max(floor,surface-1.45);p.velocity.y=THREE.MathUtils.lerp(p.velocity.y,clamp((target-p.position.y)*4,-2.2,2.2),Math.min(1,dt*8));}
    }else p.velocity.y-=12*dt;
    p.position.y+=p.velocity.y*dt;const ceiling=this.world.ceilingAt(p.position,old.y);if(ceiling!==null){p.position.y=ceiling;p.velocity.y=Math.min(0,p.velocity.y);}p.grounded=false;p.onRaft=false;p.swimming=false;
    if(p.position.y<=ground&&p.velocity.y<=0){p.position.y=ground;p.velocity.y=0;p.grounded=true;p.onRaft=!!raftGround;p.diving=false;}
    else if(p.diving&&wasSwimming){
      const surface=waveHeight(p.position.x,p.position.z,this.simTime,this.ocean.uniforms.amplitude.value),floor=this.world.terrainHeight(p.position.x,p.position.z)+.34;
      if(floor>surface-.85){p.diving=false;p.position.y=surface-.68;p.velocity.y=0;p.swimming=true;}
      else{p.position.y=clamp(p.position.y,floor,surface-.92);p.swimming=true;if(p.position.y<=floor+.001)p.velocity.y=Math.max(0,p.velocity.y);}
    }else{const water=waveHeight(p.position.x,p.position.z,this.simTime,this.ocean.uniforms.amplitude.value)-.68;if(p.position.y<=water&&p.velocity.y<0){p.position.y=water;p.velocity.y=0;p.swimming=true;if(!wasSwimming)this.audio.play('splash');}}
    if(p.swimming&&raftGround&&p.jumpCooldown<.3){p.position.y=raftGround.height;p.grounded=true;p.onRaft=true;p.swimming=false;p.diving=false;} // automatic ledge grab
    if(!p.swimming)p.diving=false;
    if(this.underwaterAudio!==p.diving){this.underwaterAudio=p.diving;this.audio.setUnderwater(p.diving);}
    if(moving){const heading=Math.atan2(movement.x,movement.z);p.heading+= (THREE.MathUtils.euclideanModulo(heading-p.heading+Math.PI,Math.PI*2)-Math.PI)*Math.min(1,dt*12);}else if(this.mouse.down||p.action>0){const heading=Math.atan2(this.aimPoint.x-p.position.x,this.aimPoint.z-p.position.z);p.heading+=(THREE.MathUtils.euclideanModulo(heading-p.heading+Math.PI,Math.PI*2)-Math.PI)*Math.min(1,dt*10);}
    // Voyager feel: distinct action poses, head bob, footsteps, and island hazards.
    if(p.action<=0)p.actionKind=null;
    p.anim+=dt*(moving?speed*4:1.1);this.avatar.position.copy(p.position);this.avatar.rotation.y=p.heading;this.avatar.userData.body.position.y=moving?Math.sin(p.anim*2)*.016:Math.sin(this.simTime*1.4)*.01;const swing=moving?Math.sin(p.anim)*(p.swimming?.7:.42):0;this.avatar.userData.legs[0].rotation.x=swing;this.avatar.userData.legs[1].rotation.x=-swing;this.avatar.userData.arms[0].rotation.x=-swing*.7;this.avatar.userData.arms[1].rotation.x=swing*.7-(p.action>0?Math.sin(p.action/.55*Math.PI)*1.2:0);
    if(this.hook.state==='charging')this.avatar.userData.arms[1].rotation.x=-1.1;
    if(p.actionKind==='thrust'){this.avatar.userData.arms[1].rotation.x=-1.45;this.avatar.userData.arms[0].rotation.x=-1.05;}
    else if(p.actionKind==='chop'){this.avatar.userData.arms[1].rotation.x=-1.9;this.avatar.userData.body.rotation.z=.12;}
    else if(p.actionKind==='eat'){this.avatar.userData.arms[1].rotation.x=-1.9;}
    else this.avatar.userData.body.rotation.z=0;
    this.avatar.userData.body.position.y+=(moving?Math.sin(p.anim*4)*.012:0)+(this.firstPerson?0:0);
    if(moving&&!p.swimming&&this.ready){this.stepTimer+=dt;const interval=this.keys.has('shift')?.28:.42;if(this.stepTimer>interval){this.stepTimer=0;this.audio.footstep(p.onRaft?'wood':this.world.groundAt(p.position.x,p.position.z)?.island?'sand':'water');}}
    if(p.swimming){this.avatar.rotation.x=p.diving?.72:.25;if(this.shark.mesh.visible&&p.position.distanceTo(this.shark.position)<2.7&&this.shark.biteCooldown<=0&&!this.settings.relaxed){this.stats.damage(10*(DIFFICULTIES[this.difficulty]?.damage??1));this.shark.biteCooldown=5;this.ui.toast('Shark nearby! Get back to the raft.','spear','warning');}}else this.avatar.rotation.x=0;
    for(const island of this.world.islands)for(const h of island.hazards||[]){
      if(Math.abs(p.position.x-h.x)<h.radius&&Math.abs(p.position.z-h.z)<h.radius&&Math.abs(p.position.y-h.y)<1.4&&p.stingCooldown<=0){
        p.stingCooldown=10;this.stats.sting();this.ui.toast('Razorvine · slowed for a moment','lightning','warning');break;
      }
    }
    for(const island of this.world.islands)for(const jelly of island.jellies){jelly.position.y=-.28+Math.sin(this.simTime*1.5+jelly.position.x)*.1;const jpos=jelly.getWorldPosition(new V3());if(p.swimming&&p.position.distanceTo(jpos)<.7&&p.stingCooldown<=0){p.stingCooldown=10;this.stats.sting();}}
    if(p.position.distanceTo(this.raft.position)>230){p.position.copy(this.raft.position).add(new V3(.5,.5,.5));this.ui.toast('The current carried you home. Stay within sight of your raft.','anchor');}
  }
  updateJobs(dt) {
    const byId=new Map([...this.grid.blocks.values()].map(b=>[b.id,b]));
    for(let i=this.jobs.length-1;i>=0;i--) {
      const job=this.jobs[i];if(!byId.has(job.blockId)){this.cancelStationJob(job.blockId);continue;}
      job.time+=dt;
      if(job.time+1e-9>=job.recipe.seconds) {
        this.jobs.splice(i,1); // settle first, so a save/inventory listener sees no reservation
        this.inventory.add(job.recipe.output,job.recipe.amount);
        if(job.recipe.output==='water')this.progress.water++;if(['seaStew','reefSalad','spicedFish','cookedFish','heartyMeal'].includes(job.recipe.output))this.progress.cooked++;if(['chainHook','scrapHook','metalSpear','axe'].includes(job.recipe.output))this.progress.upgrades++;this.progress.crafted++;
        this.ui.toast(`${job.recipe.name} is ready`,ITEMS[job.recipe.output].icon,'success');this.audio.play('craft');
      }
    }
    for(const b of this.grid.blocks.values())if(b.type==='rainCollector'&&['rain','storm'].includes(this.time.weather)&&this.inventory.count('water')<30) {
      b.production+=dt;if(b.production+1e-9>=35){b.production=0;this.inventory.add('water',1);this.progress.water++;this.ui.toast('Rain collector · +1 fresh water','water','success');}
    }
    for(const b of this.grid.blocks.values())if(b.type==='cropPlot'&&b.cropPlanted){
      b.production+=dt;if(b.production+1e-9>=(BLOCKS.cropPlot.interval||90)){
        b.production=0;
        if(this.gull?.stolen>0&&this.gull.state!=='away'){this.gull.stolen--;this.ui.toast('The gull got to this harvest first','fish','warning');continue;}
        const yieldItems={coconut:2,leaf:2,...(Math.random()<.3?{palmSeed:1}:{})};this.inventory.grant(yieldItems);
        this.ui.toast('Crop plot harvested · +2 coconuts, +2 palm leaves','leaf','success');this.audio.play('craft');
        this.ui.floatText('+ harvest',this.raft.localToWorld(new V3(b.x,1,b.z)),'gain');
      }
    }
    for(const [id,fire] of this.fires) {
      const b=byId.get(id);if(!b){this.fires.delete(id);continue;}fire.timer+=dt;this.grid.damage(b,3*dt);
      if(Math.random()<dt*14)this.particles.burst(this.raft.localToWorld(new V3(b.x,.55+b.y,b.z)),0xe4a052,2,.7);
      if(fire.timer>18)this.fires.delete(id);
    }
  }
  renderCamera(dt){const fp=this.firstPerson;const target=(this.player?.position||new V3(.5,0,.5)).clone().add(new V3(0,this.player?.diving?.42:fp?1.42:.8,0));if(this.helming&&!fp)target.copy(this.raft.position).add(new V3(.5,.8,.5));this.cameraTarget.lerp(target,1-Math.exp(-dt*(fp?14:5)));
    const pitch=this.player?.diving?-.08:this.cameraPitch,cp=Math.cos(pitch),sp=Math.sin(pitch);
    let distance=(this.player?.diving?Math.min(this.cameraDistance,3.8):this.cameraDistance)*clamp(1/this.camera.aspect,1,1.6);
    if(fp)distance=.12;
    this.camera.position.set(this.cameraTarget.x+Math.sin(this.cameraYaw)*distance*cp,this.cameraTarget.y+sp*distance,this.cameraTarget.z+Math.cos(this.cameraYaw)*distance*cp);
    if(!fp)this.world?.cameraClip(this.cameraTarget,this.camera.position);
    if(this.fx.shake>0){const k=this.fx.shake*.14;this.camera.position.x+=(Math.random()-.5)*k;this.camera.position.y+=(Math.random()-.5)*k;this.camera.position.z+=(Math.random()-.5)*k;}
    if(fp){this.pointer.set(0,0);this.camera.lookAt(this.cameraTarget.clone().add(new V3(Math.sin(this.cameraYaw)*-8,Math.sin(pitch)*-6,Math.cos(this.cameraYaw)*-8)));}
    else this.camera.lookAt(this.cameraTarget);
    this.camera.updateMatrixWorld();this.raycaster.setFromCamera(this.pointer,this.camera);if(!this.raycaster.ray.intersectPlane(this.oceanPlane,this.aimPoint))this.aimPoint.copy(this.player.position).add(new V3(0,0,-10));const max=40;if(this.aimPoint.distanceTo(this.player.position)>max){const d=this.aimPoint.clone().sub(this.player.position).normalize();this.aimPoint.copy(this.player.position).addScaledVector(d,max);this.aimPoint.y=0;}}
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
    pressed(0,()=>{this.keys.add(' ');setTimeout(()=>this.keys.delete(' '),150);this.start();});pressed(1,()=>this.toggleHelm());
    pressed(4,()=>this.selectSlot(this.selectedSlot-1));pressed(5,()=>this.selectSlot(this.selectedSlot+1));pressed(2,()=>this.interact());
    pressed(6,()=>{if(this.equipped==='hammer')this.placeBlock();});
    const trigger=!!pad.buttons[7]?.pressed;
    if(trigger&&!this.gamepadButtons[7]){this.start();this.pointer.set(0,.25);if(this.equipped==='hook'&&this.hook.state==='idle'){this.hook.state='charging';this.hook.charge=.22;}else this.primaryAction();}
    if(!trigger&&this.gamepadButtons[7]&&this.hook.state==='charging')this.castHook();
    this.gamepadButtons[7]=trigger;
  }
  rescue(){if(this.progress.rescued){this.ui.toast('Your signal is still out there. Keep exploring.','signal','success');return;}this.finale();}
  revive(){this.stats.health=100;this.stats.hunger=65;this.stats.thirst=65;this.stats.alive=true;for(const id of['wood','leaf','plastic','scrap'])this.inventory.items[id]=Math.ceil(this.inventory.count(id)*.7);if(![...this.grid.blocks.values()].some(b=>b.core)){for(let x=0;x<=1;x++)for(let z=0;z<=1;z++)this.grid.add('foundation',x,0,z,true);}this.player.position.copy(this.raft.position).add(new V3(.5,.4,.5));this.player.velocity.set(0,0,0);this.player.onRaft=true;this.player.diving=false;this.ui.closeModal();this.ui.toast('A new breath. Some supplies were lost to the sea.','heart');}
  simulate(dt) {
    if(this.paused||!this.stats.alive)return;
    this.simTime+=dt;this.time.update(dt);
    const rates=DIFFICULTIES[this.difficulty]||DIFFICULTIES.castaway;
    this.stats.update(dt,this.settings.relaxed,{drain:rates.drain,damage:rates.damage});
    if(!this.stats.alive)return;
    if(this.voyage.engineFuel>0)this.voyage.engineFuel=Math.max(0,this.voyage.engineFuel-dt);
    if(this.voyage.endless){this.endlessTimer=(this.endlessTimer||0)+dt;if(this.endlessTimer>110){this.endlessTimer=0;this.time.setWeather('storm');this.kick(.4,.06);this.ui.toast('Endless voyage · another storm rolls in','storm','warning');}}
    const craft=this.crafting.job;
    if(craft?.stationKey&&!this.grid.blocks.has(craft.stationKey))this.crafting.cancel();
    this.crafting.update(dt);this.updateRaft(dt);this.updatePlayer(dt);this.updateHook(dt);this.updateFishing(dt);this.updateJobs(dt);
    this.debris.update(dt,this.simTime,this.raft.position,this.camera,this.ocean.uniforms.amplitude.value);this.shark.update(dt,this.simTime,this.raft,this.grid,this.settings.relaxed);this.particles.update(dt);
    this.questTimer=(this.questTimer||0)+dt;if(this.questTimer>=.25){this.questTimer=0;this.quests.update(this.progress,this.crafting.research);this.voyageLog.update(this);if(this.settings.interactiveGuide)this.tutorial.update(this);}
    this.gull?.update(dt,this.simTime,this.raft,this.grid,[...this.grid.blocks.values()].filter(b=>b.type==='cropPlot'&&b.cropPlanted));
    if(this.shark.state==='circling'&&this.threatLevel>0)this.threatLevel=0;
    this.saveTimer+=dt;if(this.saveTimer>20){this.saveTimer=0;this.save();}
  }
  updatePresentation(dt,active) {
    const atm=this.atmosphere.update(dt,this.simTime,this.player.position,this.time,this.time.weather);
    const submerged=this.player.diving&&this.player.swimming;if(submerged)atm.fog.setHex(0x176b73);
    this.ocean.uniforms.fogColor.value.copy(atm.fog);this.ocean.uniforms.sunDirection.value.copy(this.atmosphere.sun.position).sub(this.player.position).normalize();this.ocean.update(this.simTime,this.player.position,this.time.weather,atm.daylight,this.world.islands,dt);if(submerged){this.ocean.uniforms.fogDensity.value=.026;this.scene.fog.density=.028;}
    this.world.setDetail(this.player.position,QUALITY_PRESETS[this.activeQuality]);this.world.animate(this.simTime,atm.daylight,this.time.weather==='storm'?2:this.time.weather==='rain'?1.35:1);
    if(atm.lightning&&active) {
      this.audio.play('damage');if(!this.settings.relaxed&&Math.random()<.6){const blocks=[...this.grid.blocks.values()].filter(b=>BLOCKS[b.type].wooden),target=blocks[Math.floor(Math.random()*blocks.length)];if(target){this.fires.set(target.id,{timer:0});this.ui.toast('Lightning struck! Use fresh water nearby to put out the fire.','storm','warning',6000);}}
    }
  }
  frame(now) {
    if(this.disposed)return;
    const rawDt=this.lastFrame===null?0:Math.max(0,(now-this.lastFrame)/1000);this.lastFrame=now;this.frameCount++;if(rawDt>0)this.fps=THREE.MathUtils.lerp(this.fps,1/rawDt,.05);
    const stopped=this.fx.hitStop>0,scaled=stopped?rawDt*.18:rawDt;
    this.fx.shake=Math.max(0,this.fx.shake-rawDt*2.3);this.fx.hitStop=Math.max(0,this.fx.hitStop-rawDt);
    if(!document.hidden&&!this.contextLost) {
      this.gamepad(Math.min(rawDt,.1));const active=this.started&&!this.paused&&this.stats.alive;let simulated=0;
      if(!this.paused) {
        if(active){this.world.update(this.raft.position,1);simulated=this.clock.advance(scaled,dt=>this.simulate(dt));}
        else {const dt=Math.min(scaled,.1);this.introTime=(this.introTime||0)+dt;simulated=dt;this.avatar.userData.body.position.y=Math.sin((this.simTime+this.introTime)*1.4)*.01;if(!this.saved){this.simTime+=dt;this.raft.position.y=waveHeight(this.raft.position.x,this.raft.position.z,this.simTime)*.15;this.debris.update(dt,this.simTime,this.raft.position,this.camera);this.shark.update(dt,this.simTime,this.raft,this.grid,true);}}
        this.updatePresentation(simulated,active);
      }
      this.renderCamera(Math.min(rawDt,.1));this.updateBuilding();this.updateDismantle(now);
      // Wake, ambient mood, low-health heartbeat and the guide's objective beam.
      if(active){this.wakeTimer+=rawDt;if(this.wakeTimer>.14&&this.raftVelocity.lengthSq()>.09){this.wakeTimer=0;const v=this.raftVelocity.clone().setY(0).normalize(),rear=this.raft.position.clone().addScaledVector(v,-(this.hullRadius||2)*.82);rear.y=waveHeight(rear.x,rear.z,this.simTime,this.ocean.uniforms.amplitude.value)+.06;this.particles.burst(rear,0xe2f1e6,3,.35);}
        this.moodTimer=(this.moodTimer||0)+rawDt;if(this.moodTimer>1){this.moodTimer=0;this.audio.setMood(this.time.weather,this.threatLevel);}
        if(this.stats.health<25){this.heartbeatTimer+=rawDt;if(this.heartbeatTimer>1.35){this.heartbeatTimer=0;this.audio.heartbeat();}}
      }
      const guide=this.settings.interactiveGuide&&!this.tutorial.done?this.guideTarget():null;
      this.objectiveMarker.visible=!!guide&&!this.paused&&this.started;
      if(guide){this.objectiveMarker.position.set(guide.x,guide.y+2.4,guide.z);this.objectiveMarker.material.opacity=.18+Math.sin(this.simTime*3)*.1;}
      this.aimRing.visible=this.started&&!this.paused&&!this.firstPerson&&['hook','scrapHook','chainHook','fishingRod','paddle'].includes(this.equipped);this.aimRing.position.set(this.aimPoint.x,waveHeight(this.aimPoint.x,this.aimPoint.z,this.simTime)+.025,this.aimPoint.z);this.aimRing.scale.setScalar(this.hook.state==='charging'?1+this.hook.charge*.35:1);
      const target=this.shark.target;this.threatRing.visible=!this.paused&&!!target&&['targeting','attacking'].includes(this.shark.state)&&this.grid.at(target.x,target.y,target.z)===target;
      if(this.threatRing.visible){this.threatRing.position.copy(this.raft.localToWorld(new V3(target.x,.29,target.z)));this.threatRing.material.opacity=.55+Math.sin(this.simTime*7)*.35;}
      this.statsTimer+=rawDt;if(this.statsTimer>=.1&&(!this.paused||this.renderNeeded)){this.statsTimer=0;this.ui.update();}
      if(!this.paused||this.renderNeeded){this.renderer.render(this.scene,this.camera);this.renderNeeded=false;if(this.photoRequested)this.savePhoto();}
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
    this.world?.dispose();
    disposeObject(this.scene);this.scene.clear();
    this.renderer.dispose();this.renderer.forceContextLoss();this.renderer.domElement.remove();
    document.body.classList.remove('voyage-started','menu-open','is-building','hide-hud','underwater');this.audio.setUnderwater(false);
    if(window.tidebound===this)delete window.tidebound;
    if(window.tidebreak===this)delete window.tidebreak;
  }
}
