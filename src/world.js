import * as THREE from 'three';
import { BIOMES, ISLAND_NAMES, WEATHER } from './data.js';
import { hash2, seededRandom, ObjectPool, clamp } from './systems.js';
import { box, cylinder, beam, sphere, material, createPalm, createRock, createDebris, createShark, createJellyfish, createBird, bakeStatic, disposeObject } from './assets.js';

import {createExplorationIsland,setExplorationDetail,occupiedAt,obstacleTop,RUNE_NAMES,setCollectedVisual} from './island-generation.js';
import {chartSeaRoute} from './coastal-navigation.js';
import {islandWind} from './island-assets.js';

export function waveHeight(x,z,t,amplitude=1){return amplitude*(Math.sin(x*.55+z*.2+t*1.1)*.075+Math.sin(-x*.28+z*.7+t*1.45)*.045+Math.sin(x*1.35+z*.4-t*1.8)*.017+Math.sin(x*2.1-z*1.4+t*2.4)*.008);}

export class Ocean {
  constructor(scene){
    this.atlasSize=65;this.coastPixels=new Uint8Array(65*65*4*4);this.coastTexture=new THREE.DataTexture(this.coastPixels,65,260,THREE.RGBAFormat);this.coastTexture.minFilter=this.coastTexture.magFilter=THREE.LinearFilter;this.coastTexture.generateMipmaps=false;this.coastTexture.needsUpdate=true;this.coastKey='';
    this.uniforms={coastAtlas:{value:this.coastTexture},coastColors:{value:Array.from({length:4},()=>new THREE.Color(0x4fc7b4))},microDetail:{value:1},time:{value:0},amplitude:{value:1},sunDirection:{value:new THREE.Vector3(-.5,.8,-.3).normalize()},sunColor:{value:new THREE.Color(0xffeccb)},deepColor:{value:new THREE.Color(0x176e87)},shallowColor:{value:new THREE.Color(0x67bdb0)},fogColor:{value:new THREE.Color(0xbad8d4)},fogDensity:{value:.0018},daylight:{value:1},islands:{value:Array.from({length:4},()=>new THREE.Vector3(10000,10000,0))}};
    const mat=new THREE.ShaderMaterial({uniforms:this.uniforms,transparent:true,depthWrite:false,vertexShader:`
      uniform float time, amplitude;
      varying vec3 vWorld, vNormal; varying float vHeight;
      void main(){
        vec3 p=(modelMatrix*vec4(position,1.)).xyz;
        float a=p.x*.55+p.z*.2+time*1.1;
        float b=-p.x*.28+p.z*.7+time*1.45;
        float c=p.x*1.35+p.z*.4-time*1.8;
        float d=p.x*2.1-p.z*1.4+time*2.4;
        float h=(sin(a)*.075+sin(b)*.045+sin(c)*.017+sin(d)*.008)*amplitude;
        float dx=(cos(a)*.075*.55-cos(b)*.045*.28+cos(c)*.017*1.35+cos(d)*.008*2.1)*amplitude;
        float dz=(cos(a)*.075*.2+cos(b)*.045*.7+cos(c)*.017*.4-cos(d)*.008*1.4)*amplitude;
        p.y=h; vWorld=p;vHeight=h;vNormal=normalize(vec3(-dx,1.,-dz));
        gl_Position=projectionMatrix*viewMatrix*vec4(p,1.);
      }`,fragmentShader:`
      uniform float time, amplitude, fogDensity, daylight, microDetail;
      uniform sampler2D coastAtlas;uniform vec3 coastColors[4];
      uniform vec3 sunDirection,sunColor,deepColor,shallowColor,fogColor;
      uniform vec3 islands[4];
      varying vec3 vWorld,vNormal;varying float vHeight;
      void main(){
        float dist=length(cameraPosition-vWorld),detail=(1.-smoothstep(16.,85.,dist))*microDetail;
        vec3 n=normalize(vNormal+vec3(sin(vWorld.x*4.+time)*.018,0.,cos(vWorld.z*4.3+time*.8)*.018)*detail);
        vec3 viewDir=normalize(cameraPosition-vWorld);
        float fresnel=pow(1.-max(dot(n,viewDir),0.),3.);
        float bed=-5.;vec3 shoreTint=shallowColor;
        for(int i=0;i<4;i++){
          vec2 local=(vWorld.xz-islands[i].xy)/max(islands[i].z*2.,.01)+.5;
          if(local.x>=0.&&local.x<=1.&&local.y>=0.&&local.y<=1.){
            vec2 uv=vec2((local.x*64.+.5)/65.,(local.y*64.+.5+float(i)*65.)/260.);
            vec4 packed=texture2D(coastAtlas,uv);float h=(packed.r*65280.+packed.g*255.)/65535.*16.-5.;
            if(h>bed){bed=h;shoreTint=coastColors[i];}
          }
        }
        float depth=max(0.,vWorld.y-bed),shallow=1.-smoothstep(.25,4.1,depth);
        float shore=(1.-smoothstep(.035,.32,abs(depth-(.10+.045*sin(time*1.5+vWorld.x*.5)))))*(.72+.28*sin(vWorld.z*4.-time*2.));
        float pattern=sin(vWorld.x*.42+vWorld.z*.3+time*.4)*sin(vWorld.z*.33-time*.45)*.018;
        vec3 color=mix(deepColor,shoreTint,clamp(shallow*.95+pattern,0.,1.));
        float caustic=pow(max(0.,sin(vWorld.x*2.6+sin(vWorld.z*2.)+time*.8)*sin(vWorld.z*2.7-time*.6)),5.);
        color+=vec3(.08,.12,.06)*caustic*shallow*detail*(1.-shore);
        color=mix(color,fogColor,fresnel*.30);
        float spec=pow(max(dot(reflect(-sunDirection,n),viewDir),0.),140.);
        float sparkle=pow(max(dot(reflect(-sunDirection,n),viewDir),0.),850.);
        color+=sunColor*(spec*.35+sparkle*.40*detail)*daylight;
        float crest=smoothstep(.115,.148,vHeight/max(amplitude,.1))*smoothstep(.3,.9,sin(vWorld.x*3.+vWorld.z*1.2+time)*.5+.5)*.19;
        color=mix(color,vec3(.82,.94,.87),clamp(crest+shore*.72,0.,.65));
        color*=.33+.67*daylight;
        float fog=1.-exp(-pow(dist*fogDensity,2.));
        color=mix(color,fogColor,clamp(fog,0.,1.));
        float alpha=clamp(mix(.43,.99,smoothstep(.12,3.1,depth))+fresnel*.17+shore*.22,.43,1.);
        gl_FragColor=vec4(color,alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`});
    const geo=new THREE.PlaneGeometry(1500,1500,80,80);geo.rotateX(-Math.PI/2);this.geometries=new Map([[80,geo]]);this.mesh=new THREE.Mesh(geo,mat);this.mesh.frustumCulled=false;this.mesh.renderOrder=3;this.mesh.position.y=-.03;scene.add(this.mesh);
  }
  setQuality(segments) {
    this.uniforms.microDetail.value=segments<=48?.45:1;
    if(!this.geometries.has(segments)){const geo=new THREE.PlaneGeometry(1500,1500,segments,segments);geo.rotateX(-Math.PI/2);this.geometries.set(segments,geo);}
    this.mesh.geometry=this.geometries.get(segments);
  }
  update(t,position,weather,daylight,islands,dt=1/60){this.uniforms.time.value=t;this.uniforms.amplitude.value=THREE.MathUtils.lerp(this.uniforms.amplitude.value,WEATHER[weather].amplitude,1-Math.exp(-dt*.8));this.uniforms.daylight.value=daylight;this.uniforms.fogDensity.value=WEATHER[weather].fog;this.mesh.position.x=Math.round(position.x/100)*100;this.mesh.position.z=Math.round(position.z/100)*100;const centers=this.uniforms.islands.value,nearest=[...islands].sort((a,b)=>Math.hypot(a.x-position.x,a.z-position.z)-Math.hypot(b.x-position.x,b.z-position.z)).slice(0,4),key=nearest.map(i=>i.id).join('|');
    if(key!==this.coastKey){this.coastKey=key;this.coastPixels.fill(0);nearest.forEach((island,index)=>{const extent=island.plan?.extent??island.radius*1.42;centers[index].set(island.x,island.z,extent);this.uniforms.coastColors.value[index].set(island.plan?.profile.water??0x61c7b4);for(let j=0;j<65;j++)for(let i=0;i<65;i++){const x=(i/64*2-1)*extent,z=(j/64*2-1)*extent,h=island.plan?island.plan.sample(x,z):-5,q=Math.round(clamp((h+5)/16,0,1)*65535),k=((index*65+j)*65+i)*4;this.coastPixels[k]=q>>8;this.coastPixels[k+1]=q&255;this.coastPixels[k+3]=255;}});for(let i=nearest.length;i<4;i++)centers[i].set(10000,10000,0);this.coastTexture.needsUpdate=true;}
  }

}

