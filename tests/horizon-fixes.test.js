// Regressions for the post-Voyager fixes: hook casts, fishing-line origin and
// island spacing / discovery. These run without a browser in `npm test`.
import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { ITEMS, HOOK_TOOLS, STORY_AT_CHUNK, WORLD_CHUNK_SIZE, ISLAND_SIGHT_DISTANCE, TOOL_TIERS, worldChunkKey } from '../src/data.js';
import { EventBus } from '../src/systems.js';
import { WorldGenerator } from '../src/world.js';
import { QUALITY_PRESETS } from '../src/performance.js';
import { disposeObject } from '../src/assets.js';
import { Game } from '../src/game.js';

const V3 = THREE.Vector3;
const bus = () => new EventBus();

// ---------------------------------------------------------------------------
// 1. The salvage hook must actually fly and haul. castHook() used to reference
//    an undefined `tier`, so releasing a charged cast threw a ReferenceError
//    and no salvage could ever be collected.
// ---------------------------------------------------------------------------
function hookGame(owned = {}) {
  const g = Object.create(Game.prototype);
  const hand = new THREE.Group();
  hand.position.set(1, 1, 0);
  g.avatar = { userData: { tool: hand } };
  g.hook = {
    state: 'idle', charge: .8, time: 0, velocity: new V3(), caught: null, extra: null,
    origin: new V3(), target: new V3(),
    mesh: { position: new V3(), visible: false, rotation: { z: 0 } },
  };
  g.aimPoint = new V3(100, 0, 0);
  g.debris = { active: [] };
  g.inventory = { count: id => owned[id] || 0 };
  g.rope = { visible: false };
  g.player = { action: 0 };
  g.audio = { play() {} };
  g.quickbar = ['hook']; g.selectedSlot = 0;
  return g;
}

test('Hook casts do not throw, launch the hook and respect the owned tool tier', () => {
  const basic = hookGame();
  assert.doesNotThrow(() => basic.castHook());
  assert.equal(basic.hook.state, 'flying');
  assert.equal(basic.hook.mesh.visible, true);
  assert.equal(basic.rope.visible, true);
  const basicRange = 7 + .8 * 20 + TOOL_TIERS.hook.range;
  assert.ok(Math.abs(basic.hook.target.x - (basic.hook.origin.x + basicRange)) < 1e-6);
  assert.equal(basic.hook.caught, null);
  assert.deepEqual(basic.hook.extra, []);

  const upgraded = hookGame({ chainHook: 1 });
  assert.doesNotThrow(() => upgraded.castHook());
  const tierRange = 7 + .8 * 20 + TOOL_TIERS.chainHook.range;
  assert.ok(Math.abs(upgraded.hook.target.x - (upgraded.hook.origin.x + tierRange)) < 1e-6);
  assert.ok(tierRange > basicRange, 'a chain hook casts farther than the starter hook');
});

test('Every hook tier is recognised as a hook and a chargeable tool', () => {
  assert.deepEqual([...HOOK_TOOLS], ['hook', 'scrapHook', 'chainHook']);
  for (const id of HOOK_TOOLS) {
    assert.ok(ITEMS[id]?.tool, `${id} is a tool`);
    assert.equal(ITEMS[id].family, 'hook');
  }
  const g = hookGame({ scrapHook: 1 });
  g.quickbar = ['scrapHook'];
  g.paused = false;
  g.hook.state = 'flying';
  g.primaryAction();
  assert.equal(g.hook.state, 'reeling', 'clicking again recalls any tier of hook');
});

// ---------------------------------------------------------------------------
// 2. The fishing line leaves the rod tip, in both third and first person.
// ---------------------------------------------------------------------------
function rodHand() {
  const hand = new THREE.Group();
  hand.position.set(2, 1, 3);
  const rod = new THREE.Group();
  rod.rotation.x = .5;
  const tip = new THREE.Object3D();
  tip.position.set(0, 1.17, 0);
  rod.userData.tip = tip;
  rod.add(tip);
  hand.add(rod);
  hand.updateMatrixWorld(true);
  return { hand, rod, tip };
}

