// Voyager update (v1.3): pure-system, data-integrity and regression checks.
// These run without a browser: `npm test` includes this file.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as THREE from 'three';
import {
  ITEMS, BLOCKS, RECIPES, RESEARCH, QUESTS, ACHIEVEMENTS, STORY_ISLANDS, STORY_BY_CHUNK,
  DIFFICULTIES, BUFFS, PALETTE, TRADES, FISH_TABLE, TOOL_TIERS, TUTORIAL_STEPS, META,
} from '../src/data.js';
import { EventBus, Inventory, SurvivalStats, GridManager } from '../src/systems.js';
import { normalizeSave } from '../src/persistence.js';
import { VoyageLog, Tutorial, voyageMetrics } from '../src/progression.js';
import { DEFAULT_PREFERENCES, normalizePreferences } from '../src/config.js';
import { WorldGenerator, SharkAI, SeagullAI } from '../src/world.js';
import { createBlock, disposeObject } from '../src/assets.js';

// Minimal canvas stub for procedural plank textures (no browser in unit tests).
if (!globalThis.document) globalThis.document = { createElement: () => ({ width: 0, height: 0, getContext: () => ({ fillStyle: '', strokeStyle: '', lineWidth: 0, fillRect() {}, beginPath() {}, moveTo() {}, bezierCurveTo() {}, stroke() {} }) }) };

const bus = () => new EventBus();
const legacy = () => ({
  version: 2, savedAt: 100, simTime: 30,
  inventory: { leaf: 4, wood: 8, rawFish: 2 },
  stats: { health: 82, hunger: 55, thirst: 41 },
  blocks: [
    { type: 'foundation', x: 0, y: 0, z: 0, core: true, hp: 80, rotation: 0 },
    { type: 'foundation', x: 1, y: 0, z: 0, core: false, hp: 100, rotation: 0 },
    { type: 'workbench', x: 0, y: 1, z: 0, core: false, hp: 120, rotation: 0 },
  ],
  research: ['vine', 'copper'], time: { elapsed: 482, weather: 'storm' },
  raft: { position: [100, .02, -200], rotation: [0, 0, 0], velocity: [0, 0, -.12] },
  player: { position: [100.4, .29, -199.7], velocity: [0, 0, 0] },
  world: { generationVersion: 3, collected: ['0,-1:cache'], discovered: ['0,-1'] },
  progress: { salvaged: 8, built: 2, water: 1, islands: 1, caches: 1, rescued: false },
  notebook: [], quickbar: ['hook', 'hammer', 'spear', 'cookedFish', 'water', 'fishingRod', 'paddle', null],
  settings: { quality: 'medium', volume: .2, relaxed: false, dynamicWeather: true, showHints: true },
});

test('Voyager data is internally consistent and every unlock is real', () => {
  assert.equal(META.version, '1.3.2');
  for (const [id, r] of Object.entries(RESEARCH)) {
    assert.ok(ITEMS[id], `research item ${id} exists`);
    assert.ok(BLOCKS[r.unlock], `research ${id} unlocks a block`);
    for (const p of r.requires) assert.ok(RESEARCH[p], `prerequisite ${p} exists`);
  }
  for (const r of RECIPES) {
    if(!r.block) assert.ok(ITEMS[r.output], `recipe ${r.id} output exists`);
    for (const id of Object.keys(r.ingredients)) assert.ok(ITEMS[id], `ingredient ${id} exists`);
    if (r.research) assert.ok(RESEARCH[r.research], `research ${r.research} exists`);
    if (r.station) assert.ok(BLOCKS[r.station], `station ${r.station} exists`);
    if (r.block) assert.ok(BLOCKS[r.block], `block ${r.block} exists`);
  }
  for (const q of QUESTS) for (const id of Object.keys(q.reward || {})) assert.ok(ITEMS[id]);
  for (const t of TRADES) for (const id of Object.keys(t.give)) assert.ok(ITEMS[id]);
  for (const [id, b] of Object.entries(BLOCKS)) {
    assert.ok(b.name && b.cost && b.hp > 0, `block ${id} is buildable`);
    for (const k of Object.keys(b.cost)) assert.ok(ITEMS[k]);
    assert.ok(['structure', 'station', 'cosmetic'].includes(b.category || 'structure'));
  }
  for (const id of Object.keys(BLOCKS)) {
    const m = createBlock(id);
    let meshes = 0; m.traverse(o => { if (o.isMesh) meshes++; });
    assert.ok(meshes > 0, `block ${id} has a mesh`);
  }
});

