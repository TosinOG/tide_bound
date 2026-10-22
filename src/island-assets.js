// Original modular tropical assets. Shared templates + per-island instance buffers;
// no image downloads, alpha-card forests, per-tree lights or per-tree update loops.
import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {box,cylinder,sphere,beam,material,createPalmLeaf,bakeStatic} from './assets.js';
import {seededRandom} from './systems.js';

export const islandWind={time:{value:0},strength:{value:1}};
const templates=new Map(),windMaterials=new Map();
function windMaterial(base,ground=false){
  const key=base.uuid+':'+ground;if(!windMaterials.has(key)){
    const m=base.clone();m.userData={shared:true};
    m.onBeforeCompile=shader=>{
      shader.uniforms.islandTime=islandWind.time;shader.uniforms.islandWindStrength=islandWind.strength;shader.uniforms.islandWindHeight={value:ground?.90:7.};
      shader.vertexShader='uniform float islandTime, islandWindStrength, islandWindHeight; varying float vIslandFoliageMask;\n'+shader.vertexShader;
      shader.fragmentShader='varying float vIslandFoliageMask;\n'+shader.fragmentShader;
      // Opaque screen-door fade only next to the lens: no alpha-blended forest
      // or extra draw pass, and trunk bases retain their visible collision cue.
      shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>',`#include <clipping_planes_fragment>
        float nearVisibility=mix(1.,smoothstep(.35,1.75,length(vViewPosition)),vIslandFoliageMask);
        if(nearVisibility<fract(dot(floor(gl_FragCoord.xy),vec2(.754877666,.569840296))))discard;`);
      shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
        vIslandFoliageMask=${ground?'1.':'step(3.2,position.y)'};
        float phase=0.;
        #ifdef USE_INSTANCING
          phase=instanceMatrix[3].x*.17+instanceMatrix[3].z*.13;
        #endif
        float weight=pow(clamp(position.y/islandWindHeight,0.,1.),1.7);
        transformed.x+=(sin(islandTime*1.15+phase)*.16+sin(islandTime*1.9+position.z*1.6+phase)*.035)*weight*islandWindStrength;
        transformed.z+=cos(islandTime*.85+phase)*.105*weight*islandWindStrength;`);
    };
    m.customProgramCacheKey=()=> 'island-foliage-wind-2:'+ground;windMaterials.set(key,m);
  }
  return windMaterials.get(key);
}
function leaf(length,width,color,x,y,z,angle,pitch=-.17){const m=createPalmLeaf(length,width,color);m.position.set(x,y,z);m.rotation.set(pitch,angle,0);return m;}
function canopyTree(kind,variant,low=false){
  const g=new THREE.Group(),rnd=seededRandom(8619+variant*173+(kind==='broad'?900:0)),h=kind==='broad'?4.8+variant*.6:5.3+variant*1.0,lean=kind==='broad'?.25:.65+variant*.22;
  const segments=low?3:5;for(let i=0;i<segments;i++){const a=i/segments,b=(i+1)/segments;g.add(beam([lean*a*a,h*a,Math.sin(a)*.08],[lean*b*b,h*b,Math.sin(b)*.08],.135-a*.035,i%2?0x9b8057:0xb39a68,7));if(i>0)g.add(cylinder(.148-a*.035,.148-a*.035,.045,0x837451,lean*a*a,h*a,Math.sin(a)*.08,7));}
  const greens=kind==='broad'?[0x377e4c,0x4e9655,0x6ea75b]:[0x45874e,0x69a356,0x8cba63];
  if(kind==='broad'){
    for(let k=0;k<(low?3:5);k++){const a=k*Math.PI*2/(low?3:5)+.2,y=h-.55+(k%2)*.25,dx=Math.sin(a)*1.0,dz=Math.cos(a)*1.0;g.add(beam([lean,h-1,0],[lean+dx,y,dz],.055,0x927851));for(let j=0;j<3;j++)g.add(leaf(1.65+rnd()*.55,.72,greens[(k+j)%3],lean+dx,y,dz,a+j*.8-.6,-.26));}
  } else {
    for(let i=0;i<(low?6:9);i++)g.add(leaf(2.4+rnd()*.8,.36+rnd()*.12,greens[i%3],lean,h,0,i*Math.PI*2/(low?6:9)+(rnd()-.5)*.16,-.12+rnd()*.15));
    for(let i=0;i<(low?1:3);i++)g.add(sphere(.13,0x8b6b43,lean+Math.cos(i*2)*.19,h-.17,Math.sin(i*2)*.19,6));
  }
  return g;
}
function groundPlant(kind,variant){
  const g=new THREE.Group(),greens=[0x3f8150,0x58965a,0x7caa62],t=variant%3;
  if(kind==='fern'){
    for(let i=0;i<7;i++){const a=i*Math.PI*2/7;g.add(leaf(.65+(i%3)*.13,.15,greens[(i+t)%3],0,.08,0,a,-.45));for(let j=1;j<4;j++){const f=j/4,x=Math.sin(a)*f*.55,z=Math.cos(a)*f*.55;g.add(leaf(.25,.12,greens[t],x,.12+f*.06,z,a+.9,-.4),leaf(.25,.12,greens[(t+1)%3],x,.12+f*.06,z,a-.9,-.4));}}
  }else if(kind==='broadleaf'){
    for(let i=0;i<6;i++){const a=i*Math.PI/3;g.add(beam([0,0,0],[Math.sin(a)*.13,.35+(i%2)*.18,Math.cos(a)*.13],.015,0x6e9560,5));g.add(leaf(.85,.38,greens[(i+t)%3],Math.sin(a)*.13,.35+(i%2)*.18,Math.cos(a)*.13,a,-.35));}
  }else if(kind==='bush'){
    for(let i=0;i<9;i++){const a=i*2.39996,r=.10+Math.sqrt(i/9)*.42;g.add(leaf(.72,.31,greens[(i+t)%3],Math.sin(a)*r,.22+(i%3)*.13,Math.cos(a)*r,a,-.45));}
  }else if(kind==='flower'){
    const colors=[0xf0b16a,0xdba5c3,0xf3d584];for(let k=0;k<3;k++){const x=(k-1)*.16,z=(k%2)*.1,y=.34+(k%2)*.16;g.add(beam([x,0,z],[x,y,z],.012,0x6d945a,4));for(let i=0;i<5;i++){const a=i*Math.PI*2/5;const petal=sphere(.065,colors[t],x+Math.sin(a)*.07,y, z+Math.cos(a)*.07,5);petal.scale.y=.35;g.add(petal);}g.add(sphere(.035,0xe9c46b,x,y+.025,z,5));}
  }else if(kind==='grass'){
    for(let i=0;i<7;i++){const a=i*2.4;g.add(leaf(.35+(i%3)*.12,.035,greens[(i+t)%3],Math.cos(a)*.12,0,Math.sin(a)*.12,a,-1.05));}
  }else if(kind==='rock'){
    const geo=new THREE.DodecahedronGeometry(1,0);geo.userData.shared=true;const m=new THREE.Mesh(geo,material([0x829386,0x71888b,0x5e6968][t],{flatShading:true}));m.position.y=.32;m.scale.set(.58,.5,.48);g.add(m);
  }else if(kind==='log'){
    const trunk=cylinder(.17,.19,1.8,0x8c7651,0,.18,0,8);trunk.rotation.z=Math.PI/2;g.add(trunk);for(const x of [-.91,.91]){const end=cylinder(.14,.14,.015,0xc4a477,x,.18,0,8);end.rotation.z=Math.PI/2;g.add(end);}
  }else if(kind==='coral'){
    const colors=[0xc88799,0xe8b889,0x80b6ad];for(let i=0;i<5;i++){const a=i*2.4,x=Math.cos(a)*.20,z=Math.sin(a)*.20,y=.27+(i%3)*.12;g.add(beam([0,0,0],[x,y,z],.06,colors[t],5),beam([x,y*.7,z],[x+.12,y+.12,z+.09],.035,colors[t],5));}g.add(sphere(.18,0xa1b8a2,0,.07,0,6));
  }
  return g;
}
export function islandTemplate(kind,variant=0,low=false){
  const key=kind+':'+variant+(low?':low':'');
  if(!templates.has(key)){
    const g=['palm','broad'].includes(kind)?canopyTree(kind,variant,low):groundPlant(kind,variant);bakeStatic(g,true);
    if(['palm','broad','fern','broadleaf','bush','grass','flower'].includes(kind))g.traverse(m=>{if(m.isMesh)m.material=windMaterial(m.material,!['palm','broad'].includes(kind));});
    templates.set(key,g);
  }
  return templates.get(key);
}
export function warmIslandAssets(){for(const kind of ['palm','broad','fern','broadleaf','bush','flower','grass','rock','log','coral'])for(let i=0;i<(kind==='palm'||kind==='rock'||kind==='flower'||kind==='coral'?3:kind==='broad'?2:1);i++)islandTemplate(kind,i);}