function mergeStatic(group){return bakeStatic(group);}
export class WorldGenerator {
  constructor(scene,bus,saved={}){this.scene=scene;this.bus=bus;this.chunks=new Map();this.islands=[];this.chunkSize=100;this.collected=new Set(saved.collected||[]);this.discovered=new Set(saved.discovered||[]);this.palms=[];this.lastChunk='';this.pending=[];this.needed=new Set();this.quality=null;}
  update(position,budget=Infinity) {
    const cx=Math.floor(position.x/100),cz=Math.floor(position.z/100),key=`${cx},${cz}`;
    if(key!==this.lastChunk) {
      this.lastChunk=key;this.needed=new Set();const pending=[];
      for(let x=cx-1;x<=cx+1;x++)for(let z=cz-1;z<=cz+1;z++){const k=`${x},${z}`;this.needed.add(k);if(!this.chunks.has(k))pending.push([x,z]);}
      this.pending=pending.sort((a,b)=>Math.hypot(a[0]-cx,a[1]-cz)-Math.hypot(b[0]-cx,b[1]-cz));
      for(const [k,chunk] of this.chunks) if(!this.needed.has(k)) {
        if(chunk.island){this.scene.remove(chunk.island.group);this.islands=this.islands.filter(i=>i!==chunk.island);disposeObject(chunk.island.group);}
        this.chunks.delete(k);
      }
    }
    let loaded=0;while(this.pending.length&&loaded<budget){const [x,z]=this.pending.shift();if(this.needed.has(`${x},${z}`)&&!this.chunks.has(`${x},${z}`)){this.loadChunk(x,z);loaded++;}}
    if(loaded)this.bus.emit('chunks',this.chunks.size);
    for(const island of this.islands){const d=Math.hypot(position.x-island.x,position.z-island.z);if(d<island.radius+18&&!this.discovered.has(island.id)){this.discovered.add(island.id);this.bus.emit('islandDiscovered',island);}}
  }
  setDetail(position,quality) {
    this.quality=quality;
    for(const island of this.islands) {
      if(island.plan){setExplorationDetail(island,position,quality);continue;}
      const distance=Math.hypot(position.x-island.x,position.z-island.z);
      island.group.visible=distance<quality.viewDistance+island.radius;
      island.land.visible=distance<quality.detailDistance+island.radius;
      for(const r of island.resources)r.mesh.visible=!r.collected&&distance<quality.detailDistance+island.radius;
      for(const jelly of island.jellies)jelly.visible=distance<quality.entityDistance+island.radius*2;
    }
  }
  loadChunk(cx,cz){let island=null;if(cx===0&&cz===-1)island=this.generateIsland('0,-1',28,-61,12.5,0,4281);else if(!(cx===0&&cz===0)&&hash2(cx,cz)>.37){const seed=Math.floor(hash2(cx,cz,9218)*999999),random=seededRandom(seed);island=this.generateIsland(`${cx},${cz}`,(cx+.5)*100+(random()-.5)*32,(cz+.5)*100+(random()-.5)*32,10+random()*6,(Math.floor(random()*3)+(hash2(cx,cz,6631)>.55?3:0)),seed);}this.chunks.set(`${cx},${cz}`,{island});if(island){this.islands.push(island);this.scene.add(island.group);}}
  generateIsland(id,x,z,radius,biomeIndex,seed){return createExplorationIsland(this,id,x,z,radius,biomeIndex,seed);}
  localHeight(island,x,z){if(island.plan)return island.plan.sample(x,z);const a=Math.atan2(z,x),shape=1+Math.sin(a*3+island.seed)*.07+Math.cos(a*5+island.seed*.3)*.05;const r=Math.hypot(x,z)/(island.radius*shape);if(r>1.12)return -2;const profile=[[0,3.2],[.2,3.8],[.42,2.7],[.64,1.25],[.78,.38],[.94,.12],[1.02,-.2],[1.12,-1.5]];let h=-1;for(let i=1;i<profile.length;i++){if(r<=profile[i][0]){const [r0,h0]=profile[i-1],[r1,h1]=profile[i];h=THREE.MathUtils.lerp(h0,h1,(r-r0)/(r1-r0));break;}}return h+Math.sin(x*.7+island.seed)*Math.cos(z*.6)*.10*Math.max(0,1-r);}
  groundAt(x,z,feet=-Infinity){for(const island of this.islands){const extent=island.plan?.extent??island.radius*1.12;if(Math.abs(x-island.x)>extent||Math.abs(z-island.z)>extent)continue;const px=x-island.x,pz=z-island.z,h=this.localHeight(island,px,pz);if(h>-.15)return {height:island.plan?Math.max(h,obstacleTop(island,px,pz,feet)):h,island};}return null;}
  nearestResource(position,max=2.4){let nearest=null,best=max;for(const island of this.islands)for(const r of island.resources){if(!r.collected){const dx=position.x-r.position.x,dz=position.z-r.position.z,dy=position.y-r.position.y,d=Math.hypot(dx,dz,dy*.65);if(d<best&&Math.abs(dy)<1.8&&this.interactionClear(island,position,r.position,r.id)){best=d;nearest={...r,island,original:r};if(r.type==='treasure'&&r.gate&&island.puzzle.sequence.every(k=>this.collected.has(`${island.id}:explore:rune${k}`))){nearest.name='Keeper’s provision chest';nearest.action='open';}}}}return nearest;}
  interactionClear(island,from,to,targetId=null){
    if(!island.plan)return true;
    const start=new THREE.Vector3(from.x-island.x,from.y+1.1,from.z-island.z),end=new THREE.Vector3(to.x-island.x,to.y+.30,to.z-island.z),d=end.clone().sub(start),length=d.length();
    for(let t=.18;t<length-.20;t+=.22){const p=start.clone().addScaledVector(d,t/length);if(island.plan.sample(p.x,p.z)>p.y-.04||occupiedAt(island,p.x,p.y,p.z,.015,.04,targetId))return false;}return true;
  }
  terrainHeight(x,z){let h=-5;for(const i of this.islands)if(Math.abs(x-i.x)<i.plan.extent&&Math.abs(z-i.z)<i.plan.extent)h=Math.max(h,i.plan.sample(x-i.x,z-i.z));return h;}
  boatContact(position,samples){for(const p of samples)if(this.terrainHeight(position.x+p.x,position.z+p.z)>-.38)return true;return false;}
  seaClear(x,z,radius=3.5){if(this.terrainHeight(x,z)>-.42)return false;for(let k=0;k<8;k++){const a=k*Math.PI/4;if(this.terrainHeight(x+Math.cos(a)*radius,z+Math.sin(a)*radius)>-.42)return false;}return true;}
  dockFor(island,radius=3.5){const p=island.plan.landing,l=Math.hypot(p.x,p.z),dx=p.x/l,dz=p.z/l;for(let d=3;d<radius*2+28;d+=.5){const q={x:island.x+p.x+dx*d,z:island.z+p.z+dz*d};if(this.seaClear(q.x,q.z,radius+1))return q;}return {x:island.x+dx*(island.radius+radius+12),z:island.z+dz*(island.radius+radius+12)};}
  seaRoute(start,target,radius=3.5){return chartSeaRoute(start,target,(x,z)=>this.seaClear(x,z,radius+.65));}
  resolveMovement(old,position,swimming=false){
    const fits=(x,z)=>{for(const island of this.islands){if(!island.plan||Math.hypot(x-island.x,z-island.z)>island.plan.extent*1.42)continue;const px=x-island.x,pz=z-island.z,h=island.plan.sample(px,pz);if(h>Math.max(old.y+.46,swimming?.35:-Infinity))return false;const rise=h-old.y,run=Math.hypot(x-old.x,z-old.z);if(!swimming&&rise>.015&&run>.001&&rise/run>1.05)return false;if(occupiedAt(island,px,old.y,pz,.28,1.72))return false;}return true;};
    if(fits(position.x,position.z))return;
    if(fits(old.x,position.z))position.x=old.x;else if(fits(position.x,old.z))position.z=old.z;else{position.x=old.x;position.z=old.z;}
  }
  cameraClip(target,desired){
    const delta=desired.clone().sub(target),length=delta.length();if(!length)return desired;
    for(let d=.55;d<length;d+=.23){const p=target.clone().addScaledVector(delta,d/length);let hit=false;for(const i of this.islands)if(i.plan&&Math.abs(p.x-i.x)<i.plan.extent&&Math.abs(p.z-i.z)<i.plan.extent){const x=p.x-i.x,z=p.z-i.z;if(i.plan.sample(x,z)>p.y-.20||occupiedAt(i,x,p.y-.1,z,.13,.20)){hit=true;break;}}if(hit)return desired.copy(target).addScaledVector(delta,Math.max(.4,d-.25)/length);}return desired;
  }
  ceilingAt(position,oldY){
    for(const island of this.islands)if(island.plan)for(const c of island.colliders){const dx=position.x-island.x-c.x,dz=position.z-island.z-c.z,cs=Math.cos(c.yaw),sn=Math.sin(c.yaw),bottom=c.y-c.h*.5;if(Math.abs(dx*cs-dz*sn)<c.w*.5+.18&&Math.abs(dx*sn+dz*cs)<c.d*.5+.18&&oldY+1.72<=bottom+.02&&position.y+1.72>bottom)return bottom-1.72;}return null;
  }
  animate(t,daylight=1,gust=1){islandWind.time.value=t%4096;islandWind.strength.value=(this.quality?.foliage??.65)*gust;for(const i of this.islands){if(i.waterfall)i.waterfall.material.uniforms.daylight.value=daylight;if(i.mist){i.mist.position.y=Math.sin(t*.9+i.seed)*.08;i.mist.material.opacity=.15+.15*daylight;}if(i.fumarole){i.fumarole.position.y=Math.sin(t*.45+i.seed)*.20;i.fumarole.material.opacity=.12+.16*daylight;}}}
  navigationPath(island,resource){return island.nav?.pathTo({x:resource.position.x-island.x,z:resource.position.z-island.z}).map(p=>new THREE.Vector3(p.x+island.x,p.y,p.z+island.z))||[];}
  collect(resource,position=null) {
    const r=resource?.original,island=resource?.island;
    if(!r||!this.islands.includes(island)||!island.resources.includes(r)||r.collected||this.collected.has(r.id))return false;
    if(position&&(Math.hypot(position.x-r.position.x,position.z-r.position.z,(position.y-r.position.y)*.65)>2.6||Math.abs(position.y-r.position.y)>1.8))return false;
    if(position&&!this.interactionClear(island,position,r.position,r.id))return false;
    if(r.type==='rune'){
      if(!this.collected.has(`${island.id}:explore:journal`)){this.bus.emit('islandHint','The worn symbols need a clue. A journal waits on the overlook.');return false;}
      const progress=island.puzzle.sequence.filter(k=>this.collected.has(`${island.id}:explore:rune${k}`)).length;
      if(island.puzzle.sequence[progress]!==r.index){this.bus.emit('islandHint','The stone is quiet. Check the journal for the next symbol.');return false;}
    }
    if(r.type==='treasure'&&r.gate&&!island.puzzle.sequence.every(k=>this.collected.has(`${island.id}:explore:rune${k}`))){this.bus.emit('islandHint','Three carved waystones are tied to this latch. Follow the trail to the keeper’s journal.');return false;}
    r.collected=true;setCollectedVisual(r);this.collected.add(r.id);this.bus.emit('resourceCollected',{type:r.type,island,resource:r});return true;
  }
  toJSON(){return {generationVersion:3,collected:[...this.collected],discovered:[...this.discovered]};}
}

