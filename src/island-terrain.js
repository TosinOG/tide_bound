// Deterministic coastal heightfields. The visible near mesh, walking, water depth,
// navigation and all placements sample this SAME triangulated surface.
import * as THREE from 'three';
import { seededRandom, clamp, smoothstep } from './systems.js';

export const ISLAND_GENERATION_VERSION=3;
const TAU=Math.PI*2;
export const ISLAND_PROFILES={
  palm:   {shape:'cove',height:6.8,beach:2.6,trees:46,undergrowth:220,water:0x61cfb6,flower:0xf0b16a},
  reef:   {shape:'atoll',height:3.9,beach:2.0,trees:22,undergrowth:105,water:0x58d5d1,flower:0xf3c0ae},
  ruins:  {shape:'ridge',height:7.8,beach:1.8,trees:66,undergrowth:290,water:0x65bba8,flower:0xc99dda},
  pirate: {shape:'hook',height:6.1,beach:2.5,trees:40,undergrowth:185,water:0x4bbfb9,flower:0xe7a363},
  volcano:{shape:'caldera',height:9.2,beach:1.5,trees:20,undergrowth:100,water:0x65b7bf,flower:0xe3a16e},
  outpost:{shape:'headland',height:6.9,beach:2.2,trees:47,undergrowth:230,water:0x69c4b2,flower:0xe4d18a},
};

function segmentPoint(x,z,a,b){const dx=b.x-a.x,dz=b.z-a.z,l=dx*dx+dz*dz,t=l?clamp(((x-a.x)*dx+(z-a.z)*dz)/l,0,1):0;return {distance:Math.hypot(x-a.x-dx*t,z-a.z-dz*t),t};}
export function routeDistance(plan,x,z){let best=Infinity;for(const route of plan.routes)for(let j=1;j<route.length;j++)best=Math.min(best,segmentPoint(x,z,route[j-1],route[j]).distance);return best;}

