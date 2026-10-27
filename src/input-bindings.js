export const KEYBOARD_BINDINGS_KEY = 'tidebound.controls.keyboard.v1';
export const KEYBOARD_BINDINGS_VERSION = 1;

/**
 * These are the actual gameplay actions handled by Game. Escape stays reserved
 * as an always-available way out of menus and cannot be rebound.
 */
export const KEYBOARD_ACTIONS = Object.freeze([
  { id: 'moveForward', label: 'Move forward', group: 'Movement', defaults: ['KeyW'], essential: true },
  { id: 'moveBackward', label: 'Move backward', group: 'Movement', defaults: ['KeyS'], essential: true },
  { id: 'moveLeft', label: 'Move left', group: 'Movement', defaults: ['KeyA'], essential: true },
  { id: 'moveRight', label: 'Move right', group: 'Movement', defaults: ['KeyD'], essential: true },
  { id: 'jump', label: 'Jump / surface', group: 'Movement', defaults: ['Space'], essential: true },
  { id: 'sprint', label: 'Sprint', group: 'Movement', defaults: ['ShiftLeft'] },
  { id: 'swimUp', label: 'Swim up', group: 'Movement', defaults: ['ArrowUp'] },
  { id: 'swimDown', label: 'Swim down', group: 'Movement', defaults: ['ArrowDown', 'ControlLeft'] },
  { id: 'interact', label: 'Interact / collect', group: 'Actions', defaults: ['KeyF'], essential: true },
  { id: 'dive', label: 'Dive / surface', group: 'Actions', defaults: ['KeyC'] },
  { id: 'helm', label: 'Take / leave the helm', group: 'Actions', defaults: ['KeyG'] },
  { id: 'removeBlock', label: 'Hold to dismantle', group: 'Actions', defaults: ['KeyX'] },
  { id: 'repairBlock', label: 'Repair raft structure', group: 'Actions', defaults: ['KeyT'] },
  { id: 'rotateBuild', label: 'Rotate building piece', group: 'Actions', defaults: ['KeyR'] },
  { id: 'slot1', label: 'Quickbar slot 1 · salvage hook', group: 'Quickbar', defaults: ['Digit1'] },
  { id: 'slot2', label: 'Quickbar slot 2 · building hammer', group: 'Quickbar', defaults: ['Digit2'] },
  { id: 'slot3', label: 'Quickbar slot 3', group: 'Quickbar', defaults: ['Digit3'] },
  { id: 'slot4', label: 'Quickbar slot 4', group: 'Quickbar', defaults: ['Digit4'] },
  { id: 'slot5', label: 'Quickbar slot 5', group: 'Quickbar', defaults: ['Digit5'] },
  { id: 'slot6', label: 'Quickbar slot 6', group: 'Quickbar', defaults: ['Digit6'] },
  { id: 'slot7', label: 'Quickbar slot 7', group: 'Quickbar', defaults: ['Digit7'] },
  { id: 'slot8', label: 'Quickbar slot 8', group: 'Quickbar', defaults: ['Digit8'] },
  { id: 'quickbarPrevious', label: 'Previous quickbar slot', group: 'Quickbar', defaults: ['KeyQ'] },
  { id: 'quickbarNext', label: 'Next quickbar slot', group: 'Quickbar', defaults: ['KeyE'] },
  { id: 'inventory', label: 'Inventory & crafting', group: 'Menus & camera', defaults: ['Tab', 'KeyI'] },
  { id: 'map', label: 'Ocean chart', group: 'Menus & camera', defaults: ['KeyM'] },
  { id: 'journal', label: 'Journal & quests', group: 'Menus & camera', defaults: ['KeyJ'] },
  { id: 'help', label: 'Field guide', group: 'Menus & camera', defaults: ['F1'] },
  { id: 'toggleHUD', label: 'Show / hide HUD', group: 'Menus & camera', defaults: ['KeyH'] },
  { id: 'zoomIn', label: 'Zoom camera in', group: 'Menus & camera', defaults: ['Equal'] },
  { id: 'zoomOut', label: 'Zoom camera out', group: 'Menus & camera', defaults: ['Minus'] },
  { id: 'performance', label: 'Performance monitor', group: 'Menus & camera', defaults: ['F3'] },
]);

const definitionsById = new Map(KEYBOARD_ACTIONS.map(action => [action.id, action]));
const modifierOnly = new Set(['AltLeft', 'AltRight', 'MetaLeft', 'MetaRight']);
const reservedCodes = new Set(['Escape', 'Unidentified', 'Dead', 'Process']);

export function defaultKeyboardBindings() {
  return {
    version: KEYBOARD_BINDINGS_VERSION,
    bindings: Object.fromEntries(KEYBOARD_ACTIONS.map(action => [action.id, [...action.defaults]])),
  };
}

function codesFor(value) {
  if (typeof value === 'string') return [value];
  if (!Array.isArray(value)) return [];
  return value.filter(code => typeof code === 'string');
}

