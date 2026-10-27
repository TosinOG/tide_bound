import { icon } from './icons.js';
import { ITEMS } from './data.js';
import { clamp } from './systems.js';

export const CONTROL_LAYOUT_KEY = 'tidebound.mobile-controls.v1';
export const CONTROL_LAYOUT_VERSION = 1;

export const CONTROL_DEFINITIONS = Object.freeze([
  { id: 'move', name: 'Movement joystick', kind: 'joystick', icon: 'compass', x: .13, y: .77, scale: 1, opacity: .78, visible: true, showLabel: false, mode: 'fixed' },
  { id: 'look', name: 'Camera joystick', kind: 'joystick', icon: 'eye', x: .87, y: .77, scale: 1, opacity: .72, visible: true, showLabel: false, mode: 'fixed' },
  { id: 'use', name: 'Use equipped item', kind: 'button', icon: 'hook', x: .87, y: .57, scale: 1, opacity: .9, visible: true, showLabel: false },
  { id: 'interact', name: 'Interact / collect', kind: 'button', icon: 'hand', x: .68, y: .62, scale: .92, opacity: .88, visible: true, showLabel: false },
  { id: 'jump', name: 'Jump / surface', kind: 'button', icon: 'arrow', x: .86, y: .38, scale: .92, opacity: .85, visible: true, showLabel: false },
  { id: 'dive', name: 'Dive / surface', kind: 'button', icon: 'water', x: .68, y: .80, scale: .9, opacity: .86, visible: true, showLabel: false },
  { id: 'swimUp', name: 'Swim up', kind: 'button', icon: 'arrow', x: .68, y: .42, scale: .88, opacity: .88, visible: true, showLabel: true },
  { id: 'swimDown', name: 'Swim down', kind: 'button', icon: 'arrow', x: .82, y: .42, scale: .88, opacity: .88, visible: true, showLabel: true },
  { id: 'attack', name: 'Attack / defend', kind: 'button', icon: 'spear', x: .68, y: .50, scale: .9, opacity: .86, visible: true, showLabel: false },
  { id: 'build', name: 'Build / place', kind: 'button', icon: 'hammer', x: .68, y: .53, scale: .92, opacity: .9, visible: true, showLabel: false },
  { id: 'dismantle', name: 'Hold to dismantle', kind: 'button', icon: 'repair', x: .82, y: .53, scale: .86, opacity: .82, visible: true, showLabel: false },
  { id: 'helm', name: 'Take / leave helm', kind: 'button', icon: 'sail', x: .73, y: .46, scale: .86, opacity: .82, visible: true, showLabel: false },
  { id: 'anchor', name: 'Drop / raise anchor', kind: 'button', icon: 'anchor', x: .64, y: .46, scale: .86, opacity: .82, visible: true, showLabel: false },
  { id: 'inventory', name: 'Inventory and crafting', kind: 'button', icon: 'backpack', x: .14, y: .12, scale: .84, opacity: .82, visible: true, showLabel: false },
  { id: 'map', name: 'Ocean chart', kind: 'button', icon: 'map', x: .24, y: .12, scale: .84, opacity: .82, visible: true, showLabel: false },
  { id: 'journal', name: 'Journal and quests', kind: 'button', icon: 'book', x: .34, y: .12, scale: .84, opacity: .82, visible: true, showLabel: false },
  { id: 'pause', name: 'Pause', kind: 'button', icon: 'pause', x: .93, y: .12, scale: .84, opacity: .9, visible: true, showLabel: false },
]);

const definitionById = new Map(CONTROL_DEFINITIONS.map(control => [control.id, control]));
const finite = (value, fallback, min, max) => typeof value === 'number' && Number.isFinite(value)
  ? clamp(value, min, max) : fallback;
const flag = (value, fallback) => typeof value === 'boolean' ? value : fallback;

export function defaultControlLayout() {
  return {
    version: CONTROL_LAYOUT_VERSION,
    cameraSensitivity: 1,
    deadZone: .14,
    invertX: false,
    invertY: false,
    controls: Object.fromEntries(CONTROL_DEFINITIONS.map(control => [control.id, {
      x: control.x, y: control.y, scale: control.scale, opacity: control.opacity,
      visible: control.visible, showLabel: control.showLabel,
      ...(control.kind === 'joystick' ? { mode: control.mode } : {}),
    }])),
  };
}

export function normalizeControlLayout(input = {}) {
  const fallback = defaultControlLayout();
  if (!input || typeof input !== 'object' || Array.isArray(input) || input.version !== CONTROL_LAYOUT_VERSION) return fallback;
  const controls = {};
  for (const definition of CONTROL_DEFINITIONS) {
    const value = input.controls?.[definition.id];
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      controls[definition.id] = { ...fallback.controls[definition.id] };
      continue;
    }
    const base = fallback.controls[definition.id];
    controls[definition.id] = {
      x: finite(value.x, base.x, .015, .985),
      y: finite(value.y, base.y, .025, .975),
      scale: finite(value.scale, base.scale, .6, 1.7),
      opacity: finite(value.opacity, base.opacity, .2, 1),
      visible: flag(value.visible, base.visible),
      showLabel: flag(value.showLabel, base.showLabel),
      ...(definition.kind === 'joystick' ? { mode: value.mode === 'floating' ? 'floating' : 'fixed' } : {}),
    };
  }
  return {
    version: CONTROL_LAYOUT_VERSION,
    cameraSensitivity: finite(input.cameraSensitivity, fallback.cameraSensitivity, .25, 2.5),
    deadZone: finite(input.deadZone, fallback.deadZone, .05, .4),
    invertX: flag(input.invertX, fallback.invertX),
    invertY: flag(input.invertY, fallback.invertY),
    controls,
  };
}

