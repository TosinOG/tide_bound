import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { seededRandom } from './systems.js';

// Shared GPU assets have explicit lifetime ownership. Never dispose these on chunk unload.
const matCache=new Map(),geoCache=new Map(),modelTemplates=new Map();
function geometry(key,create) {if(!geoCache.has(key)){const g=create();g.userData.shared=true;geoCache.set(key,g);}return geoCache.get(key);}
export function material(color,opts={}) {
  const key=String(color)+':'+Object.keys(opts).sort().map(k=>`${k}=${opts[k]?.isTexture?opts[k].uuid:opts[k]}`).join(';');
  if(!matCache.has(key)){const m=new THREE.MeshStandardMaterial({color,roughness:.84,...opts});m.userData.shared=true;matCache.set(key,m);}return matCache.get(key);
}
export function box(w,h,d,color,x=0,y=0,z=0,opts={}) {
  const m=new THREE.Mesh(geometry('box',()=>new THREE.BoxGeometry(1,1,1)),material(color,opts));m.scale.set(w,h,d);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;return m;
}
export function cylinder(r1,r2,h,color,x=0,y=0,z=0,sides=8) {
  const ratio=r1/r2;const m=new THREE.Mesh(geometry(`cylinder:${ratio}:${sides}`,()=>new THREE.CylinderGeometry(ratio,1,1,sides)),material(color));m.scale.set(r2,h,r2);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;return m;
}
export function sphere(r,color,x=0,y=0,z=0,segments=10) {
  const m=new THREE.Mesh(geometry(`sphere:${segments}`,()=>new THREE.SphereGeometry(1,segments,Math.max(5,segments/2))),material(color));m.scale.setScalar(r);m.position.set(x,y,z);m.castShadow=true;return m;
}
export function beam(a,b,r,color,sides=7) {const av=new THREE.Vector3(...a),bv=new THREE.Vector3(...b),d=bv.clone().sub(av);const m=cylinder(r,r,d.length(),color,...av.clone().add(bv).multiplyScalar(.5).toArray(),sides);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return m;}

export function disposeObject(root) {
  const geometries=new Set(),materials=new Set();
  root.traverse(m=>{if(m.isInstancedMesh)m.dispose();if(m.geometry&&!m.geometry.userData.shared)geometries.add(m.geometry);for(const mat of (Array.isArray(m.material)?m.material:[m.material]))if(mat&&!mat.userData.shared)materials.add(mat);});
  for(const g of geometries)g.dispose();for(const m of materials)m.dispose();
}
// Batch by shader properties, baking original colors into vertices instead of issuing
// a draw for every color/plank/nail. Templates share these merged buffers thereafter.
export function bakeStatic(group,shared=false) {
  group.updateMatrixWorld(true);const inverse=group.matrixWorld.clone().invert(),batches=new Map(),oldGeometry=new Set();
  group.traverse(child=>{
    if(!child.isMesh||Array.isArray(child.material))return;
    const source=child.material,opts={roughness:source.roughness,metalness:source.metalness,side:source.side,transparent:source.transparent,opacity:source.opacity,vertexColors:true};
    if(source.map)opts.map=source.map;
    if(source.emissive?.getHex()){opts.emissive=source.emissive.getHex();opts.emissiveIntensity=source.emissiveIntensity;}
    const mat=material(0xffffff,opts),key=mat.uuid;
    if(!batches.has(key))batches.set(key,{material:mat,geos:[]});
    const g=child.geometry.clone();g.applyMatrix4(inverse.clone().multiply(child.matrixWorld));
    if(!source.map)g.deleteAttribute('uv');
    const count=g.attributes.position.count,colors=new Float32Array(count*3),existing=g.attributes.color;
    for(let i=0;i<count;i++){colors[i*3]=source.color.r*(existing?existing.getX(i):1);colors[i*3+1]=source.color.g*(existing?existing.getY(i):1);colors[i*3+2]=source.color.b*(existing?existing.getZ(i):1);}
    g.setAttribute('color',new THREE.BufferAttribute(colors,3));
    if(!g.index)g.setIndex(Array.from({length:count},(_,i)=>i));
    batches.get(key).geos.push(g);if(!child.geometry.userData.shared)oldGeometry.add(child.geometry);
  });
  group.clear();
  for(const batch of batches.values()) {
    const merged=mergeGeometries(batch.geos,false);if(!merged)throw new Error('Incompatible static geometry');
    merged.userData.shared=shared;merged.computeBoundingSphere();const mesh=new THREE.Mesh(merged,batch.material);mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);
    for(const g of batch.geos)g.dispose();
  }
  for(const g of oldGeometry)g.dispose();return group;
}
export function assetCounts() {return {geometries:geoCache.size,materials:matCache.size,blockTemplates:modelTemplates.size};}

