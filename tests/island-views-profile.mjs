// Real frame sampling on shore, where foliage and solid scenery are actually near.
// No synthetic FPS; no extra in-game RAF. The unchanged comparison profile remains
// tests/profile.mjs islands-before|islands-after at the original home camera.
import {chromium} from '@playwright/test';
import fs from 'node:fs';
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader','--use-angle=swiftshader']});
const page=await browser.newPage({viewport:{width:960,height:600},deviceScaleFactor:1});
const report={environment:'Headless Chromium / SwiftShader software rendering, 960×600, Low at 0.75 pixel ratio; no pre-island shoreline baseline and no GT710 benchmark',scenarios:[],errors:[]};
page.on('pageerror',e=>report.errors.push(e.stack));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
try{
 await page.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle'});await page.waitForFunction(()=>window.tidebound?.ready);
 const fixtures=await page.evaluate(()=>{const g=tidebound,found=[];g.start();g.ui.closeModal();g.settings.relaxed=true;g.settings.dynamicWeather=false;g.time.dynamic=false;g.time.setWeather('clear');g.time.elapsed=360;g.settings.adaptiveQuality=false;g.settings.pixelRatio=.75;g.ui.changeSetting('quality','low');for(const [x,z]of [[0,0],[-100,100]]){g.world.update({x,z});for(const i of g.world.islands)if(['palm','ruins'].includes(i.biome.id)&&!found.some(f=>f.biome===i.biome.id))found.push({id:i.id,x:i.x,z:i.z,biome:i.biome.id});}return found;});
 if(fixtures.length!==2)throw Error('Missing natural shore profile fixture');
 for(const fixture of fixtures){
  await page.evaluate(f=>{const g=tidebound;g.world.update(f);const i=g.world.islands.find(i=>i.id===f.id),r=i.resources.find(r=>r.type==='journal'),k=i.nav.closest(r.local,true),p=i.nav.point(k),dock=g.world.dockFor(i,g.hullRadius);g.raft.position.set(dock.x,0,dock.z);g.raftVelocity.set(0,0,0);g.anchored=true;g.autopilot=null;g.player.position.set(i.x+p.x,p.y,i.z+p.z);g.player.velocity.set(0,0,0);g.player.onRaft=false;g.player.grounded=true;g.player.swimming=false;g.cameraYaw=i.plan.angle+.6;g.cameraPitch=.35;g.cameraDistance=8;g.cameraTarget.copy(g.player.position);g.paused=false;g.focusSuspended=false;},fixture);
  await page.waitForTimeout(2500);
  await page.evaluate(()=>{const g=tidebound;window.shoreFrames=[];window.shoreLast=0;window.shoreRender=g.renderer.render;g.renderer.render=function(...args){const start=performance.now(),r=shoreRender.apply(this,args);if(shoreLast)shoreFrames.push({ms:start-shoreLast,calls:this.info.render.calls,triangles:this.info.render.triangles});shoreLast=start;return r;};});
  await page.waitForTimeout(8000);
  report.scenarios.push(await page.evaluate(f=>{const g=tidebound;g.renderer.render=shoreRender;g.setPaused(true);const frames=shoreFrames,total=frames.reduce((n,p)=>n+p.ms,0),mean=k=>frames.reduce((n,p)=>n+p[k],0)/frames.length;return {...f,samples:frames.length,fps:1000*frames.length/total,frameMsMean:total/frames.length,drawCallsMean:mean('calls'),trianglesMean:mean('triangles'),memory:{...g.renderer.info.memory},chunks:g.world.chunks.size};},fixture));
 }
}finally{await browser.close();fs.writeFileSync('reports/profile-island-views.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));}
if(report.errors.length)process.exitCode=1;
