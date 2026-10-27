import { clamp } from './systems.js';

export const PLAYER_COLLISION = Object.freeze({
  radius: .27,
  standingHeight: 1.72,
  swimmingHeight: .92,
  stepHeight: .46,
  collisionSkin: .012,
});

export const COLLISION_LAYERS = Object.freeze({
  player: 1,
  raftSolid: 2,
  islandTerrain: 4,
  seabed: 8,
  water: 16,
  collectible: 32,
  wreckSolid: 64,
});

const baseY = block => block.y === 0 ? 0 : .26 + block.y - 1;

/**
 * Coarse oriented boxes derived from the current build-piece meshes. They are
 * intentionally simple, but track the visible footprint, vertical placement,
 * and quarter-turn rotation of each buildable object.
 */
export function raftBlockColliders(block) {
  const y = baseY(block), rotation = ((block.rotation || 0) % 4) * Math.PI / 2;
  const make = (cx, cz, hx, hz, bottom, top, options = {}) => ({
    layer: COLLISION_LAYERS.raftSolid,
    blockType: block.type,
    blockId: block.id,
    cx: block.x + cx,
    cz: block.z + cz,
    hx,
    hz,
    rotation,
    minY: y + bottom,
    maxY: y + top,
    surfaceY: options.surfaceY === undefined ? null : y + options.surfaceY,
    deck: !!options.deck,
  });

  switch (block.type) {
    case 'foundation':
      return [make(0, 0, .5, .5, -.105, .255, { deck: true, surfaceY: .27 })];
    case 'floor':
      return [make(0, 0, .49, .49, -.105, .08, { deck: true, surfaceY: .08 })];
    case 'armor':
      return [make(0, 0, .49, .49, .0175, .0725, { deck: true, surfaceY: .073 })];
    case 'net':
      // The net is a buoyant open lattice. It supports the existing deck rules,
      // but divers and resources can pass through the real gaps in its mesh.
      return [];
    case 'wall':
      return [make(0, -.43, .5, .06, .08, .91)];
    case 'workbench':
      return [make(0, 0, .48, .36, 0, 1.01, { deck: true, surfaceY: 1.01 })];
    case 'purifier':
      return [make(0, 0, .40, .37, 0, .94, { deck: true, surfaceY: .94 })];
    case 'grill':
      return [make(0, 0, .36, .34, 0, .61, { deck: true, surfaceY: .61 })];
    case 'rainCollector':
      return [make(0, 0, .42, .42, 0, 1.0, { deck: true, surfaceY: 1.0 })];
    case 'windcatcher':
      return [make(0, 0, .34, .34, 0, 1.98, { deck: true, surfaceY: 1.98 })];
    case 'beacon':
      return [make(0, 0, .42, .40, 0, 2.68, { deck: true, surfaceY: 2.68 })];
    case 'sail':
      return [
        make(0, 0, .075, .075, 0, 2.94),
        make(0, .18, .44, .035, .82, 2.33),
      ];
    case 'stairs':
      // Treads are traversable; their height profile is handled as a ramp below.
      return [];
    default:
      return [];
  }
}

function toColliderSpace(x, z, collider) {
  const dx = x - collider.cx, dz = z - collider.cz;
  const c = Math.cos(collider.rotation), s = Math.sin(collider.rotation);
  return { x: dx * c - dz * s, z: dx * s + dz * c, c, s };
}

/** Circle-vs-oriented-rectangle penetration. Result is in raft-local X/Z. */
export function circleBoxPenetration(x, z, radius, collider) {
  if (!collider || ![COLLISION_LAYERS.raftSolid, COLLISION_LAYERS.wreckSolid].includes(collider.layer)) return null;
  const { x: localX, z: localZ, c, s } = toColliderSpace(x, z, collider);
  const closestX = clamp(localX, -collider.hx, collider.hx);
  const closestZ = clamp(localZ, -collider.hz, collider.hz);
  let nx = localX - closestX, nz = localZ - closestZ;
  const distance = Math.hypot(nx, nz);
  let penetration;
  if (distance > 1e-8) {
    if (distance >= radius) return null;
    nx /= distance;
    nz /= distance;
    penetration = radius - distance;
  } else {
    const choices = [
      { distance: localX + collider.hx + radius, x: -1, z: 0 },
      { distance: collider.hx + radius - localX, x: 1, z: 0 },
      { distance: localZ + collider.hz + radius, x: 0, z: -1 },
      { distance: collider.hz + radius - localZ, x: 0, z: 1 },
    ].sort((a, b) => a.distance - b.distance);
    ({ x: nx, z: nz, distance: penetration } = choices[0]);
  }
  // Inverse the collider's quarter-turn to return a raft-local displacement.
  return {
    x: (nx * c + nz * s) * (penetration + PLAYER_COLLISION.collisionSkin),
    z: (-nx * s + nz * c) * (penetration + PLAYER_COLLISION.collisionSkin),
    normalX: nx * c + nz * s,
    normalZ: -nx * s + nz * c,
    penetration,
    collider,
  };
}