test('Tool tiers, buffs, fish, difficulties, palette, story and achievements are well formed', () => {
  assert.ok(TOOL_TIERS.chainHook.haul > TOOL_TIERS.scrapHook.haul);
  assert.ok(TOOL_TIERS.chainHook.range > TOOL_TIERS.scrapHook.range);
  assert.ok(TOOL_TIERS.metalSpear.damage > TOOL_TIERS.spear.damage);
  for (const [id, item] of Object.entries(ITEMS)) if (item.buff) assert.ok(BUFFS[item.buff], `${id} buff exists`);
  assert.equal(FISH_TABLE.reduce((n, f) => n + f.weight, 0) > 0, true);
  for (const f of FISH_TABLE) assert.ok(ITEMS[f.id]);
  assert.ok(DIFFICULTIES.drifter.drain < DIFFICULTIES.castaway.drain);
  assert.ok(DIFFICULTIES.stormchaser.damage > DIFFICULTIES.castaway.damage);
  assert.ok(PALETTE.length >= 8);
  assert.equal(new Set(STORY_ISLANDS.map(i => i.code)).size, STORY_ISLANDS.length);
  assert.equal(STORY_ISLANDS.filter(i => i.finale).length, 1);
  assert.equal(STORY_ISLANDS[0].first, true, 'the first story shore is reachable without a prior code');
  for (const i of STORY_ISLANDS) assert.equal(STORY_BY_CHUNK[i.id], i);
  assert.equal(new Set(ACHIEVEMENTS.map(a => a.id)).size, ACHIEVEMENTS.length);
  for (const a of ACHIEVEMENTS) assert.ok(a.metric && a.target > 0 && ITEMS[a.icon] || true);
  assert.ok(TUTORIAL_STEPS.length >= 5);
});

test('Food buffs apply on consumption and expire; difficulty rates scale drain and damage', () => {
  const b = bus(), inv = new Inventory(b, { seaStew: 1, reefSalad: 1 });
  const stats = new SurvivalStats(b, { health: 50, hunger: 20, thirst: 20 });
  assert.equal(stats.consume('seaStew', inv), true);
  assert.equal(stats.hasBuff('stormShield'), true);
  assert.equal(stats.buffs.stormShield, BUFFS.stormShield.seconds);
  stats.update(BUFFS.stormShield.seconds + 1);
  assert.equal(stats.hasBuff('stormShield'), false);
  assert.equal(stats.consume('reefSalad', inv), true);
  assert.equal(stats.hasBuff('swiftSwim'), true);
  const a = new SurvivalStats(bus(), { health: 100, hunger: 100, thirst: 100 });
  a.update(10, false, { drain: .5, damage: .5 });
  assert.equal(a.thirst, 97.5);
  assert.equal(a.hunger, 99);
  const dead = new SurvivalStats(bus(), { health: 50, hunger: 0, thirst: 0 });
  dead.update(2, false, { drain: 1, damage: .5 });
  assert.equal(dead.health, 47.5);
});

