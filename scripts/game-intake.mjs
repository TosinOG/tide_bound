#!/usr/bin/env node
// Unpack and inventory a reference game build so its mechanics can be studied.
//
//   node scripts/game-intake.mjs path/to/game.zip
//   node scripts/game-intake.mjs path/to/extracted-folder
//   node scripts/game-intake.mjs path/to/game.zip --strings
//
// Writes reports/intake-<name>.md and extracts archives into .intake/ (both gitignored).
// Nothing is executed: this only reads, unpacks, lists and greps.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const intakeRoot = path.join(root, '.intake');
const reportDir = path.join(root, 'reports');

const MAX_FILES = 200000;
const MAX_STRINGS_FILE = 32 * 1024 * 1024; // only run `strings` on files under this
const MAX_STRING_HITS = 400;

function usage(code = 2) {
  console.error('Usage: node scripts/game-intake.mjs <game.zip|folder> [--strings]');
  process.exit(code);
}

const argv = process.argv.slice(2);
const flags = new Set(argv.filter(a => a.startsWith('--')));
const args = argv.filter(a => !a.startsWith('--'));
if (!args.length) usage();
const withStrings = flags.has('--strings');
const input = path.resolve(args[0]);
if (!fs.existsSync(input)) { console.error(`Not found: ${input}`); process.exit(1); }

const slug = path.basename(input)
  .replace(/(\.\d{3}|\.part-[A-Za-z0-9]{2,3})$/i, '')      // split-volume suffixes
  .replace(/\.(zip|tar|tar\.gz|tgz|7z|rar)$/i, '')
  .replace(/[^\w.-]+/g, '-').toLowerCase();
