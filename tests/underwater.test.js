import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { EventBus } from '../src/systems.js';
import { ITEMS, RECIPES, RESEARCH } from '../src/data.js';
import {
  UnderwaterWorld, DIVE_OXYGEN_BASE, DIVE_OXYGEN_PER_TANK, DIVE_OXYGEN_MAX,
  UNDERWATER_CHUNK_SIZE, UNDERWATER_RESOURCE_TYPES, getOxygenCapacity, getOxygenDrainRate,
} from '../src/underwater.js';

test('Every submerged resource feeds the existing crafting/research progression', () => {
  for (const type of UNDERWATER_RESOURCE_TYPES) {
    assert.ok(ITEMS[type], `${type} is a real inventory item`);
    assert.ok(RECIPES.some(recipe => recipe.ingredients?.[type] > 0), `${type} is consumed by a real recipe`);
  }
  assert.equal(RESEARCH.pearl.unlock, 'oxygenTank');
  assert.ok(RECIPES.find(recipe => recipe.id === 'oxygenTank').ingredients.deepCrystal > 0);
});

function makeWorld() {
  const events = new EventBus(), bus = new EventBus();
  const island = { id: '0,-1', x: 28, z: -61, radius: 12, plan: { extent: 20, sample: () => -5 } };
  const world = {
    islands: [island], collected: new Set(), discovered: new Set(),
    terrainHeight: () => -5,
  };
  return { world, bus, events, island };
}

test('Dive oxygen capacity and pressure drain scale with real equipment and depth', () => {
  assert.equal(DIVE_OXYGEN_BASE, 56);
  assert.equal(getOxygenCapacity({ count: () => 0 }), 56);
  assert.equal(getOxygenCapacity({ count: id => id === 'oxygenTank' ? 1 : 0 }), 56 + DIVE_OXYGEN_PER_TANK);
  assert.equal(getOxygenCapacity({ oxygenTank: 10 }), DIVE_OXYGEN_MAX);
  assert.equal(getOxygenDrainRate(0, false), 1);
  assert.ok(getOxygenDrainRate(40, false) > getOxygenDrainRate(0, false));
  assert.ok(getOxygenDrainRate(20, true) < getOxygenDrainRate(20, false));
  assert.ok(getOxygenDrainRate(10000, false) <= 1.65);
});

test('Underwater basin has real depth, deterministic chunk resources and a stable open wreck landmark', () => {
  const { world, bus, island } = makeWorld();
  const scene = new THREE.Scene();
  const first = new UnderwaterWorld(scene, world, bus);
  const x = first.wreck.position.x, z = first.wreck.position.z;
  assert.ok(first.floorAt(x, z) < -6, 'the open basin should continue below the surface collision plane');
  assert.ok(first.wreck.position.y < -5 && first.wreck.position.y > first.floorAt(x, z));
  assert.equal(first.wreck.region.name, 'The Lanternwake wreck');
  assert.ok(first.wreck.group.children.length > 18, 'wreck has a readable hull, open passage and clues');
  first.update(0, new THREE.Vector3(x, first.wreck.position.y, z));
  assert.equal(first.chunks.size, 9);
  assert.equal(first.chunks.size, Math.ceil(3) ** 2);
  assert.ok(first.nearby.some(resource => resource.id === first.wreck.key.id));
  assert.ok(!first.nearby.some(resource => resource.id === first.wreck.cache.id), 'sealed locker is gated by its key');
  const IDs = [...first.chunks.values()].flatMap(chunk => chunk.resources.map(resource => resource.id)).sort();
  assert.ok(IDs.length >= 12, 'seabed generates finite collectible clusters');
  assert.equal(new Set(IDs).size, IDs.length);
  assert.ok(UNDERWATER_RESOURCE_TYPES.every(type => ['seaweed', 'shell', 'ironOre', 'pearl', 'deepCrystal'].includes(type)));
  assert.equal(first.chunkSize, UNDERWATER_CHUNK_SIZE);

  const second = new UnderwaterWorld(new THREE.Scene(), world, new EventBus());
  second.update(0, new THREE.Vector3(x, first.wreck.position.y, z));
  assert.deepEqual([...second.chunks.values()].flatMap(chunk => chunk.resources.map(resource => resource.id)).sort(), IDs);
  assert.equal(second.wreck.position.x, first.wreck.position.x);
  assert.equal(second.wreck.position.z, first.wreck.position.z);
  first.dispose();
  second.dispose();
  assert.equal(first.chunks.size, 0);
  assert.equal(island.id, '0,-1');
});

test('Wreck key unlocks a finite journal/locker chain and all collections persist exactly once', () => {
  const { world, bus } = makeWorld();
  const scene = new THREE.Scene(), underwater = new UnderwaterWorld(scene, world, bus);
  const collected = [];
  bus.on('resourceCollected', event => collected.push(event));
  const { position } = underwater.wreck;
  const diver = position.clone();
  underwater.update(0, diver);

  const key = underwater.wreck.key;
  assert.ok(underwater.nearestResource(key.position, 2, true));
  assert.equal(underwater.collect(key, key.position.clone(), true), true);
  assert.equal(underwater.collect(key, key.position.clone(), true), false);
  assert.equal(world.collected.has('wreck:brass-key'), true);

  underwater.update(0, diver);
  const locker = underwater.wreck.cache;
  assert.ok(underwater.nearby.includes(locker));
  assert.equal(underwater.collect(locker, locker.position.clone(), true), true);
  assert.equal(world.collected.has('wreck:sealed-locker'), true);
  assert.equal(collected.length, 2);
  assert.equal(collected[0].type, 'wreckKey');
  assert.equal(collected[1].type, 'wreckCache');
  assert.deepEqual(locker.loot, { oxygenTank: 1, divingFins: 1, scrap: 3, rope: 2, pearl: 1 });

  const journal = underwater.wreck.journal;
  underwater.update(0, diver);
  assert.equal(underwater.collect(journal, journal.position.clone(), true), true);
  assert.equal(underwater.collect(journal, journal.position.clone(), true), false);
  assert.equal(world.collected.has('wreck:captains-log'), true);
  assert.equal(collected.filter(event => event.type === 'wreckJournal').length, 1);
  underwater.dispose();
});

test('Diver must be submerged, nearby, and inside the loaded radius to collect a seabed pickup', () => {
  const { world, bus } = makeWorld();
  const underwater = new UnderwaterWorld(new THREE.Scene(), world, bus);
  underwater.update(0, new THREE.Vector3(0, -8, 0));
  const resource = underwater.nearby[0];
  assert.ok(resource);
  assert.equal(underwater.collect(resource, resource.position.clone(), false), false);
  assert.equal(underwater.collect(resource, resource.position.clone().add(new THREE.Vector3(4, 0, 0)), true), false);
  assert.equal(world.collected.has(resource.id), false);
  underwater.update(0, new THREE.Vector3(500, -10, 500));
  assert.equal(underwater.collect(resource, resource.position.clone(), true), false, 'stale unloaded chunks cannot be collected');
  underwater.dispose();
});
