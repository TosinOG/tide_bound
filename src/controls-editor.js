import {
  KEYBOARD_ACTIONS, bindingLabel, defaultKeyboardBindings, isValidKeyboardBinding,
  keyboardCodeFromEvent, normalizeKeyboardBindings,
} from './input-bindings.js';

const actionById = new Map(KEYBOARD_ACTIONS.map(action => [action.id, action]));
const fallbackCodes = [
  ...Array.from({ length: 24 }, (_, index) => `F${index + 1}`),
  ...Array.from({ length: 10 }, (_, index) => `Numpad${index}`),
  'BracketLeft', 'BracketRight', 'Backslash', 'Semicolon', 'Quote', 'Backquote', 'Comma', 'Period', 'Slash',
  'Home', 'End', 'PageUp', 'PageDown', 'Insert', 'Delete', 'Backspace',
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => `Key${letter}`),
  ...'0123456789'.split('').map(number => `Digit${number}`),
];
const esc = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

/** Shared keyboard-rebinding page used by both the main-menu and in-game settings. */
export class ControlsEditor {
  constructor({ element, bindings, onBack = () => {}, onSaved = () => {} }) {
    this.element = element;
    this.bindings = bindings;
    this.onBack = onBack;
    this.onSaved = onSaved;
    this.abort = new AbortController();
    this.draft = normalizeKeyboardBindings(bindings.bindings);
    this.captureAction = null;
    this.pending = null;
    this.status = '';
    this.disposed = false;
    const signal = this.abort.signal;
    element.addEventListener('click', event => this.handleClick(event), { signal });
    element.addEventListener('keydown', event => this.handleKeyDown(event), { signal, capture: true });
    this.render();
  }

  render() {
    if (this.disposed) return;
    const groups = [...new Set(KEYBOARD_ACTIONS.map(action => action.group))];
    const rows = groups.map(group => `<section class="keyboard-controls-group"><h3>${esc(group)}</h3><div class="keyboard-controls-list">${KEYBOARD_ACTIONS.filter(action => action.group === group).map(action => {
      const codes = this.draft.bindings[action.id] || [];
      const current = this.captureAction === action.id ? 'Press a key…' : codes.length ? codes.map(bindingLabel).join('  /  ') : 'Unassigned';
      return `<article class="keyboard-control-row"><span class="keyboard-control-name">${esc(action.label)}${action.essential ? '<small>ESSENTIAL</small>' : ''}</span><div class="keyboard-control-actions"><button type="button" class="keyboard-binding ${this.captureAction === action.id ? 'is-listening' : ''}" data-keyboard-bind="${action.id}" aria-label="Change ${esc(action.label)} binding">${esc(current)}</button><button type="button" class="keyboard-reset-one" data-keyboard-reset="${action.id}" aria-label="Reset ${esc(action.label)} to default" title="Reset this binding">Reset</button></div></article>`;
    }).join('')}</div></section>`).join('');
    const conflict = this.pending ? `<aside class="keyboard-conflict" role="alert"><strong>That key is already in use.</strong><p>${esc(this.pending.message)}</p><div><button type="button" class="keyboard-conflict-replace" data-keyboard-editor="replace">Replace conflicting binding${this.pending.conflicts.length > 1 ? 's' : ''}</button><button type="button" data-keyboard-editor="cancel-conflict">Cancel</button></div></aside>` : '';
    const reserved = KEYBOARD_ACTIONS.some(action => action.id === 'inventory' && this.draft.bindings.inventory?.includes('Escape'));
    this.element.innerHTML = `<div class="keyboard-controls-page"><div class="keyboard-controls-intro"><p>Change the keys used by the real gameplay controller. Click a binding, press a key, then save. Duplicate keys are never assigned silently; choosing Replace moves the old binding so essential movement stays available.</p><p class="keyboard-controls-reserved"><kbd>ESC</kbd> is always reserved for closing menus and pausing.</p></div>${conflict}<div class="keyboard-controls-status" role="status" aria-live="polite">${esc(this.status || 'Changes are a draft until you choose Save & apply.')}</div><div class="keyboard-controls-groups">${rows}</div><footer class="keyboard-controls-footer"><button type="button" class="keyboard-reset-all" data-keyboard-editor="reset-all">Reset all to defaults</button><span></span><button type="button" data-keyboard-editor="cancel">Cancel</button><button type="button" class="keyboard-save" data-keyboard-editor="save">Save &amp; apply</button></footer></div>`;
    if (this.captureAction) this.element.querySelector(`[data-keyboard-bind="${this.captureAction}"]`)?.focus({ preventScroll: true });
    void reserved;
  }

