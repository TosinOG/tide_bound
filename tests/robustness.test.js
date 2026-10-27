// Portal / device robustness regressions: mobile landscape controls, touch
// detection, fullscreen, hook recall and the CSS cascade that makes the touch
// layout work outside portrait. Runs without a browser in `npm test`.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import { Game } from '../src/game.js';
import { UI } from '../src/ui.js';
import { ITEMS } from '../src/data.js';

const css = fs.readFileSync(new URL('../src/style.css', import.meta.url), 'utf8');
const menuCss = fs.readFileSync(new URL('../src/menu.css', import.meta.url), 'utf8');

/** Return [selector, body] pairs that live outside any @media block. */
function topLevelRules(source) {
  const rules = [];
  let buffer = '';
  for (let i = 0; i < source.length; i++) {
    const ch = source[i];
    if (ch === '@' && source.startsWith('@media', i)) {
      const open = source.indexOf('{', i);
      let depth = 0, end = open;
      for (; end < source.length; end++) {
        if (source[end] === '{') depth++;
        else if (source[end] === '}') { depth--; if (!depth) break; }
      }
      rules.push(...topLevelRules(buffer)); buffer = ''; i = end;
      continue;
    }
    buffer += ch;
  }
  rules.push(...topLevelRules(buffer));
  return rules;
}

/** Parse flat `selector{body}` declarations. */
function parseFlat(text) {
  const out = [];
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(text))) out.push([m[1].trim(), m[2].trim()]);
  return out;
}

const top = parseFlat(css.replace(/@media[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, ''));

test('Touch controls are positioned and clickable outside the portrait media query', () => {
  // The bug: these rules only existed inside @media(max-width:640px), so a phone
  // rotated to landscape showed the container but no usable controls.
  for (const selector of ['.joystick', '.mobile-actions', '.touch-action', '.main-touch']) {
    const bodies = top.filter(([sel]) => sel.split(',').map(s => s.trim()).includes(selector)).map(([, body]) => body);
    assert.ok(bodies.length, `${selector} must be declared at top level`);
    const merged = bodies.join(';');
    if (selector === '.joystick' || selector === '.mobile-actions') {
      assert.match(merged, /position:absolute/, `${selector} needs absolute positioning outside portrait`);
    }
    if (selector === '.joystick' || selector === '.mobile-actions' || selector === '.touch-action') {
      assert.match(merged, /pointer-events:auto/, `${selector} must accept taps`);
    }
  }
  // Landscape must still show the container itself.
  assert.match(css, /body\.touch-landscape \.mobile-controls\{display:block!important\}/);
  assert.match(css, /@media \(pointer:coarse\) and \(orientation:landscape\)/);
});

test('Landscape overrides keep the pads on screen with safe-area padding', () => {
  assert.match(css, /body\.touch-landscape \.joystick\{[^}]*env\(safe-area-inset-bottom\)/);
  assert.match(css, /body\.touch-landscape \.mobile-actions\{[^}]*env\(safe-area-inset-right\)/);
  // Short landscape phones get a compact layout instead of overlapping pads.
  assert.match(css, /max-height:420px\)[\s\S]{0,900}body\.touch-landscape \.joystick\{/);
});

test('Phone landscape menus are compact enough to reach PLAY', () => {
  assert.match(menuCss, /@media \(max-height:520px\) and \(orientation:landscape\)/);
  const block = menuCss.slice(menuCss.indexOf('@media (max-height:520px) and (orientation:landscape)'));
  assert.match(block, /\.menu-hero\{[^}]*position:relative/);
  assert.match(block, /\.menu-play\{[^}]*min-height:40px/);
  assert.match(block, /\.menu-quote,\.menu-footer\{display:none\}/);
});

test('A touch-screen laptop is not treated as a phone', () => {
  const originalMatchMedia = globalThis.matchMedia;
  const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  const game = Object.create(Game.prototype);
  const set = (coarse, anyFine, touchPoints) => {
    globalThis.matchMedia = q => ({ matches: q.includes('coarse') ? coarse : q.includes('fine') ? anyFine : false });
    Object.defineProperty(globalThis, 'navigator', { value: { maxTouchPoints: touchPoints }, configurable: true, writable: true });
  };
  try {
    set(false, false, 5);
    assert.equal(game.isCoarsePointer(), true, 'touch device with no fine pointer is coarse');
    set(false, true, 10);
    assert.equal(game.isCoarsePointer(), false, 'touchscreen laptop with a mouse stays desktop');
    set(true, true, 0);
    assert.equal(game.isCoarsePointer(), true, 'a coarse primary pointer always counts');
    set(false, false, 0);
    assert.equal(game.isCoarsePointer(), false, 'a mouse-only desktop is not coarse');
  } finally {
    globalThis.matchMedia = originalMatchMedia;
    if (originalNavigator) Object.defineProperty(globalThis, 'navigator', originalNavigator);
  }
});

test('Fullscreen button never throws when the API is unavailable or blocked', async () => {
  const toasts = [];
  const game = {
    contextLost: false, modal: null, paused: false,
    setPaused() {}, audio: { init() {}, play() {} },
    toast: message => toasts.push(message),
  };
  const ui = Object.create(UI.prototype);
  ui.game = game; ui.modal = null;
  ui.toast = message => toasts.push(message);

  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
  const root = {};
  Object.defineProperty(globalThis, 'document', {
    value: { documentElement: root, fullscreenElement: null, exitFullscreen: () => Promise.resolve() },
    configurable: true, writable: true,
  });
  try {
    assert.equal(typeof root.requestFullscreen, 'undefined');
    assert.doesNotThrow(() => ui.handleAction('fullscreen', {}));
    assert.ok(toasts.length, 'a missing fullscreen API explains itself');
    // A rejected promise (sandboxed iframe) must also be swallowed.
    toasts.length = 0;
    root.requestFullscreen = () => Promise.reject(new Error('blocked'));
    assert.doesNotThrow(() => ui.handleAction('fullscreen', {}));
    await new Promise(resolve => setTimeout(resolve, 5));
    assert.ok(toasts.length, 'a rejected fullscreen explains itself');
  } finally {
    if (previousDocument) Object.defineProperty(globalThis, 'document', previousDocument);
    else delete globalThis.document;
  }
});

test('Switching tools mid-cast recalls the hook and restores the hand', () => {
  const game = Object.create(Game.prototype);
  const hand = new THREE.Group();
  hand.visible = false; // castHook hides the hand while the hook is out
  game.avatar = { userData: { tool: hand } };
  game.quickbar = ['hook', 'hammer'];
  game.selectedSlot = 0;
  game.hook = { state: 'flying', charge: 0 };
  game.toolVisuals = new Map();
  game.ui = { renderQuickbar() {}, renderBuildBar() {} };
  game.audio = { play() {} };
  game.cancelFishing = () => {};
  game.updateViewModel = () => {};
  game.selectSlot(1);
  assert.equal(game.hook.state, 'idle', 'a flying hook is recalled when the tool changes');
  assert.equal(hand.visible, true, 'the equipped tool is visible again straight away');
});

test('Every hook tier still charges through the shared hook tool list', async () => {
  const { HOOK_TOOLS } = await import('../src/data.js');
  assert.deepEqual([...HOOK_TOOLS], ['hook', 'scrapHook', 'chainHook']);
  for (const id of HOOK_TOOLS) assert.equal(ITEMS[id].family, 'hook');
});
