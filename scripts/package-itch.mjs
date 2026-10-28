/**
 * Build an itch.io-ready HTML5 upload.
 *
 * itch.io serves HTML5 zips from a sub-directory of html-classic.itch.zone
 * (e.g. /html/1234567/index.html), so every asset reference must be relative.
 * The normal web build uses root-absolute paths (/assets/..., /fonts/...),
 * which work on Vercel but 404 inside an itch iframe. This script:
 *
 *   1. builds with vite `base: './'` into dist-itch/
 *   2. rewrites the CSS font URLs to be relative to assets/
 *   3. asserts no root-absolute reference survives
 *   4. zips the folder with index.html at the ARCHIVE ROOT (itch requirement)
 *   5. serves the result from a fake sub-path and checks every resource is 200
 *
 * Run: npm run package:itch
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'dist-itch');
const stageDir = path.join(root, 'build-itch');
const zipPath = path.join(root, 'Tidebound-Gold-itch.zip');

const log = (...args) => console.log(...args);
const fail = message => { console.error(`\n✗ ${message}\n`); process.exit(1); };

/**
 * Every real url(...) token in a stylesheet, ignoring the ones that only exist
 * inside an inline data: URI (the SVG grain filter references url(#n) itself).
 */
function cssUrls(css) {
  const withoutInlineData = css.replace(/url\(\s*(["']?)data:[\s\S]*?\1\s*\)/g, 'url(data:stripped)');
  return [...withoutInlineData.matchAll(/url\((["']?)([^)"']+)\1\)/g)]
    .map(([, , url]) => url)
    .filter(url => !/^(data:|blob:|https?:|\/\/)/i.test(url));
}

/* ------------------------------------------------------------------ build */
log('› Building with relative asset paths…');
execFileSync('npx', ['vite', 'build', '--base=./', '--outDir', 'dist-itch', '--emptyOutDir'], {
  cwd: root, stdio: 'inherit', shell: process.platform === 'win32',
});

/* ------------------------------------------------------- relative rewrites */
const assetsDir = path.join(outDir, 'assets');
const cssFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.css'));
const jsFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.js'));
if (!cssFiles.length || !jsFiles.length) fail('Vite did not produce the expected assets.');

for (const file of cssFiles) {
  const full = path.join(assetsDir, file);
  let css = fs.readFileSync(full, 'utf8');
  // Stylesheet lives in assets/, public files live in fonts/ one level up.
  const before = css;
  css = css.replace(/url\((["']?)\/(?!\/)/g, (_, quote) => `url(${quote}../`);
  if (css !== before) fs.writeFileSync(full, css);
  log(`› Rewrote ${(before.match(/url\((["']?)\/(?!\/)/g) || []).length} absolute URL(s) in ${file}`);
}

/* -------------------------------------------------------------- validation */
const html = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
const problems = [];

for (const [, attr, value] of html.matchAll(/\b(src|href)\s*=\s*"([^"]*)"/g)) {
  if (/^(data:|blob:|https?:|mailto:|#)/i.test(value)) continue;
  if (value.startsWith('/')) problems.push(`index.html ${attr}="${value}" is root-absolute`);
  const clean = value.split(/[?#]/)[0];
  if (clean && !fs.existsSync(path.join(outDir, clean))) problems.push(`index.html ${attr}="${value}" does not exist`);
}

for (const file of cssFiles) {
  const full = path.join(assetsDir, file);
  const css = fs.readFileSync(full, 'utf8');
  for (const url of cssUrls(css)) {
    if (url.startsWith('/')) { problems.push(`${file} url(${url}) is root-absolute`); continue; }
    const target = path.resolve(path.dirname(full), url.split(/[?#]/)[0]);
    if (!fs.existsSync(target)) problems.push(`${file} url(${url}) points at a missing file`);
  }
}

// A root-absolute fetch at runtime would break the same way; keep the list empty.
for (const file of jsFiles) {
  const js = fs.readFileSync(path.join(assetsDir, file), 'utf8');
  for (const [match] of js.matchAll(/["'`]\/fonts\/[^"'`]+["'`]/g)) problems.push(`${file} contains a root-absolute font path: ${match}`);
}

if (problems.length) fail(`Itch build has broken references:\n - ${[...new Set(problems)].join('\n - ')}`);
log('› All asset references are relative and resolve on disk.');

/* -------------------------------------------------------------------- zip */
fs.rmSync(stageDir, { recursive: true, force: true });
fs.cpSync(outDir, stageDir, { recursive: true });
fs.rmSync(zipPath, { force: true });
// Run inside the staging folder so index.html sits at the archive root.
execFileSync('zip', ['-r', '-9', '-q', zipPath, '.', '-x', '.*'], { cwd: stageDir, stdio: 'inherit' });

const listing = execFileSync('unzip', ['-Z1', zipPath], { encoding: 'utf8' }).trim().split('\n');
if (!listing.includes('index.html')) fail('index.html is not at the root of the zip — itch.io will reject it.');
const hasNestedFolder = listing.some(name => !name.includes('/') && name !== 'index.html' && !name.includes('.'));
if (hasNestedFolder) fail('The zip contains a nested top-level folder; itch.io expects index.html at the root.');
log(`› Zip contains ${listing.length} entries, index.html at the root.`);

/* --------------------------------------------------- serve-from-subpath test */
// Unpack the archive we are actually uploading and test THAT, so a packaging
// mistake (missing file, wrong folder depth) cannot slip through.
const unpacked = fs.mkdtempSync(path.join(os.tmpdir(), 'tidebound-itch-'));
execFileSync('unzip', ['-q', zipPath, '-d', unpacked], { stdio: 'inherit' });

const types = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.ttf': 'font/ttf', '.txt': 'text/plain', '.json': 'application/json',
};
const prefix = '/html/9876543'; // how itch.io exposes an upload
const server = http.createServer((req, res) => {
  const url = decodeURIComponent((req.url || '/').split('?')[0]);
  if (!url.startsWith(prefix + '/')) { res.writeHead(404).end('outside'); return; }
  const target = path.join(unpacked, url.slice(prefix.length + 1));
  if (!target.startsWith(unpacked) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) {
    res.writeHead(404).end('missing'); return;
  }
  res.writeHead(200, { 'content-type': types[path.extname(target)] || 'application/octet-stream' });
  fs.createReadStream(target).pipe(res);
});

await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}${prefix}/`;

const fetchText = async url => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
};

const checked = [];
try {
  const indexUrl = new URL('index.html', base);
  const page = await fetchText(indexUrl);
  checked.push(indexUrl.pathname);

  const queue = [];
  for (const [, , value] of page.matchAll(/\b(src|href)\s*=\s*"([^"]*)"/g)) {
    if (/^(data:|blob:|https?:|mailto:|#)/i.test(value)) continue;
    queue.push(new URL(value, indexUrl));
  }
  for (const url of queue) {
    const body = await fetchText(url);
    checked.push(url.pathname);
    if (url.pathname.endsWith('.css')) {
      for (const ref of cssUrls(body)) {
        const assetUrl = new URL(ref, url);
        await fetchText(assetUrl); // throws when the font 404s
        checked.push(assetUrl.pathname);
      }
    }
  }
} catch (error) {
  server.close();
  fail(`Sub-directory hosting test failed: ${error.message}`);
}
server.close();
fs.rmSync(unpacked, { recursive: true, force: true });
log(`› Unzipped archive served from ${prefix}/ — ${checked.length} resources returned 200 (html, js, css, fonts).`);

const bytes = fs.statSync(zipPath).size;
log(`\n✓ ${path.basename(zipPath)} — ${(bytes / 1024 / 1024).toFixed(2)} MB, ${listing.length} files`);
log(`  Upload this zip directly at https://itch.io/game/new → "HTML" project.`);
fs.rmSync(stageDir, { recursive: true, force: true });
