import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const assets=path.join(root,'dist/assets');
const files=fs.readdirSync(assets);
const cssFile=files.find(f=>f.endsWith('.css'));
const jsFile=files.find(f=>f.endsWith('.js'));
if(!cssFile||!jsFile)throw new Error('Run npm run build before packaging.');
let css=fs.readFileSync(path.join(assets,cssFile),'utf8');
css=css.replace(/url\((["']?)(\/fonts\/[^)'"\s]+)\1\)/g,(_,quote,url)=>`url(data:font/ttf;base64,${fs.readFileSync(path.join(root,'public',url)).toString('base64')})`);
let js=fs.readFileSync(path.join(assets,jsFile),'utf8').replace(/<\/script/gi,'<\\/script');
let html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
html=html.replace(/<script\b[^>]*\bsrc="[^"]+"[^>]*><\/script>/g,'');
html=html.replace(/<link\b[^>]*rel="stylesheet"[^>]*>/g,'');
const license=fs.readFileSync(path.join(root,'LICENSE.txt'),'utf8')+'\n'+fs.readdirSync(path.join(root,'public/licenses')).map(f=>`\n${f}\n${fs.readFileSync(path.join(root,'public/licenses',f),'utf8')}`).join('\n');
// Use replacement callbacks: minified JS can contain literal $& tokens.
html=html.replace('<head>',()=>`<head>\n<!-- Tidebound Gold standalone edition. All game code, fonts, sounds and art are self-contained.\nThird-party notices:${license}\n-->\n<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:; font-src data:; media-src data: blob:; connect-src 'none'; base-uri 'none';">`);
html=html.replace('</head>',()=>`<style>${css}</style>\n</head>`);
html=html.replace('</body>',()=>`<script type="module">${js}</script>\n</body>`);
const dest=path.join(root,'Tidebound-Gold.html');fs.writeFileSync(dest,html);
// Compatibility filename for existing launchers and the original offline test.
fs.writeFileSync(path.join(root,'Tosins-Tidebound.html'),html);
fs.writeFileSync(path.join(root,'Tidebreak.html'),html);
console.log(`Standalone game: ${dest} (${(Buffer.byteLength(html)/1024/1024).toFixed(2)} MB). No external requests or installation required.`);