export function readControlLayout(storage = globalThis.localStorage) {
  try {
    const raw = storage?.getItem(CONTROL_LAYOUT_KEY);
    if (!raw) return defaultControlLayout();
    return normalizeControlLayout(JSON.parse(raw));
  } catch {
    return defaultControlLayout();
  }
}

export function writeControlLayout(storage, input) {
  const layout = normalizeControlLayout(input);
  try {
    if (!storage) return false;
    storage.setItem(CONTROL_LAYOUT_KEY, JSON.stringify(layout));
    return true;
  } catch {
    return false;
  }
}

export function isTouchGameplayDevice(env = globalThis) {
  const nav = env.navigator || {};
  let coarse = false, noHover = false, fine = false;
  try { coarse = !!env.matchMedia?.('(pointer: coarse)').matches; } catch {}
  try { noHover = !!env.matchMedia?.('(hover: none)').matches; } catch {}
  try { fine = !!env.matchMedia?.('(pointer: fine)').matches; } catch {}
  const touchPoints = Number(nav.maxTouchPoints) || 0;
  const mobileUA = nav.userAgentData?.mobile === true;
  // Touch-capable laptops usually report a fine primary pointer and hover. Do not
  // force them into the thumb HUD just because they also expose a touchscreen.
  return (coarse && noHover) || (mobileUA && touchPoints > 0) || (coarse && !fine && touchPoints > 0 && (env.innerWidth || 0) <= 900);
}

const BASE_SIZE = Object.freeze({ joystick: 118, button: 54 });
const ACTION_LABELS = Object.freeze({
  move: 'MOVE', look: 'LOOK', use: 'USE', interact: 'INTERACT', jump: 'JUMP', dive: 'DIVE',
  swimUp: 'UP', swimDown: 'DOWN', attack: 'ATTACK', build: 'BUILD', dismantle: 'DISMANTLE',
  helm: 'HELM', anchor: 'ANCHOR', inventory: 'BAG', map: 'MAP', journal: 'JOURNAL', pause: 'PAUSE',
});

function cloneLayout(layout) {
  return normalizeControlLayout(JSON.parse(JSON.stringify(layout)));
}

function editorControlMarkup(definition, control) {
  const glyph = definition.kind === 'joystick'
    ? `<span class="editor-stick-thumb"></span>`
    : icon(definition.icon, '', 24);
  const label = control.showLabel ? `<small>${ACTION_LABELS[definition.id]}</small>` : '';
  return `<div class="control-editor-item ${definition.kind === 'joystick' ? 'editor-joystick' : 'editor-button'} ${control.visible ? '' : 'editor-hidden-control'}" data-editor-control="${definition.id}" role="button" tabindex="0" aria-label="${definition.name}" style="left:${control.x * 100}%;top:${control.y * 100}%;--editor-scale:${control.scale};--editor-opacity:${control.opacity}"><span class="editor-control-face">${glyph}${label}</span><span class="editor-control-name">${definition.name}</span><span class="editor-resize-handle" data-editor-resize="${definition.id}" aria-label="Resize ${definition.name}" title="Drag to resize">↘</span></div>`;
}

function rangeField(label, field, value, min, max, step, unit = '') {
  return `<label class="control-editor-field"><span>${label}<output data-editor-output="${field}">${Math.round(value * (field === 'x' || field === 'y' ? 100 : 1))}${field === 'x' || field === 'y' ? '%' : unit}</output></span><input type="range" min="${min}" max="${max}" step="${step}" value="${value}" data-editor-field="${field}" aria-label="${label}"></label>`;
}

/** Touch-first controls and the free-position, per-control HUD editor. */
export class MobileControls {
  constructor(game, ui) {
    this.game = game;
    this.ui = ui;
    this.lifecycle = new AbortController();
    this.layout = readControlLayout();
    this.savedLayout = cloneLayout(this.layout);
    this.editorDraft = null;
    this.editorPanel = null;
    this.editorAbort = null;
    this.editorSelection = 'move';
    this.editorGesture = null;
    this.pointerStates = new Map();
    this.joystickPointers = new Map();
    this.verticalPointers = new Map();
    this.suppressPointerClick = false;
    this.suppressClickTimer = null;
    this.lookDeltaX = 0;
    this.lookDeltaY = 0;
    this.lastContext = '';
    this.active = false;
    this.isTouch = isTouchGameplayDevice();
    this.root = document.getElementById('mobile-controls');
    this.layer = document.getElementById('mobile-control-layer');
    this.elements = new Map();
    this.buildControls();
    this.applyLayout();
    this.bind();
    this.updateOrientation();
  }