/** Push a player capsule out of nearby solid raft pieces without adding impulse. */
export function resolveRaftHorizontal(x, z, colliders, footY, height, radius = PLAYER_COLLISION.radius) {
  let resultX = x, resultZ = z, collided = false, blockedX = false, blockedZ = false;
  for (let pass = 0; pass < 4; pass++) {
    let corrected = false;
    for (const collider of colliders || []) {
      if (footY >= collider.maxY || footY + height <= collider.minY) continue;
      const hit = circleBoxPenetration(resultX, resultZ, radius, collider);
      if (!hit) continue;
      resultX += hit.x;
      resultZ += hit.z;
      blockedX ||= Math.abs(hit.x) > 1e-5;
      blockedZ ||= Math.abs(hit.z) > 1e-5;
      collided = corrected = true;
    }
    if (!corrected) break;
  }
  return { x: resultX, z: resultZ, collided, blockedX, blockedZ };
}

/**
 * Resolve capsule motion through a slab or solid object. The deck is two-sided:
 * divers stop at its underside, while falling players land on its upper face.
 */
export function resolveRaftVertical(oldY, nextY, x, z, colliders, height, radius = PLAYER_COLLISION.radius, onRaft = false) {
  let y = nextY, grounded = false, blocked = false, resolved = false;
  for (const collider of colliders || []) {
    const footprint = circleBoxPenetration(x, z, radius + .03, collider);
    if (!footprint) continue;
    const top = collider.surfaceY ?? collider.maxY;
    const bottom = collider.minY;

    if (oldY >= top - .035 && nextY < top && nextY <= oldY && collider.deck) {
      y = Math.max(y, top);
      grounded = blocked = resolved = true;
      continue;
    }
    if (oldY + height <= bottom + .025 && nextY + height > bottom && nextY >= oldY) {
      y = Math.min(y, bottom - height);
      blocked = resolved = true;
      continue;
    }

    const startedInside = oldY < collider.maxY && oldY + height > bottom;
    if (startedInside && (onRaft || oldY >= top - .06) && collider.deck) {
      y = Math.max(y, top);
      grounded = blocked = resolved = true;
    } else if (startedInside && oldY + height > bottom && oldY < collider.maxY && !onRaft) {
      // Safe-load recovery and waterline hysteresis: an underwater capsule is
      // nudged below the deck rather than teleported through its collision face.
      y = Math.min(y, bottom - height);
      blocked = resolved = true;
    } else if (oldY >= collider.maxY && nextY < collider.maxY && nextY <= oldY) {
      y = Math.max(y, collider.maxY);
      if (collider.deck) grounded = true;
      blocked = resolved = true;
    } else if (oldY + height <= bottom && nextY + height > bottom && nextY >= oldY) {
      y = Math.min(y, bottom - height);
      blocked = resolved = true;
    }
  }
  return { y, grounded, blocked, resolved };
}

/** Local-space walk height for the deck, upper floor, plating, or stairs. */
export function raftWalkSurface(block, localX, localZ) {
  if (!block) return null;
  const dx = localX - block.x, dz = localZ - block.z;
  const angle = ((block.rotation || 0) % 4) * Math.PI / 2;
  const rampZ = dx * Math.sin(angle) + dz * Math.cos(angle);
  if (block.type === 'foundation' && block.y === 0) return .27;
  if (block.type === 'net' && block.y === 0) return .27;
  if (block.type === 'floor') return baseY(block) + .08;
  if (block.type === 'armor') return baseY(block) + .073;
  if (block.type === 'stairs') return baseY(block) + .08 + clamp(rampZ + .5, 0, 1);
  const upperSurface = raftBlockColliders(block).find(collider => collider.deck && collider.surfaceY !== null);
  return upperSurface?.surfaceY ?? null;
}
