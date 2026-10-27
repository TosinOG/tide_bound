import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CONTROL_DEFINITIONS, CONTROL_LAYOUT_KEY, CONTROL_LAYOUT_VERSION,
  defaultControlLayout, normalizeControlLayout, readControlLayout,
  writeControlLayout, isTouchGameplayDevice,
} from '../src/mobile-controls.js';

const memoryStorage = () => {
  const data = new Map();
  return {
    data,
    getItem: key => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
    removeItem: key => data.delete(key),
  };
};

test('Mobile HUD has independent movement and camera joysticks plus complete action definitions', () => {
  const layout = defaultControlLayout();
  assert.equal(layout.version, CONTROL_LAYOUT_VERSION);
  assert.deepEqual(Object.keys(layout.controls), CONTROL_DEFINITIONS.map(control => control.id));
  assert.equal(CONTROL_DEFINITIONS.find(control => control.id === 'move').kind, 'joystick');
  assert.equal(CONTROL_DEFINITIONS.find(control => control.id === 'look').kind, 'joystick');
  for (const id of ['use', 'interact', 'jump', 'dive', 'swimUp', 'swimDown', 'attack', 'build', 'dismantle', 'helm', 'anchor', 'inventory', 'map', 'journal', 'pause']) {
    assert.ok(layout.controls[id], `missing ${id} control`);
  }
});

test('Layout coordinates, scale, opacity, joystick mode and shared settings normalize safely', () => {
  const layout = normalizeControlLayout({
    version: CONTROL_LAYOUT_VERSION,
    cameraSensitivity: 99,
    deadZone: -4,
    invertX: true,
    invertY: 'yes',
    controls: {
      move: { x: 12, y: -.4, scale: 3, opacity: 0, visible: false, showLabel: true, mode: 'floating' },
      look: { x: .55, y: .6, scale: .7, opacity: .5, mode: 'floating' },
      use: { x: NaN, y: .25, scale: .1, opacity: 2, visible: true },
    },
  });
  assert.equal(layout.controls.move.x, .985);
  assert.equal(layout.controls.move.y, .025);
  assert.equal(layout.controls.move.scale, 1.7);
  assert.equal(layout.controls.move.opacity, .2);
  assert.equal(layout.controls.move.visible, false);
  assert.equal(layout.controls.move.mode, 'floating');
  assert.equal(layout.controls.look.mode, 'floating');
  assert.equal(layout.controls.use.x, defaultControlLayout().controls.use.x);
  assert.equal(layout.controls.use.scale, .6);
  assert.equal(layout.controls.use.opacity, 1);
  assert.equal(layout.cameraSensitivity, 2.5);
  assert.equal(layout.deadZone, .05);
  assert.equal(layout.invertX, true);
  assert.equal(layout.invertY, false);
  assert.equal(layout.controls.pause.visible, true);
});

test('Mobile HUD layout persists independently and invalid/blocked storage restores safe defaults', () => {
  const storage = memoryStorage();
  const layout = defaultControlLayout();
  layout.controls.move.x = .22;
  layout.controls.move.y = .68;
  layout.controls.use.scale = 1.35;
  layout.controls.look.mode = 'floating';
  assert.equal(writeControlLayout(storage, layout), true);
  assert.equal(storage.getItem(CONTROL_LAYOUT_KEY).includes('"version":1'), true);
  assert.deepEqual(readControlLayout(storage), normalizeControlLayout(layout));
  storage.setItem(CONTROL_LAYOUT_KEY, '{invalid');
  assert.deepEqual(readControlLayout(storage), defaultControlLayout());
  storage.setItem(CONTROL_LAYOUT_KEY, JSON.stringify({ version: 900, controls: { move: { x: .9 } } }));
  assert.deepEqual(readControlLayout(storage), defaultControlLayout());
  const blocked = { getItem() { throw Error('denied'); }, setItem() { throw Error('denied'); } };
  assert.deepEqual(readControlLayout(blocked), defaultControlLayout());
  assert.equal(writeControlLayout(blocked, layout), false);
});

test('Touch-first detection enables phones/tablets without forcing touch laptops into the HUD', () => {
  const phone = {
    navigator: { maxTouchPoints: 5, userAgentData: { mobile: true } }, innerWidth: 390,
    matchMedia: query => ({ matches: query.includes('pointer: coarse') || query.includes('hover: none') }),
  };
  assert.equal(isTouchGameplayDevice(phone), true);
  const hybridLaptop = {
    navigator: { maxTouchPoints: 10, userAgentData: { mobile: false } }, innerWidth: 1280,
    matchMedia: query => ({ matches: query.includes('pointer: coarse') || query.includes('pointer: fine') }),
  };
  assert.equal(isTouchGameplayDevice(hybridLaptop), false);
  const desktop = { navigator: { maxTouchPoints: 0 }, innerWidth: 1440, matchMedia: () => ({ matches: false }) };
  assert.equal(isTouchGameplayDevice(desktop), false);
});
