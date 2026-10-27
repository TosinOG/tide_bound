import './style.css';
import './menu.css';
import './exploration.css';
import './mobile-controls.css';
import './keyboard-controls.css';
import { Game } from './game.js';
import { MainMenu } from './menu.js';
import { SeaAudio } from './audio.js';
import { logoMark } from './icons.js';
import { normalizePreferences, readPreferences, writePreferences } from './config.js';
import { KeyboardBindings } from './input-bindings.js';
import { SAVE_KEY, readStoredSave, writeStoredSave, readBackup, quarantineUnreadableSave } from './persistence.js';

let menu = null;
let game = null;
let settings;
let audio;
let keyboardBindings;
let transitioning = false;

function getKeyboardBindings() {
  if (keyboardBindings) return keyboardBindings;
  try { keyboardBindings = new KeyboardBindings(localStorage); }
  catch { keyboardBindings = new KeyboardBindings(null); }
  return keyboardBindings;
}

function refreshSave() {
  try { return readStoredSave(localStorage); }
  catch (error) { return { data: null, unavailable: true, error: error.message }; }
}

function preferencesFor(saveStatus) {
  try { return readPreferences(localStorage, saveStatus.data?.settings || {}); }
  catch { return normalizePreferences(saveStatus.data?.settings || {}); }
}

function changeSettings(next) {
  settings = normalizePreferences(next);
  try { writePreferences(localStorage, settings); } catch { /* Session settings still apply. */ }
  audio.applySettings(settings);
  return settings;
}

function restoreBackup(queryOnly = false) {
  const backup = readBackup(localStorage);
  if (queryOnly) return backup?.data || null;
  if (!backup) throw new Error('No valid local backup was found. Your current save was not changed.');
  if (localStorage.getItem(SAVE_KEY) !== null) quarantineUnreadableSave(localStorage);
  writeStoredSave(localStorage, backup.data, { importing: true });
  return refreshSave();
}

function loadingOverlay(title = 'FOLLOWING THE TIDE', caption = 'PREPARING YOUR VOYAGE') {
  const element = document.createElement('div');
  element.className = 'voyage-loading';
  element.innerHTML = `${logoMark()}<strong>${title}</strong><span>${caption}</span>`;
  document.body.appendChild(element);
  return element;
}

function removeLoading(element) {
  if (!element) return;
  element.classList.add('done');
  setTimeout(() => element.remove(), 550);
}

function showMenu() {
  if (menu) menu.dispose();
  document.getElementById('stage').replaceChildren();
  document.getElementById('hud').replaceChildren();
  document.getElementById('modal-root').replaceChildren();
  document.body.classList.remove('voyage-started', 'menu-open', 'is-building', 'hide-hud', 'underwater');
  document.body.classList.add('main-menu-active');
  const saveStatus = refreshSave();
  if (!settings) settings = preferencesFor(saveStatus);
  if (!audio) audio = new SeaAudio(settings);
  audio.applySettings(settings);
  menu = new MainMenu({
    stage: document.getElementById('stage'),
    saveStatus,
    settings,
    audio,
    inputBindings: getKeyboardBindings(),
    onPlay: startVoyage,
    onSettings: changeSettings,
    onRefreshSave: refreshSave,
    onRestoreBackup: restoreBackup,
  });
  return menu;
}

async function startVoyage({ mode, confirmed }) {
  if (transitioning || !menu) return false;
  let status = refreshSave();
  if (mode === 'continue' && !status.data) {
    menu.updateSaveStatus(status);
    menu.openPanel(status.error ? 'save-error' : 'play');
    return false;
  }
  if (mode === 'new' && status.data && !confirmed) {
    menu.openPanel('confirm-new');
    return false;
  }
  if (mode === 'new' && status.error && !status.unavailable) {
    if (!confirmed) { menu.openPanel('confirm-new'); return false; }
    try {
      quarantineUnreadableSave(localStorage);
      status = refreshSave();
    } catch (error) {
      menu.saveStatus = { data: null, error: `The unreadable save could not be backed up, so it was left untouched. ${error.message}` };
      menu.openPanel('save-error');
      return false;
    }
  }

  transitioning = true;
  const departingMenu = menu;
  await departingMenu.beginTransition();
  departingMenu.dispose();
  if (menu === departingMenu) menu = null;
  document.body.classList.remove('main-menu-active');
  const loading = loadingOverlay();
  // Paint the transition before the synchronous initial island batch runs.
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  try {
    const saved = mode === 'continue' ? status.data : null;
    const loadStatus = mode === 'continue' ? status : { data: null, unavailable: status.unavailable };
    game = new Game({
      saved,
      loadStatus,
      settings,
      audio,
      inputBindings: getKeyboardBindings(),
      onMainMenu: returnToMenu,
    });
    game.start();
    audio.setScene('game');
    // A confirmed new voyage gets an initial snapshot. writeStoredSave rotates
    // any previous valid current save into the existing previous-save backup.
    if (mode === 'new') game.save();
    removeLoading(loading);
    transitioning = false;
    return true;
  } catch (error) {
    console.error('Tidebound Gold could not initialize gameplay:', error);
    try { game?.dispose({ save: false }); } catch { /* Partial initialization fallback. */ }
    game = null;
    removeLoading(loading);
    const recoveredMenu = showMenu();
    recoveredMenu.showLaunchError(error.message);
    transitioning = false;
    return true;
  }
}

async function returnToMenu(owner) {
  if (transitioning || owner !== game) return;
  transitioning = true;
  const loading = loadingOverlay('RETURNING TO THE HORIZON', 'YOUR VOYAGE IS BEING SAVED');
  await new Promise(resolve => requestAnimationFrame(resolve));
  try {
    owner.save();
    owner.dispose({ save: false });
  } catch (error) {
    console.warn('Gameplay teardown did not complete cleanly:', error);
    try { owner.dispose({ save: false }); } catch { /* Reload remains available. */ }
  }
  game = null;
  settings = preferencesFor(refreshSave());
  showMenu();
  removeLoading(loading);
  transitioning = false;
}

// Read-only application inspection complements the existing game inspector and
// lets browser acceptance verify that gameplay is absent while the menu is up.
Object.defineProperty(window, 'tideboundApp', {
  configurable: true,
  value: Object.freeze({
    get game() { return game; },
    get menu() { return menu; },
    get transitioning() { return transitioning; },
  }),
});

async function boot() {
  try {
    await Promise.all([document.fonts.load('400 14px Outfit'), document.fonts.load('400 30px Fraunces')]);
    showMenu();
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const loading = document.getElementById('loading');
      loading?.classList.add('done');
      setTimeout(() => loading?.remove(), 700);
    }));
  } catch (error) {
    console.error('Tidebound Gold could not initialize:', error);
    const loading = document.getElementById('loading');
    if (!loading) return;
    loading.style.pointerEvents = 'auto';
    loading.innerHTML = '<div class="error-content"><div class="loading-symbol">≈</div><h1>We couldn’t reach the water.</h1><p>The menu could not be initialized. Try a current browser with JavaScript enabled, then reload.</p><code id="error-detail"></code><button class="button primary" onclick="location.reload()">Try again →</button></div>';
    document.getElementById('error-detail').textContent = error.message;
  }
}

boot();
