import * as THREE from 'three';
import {BIOMES,ISLAND_NAMES} from './data.js';
import {seededRandom,clamp} from './systems.js';
import {material,box,cylinder,sphere,beam,bakeStatic,createRock,createJellyfish} from './assets.js';
import {puzzleSequence} from './exploration.js';
import {createTerrainPlan,createTerrainGeometry,sampleTerrainLOD,buildNavigation,routeDistance} from './island-terrain.js';
import {warmIslandAssets,instanceIslandAssets,islandWind,treasureChest,landmarkModel,caveModel,archModel,watchtowerModel,journalModel,runeModel} from './island-assets.js';

const V3=THREE.Vector3;
export const RUNE_NAMES=['sun','tide','star'];
function localBoxContains(c,x,y,z,r=.24,height=1.6,allowSteps=true){
  if(c.disabled)return false;
  if(allowSteps&&height>=1&&c.walkable&&c.y+c.h*.5-y<=.45)return false;
  if(y>=c.y+c.h*.5-.035||y+height<=c.y-c.h*.5+.025)return false;
  const dx=x-c.x,dz=z-c.z,cs=c._cos??(c._cos=Math.cos(c.yaw)),sn=c._sin??(c._sin=Math.sin(c.yaw)),rx=dx*cs-dz*sn,rz=dx*sn+dz*cs;
  return Math.abs(rx)<c.w*.5+r&&Math.abs(rz)<c.d*.5+r;
}
export function occupiedAt(island,x,y,z,r=.24,height=1.6,ignoreId=null,allowSteps=true){return island.colliders.some(c=>c.resourceId!==ignoreId&&localBoxContains(c,x,y,z,r,height,allowSteps||!(c.scenery||c.resourceId)));}
// Temporary 4 m broadphase for the thousands of flood-fill clearance probes.
// Build afresh after each placement repair; real-time collision and LOS still use
// the complete authoritative collider list. Conservative actor-margin insertion
// means rotation/edge clearance is identical to the brute-force query.
function buildIslandNavigation(island){
  const cell=4,offset=Math.ceil(island.plan.extent/cell)+4,stride=offset*2+1,buckets=new Map();
  for(const c of island.colliders){
    if(c.disabled)continue;const cs=c._cos??(c._cos=Math.cos(c.yaw)),sn=c._sin??(c._sin=Math.sin(c.yaw));
    const ex=(Math.abs(cs)*c.w+Math.abs(sn)*c.d)*.5+.31,ez=(Math.abs(sn)*c.w+Math.abs(cs)*c.d)*.5+.31;
    for(let ix=Math.floor((c.x-ex)/cell);ix<=Math.floor((c.x+ex)/cell);ix++)for(let iz=Math.floor((c.z-ez)/cell);iz<=Math.floor((c.z+ez)/cell);iz++){
      const key=(ix+offset)*stride+iz+offset;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(c);
    }
  }
  return buildNavigation(island.plan,(x,y,z)=>{
    const nearby=buckets.get((Math.floor(x/cell)+offset)*stride+Math.floor(z/cell)+offset);
    return !nearby?.some(c=>localBoxContains(c,x,y,z,.30,1.72,!(c.scenery||c.resourceId)));
  });
}
export function obstacleTop(island,x,z,feet=Infinity){
  let top=-Infinity;
  for(const c of island.colliders){if(c.disabled||!c.walkable||c.y+c.h*.5>feet+.46)continue;const dx=x-c.x,dz=z-c.z,cs=c._cos??(c._cos=Math.cos(c.yaw)),sn=c._sin??(c._sin=Math.sin(c.yaw));if(Math.abs(dx*cs-dz*sn)<=c.w*.5&&Math.abs(dx*sn+dz*cs)<=c.d*.5)top=Math.max(top,c.y+c.h*.5);}
  return top;
}
function addModel(island,model,p,yaw=0){
  const root=model.group;root.position.set(p.x,p.y,p.z);root.rotation.y=yaw;island.structures.add(root);
  const cs=Math.cos(yaw),sn=Math.sin(yaw);
  for(const c of model.colliders||[])island.colliders.push({...c,x:p.x+c.x*cs+c.z*sn,y:p.y+c.y,z:p.z-c.x*sn+c.z*cs,yaw});
  for(const c of model.colliders||[]){
    const bottom=c.y-c.h*.5;if(c.h<.8||bottom>.24)continue;
    let low=Infinity;for(const dx of [-c.w*.5,c.w*.5])for(const dz of [-c.d*.5,c.d*.5]){const wx=p.x+(c.x+dx)*cs+(c.z+dz)*sn,wz=p.z-(c.x+dx)*sn+(c.z+dz)*cs;low=Math.min(low,island.plan.sample(wx,wz));}
    if(low<p.y+bottom+.30){const top=bottom+.045,base=low-p.y-.35,h=top-base;root.add(box(c.w+.025,h,c.d+.025,island.biome.rock,c.x,base+h*.5,c.z));island.colliders.push({x:p.x+c.x*cs+c.z*sn,y:p.y+base+h*.5,z:p.z-c.x*sn+c.z*cs,w:c.w,h,d:c.d,yaw,walkable:false,foundation:true});}
  }
  return root;
}
const offset=(p,dx,dz,angle)=>({x:p.x+dx*Math.cos(angle)+dz*Math.sin(angle),z:p.z-dx*Math.sin(angle)+dz*Math.cos(angle)});
function makeResource(world,island,{id,type,name,point,mesh,amount,loot,story,icon,action='gather',index,gate=false,parent}){
  const y=island.plan.sample(point.x,point.z),root=parent||mesh;if(!parent){mesh.position.set(point.x,y,point.z);island.pickups.add(mesh);}
  const collected=world.collected.has(id);mesh.visible=!collected;
  const r={id,type,name,mesh,root,position:new V3(island.x+point.x,y,island.z+point.z),local:{x:point.x,z:point.z},collected,action};
  if(amount!==undefined)r.amount=amount;if(loot)r.loot={...loot};if(story)r.story=story;if(icon)r.icon=icon;if(index!==undefined)r.index=index;if(gate)r.gate=true;
  island.resources.push(r);if(type==='rune')setCollectedVisual(r);return r;
}
function itemModel(type){
  if(type==='copper')return createRock(seededRandom(409),.28,0xbf9371);
  if(type==='coconut')return sphere(.17,0x96744d,0,.16,0,8);
  if(type==='vine'){const g=new THREE.Group();for(let j=0;j<3;j++){g.add(beam([j*.09-.1,0,0],[j*.06-.1,.55+j*.13,.04],.025,0x62874c),sphere(.095,0x80a45c,j*.06-.08,.25+j*.13,.04,5));}bakeStatic(g);return g;}
  if(type==='relic'){const g=new THREE.Group();g.add(cylinder(.18,.18,.06,0xc9b578,0,.03,0,10),sphere(.13,0x8dbcb6,0,.14,0,8));bakeStatic(g);return g;}
  if(type==='resin'||type==='coral')return createRock(seededRandom(409),.23,type==='resin'?0xd6af65:0xa2cdbb);
  const g=new THREE.Group();g.add(box(.53,.11,.20,type==='scrap'?0x97aa9d:0xb79565,0,.055,0),box(.38,.10,.15,type==='scrap'?0x879e94:0xcaa879,.05,.15,.03));bakeStatic(g);return g;
}
function placeFoliage(island){
  warmIslandAssets();const {plan}=island,rnd=seededRandom(island.seed^0x1df09),profile=plan.profile,buckets=new Map(),treePoints=[],forbidden=island.resources.map(r=>({x:r.local.x,z:r.local.z,r:r.type==='treasure'?1.1:.9}));
  const add=(kind,v,p)=>{const key=kind+':'+v;if(!buckets.has(key))buckets.set(key,{kind,variant:v,points:[]});buckets.get(key).points.push(p);};
  for(let attempts=0;attempts<2400&&treePoints.length<profile.trees;attempts++){
    const x=(rnd()*2-1)*plan.radius*1.08,z=(rnd()*2-1)*plan.radius*1.08,y=plan.sample(x,z);
    if(y<.48||routeDistance(plan,x,z)<2.15||plan.pads.some(p=>Math.hypot(x-p.x,z-p.z)<p.radius+1.35)||forbidden.some(p=>Math.hypot(x-p.x,z-p.z)<p.r+1.0)||treePoints.some(p=>Math.hypot(x-p.x,z-p.z)<1.65))continue;
    if(plan.waterfall&&Math.hypot(x-plan.waterfall.x,z-plan.waterfall.z)<3)continue;
    const slope=Math.hypot(plan.sample(x+.35,z)-plan.sample(x-.35,z),plan.sample(x,z+.35)-plan.sample(x,z-.35));if(slope>.85)continue;
    const kind=['ruins','outpost'].includes(island.biome.id)&&rnd()<.62?'broad':'palm',variant=Math.floor(rnd()*(kind==='palm'?3:2));
    const p={x,y:y-.015,z,scale:.76+rnd()*.28,yaw:rnd()*Math.PI*2,shade:.91+rnd()*.13};treePoints.push(p);add(kind,variant,p);
    // Only trunks are solid; fronds and ground foliage never form invisible walls.
    island.colliders.push({x:x,z:z,y:y+2.6,w:.27,h:5.2,d:.27,yaw:0,tree:true});
  }
  const kinds=['fern','broadleaf','bush','grass','flower','grass','rock','log'];
  let count=0;
  for(let attempts=0;attempts<profile.undergrowth*12&&count<profile.undergrowth;attempts++){
    const x=(rnd()*2-1)*plan.radius*1.1,z=(rnd()*2-1)*plan.radius*1.1,y=plan.sample(x,z);if(y<.30||routeDistance(plan,x,z)<1.14||plan.pads.some(p=>Math.hypot(x-p.x,z-p.z)<p.radius+.45)||forbidden.some(p=>Math.hypot(x-p.x,z-p.z)<p.r)||occupiedAt(island,x,y,z,.4,.8))continue;
    const kind=kinds[Math.floor(rnd()*kinds.length)],variant=['flower','rock'].includes(kind)?Math.floor(rnd()*3):0;
    const solidRadius=kind==='log'?1.15:kind==='rock'?.80:0;if(solidRadius&&(routeDistance(plan,x,z)<2.25||occupiedAt(island,x,y,z,solidRadius,.9)||forbidden.some(p=>Math.hypot(x-p.x,z-p.z)<p.r+solidRadius)))continue;
    const slope=Math.hypot(plan.sample(x+.28,z)-plan.sample(x-.28,z),plan.sample(x,z+.28)-plan.sample(x,z-.28));if(slope>.65)continue;
    const p={x,y:y-.005,z,scale:kind==='log'?.65+rnd()*.4:.65+rnd()*.6,yaw:rnd()*Math.PI*2,shade:.90+rnd()*.14};if(kind==='log'){const cs=Math.cos(p.yaw),sn=Math.sin(p.yaw),contact=[];for(const dx of [-1.15*p.scale,0,1.15*p.scale])for(const dz of [-.45*p.scale,.45*p.scale])contact.push(plan.sample(x+dx*cs+dz*sn,z-dx*sn+dz*cs));if(Math.max(...contact)-Math.min(...contact)>.075)continue;p.y=Math.min(...contact);}
    add(kind,variant,p);if(kind==='rock'||kind==='log')island.colliders.push({x,z,y:p.y+(kind==='rock'?.40:.19)*p.scale,w:(kind==='rock'?1.10:1.8)*p.scale,h:(kind==='rock'?.80:.38)*p.scale,d:(kind==='rock'?.96:.4)*p.scale,yaw:p.yaw,walkable:true,scenery:true});count++;
  }
  island.foliage=[];
  for(const b of buckets.values())island.foliage.push({kind:b.kind,variant:b.variant,meshes:instanceIslandAssets(island.land,b.kind,b.variant,b.points),count:b.points.length,canopy:['palm','broad'].includes(b.kind)});
  for(const bucket of island.foliage)if(bucket.canopy)for(const mesh of bucket.meshes){const near=new Float32Array(mesh.instanceMatrix.array),far=new Float32Array(near);for(let j=0;j<bucket.count;j++){const x=near[j*16+12],z=near[j*16+14];far[j*16+13]+=sampleTerrainLOD(plan,x,z)-plan.sample(x,z);}mesh.userData.nearMatrices=near;mesh.userData.farMatrices=far;mesh.userData.coastLOD='near';mesh.boundingSphere.radius+=1.2;}
  island.vegetation={trees:treePoints.length,undergrowth:count};
  // Low-cost reef colonies rooted to the actual seabed, not floating decorations.
  const reefBuckets=[[],[],[]];
  for(let i=0;i<70&&reefBuckets.flat().length<23;i++){
    const a=rnd()*Math.PI*2,r=plan.radius*(.9+rnd()*.30),x=Math.cos(a)*r,z=Math.sin(a)*r,y=plan.sample(x,z);if(y>-.45||y<-3.0)continue;
    reefBuckets[i%3].push({x,y,z,scale:.7+rnd()*.7,yaw:rnd()*Math.PI*2,shade:.90+rnd()*.18});
  }
  island.reefPoints=reefBuckets.flat();
  island.reefMeshes=reefBuckets.flatMap((p,i)=>instanceIslandAssets(island.reef,'coral',i,p));
}
function waterfall(island){
  const p=island.plan,w=p.waterfall;if(!w)return;const pos=[],uv=[],idx=[],n=20,cs=Math.cos(p.angle),sn=Math.sin(p.angle);
  for(let i=0;i<=n;i++){const v=-1.15+i/n*3.25;for(const u of [-.39,.39]){const x=w.x+u*cs+v*sn,z=w.z-u*sn+v*cs;pos.push(x,p.sample(x,z)+.055,z);uv.push((u+.39)/.78,i/n);}}
  for(let i=0;i<n;i++){const a=i*2;idx.push(a,a+2,a+1,a+1,a+2,a+3);}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geo.setIndex(idx);geo.computeVertexNormals();
  const mat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,uniforms:{time:islandWind.time,daylight:{value:1}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'uniform float time,daylight;varying vec2 vUv;void main(){float edge=smoothstep(0.,.14,vUv.x)*smoothstep(1.,.86,vUv.x);float streak=pow(.5+.5*sin(vUv.x*35.+sin(vUv.y*21.-time*4.)),4.);float rush=.5+.5*sin(vUv.y*68.-time*11.);vec3 c=mix(vec3(.29,.76,.73),vec3(.86,.98,.90),streak*.55+rush*.22);gl_FragColor=vec4(c*(.35+.65*daylight),edge*.77);#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}'.replace(';#include',';\n#include')});
  const flow=new THREE.Mesh(geo,mat);flow.name='spring-cascade';flow.renderOrder=8;island.effects.add(flow);island.waterfall=flow;
  const pool=offset(w,0,1.55,p.angle),poolY=p.sample(pool.x,pool.z)+.13;const water=cylinder(.87,.87,.025,0x77c6b0,pool.x,poolY,pool.z,20);water.scale.z=.82;island.structures.add(water);
  const a=new Float32Array(18*3);for(let i=0;i<18;i++){a[i*3]=pool.x+Math.sin(i*2.4)*.65;a[i*3+1]=poolY+.1+(i%5)*.10;a[i*3+2]=pool.z+Math.cos(i*2.4)*.6;}const mistGeo=new THREE.BufferGeometry();mistGeo.setAttribute('position',new THREE.BufferAttribute(a,3));const mist=new THREE.Points(mistGeo,new THREE.PointsMaterial({color:0xcdeede,size:.12,transparent:true,opacity:.3,depthWrite:false}));island.effects.add(mist);island.mist=mist;
}

