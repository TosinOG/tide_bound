// Bounded local sea A*. Uses the same coast query as hull collision, not circular
// island exclusion zones. No new update loop, dependency, or persistent route state.
export function chartSeaRoute(start,destination,clear){
  const total=Math.hypot(destination.x-start.x,destination.z-start.z),part=Math.min(1,240/Math.max(total,.01)),goal={x:start.x+(destination.x-start.x)*part,z:start.z+(destination.z-start.z)*part};
  const segment=(a,b)=>{const d=Math.hypot(b.x-a.x,b.z-a.z),n=Math.max(1,Math.ceil(d/1.8));for(let i=1;i<=n;i++)if(!clear(a.x+(b.x-a.x)*i/n,a.z+(b.z-a.z)*i/n))return false;return true;};
  if(segment(start,goal))return [goal];
  const step=4,minX=Math.min(start.x,goal.x)-48,minZ=Math.min(start.z,goal.z)-48,w=Math.ceil((Math.abs(start.x-goal.x)+96)/step)+1,h=Math.ceil((Math.abs(start.z-goal.z)+96)/step)+1,N=w*h;
  if(N>12000)return [];
  const state=new Int8Array(N),cost=new Float32Array(N),parent=new Int32Array(N);cost.fill(Infinity);parent.fill(-1);
  const point=k=>({x:minX+(k%w)*step,z:minZ+Math.floor(k/w)*step}),open=k=>{if(k<0||k>=N)return false;if(!state[k]){const p=point(k);state[k]=clear(p.x,p.z)?1:-1;}return state[k]>0;};
  const closest=p=>{let k=-1,best=Infinity;for(let j=0;j<N;j++){const q=point(j),d=(q.x-p.x)**2+(q.z-p.z)**2;if(d<best&&open(j)){best=d;k=j;}}return k;};
  const root=closest(start),end=closest(goal);if(root<0||end<0)return [];const heap=[];
  function push(k,f){let i=heap.length;heap.push({k,f});while(i){const p=(i-1)>>1;if(heap[p].f<=f)break;heap[i]=heap[p];i=p;}heap[i]={k,f};}
  function pop(){const top=heap[0],last=heap.pop();if(heap.length){let i=0;while(i*2+1<heap.length){let c=i*2+1;if(c+1<heap.length&&heap[c+1].f<heap[c].f)c++;if(last.f<=heap[c].f)break;heap[i]=heap[c];i=c;}heap[i]=last;}return top.k;}
  cost[root]=0;push(root,0);let visits=0,found=false;
  while(heap.length&&visits++<12000){const k=pop();if(state[k]===2)continue;state[k]=2;if(k===end){found=true;break;}const x=k%w,z=Math.floor(k/w);for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dz)continue;const nx=x+dx,nz=z+dz,j=nz*w+nx;if(nx<0||nx>=w||nz<0||nz>=h||!open(j)||state[j]===2)continue;if(dx&&dz&&(!open(z*w+nx)||!open(nz*w+x)))continue;const c=cost[k]+(dx&&dz?1.4142:1);if(c>=cost[j])continue;cost[j]=c;parent[j]=k;push(j,c+Math.hypot(nx-end%w,nz-Math.floor(end/w)));}}
  if(!found)return [];
  const raw=[];for(let k=end;k>=0;k=parent[k])raw.push(point(k));raw.reverse();if(segment(raw.at(-1),goal))raw.push(goal);
  const path=[];let current=start,index=0;
  while(index<raw.length){let next=index;for(let j=index+1;j<raw.length;j++)if(segment(current,raw[j]))next=j;path.push(raw[next]);current=raw[next];index=next+1;if(path.length>64)return [];}
  return path;
}
