// Sampling and quality changes are driven by Game.frame — no timer or render loop.
export const QUALITY_PRESETS=Object.freeze({
  low:    {label:'Low',foliage:.38,foliageDistance:24,islandNearDistance:28,resourceDistance:28,maxPixelRatio:.75,shadows:false,shadowSize:0,oceanSegments:48,particles:.35,rain:180,birds:2,clouds:5,detailDistance:65,viewDistance:145,entityDistance:43},
  medium: {label:'Medium',foliage:.68,foliageDistance:36,islandNearDistance:36,resourceDistance:40,maxPixelRatio:1.25,shadows:true,shadowSize:512,oceanSegments:80,particles:.65,rain:450,birds:4,clouds:9,detailDistance:100,viewDistance:190,entityDistance:53},
  high:   {label:'High',foliage:1,foliageDistance:50,islandNearDistance:48,resourceDistance:55,maxPixelRatio:1.75,shadows:true,shadowSize:1024,oceanSegments:128,particles:1,rain:950,birds:8,clouds:17,detailDistance:155,viewDistance:245,entityDistance:65},
});
const order=['low','medium','high'];
export class QualityController {
  constructor(game) {this.game=game;this.current=game.settings.quality;this.scale=1;this.window=0;this.frames=0;this.cooldown=4;this.goodWindows=0;this.apply(this.current);}
  apply(preset=this.current) {
    const g=this.game,p=QUALITY_PRESETS[preset]||QUALITY_PRESETS.medium;this.current=QUALITY_PRESETS[preset]?preset:'medium';g.activeQuality=this.current;
    const ratio=Math.max(.5,Math.min(globalThis.devicePixelRatio||1,g.settings.pixelRatio,p.maxPixelRatio)*this.scale);
    g.renderer.setPixelRatio(ratio);g.renderer.shadowMap.enabled=p.shadows;g.renderer.shadowMap.needsUpdate=true;
    g.ocean.setQuality(p.oceanSegments);g.atmosphere.setQuality(p);g.particles.setQuality(p.particles);g.debris.entityDistance=p.entityDistance;g.world.setDetail(g.player.position,p);g.underwater?.setQuality(p);g.resize();g.renderNeeded=true;
  }
  configure() {this.scale=1;this.window=0;this.frames=0;this.cooldown=5;this.goodWindows=0;this.apply(this.game.settings.quality);}
  update(dt,eligible=true) {
    if(!this.game.settings.adaptiveQuality||!eligible||!Number.isFinite(dt)||dt<=0){this.window=0;this.frames=0;return;}
    this.window+=dt;this.frames++;this.cooldown=Math.max(0,this.cooldown-dt);
    if(this.window<4)return;
    const fps=this.frames/this.window;this.window=0;this.frames=0;if(this.cooldown>0)return;
    const current=order.indexOf(this.current),ceiling=order.indexOf(this.game.settings.quality);
    if(fps<28) {
      this.goodWindows=0;
      if(current>0)this.apply(order[current-1]);
      else if(this.scale>.65){this.scale=Math.max(.65,this.scale-.15);this.apply();}
      this.cooldown=8;
    } else if(fps>55) {
      this.goodWindows++;
      if(this.goodWindows>=3) {
        this.goodWindows=0;
        if(this.scale<1){this.scale=Math.min(1,this.scale+.15);this.apply();}
        else if(current<ceiling)this.apply(order[current+1]);
        this.cooldown=12;
      }
    } else this.goodWindows=0;
  }
}