test('Fishing line starts at the rod tip instead of the player hand', () => {
  const { hand, tip } = rodHand();
  const g = Object.create(Game.prototype);
  g.quickbar = ['fishingRod']; g.selectedSlot = 0;
  g.firstPerson = false;
  g.avatar = { userData: { tool: hand } };
  g.viewModel = { visible: false };
  const origin = g.lineOrigin();
  assert.ok(origin.distanceTo(tip.getWorldPosition(new V3())) < 1e-6);
  assert.ok(origin.distanceTo(hand.getWorldPosition(new V3())) > 1, 'the line no longer starts at the fist');

  // Switching away from the rod must fall back to the hand, not keep the tip.
  g.quickbar = ['hook'];
  assert.ok(g.lineOrigin().distanceTo(hand.getWorldPosition(new V3())) < 1e-6);
});

test('First-person fishing line follows the viewmodel rod tip', () => {
  const { hand } = rodHand();
  const g = Object.create(Game.prototype);
  const viewModel = new THREE.Group();
  viewModel.position.set(.38, -.32, -.72);
  const viewTip = new THREE.Object3D();
  viewTip.position.set(0, .7, 0);
  viewModel.add(viewTip);
  viewModel.visible = true;
  viewModel.updateMatrixWorld(true);
  Object.assign(g, {
    quickbar: ['fishingRod'], selectedSlot: 0, firstPerson: true, avatar: { userData: { tool: hand } },
    viewModel, viewRodTip: viewTip,
  });
  assert.ok(g.lineOrigin().distanceTo(viewTip.getWorldPosition(new V3())) < 1e-6);
  assert.ok(g.lineOrigin().distanceTo(hand.getWorldPosition(new V3())) > 1);
});

// ---------------------------------------------------------------------------
// 3. Shores start beyond the horizon and are found by sailing.
// ---------------------------------------------------------------------------
test('No island is visible at spawn; sailing toward one reveals and spots it', () => {
  assert.ok(WORLD_CHUNK_SIZE >= 200, 'streaming chunks are spaced out');
  const scene = new THREE.Scene(), b = bus(), w = new WorldGenerator(scene, b, {}, { seed: 0 });
  const spotted = [];
  b.on('islandSpotted', island => spotted.push(island.id));
  const origin = new V3();

  w.update(origin);
  assert.equal(w.chunks.size, 9);
  assert.ok(w.islands.length > 0);
  const nearest = Math.min(...w.islands.map(i => Math.hypot(i.x, i.z) - i.radius));
  assert.ok(nearest > ISLAND_SIGHT_DISTANCE, `nearest shore (${Math.round(nearest)}m) starts beyond the horizon`);
  assert.equal(w.visibleIslands.length, 0, 'nothing is chartable from the starting raft');
  assert.equal(spotted.length, 0);

  w.setDetail(origin, QUALITY_PRESETS.high);
  assert.ok(w.islands.every(i => !i.group.visible), 'high graphics must not reveal distant shores');
  assert.equal(w.visibleIslands.length, 0);

  const home = w.islands.find(i => i.id === '0,-1');
  assert.ok(home, 'the first authored shore still has its stable save id');
  const approach = new V3(home.x * .6, 0, home.z * .6);
  w.update(approach);
  w.setDetail(approach, QUALITY_PRESETS.high);
  assert.ok(w.visibleIslands.includes(home), 'sailing reveals the shore');
  assert.equal(home.group.visible, true);
  assert.ok(w.sighted.has(home.id), 'the sighting is remembered');
  assert.ok(spotted.includes(home.id), 'a land-ho event fires once');
  for (const island of w.islands) disposeObject(island.group);
});

test('Story shores keep their save ids even though chunks are larger now', () => {
  assert.equal(STORY_AT_CHUNK[worldChunkKey(150, -250)]?.name, 'Radio Reef');
  const scene = new THREE.Scene(), b = bus(), w = new WorldGenerator(scene, b, {}, { seed: 1234 });
  w.update(new V3(150, 0, -250), 9);
  const radio = w.islands.find(i => i.id === '1,-3');
  assert.equal(radio?.name, 'Radio Reef');
  assert.equal(radio.storyCode, '4821');
  for (const island of w.islands) disposeObject(island.group);
});