export function createTerrainPlan(seed,baseRadius,biome,id='') {
  const random=seededRandom(seed^0x51c0a7),profile=ISLAND_PROFILES[biome.id]||ISLAND_PROFILES.palm;
  const radius=Math.min(24,baseRadius*1.46),extent=radius*1.42,angle=id==='0,-1'?-.43:random()*TAU;
  const cs=Math.cos(angle),sn=Math.sin(angle),phase=random()*TAU,height=profile.height*(.88+random()*.18),variation=random();
  const plan={seed,biome,profile,radius,baseRadius,extent,angle,height,phase,variation,routes:[],pads:[],segments:64};
  plan.toLocal=(u,v)=>({x:(u*cs+v*sn)*radius,z:(-u*sn+v*cs)*radius});
  plan.normalized=(x,z)=>({u:(x*cs-z*sn)/radius,v:(x*sn+z*cs)/radius});
  plan.signedDistance=(x,z)=>{
    const {u,v}=plan.normalized(x,z),theta=Math.atan2(v,u),shape=profile.shape;
    let boundary=.97+.074*Math.sin(theta*3+phase)+.052*Math.cos(theta*5-phase*.8)+.035*Math.sin(theta*7+phase*.4);
    if(shape==='ridge'||shape==='headland')boundary+=.065*Math.cos(theta*2+.4);
    if(shape==='hook')boundary+=.10*Math.sin(theta*2-1.1);
    let sd=(boundary-Math.hypot(u,v))*radius;
    if(shape==='cove'||shape==='hook'){
      const cu=shape==='hook'?-.14:0,cv=shape==='hook'?.56:.70,rx=shape==='hook'?.43:.405,rz=shape==='hook'?.61:.65;
      sd=Math.min(sd,(Math.hypot((u-cu)/rx,(v-cv)/rz)-1)*Math.min(rx,rz)*radius);
    } else if(shape==='atoll'){
      sd=Math.min(sd,(Math.hypot(u/.43,(v-.025)/.405)-1)*radius*.405);
      sd=Math.min(sd,Math.max(Math.abs(u)-.145,.23-v)*radius);
    }
    return sd;
  };
  plan.rawHeight=(x,z)=>{
    const {u,v}=plan.normalized(x,z),sd=plan.signedDistance(x,z);
    if(sd<0)return Math.max(-5,sd*.59-.035);
    const gate=smoothstep(profile.beach*.6,profile.beach*1.75,sd),shape=profile.shape;
    let elevation;
    if(shape==='atoll')elevation=height*(.22+.70*Math.exp(-((u+.48)**2/.07+(v+.50)**2/.16))+.38*Math.exp(-((u-.65)**2/.08+(v+.10)**2/.22)));
    else if(shape==='caldera'){
      const d=Math.hypot(u*.98,(v+.23)*1.09);elevation=.6+height*(.87*Math.exp(-(((d-.34)/.18)**2))+.26*Math.exp(-((u+.5)**2/.14+(v-.1)**2/.3)));
    } else if(shape==='ridge')elevation=.5+height*(.88*Math.exp(-((u+.23)**2/.16+(v+.31)**2/.32))+.52*Math.exp(-((u-.47)**2/.09+(v+.18)**2/.22)));
    else if(shape==='headland')elevation=.55+height*(.95*Math.exp(-((u+.38)**2/.13+(v+.34)**2/.31))+.25*Math.exp(-((u-.4)**2/.14+(v+.12)**2/.18)));
    else elevation=.4+height*(.95*Math.exp(-((u+.18)**2/.30+(v+.43)**2/.14))+.28*Math.exp(-((u-.60)**2/.07+(v-.10)**2/.2)));
    // Eroded shelves rather than a smooth cone; trails cut through their faces.
    const shelf=1.7+smoothstep(1.45,2.15,elevation)*1.15+smoothstep(3.25,3.85,elevation)*1.45+Math.max(0,elevation-4.1)*.7;
    elevation=THREE.MathUtils.lerp(elevation,shelf,.38);
    const noise=(Math.sin(u*12+phase)*Math.cos(v*10-phase)*.14+Math.sin(u*21+v*15+phase)*.065)*gate;
    return .065+Math.min(sd,2)*.065+gate*elevation+noise;
  };
  // Every layout has a generous beach, a meandering ascent, a landmark clearing,
  // a viewpoint, and a side path into a sheltered grotto. Atolls follow the ring.
  const atoll=profile.shape==='atoll';
  const normalized=atoll?[[.79,.39],[.78,-.04],[.60,-.55],[.14,-.76],[-.38,-.67],[-.73,-.18],[-.75,.30]]:
    [[.71,.53],[.65,.10],[.34,-.22],[.03,-.39],[-.34,-.57],[-.62,-.28],[-.68,.06]];
  const nodes=normalized.map(([u,v],i)=>{
    if(i>0&&i<normalized.length-1){u+=(random()-.5)*.045;v+=(random()-.5)*.045;}
    const p=plan.toLocal(u,v);return {...p,y:Math.max(.24,plan.rawHeight(p.x,p.z))};
  });
  nodes[0].y=.24;
  for(let i=1;i<nodes.length;i++){const d=Math.hypot(nodes[i].x-nodes[i-1].x,nodes[i].z-nodes[i-1].z);nodes[i].y=Math.min(nodes[i].y,nodes[i-1].y+d*.34);}
  for(let i=nodes.length-2;i>=0;i--){const d=Math.hypot(nodes[i].x-nodes[i+1].x,nodes[i].z-nodes[i+1].z);nodes[i].y=Math.min(nodes[i].y,nodes[i+1].y+d*.34);}
  plan.routes.push(nodes);
  plan.landing={...nodes[0]};plan.landmark={...nodes[2]};plan.viewpoint={...nodes[4]};plan.grotto={...nodes[6]};
  for(const [name,r] of [['landing',1.4],['landmark',4.6],['viewpoint',2.8],['grotto',3.1]])plan.pads.push({...plan[name],radius:r,name});
  plan.waterfall=(['palm','ruins','outpost'].includes(biome.id)&&(id==='0,-1'||seed%4===0))?{...plan.toLocal(.02,-.27),bottom:Math.max(.35,nodes[2].y-1.65)}:null;
  plan.heightAt=(x,z)=>{
    let h=plan.rawHeight(x,z),best=Infinity,target=h;
    if(plan.waterfall){const w=plan.waterfall,dx=x-w.x,dz=z-w.z,du=dx*cs-dz*sn,dv=dx*sn+dz*cs,weight=(1-smoothstep(1.2,2.7,Math.abs(du)))*(1-smoothstep(2.4,4,Math.abs(dv)));h=THREE.MathUtils.lerp(h,w.bottom+3.4*(1-smoothstep(-.55,.45,dv)),weight);const basin=Math.hypot(du/.95,(dv-1.55)/.82);if(basin<1.25)h=THREE.MathUtils.lerp(h,w.bottom-.13,1-smoothstep(.5,1.25,basin));}

    for(const route of plan.routes)for(let j=1;j<route.length;j++){
      const a=route[j-1],b=route[j],q=segmentPoint(x,z,a,b);if(q.distance<best){best=q.distance;target=THREE.MathUtils.lerp(a.y,b.y,q.t);}
    }
    if(best<2.05)h=THREE.MathUtils.lerp(h,target,1-smoothstep(.78,2.05,best));
    for(const pad of plan.pads){const d=Math.hypot(x-pad.x,z-pad.z);if(d<pad.radius+.85)h=THREE.MathUtils.lerp(h,pad.y,1-smoothstep(pad.radius*(pad.name==='grotto'?.60:.76),pad.radius+.85,d));}
    return h;
  };
  const n=plan.segments,heights=new Float32Array((n+1)*(n+1));
  for(let j=0;j<=n;j++)for(let i=0;i<=n;i++)heights[j*(n+1)+i]=plan.heightAt((i/n*2-1)*extent,(j/n*2-1)*extent);
  plan.heights=heights;
  plan.sample=(x,z)=>{
    if(Math.abs(x)>extent||Math.abs(z)>extent)return -5;
    const tx=clamp((x/extent*.5+.5)*n,0,n-.000001),tz=clamp((z/extent*.5+.5)*n,0,n-.000001),i=Math.floor(tx),j=Math.floor(tz),fx=tx-i,fz=tz-j,a=j*(n+1)+i;
    const h00=heights[a],h10=heights[a+1],h01=heights[a+n+1],h11=heights[a+n+2];
    return fx+fz<=1?h00+(h10-h00)*fx+(h01-h00)*fz:h11+(h01-h11)*(1-fx)+(h10-h11)*(1-fz);
  };
  for(const p of [...Object.values({landing:plan.landing,landmark:plan.landmark,viewpoint:plan.viewpoint,grotto:plan.grotto}),...nodes])p.y=plan.sample(p.x,p.z);
  const approach=nodes[1],dx=approach.x-plan.landing.x,dz=approach.z-plan.landing.z,d=Math.hypot(dx,dz);plan.navigationLanding={x:plan.landing.x+dx/d*1.65,z:plan.landing.z+dz/d*1.65};
  return plan;
}

