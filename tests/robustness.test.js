// Portal / device robustness regressions: mobile landscape controls, touch
// detection, fullscreen, hook recall and the CSS cascade that makes the touch
// layout work outside portrait. Runs without a browser in `npm test`.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as THREE from 'three';
import { Game } from '../src/game.js';
import { UI, BUILD_TABS, DEFAULT_BUILD_CATEGORY, parseBuildCategory } from '../src/ui.js';
import { ITEMS, BLOCKS, TUTORIAL_STEPS } from '../src/data.js';

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

const top = parseFlat(css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/@media[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, ''));

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

/** Minimal DOM node: enough for the build bar and tutorial card renderers. */
function fakeElement() {
  const classes = new Set();
  return {
    writes: 0,
    get innerHTML() { return this._html || ''; },
    set innerHTML(value) { this._html = value; this.writes++; },
    classList: {
      add: name => classes.add(name),
      remove: name => classes.delete(name),
      toggle: (name, on) => (on ? classes.add(name) : classes.delete(name)),
      contains: name => classes.has(name),
    },
  };
}

/** Run `fn` with a tiny document shim and restore the real global afterwards. */
function withFakeDocument(elements, fn) {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'document');
  const bodyClasses = new Set();
  Object.defineProperty(globalThis, 'document', {
    value: {
      getElementById: id => elements[id] || null,
      body: {
        classList: {
          add: name => bodyClasses.add(name),
          remove: name => bodyClasses.delete(name),
          toggle: (name, on) => (on ? bodyClasses.add(name) : bodyClasses.delete(name)),
        },
      },
    },
    configurable: true, writable: true,
  });
  try { return fn(bodyClasses); }
  finally {
    if (previous) Object.defineProperty(globalThis, 'document', previous);
    else delete globalThis.document;
  }
}

test('Build tabs parse their category and always keep options on screen', () => {
  // The bug: "buildcat:" is nine characters but the handler sliced eight,
  // storing ":structure" and rendering an empty build bar.
  assert.deepEqual(BUILD_TABS.map(([id]) => id), ['structure', 'station', 'cosmetic']);
  for (const [id] of BUILD_TABS) assert.equal(parseBuildCategory(`buildcat:${id}`), id);
  assert.equal(parseBuildCategory('buildcat:structure'), 'structure');
  assert.equal(parseBuildCategory('buildcat:wall'), null);
  assert.equal(parseBuildCategory('buildcat:'), null);
  assert.equal(parseBuildCategory('build:wall'), null);
  assert.equal(parseBuildCategory(undefined), null);

  // Every tab must own at least one block, or a correct tab still looks empty.
  const counts = {};
  for (const block of Object.values(BLOCKS)) {
    const category = block.category || DEFAULT_BUILD_CATEGORY;
    counts[category] = (counts[category] || 0) + 1;
  }
  for (const [id] of BUILD_TABS) assert.ok(counts[id] > 0, `${id} has build options`);
});

test('Choosing Raft / Workstations / Decorations never blanks the build bar', () => {
  const bar = fakeElement();
  withFakeDocument({ 'build-bar': bar }, () => {
    const ui = Object.create(UI.prototype);
    ui.game = {
      equipped: 'hammer', buildType: 'foundation',
      crafting: { research: new Set() },
      audio: { init() {}, play() {} },
    };
    ui.buildCategory = DEFAULT_BUILD_CATEGORY;
    ui.renderBuildBar();
    assert.match(bar.innerHTML, /data-action="build:foundation"/);

    ui.handleAction('buildcat:cosmetic');
    assert.equal(ui.buildCategory, 'cosmetic');
    assert.match(bar.innerHTML, /class="build-cat active" data-action="buildcat:cosmetic"/);
    assert.match(bar.innerHTML, /data-action="build:flag"/);
    assert.doesNotMatch(bar.innerHTML, /data-action="build:foundation"/);

    ui.handleAction('buildcat:station');
    assert.equal(ui.buildCategory, 'station');
    assert.match(bar.innerHTML, /data-action="build:workbench"|data-action="build:smelter"/);
    assert.ok(bar.innerHTML.includes('data-action="build:'), 'station tab keeps its options');

    // A corrupt persisted value must self-heal instead of hiding every option.
    ui.buildCategory = ':structure';
    ui.renderBuildBar();
    assert.equal(ui.buildCategory, 'structure');
    assert.match(bar.innerHTML, /data-action="build:foundation"/);
  });
});

test('Skip guidance hides the tutorial card and survives repeated HUD renders', () => {
  const card = fakeElement();
  withFakeDocument({ 'guide-card': card }, () => {
    const tutorial = {
      step: 0, done: false,
      current() { return this.done ? null : TUTORIAL_STEPS[0]; },
      skip() { this.done = true; this.step = TUTORIAL_STEPS.length; },
    };
    const ui = Object.create(UI.prototype);
    ui.game = {
      tutorial,
      settings: { interactiveGuide: true },
      crafting: { research: new Set() },
      progress: {},
      touchDevice: false,
      audio: { init() {}, play() {} },
    };
    ui.toast = () => {};

    ui.renderGuideCard();
    assert.equal(card.classList.contains('hidden'), false, 'tutorial card is visible');
    assert.match(card.innerHTML, /data-action="skip-guide"/);
    const writes = card.writes;

    // The HUD calls this every few frames; identical content must not rebuild
    // the DOM or a click can land on a detached Skip button.
    ui.renderGuideCard();
    ui.renderGuideCard();
    assert.equal(card.writes, writes, 'unchanged guide content is not re-rendered');

    ui.handleAction('skip-guide');
    assert.equal(tutorial.done, true, 'skip marks the tutorial complete');
    assert.equal(card.classList.contains('hidden'), true, 'skip hides the card');
    ui.renderGuideCard();
    assert.equal(card.classList.contains('hidden'), true, 'the card stays hidden');
  });
});

test('The skip button is clickable inside the pass-through HUD layer', () => {
  // #hud has pointer-events:none. Buttons inside it need an explicit
  // pointer-events:auto, otherwise the click goes straight to the canvas.
  const bodies = top.filter(([selector]) => selector.split(',').map(s => s.trim()).includes('.guide-skip')).map(([, body]) => body);
  assert.ok(bodies.length, '.guide-skip must be declared at top level');
  assert.match(bodies.join(';'), /pointer-events:auto/, '.guide-skip must accept clicks');
  assert.match(css, /body\.photo-mode \.guide-card \*\{pointer-events:none!important\}/, 'photo mode must disable hidden controls');
});