export function isValidKeyboardBinding(code, actionId = '') {
  if (typeof code !== 'string' || !code || reservedCodes.has(code)) return false;
  if (modifierOnly.has(code)) return false;
  if (code === 'ControlLeft' || code === 'ControlRight') return actionId === 'swimDown';
  if (code === 'ShiftLeft' || code === 'ShiftRight') return actionId === 'sprint';
  if (/^Alt|^Meta/.test(code)) return false;
  return /^(?:Key[A-Z]|Digit[0-9]|Numpad(?:[0-9]|Add|Subtract|Multiply|Divide|Decimal|Enter)|F(?:[1-9]|1[0-9]|2[0-4])|Arrow(?:Up|Down|Left|Right)|Space|Tab|Enter|Backspace|Delete|Insert|Home|End|PageUp|PageDown|CapsLock|Equal|Minus|BracketLeft|BracketRight|Backslash|Semicolon|Quote|Backquote|Comma|Period|Slash)$/.test(code);
}

/** Accept only browser KeyboardEvent.code values; legacy labels are not persisted. */
export function keyboardCodeFromEvent(event) {
  if (typeof event?.code === 'string' && event.code && event.code !== 'Unidentified') return event.code;
  const key = event?.key;
  if (typeof key !== 'string') return '';
  if (key === ' ') return 'Space';
  if (/^[a-z]$/i.test(key)) return `Key${key.toUpperCase()}`;
  if (/^[0-9]$/.test(key)) return `Digit${key}`;
  return ({ Escape: 'Escape', Tab: 'Tab', ArrowUp: 'ArrowUp', ArrowDown: 'ArrowDown', ArrowLeft: 'ArrowLeft', ArrowRight: 'ArrowRight', '+': 'Equal', '=': 'Equal', '-': 'Minus' })[key] || '';
}

/** Normalize persisted bindings while enforcing one action per physical key. */
export function normalizeKeyboardBindings(input = {}) {
  const defaults = defaultKeyboardBindings();
  if (!input || typeof input !== 'object' || Array.isArray(input) || input.version !== KEYBOARD_BINDINGS_VERSION) return defaults;
  const source = input.bindings && typeof input.bindings === 'object' && !Array.isArray(input.bindings) ? input.bindings : {};
  const result = { version: KEYBOARD_BINDINGS_VERSION, bindings: {} };
  const used = new Set();
  for (const action of KEYBOARD_ACTIONS) {
    const incoming = Object.hasOwn(source, action.id) ? codesFor(source[action.id]) : [...action.defaults];
    const cleaned = [];
    for (const code of incoming) {
      if (!isValidKeyboardBinding(code, action.id) || cleaned.includes(code) || used.has(code) || cleaned.length >= 2) continue;
      cleaned.push(code);
      used.add(code);
    }
    // A corrupt or conflicting preference must never make an essential action
    // unreachable. Restore its first free default if one is available.
    if (!cleaned.length) {
      const fallback = action.defaults.find(code => !used.has(code) && isValidKeyboardBinding(code, action.id));
      if (fallback) { cleaned.push(fallback); used.add(fallback); }
    }
    result.bindings[action.id] = cleaned;
  }
  return result;
}

export function readKeyboardBindings(storage = globalThis.localStorage) {
  try {
    const raw = storage?.getItem(KEYBOARD_BINDINGS_KEY);
    return raw ? normalizeKeyboardBindings(JSON.parse(raw)) : defaultKeyboardBindings();
  } catch {
    return defaultKeyboardBindings();
  }
}

export function writeKeyboardBindings(storage, input) {
  const normalized = normalizeKeyboardBindings(input);
  try {
    if (!storage) return false;
    storage.setItem(KEYBOARD_BINDINGS_KEY, JSON.stringify(normalized));
    return true;
  } catch {
    return false;
  }
}

export function bindingLabel(code) {
  if (!code) return 'Unassigned';
  if (code === 'Space') return 'Space';
  if (code === 'Tab') return 'Tab';
  if (code === 'Escape') return 'Esc';
  if (code === 'ShiftLeft') return 'Left Shift';
  if (code === 'ShiftRight') return 'Right Shift';
  if (code === 'ControlLeft') return 'Left Ctrl';
  if (code === 'ControlRight') return 'Right Ctrl';
  if (code.startsWith('Key')) return code.slice(3);
  if (code.startsWith('Digit')) return code.slice(5);
  if (code.startsWith('Arrow')) return `Arrow ${code.slice(5)}`;
  if (/^F\d+$/.test(code)) return code;
  if (code === 'Equal') return '= / +';
  if (code === 'Minus') return '- / _';
  if (code.startsWith('Numpad')) return code.replace('Numpad', 'Num ');
  return code;
}

export class KeyboardBindings {
  constructor(storage) {
    if (arguments.length === 0) {
      try { storage = globalThis.localStorage; } catch { storage = null; }
    }
    this.storage = storage;
    this.bindings = readKeyboardBindings(storage);
  }

  actionForCode(code, bindings = this.bindings) {
    if (!code) return null;
    for (const action of KEYBOARD_ACTIONS) if (bindings.bindings[action.id]?.includes(code)) return action.id;
    return null;
  }

  codesForAction(actionId, bindings = this.bindings) {
    return definitionsById.has(actionId) ? [...(bindings.bindings[actionId] || [])] : [];
  }

  conflicts(code, actionId, bindings = this.bindings) {
    return KEYBOARD_ACTIONS.filter(action => action.id !== actionId && bindings.bindings[action.id]?.includes(code)).map(action => action.id);
  }

  apply(input, { persist = true } = {}) {
    this.bindings = normalizeKeyboardBindings(input);
    return persist ? writeKeyboardBindings(this.storage, this.bindings) : true;
  }

  reset() {
    const defaults = defaultKeyboardBindings();
    return this.apply(defaults);
  }
}