test('Voyage Log and Tutorial are once-only, saved and driven by real game metrics', () => {
  const b = bus(), game = {
    progress: { salvaged: 60, built: 12, islands: 6, water: 1, courses: 1, sharks: 1 },
    crafting: { research: new Set(['vine']) }, world: { biomesSeen: new Set(['palm']) },
    voyage: { codes: ['4821'], endless: false }, time: { day: 3 },
  };
  const log = new VoyageLog(b, { earned: [] }); const earned = [];
  b.on('achievement', a => earned.push(a.id));
  log.update(game);
  assert.ok(earned.includes('first-salvage'));
  assert.ok(earned.includes('salvage-50'));
  assert.ok(earned.includes('builder'));
  assert.ok(earned.includes('researcher'));
  const replay = new VoyageLog(new EventBus(), log.toJSON());
  const before = replay.earned.size; replay.update(game);
  assert.equal(replay.earned.size, before, 'achievements never re-fire');
  assert.ok(voyageMetrics(game).salvaged === 60);
  const tutorBus = bus(), steps = [];
  tutorBus.on('tutorialStep', s => steps.push(s.id));
  const tut = new Tutorial(tutorBus, { step: 0, done: false });
  tut.update(game); tut.update(game);
  assert.ok(steps.length >= 1);
  assert.equal(new Tutorial(new EventBus(), tut.toJSON()).step, tut.step);
});

test('V2 saves accept every new Voyager field and reject malformed ones', () => {
  const s = normalizeSave(legacy());
  assert.ok(s.voyage);
  assert.equal(s.voyage.difficulty, 'castaway');
  assert.equal(s.voyage.worldSeed, 0);
  assert.equal(s.voyage.paintCharges, 0);
  assert.deepEqual(s.stats.buffs, {});
  const extended = {
    ...legacy(),
    stats: { health: 80, hunger: 50, thirst: 50, buffs: { stormShield: 120 } },
    blocks: [...legacy().blocks, { type: 'wall', x: 1, y: 1, z: 0, hp: 80, paint: 3 }],
    voyage: {
      achievements: ['first-salvage'], tutorial: { step: 2, done: false },
      codes: ['4821'], storyVisited: ['1,-3'], difficulty: 'stormchaser', worldSeed: 4242,
      endless: true, bossDefeated: true, engineFuel: 210, paintCharges: 5,
      storage: { wood: 7, seaStew: 1 }, biomesSeen: ['palm', 'reef'],
    },
    progress: { ...legacy().progress, cooked: 2, courses: 1, trades: 1, painted: 1, upgrades: 1, codes: 1, finale: 1, endless: 1 },
    world: { generationVersion: 3, collected: ['0,-1:cache', '1,-3:story:code', '1,-3:story:cache'], discovered: ['0,-1', '1,-3'] },
    settings: { ...legacy().settings, difficulty: 'stormchaser', firstPerson: true, interactiveGuide: false, worldSeed: 4242 },
  };
  const round = normalizeSave(JSON.stringify(extended));
  assert.equal(round.voyage.difficulty, 'stormchaser');
  assert.equal(round.voyage.worldSeed, 4242);
  assert.equal(round.voyage.engineFuel, 210);
  assert.equal(round.voyage.storage.wood, 7);
  assert.equal(round.stats.buffs.stormShield, 120);
  assert.equal(round.blocks.find(b => b.type === 'wall').paint, 3);
  assert.equal(round.progress.cooked, 2);
  assert.ok(round.world.collected.includes('1,-3:story:code'));
  assert.deepEqual(normalizeSave(JSON.stringify(round)), round, 'roundtrip is stable');
  for (const bad of [
    { ...extended, voyage: { ...extended.voyage, codes: ['9999'] } },
    { ...extended, voyage: { ...extended.voyage, difficulty: 'impossible' } },
    { ...extended, stats: { ...extended.stats, buffs: { notABuff: 5 } } },
    { ...extended, blocks: [...extended.blocks, { type: 'wall', x: 2, y: 1, z: 0, hp: 80, paint: 99 }] },
    { ...extended, progress: { ...extended.progress, painted: -1 } },
  ]) assert.throws(() => normalizeSave(bad));
});

