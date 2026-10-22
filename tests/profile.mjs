// Reproducible, real renderer profile. No synthetic FPS claims or extra RAF loop.
// Run with the same server/browser/viewport: node tests/profile.mjs before|after
import { chromium } from '@playwright/test';
import fs from 'node:fs';
const label = process.argv[2] || 'after';
const browser = await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader','--use-angle=swiftshader','--autoplay-policy=no-user-gesture-required']});
const page = await browser.newPage({viewport:{width:960,height:600},deviceScaleFactor:1});
const errors=[]; page.on('pageerror', e=>errors.push(String(e)));
await page.addInitScript(()=>{let seed=4281;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};});
const result={label,date:new Date().toISOString(),viewport:'960×600, DPR 1',environment:'Headless Chromium / forced SwiftShader software renderer; not a hardware-GPU benchmark',scenarios:[],errors};
try {
  await page.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle'});
  await page.waitForFunction(()=>window.tidebreak?.ready);
  result.browser=await browser.version();
  result.renderer=await page.evaluate(()=>{const gl=tidebreak.renderer.getContext(), ext=gl.getExtension('WEBGL_debug_renderer_info');return ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);});
  for(const quality of ['high','low']) {
    await page.evaluate(q=>{
      const g=tidebreak; g.start();g.ui.closeModal();g.settings.relaxed=true;g.time.dynamic=false;g.time.setWeather('clear');g.time.elapsed=360;g.anchored=true;g.raftVelocity.set(0,0,0);
      g.ui.changeSetting('quality',q); if(g.settings.adaptiveQuality!==undefined){g.settings.adaptiveQuality=false;g.settings.pixelRatio=1;g.applyQuality(q);}else{g.renderer.setPixelRatio(q==='low'?.75:1);g.resize();}
    },quality);
    await page.waitForTimeout(3500);
    await page.evaluate(()=>{
      const g=tidebreak;window.profileFrames=[];window.profileLast=0;
      window.profileRender=g.renderer.render;
      g.renderer.render=function(...args){const start=performance.now();const r=window.profileRender.apply(this,args);const end=performance.now();if(window.profileLast)window.profileFrames.push({ms:start-window.profileLast,renderMs:end-start,calls:this.info.render.calls,triangles:this.info.render.triangles,geometries:this.info.memory.geometries,textures:this.info.memory.textures});window.profileLast=start;return r;};
    });
    await page.waitForTimeout(10000);
    result.scenarios.push(await page.evaluate(q=>{
      const g=tidebreak;g.renderer.render=window.profileRender;
      const f=window.profileFrames, sorted=f.map(x=>x.ms).sort((a,b)=>a-b), sum=f.reduce((a,b)=>a+b.ms,0), mean=k=>f.reduce((a,b)=>a+b[k],0)/Math.max(1,f.length), last=f.at(-1)||{};
      return {quality:q,samples:f.length,actualPixelRatio:g.renderer.getPixelRatio(),fps:1000*f.length/sum,frameMsMean:sum/f.length,frameMsP95:sorted[Math.floor(sorted.length*.95)],renderCpuMsMean:mean('renderMs'),drawCallsMean:mean('calls'),trianglesMean:mean('triangles'),geometries:last.geometries,textures:last.textures,loadedChunks:g.world.chunks.size,loadedIslands:g.world.islands.length};
    },quality));
  }
  result.churn=await page.evaluate(()=>{
    const g=tidebreak;g.setPaused(true);g.renderer.setPixelRatio(.4);g.resize();g.selectSlot(1);g.renderer.render(g.scene,g.camera);
    const before={...g.renderer.info.memory};
    for(let i=0;i<24;i++){g.selectSlot(i%8);g.createGhost();g.renderer.render(g.scene,g.camera);}
    g.selectSlot(1);g.renderer.render(g.scene,g.camera);
    return {operation:'24 tool swaps + ghost rebuilds, real render after each',before,after:{...g.renderer.info.memory}};
  });
} finally {
  await browser.close();fs.mkdirSync('reports',{recursive:true});fs.writeFileSync(`reports/profile-${label}.json`,JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
}
if(errors.length)process.exitCode=1;