  handleClick(event) {
    const bind = event.target.closest?.('[data-keyboard-bind]');
    if (bind) {
      this.captureAction = bind.dataset.keyboardBind;
      this.pending = null;
      this.status = `Waiting for a key for “${actionById.get(this.captureAction)?.label || this.captureAction}”. Press Escape to cancel this rebinding.`;
      this.render();
      return;
    }
    const reset = event.target.closest?.('[data-keyboard-reset]');
    if (reset) {
      this.requestReset(reset.dataset.keyboardReset);
      return;
    }
    const action = event.target.closest?.('[data-keyboard-editor]')?.dataset.keyboardEditor;
    if (!action) return;
    if (action === 'reset-all') {
      this.draft = defaultKeyboardBindings();
      this.pending = null;
      this.captureAction = null;
      this.status = 'All keyboard bindings have been reset in this draft.';
      this.render();
    } else if (action === 'replace') this.applyPending(true);
    else if (action === 'cancel-conflict') {
      this.pending = null;
      this.status = 'No binding was changed.';
      this.render();
    } else if (action === 'save') this.save();
    else if (action === 'cancel') this.onBack();
  }

  handleKeyDown(event) {
    if (!this.captureAction) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();
    if (event.repeat) return;
    if (event.code === 'Escape' || event.key === 'Escape') {
      this.captureAction = null;
      this.pending = null;
      this.status = 'Rebinding cancelled. Escape remains the menu exit key.';
      this.render();
      return;
    }
    const action = this.captureAction;
    const code = keyboardCodeFromEvent(event);
    if (!isValidKeyboardBinding(code, action)) {
      this.status = code === 'Escape' ? 'Escape is reserved for closing menus.' : 'That key cannot be used for this action. Try a letter, number, arrow, or function key.';
      this.render();
      return;
    }
    this.captureAction = null;
    this.requestBinding(action, code);
  }

  requestBinding(actionId, code) {
    if (!actionById.has(actionId) || !isValidKeyboardBinding(code, actionId)) return;
    const conflicts = this.bindings.conflicts(code, actionId, this.draft);
    if (conflicts.length) {
      const names = conflicts.map(id => actionById.get(id).label).join(', ');
      this.pending = { actionId, codes: [code], conflicts, message: `${bindingLabel(code)} is currently assigned to ${names}. Replace the conflicting binding or cancel.` };
      this.status = '';
      this.render();
      return;
    }
    this.draft.bindings[actionId] = [code];
    this.draft = normalizeKeyboardBindings(this.draft);
    this.pending = null;
    this.status = `${actionById.get(actionId).label} is now ${bindingLabel(code)} in this draft.`;
    this.render();
  }

  requestReset(actionId) {
    const definition = actionById.get(actionId);
    if (!definition) return;
    const conflicts = new Set();
    for (const code of definition.defaults) for (const id of this.bindings.conflicts(code, actionId, this.draft)) conflicts.add(id);
    if (conflicts.size) {
      const list = [...conflicts];
      this.pending = { actionId, codes: [...definition.defaults], conflicts: list, message: `Resetting ${definition.label} restores ${definition.defaults.map(bindingLabel).join(' / ')}, currently used by ${list.map(id => actionById.get(id).label).join(', ')}. Replace those conflicting bindings or cancel.` };
      this.status = '';
      this.render();
      return;
    }
    this.draft.bindings[actionId] = [...definition.defaults];
    this.draft = normalizeKeyboardBindings(this.draft);
    this.status = `${definition.label} restored to its default.`;
    this.render();
  }

  applyPending(replace) {
    if (!this.pending) return;
    const { actionId, codes, conflicts } = this.pending;
    if (!replace) return;
    const previous = [...(this.draft.bindings[actionId] || [])];
    const desired = new Set(codes);
    const excluded = new Set([actionId, ...conflicts]);
    const used = new Set();
    for (const action of KEYBOARD_ACTIONS) {
      if (excluded.has(action.id)) continue;
      for (const code of this.draft.bindings[action.id] || []) used.add(code);
    }
    for (const conflictId of conflicts) {
      const existing = (this.draft.bindings[conflictId] || []).filter(code => !desired.has(code));
      let next = existing;
      if (!next.length) {
        const returned = previous.find(code => !desired.has(code) && !used.has(code));
        const fallback = fallbackCodes.find(code => !desired.has(code) && !used.has(code) && isValidKeyboardBinding(code, conflictId));
        const replacement = returned || fallback;
        if (replacement) next = [replacement];
      }
      this.draft.bindings[conflictId] = next;
      for (const code of next) used.add(code);
    }
    this.draft.bindings[actionId] = [...codes];
    this.draft = normalizeKeyboardBindings(this.draft);
    this.pending = null;
    this.status = `Conflicting bindings were moved. ${actionById.get(actionId).label} is ready to save.`;
    this.render();
  }

  save() {
    if (this.captureAction) {
      this.status = 'Finish or cancel the key capture before saving.';
      this.render();
      return;
    }
    if (this.pending) {
      this.status = 'Resolve or cancel the duplicate-key warning before saving.';
      this.render();
      return;
    }
    const persisted = this.bindings.apply(this.draft);
    this.draft = normalizeKeyboardBindings(this.bindings.bindings);
    this.onSaved(persisted);
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.abort.abort();
    this.element.replaceChildren();
  }
}
