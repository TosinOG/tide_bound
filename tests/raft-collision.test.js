import test from 'node:test';
import assert from 'node:assert/strict';
import { COLLISION_LAYERS, PLAYER_COLLISION, circleBoxPenetration, raftBlockColliders, raftWalkSurface, resolveRaftHorizontal, resolveRaftVertical } from '../src/raft-collision.js';

const block = (type, x = 0, y = 0, z = 0, rotation = 0) => ({ type, x, y, z, rotation, id: `${type}:${x},${y},${z}` });

test('Foundations, upper floors and armor expose solid two-sided deck slabs with walkable tops', () => {
  for (const [type, y, top] of [['foundation', 0, .27], ['floor', 1, .34], ['armor', 0, .073]]) {
    const piece = block(type, 0, y), [collider] = raftBlockColliders(piece);
    assert.equal(collider.layer, COLLISION_LAYERS.raftSolid);
    assert.equal(collider.deck, true);
    assert.ok(collider.minY < collider.maxY);
    assert.equal(raftWalkSurface(piece, 0, 0), top);
  }
  assert.equal(raftBlockColliders(block('net')).length, 0, 'open net gaps remain traversable');
});

test('Station tops are walkable; oriented walls and equipment stop a standing capsule', () => {
  const station = block('workbench', 0, 1, 0);
  const surface = raftWalkSurface(station, 0, 0);
  assert.ok(surface > 1);
  const [wall] = raftBlockColliders(block('wall', 0, 1, 0, 1));
  assert.equal(wall.layer, COLLISION_LAYERS.raftSolid);
  assert.equal(wall.rotation, Math.PI / 2);
  const resolved = resolveRaftHorizontal(wall.cx, wall.cz, [wall], .27, PLAYER_COLLISION.standingHeight);
  assert.equal(resolved.collided, true);
  assert.ok(Math.hypot(resolved.x - wall.cx, resolved.z - wall.cz) > 0);
  const bench = raftBlockColliders(station)[0];
  assert.equal(resolveRaftHorizontal(bench.cx, bench.cz, [bench], .27, PLAYER_COLLISION.standingHeight).collided, true);
});

test('Walkable stairs provide a rotated ramp profile without a blocking full-height box', () => {
  const stairs = block('stairs', 0, 1, 0, 1);
  assert.equal(raftBlockColliders(stairs).length, 0);
  const low = raftWalkSurface(stairs, 0, -.5);
  const high = raftWalkSurface(stairs, 0, .5);
  assert.ok(high > low);
  assert.ok(low >= 0 && high <= 2);
});

test('Circle-versus-OBB pushes out of solid pieces and respects a swimmer beneath the deck', () => {
  const [foundation] = raftBlockColliders(block('foundation'));
  const penetration = circleBoxPenetration(0, 0, PLAYER_COLLISION.radius, foundation);
  assert.ok(penetration);
  const standing = resolveRaftHorizontal(0, 0, [foundation], .1, PLAYER_COLLISION.standingHeight);
  assert.equal(standing.collided, true);
  const onDeck = resolveRaftHorizontal(0, 0, [foundation], .27, PLAYER_COLLISION.standingHeight);
  assert.equal(onDeck.collided, false);
  const swimmer = resolveRaftHorizontal(0, 0, [foundation], -1.05, PLAYER_COLLISION.swimmingHeight);
  assert.equal(swimmer.collided, false, 'the submerged capsule fits below the visible foundation underside');
});

test('Vertical resolution lands on the deck and blocks ascent through its underside', () => {
  const [foundation] = raftBlockColliders(block('foundation'));
  const landing = resolveRaftVertical(1, .20, 0, 0, [foundation], PLAYER_COLLISION.standingHeight);
  assert.equal(landing.blocked, true);
  assert.equal(landing.grounded, true);
  assert.equal(landing.y, .27);
  const underside = resolveRaftVertical(-1.05, -.8, 0, 0, [foundation], PLAYER_COLLISION.swimmingHeight);
  assert.equal(underside.blocked, true);
  assert.equal(underside.grounded, false);
  assert.ok(underside.y + PLAYER_COLLISION.swimmingHeight <= foundation.minY + .001);
});

test('Wreck solids share OBB resolution without being mistaken for raft deck pieces', () => {
  const wreckWall = { layer: COLLISION_LAYERS.wreckSolid, cx: 2, cz: 3, hx: 1.5, hz: .2, rotation: .3, minY: -9, maxY: -7.8, surfaceY: null, deck: false };
  assert.ok(circleBoxPenetration(2, 3, PLAYER_COLLISION.radius, wreckWall));
  const resolved = resolveRaftHorizontal(2, 3, [wreckWall], -8.5, PLAYER_COLLISION.swimmingHeight);
  assert.equal(resolved.collided, true);
  assert.equal(resolveRaftVertical(-8.5, -8.4, 2, 3, [wreckWall], PLAYER_COLLISION.swimmingHeight).resolved, true);
});