export class DebrisSpawner {
  constructor(scene){this.scene=scene;this.pools={};this.active=[];this.spawnTimer=0;this.frustum=new THREE.Frustum();this.matrix=new THREE.Matrix4();const sizes={wood:22,leaf:15,plastic:12,scrap:8,barrel:7};for(const[type,size]of Object.entries(sizes)){this.pools[type]=new ObjectPool(()=>{const m=createDebris(type);m.visible=false;scene.add(m);return m;},size);}this.entityDistance=65;this.types=['wood','wood','wood','leaf','leaf','plastic','plastic','scrap','barrel'];}
  spawn(type,x,z){const mesh=this.pools[type].acquire();const d={type,mesh,x,z,phase:Math.random()*6.28,rotation:Math.random()*6.28,hooked:false};mesh.position.set(x,0,z);this.active.push(d);return d;}
  seed(position){for(let i=0;i<43;i++){const a=i*2.39996,r=5+Math.sqrt(i/43)*29;this.spawn(this.types[i%this.types.length],position.x+Math.cos(a)*r,position.z+Math.sin(a)*r);}this.spawn('barrel',position.x+2.6,position.z+4.7);this.spawn('wood',position.x-1.7,position.z+4.3);}
  update(dt,t,position,camera,amp=1){
    this.spawnTimer+=dt;
    for(let i=this.active.length-1;i>=0;i--){const d=this.active[i];if(!d.hooked){d.x+=dt*.035;d.z+=dt*.1;d.mesh.position.set(d.x,waveHeight(d.x,d.z,t,amp)+.03,d.z);d.mesh.rotation.y=d.rotation+Math.sin(t*.3+d.phase)*.12;d.mesh.rotation.x=Math.sin(t*.8+d.phase)*.07;}
      const distance=Math.hypot(d.x-position.x,d.z-position.z);d.mesh.visible=d.hooked||distance<this.entityDistance;if(distance>65&&!d.hooked)this.release(d);
    }
    if(this.spawnTimer>.6&&this.active.length<48){this.spawnTimer=0;this.matrix.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);this.frustum.setFromProjectionMatrix(this.matrix);for(let i=0;i<10;i++){const a=Math.random()*6.28,r=30+Math.random()*13,x=position.x+Math.cos(a)*r,z=position.z+Math.sin(a)*r;if(!this.frustum.containsPoint(new THREE.Vector3(x,0,z))){this.spawn(this.types[Math.floor(Math.random()*this.types.length)],x,z);break;}}}
  }
  release(d){this.pools[d.type].release(d.mesh);const i=this.active.indexOf(d);if(i>=0)this.active.splice(i,1);}
  nearest(position,radius=1){let result=null,best=radius;for(const d of this.active){if(d.hooked)continue;const dist=d.mesh.position.distanceTo(position);if(dist<best){best=dist;result=d;}}return result;}
}