export function instanceIslandAssets(parent,kind,variant,placements){
  if(!placements.length)return [];
  const model=islandTemplate(kind,variant),result=[],matrix=new THREE.Matrix4(),q=new THREE.Quaternion(),scale=new THREE.Vector3(),axis=new THREE.Vector3(0,1,0);
  for(const child of model.children){
    const mesh=new THREE.InstancedMesh(child.geometry,child.material,placements.length);mesh.name=`island-${kind}-${variant}`;mesh.castShadow=false;mesh.receiveShadow=false;if(kind==='palm'||kind==='broad'){mesh.userData.nearGeometry=child.geometry;mesh.userData.farGeometry=islandTemplate(kind,variant,true).children[result.length].geometry;}
    placements.forEach((p,i)=>{q.setFromAxisAngle(axis,p.yaw||0);scale.setScalar(p.scale||1);matrix.compose(new THREE.Vector3(p.x,p.y,p.z),q,scale);mesh.setMatrixAt(i,matrix);mesh.setColorAt(i,new THREE.Color().setRGB(p.shade||1,p.shade||1,p.shade||1));});
    mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingBox();mesh.computeBoundingSphere();mesh.boundingSphere.radius+=.5;parent.add(mesh);result.push(mesh);
  }
  return result;
}

export function treasureChest(scale=1,iron=false){
  const key='chest:'+iron;if(templates.has(key)){const copy=templates.get(key).clone(true);copy.scale.setScalar(scale);return copy;}
  const g=new THREE.Group(),wood=iron?0x84673d:0xb08a54;
  g.add(box(.82,.49,.55,wood,0,.245,0),box(.86,.12,.59,0xc59a63,0,.525,0));for(const x of [-.28,.28])g.add(box(.07,.58,.59,0x657d70,x,.295,0));g.add(box(.13,.16,.035,0xe2c36c,0,.43,.31));bakeStatic(g,true);templates.set(key,g);const copy=g.clone(true);copy.scale.setScalar(scale);return copy;
}
function roof(g,w,d,y,color){
  for(const side of [-1,1]){const r=box(w*.56,.10,d,color,side*w*.245,y,0);r.rotation.z=side*-.30;g.add(r);for(let i=0;i<5;i++)g.add(beam([side*.04,y+.08,-d*.5+i*d*.25],[side*w*.50,y-.24,-d*.5+i*d*.25],.025,0xb49b6d));}
}
export function landmarkModel(kind,rockColor=0x899486){
  const g=new THREE.Group(),colliders=[];
  const solid=(x,y,z,w,h,d,walkable=false)=>colliders.push({x,y,z,w,h,d,walkable});
  if(kind==='spring'){
    g.add(cylinder(1.15,1.3,.22,rockColor,0,.08,0,14),cylinder(.96,.96,.045,0x66bda8,0,.22,0,20));
    for(let i=0;i<12;i++){const a=i*Math.PI/6;const r=sphere(.22,rockColor,Math.cos(a)*1.14,.22,Math.sin(a)*1.14,6);r.scale.y=.7;g.add(r);}
    for(const x of [-1.5,1.5]){g.add(beam([x,0,-.65],[x,2.1,-.65],.06,0x927b51));}g.add(beam([-1.5,2.1,-.65],[1.5,2.1,-.65],.065,0x927b51));const shade=box(3.15,.045,1.3,0x85a56c,0,2.12,-.65);shade.rotation.x=.08;g.add(shade);solid(0,.12,0,2.5,.24,2.5,true);
  }else if(kind==='wreck'){
    g.add(box(2.1,.30,4.4,0x85653f,0,.15,0));for(const x of [-1.02,1.02])for(let i=0;i<7;i++){
      // A genuinely broken starboard side, not a sealed decorative wreck.
      if(x>0&&i>0&&i<6)continue;const z=-1.95+i*.63,w=1-Math.abs(z)/3.3,h=1.05-(i%3)*.13;g.add(beam([x*w,.30,z],[x*w*1.12,.30+h,z],.075,0x9e7b4e),box(.11,.25,.65,0xb38f5e,x*w,.78,z));solid(x*w*1.06,.30+h*.5,z,Math.abs(x*w)*.12+.15,h,.65);
    }
    for(let i=0;i<9;i++)g.add(box(1.9,.06,.29,0xbc9b68,0,.33,-1.8+i*.45));g.add(beam([.15,.2,-.9],[.65,3.1,-.65],.085,0x8c724b),beam([.65,2.8,-.65],[-.85,2.0,-.5],.045,0x8c724b));const sail=box(.73,1.1,.025,0xd8c79e,-.15,2.12,-.58);sail.rotation.z=.35;g.add(sail);g.add(box(1.65,.4,.35,0x9b7951,0,.8,1.94));// Grounded keel/deck: a real 36 cm step through the broken hull.
    solid(0,.18,0,2.1,.36,4.4,true);solid(.40,1.65,-.775,.70,3.1,.42);solid(0,.8,1.94,1.65,.4,.35);
  }else if(kind==='temple'){
    g.add(box(5.4,.28,4.2,rockColor,0,.06,0));for(const x of [-2.12,2.12])for(const z of [-1.45,1.45]){g.add(box(.65,2.8,.66,rockColor,x,1.5,z),box(.84,.20,.83,0xa3aa88,x,2.95,z),box(.81,.18,.8,0x7a8d74,x,.28,z));solid(x,1.55,z,.70,2.9,.72);}
    g.add(box(5.35,.43,4.15,rockColor,0,3.24,0),box(4.75,.30,3.6,0x7f9276,0,3.58,0),box(3.9,.28,2.9,rockColor,0,3.85,0));solid(0,3.55,0,5.4,1.0,4.25,true);solid(0,.08,0,5.4,.28,4.2,true);
    for(const x of [-1.5,-.75,0,.75,1.5]){g.add(box(.28,.23,.06,0xc2b27c,x,3.24,2.10));}solid(0,.93,-1.65,1.1,1.45,.4);solid(0,.34,-.65,.78,.35,.78,true);g.add(box(1.1,1.45,.4,0x637c66,0,.93,-1.65),cylinder(.30,.39,.35,0xa3a484,0,.34,-.65,8));
    for(let i=0;i<6;i++)g.add(leaf(1.1,.24,0x4e8455,[-2.1,2.1][i%2],3.8,-1.4+(i%3)*1.4,i*.9,.1));
  }else if(kind==='camp'){
    for(const x of [-1.65,1.65])for(const z of [-1.25,1.25]){g.add(beam([x,0,z],[x,2.5,z],.075,0x8d7149));solid(x,1.25,z,.17,2.5,.17);}roof(g,3.9,3.2,2.65,0xbf9c66);solid(0,2.65,0,3.9,.25,3.2,true);
    solid(-.65,.43,-.4,1.3,.86,.75,true);g.add(box(1.3,.12,.75,0x997d4e,-.65,.8,-.4));for(const x of [-1.16,-.14])g.add(beam([x,0,-.4],[x,.8,-.4],.04,0x806b45));g.add(box(.5,.02,.36,0xe0cba0,-.55,.88,-.3),cylinder(.18,.15,.25,0x897353,.85,.15,-.8,8));
    for(let i=0;i<6;i++){const a=i*Math.PI/3;g.add(sphere(.13,0x7b8880,.8+Math.cos(a)*.38,.09,.6+Math.sin(a)*.38,6));}g.add(beam([.5,.12,.5],[1.1,.12,.7],.055,0x69583d));
  }else { // A complete roofed field observatory, not a solid placeholder box.
    for(const x of [-1.65,1.65])for(const z of [-1.3,1.3]){g.add(beam([x,0,z],[x,2.6,z],.07,0x91a092));solid(x,1.3,z,.17,2.6,.17);}roof(g,4.0,3.2,2.7,0x7f9a90);solid(0,2.7,0,4.0,.25,3.2,true);
    for(const x of [-1.65,1.65])g.add(box(.12,1.0,2.6,0x9ba888,x,.65,0));g.add(box(3.3,1.0,.12,0x9ba888,0,.65,-1.3));solid(-1.65,.65,0,.12,1,2.6);solid(1.65,.65,0,.12,1,2.6);solid(0,.65,-1.3,3.3,1,.12);
    solid(0,.46,-.65,1.65,.92,.6,true);solid(0,.8,0,.55,1.6,.55);for(const tx of [-.66,.66])for(const tz of [-.86,-.44])g.add(beam([tx,0,tz],[tx,.84,tz],.035,0x9c8b63));g.add(box(1.65,.1,.6,0xb9a578,0,.88,-.65),cylinder(.10,.14,1.0,0xc0ad78,0,.55,0),sphere(.27,0x8fc1b8,0,1.3,0,10),beam([1.05,.3,-.8],[1.05,4.6,-.8],.035,0xa1b3a2),beam([.4,3.7,-.8],[1.7,3.7,-.8],.025,0xa1b3a2));g.add(box(.65,.025,.4,0xdfd0a6,0,.95,-.6));
  }
  if(kind==='observatory'){for(let i=0;i<9;i++)g.add(leaf(1.0,.24,0x5b895c,-1.5+(i%3)*1.3,2.7+(i%2)*.15,-1.2+Math.floor(i/3)*.9,i*.8,.4));}
  if(kind==='camp'){g.add(beam([1.65,2.5,1.25],[1.65,3.8,1.25],.028,0x8a7550),box(.8,.43,.025,0xbc7960,1.98,3.47,1.25));}
  bakeStatic(g);return {group:g,colliders};
}