export class PerformanceMonitor {
  constructor(game) {
    this.game=game;this.samples=new Float32Array(240);this.index=0;this.count=0;this.visible=false;this.lastPaint=-Infinity;this.paintCount=0;
    this.element=document.createElement('aside');this.element.id='performance-monitor';this.element.hidden=true;this.element.setAttribute('aria-label','Performance monitor');
    this.element.innerHTML='<header><strong>PERFORMANCE</strong><span>F3 TO CLOSE</span></header><div class="perf-live"><b data-perf="fps">—</b><span>FPS</span><strong data-perf="ms">— ms</strong></div><div class="perf-summary" data-perf="summary"></div><canvas width="256" height="68" aria-label="Rolling frame-time graph, last 240 frames"></canvas><div class="perf-caption">FRAME TIME · LAST 240 FRAMES</div><dl><div><dt>Draw calls / triangles</dt><dd data-perf="draws"></dd></div><div><dt>GPU geometries / textures</dt><dd data-perf="assets"></dd></div><div><dt>Quality / pixel ratio</dt><dd data-perf="quality"></dd></div><div><dt>Simulation steps / frame</dt><dd data-perf="steps"></dd></div><div data-perf="memory-row" hidden><dt>JS heap (browser API)</dt><dd data-perf="memory"></dd></div></dl>';
    document.body.appendChild(this.element);this.fields=Object.fromEntries([...this.element.querySelectorAll('[data-perf]')].map(e=>[e.dataset.perf,e]));this.canvas=this.element.querySelector('canvas');this.ctx=this.canvas.getContext('2d');
  }
  toggle() {this.visible=!this.visible;this.element.hidden=!this.visible;this.lastPaint=-Infinity;return this.visible;}
  resetWindow() {this.index=0;this.count=0;}
  recordFrame(seconds,now,eligible=true) {
    if(eligible&&Number.isFinite(seconds)&&seconds>0){this.samples[this.index]=seconds*1000;this.index=(this.index+1)%this.samples.length;this.count=Math.min(this.samples.length,this.count+1);}
    if(this.visible&&now-this.lastPaint>=250){this.lastPaint=now;this.paint(now);}
  }
  snapshot() {
    let sum=0,min=Infinity,max=0;
    for(let i=0;i<this.count;i++){const ms=this.samples[i];sum+=ms;min=Math.min(min,ms);max=Math.max(max,ms);}
    const current=this.count?this.samples[(this.index+this.samples.length-1)%this.samples.length]:0;
    return {currentFPS:current?1000/current:0,averageFPS:sum?1000*this.count/sum:0,minFPS:max?1000/max:0,maxFPS:min<Infinity?1000/min:0,frameMs:current,averageFrameMs:this.count?sum/this.count:0,samples:this.count,minMs:min<Infinity?min:0,maxMs:max};
  }
  paint() {
    this.paintCount++;const g=this.game,s=this.snapshot(),f=this.fields;
    f.fps.textContent=s.samples?s.currentFPS.toFixed(1):'—';f.ms.textContent=s.samples?s.frameMs.toFixed(1)+' ms':'No active frames';
    f.summary.textContent=`AVG ${s.averageFPS.toFixed(1)} · MIN ${s.minFPS.toFixed(1)} · MAX ${s.maxFPS.toFixed(1)} FPS`;
    f.draws.textContent=`${g.renderer.info.render.calls} / ${g.renderer.info.render.triangles.toLocaleString()}`;f.assets.textContent=`${g.renderer.info.memory.geometries} / ${g.renderer.info.memory.textures}`;
    f.quality.textContent=`${QUALITY_PRESETS[g.activeQuality].label}${g.settings.adaptiveQuality?' · adaptive':''} / ${g.renderer.getPixelRatio().toFixed(2)}×`;
    f.steps.textContent=`${g.clock.lastSteps} / 8 max${g.paused?' · paused':''}`;
    // Nonstandard API: show actual browser-reported JS bytes only when supported.
    try {const memory=performance.memory,supported=!!memory&&Number.isFinite(memory.usedJSHeapSize);f['memory-row'].hidden=!supported;if(supported)f.memory.textContent=(memory.usedJSHeapSize/1048576).toFixed(1)+' MB';}catch{f['memory-row'].hidden=true;}
    const ctx=this.ctx,w=this.canvas.width,h=this.canvas.height,ceiling=Math.max(33.334,s.maxMs);ctx.clearRect(0,0,w,h);ctx.fillStyle='#0b252a';ctx.fillRect(0,0,w,h);
    ctx.strokeStyle='#759b8940';ctx.lineWidth=1;for(const limit of [16.667,33.334]){const y=h-3-limit/ceiling*(h-6);ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
    ctx.strokeStyle='#a7d5b9';ctx.lineWidth=1.5;ctx.beginPath();
    for(let i=0;i<this.count;i++){const at=(this.index-this.count+i+this.samples.length)%this.samples.length,x=i/(this.samples.length-1)*w,y=h-3-this.samples[at]/ceiling*(h-6);if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.stroke();
  }
}