export class SharkAI {
  constructor(scene,bus){this.pool=new ObjectPool(()=>{const m=createShark();scene.add(m);return m;},1);this.mesh=this.pool.acquire();this.bus=bus;this.state='circling';this.timer=0;this.angle=1.8;this.health=100;this.target=null;this.attackCooldown=65;this.position=this.mesh.position;this.position.set(12,0,12);this.biteCooldown=0;}
  update(dt,t,raft,grid,relaxed){
    if(relaxed&&['targeting','attacking'].includes(this.state)){this.state='circling';this.timer=0;this.target=null;}
    this.timer+=dt;this.biteCooldown=Math.max(0,this.biteCooldown-dt);if(!this.mesh.visible){if(this.timer>55){this.mesh=this.pool.acquire();this.position=this.mesh.position;this.position.copy(raft.position).add(new THREE.Vector3(14,0,14));this.health=100;this.state='circling';this.timer=0;this.target=null;}return;}
    this.mesh.userData.tail.rotation.y=Math.sin(t*4.5)*.32;
    const targetPos=new THREE.Vector3();let speed=2.4;
    if(this.state==='circling'){
      this.angle+=dt*.11;targetPos.set(raft.position.x+Math.cos(this.angle)*13,0,raft.position.z+Math.sin(this.angle)*13);
      if(this.timer>this.attackCooldown&&!relaxed){const outer=grid.exposedFoundations();if(outer.length){const preferred=outer.filter(b=>grid.at(b.x,b.y+1,b.z)?.type!=='armor');const choices=preferred.length?preferred:outer;this.target=choices[Math.floor(Math.random()*choices.length)];this.state='targeting';this.timer=0;this.bus.emit('sharkWarning',this.target);}}
    }else if(this.state==='targeting'){
      if(!this.target||grid.at(this.target.x,this.target.y,this.target.z)!==this.target){this.state='circling';this.timer=0;return;}
      const dir=this.position.clone().sub(raft.position).setY(0);if(dir.lengthSq()<1e-6)dir.set(1,0,0);else dir.normalize();targetPos.copy(raft.position).addScaledVector(dir,8);speed=1.3;if(this.timer>5){this.state='attacking';this.timer=0;this.bus.emit('sharkCharge');}
    }else if(this.state==='attacking'){
      if(!this.target||grid.at(this.target.x,this.target.y,this.target.z)!==this.target){this.state='circling';this.timer=0;return;}
      targetPos.set(this.target.x,.1,this.target.z);raft.localToWorld(targetPos);targetPos.y=0;speed=6;
      if(this.position.distanceTo(targetPos)<1){const plate=grid.at(this.target.x,this.target.y+1,this.target.z);this.lastBiteDamage=plate?.type==='armor'?10:20;grid.damage(this.target,this.lastBiteDamage);if(plate?.type==='armor')grid.damage(plate,4);this.bus.emit('sharkBite',this.target);this.state='fleeing';this.timer=0;}
    }else if(this.state==='fleeing'||this.state==='stunned'){
      const dir=this.position.clone().sub(raft.position).setY(0);if(dir.lengthSq()<1e-6)dir.set(1,0,0);else dir.normalize();targetPos.copy(raft.position).addScaledVector(dir,28);speed=this.state==='stunned'?.5:5;if(this.state==='stunned'&&this.timer>.7){this.state='fleeing';this.timer=0;}if(this.timer>10){this.state='circling';this.timer=0;this.attackCooldown=38;}
    }
    targetPos.y=waveHeight(this.position.x,this.position.z,t);const dir=targetPos.sub(this.position);dir.y=0;const distance=dir.length();if(distance>.1){const heading=Math.atan2(dir.x,dir.z);this.mesh.rotation.y+=THREE.MathUtils.euclideanModulo(heading-this.mesh.rotation.y+Math.PI,Math.PI*2)-Math.PI;this.position.addScaledVector(dir.normalize(),Math.min(speed*dt,distance));}this.position.y=waveHeight(this.position.x,this.position.z,t);
  }
  hit(){if(!this.mesh.visible||this.health<=0||(this.state==='stunned'&&this.timer<.3))return false;this.health-=15;this.state='stunned';this.timer=0;this.bus.emit('sharkHit');if(this.health<=0){this.pool.release(this.mesh);this.timer=0;this.bus.emit('sharkDefeated');}return true;}
  toJSON(grid) {
    const target=this.target&&grid.at(this.target.x,this.target.y,this.target.z)===this.target?this.target:null;
    const state=!this.mesh.visible?'defeated':(!target&&['targeting','attacking'].includes(this.state)?'circling':this.state);
    return {state,position:this.position.toArray(),health:this.mesh.visible?Math.max(0,this.health):0,timer:this.timer,angle:this.angle,attackCooldown:this.attackCooldown,biteCooldown:this.biteCooldown,targetKey:target?`${target.x},${target.y},${target.z}`:null};
  }
  restore(saved,grid) {
    if(!saved)return;for(const key of ['state','health','timer','angle','attackCooldown','biteCooldown'])this[key]=saved[key];
    this.position.fromArray(saved.position);this.target=saved.targetKey?grid.blocks.get(saved.targetKey):null;
    if(saved.state==='defeated')this.pool.release(this.mesh);
  }

}

