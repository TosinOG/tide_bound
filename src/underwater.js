import * as THREE from 'three';
import { seededRandom, hash2, clamp } from './systems.js';
import { disposeObject } from './assets.js';
import { COLLISION_LAYERS } from './raft-collision.js';

export const UNDERWATER_CHUNK_SIZE = 52;
export const DIVE_OXYGEN_BASE = 56;
export const DIVE_OXYGEN_PER_TANK = 44;
export const DIVE_OXYGEN_MAX = 124;
export const UNDERWATER_RESOURCE_TYPES = Object.freeze(['seaweed', 'shell', 'ironOre', 'pearl', 'deepCrystal']);

const COLORS = Object.freeze({
  shallow: new THREE.Color(0x325c55), middle: new THREE.Color(0x234c52), deep: new THREE.Color(0x172f47),
  kelp: 0x48876d, kelpLight: 0x84b87b, shell: 0xcba98a, shellDark: 0x795d52,
  iron: 0x7f8a86, ironEdge: 0x39474b, pearl: 0xf7eee0, crystal: 0x54c3cf,
});

function mod(value, divisor) { return ((value % divisor) + divisor) % divisor; }
function smoother(t) { return t * t * (3 - 2 * t); }
function valueNoise(x, z, seed = 0) {
  const ix = Math.floor(x), iz = Math.floor(z), fx = smoother(x - ix), fz = smoother(z - iz);
  const value = (a, b) => hash2(a, b, seed) * 2 - 1;
  const a = THREE.MathUtils.lerp(value(ix, iz), value(ix + 1, iz), fx);
  const b = THREE.MathUtils.lerp(value(ix, iz + 1), value(ix + 1, iz + 1), fx);
  return THREE.MathUtils.lerp(a, b, fz);
}

function safeTerrainHeight(world, x, z) {
  const terrain = world?.terrainHeight?.(x, z);
  if (Number.isFinite(terrain)) return terrain;
  return -5;
}

function groundColor(height) {
  if (height < -22) return COLORS.deep;
  if (height < -8) return COLORS.middle;
  return COLORS.shallow;
}

function makeBladeGeometry(height, bend, phase) {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(bend * .16, height * .42, 0),
    new THREE.Vector3(bend * .60, height * .78, .015 * Math.sin(phase)),
    new THREE.Vector3(bend, height, .02 * Math.cos(phase)),
  ]);
  return new THREE.TubeGeometry(curve, 7, .047, 4, false);
}

function makeResourceAppearance(resource, random, materialCache) {
  const group = new THREE.Group();
  if (resource.type === 'seaweed') {
    const groundMat = materialCache.kelp;
    const tipsMat = materialCache.kelpLight;
    for (let blade = 0; blade < 3; blade++) {
      const height = .50 + random() * .35;
      const geometry = makeBladeGeometry(height, (random() - .5) * .33, random() * Math.PI * 2);
      const mesh = new THREE.Mesh(geometry, blade === 1 ? tipsMat : groundMat);
      mesh.position.x = (random() - .5) * .18;
      mesh.rotation.y = random() * Math.PI * 2;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      group.add(mesh);
    }
  } else if (resource.type === 'shell') {
    const shell = new THREE.Mesh(new THREE.SphereGeometry(.26, 9, 7, 0, Math.PI * 2, 0, Math.PI * .48), materialCache.shell);
    shell.scale.set(1.28, .75, .92);
    shell.rotation.z = Math.PI;
    shell.position.y = .12;
    group.add(shell);
    const ridge = new THREE.Mesh(new THREE.TorusGeometry(.21, .018, 4, 9, Math.PI), materialCache.shellDark);
    ridge.rotation.x = Math.PI / 2;
    ridge.position.y = .17;
    group.add(ridge);
  } else if (resource.type === 'ironOre') {
    for (let i = 0; i < 4; i++) {
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(.18 + random() * .13, 0), i % 2 ? materialCache.iron : materialCache.ironEdge);
      rock.position.set((random() - .5) * .35, .08 + random() * .13, (random() - .5) * .3);
      rock.rotation.set(random() * .7, random() * Math.PI, random() * .5);
      rock.scale.y = .62 + random() * .4;
      group.add(rock);
    }
  } else if (resource.type === 'pearl') {
    const shell = new THREE.Mesh(new THREE.SphereGeometry(.29, 10, 7, 0, Math.PI * 2, 0, Math.PI * .53), materialCache.shell);
    shell.rotation.x = Math.PI;
    shell.position.y = .1;
    group.add(shell);
    const pearl = new THREE.Mesh(new THREE.SphereGeometry(.095, 12, 8), materialCache.pearl);
    pearl.position.set(0, .19, -.015);
    pearl.material = materialCache.pearl;
    group.add(pearl);
  } else {
    const shard = new THREE.Mesh(new THREE.OctahedronGeometry(.3, 0), materialCache.crystal);
    shard.scale.set(.67, 1.18, .72);
    shard.position.y = .22;
    group.add(shard);
    const inner = new THREE.Mesh(new THREE.OctahedronGeometry(.14, 0), materialCache.pearl);
    inner.position.set(.04, .24, .02);
    group.add(inner);
  }
  return group;
}