const WOOD = [0xab7749,0xbc8857,0xc79462,0xb68151,0xca9968];
function plankTexture(){const c=document.createElement('canvas');c.width=256;c.height=64;const ctx=c.getContext('2d');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,256,64);const random=seededRandom(892);for(let i=0;i<85;i++){ctx.strokeStyle=`rgba(65,36,15,${random()*.13+.015})`;ctx.lineWidth=.3+random()*1.2;ctx.beginPath();const y=random()*64;ctx.moveTo(random()*30,y);ctx.bezierCurveTo(80,y+random()*5,180,y-3,256,y+random()*4);ctx.stroke();}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;}
let woodMap;
export function createFoundation(net=false){
  if(!woodMap)woodMap=plankTexture();const g=new THREE.Group();
  if(!net){for(let i=0;i<4;i++){g.add(box(.974,.13,.226,WOOD[i%5],0,.19,(i-1.5)*.243,{map:woodMap}));for(const x of [-.4,.4])g.add(cylinder(.012,.012,.003,0x4b514d,x,.258,(i-1.5)*.243,5));}}
  else{g.add(box(1,.16,.10,WOOD[1],0,.17,-.45),box(1,.16,.10,WOOD[1],0,.17,.45),box(.10,.16,.8,WOOD[2],-.45,.17,0),box(.10,.16,.8,WOOD[2],.45,.17,0));for(let i=-3;i<=3;i++){g.add(beam([i*.12,.11,-.4],[i*.12,.11,.4],.009,0xd4c99f,4),beam([-.4,.11,i*.12],[.4,.11,i*.12],.009,0xd4c99f,4));}}
  for(const z of [-.31,.31]){const log=cylinder(.092,.092,.95,0x705439,0,-.015,z,8);log.rotation.z=Math.PI/2;g.add(log);}
  g.add(box(.14,.12,.99,0x79603f,-.32,.05,0),box(.14,.12,.99,0x79603f,.32,.05,0));return g;
}
function buildBlock(type){
  if(type==='foundation'||type==='net')return createFoundation(type==='net');
  const g=new THREE.Group();
  if(type==='floor'){for(let i=0;i<4;i++)g.add(box(.97,.1,.23,WOOD[i],0,.03,(i-1.5)*.245));g.add(box(.1,.14,.95,0x80613e,-.36,-.04,0),box(.1,.14,.95,0x80613e,.36,-.04,0));}
  if(type==='wall'){for(let i=0;i<5;i++)g.add(box(.18,.94,.07,WOOD[i],(i-2)*.196,.48,-.43));g.add(box(.98,.08,.1,0x70523a,0,.12,-.43),box(.98,.08,.1,0x70523a,0,.83,-.43));}
  if(type==='stairs'){for(let i=0;i<5;i++)g.add(box(.82,.12,.23,WOOD[i%5],0,.1+i*.2,-.4+i*.2));g.add(beam([-.35,0,-.5],[-.35,1,.5],.055,0x795238),beam([.35,0,-.5],[.35,1,.5],.055,0x795238));}
  if(type==='workbench'){
    for(const x of [-.34,.34])for(const z of [-.26,.26])g.add(box(.09,.55,.09,0x8e6542,x,.27,z));
    g.add(box(.93,.1,.69,0xc79b6b,0,.58,0),box(.78,.08,.48,0x8e6d48,0,.17,0));
    const roll=box(.25,.013,.34,0xd8d1ad,-.16,.64,0);roll.rotation.y=.2;g.add(roll);
    g.add(box(.15,.08,.14,0x657775,.26,.67,-.12),beam([.27,.7,-.12],[.27,.83,-.12],.02,0x8f9b91));
    const jar=cylinder(.07,.06,.15,0x769b8d,.25,.69,.16);g.add(jar,beam([.25,.76,.16],[.23,.99,.14],.013,0x8c6140),beam([.25,.76,.16],[.29,.96,.19],.013,0x766a50));
  }
  if(type==='purifier'){
    for(const x of [-.29,.29])for(const z of [-.24,.24])g.add(beam([x,0,z],[x*.8,.7,z*.8],.022,0x896b43));
    g.add(cylinder(.29,.22,.19,0x636b63,0,.14,0,12),cylinder(.24,.24,.018,0x63b4ba,0,.24,0,16));
    const cloth=box(.7,.025,.64,0xe5d8b5,0,.7,0);cloth.rotation.z=.15;g.add(cloth);
    g.add(cylinder(.07,.07,.14,0x86b8b2,.28,.36,.25));
  }
  if(type==='grill'){
    for(const x of [-.22,.22])for(const z of [-.2,.2])g.add(beam([x,0,z],[x*.8,.4,z*.8],.023,0x5c655e));
    g.add(cylinder(.33,.24,.22,0x4d5d59,0,.4,0,12),cylinder(.29,.29,.01,0xd97a39,0,.5,0,12));
    for(let i=-2;i<=2;i++)g.add(beam([-.28,.52,i*.1],[.28,.52,i*.1],.011,0x374941,5));
    const f=createFish(true);f.scale.setScalar(.5);f.position.set(0,.56,0);g.add(f);
  }
  if(type==='sail'){
    g.add(cylinder(.043,.065,2.9,0xa78054,0,1.45,0),beam([-.9,.75,.02],[.9,.75,.02],.035,0x95784e));
    const pos=[],uv=[];for(let j=0;j<=8;j++){const t=j/8;const w=.83*(1-t);for(let i=0;i<=8;i++){const u=i/8;pos.push((u*2-1)*w,.8+t*1.85,.18*Math.sin(u*Math.PI)*Math.sin((t+.2)*Math.PI));uv.push(u,t);}}
    const idx=[];for(let j=0;j<8;j++)for(let i=0;i<8;i++){const a=j*9+i;idx.push(a,a+1,a+9,a+1,a+10,a+9);}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geo.setIndex(idx);geo.computeVertexNormals();
    const sail=new THREE.Mesh(geo,material(0xf0e7ca,{side:THREE.DoubleSide}));sail.castShadow=true;sail.name='sail-cloth';g.add(sail);
    const stripe=box(.43,.11,.012,0xb56b48,0,1.38,.18);g.add(stripe);
    const flagGeo=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,2.85,0),new THREE.Vector3(.47,2.72,0),new THREE.Vector3(0,2.6,0)]);flagGeo.setIndex([0,1,2]);flagGeo.computeVertexNormals();g.add(new THREE.Mesh(flagGeo,material(0xc56b48,{side:THREE.DoubleSide})));
  }
  if(type==='rainCollector') {
    for(const x of [-.3,.3])for(const z of [-.3,.3])g.add(beam([x,0,z],[x,.85,z],.025,0x9c8055));
    g.add(cylinder(.4,.23,.12,0x79988d,0,.87,0,12),cylinder(.22,.22,.5,0x87aca5,0,.3,0,12),cylinder(.19,.19,.02,0x72bfc4,0,.56,0,12));
    g.add(beam([0,.85,0],[0,.6,0],.04,0xc8bd96));
  }
  if(type==='armor') {
    g.add(box(.98,.055,.98,0x79958d,0,.045,0),box(.95,.17,.05,0xaab7a5,0,.08,-.46),box(.95,.17,.05,0xaab7a5,0,.08,.46));
    for(const x of [-.38,.38])for(const z of [-.38,.38])g.add(cylinder(.035,.035,.02,0xc7c5aa,x,.085,z,6));
  }
  if(type==='windcatcher') {
    g.add(box(.6,.12,.6,0x8c7851,0,.08,0),cylinder(.035,.045,1.65,0x9c9571,0,.9,0),beam([-.45,1.55,0],[.45,1.55,0],.018,0xc2b17e));
    const vane=box(.35,.2,.025,0xc78a61,.25,1.55,0);vane.rotation.y=.3;g.add(vane,sphere(.12,0x8aaea2,0,1.85,0,8));
  }
  if(type==='beacon'){
    g.add(box(.6,.25,.5,0x5e7774,0,.14,0),box(.33,.15,.02,0xceb674,0,.17,.26),cylinder(.025,.025,2.3,0x9eafa4,0,1.4,0));
    for(const y of [.8,1.25,1.8])g.add(beam([-.45,y,0],[.45,y,0],.018,0x80968d));
    const glow=sphere(.09,0xe9b557,0,2.6,0);glow.material=material(0xe9b557,{emissive:0xe9b557,emissiveIntensity:2});g.add(glow);
  }
  return g;
}