export class ParticlePool {
  constructor(scene,count=280){this.count=count;this.limit=count;this.factor=1;this.cursor=0;this.data=Array.from({length:count},()=>({life:0,v:new THREE.Vector3()}));this.positions=new Float32Array(count*3);this.colors=new Float32Array(count*3);this.positions.fill(-1000);const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(this.positions,3));geo.setAttribute('color',new THREE.BufferAttribute(this.colors,3));this.mesh=new THREE.Points(geo,new THREE.PointsMaterial({size:.095,vertexColors:true,transparent:true,opacity:.82,depthWrite:false}));this.mesh.frustumCulled=false;scene.add(this.mesh);}
  setQuality(factor) {this.factor=factor;this.limit=Math.max(1,Math.round(this.count*factor));this.mesh.geometry.setDrawRange(0,this.limit);for(let i=this.limit;i<this.count;i++){this.data[i].life=0;this.positions[i*3+1]=-1000;}this.mesh.geometry.attributes.position.needsUpdate=true;}
  burst(position,color=0xd8e8d5,number=16,speed=1){number=Math.max(1,Math.round(number*this.factor));const c=new THREE.Color(color);for(let i=0;i<number;i++){const k=this.cursor++%this.limit,d=this.data[k];d.life=.45+Math.random()*.5;d.v.set((Math.random()-.5)*speed,Math.random()*speed+.3,(Math.random()-.5)*speed);this.positions[k*3]=position.x;this.positions[k*3+1]=position.y;this.positions[k*3+2]=position.z;this.colors.set([c.r,c.g,c.b],k*3);}this.mesh.geometry.attributes.color.needsUpdate=true;}
  update(dt){for(let i=0;i<this.limit;i++){const d=this.data[i];if(d.life<=0)continue;d.life-=dt;if(d.life<=0){this.positions[i*3+1]=-1000;continue;}d.v.y-=dt*1.5;this.positions[i*3]+=d.v.x*dt;this.positions[i*3+1]+=d.v.y*dt;this.positions[i*3+2]+=d.v.z*dt;}this.mesh.geometry.attributes.position.needsUpdate=true;}
}