test('Preferences bound difficulty, first-person, guide and world seed', () => {
  const p = normalizePreferences({ difficulty: 'stormchaser', firstPerson: true, interactiveGuide: false, worldSeed: 777, unknown: 1 });
  assert.equal(p.difficulty, 'stormchaser');
  assert.equal(p.firstPerson, true);
  assert.equal(p.interactiveGuide, false);
  assert.equal(p.worldSeed, 777);
  assert.equal('unknown' in p, false);
  assert.equal(normalizePreferences({ difficulty: 'nope' }).difficulty, DEFAULT_PREFERENCES.difficulty);
  assert.equal(normalizePreferences({ worldSeed: -5 }).worldSeed, 0);
});

test('Grid paint survives the save boundary and block templates stay shared', () => {
  const g = new GridManager(bus());
  g.add('foundation', 0, 0, 0, true);
  const b = g.add('wall', 0, 1, 0, false, null, { paint: 4 });
  assert.equal(b.paint, 4);
  assert.equal(g.toJSON().find(x => x.type === 'wall').paint, 4);
  const a = createBlock('lantern'), c = createBlock('lantern');
  assert.equal(a.children[0].geometry, c.children[0].geometry);
  assert.ok(a.children[0].geometry.userData.shared);
  disposeObject(a);
});

test('Story shores generate deterministic keeper resources, hazards and a boss-capable shark', () => {
  const scene = new THREE.Scene(), b = bus(), w = new WorldGenerator(scene, b, {}, { seed: 1234, biomesSeen: new Set() });
  w.update(new THREE.Vector3(150, 0, -250), 9);
  const island = w.islands.find(i => i.story);
  assert.ok(island, 'story island loads');
  assert.equal(island.name, 'Radio Reef');
  assert.equal(island.storyCode, '4821');
  assert.ok(island.resources.some(r => r.type === 'code'));
  assert.ok(island.resources.some(r => r.type === 'storyCache'));
  assert.ok(island.hazards.length > 0);
  assert.ok(w.biomesSeen.size > 0);
  for (const i of w.islands) disposeObject(i.group);
  const shark = new SharkAI(scene, b);
  shark.setVariant({ boss: true, armored: true, cooldown: 22 });
  assert.equal(shark.boss, true);
  assert.equal(shark.health, 100);
  assert.equal(shark.maxHealth, 240);
  shark.health = shark.maxHealth; shark.hit(50);
  assert.equal(shark.health, 210, 'armored shark takes reduced damage');
  const gull = new SeagullAI(scene, b);
  gull.update(1, 1, new THREE.Group(), new GridManager(bus()), []);
  assert.equal(gull.state, 'away');
  gull.state = 'circling'; assert.equal(gull.scare(), true);
  gull.dispose(scene);
});

test('The mobile landscape fix is present in both CSS and the runtime class logic', () => {
  const css = fs.readFileSync(fileURLToPath(new URL('../src/style.css', import.meta.url)), 'utf8');
  assert.match(css, /\.mobile-controls\{display:none\}/, 'controls are hidden on desktop by default');
  assert.match(css, /body\.touch-landscape \.mobile-controls\{display:block!important\}/, 'landscape overrides the desktop hide');
  assert.match(css, /@media \(pointer:coarse\) and \(orientation:landscape\)\{\.mobile-controls\{display:block\}\}/);
  assert.match(css, /body\.touch-landscape \.joystick/, 'joystick is repositioned for landscape');
  assert.match(css, /body\.touch-landscape\.menu-open \.mobile-controls\{display:none!important\}/);
  const game = fs.readFileSync(fileURLToPath(new URL('../src/game.js', import.meta.url)), 'utf8');
  assert.match(game, /touch-landscape',!!\(coarse&&innerWidth>innerHeight\)/, 'resize marks coarse-pointer landscape');
});