const mb = n => n < 1024 * 1024 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1024 / 1024).toFixed(2)} MB`;

/* ---------------------------------------------------------- split parts --- */

// Accept a raw byte-split of a big archive: 7-Zip's game.zip.001/002, or
// `split -b 90m game.zip game.zip.part-`. GitHub refuses files over 100 MiB,
// so a 100 MB reference build normally has to arrive in pieces.
function joinParts(file) {
  const m = path.basename(file).match(/^(.*)\.(\d{3}|part-[A-Za-z0-9]{2,3})$/);
  if (!m) return null;
  const base = m[1];
  const dir = path.dirname(file);
  const parts = fs.readdirSync(dir)
    .filter(n => n.startsWith(`${base}.`) && /\.(\d{3}|part-[A-Za-z0-9]{2,3})$/.test(n))
    .sort();
  if (parts.length < 2) return null;
  fs.mkdirSync(intakeRoot, { recursive: true });
  const joined = path.join(intakeRoot, `_joined-${slug}.zip`);
  if (!fs.existsSync(joined)) {
    const out = fs.openSync(joined, 'w');
    try {
      for (const name of parts) fs.writeSync(out, fs.readFileSync(path.join(dir, name)));
    } finally { fs.closeSync(out); }
  }
  console.log(`Joined ${parts.length} parts -> ${path.relative(root, joined)}`);
  return joined;
}

/* ---------------------------------------------------------------- unpack --- */

function unpack(zip) {
  const dest = path.join(intakeRoot, slug);
  fs.mkdirSync(dest, { recursive: true });
  if (!fs.readdirSync(dest).length) {
    let r = spawnSync('unzip', ['-q', '-o', zip, '-d', dest], { stdio: 'inherit' });
    if (r.status !== 0) {
      console.warn('unzip unavailable or failed; falling back to python3 -m zipfile.');
      r = spawnSync('python3', ['-m', 'zipfile', '-e', zip, dest], { stdio: 'inherit' });
    }
    if (r.status !== 0) { console.error('Could not extract the archive.'); process.exit(1); }
  }
  // Most zips wrap everything in one top-level folder; descend into it.
  const entries = fs.readdirSync(dest, { withFileTypes: true });
  if (entries.length === 1 && entries[0].isDirectory()) return path.join(dest, entries[0].name);
  return dest;
}

const joinedInput = fs.statSync(input).isDirectory() ? null : joinParts(input);
const source = joinedInput || input;
const target = fs.statSync(source).isDirectory() ? source : unpack(source);
const archiveBytes = fs.statSync(source).isDirectory() ? 0 : fs.statSync(source).size;

/* ---------------------------------------------------------------- walk ----- */

const files = [];
let totalBytes = 0;
let truncated = false;

function walk(dir) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (files.length >= MAX_FILES) { truncated = true; return; }
    const full = path.join(dir, e.name);
    if (e.isSymbolicLink()) continue;
    if (e.isDirectory()) { walk(full); continue; }
    let st;
    try { st = fs.statSync(full); } catch { continue; }
    if (!st.isFile()) continue;
    files.push({ path: full, rel: path.relative(target, full).split(path.sep).join('/'), size: st.size });
    totalBytes += st.size;
  }
}
walk(target);

const ext = f => {
  const b = path.basename(f.rel);
  const m = b.match(/\.([A-Za-z0-9]+)$/);
  return m ? m[1].toLowerCase() : '(none)';
};

const byExt = new Map();
for (const f of files) {
  const k = ext(f);
  const cur = byExt.get(k) || { files: 0, bytes: 0 };
  cur.files++; cur.bytes += f.size;
  byExt.set(k, cur);
}
const topExt = [...byExt].sort((a, b) => b[1].bytes - a[1].bytes).slice(0, 18);
const largest = [...files].sort((a, b) => b.size - a.size).slice(0, 15);
const has = re => files.find(f => re.test(f.rel));
const hasAll = res => res.every(re => files.some(f => re.test(f.rel)));

/* -------------------------------------------------------------- engines ---- */

const engines = [];
const detect = (name, test, note) => { const ev = test(); if (ev) engines.push({ name, evidence: ev, note }); };

detect('Unity', () => {
  const player = has(/UnityPlayer\.dll$/i);
  const data = has(/[^/]+_Data\/globalgamemanagers(\.assets)?$/i);
  const managed = has(/_Data\/Managed\/Assembly-CSharp\.dll$/i);
  const il2cpp = has(/_Data\/il2cpp_data\//i) || has(/GameAssembly\.dll$/i);
  const assets = has(/\.(assets|bundle|unity3d)$/i);
  const ev = [player && 'UnityPlayer.dll', data && '*_Data/globalgamemanagers', managed && 'Assembly-CSharp.dll', il2cpp && 'IL2CPP (GameAssembly.dll / il2cpp_data)', assets && '*.assets/*.bundle'].filter(Boolean);
  return ev.length ? ev : null;
}, 'IL2CPP/managed builds hide logic in compiled assemblies; gameplay values usually sit in *.assets ScriptableObjects.');

detect('Godot', () => {
  const ev = [has(/project\.godot$/i) && 'project.godot', has(/\.pck$/i) && '*.pck', has(/\.gd$/i) && '*.gd scripts', has(/\.tscn$/i) && '*.tscn scenes'].filter(Boolean);
  return ev.length ? ev : null;
}, 'A .pck is readable with a PCK extractor; exported builds keep GDScript if not encrypted.');

detect('GameMaker', () => {
  const ev = [has(/(^|\/)data\.win$/i) && 'data.win', has(/\.yyp$/i) && '*.yyp project', has(/\.yy$/i) && '*.yy resources', has(/\.gml$/i) && '*.gml scripts'].filter(Boolean);
  return ev.length ? ev : null;
}, 'data.win holds compiled GML; UndertaleModTool decompiles it back to readable GML.');

detect('RPG Maker (MV/MZ)', () => {
  const ev = [has(/www\/data\/System\.json$/i) && 'www/data/*.json', has(/js\/rpg_core\.js$/i) && 'js/rpg_core.js', has(/\.rmmzproject$/i) && '*.rmmzproject'].filter(Boolean);
  return ev.length ? ev : null;
}, 'Everything is plain JSON + JS: items, skills, damage formulas and enemy AI are directly readable.');

detect('RPG Maker (XP/VX/VX Ace)', () => {
  const ev = [has(/Game\.(rxdata|rvdata2?)$/i) && 'Game.rxdata/rvdata2', has(/\.rgssad$/i) && '*.rgssad archive', has(/\.rxproj$|\.rvproj2?$/i) && 'project file'].filter(Boolean);
  return ev.length ? ev : null;
}, 'Ruby Marshal data; RGSS archives can be unpacked, then RubyAce or a dumper reads the data.');

detect('Unreal Engine', () => {
  const ev = [has(/\.pak$/i) && '*.pak', has(/\.uproject$/i) && '*.uproject', has(/\.uasset$/i) && '*.uasset'].filter(Boolean);
  return ev.length ? ev : null;
}, 'Blueprints and data tables need FModel/UE viewer; a shipped build is hard to read without the editor assets.');

detect('Construct', () => {
  const ev = [has(/c2runtime\.js$/i) && 'c2runtime.js', has(/c3runtime\.js$/i) && 'c3runtime.js', has(/\.c3p$|\.capx$/i) && 'project archive'].filter(Boolean);
  return ev.length ? ev : null;
}, 'Event sheets compile to JS; c3runtime.js is readable and often keeps event names.');

detect('Electron app', () => {
  const ev = [has(/resources\/app\.asar$/i) && 'resources/app.asar', has(/app\.asar$/i) && 'app.asar'].filter(Boolean);
  return ev.length ? ev : null;
}, 'app.asar unpacks to the original JS (npx @electron/asar extract).');

detect('HTML5 / JavaScript', () => {
  const ev = [has(/package\.json$/i) && 'package.json', has(/index\.html$/i) && 'index.html', has(/\.(m?js|ts)$/i) && '*.js/*.ts sources', has(/assets\/[^/]+\.js$/i) && 'bundled assets/*.js'].filter(Boolean);
  if (ev.length < 2) return null;
  return ev;
}, 'Best case: read the source directly, or pretty-print the bundle (npx prettier --parser babel).');

detect('Flutter', () => {
  const ev = [has(/libapp\.so$/i) && 'libapp.so', has(/flutter_assets\//i) && 'flutter_assets/'].filter(Boolean);
  return ev.length ? ev : null;
}, 'Dart AOT snapshot; needs a snapshot reworker — usually observe behaviour instead.');

detect('Defold', () => {
  const ev = [has(/game\.projectc$/i) && 'game.projectc', has(/\.arcd$|\.arcz$/i) && '*.arcd/*.arcz'].filter(Boolean);
  return ev.length ? ev : null;
}, 'Lua bytecode in archives; a Lua decompiler may recover logic.');

const libs = [];
if (files.length) {
  for (const [name, re] of [
    ['three.js', /three/i], ['Phaser', /phaser/i], ['PixiJS', /pixi/i], ['Babylon.js', /babylon/i],
    ['Cocos', /cocos/i], ['Matter.js', /matter(\.min)?\.js/i], ['Box2D', /box2d/i],
    ['Howler', /howler/i], ['Tone.js', /tone\.js/i],
  ]) {
    const hit = files.find(f => /\.(m?js|html|json)$/i.test(f.rel) && f.size < 4 * 1024 * 1024 && re.test(f.rel));
    if (hit) libs.push(`${name} (${hit.rel})`);
  }
}

/* ------------------------------------------------- mechanics, candidates --- */

const TEXTISH = /\.(m?js|cjs|ts|tsx|jsx|json|cs|gd|gml|py|lua|rb|yml|yaml|toml|ini|cfg|xml|csv|txt|md|shader|glsl|html|css|as|hx|nut|cpp|h|hpp|go|rs|java|kt|swift|dart|ds|yy)$/i;
const RELEVANT = /(script|game|player|enemy|unit|actor|combat|damage|physics|move|movement|stats|stat|item|items|inventory|craft|recipe|skill|ability|spawn|wave|economy|balance|config|data|level|progression|survival|status|effect|system|ai|npc|quest|loot|drop|resource)/i;

const candidates = files
  .filter(f => TEXTISH.test(f.rel) && f.size > 0 && f.size < 3 * 1024 * 1024)
  .map(f => ({ ...f, score: (RELEVANT.test(path.basename(f.rel)) ? 2 : 0) + (RELEVANT.test(f.rel) ? 1 : 0) + (/(^|\/)(src|scripts?|js|source)\//i.test(f.rel) ? 2 : 0) + (ext(f) === 'json' ? 1 : 0) }))
  .sort((a, b) => b.score - a.score || b.size - a.size)
  .slice(0, 40);

/* ------------------------------------------------------ optional strings --- */

const VOCAB = /\b(cooldown|stamina|oxygen|hunger|thirst|damage|health|armor|shield|dash|roll|dodge|parry|block|jump|gravity|knockback|combo|spawn|wave|rarity|crit|upgrade|craft|recipe|durability|save|inventory|pickup|xp\b|levelup|level_up|tier|buff|debuff|poison|burn|freeze|slow|heal|reload|ammo|mana|energy|charge|stagger|invuln|iframes)\b/i;
let stringHits = [];
if (withStrings) {
  const binaryish = files.filter(f => /\.(dll|so|dylib|exe|bin|dat|assets|win|pck|wasm|pak|asar|bundle|resS)$/i.test(f.rel) && f.size < MAX_STRINGS_FILE).slice(0, 12);
  for (const f of binaryish) {
    const r = spawnSync('strings', ['-n', '6', f.path], { encoding: 'utf8', maxBuffer: 48 * 1024 * 1024 });
    if (r.status !== 0 || !r.stdout) continue;
    const seen = new Set();
    for (const line of r.stdout.split('\n')) {
      if (stringHits.length >= MAX_STRING_HITS) break;
      const t = line.trim();
      if (t.length < 4 || t.length > 160 || seen.has(t) || !VOCAB.test(t)) continue;
      seen.add(t);
      stringHits.push({ file: f.rel, text: t });
    }
  }
}

/* ------------------------------------------------------------- report ----- */

const q = s => '`' + s + '`';
const lines = [];
lines.push(`# Intake report — ${slug}`, '');
lines.push(`- Input: ${q(input)}${archiveBytes ? ` (${mb(archiveBytes)})` : ''}${joinedInput ? ' — reassembled from split parts' : ''}`);
lines.push(`- Analysed: ${q(target)}`);
lines.push(`- Files: ${files.length}${truncated ? ` (capped at ${MAX_FILES})` : ''}, ${mb(totalBytes)} total`);
lines.push(`- Date: ${new Date().toISOString().slice(0, 10)}`, '');

