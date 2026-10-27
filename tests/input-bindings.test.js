import test from 'node:test';
import assert from 'node:assert/strict';
import {
  KEYBOARD_ACTIONS, KEYBOARD_BINDINGS_KEY, KeyboardBindings, bindingLabel,
  defaultKeyboardBindings, isValidKeyboardBinding, keyboardCodeFromEvent,
  normalizeKeyboardBindings, readKeyboardBindings, writeKeyboardBindings,
} from '../src/input-bindings.js';

const memoryStorage = () => {
  const data = new Map();
  return {
    data,
    getItem: key => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
  };
};

test('Keyboard action catalog covers all real desktop actions and preserves the Escape exit', () => {
  const defaults = defaultKeyboardBindings();
  for (const action of ['moveForward', 'moveBackward', 'moveLeft', 'moveRight', 'jump', 'sprint', 'swimUp', 'swimDown', 'interact', 'dive', 'helm', 'removeBlock', 'repairBlock', 'rotateBuild', 'slot1', 'slot8', 'quickbarPrevious', 'quickbarNext', 'inventory', 'map', 'journal', 'help', 'toggleHUD', 'zoomIn', 'zoomOut', 'performance']) {
    assert.ok(defaults.bindings[action], `missing ${action}`);
  }
  assert.equal(KEYBOARD_ACTIONS.length, Object.keys(defaults.bindings).length);
  assert.equal(isValidKeyboardBinding('Escape', 'inventory'), false);
  assert.equal(isValidKeyboardBinding('AltLeft', 'jump'), false);
  assert.equal(isValidKeyboardBinding('ShiftLeft', 'sprint'), true);
  assert.equal(isValidKeyboardBinding('ShiftLeft', 'jump'), false);
  assert.equal(isValidKeyboardBinding('ControlLeft', 'swimDown'), true);
  assert.equal(isValidKeyboardBinding('ControlLeft', 'moveForward'), false);
});

test('Binding normalization rejects invalid codes and conflicts without losing essential actions', () => {
  const normalized = normalizeKeyboardBindings({
    version: 1,
    bindings: {
      moveForward: ['KeyZ', 'KeyZ', 'Escape', 'AltLeft'],
      moveBackward: ['KeyZ'],
      moveLeft: ['KeyQ'],
      jump: [],
      sprint: ['ShiftLeft'],
      swimDown: ['ControlLeft', 'ControlLeft'],
      ignored: ['KeyP'],
    },
  });
  assert.deepEqual(normalized.bindings.moveForward, ['KeyZ']);
  assert.deepEqual(normalized.bindings.moveBackward, ['KeyS']);
  assert.deepEqual(normalized.bindings.moveLeft, ['KeyQ']);
  assert.deepEqual(normalized.bindings.jump, ['Space']);
  assert.deepEqual(normalized.bindings.sprint, ['ShiftLeft']);
  assert.deepEqual(normalized.bindings.swimDown, ['ControlLeft']);
  assert.equal('ignored' in normalized.bindings, false);
  assert.equal(new Set(Object.values(normalized.bindings).flat()).size, Object.values(normalized.bindings).flat().length);
});

test('KeyboardEvent.code normalization uses physical keys and readable labels', () => {
  assert.equal(keyboardCodeFromEvent({ code: 'KeyQ', key: 'a' }), 'KeyQ');
  assert.equal(keyboardCodeFromEvent({ code: 'Unidentified', key: ' ' }), 'Space');
  assert.equal(keyboardCodeFromEvent({ key: '+' }), 'Equal');
  assert.equal(keyboardCodeFromEvent({ key: 'ArrowDown' }), 'ArrowDown');
  assert.equal(keyboardCodeFromEvent({ key: 'Dead' }), '');
  assert.equal(bindingLabel('KeyW'), 'W');
  assert.equal(bindingLabel('ShiftRight'), 'Right Shift');
});

test('Bindings persist separately from the voyage and safely survive corrupt or blocked storage', () => {
  const storage = memoryStorage(), bindings = new KeyboardBindings(storage), draft = defaultKeyboardBindings();
  draft.bindings.moveForward = ['KeyZ'];
  assert.equal(bindings.apply(draft), true);
  assert.equal(bindings.actionForCode('KeyZ'), 'moveForward');
  assert.deepEqual(bindings.codesForAction('moveForward'), ['KeyZ']);
  assert.deepEqual(bindings.conflicts('KeyZ', 'moveForward'), []);
  assert.equal(storage.getItem(KEYBOARD_BINDINGS_KEY).includes('KeyZ'), true);
  assert.deepEqual(readKeyboardBindings(storage), bindings.bindings);
  storage.setItem(KEYBOARD_BINDINGS_KEY, '{bad json');
  assert.deepEqual(readKeyboardBindings(storage), defaultKeyboardBindings());
  const blocked = { getItem() { throw Error('denied'); }, setItem() { throw Error('denied'); } };
  const volatile = new KeyboardBindings(blocked);
  draft.bindings.moveForward = ['KeyZ'];
  assert.equal(volatile.apply(draft), false);
  assert.equal(volatile.actionForCode('KeyZ'), 'moveForward');
  assert.equal(writeKeyboardBindings(blocked, draft), false);
});