function chunkTheme(chunkX, chunkZ, seed) {
  return hash2(chunkX, chunkZ, seed);
}

/**
 * Finite, streamed seabed resources and a hand-authored wreck landmark.
 * Collection IDs are shared with WorldGenerator's persisted collected set so
 * resources can safely unload/reload without resetting loot.
 */
export class UnderwaterWorld {
  constructor(scene, world, bus, saved = {}) {
    this.scene = scene;
    this.world = world;
    this.bus = bus;
    this.chunkSize = UNDERWATER_CHUNK_SIZE;
    this.chunks = new Map();
    this.nearby = [];
    this.elapsed = 0;
    this.lastCenter = '';
    this.quality = { foliage: .65, detailDistance: 100, viewDistance: 170 };
    this.disposed = false;
    this.group = new THREE.Group();
    this.group.name = 'Tidebound underwater biomes';
    this.scene.add(this.group);
    this.materials = {
      kelp: new THREE.MeshStandardMaterial({ color: COLORS.kelp, roughness: .76, side: THREE.DoubleSide }),
      kelpLight: new THREE.MeshStandardMaterial({ color: COLORS.kelpLight, roughness: .7, side: THREE.DoubleSide }),
      shell: new THREE.MeshStandardMaterial({ color: COLORS.shell, roughness: .68, side: THREE.DoubleSide }),
      shellDark: new THREE.MeshStandardMaterial({ color: COLORS.shellDark, roughness: .75 }),
      iron: new THREE.MeshStandardMaterial({ color: COLORS.iron, roughness: .86, metalness: .36 }),
      ironEdge: new THREE.MeshStandardMaterial({ color: COLORS.ironEdge, roughness: .86, metalness: .28 }),
      pearl: new THREE.MeshStandardMaterial({ color: COLORS.pearl, roughness: .2, metalness: .12, emissive: 0x3e2920, emissiveIntensity: .08 }),
      crystal: new THREE.MeshStandardMaterial({ color: COLORS.crystal, roughness: .22, metalness: .16, emissive: 0x0e6573, emissiveIntensity: .42 }),
      wreckWood: new THREE.MeshStandardMaterial({ color: 0x493a2e, roughness: .92, side: THREE.DoubleSide }),
      wreckWoodLight: new THREE.MeshStandardMaterial({ color: 0x735741, roughness: .9, side: THREE.DoubleSide }),
      wreckMetal: new THREE.MeshStandardMaterial({ color: 0x667975, roughness: .82, metalness: .38 }),
      wreckGold: new THREE.MeshStandardMaterial({ color: 0xc79d5c, roughness: .63, metalness: .35, emissive: 0x281503, emissiveIntensity: .12 }),
      wreckGlass: new THREE.MeshStandardMaterial({ color: 0x5bb8b2, roughness: .28, metalness: .1, transparent: true, opacity: .48 }),
      wreckGlow: new THREE.MeshStandardMaterial({ color: 0x8bdbcf, roughness: .4, emissive: 0x3b8b88, emissiveIntensity: .6 }),
    };
    for (const material of Object.values(this.materials)) material.userData.shared = true;
    this.wreck = this.createWreck();
    this.setQuality(this.quality);
    void saved;
  }