export function createBlock(type) {
  if(!modelTemplates.has(type)) {
    const template=buildBlock(type);
    if(type!=='sail')bakeStatic(template,true);
    else template.traverse(m=>{if(m.geometry)m.geometry.userData.shared=true;});
    modelTemplates.set(type,template);
  }
  const model=modelTemplates.get(type).clone(true);
  if(type==='sail')model.userData.sail=model.getObjectByName('sail-cloth');
  return model;
}

export function createFish(cooked=false){const g=new THREE.Group();const body=sphere(.23,cooked?0xc58b57:0x7ca1a9);body.scale.multiply(new THREE.Vector3(1.7,.5,.65));g.add(body);const tail=new THREE.Mesh(geometry('fish-tail',()=>new THREE.ConeGeometry(.15,.23,3)),material(cooked?0x99683d:0x6c8d9e));tail.rotation.z=-Math.PI/2;tail.position.x=-.4;g.add(tail);g.add(sphere(.015,0x303d37,.25,.06,.08));return g;}
function buildDebris(type){const g=new THREE.Group();
  if(type==='wood'){g.add(box(.95,.09,.16,0xb88e5f),box(.62,.07,.13,0xc79d6c,.08,-.035,.08));g.rotation.y=.7;}
  if(type==='leaf'){const l=createPalmLeaf(.88,.23,0x7d9d68);l.rotation.x=Math.PI/2;l.position.z=-.4;g.add(l);}
  if(type==='plastic'){const bottle=cylinder(.09,.1,.4,0x99c9c4,0,0,0,8);bottle.rotation.z=1.3;g.add(bottle);const top=cylinder(.045,.045,.12,0xd0dfca,.22,.06,0,7);top.rotation.z=1.3;g.add(top);}
  if(type==='scrap'){const a=box(.45,.07,.36,0x8e9d94);a.rotation.z=.1;g.add(a,box(.13,.1,.14,0xb6ac85,.1,.05,.07));}
  if(type==='barrel'){
    g.add(cylinder(.29,.27,.63,0xab774d,0,0,0,12));for(const y of [-.22,.22])g.add(cylinder(.305,.305,.055,0x576b62,0,y,0,12));
    for(let i=0;i<6;i++){const a=i*Math.PI/3;g.add(beam([Math.cos(a)*.281,-.27,Math.sin(a)*.281],[Math.cos(a)*.281,.27,Math.sin(a)*.281],.006,0x805d3f,4));}
    g.add(cylinder(.07,.07,.01,0x60583e,.1,.32,0,8));g.rotation.z=.34;
  }
  g.userData.type=type;return g;
}
const debrisTemplates=new Map();
export function createDebris(type) {if(!debrisTemplates.has(type))debrisTemplates.set(type,bakeStatic(buildDebris(type),true));return debrisTemplates.get(type).clone(true);}