export class Atmosphere {
  constructor(scene){
    this.scene=scene;
    const skyMat=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:{top:{value:new THREE.Color(0x8fbdca)},bottom:{value:new THREE.Color(0xc6ded6)},daylight:{value:1}},vertexShader:'varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec3 vP;uniform vec3 top,bottom;uniform float daylight;void main(){float h=normalize(vP).y;vec3 col=mix(bottom,top,smoothstep(0.,.65,h));col=mix(vec3(.035,.075,.12),col,daylight);gl_FragColor=vec4(col,1.);#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}'});
    // Shader include directives must start on a new line.
    skyMat.fragmentShader=skyMat.fragmentShader.replace(';#include',';\n#include');
    this.sky=new THREE.Mesh(new THREE.SphereGeometry(850,24,16),skyMat);scene.add(this.sky);
    this.sun=new THREE.DirectionalLight(0xffedd1,3);this.sun.position.set(-30,60,30);this.sun.castShadow=true;this.sun.shadow.mapSize.set(1024,1024);this.sun.shadow.camera.left=-24;this.sun.shadow.camera.right=24;this.sun.shadow.camera.top=24;this.sun.shadow.camera.bottom=-24;this.sun.shadow.camera.near=.5;this.sun.shadow.camera.far=150;this.sun.shadow.bias=-.0007;this.sun.shadow.normalBias=.02;scene.add(this.sun,this.sun.target);
    this.hemi=new THREE.HemisphereLight(0xc7e0e0,0x4d7770,2.2);scene.add(this.hemi);
    this.clouds=new THREE.Group();scene.add(this.clouds);const random=seededRandom(441);
    const cloudCanvas=document.createElement('canvas');cloudCanvas.width=512;cloudCanvas.height=256;const cloudCtx=cloudCanvas.getContext('2d');for(let i=0;i<24;i++){const x=75+random()*360,y=105+random()*40,r=32+random()*45;const grad=cloudCtx.createRadialGradient(x,y,0,x,y,r);grad.addColorStop(0,'rgba(250,250,235,.72)');grad.addColorStop(.65,'rgba(250,250,235,.55)');grad.addColorStop(1,'rgba(250,250,235,0)');cloudCtx.fillStyle=grad;cloudCtx.beginPath();cloudCtx.arc(x,y,r,0,Math.PI*2);cloudCtx.fill();}const cloudTexture=new THREE.CanvasTexture(cloudCanvas);cloudTexture.colorSpace=THREE.SRGBColorSpace;
    for(let i=0;i<17;i++){const a=i/17*Math.PI*2,r=190+random()*170;const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:cloudTexture,color:0xe9eee0,transparent:true,opacity:.82,depthWrite:false,fog:true}));sprite.position.set(Math.cos(a)*r,14+random()*13,Math.sin(a)*r);sprite.scale.set(45+random()*30,12+random()*8,1);this.clouds.add(sprite);}
    this.birds=[];for(let i=0;i<8;i++){const b=createBird();scene.add(b);this.birds.push(b);}
    const count=950;this.rainCount=count;const positions=new Float32Array(count*3);for(let i=0;i<count;i++){positions[i*3]=(random()-.5)*50;positions[i*3+1]=random()*30;positions[i*3+2]=(random()-.5)*50;}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(positions,3));this.rain=new THREE.Points(geo,new THREE.PointsMaterial({color:0xcce2dc,size:.035,transparent:true,opacity:0,depthWrite:false}));this.rain.frustumCulled=false;scene.add(this.rain);
    scene.fog=new THREE.FogExp2(0xbad8d4,.0018);this.lightningTimer=20;this.flash=0;
  }
  setQuality(quality) {
    this.clouds.children.forEach((m,i)=>m.visible=i<quality.clouds);this.birds.forEach((m,i)=>m.visible=i<quality.birds);
    this.rainCount=quality.rain;this.rain.geometry.setDrawRange(0,this.rainCount);
    const size=quality.shadowSize||256;
    if(this.sun.shadow.mapSize.x!==size) {this.sun.shadow.map?.dispose();this.sun.shadow.map=null;this.sun.shadow.mapSize.set(size,size);this.sun.shadow.needsUpdate=true;}
    this.sun.castShadow=quality.shadows;
  }
  update(dt,t,position,time,weather){
    const sunHeight=Math.sin((time.fraction-.25)*Math.PI*2);const daylight=clamp((sunHeight+.16)*2.3,.08,1);const overcast=weather==='storm'?.55:weather==='rain'?.8:1;
    this.sky.position.copy(position);this.sky.material.uniforms.daylight.value=daylight*overcast;this.sun.intensity=(2.8*daylight+.05)*overcast+this.flash*8;this.hemi.intensity=(1.75*daylight+.25)*overcast;this.sun.color.setHex(sunHeight<.35?0xffd8af:0xfff0d6);this.sun.position.copy(position).add(new THREE.Vector3(-Math.cos((time.fraction-.25)*Math.PI*2)*55,Math.max(7,sunHeight*65),30));this.sun.target.position.copy(position);
    this.clouds.position.x=position.x+Math.sin(t*.002)*8;this.clouds.position.z=position.z;
    const fog=new THREE.Color(0xbad8d4).multiplyScalar(.25+.75*daylight*overcast);this.scene.fog.color.copy(fog);this.scene.fog.density=WEATHER[weather].fog;
    for(let i=0;i<this.birds.length;i++){const b=this.birds[i];if(!b.visible)continue;const a=t*.07+i*.9;b.position.set(position.x+Math.cos(a)*(18+i*2),7+Math.sin(t*.3+i)*1.4,position.z-12+Math.sin(a)*15);b.rotation.y=-a;b.userData.wings[0].rotation.z=Math.sin(t*4+i)*.3;b.userData.wings[1].rotation.z=-Math.sin(t*4+i)*.3;}
    this.rain.position.set(position.x,0,position.z);this.rain.material.opacity=THREE.MathUtils.lerp(this.rain.material.opacity,WEATHER[weather].rain*.5,.03);
    if(this.rain.material.opacity>.01){const pos=this.rain.geometry.attributes.position.array;for(let i=0;i<this.rainCount*3;i+=3){pos[i]+=.8*dt;pos[i+1]-=15*dt;if(pos[i+1]<0)pos[i+1]=30;if(pos[i]>25)pos[i]=-25;}this.rain.geometry.attributes.position.needsUpdate=true;}
    this.flash=Math.max(0,this.flash-dt*4);this.lightningTimer-=dt;if(weather==='storm'&&this.lightningTimer<0){this.lightningTimer=12+Math.random()*18;this.flash=1;return {daylight,fog,lightning:true};}return {daylight,fog,lightning:false};
  }
}