  floorAt(x, z) {
    const terrain = safeTerrainHeight(this.world, x, z);
    const seabedNoise = valueNoise(x * .034, z * .034, 7321) * 1.7 + valueNoise(x * .11, z * .11, 921) * .42;
    let shoreDistance = Infinity;
    for (const island of this.world.islands) {
      const radius = island.plan?.extent ?? island.radius * 1.12;
      shoreDistance = Math.min(shoreDistance, Math.max(0, Math.hypot(x - island.x, z - island.z) - radius));
    }
    // The surface-world generator intentionally treats open ocean as a shallow
    // collision plane. Continue it into a separate, gradual underwater basin so
    // divers have real depth to explore without changing raft/island physics.
    const basin = -7.5 - Math.min(30, Number.isFinite(shoreDistance) ? shoreDistance * .115 : 8);
    const depth = Math.min(terrain + seabedNoise * (terrain < -18 ? 1 : .5), basin + seabedNoise * .42);
    return Math.min(depth, -.55);
  }

  seabedAt(x, z) { return this.floorAt(x, z); }

  oxygenCapacity(inventory) {
    const count = Math.max(0, Number(inventory?.count?.('oxygenTank') ?? inventory?.oxygenTank ?? 0) || 0);
    return Math.min(DIVE_OXYGEN_MAX, DIVE_OXYGEN_BASE + count * DIVE_OXYGEN_PER_TANK);
  }

  oxygenDrainRate(depth, inventory) {
    const equipped = Number(inventory?.count?.('oxygenTank') ?? inventory?.oxygenTank ?? 0) > 0;
    const depthFactor = clamp(1 + Math.max(0, Number(depth) || 0) / 52, 1, 1.65);
    return (equipped ? .74 : 1) * depthFactor;
  }

  setQuality(quality = {}) {
    this.quality = {
      foliage: clamp(Number(quality.foliage ?? .65), 0, 1),
      detailDistance: clamp(Number(quality.detailDistance ?? 100), 55, 300),
      viewDistance: clamp(Number(quality.viewDistance ?? 170), 80, 420),
    };
    for (const chunk of this.chunks.values()) this.applyChunkQuality(chunk);
  }

  createChunk(chunkX, chunkZ) {
    const key = `${chunkX},${chunkZ}`;
    const random = seededRandom(Math.floor(hash2(chunkX, chunkZ, 68531) * 0xffffffff));
    const group = new THREE.Group();
    group.name = `Underwater seabed ${key}`;
    group.position.set(chunkX * this.chunkSize, 0, chunkZ * this.chunkSize);
    const size = this.chunkSize, segments = this.quality.foliage < .38 ? 18 : 27;
    const positions = [], colors = [], indices = [];
    for (let z = 0; z <= segments; z++) {
      for (let x = 0; x <= segments; x++) {
        const lx = x / segments * size, lz = z / segments * size;
        const wx = group.position.x + lx, wz = group.position.z + lz;
        const floor = this.floorAt(wx, wz);
        const height = Math.min(floor, -.6);
        const noise = (valueNoise(wx * .08, wz * .08, 3421) + 1) * .5;
        const color = groundColor(height).clone().lerp(new THREE.Color(0x687465), noise * .17);
        positions.push(lx, height, lz);
        colors.push(color.r, color.g, color.b);
        if (x < segments && z < segments) {
          const a = z * (segments + 1) + x, b = a + 1, c = a + segments + 1, d = c + 1;
          indices.push(a, c, b, b, c, d);
        }
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    const bed = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0xffffff, vertexColors: true, roughness: .98, metalness: 0, side: THREE.DoubleSide }));
    bed.receiveShadow = false;
    bed.frustumCulled = true;
    group.add(bed);

