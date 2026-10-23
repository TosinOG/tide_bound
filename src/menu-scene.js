import * as THREE from 'three';

const QUALITY = {
  low: { ratio: .75, ocean: 32, trees: .45, clouds: 4, birds: 2 },
  medium: { ratio: 1.25, ocean: 56, trees: .75, clouds: 7, birds: 4 },
  high: { ratio: 1.6, ocean: 88, trees: 1, clouds: 9, birds: 6 },
};

function randomStream(seed) {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/** A small, original menu diorama. It does not instantiate the gameplay world. */
export class MenuScene {
  constructor(container, settings = {}) {
    this.container = container;
    this.settings = settings;
    this.disposed = false;
    this.time = 0;
    this.lastFrame = null;
    this.pointer = new THREE.Vector2();
    this.reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.abort = new AbortController();
    const signal = this.abort.signal;

    this.renderer = new THREE.WebGLRenderer({ antialias: settings.quality !== 'low', powerPreference: 'low-power' });
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.renderer.domElement.id = 'menu-canvas';
    this.renderer.domElement.setAttribute('aria-hidden', 'true');
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x789a9b, 58, 190);
    this.camera = new THREE.PerspectiveCamera(41, innerWidth / innerHeight, .1, 360);
    this.camera.position.set(24, 12.5, 31);
    this.camera.lookAt(3, 2.3, -20);
    this.cameraBase = this.camera.position.clone();

    this.scene.add(new THREE.HemisphereLight(0xf3d7b0, 0x173e4b, 2.25));
    const sunLight = new THREE.DirectionalLight(0xffc982, 3.1);
    sunLight.position.set(-35, 45, 15);
    this.scene.add(sunLight);

    this.createSky();
    this.createOcean();
    this.createIsland();
    this.createRaft();
    this.createAtmosphere();
    this.setQuality(settings);

    addEventListener('resize', () => this.resize(), { signal });
    addEventListener('pointermove', event => {
      this.pointer.set(event.clientX / innerWidth * 2 - 1, event.clientY / innerHeight * 2 - 1);
    }, { signal, passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.stop();
      else this.start();
    }, { signal });
    this.frame = this.frame.bind(this);
    this.start();
  }

  createSky() {
    const material = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        top: { value: new THREE.Color(0x102c47) },
        middle: { value: new THREE.Color(0x7b8e99) },
        horizon: { value: new THREE.Color(0xe9ae7f) },
      },
      vertexShader: 'varying vec3 vPosition;void main(){vPosition=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader: `varying vec3 vPosition;uniform vec3 top,middle,horizon;
        void main(){float h=normalize(vPosition).y;vec3 color=mix(horizon,middle,smoothstep(-.04,.24,h));color=mix(color,top,smoothstep(.18,.82,h));gl_FragColor=vec4(color,1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        }`,
    });
    const sky = new THREE.Mesh(new THREE.SphereGeometry(260, 32, 18), material);
    this.scene.add(sky);

    const sun = new THREE.Mesh(new THREE.CircleGeometry(7, 48), new THREE.MeshBasicMaterial({ color: 0xffd39a, fog: false }));
    sun.position.set(-42, 25, -135);
    sun.lookAt(this.camera.position);
    this.scene.add(sun);
    const halo = new THREE.Mesh(new THREE.CircleGeometry(12, 48), new THREE.MeshBasicMaterial({ color: 0xffc88b, transparent: true, opacity: .1, depthWrite: false, fog: false }));
    halo.position.copy(sun.position).add(new THREE.Vector3(0, 0, .2));
    halo.quaternion.copy(sun.quaternion);
    this.scene.add(halo);
  }

  createOcean() {
    this.oceanGeometries = {};
    for (const [name, quality] of Object.entries(QUALITY)) {
      const geometry = new THREE.PlaneGeometry(360, 360, quality.ocean, quality.ocean);
      geometry.rotateX(-Math.PI / 2);
      this.oceanGeometries[name] = geometry;
    }
    this.oceanUniforms = { time: { value: 0 } };
    const material = new THREE.ShaderMaterial({
      uniforms: this.oceanUniforms,
      side: THREE.DoubleSide,
      vertexShader: `uniform float time;varying vec3 vWorld;varying float vWave;
        void main(){vec3 p=position;float a=sin(p.x*.19+p.z*.11+time*.55)*.18;float b=sin(p.z*.31-p.x*.07-time*.42)*.11;float c=sin((p.x+p.z)*.52+time*.8)*.035;p.y+=a+b+c;vWave=a+b+c;vec4 world=modelMatrix*vec4(p,1.);vWorld=world.xyz;gl_Position=projectionMatrix*viewMatrix*world;}`,
      fragmentShader: `uniform float time;varying vec3 vWorld;varying float vWave;
        void main(){vec3 dx=dFdx(vWorld),dy=dFdy(vWorld);vec3 n=normalize(cross(dx,dy));if(n.y<0.)n=-n;vec3 viewDir=normalize(cameraPosition-vWorld);vec3 sunDir=normalize(vec3(-.45,.38,-.8));float fresnel=pow(1.-max(dot(n,viewDir),0.),3.);float glitter=pow(max(dot(reflect(-sunDir,n),viewDir),0.),90.);float fine=sin(vWorld.x*2.1+vWorld.z*1.7+time)*.5+.5;vec3 deep=vec3(.025,.18,.23),teal=vec3(.08,.36,.39),sky=vec3(.38,.48,.50);vec3 color=mix(deep,teal,clamp(vWave*1.4+.48,0.,1.));color=mix(color,sky,fresnel*.48);color+=vec3(1.,.62,.25)*glitter*(.25+fine*.45);float haze=smoothstep(65.,180.,length(vWorld.xz-cameraPosition.xz));color=mix(color,vec3(.43,.53,.53),haze*.7);gl_FragColor=vec4(color,1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        }`,
    });
    this.ocean = new THREE.Mesh(this.oceanGeometries.medium, material);
    this.ocean.position.y = -.12;
    this.scene.add(this.ocean);
  }

  islandHeight(x, z) {
    const angle = Math.atan2(z, x);
    const distance = Math.hypot(x, z);
    const coast = 12.5 * (1 + Math.sin(angle * 3 + .8) * .07 + Math.sin(angle * 5 - .4) * .045);
    const f = Math.min(1.1, distance / coast);
    if (f >= 1) return -.65;
    const dome = Math.pow(1 - f, .72) * 7.2;
    const ridge = Math.max(0, Math.cos(angle - .35)) * Math.pow(1 - f, 1.7) * 3.8;
    const detail = (Math.sin(x * .7 + z * .35) + Math.cos(z * .63 - x * .18)) * .23 * (1 - f);
    return -.38 + dome + ridge + detail;
  }

  createIsland() {
    this.island = new THREE.Group();
    this.island.position.set(11, 0, -29);
    this.scene.add(this.island);
    const rings = 22, segments = 80;
    const positions = [], colors = [], indices = [];
    const sand = new THREE.Color(0xcbb57f), grass = new THREE.Color(0x315e48), rock = new THREE.Color(0x59645d);
    for (let ring = 0; ring <= rings; ring++) {
      for (let segment = 0; segment < segments; segment++) {
        const angle = segment / segments * Math.PI * 2;
        const f = ring / rings;
        const coast = 12.5 * (1 + Math.sin(angle * 3 + .8) * .07 + Math.sin(angle * 5 - .4) * .045);
        const x = Math.cos(angle) * coast * f, z = Math.sin(angle) * coast * f;
        const y = this.islandHeight(x, z);
        positions.push(x, y, z);
        let color;
        if (y < .55 || f > .87) color = sand.clone();
        else if (y > 5.8 || (Math.cos(angle - .35) > .65 && f > .38)) color = rock.clone();
        else color = grass.clone();
        color.offsetHSL(0, 0, Math.sin(x * 1.3 + z) * .025);
        colors.push(color.r, color.g, color.b);
      }
    }
    for (let ring = 0; ring < rings; ring++) for (let segment = 0; segment < segments; segment++) {
      const next = (segment + 1) % segments;
      const a = ring * segments + segment, b = ring * segments + next;
      const c = (ring + 1) * segments + segment, d = (ring + 1) * segments + next;
      indices.push(a, c, b, b, c, d);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    const terrain = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .96, flatShading: true }));
    this.island.add(terrain);

    const random = randomStream(91827);
    const count = 92;
    const trunks = new THREE.InstancedMesh(new THREE.CylinderGeometry(.09, .15, 1.9, 5), new THREE.MeshStandardMaterial({ color: 0x66503a, roughness: 1 }), count);
    const crowns = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 0), new THREE.MeshStandardMaterial({ color: 0x315c3f, roughness: 1, flatShading: true }), count);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const angle = random() * Math.PI * 2, radius = 2.6 + Math.sqrt(random()) * 7.4;
      const x = Math.cos(angle) * radius, z = Math.sin(angle) * radius;
      const y = this.islandHeight(x, z), scale = .65 + random() * .75;
      dummy.position.set(x, y + .85 * scale, z);
      dummy.scale.set(scale, scale, scale);
      dummy.rotation.set((random() - .5) * .12, random() * Math.PI, (random() - .5) * .15);
      dummy.updateMatrix(); trunks.setMatrixAt(i, dummy.matrix);
      dummy.position.y = y + 1.85 * scale;
      dummy.scale.set(1.25 * scale, .48 * scale, 1.25 * scale);
      dummy.updateMatrix(); crowns.setMatrixAt(i, dummy.matrix);
      crowns.setColorAt(i, new THREE.Color().setHSL(.31 + random() * .055, .3 + random() * .16, .23 + random() * .08));
    }
    trunks.instanceMatrix.needsUpdate = crowns.instanceMatrix.needsUpdate = true;
    if (crowns.instanceColor) crowns.instanceColor.needsUpdate = true;
    this.island.add(trunks, crowns);
    this.vegetation = [trunks, crowns];
    this.treeCount = count;

    const stone = new THREE.MeshStandardMaterial({ color: 0x8c8b73, roughness: .95 });
    const darkStone = new THREE.MeshStandardMaterial({ color: 0x656c60, roughness: 1 });
    const ruins = new THREE.Group();
    const rx = -1.2, rz = .4;
    const baseY = this.islandHeight(rx, rz);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(3.25, 3.65, .55, 8), darkStone);
    base.position.set(rx, baseY + .1, rz);
    ruins.add(base);
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * Math.PI * 2;
      const h = i === 1 || i === 4 ? 2.1 : 3.7;
      const column = new THREE.Mesh(new THREE.CylinderGeometry(.27, .36, h, 7), stone);
      column.position.set(rx + Math.cos(a) * 2.15, baseY + .45 + h / 2, rz + Math.sin(a) * 2.15);
      column.rotation.z = i === 4 ? .15 : 0;
      ruins.add(column);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(.8, .22, .8), darkStone);
      cap.position.set(column.position.x, column.position.y + h / 2, column.position.z);
      cap.rotation.y = a;
      ruins.add(cap);
    }
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(4.8, .38, .55), stone);
    lintel.position.set(rx, baseY + 4.25, rz - 2.05);
    ruins.add(lintel);
    const relic = new THREE.Mesh(new THREE.OctahedronGeometry(.48), new THREE.MeshStandardMaterial({ color: 0xd4ac5f, emissive: 0x6d4218, emissiveIntensity: .45, roughness: .45 }));
    relic.position.set(rx, baseY + 1.25, rz);
    ruins.add(relic);
    this.relic = relic;
    this.island.add(ruins);

    // A low, translucent shelf makes the island meet the water without a hard ring.
    const shallows = new THREE.Mesh(new THREE.CircleGeometry(16.5, 72), new THREE.MeshBasicMaterial({ color: 0x48a9a0, transparent: true, opacity: .17, depthWrite: false }));
    shallows.rotation.x = -Math.PI / 2;
    shallows.position.y = -.04;
    this.island.add(shallows);
  }

  createRaft() {
    this.raft = new THREE.Group();
    this.raft.position.set(5, .12, -8);
    this.raft.rotation.y = -.38;
    const wood = new THREE.MeshStandardMaterial({ color: 0x765035, roughness: .92 });
    const trim = new THREE.MeshStandardMaterial({ color: 0xb38958, roughness: .85 });
    for (let i = 0; i < 7; i++) {
      const log = new THREE.Mesh(new THREE.CylinderGeometry(.17, .19, 4.2, 7), wood);
      log.rotation.z = Math.PI / 2;
      log.position.set(0, 0, (i - 3) * .39);
      this.raft.add(log);
    }
    for (const z of [-1.1, 1.1]) {
      const brace = new THREE.Mesh(new THREE.BoxGeometry(4.5, .18, .2), trim);
      brace.position.set(0, .23, z);
      this.raft.add(brace);
    }
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(.09, .13, 6.4, 8), wood);
    mast.position.set(0, 3.15, 0);
    this.raft.add(mast);
    const yard = new THREE.Mesh(new THREE.CylinderGeometry(.055, .07, 4.8, 7), trim);
    yard.rotation.z = Math.PI / 2;
    yard.position.set(0, 5.35, 0);
    this.raft.add(yard);
    const sailGeometry = new THREE.PlaneGeometry(4.25, 3.8, 10, 8);
    const positions = sailGeometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i), y = positions.getY(i);
      positions.setZ(i, Math.cos(x / 4.25 * Math.PI) * .42 + Math.sin(y * 1.8) * .04);
    }
    sailGeometry.computeVertexNormals();
    const sail = new THREE.Mesh(sailGeometry, new THREE.MeshStandardMaterial({ color: 0xd9cba5, roughness: .9, side: THREE.DoubleSide }));
    sail.position.set(0, 3.45, .08);
    this.raft.add(sail);
    const stripe = new THREE.Mesh(new THREE.PlaneGeometry(.24, 3.45), new THREE.MeshBasicMaterial({ color: 0xa66b42, side: THREE.DoubleSide }));
    stripe.position.set(0, 3.45, .51);
    this.raft.add(stripe);
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(1.25, .58, 4, 1), new THREE.MeshStandardMaterial({ color: 0xb47a47, side: THREE.DoubleSide }));
    flag.position.set(.68, 6.12, 0);
    this.raft.add(flag);
    this.flag = flag;
    this.scene.add(this.raft);
  }

  createAtmosphere() {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 128;
    const context = canvas.getContext('2d');
    const random = randomStream(771);
    for (let i = 0; i < 12; i++) {
      const x = 40 + random() * 176, y = 50 + random() * 35, radius = 25 + random() * 32;
      const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, 'rgba(244,226,203,.6)');
      gradient.addColorStop(1, 'rgba(244,226,203,0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 256, 128);
    }
    this.cloudTexture = new THREE.CanvasTexture(canvas);
    this.cloudTexture.colorSpace = THREE.SRGBColorSpace;
    this.clouds = [];
    for (let i = 0; i < 9; i++) {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.cloudTexture, color: i % 2 ? 0xe9c4aa : 0xc5ced0, transparent: true, opacity: .36, depthWrite: false, fog: true }));
      sprite.position.set(-85 + i * 24, 19 + (i % 3) * 7, -95 - (i % 4) * 16);
      sprite.scale.set(45 + (i % 3) * 13, 15 + (i % 2) * 5, 1);
      this.scene.add(sprite);
      this.clouds.push(sprite);
    }
    this.birds = [];
    const birdMaterial = new THREE.LineBasicMaterial({ color: 0x243f49, transparent: true, opacity: .72 });
    for (let i = 0; i < 6; i++) {
      const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-.42, 0, 0), new THREE.Vector3(0, .16, 0), new THREE.Vector3(.42, 0, 0)]);
      const bird = new THREE.Line(geometry, birdMaterial);
      this.scene.add(bird);
      this.birds.push(bird);
    }
  }

  setQuality(settings = this.settings) {
    this.settings = settings;
    const quality = QUALITY[settings.quality] || QUALITY.medium;
    this.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, quality.ratio, settings.pixelRatio || 1.25));
    this.ocean.geometry = this.oceanGeometries[settings.quality] || this.oceanGeometries.medium;
    this.vegetation.forEach(mesh => { mesh.count = Math.max(1, Math.floor(this.treeCount * quality.trees)); });
    this.clouds.forEach((cloud, i) => { cloud.visible = i < quality.clouds; });
    this.birds.forEach((bird, i) => { bird.visible = i < quality.birds; });
    this.resize();
  }

  resize() {
    if (this.disposed) return;
    this.camera.aspect = innerWidth / innerHeight;
    // Portrait keeps the island and raft visible behind the stacked menu.
    this.camera.fov = innerWidth < 700 ? 52 : 41;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderOnce();
  }

  renderOnce() {
    if (!this.disposed) this.renderer.render(this.scene, this.camera);
  }

  start() {
    if (this.disposed || document.hidden) return;
    this.lastFrame = null;
    if (this.reducedMotion) { this.renderOnce(); return; }
    if (!this.animationFrame) this.animationFrame = requestAnimationFrame(this.frame);
  }

  stop() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
    this.lastFrame = null;
  }

  frame(now) {
    this.animationFrame = null;
    if (this.disposed || document.hidden) return;
    const dt = this.lastFrame === null ? 0 : Math.min(.05, Math.max(0, (now - this.lastFrame) / 1000));
    this.lastFrame = now;
    this.time += dt;
    this.oceanUniforms.time.value = this.time;
    this.raft.position.x = 5 + Math.sin(this.time * .075) * 3.2;
    this.raft.position.y = .16 + Math.sin(this.time * .72) * .11;
    this.raft.rotation.z = Math.sin(this.time * .53) * .018;
    this.raft.rotation.x = Math.sin(this.time * .41) * .012;
    this.flag.rotation.y = Math.sin(this.time * 1.3) * .12;
    this.relic.rotation.y = this.time * .25;
    this.relic.position.y += Math.sin(this.time * 1.1) * .0008;
    this.clouds.forEach((cloud, i) => { cloud.position.x += dt * (.11 + i * .009); });
    this.birds.forEach((bird, i) => {
      const angle = this.time * (.07 + i * .004) + i * 1.17;
      bird.position.set(11 + Math.cos(angle) * (15 + i), 9 + Math.sin(angle * 2) * 1.5 + i * .35, -29 + Math.sin(angle) * 12);
      bird.rotation.y = -angle;
      const positions = bird.geometry.attributes.position;
      positions.setY(0, Math.sin(this.time * 3.2 + i) * .13);
      positions.setY(2, Math.sin(this.time * 3.2 + i) * .13);
      positions.needsUpdate = true;
    });
    const targetX = this.cameraBase.x + this.pointer.x * .65;
    const targetY = this.cameraBase.y - this.pointer.y * .3;
    this.camera.position.x += (targetX - this.camera.position.x) * Math.min(1, dt * 1.5);
    this.camera.position.y += (targetY - this.camera.position.y) * Math.min(1, dt * 1.5);
    this.camera.lookAt(3, 2.3, -20);
    this.renderer.render(this.scene, this.camera);
    this.animationFrame = requestAnimationFrame(this.frame);
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.stop();
    this.abort.abort();
    const geometries = new Set(), materials = new Set(), textures = new Set();
    this.scene.traverse(object => {
      if (object.geometry) geometries.add(object.geometry);
      for (const material of (Array.isArray(object.material) ? object.material : [object.material])) {
        if (!material) continue;
        materials.add(material);
        for (const value of Object.values(material)) if (value?.isTexture) textures.add(value);
      }
    });
    Object.values(this.oceanGeometries).forEach(geometry => geometries.add(geometry));
    geometries.forEach(geometry => geometry.dispose());
    materials.forEach(material => material.dispose());
    textures.forEach(texture => texture.dispose());
    this.scene.clear();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.domElement.remove();
  }
}