export function createHook(){const g=new THREE.Group();const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(0,.19,0),new THREE.Vector3(0,0,0),new THREE.Vector3(0,-.12,0),new THREE.Vector3(-.1,-.18,0),new THREE.Vector3(-.2,-.1,0),new THREE.Vector3(-.16,-.02,0)]);g.add(new THREE.Mesh(geometry('hook',()=>new THREE.TubeGeometry(curve,16,.023,6,false)),material(0x87988f,{metalness:.55,roughness:.35})));g.add(cylinder(.036,.036,.17,0xbd9762,0,.17,0));return g;}
export function createPaddle(){const g=new THREE.Group();g.add(cylinder(.025,.025,1.2,0x9a7046,0,.4,0),box(.21,.46,.035,0xbb8a50,0,-.4,0));return g;}
export function createSpear(){const g=new THREE.Group();g.add(cylinder(.018,.027,1.7,0xa68b62,0,.6,0));g.add(new THREE.Mesh(geometry('spear-tip',()=>new THREE.ConeGeometry(.06,.27,4)),material(0xa9bab1)));g.children[1].position.y=1.57;return g;}
export function createAvatar(){
  const g=new THREE.Group(),body=new THREE.Group();g.add(body);g.userData.body=body;
  body.add(box(.36,.43,.23,0x5c8f87,0,.95,0),box(.35,.21,.24,0xc39a61,0,.66,0));
  const head=sphere(.18,0xd5ad83,0,1.37,0,12);head.scale.y*=1.12;body.add(head);
  body.add(sphere(.18,0x5b4635,0,1.45,-.035));
  const hat=cylinder(.31,.32,.035,0xe0c799,0,1.56,0,14),hatTop=cylinder(.185,.2,.14,0xd9bc86,0,1.64,0,12);body.add(hat,hatTop,cylinder(.202,.203,.04,0xa56a47,0,1.6,0,12));
  for(const x of [-.064,.064])body.add(sphere(.016,0x38453f,x,1.39,.153));
  body.add(box(.28,.3,.12,0xb8754c,0,1.02,-.17),box(.32,.04,.14,0xd1a36c,0,1.17,-.17));
  const arms=[],legs=[];
  for(const x of [-.24,.24]){const arm=new THREE.Group();arm.position.set(x,1.11,0);arm.add(cylinder(.063,.052,.33,0x65978b,0,-.12,0),cylinder(.05,.044,.23,0xd3aa80,0,-.36,0),sphere(.052,0xd3aa80,0,-.49,0));body.add(arm);arms.push(arm);}
  for(const x of [-.105,.105]){const leg=new THREE.Group();leg.position.set(x,.61,0);leg.add(cylinder(.078,.055,.53,0xd0a37c,0,-.27,0),box(.12,.09,.22,0x665a43,0,-.56,.035));body.add(leg);legs.push(leg);}
  g.userData.arms=arms;g.userData.legs=legs;g.userData.tool=new THREE.Group();g.userData.tool.position.set(0,-.45,.06);arms[1].add(g.userData.tool);return g;
}
export function createPalmLeaf(length=2.6,width=.44,color=0x6d945c) {
  const geo=geometry('palm-leaf',()=>{
    const v=[],idx=[],N=8;for(let i=0;i<=N;i++){const t=i/N,w=Math.sin(Math.pow(t,.7)*Math.PI),y=-t*t*.33+.045*Math.sin(t*Math.PI);v.push(-w,y,t,0,y+.017,t,w,y,t);}
    for(let i=0;i<N;i++){const a=i*3;idx.push(a,a+3,a+1,a+1,a+3,a+4,a+1,a+4,a+2,a+2,a+4,a+5);}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));g.setIndex(idx);g.computeVertexNormals();return g;
  });
  const m=new THREE.Mesh(geo,material(color,{side:THREE.DoubleSide,roughness:.9}));m.scale.set(width,length,length);m.castShadow=true;return m;
}