    const resources = [];
    const density = this.quality.foliage;
    const count = density < .28 ? 2 : density < .58 ? 3 : 5;
    for (let i = 0; i < count; i++) {
      const x = group.position.x + (random() * .82 + .09) * size;
      const z = group.position.z + (random() * .82 + .09) * size;
      const floor = this.floorAt(x, z);
      if (floor > -1.1) continue;
      const roll = random();
      const type = roll < .43 ? 'seaweed' : roll < .67 ? 'shell' : roll < .82 ? 'ironOre' : roll < .95 ? 'pearl' : 'deepCrystal';
      if ((type === 'pearl' || type === 'deepCrystal') && floor > -8) continue;
      const id = `sea:${key}:${i}`;
      if (this.world.collected.has(id)) continue;
      const resource = {
        id, type, name: ({ seaweed: 'Tide kelp', shell: 'Seashell', ironOre: 'Seabed iron', pearl: 'Pearl oyster', deepCrystal: 'Abyss crystal' })[type],
        icon: ({ seaweed: 'leaf', shell: 'shell', ironOre: 'ore', pearl: 'pearl', deepCrystal: 'crystal' })[type],
        amount: ({ seaweed: 2, shell: 1, ironOre: 2, pearl: 1, deepCrystal: 1 })[type],
        position: new THREE.Vector3(x, floor + .15, z), requiresDive: true, collected: false,
        source: 'underwater', action: 'collect', region: null, chunkKey: key,
      };
      resource.mesh = makeResourceAppearance(resource, random, this.materials);
      resource.mesh.position.copy(resource.position);
      resource.mesh.userData.resourceId = id;
      resource.mesh.traverse(object => { if (object.isMesh) { object.castShadow = false; object.receiveShadow = false; } });
      group.add(resource.mesh);
      resources.push(resource);
    }
    const chunk = { key, chunkX, chunkZ, group, resources, bed, lastQuality: density };
    this.group.add(group);
    this.applyChunkQuality(chunk);
    return chunk;
  }

  applyChunkQuality(chunk) {
    const distance = chunk.group.userData.distance ?? Infinity;
    const visible = distance <= this.quality.viewDistance + this.chunkSize;
    chunk.group.visible = visible;
    chunk.bed.visible = distance <= this.quality.detailDistance + this.chunkSize;
    for (const resource of chunk.resources) {
      resource.mesh.visible = !this.world.collected.has(resource.id) && distance <= this.quality.detailDistance + this.chunkSize;
    }
  }

  update(dt, position) {
    if (this.disposed || !position) return;
    this.elapsed += dt;
    const cx = Math.floor(position.x / this.chunkSize), cz = Math.floor(position.z / this.chunkSize);
    const centerKey = `${cx},${cz}`;
    if (centerKey !== this.lastCenter) {
      this.lastCenter = centerKey;
      const needed = new Set();
      for (let x = cx - 1; x <= cx + 1; x++) for (let z = cz - 1; z <= cz + 1; z++) needed.add(`${x},${z}`);
      for (const [key, chunk] of this.chunks) {
        if (!needed.has(key)) {
          this.group.remove(chunk.group);
          disposeObject(chunk.group);
          this.chunks.delete(key);
        }
      }
      for (const key of needed) {
        if (this.chunks.has(key)) continue;
        const [x, z] = key.split(',').map(Number);
        this.chunks.set(key, this.createChunk(x, z));
      }
    }
    this.nearby.length = 0;
    for (const chunk of this.chunks.values()) {
      const centerX = chunk.group.position.x + this.chunkSize * .5;
      const centerZ = chunk.group.position.z + this.chunkSize * .5;
      const distance = Math.hypot(position.x - centerX, position.z - centerZ);
      chunk.group.userData.distance = distance;
      this.applyChunkQuality(chunk);
      if (distance < this.chunkSize * 1.45) for (const resource of chunk.resources) {
        if (!resource.collected && !this.world.collected.has(resource.id)) this.nearby.push(resource);
      }
    }
    if (this.wreck) this.updateWreck(position);
  }

  nearestResource(position, max = 3.1, diving = false) {
    if (!diving || !position) return null;
    let best = max, nearest = null;
    for (const resource of this.nearby) {
      const d = position.distanceTo(resource.position);
      if (d < best && Math.abs(position.y - resource.position.y) < 2.35) { best = d; nearest = resource; }
    }
    if (nearest) return { ...nearest, source: 'underwater', original: nearest, island: nearest.region || this.wreck?.region || null, distance: best };
    return null;
  }

  collect(resource, position, diving = false) {
    const original = resource?.original || resource;
    if (!original || !diving || original.collected || !this.nearby.includes(original) || this.world.collected.has(original.id)) return false;
    if (position && (position.distanceTo(original.position) > 3.2 || Math.abs(position.y - original.position.y) > 2.35)) return false;
    if (original.requiresKey && !this.wreckHasKey()) {
      this.bus.emit('islandHint', 'A brass key is missing. Search the wreck’s open deck before trying the locker.');
      return false;
    }
    original.collected = true;
    this.world.collected.add(original.id);
    const nearbyIndex = this.nearby.indexOf(original);
    if (nearbyIndex >= 0) this.nearby.splice(nearbyIndex, 1);
    if (original.mesh) original.mesh.visible = false;
    this.refreshWreckResources();
    this.bus.emit('resourceCollected', { type: original.type, island: original.region || this.wreck?.region || null, resource: original });
    return true;
  }

  createWreck() {
    // WorldGenerator has a deterministic named island at 28,-61. Pinning the
    // landmark to it keeps the wreck in the same chart location across saves.
    const originIsland = this.world.islands.find(island => island.id === '0,-1') || null;
    const center = { x: originIsland?.x ?? 28, z: originIsland?.z ?? -61 };
    const random = seededRandom(0x51c0ffee);
    const bearing = Math.atan2(center.z + 18, center.x + 6);
    const x = center.x + Math.cos(bearing + .72) * 32;
    const z = center.z + Math.sin(bearing + .72) * 32;
    const y = Math.min(-7.5, this.floorAt(x, z) + 1.8);
    const group = new THREE.Group();
    group.name = 'The Lanternwake — accessible sunken wreck';
    group.position.set(x, y, z);
    group.rotation.y = bearing - .2;
    group.rotation.z = -.12;
    const region = { id: 'lanternwake', name: 'The Lanternwake wreck', x, z };
    const materials = this.materials, wreckColliders = [];
    const addBox = (name, sx, sy, sz, material, px, py, pz, ry = 0, rz = 0) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), material);
      mesh.name = name;
      mesh.position.set(px, py, pz);
      mesh.rotation.set(0, ry, rz);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
      const deck = name === 'Wreck keel' || name.startsWith('Loose deck plank') || name === 'Ironbound helm chest';
      wreckColliders.push({ layer: COLLISION_LAYERS.wreckSolid, blockType: 'wreck', cx: px, cz: pz, hx: sx / 2, hz: sz / 2, rotation: ry, minY: py - sy / 2, maxY: py + sy / 2, surfaceY: deck ? py + sy / 2 : null, deck });
      return mesh;
    };
    // Keel and the two broken sides form a readable, open passage. The open bow
    // and stern are navigation gaps; they remain wider than the player capsule.
    addBox('Wreck keel', 12, .42, .55, materials.wreckWood, 0, .22, .1, 0, .02);
    addBox('Wreck port rail', 10.3, 1.05, .34, materials.wreckWoodLight, -4.8, .73, -1.7, -.08, -.16);
    addBox('Wreck starboard rail', 9.8, .93, .34, materials.wreckWood, 4.5, .68, -1.6, .09, .12);
    addBox('Broken stern rail', 3.8, .72, .32, materials.wreckWoodLight, -3.8, .61, 1.8, .35, .10);
    addBox('Split fore rail', 2.8, .66, .32, materials.wreckWood, 4.6, .52, 1.55, -.34, -.14);
    for (let i = 0; i < 7; i++) {
      const deck = addBox(`Loose deck plank ${i + 1}`, 1.05 + random() * .6, .1, 2.1 + random() * .45,
        i % 2 ? materials.wreckWood : materials.wreckWoodLight,
        -4.2 + i * 1.25, .49 + random() * .12, random() * 1.1 - .3,
        (random() - .5) * .26, (random() - .5) * .11);
      deck.rotation.x = (random() - .5) * .06;
    }
    // Open ribs, glass lantern and a broken mast make the wreck legible at depth.
    for (let i = 0; i < 5; i++) {
      const xRib = -3.7 + i * 1.85;
      const rib = new THREE.Mesh(new THREE.TorusGeometry(1.6 + (i % 2) * .12, .09, 5, 10, Math.PI * 1.34), materials.wreckWoodLight);
      rib.position.set(xRib, 1.05, -.15);
      rib.rotation.x = Math.PI / 2;
      rib.rotation.z = i % 2 ? .04 : -.03;
      rib.castShadow = true;
      group.add(rib);
    }
    addBox('Broken mast foot', .32, 3.1, .32, materials.wreckWood, 0, 1.55, -.12, .06, -.28);
    const mastBeam = new THREE.Mesh(new THREE.BoxGeometry(.20, 5.3, .18), materials.wreckWoodLight);
    mastBeam.position.set(-.8, 3.4, 0);
    mastBeam.rotation.z = .26;
    mastBeam.rotation.x = -.06;
    mastBeam.castShadow = true;
    group.add(mastBeam);
    const sail = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 1.55, 5, 4), new THREE.MeshStandardMaterial({ color: 0x8a8571, roughness: 1, side: THREE.DoubleSide, transparent: true, opacity: .54 }));
    sail.position.set(-.42, 3.2, -.15);
    sail.rotation.y = .16;
    sail.rotation.z = -.15;
    group.add(sail);
    addBox('Ironbound helm chest', 1.05, .68, .74, materials.wreckWood, -5.7, .58, .85, -.16, .03);
    addBox('Chest brass bands', 1.1, .1, .8, materials.wreckGold, -5.7, .65, .85);
    for (const side of [-1, 1]) {
      const porthole = new THREE.Mesh(new THREE.TorusGeometry(.35, .07, 7, 18), materials.wreckMetal);
      porthole.position.set(side * 4.8, .9, -1.85);
      porthole.rotation.y = Math.PI / 2;
      group.add(porthole);
      const glass = new THREE.Mesh(new THREE.CircleGeometry(.30, 16), materials.wreckGlass);
      glass.position.copy(porthole.position);
      glass.rotation.y = Math.PI / 2;
      group.add(glass);
    }
    const lantern = new THREE.Group();
    lantern.position.set(.45, 1.1, 1.1);
    const lanternFrame = new THREE.Mesh(new THREE.CylinderGeometry(.28, .34, .7, 7, 1, true), materials.wreckMetal);
    lantern.add(lanternFrame);
    const lanternGlass = new THREE.Mesh(new THREE.SphereGeometry(.22, 8, 7), materials.wreckGlow);
    lanternGlass.scale.y = 1.3;
    lantern.add(lanternGlass);
    const lanternCap = new THREE.Mesh(new THREE.ConeGeometry(.3, .24, 7), materials.wreckGold);
    lanternCap.position.y = .43;
    lantern.add(lanternCap);
    group.add(lantern);
    const light = new THREE.PointLight(0x73d6d3, 1.2, 10, 1.8);
    light.position.set(.45, 1.3, 1.1);
    group.add(light);

    const resources = [];
    const addWreckResource = (id, type, name, action, localPosition, options = {}) => {
      group.updateMatrixWorld(true);
      const position = group.localToWorld(new THREE.Vector3(...localPosition));
      const resource = {
        id: `wreck:${id}`, type, name, icon: options.icon || 'compass', action, position,
        amount: options.amount || 1, story: options.story || '', requiresDive: true, collected: false,
        source: 'underwater', region, regionName: region.name, localPosition,
      };
      const marker = new THREE.Group();
      marker.name = name;
      if (type === 'wreckKey') {
        const keyMesh = new THREE.Mesh(new THREE.TorusGeometry(.18, .045, 6, 12), materials.wreckGold);
        keyMesh.rotation.x = Math.PI / 2;
        marker.add(keyMesh);
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(.035, .035, .45, 6), materials.wreckGold);
        stem.rotation.z = Math.PI / 2;
        marker.add(stem);
      } else if (type === 'wreckJournal') {
        const book = new THREE.Mesh(new THREE.BoxGeometry(.48, .13, .34), materials.wreckWoodLight);
        book.rotation.y = .24;
        marker.add(book);
        const page = new THREE.Mesh(new THREE.PlaneGeometry(.34, .25), materials.wreckGold);
        page.rotation.x = -Math.PI / 2;
        page.position.y = .08;
        marker.add(page);
      } else {
        const chest = new THREE.Mesh(new THREE.BoxGeometry(.5, .38, .38), materials.wreckGold);
        chest.position.y = .2;
        marker.add(chest);
        const glow = new THREE.Mesh(new THREE.SphereGeometry(.14, 8, 6), materials.wreckGlow);
        glow.position.y = .52;
        marker.add(glow);
      }
      marker.position.set(...localPosition);
      marker.traverse(object => { if (object.isMesh) { object.castShadow = true; object.receiveShadow = true; } });
      group.add(marker);
      resource.mesh = marker;
      resource.mesh.userData.resourceId = resource.id;
      resources.push(resource);
      return resource;
    };
    const key = addWreckResource('brass-key', 'wreckKey', 'Lanternwake brass key', 'take', [-4.7, .72, -.35], { icon: 'key', story: 'A heavy brass key, still bright beneath the salt. Its bow bears the same lighthouse mark found on the old charts.' });
    const journal = addWreckResource('captains-log', 'wreckJournal', 'Captain’s waterlogged log', 'read', [1.65, .79, .48], { icon: 'book', story: 'Captain’s log — Lanternwake, last entry. The storm took our mast, not our course. Follow the bell buoy down to the blue shelf; the keeper hid the breathing gear where the kelp bends west.' });
    const cache = addWreckResource('sealed-locker', 'wreckCache', 'Keeper’s sealed locker', 'unlock', [-5.7, .98, .85], { icon: 'chest', story: 'Inside the locker: a pressure-rated oxygen tank, a pair of brass diving fins, an old chart, and the crew’s recovered stores.', loot: { oxygenTank: 1, divingFins: 1, scrap: 3, rope: 2, pearl: 1 } });
    cache.requiresKey = true;
    cache.keyId = key.id;
    cache.journalId = journal.id;
    cache.loot = { oxygenTank: 1, divingFins: 1, scrap: 3, rope: 2, pearl: 1 };
    const bell = new THREE.Mesh(new THREE.TorusGeometry(.42, .10, 8, 16), materials.wreckGold);
    bell.position.set(7.15, 2.2, -.5);
    bell.rotation.x = Math.PI / 2;
    group.add(bell);
    const bellClapper = new THREE.Mesh(new THREE.SphereGeometry(.12, 8, 6), materials.wreckGold);
    bellClapper.position.set(7.15, 1.68, -.5);
    group.add(bellClapper);
    this.group.add(group);
    this.wreckResources = resources;
    this.wreck = { group, position: new THREE.Vector3(x, y, z), region, resources, key, journal, cache, light, bell, colliders: wreckColliders, originIsland };
    this.refreshWreckResources();
    return this.wreck;
  }

  wreckHasKey() { return this.world.collected.has(this.wreck.key.id); }
  wreckHasJournal() { return this.world.collected.has(this.wreck.journal.id); }
  isWreckCache(resource) { return (resource?.original || resource)?.id === this.wreck.cache.id; }

  updateWreck(player) {
    if (!this.wreck) return;
    const d = Math.hypot(player.x - this.wreck.position.x, player.z - this.wreck.position.z);
    this.wreck.group.visible = d < this.quality.viewDistance + 90;
    this.wreck.light.intensity = this.wreck.group.visible ? 1.05 + Math.sin(this.elapsed * 2.2) * .16 : 0;
    this.refreshWreckResources();
    if (d < 42) for (const resource of this.wreck.resources) {
      if (!this.world.collected.has(resource.id) && (!resource.requiresKey || this.wreckHasKey())) this.nearby.push(resource);
    }
    if (d < 52 && !this.world.discovered.has('wreck:lanternwake')) {
      this.world.discovered.add('wreck:lanternwake');
      this.bus.emit('landmarkDiscovered', { id: 'lanternwake', name: 'The Lanternwake', type: 'wreck', position: this.wreck.position.clone() });
    }
  }

  refreshWreckResources() {
    if (!this.wreck) return;
    for (const resource of this.wreck.resources) {
      const collected = this.world.collected.has(resource.id);
      resource.collected = collected;
      if (resource.mesh) resource.mesh.visible = !collected;
    }
    this.wreck.cache.mesh.visible = !this.world.collected.has(this.wreck.cache.id) && this.wreckHasKey();
  }

  toJSON() { return { version: 1 }; }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    for (const chunk of this.chunks.values()) disposeObject(chunk.group);
    this.chunks.clear();
    if (this.wreck?.group) disposeObject(this.wreck.group);
    this.group.removeFromParent();
    for (const material of Object.values(this.materials)) material.dispose();
    this.materials = {};
    this.nearby.length = 0;
  }
}

export function getOxygenCapacity(inventory) {
  const count = Math.max(0, Number(inventory?.count?.('oxygenTank') ?? inventory?.oxygenTank ?? 0) || 0);
  return Math.min(DIVE_OXYGEN_MAX, DIVE_OXYGEN_BASE + count * DIVE_OXYGEN_PER_TANK);
}

export function getOxygenDrainRate(depth, hasTank = false) {
  const depthFactor = clamp(1 + Math.max(0, Number(depth) || 0) / 52, 1, 1.65);
  return (hasTank ? .74 : 1) * depthFactor;
}