export function createExplorationIsland(world,id,x,z,baseRadius,biomeIndex,seed,storyInfo=null){
  const biome=BIOMES[biomeIndex]||BIOMES[0],family=biome.legacyIndex??(biomeIndex%3),legacy=BIOMES[family],plan=createTerrainPlan(seed,baseRadius,biome,id),group=new THREE.Group();group.position.set(x,0,z);
  const island={id,x,z,radius:plan.radius,baseRadius,seed,biome,legacyBiome:legacy,group,plan,land:new THREE.Group(),structures:new THREE.Group(),pickups:new THREE.Group(),reef:new THREE.Group(),effects:new THREE.Group(),resources:[],colliders:[],jellies:[],name:id==='0,-1'?'Pelican Cay':ISLAND_NAMES[(seed%(ISLAND_NAMES.length-1))+1]};
  group.name='island-'+id;island.land.name='foliage';island.structures.name='landmarks';island.pickups.name='finite-supplies';island.effects.name='island-atmosphere';group.add(island.structures,island.land,island.pickups,island.reef,island.effects);
  const terrainMat=material(0xffffff,{vertexColors:true,roughness:1,flatShading:false});
  island.terrain=new THREE.Mesh(createTerrainGeometry(plan,64),terrainMat);island.terrain.name='canonical-walk-surface';island.terrain.receiveShadow=true;island.terrain.castShadow=false;
  island.farTerrain=new THREE.Mesh(createTerrainGeometry(plan,24),terrainMat);island.farTerrain.name='distant-island-lod';island.farTerrain.visible=false;group.add(island.terrain,island.farTerrain);
  const kind=biome.id==='ruins'?'temple':biome.id==='pirate'?'camp':biome.poi.kind;
  addModel(island,landmarkModel(kind,biome.rock),plan.landmark,plan.angle);
  const caveYaw=Math.atan2(plan.routes[0][5].x-plan.grotto.x,plan.routes[0][5].z-plan.grotto.z);
  addModel(island,caveModel(biome.rock,biome.id),plan.grotto,caveYaw);island.cave={...plan.grotto,yaw:caveYaw};
  const landmarkFront=offset(plan.landmark,kind==='spring'||kind==='wreck'?0:kind==='temple'?-1.2:-2.55,kind==='wreck'?3.0:kind==='temple'?3.0:kind==='spring'?2.0:1.50,plan.angle);
  const cache=makeResource(world,island,{id:`${id}:cache`,type:'cache',name:'Weathered supply cache',point:offset(plan.landing,.10,.03,plan.angle),mesh:treasureChest()});
  const cacheFlag=offset(plan.landing,1.1,.3,plan.angle),flagY=plan.sample(cacheFlag.x,cacheFlag.z);island.structures.add(beam([cacheFlag.x,flagY,cacheFlag.z],[cacheFlag.x,flagY+2.2,cacheFlag.z],.028,0x968052),box(.5,.28,.025,0xc58c5c,cacheFlag.x+.23,flagY+1.92,cacheFlag.z));
  const data=biome.poi;makeResource(world,island,{id:`${id}:poi:${legacy.poi.id}`,type:'poi',name:data.name,point:landmarkFront,mesh:treasureChest(.68),loot:data.loot,story:data.story,icon:data.icon,action:'explore'});
  for(let i=0;i<6;i++){
    const segment=1+i%5,a=plan.routes[0][segment-1],b=plan.routes[0][segment],t=.35+((seed+i*13)%31)/100,dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz),side=i%2?1:-1;
    const point={x:THREE.MathUtils.lerp(a.x,b.x,t)+dz/l*side*.9,z:THREE.MathUtils.lerp(a.z,b.z,t)-dx/l*side*.9},type=legacy.resources[i%legacy.resources.length];
    makeResource(world,island,{id:`${id}:resource${i}`,type,name:type==='copper'?'Copper deposit':type==='vine'?'Wild vine':type==='coconut'?'Ripe coconut':type==='scrap'?'Outpost scrap':'Driftwood bundle',point,mesh:itemModel(type)});
  }
  const specialPoint=offset(plan.routes[0][3],.6,-.2,plan.angle);makeResource(world,island,{id:`${id}:special`,type:legacy.special,name:legacy.special==='resin'?'Amber palm resin':legacy.special==='coral'?'Sea glass coral':'Navigator’s lens',point:specialPoint,mesh:itemModel(legacy.special),amount:legacy.special==='relic'?1:2});
  const puzzle=seed%3===0||id==='0,-1',sequence=puzzleSequence(seed);
  island.puzzle={enabled:puzzle,sequence};
  const journalPoint=offset(plan.viewpoint,0,.75,plan.angle),story=`${biome.id==='pirate'?'The quartermaster hid a share for whoever followed the headland trail.':biome.id==='volcano'?'The black terraces were here long before our camp. The sheltered shore still has vines and copper.':biome.id==='ruins'?'The old stone gateway frames the same stars we steered by. No ruin is silent if you know where to look.':'Follow the worn path past the overlook. A sheltered opening lies beyond the last bend.'} ${puzzle?`The latch answers three carved stones: ${sequence.map(k=>RUNE_NAMES[k]).join(', then ')}. Read them in that order. Their light will lead you back to the grotto.`:'The keeper left a provision chest in the grotto beyond the overlook. There is no lock, only a path easy to miss.'} Three signal fragments still carry the rescue frequency: 104.8.${id==='0,-1'?' The first keeper’s chart ends with four digits: 4821.':''}`;
  makeResource(world,island,{id:`${id}:explore:journal`,type:'journal',name:biome.id==='pirate'?'Quartermaster’s journal':'Keeper’s trail journal',point:journalPoint,mesh:journalModel(),story,icon:'book',action:'read'});
  if(puzzle)for(let k=0;k<3;k++){
    const node=plan.routes[0][1+k*2],point=offset(node,k%2?1.25:-1.25,.2,plan.angle),rune=runeModel(k),y=plan.sample(point.x,point.z);rune.group.position.set(point.x,y,point.z);rune.group.rotation.y=plan.angle;island.pickups.add(rune.group);
    makeResource(world,island,{id:`${id}:explore:rune${k}`,type:'rune',name:`${RUNE_NAMES[k][0].toUpperCase()+RUNE_NAMES[k].slice(1)} waystone`,point,mesh:rune.glyph,parent:rune.group,index:k,action:'touch'});
  }
  const treasurePoint=offset(plan.grotto,0,-.4,caveYaw),treasure=makeResource(world,island,{id:`${id}:explore:treasure`,type:'treasure',name:puzzle?'Sealed keeper’s chest':'Hidden provision chest',point:treasurePoint,mesh:treasureChest(.82,true),gate:puzzle,loot:{[legacy.special]:1,scrap:3,cookedFish:2,rope:1},story:'A dry parcel, carefully wrapped. Someone planned for another traveler. You leave the old shelter a little more certain of the next horizon.',icon:'backpack',action:puzzle?'inspect':'open'});
  if(biome.id==='reef'||biome.id==='ruins'||id==='0,-1'||seed%5===0){const archPoint=offset(plan.viewpoint,0,-1.8,plan.angle);archPoint.y=plan.sample(archPoint.x,archPoint.z);addModel(island,archModel(biome.rock),archPoint,plan.angle);island.rareLandmark='Sea gate';}
  else if(biome.id==='pirate'){const p=offset(plan.viewpoint,1.8,-1.5,plan.angle);p.y=plan.sample(p.x,p.z);addModel(island,watchtowerModel(),p,plan.angle);island.rareLandmark='Broken lookout';}
  if(biome.id==='volcano'){
    const ashPosition=plan.toLocal(0,-.24),positions=new Float32Array(24*3);for(let i=0;i<24;i++){const a=i*2.4,r=.4+(i%5)*.18;positions.set([ashPosition.x+Math.cos(a)*r,plan.sample(ashPosition.x,ashPosition.z)+.5+i*.10,ashPosition.z+Math.sin(a)*r],i*3);}const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(positions,3));const smoke=new THREE.Points(g,new THREE.PointsMaterial({color:0xbac6bb,size:.27,opacity:.28,transparent:true,depthWrite:false}));island.effects.add(smoke);island.fumarole=smoke;
  }
  for(let index=0;index<island.resources.length;index++){
    const r=island.resources[index],before=island.resources.slice(0,index),original={...r.local};let candidate=r.local;
    const safe=p=>plan.sample(p.x,p.z)>=.12&&!occupiedAt(island,p.x,plan.sample(p.x,p.z),p.z,.24,1.6)&&before.every(a=>Math.hypot(a.local.x-p.x,a.local.z-p.z)>.85);
    if(!safe(candidate))for(let attempt=0;attempt<70;attempt++){const a=attempt*2.39996,dist=.6+Math.floor(attempt/10)*.38,p={x:original.x+Math.cos(a)*dist,z:original.z+Math.sin(a)*dist};if(safe(p)){candidate=p;break;}}
    if(candidate!==r.local){const y=plan.sample(candidate.x,candidate.z);r.root.position.x+=candidate.x-r.local.x;r.root.position.z+=candidate.z-r.local.z;r.root.position.y+=y-r.position.y;r.local={...candidate};r.position.set(x+candidate.x,y,z+candidate.z);}
    if(['rune','cache','treasure','poi'].includes(r.type)){
      const scale=r.mesh.scale.x,h=r.type==='rune'?.925:.585*scale,w=r.type==='rune'?.55:.86*scale,d=r.type==='rune'?.42:.655*scale;
      r.collider={x:r.local.x,z:r.local.z,y:r.position.y+h*.5,w,h,d,yaw:r.type==='rune'?plan.angle:0,walkable:true,resourceId:r.id,disabled:false};island.colliders.push(r.collider);
    }
  }
  waterfall(island);placeFoliage(island);
  // Validate interaction approaches, not a fictitious ability to stand inside a
  // chest/waystone. Repairs retain IDs and search real reachable, unoccupied ground.
  const rebuild=()=>buildIslandNavigation(island);
  island.nav=rebuild();island.placementRepairs=0;
  const standing=(r,point,y)=>{
    const target=new V3(x+point.x,y,z+point.z);
    for(const k of island.nav.reachable){const q=island.nav.point(k),d=Math.hypot(q.x-point.x,q.z-point.z,(q.y-y)*.65);if(d>2.05||Math.abs(q.y-y)>1.55||occupiedAt(island,q.x,q.y,q.z,.29,1.72))continue;const from=new V3(x+q.x,q.y,z+q.z);if(world.interactionClear(island,from,target,r.id))return true;}
    return false;
  };
  const separated=(r,p)=>island.resources.every(a=>a===r||Math.hypot(a.local.x-p.x,a.local.z-p.z)>.85);
  for(let pass=0;pass<3;pass++){
    let changed=false;
    for(const r of island.resources){
      const inShelter=p=>{if(r.type!=='treasure')return true;const dx=p.x-plan.grotto.x,dz=p.z-plan.grotto.z,cs=Math.cos(caveYaw),sn=Math.sin(caveYaw);return Math.abs(dx*cs-dz*sn)<.72&&dx*sn+dz*cs>-.94&&dx*sn+dz*cs<.80;};
      const fits=(p,y)=>inShelter(p)&&y>=.12&&separated(r,p)&&!occupiedAt(island,p.x,y,p.z,r.type==='rune'?.34:r.collider?.47:.29,.70,r.id)&&standing(r,p,y);
      if(fits(r.local,r.position.y))continue;
      const candidates=island.nav.reachable.map(k=>island.nav.point(k)).sort((a,b)=>(a.x-r.local.x)**2+(a.z-r.local.z)**2-(b.x-r.local.x)**2-(b.z-r.local.z)**2),oldCollider=r.collider?{x:r.collider.x,y:r.collider.y,z:r.collider.z}:null;
      let chosen=null;
      for(const q of candidates){
        if(r.type==='rune'&&routeDistance(plan,q.x,q.z)<.95)continue;
        if(r.collider){r.collider.x=q.x;r.collider.z=q.z;r.collider.y=q.y+r.collider.h*.5;}
        if(fits(q,q.y)){chosen=q;break;}
      }
      if(oldCollider)Object.assign(r.collider,oldCollider);
      if(!chosen)throw new Error(`No accessible placement for ${r.id} (${island.nav.reachable.length} reachable cells)`);
      const dx=chosen.x-r.local.x,dz=chosen.z-r.local.z,dy=chosen.y-r.position.y;r.root.position.x+=dx;r.root.position.z+=dz;r.root.position.y+=dy;r.local={x:chosen.x,z:chosen.z};r.position.set(x+chosen.x,chosen.y,z+chosen.z);if(r.collider){r.collider.x+=dx;r.collider.y+=dy;r.collider.z+=dz;}island.placementRepairs++;changed=true;
    }
    if(!changed)break;island.nav=rebuild();
  }
  for(const r of island.resources){r.navKey=island.nav.closest(r.local,true);if(!standing(r,r.local,r.position.y))throw new Error('Inaccessible island resource: '+r.id);setCollectedVisual(r);}
  if(island.resources.some(r=>r.collected&&r.collider))island.nav=rebuild();
  // One optional shallow-water discovery per island. Reef shelves were rooted to
  // the canonical seabed above; choosing one cannot move land routes or colliders.
  const reefCandidates=(island.reefPoints||[]).filter(p=>p.y<-1.45&&p.y>-2.6).sort((a,b)=>Math.hypot(a.x-plan.landing.x,a.z-plan.landing.z)-Math.hypot(b.x-plan.landing.x,b.z-plan.landing.z));
  let reefPoint=reefCandidates[0];
  if(!reefPoint)for(let attempt=0;attempt<512&&!reefPoint;attempt++){
    const a=attempt*2.39996+seed,r=plan.radius*(.86+(attempt%13)/13*.42),p={x:Math.cos(a)*r,z:Math.sin(a)*r,y:plan.sample(Math.cos(a)*r,Math.sin(a)*r)};
    if(p.y<-1.45&&p.y>-2.6)reefPoint=p;
  }
  if(reefPoint){
    const mesh=treasureChest(.68,true);mesh.rotation.y=plan.angle;
    const cache=makeResource(world,island,{id:`${id}:explore:reef`,type:'reefCache',name:'Sunken keeper’s cache',point:reefPoint,mesh,loot:{coral:1,scrap:2,rope:1},story:'Beneath the coral, the same keeper’s mark. Their charts measured the safe shelves as carefully as the stars: a reminder that some forgotten roads begin below the tide.',icon:'compass',action:'recover'});
    cache.requiresDive=true;island.reefCache=cache;
  }
  const radial=new V3(plan.landing.x,0,plan.landing.z).normalize();let dock=plan.landing;
  for(let d=3;d<=12;d+=.5){const p={x:plan.landing.x+radial.x*d,z:plan.landing.z+radial.z*d};if(plan.sample(p.x,p.z)<-1.2){dock=p;break;}}
  island.dock={x:x+dock.x,z:z+dock.z,radius:2.3};
  for(let i=0;i<5;i++){const a=i*2.39996+seed,px=Math.cos(a)*plan.radius*1.32,pz=Math.sin(a)*plan.radius*1.32,j=createJellyfish();j.position.set(px,-.3,pz);group.add(j);island.jellies.push(j);}
  // --- Voyager update: authored story shores, island hazards, and a keeper with a voice ---
  const hazardPoints = [];
  for(let i=0;i<plan.routes[0].length-1;i+=2){
    const a=plan.routes[0][i],p={x:THREE.MathUtils.lerp(a.x,plan.routes[0][i+1].x,.5),z:THREE.MathUtils.lerp(a.z,plan.routes[0][i+1].z,.5)};
    const y=plan.sample(p.x,p.z);if(y<.2)continue;
    hazardPoints.push({x:p.x,z:p.z,y,radius:1.05});
    const tuft=new THREE.Group();
    for(let k=0;k<5;k++){const ang=k*1.26;tuft.add(beam([Math.cos(ang)*.22,0,Math.sin(ang)*.22],[Math.cos(ang)*.5,.5,Math.sin(ang)*.5],.014,k%2?0x6b7f4e:0x8a9a58));}
    tuft.position.set(p.x,y,p.z);island.structures.add(tuft);
  }
  island.hazards=hazardPoints.map(h=>({x:x+h.x,z:z+h.z,y:h.y,radius:h.radius}));

  if(storyInfo){
    island.story=storyInfo;island.name=storyInfo.name;island.storyCode=storyInfo.code;
    const keeper=new THREE.Group();
    keeper.add(cylinder(.15,.17,.58,0x64796f,0,.38,0),sphere(.14,0xc9a47d,0,.83,0,10),cylinder(.19,.19,.04,0xd9b96e,0,.97,0,10));
    keeper.add(box(.4,.16,.16,0x8a7356,.2,.6,0));
    keeper.position.set(plan.landmark.x,plan.sample(plan.landmark.x,plan.landmark.z),plan.landmark.z);
    keeper.rotation.y=plan.angle+.45;island.structures.add(keeper);
    const codePoint=offset(plan.viewpoint,-1.05,.55,plan.angle);
    makeResource(world,island,{id:`${id}:story:code`,type:'code',name:'Keeper’s four-digit code',point:codePoint,mesh:journalModel(),story:`${storyInfo.title}. ${storyInfo.story}`,icon:'map',action:'read',loot:storyInfo.reward});
    const cachePoint=offset(plan.landing,-1.25,-.55,plan.angle);
    makeResource(world,island,{id:`${id}:story:cache`,type:'storyCache',name:'Keeper’s supply cache',point:cachePoint,mesh:treasureChest(.72),loot:{scrap:3,rope:2,copperIngot:1,lanternFish:1},story:'A dry locker, a folded chart, and a jar of something pickled. The keeper expected company.',icon:'backpack',action:'open'});
    if(storyInfo.finale){
      const lamp=new THREE.Group();
      lamp.add(cylinder(.22,.3,1.5,0xb9b39a,0,.75,0),cylinder(.34,.34,.12,0x7c8a80,0,1.55,0,10));
      const glow=sphere(.19,0xe9b557,0,1.75,0,10);glow.material=material(0xe9b557,{emissive:0xe9b557,emissiveIntensity:1.6});lamp.add(glow);
      makeResource(world,island,{id:`${id}:story:keeper`,type:'finaleBeacon',name:'The cold lighthouse lamp',point:offset(plan.viewpoint,1.15,-.7,plan.angle),mesh:lamp,story:'The lamp is cold, but the mechanism is sound. A beacon built on this shore would carry farther than any signal yet.',icon:'beacon',action:'inspect'});
    }
  }
  bakeStatic(island.structures);return island;
}