const stoneGeometry=new RoundedBoxGeometry(1,1,1,1,.14);stoneGeometry.userData.shared=true;
function stoneBox(w,h,d,color,x=0,y=0,z=0){const m=new THREE.Mesh(stoneGeometry,material(color));m.scale.set(w,h,d);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;return m;}

// Original, bounded faceted volumes. Every point remains INSIDE its matching
// collider; vertex color variation breaks up the slab silhouette without textures.
function crag(w,h,d,color,x=0,y=0,z=0,seed=0){
  const geo=new THREE.BoxGeometry(1,1,1,2,2,2),a=geo.attributes.position,colors=new Float32Array(a.count*3);
  for(let i=0;i<a.count;i++){const px=a.getX(i),py=a.getY(i),pz=a.getZ(i),edges=(Math.abs(px)>.4)+(Math.abs(py)>.4)+(Math.abs(pz)>.4),noise=Math.sin(px*23+py*31+pz*17+seed*1.7),f=edges===3?.81:edges===2?.91:1;
    a.setXYZ(i,px*f,py*f,pz*f);const shade=.88+noise*.055+py*.07;colors.set([shade,shade,shade],i*3);
  }
  geo.setAttribute('color',new THREE.BufferAttribute(colors,3));geo.computeVertexNormals();
  const mesh=new THREE.Mesh(geo,material(color,{flatShading:true,vertexColors:true}));mesh.scale.set(w,h,d);mesh.position.set(x,y,z);return mesh;
}
export function caveModel(rockColor=0x819083,style='palm'){
  const g=new THREE.Group();
  for(const side of [-1,1]){
    g.add(crag(1.4,2.8,3.5,rockColor,side*1.82,1.3,0,side+4));
    for(let j=0;j<3;j++)g.add(crag(.68,.75,1.15,rockColor,side*(1.83+(j%2)*.07),.55+j*.69,.7-(j%2)*1.6,j+5));
  }
  g.add(crag(4.5,1.25,3.7,rockColor,0,3.12,0,9),crag(4.5,3,.6,rockColor,0,1.2,-1.7,11));
  for(let i=0;i<5;i++){const x=-1+i*.45;g.add(cylinder(.01,.15,.38,rockColor,x,2.37,-.8+(i%2)*.4,5));}
  for(const side of [-1,1]){g.add(beam([side*.92,0,.4],[side*.92,.25,.4],.025,0x78a88d));const cap=sphere(.10,0x82c9b9,side*.92,.28,.4,6);cap.scale.y=.45;cap.material=material(0x82c9b9,{emissive:0x2d5f50,emissiveIntensity:.35});g.add(cap);}
  if(style==='pirate')g.add(cylinder(.25,.28,.48,0x9c7b4f,-.84,.25,-.6,8),cylinder(.26,.26,.035,0x73887d,-.84,.27,-.6,8));
  if(style==='ruins')for(const x of [-.85,.85])for(let i=0;i<3;i++)g.add(stoneBox(.16,.15,.05,0xc1b37b,x,.48+i*.32,-1.375));
  if(style==='volcano')for(let i=0;i<4;i++){const crystal=cylinder(.005,.10,.42,0xd2a473,-1.12+i*.74,2.35,.85,5);crystal.rotation.x=Math.PI;g.add(crystal);}
  for(let i=0;i<9;i++)g.add(leaf(.55+(i%3)*.25,.16,0x648e61,-1.8+i*.45,3.50,1.3+(i%2)*.1,i*.8,1.0));
  bakeStatic(g);const colliders=[{x:-1.82,y:1.3,z:0,w:1.4,h:2.8,d:3.5},{x:1.82,y:1.3,z:0,w:1.4,h:2.8,d:3.5},{x:0,y:3.12,z:0,w:4.5,h:1.25,d:3.7,walkable:true},{x:0,y:1.2,z:-1.7,w:4.5,h:3,d:.6}];if(style==='pirate')colliders.push({x:-.84,y:.25,z:-.6,w:.56,h:.5,d:.56,walkable:true,scenery:true});return {group:g,colliders};
}
export function archModel(color=0x8b9889){
  const g=new THREE.Group();for(const side of [-1,1])for(let i=0;i<3;i++){const block=stoneBox(1.48,1.70,2.12,color,side*(2.25-i*.06),.72+i*1.55,0);block.rotation.z=side*(i-1)*.025;g.add(block);}for(let i=0;i<5;i++){const x=(i-2)*1.02;g.add(stoneBox(1.2,1.1+(i%2)*.16,2.15,color,x,4.93+Math.cos(i-2)*.16,0));}for(let i=0;i<7;i++)g.add(leaf(.72,.22,0x648e61,-2+i*.66,5.5,0,i*.85,.2));bakeStatic(g);return {group:g,colliders:[{x:-2.2,y:2.35,z:0,w:1.55,h:4.9,d:2.2},{x:2.2,y:2.35,z:0,w:1.55,h:4.9,d:2.2},{x:0,y:5,z:0,w:5.5,h:1.3,d:2.2,walkable:true}]};
}
export function watchtowerModel(){
  const g=new THREE.Group();for(const x of [-1,1])for(const z of [-1,1])g.add(beam([x*1.25,0,z*1.25],[x,4.7,z],.09,0x8e7650));for(const z of [-1.1,1.1]){g.add(beam([-1.2,0,z],[1,4.3,z],.035,0x88764f),beam([1.2,0,z],[-1,4.3,z],.035,0x88764f));}
  g.add(box(2.8,.15,2.8,0xaf9363,0,4.5,0));for(const x of [-1.3,1.3])g.add(box(.08,.75,2.7,0x8e7c55,x,4.95,0));roof(g,3.4,3.4,6.1,0xb5a271);for(const x of [-1.15,1.15])g.add(beam([x,4.5,-1.15],[x,6.0,-1.15],.05,0x8c7951));
  // The viewpoint is the trail-side bluff; the ruin's broken ladder is scenery.
  for(const x of [-.28,.28])g.add(beam([x,0,1.3],[x,3.2,1.3],.025,0x8a7450));for(let i=0;i<7;i++)g.add(beam([-.28,i*.4,1.3],[.28,i*.4,1.3],.02,0x9b8557));bakeStatic(g);return {group:g,colliders:[...[-1,1].flatMap(x=>[-1,1].map(z=>({x:x*1.15,y:2.3,z:z*1.15,w:.25,h:4.6,d:.25}))),{x:0,y:4.5,z:0,w:2.8,h:.15,d:2.8,walkable:true}]};
}
export function journalModel(){if(templates.has('journal'))return templates.get('journal').clone(true);const g=new THREE.Group();g.add(box(.6,.15,.48,0x8c957e,0,.075,0),box(.35,.035,.29,0xded0a1,0,.1675,.04));for(let i=0;i<4;i++)g.add(box(.21,.004,.012,0x9d936d,0,.187,-.04+i*.045));bakeStatic(g,true);templates.set('journal',g);return g.clone(true);}
export function runeModel(symbol){
  const key='rune:'+symbol;if(templates.has(key)){const copy=templates.get(key).clone(true);return {group:copy,glyph:copy.children.at(-1)};}
  const g=new THREE.Group();g.add(box(.48,.80,.32,0x839786,0,.4,0),box(.55,.13,.4,0xa5ad8a,0,.86,0));const glyph=new THREE.Group();
  const color=symbol===0?0xe6c16c:symbol===1?0x79c6c0:0xd6bf8d;
  if(symbol===0){glyph.add(sphere(.12,color,0,.48,.19,8));for(let i=0;i<8;i++){const a=i*Math.PI/4;glyph.add(beam([Math.sin(a)*.16,.48+Math.cos(a)*.16,.19],[Math.sin(a)*.21,.48+Math.cos(a)*.21,.19],.014,color,4));}}
  else if(symbol===1){for(let i=0;i<3;i++){const w=beam([-.17,.37+i*.1,.19],[.17,.40+i*.1,.19],.018,color,5);glyph.add(w);}}
  else {for(let i=0;i<5;i++){const a=i*Math.PI*2/5;glyph.add(beam([0,.48,.19],[Math.sin(a)*.19,.48+Math.cos(a)*.19,.19],.025,color,4));}}
  bakeStatic(g,true);bakeStatic(glyph,true);g.add(glyph);templates.set(key,g);const copy=g.clone(true);return {group:copy,glyph:copy.children.at(-1)};
}
export function islandAssetStats(){return {templates:templates.size,windMaterials:windMaterials.size};}