lines.push('## Detected engine', '');
if (engines.length) {
  for (const e of engines) {
    lines.push(`- **${e.name}** — evidence: ${e.evidence.join(', ')}`);
    if (e.note) lines.push(`  - ${e.note}`);
  }
} else {
  lines.push('- No known engine signature matched. Check the largest files and the extension table below.');
}
if (libs.length) lines.push(`- Libraries in filenames: ${libs.join(', ')}`);
lines.push('');

lines.push('## File types', '', '| Extension | Files | Size |', '|---|---:|---:|');
for (const [k, v] of topExt) lines.push(`| ${k} | ${v.files} | ${mb(v.bytes)} |`);
lines.push('');

lines.push('## Largest files', '', '| File | Size |', '|---|---:|');
for (const f of largest) lines.push(`| ${q(f.rel.slice(0, 120))} | ${mb(f.size)} |`);
lines.push('');

lines.push('## Mechanics candidates (read these first)', '');
if (candidates.length) {
  for (const f of candidates) lines.push(`- ${q(f.rel)} — ${(f.size / 1024).toFixed(1)} KB`);
} else {
  lines.push('- No readable text/logic files found; this build is compiled. Use `--strings` and observation instead.');
}
lines.push('');

if (withStrings && stringHits.length) {
  lines.push(`## Gameplay vocabulary found in binaries (${stringHits.length} hits)`, '');
  for (const h of stringHits) lines.push(`- ${q(h.file)}: ${h.text.replace(/\|/g, '\\|')}`);
  lines.push('');
}

lines.push('## Next steps', '');
lines.push('1. Read the candidates above and extract rules, not code: numbers, ordering, states, edge cases.');
lines.push('2. Write each mechanic as a spec (inputs → state → outputs, tunable constants) before touching `src/`.');
lines.push('3. Implement in Tidebound\'s own layers: constants/data in `src/data.js`, rules in `src/systems.js`, wiring in `src/game.js`, HUD in `src/ui.js`, tests in `tests/`.');
lines.push('4. Re-implement from the spec. Do not copy source, assets, audio, names or text from the reference build.');
lines.push('');

fs.mkdirSync(reportDir, { recursive: true });
const reportPath = path.join(reportDir, `intake-${slug}.md`);
fs.writeFileSync(reportPath, lines.join('\n'));

console.log(`Engine: ${engines.map(e => e.name).join(', ') || 'unknown'}`);
console.log(`Files: ${files.length}, ${mb(totalBytes)}${truncated ? ' (capped)' : ''}`);
console.log(`Analysed: ${target}`);
console.log(`Report: ${path.relative(root, reportPath)}`);