export function sampleTerrainLOD(plan,x,z,segments=24){
 const tx=clamp((x/plan.extent*.5+.5)*segments,0,segments-.000001),tz=clamp((z/plan.extent*.5+.5)*segments,0,segments-.000001),i=Math.floor(tx),j=Math.floor(tz),fx=tx-i,fz=tz-j,at=(ix,iz)=>plan.sample((ix/segments*2-1)*plan.extent,(iz/segments*2-1)*plan.extent),a=at(i,j),b=at(i+1,j),c=at(i,j+1),d=at(i+1,j+1);
 return fx+fz<=1?a+(b-a)*fx+(c-a)*fz:d+(c-d)*(1-fx)+(b-d)*(1-fz);
}

export function createTerrainGeometry(plan,segments=64){
  const p=[],c=[],indices=[],sand=new THREE.Color(plan.biome.sand),grass=new THREE.Color(plan.biome.grass),rock=new THREE.Color(plan.biome.rock),wet=sand.clone().lerp(new THREE.Color(0x729e91),.28),path=new THREE.Color(plan.biome.id==='volcano'?0x8d8770:0xc4b688),extent=plan.extent;
  for(let j=0;j<=segments;j++)for(let i=0;i<=segments;i++){
    const x=(i/segments*2-1)*extent,z=(j/segments*2-1)*extent,h=plan.sample(x,z),dx=(plan.sample(x+.28,z)-plan.sample(x-.28,z))/.56,dz=(plan.sample(x,z+.28)-plan.sample(x,z-.28))/.56,slope=Math.hypot(dx,dz),color=wet.clone();
    color.lerp(sand,smoothstep(-.12,.28,h));color.lerp(grass,smoothstep(.27,1.0,h)*(1-smoothstep(.65,1.15,slope)));
    color.lerp(rock,smoothstep(.55,1.25,slope)*smoothstep(.45,1.2,h));
    if(plan.biome.id==='volcano')color.lerp(rock,smoothstep(3,5,h)*.65);
    const d=routeDistance(plan,x,z);color.lerp(path,(1-smoothstep(.30,.87,d))*smoothstep(.35,.85,h)*(.22+.48*smoothstep(3,11,Math.hypot(x-plan.grotto.x,z-plan.grotto.z))));
    const shade=.94+.045*Math.sin(x*1.7+z*.9+plan.seed)+.025*Math.sin(z*3.5-x*.8);color.multiplyScalar(shade);
    p.push(x,h,z);c.push(color.r,color.g,color.b);
  }
  for(let j=0;j<segments;j++)for(let i=0;i<segments;i++){const a=j*(segments+1)+i;indices.push(a,a+segments+1,a+1,a+1,a+segments+1,a+segments+2);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('color',new THREE.Float32BufferAttribute(c,3));g.setIndex(indices);g.computeVertexNormals();g.computeBoundingSphere();return g;
}

// A finite grid flood, reused for placement verification and optional test/debug routes.
export function buildNavigation(plan,canOccupy=()=>true){
  const n=plan.segments,size=n+1,step=plan.extent*2/n,walkable=new Uint8Array(size*size),parents=new Int32Array(size*size);parents.fill(-2);
  const point=k=>({x:(k%size/n*2-1)*plan.extent,z:(Math.floor(k/size)/n*2-1)*plan.extent,y:plan.heights[k]});
  for(let k=0;k<walkable.length;k++){const p=point(k);walkable[k]=p.y>=-.10&&canOccupy(p.x,p.y,p.z)?1:0;}
  const closest=(p,reachable=false)=>{
    let at=-1,best=Infinity;
    for(let k=0;k<walkable.length;k++)if(walkable[k]&&(!reachable||parents[k]!==-2)){const q=point(k),d=(p.x-q.x)**2+(p.z-q.z)**2;if(d<best){best=d;at=k;}}
    return at;
  };
  const root=closest(plan.navigationLanding||plan.landing),queue=[];if(root>=0){parents[root]=-1;queue.push(root);}
  for(let i=0;i<queue.length;i++){
    const k=queue[i],x=k%size,z=Math.floor(k/size);
    for(const [dx,dz]of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,nz=z+dz,j=nz*size+nx;if(nx<0||nx>n||nz<0||nz>n||!walkable[j]||parents[j]!==-2||Math.abs(plan.heights[j]-plan.heights[k])>step*.98)continue;const a=point(k),b=point(j);let clear=true;for(const t of [.25,.5,.75])if(!canOccupy(a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t,a.z+(b.z-a.z)*t)){clear=false;break;}if(!clear)continue;parents[j]=k;queue.push(j);}
  }
  return {parents,walkable,point,root,reachable:queue,step,closest,pathTo(p){const at=closest(p,true);if(at<0)return [];const points=[];for(let k=at;k>=0;k=parents[k])points.push(point(k));return points.reverse();}};
}