  buildControls() {
    if (!this.layer) return;
    this.layer.replaceChildren();
    for (const definition of CONTROL_DEFINITIONS) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `mobile-control ${definition.kind === 'joystick' ? 'mobile-stick' : 'mobile-action'} mobile-${definition.id}`;
      if (definition.id === 'move') button.classList.add('joystick');
      button.dataset.mobileId = definition.id;
      if (definition.id === 'move') button.id = 'joystick';
      button.setAttribute('aria-label', definition.name);
      if (definition.kind === 'joystick') {
        button.innerHTML = `<span class="mobile-stick-ring"><i></i><b></b><em></em></span><span class="mobile-control-caption">${ACTION_LABELS[definition.id]}</span>`;
      } else {
        button.innerHTML = `<span class="mobile-control-glyph">${icon(definition.icon, '', 24)}</span><span class="mobile-control-caption">${ACTION_LABELS[definition.id]}</span>`;
      }
      this.layer.append(button);
      this.elements.set(definition.id, button);
    }
  }

  bind() {
    const signal = this.lifecycle.signal;
    document.addEventListener('click', event => {
      if (event.detail > 0 && this.suppressPointerClick) {
        this.suppressPointerClick = false;
        clearTimeout(this.suppressClickTimer);
        this.suppressClickTimer = null;
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, { signal, capture: true });
    this.layer?.addEventListener('pointerdown', event => {
      const button = event.target.closest?.('[data-mobile-id]');
      if (!button || button.hidden || !this.active || this.game.paused) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      if (event.pointerType === 'touch') {
        this.suppressPointerClick = true;
        clearTimeout(this.suppressClickTimer);
        this.suppressClickTimer = setTimeout(() => { this.suppressPointerClick = false; this.suppressClickTimer = null; }, 1000);
      }
      event.preventDefault();
      event.stopPropagation();
      this.beginControl(button.dataset.mobileId, event, button);
    }, { signal });
    this.layer?.addEventListener('pointermove', event => this.moveControl(event), { signal });
    this.layer?.addEventListener('pointerup', event => this.endControl(event), { signal });
    this.layer?.addEventListener('pointercancel', event => this.endControl(event, true), { signal });
    this.layer?.addEventListener('lostpointercapture', event => this.endControl(event, true), { signal });
    this.layer?.addEventListener('click', event => {
      // A keyboard-triggered click is accessible, while pointer actions are handled
      // once on pointerdown and deliberately ignored here.
      if (event.detail !== 0) return;
      const button = event.target.closest?.('[data-mobile-id]');
      if (button && !button.hidden) this.activateKeyboard(button.dataset.mobileId);
    }, { signal });
    window.addEventListener('resize', () => { this.isTouch = isTouchGameplayDevice(); this.applyLayout(); this.updateContext(true); this.updateOrientation(); }, { signal, passive: true });
    window.visualViewport?.addEventListener('resize', () => { this.applyLayout(); this.updateOrientation(); }, { signal, passive: true });
  }

  getControl(id, layout = this.layout) {
    return layout.controls[id] || definitionById.get(id);
  }

  applyLayout(layout = this.layout) {
    this.layout = normalizeControlLayout(layout);
    for (const definition of CONTROL_DEFINITIONS) {
      const element = this.elements.get(definition.id);
      if (!element) continue;
      const control = this.layout.controls[definition.id];
      element.style.left = `${control.x * 100}%`;
      element.style.top = `${control.y * 100}%`;
      element.style.setProperty('--control-scale', control.scale);
      element.style.opacity = String(control.opacity);
      element.classList.toggle('is-floating', definition.kind === 'joystick' && control.mode === 'floating');
      element.classList.toggle('show-control-label', control.showLabel);
      element.setAttribute('aria-hidden', String(!control.visible));
      element.tabIndex = control.visible ? 0 : -1;
      if (definition.kind === 'joystick') element.dataset.mode = control.mode;
      const caption = element.querySelector('.mobile-control-caption');
      if (caption) caption.hidden = !control.showLabel;
    }
    this.clampLiveControls();
    this.updateContext(true);
  }

  clampLiveControls() {
    const rect = this.layer?.getBoundingClientRect();
    if (!rect?.width || !rect?.height) return;
    for (const definition of CONTROL_DEFINITIONS) {
      const element = this.elements.get(definition.id);
      if (!element || !this.layout.controls[definition.id].visible) continue;
      const bounds = element.getBoundingClientRect();
      const c = this.layout.controls[definition.id];
      const x = clamp(c.x, bounds.width / 2 / rect.width, 1 - bounds.width / 2 / rect.width);
      const y = clamp(c.y, bounds.height / 2 / rect.height, 1 - bounds.height / 2 / rect.height);
      if (x !== c.x || y !== c.y) {
        element.style.left = `${x * 100}%`;
        element.style.top = `${y * 100}%`;
      }
    }
  }

  updateContext(force = false) {
    if (!this.root) return;
    const g = this.game, p = g.player;
    const signature = [this.isTouch, g.started, g.paused, this.ui.modal, p?.swimming, p?.diving, p?.onRaft, g.equipped, g.shark?.mesh?.visible].join('|');
    if (!force && signature === this.lastContext) return;
    this.lastContext = signature;
    const active = this.isTouch && g.started && !g.paused && !this.ui.modal;
    if (this.active && !active) this.resetAll();
    this.active = active;
    this.root.classList.toggle('mobile-controls-active', active);
    this.root.hidden = !active;
    if (!active) return;

    for (const definition of CONTROL_DEFINITIONS) {
      const control = this.layout.controls[definition.id];
      const element = this.elements.get(definition.id);
      if (!element) continue;
      let relevant = true;
      if (definition.id === 'jump') relevant = !p.diving;
      if (definition.id === 'dive') relevant = !!p.swimming;
      if (definition.id === 'swimUp' || definition.id === 'swimDown') relevant = !!p.diving;
      if (definition.id === 'use') relevant = !!g.equipped && g.equipped !== 'hammer';
      if (definition.id === 'build' || definition.id === 'dismantle') relevant = g.equipped === 'hammer' && !p.swimming;
      if (definition.id === 'attack') relevant = g.equipped === 'spear' || !!g.shark?.mesh?.visible;
      if (definition.id === 'helm' || definition.id === 'anchor') relevant = !!p.onRaft;
      element.hidden = !control.visible || !relevant;
      element.setAttribute('aria-label', this.controlAriaLabel(definition.id));
      if (definition.kind === 'button') this.updateGlyph(definition.id);
    }
    this.updateOrientation();
  }

  controlAriaLabel(id) {
    const g = this.game;
    if (id === 'dive') return g.player.diving ? 'Surface from the dive' : 'Dive underwater';
    if (id === 'jump' && g.player.swimming) return 'Swim upward';
    if (id === 'swimUp') return 'Hold to swim upward';
    if (id === 'swimDown') return 'Hold to swim deeper';
    if (id === 'use') return g.equipped ? `Use ${ITEMS[g.equipped]?.name || 'equipped item'}` : 'Use equipped item';
    return definitionById.get(id)?.name || id;
  }

  updateGlyph(id) {
    const element = this.elements.get(id);
    if (!element) return;
    const glyph = element.querySelector('.mobile-control-glyph');
    const caption = element.querySelector('.mobile-control-caption');
    if (!glyph || !caption) return;
    let label = ACTION_LABELS[id], glyphHtml = icon(definitionById.get(id)?.icon || 'info', '', 24);
    if (id === 'use') {
      const item = ITEMS[this.game.equipped];
      glyphHtml = icon(item?.icon || 'hook', '', 24);
      label = item?.name?.split(' ')[0]?.toUpperCase() || 'USE';
    } else if (id === 'dive') {
      label = this.game.player.diving ? 'SURFACE' : 'DIVE';
      glyphHtml = icon(this.game.player.diving ? 'arrow' : 'water', '', 24);
    } else if (id === 'jump' && this.game.player.swimming) {
      label = 'UP';
      glyphHtml = '<span class="mobile-arrow-glyph">↑</span>';
    } else if (id === 'swimUp') glyphHtml = '<span class="mobile-arrow-glyph">↑</span>';
    else if (id === 'swimDown') glyphHtml = '<span class="mobile-arrow-glyph">↓</span>';
    caption.textContent = label;
    glyph.innerHTML = glyphHtml;
  }

  updateOrientation() {
    if (!this.isTouch) {
      document.body.classList.remove('touch-gameplay-device', 'portrait-gameplay');
      return;
    }
    document.body.classList.add('touch-gameplay-device');
    const portrait = innerHeight > innerWidth && innerWidth < 760;
    document.body.classList.toggle('portrait-gameplay', portrait && this.game.started && !this.game.paused && !this.ui.modal);
  }

  update(dt) {
    if (!this.active) { this.lookDeltaX = this.lookDeltaY = 0; return; }
    if (this.lookDeltaX || this.lookDeltaY) {
      const sensitivity = this.game.settings.mouseSensitivity * this.layout.cameraSensitivity;
      const xSign = this.layout.invertX ? -1 : 1, ySign = this.layout.invertY ? -1 : 1;
      this.game.cameraYaw -= this.lookDeltaX * .006 * sensitivity * xSign;
      this.game.cameraPitch = clamp(this.game.cameraPitch + this.lookDeltaY * .004 * sensitivity * ySign, .12, 1.2);
      this.lookDeltaX = 0;
      this.lookDeltaY = 0;
    }
    void dt;
  }

  beginControl(id, event, element) {
    if (this.pointerStates.has(event.pointerId)) return;
    const definition = definitionById.get(id);
    if (!definition) return;
    try { element.setPointerCapture(event.pointerId); } catch {}
    element.classList.add('is-pressed');
    this.game.start();
    this.game.audio.init();
    if (definition.kind === 'joystick') {
      if (this.joystickPointers.has(id)) return;
      const rect = element.getBoundingClientRect();
      const mode = this.layout.controls[id].mode;
      const originX = mode === 'floating' ? event.clientX : rect.left + rect.width / 2;
      const originY = mode === 'floating' ? event.clientY : rect.top + rect.height / 2;
      const state = { id, element, kind: 'joystick', originX, originY, pointerId: event.pointerId };
      this.pointerStates.set(event.pointerId, state);
      this.joystickPointers.set(id, event.pointerId);
      if (mode === 'floating') {
        element.style.setProperty('--floating-x', `${originX - rect.left}px`);
        element.style.setProperty('--floating-y', `${originY - rect.top}px`);
        element.classList.add('floating-origin-set');
      }
      this.updateJoystick(state, event.clientX, event.clientY);
      return;
    }
    let action = id;
    if (id === 'use') action = this.beginUse(event.pointerId);
    else if (id === 'jump') { this.game.setActionDown('jump', true); action = 'jump'; }
    else if (id === 'swimUp') { this.verticalPointers.set(event.pointerId, 1); this.refreshVerticalInput(); action = 'vertical'; }
    else if (id === 'swimDown') {
      if (!this.game.player.diving) this.game.toggleDive();
      this.verticalPointers.set(event.pointerId, -1); this.refreshVerticalInput(); action = 'vertical';
    } else if (id === 'dismantle') { this.game.setActionDown('removeBlock', true); this.game.removeTargetBlock(); action = 'dismantle'; }
    else if (['pause', 'inventory', 'map', 'journal', 'interact'].includes(id)) action = 'deferred-action';
    else {
      this.activate(id);
      action = 'tap';
    }
    if (this.game.paused || this.ui.modal) {
      element.classList.remove('is-pressed');
      try { if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId); } catch {}
      return;
    }
    this.pointerStates.set(event.pointerId, { id, element, kind: 'button', action });
  }

  beginUse(pointerId) {
    const game = this.game;
    if (game.equipped === 'hook') {
      if (game.hook.state === 'idle') {
        game.hook.state = 'charging';
        game.hook.charge = .22;
        return 'hook-charge';
      }
      game.primaryAction();
      return 'tap';
    }
    game.primaryAction();
    void pointerId;
    return 'tap';
  }

  activate(id) {
    const g = this.game;
    if (id === 'attack') g.attack();
    else if (id === 'build') g.placeBlock();
    else if (id === 'dive') g.toggleDive();
    else if (id === 'helm') this.ui.handleAction('helm');
    else if (id === 'anchor') this.ui.handleAction('anchor');
    else if (id === 'interact') g.interact();
    else if (id === 'inventory') this.ui.handleAction('inventory');
    else if (id === 'map') this.ui.handleAction('map');
    else if (id === 'journal') this.ui.handleAction('journal');
    else if (id === 'pause') this.ui.handleAction('pause');
    if (id !== 'inventory' && id !== 'map' && id !== 'journal' && id !== 'pause' && id !== 'helm' && id !== 'anchor') g.audio.play('click');
    try { if (navigator.vibrate) navigator.vibrate(10); } catch {}
  }

  activateKeyboard(id) {
    this.game.start();
    if (id === 'jump') { this.game.pulseAction('jump', 120); return; }
    this.activate(id);
  }

  updateJoystick(state, clientX, clientY) {
    const element = state.element;
    const size = element.getBoundingClientRect().width;
    const radius = Math.max(20, size * .39);
    let x = clamp((clientX - state.originX) / radius, -1, 1);
    let y = clamp((clientY - state.originY) / radius, -1, 1);
    const length = Math.hypot(x, y);
    if (length > 1) { x /= length; y /= length; }
    const dead = this.layout.deadZone;
    if (length <= dead) x = y = 0;
    else if (length > dead) {
      const scaled = Math.min(1, (length - dead) / (1 - dead));
      if (length > 1e-6) { x = x / length * scaled; y = y / length * scaled; }
    }
    if (state.id === 'move') {
      this.game.touchMove.x = x;
      this.game.touchMove.y = y;
    } else {
      const previousX = state.lastX ?? clientX, previousY = state.lastY ?? clientY;
      this.lookDeltaX += clientX - previousX;
      this.lookDeltaY += clientY - previousY;
      state.lastX = clientX;
      state.lastY = clientY;
    }
    const thumb = element.querySelector('.mobile-stick-ring i');
    if (thumb) thumb.style.transform = `translate(${x * radius * .52}px,${y * radius * .52}px)`;
  }

  moveControl(event) {
    const state = this.pointerStates.get(event.pointerId);
    if (!state) return;
    if (state.kind === 'joystick') {
      this.updateJoystick(state, event.clientX, event.clientY);
      return;
    }
    if (state.action === 'vertical' && state.id === 'swimUp') this.verticalPointers.set(event.pointerId, 1);
    if (state.action === 'vertical' && state.id === 'swimDown') this.verticalPointers.set(event.pointerId, -1);
  }

  endControl(event, cancelled = false) {
    const state = this.pointerStates.get(event.pointerId);
    if (!state) return;
    this.pointerStates.delete(event.pointerId);
    state.element.classList.remove('is-pressed');
    if (state.kind === 'joystick') {
      this.joystickPointers.delete(state.id);
      if (state.id === 'move') this.game.touchMove.x = this.game.touchMove.y = 0;
      else this.lookDeltaX = this.lookDeltaY = 0;
      state.element.classList.remove('floating-origin-set');
      const thumb = state.element.querySelector('.mobile-stick-ring i');
      if (thumb) thumb.style.transform = 'translate(0,0)';
      return;
    }
    if (state.action === 'deferred-action') {
      if (!cancelled) setTimeout(() => { if (!this.game.disposed && !this.game.paused && !this.ui.modal) this.activate(state.id); }, 0);
      return;
    }
    if (state.id === 'jump') this.game.setActionDown('jump', false);
    if (state.id === 'dismantle') { this.game.setActionDown('removeBlock', false); this.game.dismantle = null; }
    if (state.action === 'vertical') { this.verticalPointers.delete(event.pointerId); this.refreshVerticalInput(); }
    if (state.action === 'hook-charge') {
      if (cancelled) this.game.hook.state = 'idle';
      else if (!this.game.paused && this.game.hook.state === 'charging') this.game.castHook();
    }
  }

  refreshVerticalInput() {
    let sum = 0;
    for (const value of this.verticalPointers.values()) sum += value;
    this.game.mobileVertical = clamp(sum, -1, 1);
  }

  handleCanvasPointerDown(event) {
    if (!this.isTouch || !this.active || event.pointerType !== 'touch') return false;
    const id = event.clientX < innerWidth * .5 ? 'move' : 'look';
    if (this.layout.controls[id].mode !== 'floating' || this.joystickPointers.has(id)) return false;
    const element = this.elements.get(id);
    if (!element || !this.layout.controls[id].visible) return false;
    event.preventDefault();
    event.stopPropagation();
    this.beginControl(id, event, element);
    return true;
  }

  resetAll() {
    for (const [pointerId, state] of this.pointerStates) {
      state.element.classList.remove('is-pressed', 'floating-origin-set');
      if (state.id === 'jump') this.game.setActionDown('jump', false);
      if (state.id === 'dismantle') this.game.setActionDown('removeBlock', false);
      if (state.action === 'hook-charge' && this.game.hook?.state === 'charging') this.game.hook.state = 'idle';
      try { if (state.element.hasPointerCapture(pointerId)) state.element.releasePointerCapture(pointerId); } catch {}
    }
    this.pointerStates.clear();
    this.joystickPointers.clear();
    this.verticalPointers.clear();
    this.game.touchMove.x = this.game.touchMove.y = 0;
    this.game.mobileVertical = 0;
    this.lookDeltaX = this.lookDeltaY = 0;
    for (const element of this.elements.values()) {
      element.classList.remove('is-pressed', 'floating-origin-set');
      const thumb = element.querySelector('.mobile-stick-ring i');
      if (thumb) thumb.style.transform = 'translate(0,0)';
    }
  }

  openEditor(panel) {
    this.editorPanel = panel;
    this.editorAbort?.abort();
    this.editorAbort = new AbortController();
    this.editorDraft = cloneLayout(this.layout);
    this.savedLayout = readControlLayout();
    this.editorSelection = 'move';
    this.editorGesture = null;
    const definitions = CONTROL_DEFINITIONS;
    panel.innerHTML = `<div class="control-editor">
      <div class="control-editor-intro"><div><span class="panel-eyebrow">TOUCH CONTROLS · FREE LAYOUT</span><p>Drag a control to move it. Pull the ↘ handle or use its size slider to resize. Changes stay in preview until you save.</p></div><button type="button" class="button secondary editor-restore" data-editor-action="restore">Restore last saved</button></div>
      <div class="control-editor-stage" id="control-editor-stage" aria-label="Touch control layout preview"><div class="editor-ocean"><span class="editor-sunlight"></span><span class="editor-seabed"></span><span class="editor-reef reef-one"></span><span class="editor-reef reef-two"></span><span class="editor-waterline"></span></div><div class="editor-grid-overlay"></div>${definitions.map(definition => editorControlMarkup(definition, this.editorDraft.controls[definition.id])).join('')}</div>
      <div class="control-editor-inspector" id="control-editor-inspector"></div>
      <div class="control-editor-global"><h3>Shared joystick settings</h3><label class="control-editor-field"><span>Camera sensitivity <output data-editor-output="cameraSensitivity">${this.editorDraft.cameraSensitivity.toFixed(2)}×</output></span><input type="range" min=".25" max="2.5" step=".05" value="${this.editorDraft.cameraSensitivity}" data-editor-field="cameraSensitivity" aria-label="Camera joystick sensitivity"></label><label class="control-editor-field"><span>Movement dead zone <output data-editor-output="deadZone">${Math.round(this.editorDraft.deadZone * 100)}%</output></span><input type="range" min=".05" max=".4" step=".01" value="${this.editorDraft.deadZone}" data-editor-field="deadZone" aria-label="Movement joystick dead zone"></label><label class="editor-check"><input type="checkbox" data-editor-field="invertX" ${this.editorDraft.invertX ? 'checked' : ''}> Invert camera horizontal</label><label class="editor-check"><input type="checkbox" data-editor-field="invertY" ${this.editorDraft.invertY ? 'checked' : ''}> Invert camera vertical</label></div>
      <div class="control-editor-actions"><button type="button" class="button text-button" data-editor-action="cancel">Cancel</button><button type="button" class="button secondary" data-editor-action="reset">Reset to default</button><button type="button" class="button primary" data-editor-action="save">Save mobile layout</button></div>
    </div>`;
    this.bindEditor();
    this.selectEditorControl('move');
    requestAnimationFrame(() => this.applyEditorStyles());
  }

  bindEditor() {
    const panel = this.editorPanel, signal = this.editorAbort.signal;
    panel.addEventListener('pointerdown', event => this.editorPointerDown(event), { signal });
    panel.addEventListener('pointermove', event => this.editorPointerMove(event), { signal });
    panel.addEventListener('pointerup', event => this.editorPointerEnd(event), { signal });
    panel.addEventListener('pointercancel', event => this.editorPointerEnd(event), { signal });
    panel.addEventListener('keydown', event => {
      const control = event.target.closest?.('[data-editor-control]');
      if (control && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); this.selectEditorControl(control.dataset.editorControl); }
    }, { signal });
    panel.addEventListener('click', event => {
      const action = event.target.closest?.('[data-editor-action]')?.dataset.editorAction;
      if (action) { event.preventDefault(); this.editorAction(action); return; }
      const control = event.target.closest?.('[data-editor-control]');
      if (control) this.selectEditorControl(control.dataset.editorControl);
    }, { signal });
    panel.addEventListener('input', event => this.editorInput(event), { signal });
    panel.addEventListener('change', event => this.editorInput(event), { signal });
  }

  editorPointerDown(event) {
    const item = event.target.closest?.('[data-editor-control]');
    if (!item || event.button !== 0) return;
    event.preventDefault();
    const id = item.dataset.editorControl;
    this.selectEditorControl(id);
    const stage = this.editorPanel.querySelector('#control-editor-stage'), rect = stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const resize = !!event.target.closest('[data-editor-resize]');
    this.editorGesture = {
      pointerId: event.pointerId, id, mode: resize ? 'resize' : 'drag',
      startX: event.clientX, startY: event.clientY,
      x: this.editorDraft.controls[id].x, y: this.editorDraft.controls[id].y,
      scale: this.editorDraft.controls[id].scale, rect,
    };
    try { item.setPointerCapture(event.pointerId); } catch {}
    item.classList.add('editor-selected');
  }

  editorPointerMove(event) {
    const gesture = this.editorGesture;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    event.preventDefault();
    const control = this.editorDraft.controls[gesture.id];
    if (gesture.mode === 'drag') {
      const item = this.editorPanel.querySelector(`[data-editor-control="${gesture.id}"]`);
      const itemRect = item.getBoundingClientRect();
      const minX = itemRect.width / 2 / gesture.rect.width, minY = itemRect.height / 2 / gesture.rect.height;
      control.x = clamp(gesture.x + (event.clientX - gesture.startX) / gesture.rect.width, minX, 1 - minX);
      control.y = clamp(gesture.y + (event.clientY - gesture.startY) / gesture.rect.height, minY, 1 - minY);
    } else {
      const base = BASE_SIZE[definitionById.get(gesture.id).kind];
      const delta = ((event.clientX - gesture.startX) + (event.clientY - gesture.startY)) / (base * 1.4);
      control.scale = clamp(gesture.scale + delta, .6, 1.7);
    }
    this.applyEditorStyles();
    this.updateInspectorValues();
  }

  editorPointerEnd(event) {
    if (this.editorGesture?.pointerId !== event.pointerId) return;
    this.editorGesture = null;
    this.editorPanel.querySelectorAll('.editor-selected').forEach(element => element.classList.remove('editor-selected'));
  }

  editorInput(event) {
    const field = event.target.dataset.editorField;
    if (!field || !this.editorDraft) return;
    const control = this.editorDraft.controls[this.editorSelection];
    if (field === 'x' || field === 'y' || field === 'scale' || field === 'opacity' || field === 'mode' || field === 'visible' || field === 'showLabel') {
      if (field === 'visible' || field === 'showLabel') control[field] = event.target.checked;
      else if (field === 'mode') control.mode = event.target.value === 'floating' ? 'floating' : 'fixed';
      else control[field] = Number(event.target.value);
    } else if (field === 'cameraSensitivity' || field === 'deadZone') this.editorDraft[field] = Number(event.target.value);
    else if (field === 'invertX' || field === 'invertY') this.editorDraft[field] = event.target.checked;
    this.editorDraft = normalizeControlLayout(this.editorDraft);
    if (field === 'visible' || field === 'showLabel' || field === 'mode') this.refreshEditorInspector();
    this.applyEditorStyles();
    this.updateInspectorValues();
  }

  selectEditorControl(id) {
    if (!definitionById.has(id) || !this.editorPanel) return;
    this.editorSelection = id;
    this.editorPanel.querySelectorAll('[data-editor-control]').forEach(element => element.classList.toggle('editor-selected', element.dataset.editorControl === id));
    this.refreshEditorInspector();
    this.updateInspectorValues();
  }

  refreshEditorInspector() {
    if (!this.editorPanel || !this.editorDraft) return;
    const definition = definitionById.get(this.editorSelection), control = this.editorDraft.controls[this.editorSelection];
    const inspector = this.editorPanel.querySelector('#control-editor-inspector');
    const positionX = rangeField('Horizontal position', 'x', control.x, 0, 1, .005);
    const positionY = rangeField('Vertical position', 'y', control.y, 0, 1, .005);
    const size = rangeField('Size / touch target', 'scale', control.scale, .6, 1.7, .025, '×');
    const opacity = rangeField('Transparency', 'opacity', control.opacity, .2, 1, .025);
    inspector.innerHTML = `<div class="control-editor-selected-title"><span class="panel-eyebrow">SELECTED CONTROL</span><strong>${definition.name}</strong></div><div class="control-editor-fields">${positionX}${positionY}${size}${opacity}<label class="editor-check"><input type="checkbox" data-editor-field="visible" ${control.visible ? 'checked' : ''}> Visible in gameplay</label><label class="editor-check"><input type="checkbox" data-editor-field="showLabel" ${control.showLabel ? 'checked' : ''}> Show text label</label>${definition.kind === 'joystick' ? `<label class="control-editor-field"><span>Joystick placement</span><select data-editor-field="mode" aria-label="${definition.name} mode"><option value="fixed" ${control.mode === 'fixed' ? 'selected' : ''}>Fixed position</option><option value="floating" ${control.mode === 'floating' ? 'selected' : ''}>Floating touch origin</option></select></label>` : ''}</div>`;
  }

  applyEditorStyles() {
    if (!this.editorPanel || !this.editorDraft) return;
    for (const definition of CONTROL_DEFINITIONS) {
      const element = this.editorPanel.querySelector(`[data-editor-control="${definition.id}"]`);
      if (!element) continue;
      const control = this.editorDraft.controls[definition.id];
      element.style.left = `${control.x * 100}%`;
      element.style.top = `${control.y * 100}%`;
      element.style.setProperty('--editor-scale', control.scale);
      element.style.setProperty('--editor-opacity', control.opacity);
      element.classList.toggle('editor-hidden-control', !control.visible);
      element.classList.toggle('editor-floating-control', control.mode === 'floating');
    }
  }

  updateInspectorValues() {
    if (!this.editorPanel || !this.editorDraft) return;
    for (const input of this.editorPanel.querySelectorAll('[data-editor-field]')) {
      const field = input.dataset.editorField;
      const value = ['x', 'y', 'scale', 'opacity', 'mode', 'visible', 'showLabel'].includes(field)
        ? this.editorDraft.controls[this.editorSelection][field] : this.editorDraft[field];
      if (input.type === 'checkbox') input.checked = !!value;
      else if (value !== undefined) input.value = String(value);
    }
    for (const output of this.editorPanel.querySelectorAll('[data-editor-output]')) {
      const field = output.dataset.editorOutput;
      const value = ['x', 'y', 'scale', 'opacity'].includes(field)
        ? this.editorDraft.controls[this.editorSelection][field] : this.editorDraft[field];
      output.textContent = field === 'x' || field === 'y' ? `${Math.round(value * 100)}%`
        : field === 'scale' || field === 'cameraSensitivity' ? `${Number(value).toFixed(2)}×`
          : field === 'deadZone' ? `${Math.round(value * 100)}%` : `${Math.round(value * 100)}%`;
    }
  }

  editorAction(action) {
    if (action === 'save') {
      const next = normalizeControlLayout(this.editorDraft);
      if (!writeControlLayout(globalThis.localStorage, next)) {
        this.ui.toast('The mobile layout could not be saved in this browser. Your current layout remains active.','save','warning');
        return;
      }
      this.savedLayout = cloneLayout(next);
      this.layout = cloneLayout(next);
      this.applyLayout();
      this.finishEditor();
      this.ui.toast('Mobile control layout saved on this device','check','success');
      this.ui.openModal('settings');
    } else if (action === 'cancel') {
      this.finishEditor();
      this.ui.openModal('settings');
    } else if (action === 'reset') {
      this.editorDraft = defaultControlLayout();
      this.selectEditorControl(this.editorSelection);
      this.applyEditorStyles();
      this.updateInspectorValues();
    } else if (action === 'restore') {
      this.editorDraft = readControlLayout();
      this.savedLayout = cloneLayout(this.editorDraft);
      this.selectEditorControl(this.editorSelection);
      this.applyEditorStyles();
      this.updateInspectorValues();
    }
  }

  finishEditor() {
    this.editorAbort?.abort();
    this.editorAbort = null;
    this.editorGesture = null;
    this.editorDraft = null;
    this.editorPanel = null;
  }

  dispose() {
    this.resetAll();
    this.finishEditor();
    clearTimeout(this.suppressClickTimer);
    this.suppressClickTimer = null;
    this.lifecycle.abort();
    this.root?.replaceChildren();
  }
}
