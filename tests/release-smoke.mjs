// One-shot static production build smoke. This server closes with the test;
// it is not a deployment and does not outlive this command.
import {chromium} from '@playwright/test';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../web-build/',import.meta.url)).replace(/\/$/,''),report={environment:'Local static production build / Chromium SwiftShader',checks:[],errors:[],remoteRequests:[]};
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.ttf':'font/ttf','.woff2':'font/woff2','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{try{let p=decodeURIComponent(new URL(req.url,'http://local').pathname);if(p==='/')p='/index.html';const file=path.resolve(root,'.'+p);if(!file.startsWith(root+path.sep)||!fs.statSync(file).isFile())throw Error('Not found');res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(fs.readFileSync(file));}catch{res.writeHead(404);res.end('Not found');}});
await new Promise(resolve=>server.listen(0,'0.0.0.0',resolve));const base=`http://127.0.0.1:${server.address().port}`;
let browser;
try{
 browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader','--use-angle=swiftshader']});const page=await browser.newPage({viewport:{width:1280,height:800},deviceScaleFactor:1});
 page.on('pageerror',e=>report.errors.push(e.stack));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});page.on('request',r=>{if(/^https?:/.test(r.url())&&!r.url().startsWith(base+'/'))report.remoteRequests.push(r.url());});
 await page.goto(base,{waitUntil:'networkidle'});await page.waitForFunction(()=>window.tidebound?.ready,null,{timeout:30000});assert.match(await page.title(),/Tidebound Gold/);
 report.version=await page.evaluate(()=>{const g=tidebound;g.settings.relaxed=true;g.settings.adaptiveQuality=false;g.settings.pixelRatio=.75;g.ui.changeSetting('quality','low');return {schema:g.snapshot().version,generation:g.world.toJSON().generationVersion,alias:tidebound===tidebreak};});assert.deepEqual(report.version,{schema:2,generation:3,alias:true});report.checks.push('Production bundle boots Gold, schema 2 / world generation 3, with the legacy inspector alias');
 await page.locator('[data-action="begin"]').click();assert.equal(await page.evaluate(()=>tidebound.started),true);await page.evaluate(()=>{const g=tidebound;g.setPaused(true);g.renderCamera(1);g.renderer.render(g.scene,g.camera);g.renderNeeded=false;});await page.screenshot({path:'reports/gold-release-desktop.png'});report.checks.push('Actual begin-voyage button starts the production game and renders the normal HUD');
 await page.keyboard.press('F1');await page.waitForSelector('.guide-sections');assert.equal(await page.locator('.guide-sections article').count(),6);assert.ok((await page.locator('.guide-sections').innerText()).includes('Take the trail less charted.'));report.checks.push('Field guide documents real journal/waystone/grotto controls and the unchanged rescue route');
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(200);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);await page.screenshot({path:'reports/gold-release-mobile-guide.png'});report.checks.push('Portrait field-guide layout has no page overflow');
 await page.keyboard.press('Escape');const saved=await page.evaluate(()=>tidebound.save());assert.equal(saved.version,2);assert.equal(saved.world.generationVersion,3);assert.equal(report.remoteRequests.length,0);assert.equal(report.errors.length,0,report.errors.join('\n'));report.checks.push('Static build saves successfully, with no page errors or remote game asset requests');
 console.log(JSON.stringify(report,null,2));
}catch(error){report.failure=error.stack;console.error(error);process.exitCode=1;}finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));fs.writeFileSync('reports/gold-release-smoke.json',JSON.stringify(report,null,2));}