export function setExplorationDetail(island,position,quality){
  const d=Math.hypot(position.x-island.x,position.z-island.z),near=d<island.radius+Math.max(quality.islandNearDistance??32,quality.foliageDistance??34,quality.resourceDistance??34),visible=d<quality.viewDistance+island.radius;
  island.group.visible=visible;island.terrain.visible=near;island.farTerrain.visible=!near;
  const detail=d<island.radius+(quality.foliageDistance??34),factor=quality.foliage??.65;
  island.land.visible=visible;
  for(const bucket of island.foliage)for(const mesh of bucket.meshes){mesh.visible=bucket.canopy?(detail||bucket.variant===0)&&d<quality.viewDistance+island.radius:detail;mesh.count=bucket.canopy?(detail?bucket.count:Math.min(bucket.count,Math.max(3,Math.round(bucket.count*factor*.8)))):['rock','log'].includes(bucket.kind)?bucket.count:Math.round(bucket.count*factor);if(bucket.canopy){mesh.geometry=(!detail||quality.label==='Low')?mesh.userData.farGeometry:mesh.userData.nearGeometry;const lod=near?'near':'far';if(lod!==mesh.userData.coastLOD){mesh.instanceMatrix.array.set(near?mesh.userData.nearMatrices:mesh.userData.farMatrices);mesh.instanceMatrix.needsUpdate=true;mesh.userData.coastLOD=lod;}}}
  island.pickups.visible=d<island.radius+(quality.resourceDistance??34);
  for(const r of island.resources)setCollectedVisual(r);
  island.reef.visible=detail;for(const m of island.reefMeshes)m.count=Math.max(0,Math.round(m.instanceMatrix.count*factor));
  island.effects.visible=detail;
  if(island.mist)island.mist.geometry.setDrawRange(0,Math.round(18*factor));if(island.fumarole)island.fumarole.geometry.setDrawRange(0,Math.round(24*factor));
  for(const jelly of island.jellies)jelly.visible=d<quality.entityDistance+island.radius*2;
}

export function setCollectedVisual(resource){
  if(resource.collider&&resource.type!=='rune')resource.collider.disabled=resource.collected;
  if(resource.type!=='rune'){resource.mesh.visible=!resource.collected;return;}
  resource.mesh.visible=true;if(resource.collected&&!resource.mesh.userData.activated){resource.mesh.userData.activated=true;resource.mesh.traverse(m=>{if(m.isMesh)m.material=material(0xc5e2b4,{vertexColors:true,emissive:0x3c7152,emissiveIntensity:.45});});}
}