export function createPalm(random=Math.random,scale=1){
  const g=new THREE.Group(),h=(3.8+random()*1.7)*scale,lean=(random()-.5)*1.4*scale;
  for(let i=0;i<7;i++){const t=i/7,nt=(i+1)/7;g.add(beam([lean*t*t,h*t,0],[lean*nt*nt,h*nt,0],(.105-t*.04)*scale,i%2?0xa4956b:0xb3a174,8));}
  const crown=new THREE.Group();crown.position.set(lean,h,0);g.add(crown);
  for(let i=0;i<8;i++){const leaf=createPalmLeaf((2.1+random()*.8)*scale,.35*scale,[0x638450,0x73955e,0x83a367][i%3]);leaf.rotation.y=i*Math.PI/4;leaf.rotation.x=-.15+random()*.2;crown.add(leaf);}
  for(let i=0;i<3;i++)crown.add(sphere(.12*scale,0x89784d,Math.cos(i*2)*.15*scale,-.13*scale,Math.sin(i*2)*.15*scale,6));g.userData.crown=crown;return g;
}
export function createRock(random=Math.random,scale=1,color=0x98a394){const m=new THREE.Mesh(geometry('rock',()=>new THREE.DodecahedronGeometry(1,0)),material(color,{flatShading:true}));m.scale.set((1+random()*.5)*scale,(.6+random()*.8)*scale,(.7+random()*.6)*scale);m.rotation.set(random(),random()*6,random()*.2);m.castShadow=true;m.receiveShadow=true;return m;}
export function createShark(){const g=new THREE.Group();
  const body=sphere(.45,0x698c8e,0,-.35,0,14);body.scale.multiply(new THREE.Vector3(.77,.7,2.6));g.add(body);
  const snout=sphere(.33,0x789c9b,0,-.34,.9,10);snout.scale.multiply(new THREE.Vector3(.8,.6,1.6));g.add(snout);
  const belly=sphere(.35,0xc5cfbb,0,-.53,.1,12);belly.scale.multiply(new THREE.Vector3(.8,.35,2.7));g.add(belly);
  function fin(points,color){const geo=new THREE.BufferGeometry().setFromPoints(points.map(p=>new THREE.Vector3(...p)));geo.setIndex([0,1,2]);geo.computeVertexNormals();return new THREE.Mesh(geo,material(color,{side:THREE.DoubleSide}));}
  g.add(fin([[0,-.15,-.3],[0,.58,-.45],[0,-.08,.3]],0x627f81));
  g.add(fin([[-.2,-.4,.4],[-1,-.45,-.18],[-.2,-.4,-.3]],0x779799),fin([[.2,-.4,.4],[1,-.45,-.18],[.2,-.4,-.3]],0x779799));
  const tail=new THREE.Group();tail.position.z=-1.18;tail.add(fin([[0,-.35,0],[0,.15,-.66],[0,-.4,-.42]],0x6d8c90),fin([[0,-.35,0],[0,-.88,-.56],[0,-.4,-.42]],0x6d8c90));g.add(tail);g.userData.tail=tail;
  for(const x of [-.235,.235]){g.add(sphere(.045,0x263a3c,x,-.27,1.02,6));for(let i=0;i<3;i++){const gil=beam([x*1.3,-.18,.45-i*.11],[x*1.3,-.48,.39-i*.11],.012,0x4c7071,4);g.add(gil);}}return g;
}
let jellyTemplate;
export function createJellyfish() {
  if(!jellyTemplate) {
    const g=new THREE.Group();g.add(new THREE.Mesh(geometry('jelly-dome',()=>new THREE.SphereGeometry(.24,10,6,0,Math.PI*2,0,Math.PI*.55)),material(0xa8d4ce,{transparent:true,opacity:.7,emissive:0x418a91,emissiveIntensity:.35})));
    for(let i=0;i<6;i++){const a=i*Math.PI/3;g.add(beam([Math.cos(a)*.12,0,Math.sin(a)*.12],[Math.cos(a+.3)*.12,-.45,Math.sin(a+.3)*.12],.009,0xb3d6ce));}
    jellyTemplate=bakeStatic(g,true);
  }
  return jellyTemplate.clone(true);
}

export function createBird(){const g=new THREE.Group();const geo=geometry('bird-wing',()=>new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,.12),new THREE.Vector3(-.7,.05,0),new THREE.Vector3(-.25,0,-.15)]));geo.setIndex([0,1,2]);geo.computeVertexNormals();const wing=new THREE.Mesh(geo,material(0xe4e8d8,{side:THREE.DoubleSide}));const other=wing.clone();other.scale.x=-1;g.add(wing,other);g.userData.wings=[wing,other];g.add(sphere(.07,0xe7e8d8,0,0,0,6));return g;}
