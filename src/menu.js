import { MenuScene } from './menu-scene.js';
import { icon, logoMark } from './icons.js';
import { META } from './data.js';
import { readRawSave, RECOVERY_SAVE_KEY } from './persistence.js';
import { ControlsEditor } from './controls-editor.js';
import { bindingLabel } from './input-bindings.js';

const esc = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const key = value => `<kbd>${value}</kbd>`;
const button = (label, action, className = 'menu-button', extra = '') => `<button type="button" class="${className}" data-menu-action="${action}" ${extra}>${label}</button>`;

export class MainMenu {
  constructor({ stage, saveStatus, settings, audio, inputBindings, onPlay, onSettings, onRefreshSave, onRestoreBackup }) {
    this.stage = stage;
    this.saveStatus = saveStatus;
    this.settings = settings;
    this.audio = audio;
    this.inputBindings = inputBindings;
    this.controlsEditor = null;
    this.controlSaveMessage = '';
    this.onPlay = onPlay;
    this.onSettings = onSettings;
    this.onRefreshSave = onRefreshSave;
    this.onRestoreBackup = onRestoreBackup;
    this.panel = null;
    this.disposed = false;
    this.busy = false;
    this.abort = new AbortController();
    this.root = document.createElement('div');
    this.root.id = 'main-menu';
    this.root.innerHTML = this.template();
    document.body.appendChild(this.root);
    this.home = this.root.querySelector('#menu-home');
    this.overlay = this.root.querySelector('#menu-panel-overlay');
    this.panelElement = this.root.querySelector('#menu-panel');
    this.updateSaveStatus(saveStatus);
    this.bind();
    try {
      this.scene = new MenuScene(stage, settings);
    } catch (error) {
      console.warn('Cinematic background unavailable; using the accessible menu fallback.', error);
      this.root.classList.add('menu-fallback');
    }
    this.audio.setScene('menu');
  }

  keyLabel(action) { return (this.inputBindings?.codesForAction(action) || []).map(bindingLabel).join(' / ') || 'Unbound'; }
  keycaps(action) { return (this.inputBindings?.codesForAction(action) || []).map(code => key(esc(bindingLabel(code)))).join(' / ') || key('—'); }

  template() {
    return `
      <div class="menu-color-wash" aria-hidden="true"></div>
      <div id="menu-home" class="menu-home">
        <header class="menu-topbar">
          <div class="menu-brand-mark">${logoMark()}<span>AN ORIGINAL OCEAN ADVENTURE</span></div>
          <span class="menu-edition">GOLD EDITION <i></i> SINGLE PLAYER</span>
        </header>
        <main class="menu-hero" aria-labelledby="game-title">
          <div class="menu-eyebrow"><span></span> THE FORGOTTEN SEA IS CALLING</div>
          <h1 id="game-title"><span>TIDEBOUND</span><strong>GOLD</strong></h1>
          <p class="menu-tagline">Chart the Unknown. <em>Claim the Forgotten.</em></p>
          <p class="menu-intro">A little raft. An endless ocean. Build a home between the waves and follow old stories to shores no map remembers.</p>
          <div class="menu-primary-row">
            ${button(`<span>PLAY</span>${icon('arrow', '', 22)}`, 'play', 'menu-play')}
            <span class="menu-play-caption">YOUR NEXT HORIZON AWAITS</span>
          </div>
          <nav class="menu-nav" aria-label="Main menu">
            ${button('CONTINUE', 'continue', 'menu-nav-button', 'id="continue-button"')}
            ${button('SETTINGS', 'settings', 'menu-nav-button')}
            ${button('HOW TO PLAY', 'guide', 'menu-nav-button')}
            ${button('CREDITS', 'credits', 'menu-nav-button')}
          </nav>
          <div id="menu-save-status" class="menu-save-status" aria-live="polite"></div>
        </main>
        <aside class="menu-quote" aria-hidden="true"><span>FIELD NOTE · 01</span><blockquote>“The sea does not keep nothing.<br>It only waits for you to look.”</blockquote></aside>
        <footer class="menu-footer">
          <span>DEVELOPED BY <strong>TOSIN</strong></span>
          <div><a href="mailto:tosingamer02@gmail.com">tosingamer02@gmail.com</a><i></i><a href="https://www.instagram.com/alpha_r00t/" target="_blank" rel="noopener noreferrer">INSTAGRAM · @alpha_r00t</a></div>
          <span>V${META.version}</span>
        </footer>
      </div>
      <div id="menu-panel-overlay" class="menu-panel-overlay hidden">
        <section id="menu-panel" class="menu-panel" role="dialog" aria-modal="true" aria-labelledby="menu-panel-title" tabindex="-1"></section>
      </div>
      <div class="menu-voyage-transition" aria-hidden="true"><div class="transition-mark">${logoMark()}</div><span>FOLLOWING THE TIDE</span><i></i></div>
    `;
  }

  bind() {
    const signal = this.abort.signal;
    this.root.addEventListener('click', event => {
      const target = event.target.closest('[data-menu-action]');
      if (!target || target.disabled || this.busy) return;
      event.preventDefault();
      this.audio.init();
      this.audio.play('click');
      this.handleAction(target.dataset.menuAction, target);
    }, { signal });
    this.root.addEventListener('input', event => {
      if (event.target.matches('input[type="range"][data-preference]')) this.changePreference(event.target);
    }, { signal });
    this.root.addEventListener('change', event => {
      if (event.target.matches('select[data-preference],input[type="checkbox"][data-preference]')) this.changePreference(event.target);
    }, { signal });
    document.addEventListener('keydown', event => this.handleKey(event), { signal });
  }

  handleAction(action) {
    if (action === 'play') return this.openPanel('play');
    if (action === 'continue') {
      if (this.saveStatus?.data) return this.startVoyage('continue');
      return this.openPanel(this.saveStatus?.error ? 'save-error' : 'play');
    }
    if (['settings', 'guide', 'credits', 'controls'].includes(action)) return this.openPanel(action);
    if (action === 'close') return this.closePanel();
    if (action === 'new') {
      if (this.saveStatus?.data || (this.saveStatus?.error && !this.saveStatus?.unavailable)) return this.openPanel('confirm-new');
      return this.startVoyage('new');
    }
    if (action === 'voyage-continue') return this.startVoyage('continue');
    if (action === 'voyage-new') return this.startVoyage('new');
    if (action === 'voyage-new-confirmed') return this.startVoyage('new', true);
    if (action === 'download-raw') return this.downloadRawSave();
    if (action === 'restore-backup') return this.restoreBackup();
    if (action === 'retry-save') {
      this.updateSaveStatus(this.onRefreshSave());
      return this.openPanel(this.saveStatus?.error ? 'save-error' : 'play');
    }
  }

  handleKey(event) {
    if (this.disposed) return;
    if (event.key === 'Escape' && this.panel && !this.busy) {
      event.preventDefault();
      if (this.panel === 'controls') this.openPanel('settings');
      else this.closePanel();
      return;
    }
    if (this.panel && event.key === 'Tab') {
      const focusable = [...this.panelElement.querySelectorAll('button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),[tabindex="0"]')].filter(element => element.offsetParent !== null);
      if (!focusable.length) { event.preventDefault(); this.panelElement.focus(); return; }
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      return;
    }
    if (!this.panel && ['ArrowDown', 'ArrowUp'].includes(event.key) && event.target.closest('.menu-nav,.menu-primary-row')) {
      const controls = [...this.home.querySelectorAll('.menu-play,.menu-nav-button:not(:disabled)')];
      const current = Math.max(0, controls.indexOf(document.activeElement));
      const next = (current + (event.key === 'ArrowDown' ? 1 : -1) + controls.length) % controls.length;
      event.preventDefault();
      controls[next].focus();
    }
  }

  updateSaveStatus(status) {
    this.saveStatus = status || { data: null };
    const element = this.root.querySelector('#menu-save-status');
    const continueButton = this.root.querySelector('#continue-button');
    if (!element || !continueButton) return;
    if (this.saveStatus.data) {
      const save = this.saveStatus.data;
      const day = 1 + Math.floor(save.time.elapsed / 1200);
      element.innerHTML = `<span class="save-dot"></span> VOYAGE FOUND · DAY ${day} · ${save.blocks.length} STRUCTURES · ${save.world.discovered.length} SHORES CHARTED`;
      continueButton.disabled = false;
      continueButton.textContent = 'CONTINUE';
    } else if (this.saveStatus.error) {
      element.innerHTML = `<span class="save-dot warning"></span> ${this.saveStatus.unavailable ? 'LOCAL STORAGE IS UNAVAILABLE · NEW VOYAGES MAY BE TEMPORARY' : 'A LOCAL VOYAGE NEEDS RECOVERY · NOTHING HAS BEEN REPLACED'}`;
      continueButton.disabled = false;
      continueButton.textContent = 'SAVE RECOVERY';
    } else {
      element.innerHTML = '<span class="save-dot"></span> NO VOYAGE YET · YOUR PROGRESS STAYS ON THIS DEVICE';
      continueButton.disabled = true;
      continueButton.textContent = 'CONTINUE';
    }
  }

  panelHeading(eyebrow, title, description = '') {
    return `<header class="menu-panel-header"><div><span class="menu-panel-eyebrow">${eyebrow}</span><h2 id="menu-panel-title">${title}</h2>${description ? `<p>${description}</p>` : ''}</div>${button(icon('close'), 'close', 'menu-panel-close', 'aria-label="Back to main menu"')}</header>`;
  }

  panelFooter() {
    return `<footer class="menu-panel-footer"><span>${logoMark()} TIDEBOUND GOLD</span>${button(`BACK TO THE HORIZON ${icon('arrow', '', 15)}`, 'close', 'menu-back-button')}</footer>`;
  }

  openPanel(type) {
    if (this.disposed) return;
    if (type !== 'controls' && this.controlsEditor) { this.controlsEditor.dispose(); this.controlsEditor = null; }
    if (!this.panel) this.previousFocus = document.activeElement;
    this.panel = type;
    this.home.inert = true;
    this.overlay.classList.remove('hidden');
    this.panelElement.className = `menu-panel menu-panel-${type}`;
    if (type === 'play') this.renderPlay();
    else if (type === 'settings') this.renderSettings();
    else if (type === 'controls') this.renderControls();
    else if (type === 'guide') this.renderGuide();
    else if (type === 'credits') this.renderCredits();
    else if (type === 'confirm-new') this.renderConfirmNew();
    else if (type === 'save-error') this.renderSaveError();
    this.panelElement.scrollTop = 0;
    requestAnimationFrame(() => {
      if (!this.disposed && this.panel === type) this.panelElement.querySelector('button:not(.menu-panel-close):not(:disabled),a[href],input,select')?.focus({ preventScroll: true });
    });
  }

  closePanel() {
    if (!this.panel || this.busy) return;
    this.controlsEditor?.dispose();
    this.controlsEditor = null;
    this.panel = null;
    this.overlay.classList.add('hidden');
    this.home.inert = false;
    this.panelElement.innerHTML = '';
    this.previousFocus?.focus?.({ preventScroll: true });
  }

  renderPlay() {
    if (this.saveStatus?.error && !this.saveStatus?.unavailable) return this.renderSaveError();
    const save = this.saveStatus?.data;
    if (save) {
      const day = 1 + Math.floor(save.time.elapsed / 1200);
      this.panelElement.innerHTML = `${this.panelHeading('YOUR VOYAGE AWAITS', 'The sea remembers.', 'Return to your raft, or deliberately begin another story. Your current voyage is never replaced without confirmation.')}
        <div class="voyage-card"><div class="voyage-compass">${icon('compass', '', 48)}</div><div><span>LOCAL VOYAGE · SCHEMA ${save.version}</span><h3>Day ${day} beyond the chart</h3><p>${save.blocks.length} raft structures <i>·</i> ${save.world.discovered.length} charted shores <i>·</i> ${save.notebook.length} journal entries</p></div></div>
        <div class="menu-choice-stack">${button(`${icon('play', '', 18)} CONTINUE THIS VOYAGE ${icon('arrow', '', 17)}`, 'voyage-continue', 'menu-choice primary')} ${button(`${icon('map', '', 18)} NEW GAME <small>Requires confirmation</small>`, 'new', 'menu-choice')}</div>${this.panelFooter()}`;
    } else {
      this.panelElement.innerHTML = `${this.panelHeading('A NEW HORIZON', 'Begin with a little raft.', 'Gather what the current brings. Follow unfamiliar shores. Build something worth calling home.')}
        <div class="new-voyage-features"><article>${icon('hook', '', 25)}<div><h3>Survive & gather</h3><p>Catch salvage, fish, purify water, and keep your needs in balance.</p></div></article><article>${icon('island', '', 25)}<div><h3>Explore & uncover</h3><p>Chart six island families, read forgotten journals, and solve old waystones.</p></div></article><article>${icon('sail', '', 25)}<div><h3>Build & set sail</h3><p>Grow a connected raft into a capable vessel and send a signal home.</p></div></article></div>
        ${this.saveStatus?.unavailable ? '<p class="menu-warning">Browser storage is unavailable. You can play, but this voyage may not survive a reload.</p>' : ''}
        ${button(`NEW GAME ${icon('arrow', '', 18)}`, 'voyage-new', 'menu-choice primary full-width')}${this.panelFooter()}`;
    }
  }

  renderConfirmNew() {
    const unreadable = this.saveStatus?.error && !this.saveStatus?.unavailable;
    this.panelElement.innerHTML = `${this.panelHeading('CONFIRM A NEW VOYAGE', 'Leave this horizon behind?', unreadable ? 'The unreadable local save will first be copied byte-for-byte to a separate recovery slot. Only then will a new voyage begin.' : 'Your existing voyage will remain untouched until the new voyage saves. When storage permits, the existing voyage is retained as the previous-save backup.')}
      <div class="confirmation-note">${icon('save', '', 28)}<p>${unreadable ? 'You can also download the original unreadable data before continuing. This action cannot repair it, but it will not be silently discarded.' : 'If this voyage matters, return to the menu and use Continue, then Settings → Export save for a portable copy.'}</p></div>
      ${unreadable ? button('DOWNLOAD UNREADABLE SAVE', 'download-raw', 'menu-choice full-width') : ''}
      <div class="menu-choice-stack">${button(`YES, BEGIN A NEW VOYAGE ${icon('arrow', '', 17)}`, 'voyage-new-confirmed', 'menu-choice danger')} ${button('KEEP MY CURRENT VOYAGE', 'play', 'menu-choice')}</div>`;
  }

  renderSaveError() {
    const status = this.saveStatus || {};
    const backup = (() => { try { return this.onRestoreBackup?.(true); } catch { return null; } })();
    this.panelElement.innerHTML = `${this.panelHeading('SAVE RECOVERY', 'This voyage could not be read.', 'Tidebound Gold has not started a replacement world and has not overwritten the local data.')}
      <div class="save-error-detail"><strong>WHAT HAPPENED</strong><p>${esc(status.error || 'The save data is unavailable or invalid.')}</p></div>
      <div class="menu-choice-stack">
        ${backup ? button(`${icon('save', '', 18)} RESTORE VALID BACKUP <small>Day ${1 + Math.floor(backup.time.elapsed / 1200)} · confirmation required</small>`, 'restore-backup', 'menu-choice primary') : ''}
        ${button('DOWNLOAD ORIGINAL SAVE DATA', 'download-raw', 'menu-choice')}
        ${button('START A NEW VOYAGE…', 'new', 'menu-choice')}
        ${button('CHECK THE SAVE AGAIN', 'retry-save', 'menu-choice')}
      </div>${this.panelFooter()}`;
  }

  settingRange(id, title, description, value, labels = '') {
    return `<label class="menu-setting menu-setting-range"><span><strong>${title}</strong><small>${description}</small></span><div><input type="range" data-preference="${id}" min="0" max="1" step="0.01" value="${value}" aria-label="${title}"><output data-preference-value="${id}">${Math.round(value * 100)}%</output></div>${labels}</label>`;
  }

  renderSettings() {
    const s = this.settings;
    this.panelElement.innerHTML = `${this.panelHeading('MAKE YOURSELF COMFORTABLE', 'Settings.', 'Every control below is connected to the real menu or gameplay system. Preferences persist separately from your voyage.')}
      <div class="menu-settings-grid"><section><h3>Sound of the sea</h3>
        ${this.settingRange('volume', 'Master volume', 'All menu and game audio.', s.volume)}
        ${this.settingRange('musicVolume', 'Music', 'The original ambient score.', s.musicVolume)}
        ${this.settingRange('ambienceVolume', 'Ocean ambience', 'Wind and water beneath the world.', s.ambienceVolume)}
        ${this.settingRange('effectsVolume', 'Sound effects', 'Gathering, building, warnings, and discoveries.', s.effectsVolume)}
      </section><section><h3>A view worth keeping</h3>
        <label class="menu-setting"><span><strong>Graphics preset</strong><small>Geometry, shadows, view distance, particles, and menu detail.</small></span><select data-preference="quality" aria-label="Graphics preset">${['low', 'medium', 'high'].map(id => `<option value="${id}" ${s.quality === id ? 'selected' : ''}>${id[0].toUpperCase() + id.slice(1)}</option>`).join('')}</select></label>
        <label class="menu-setting"><span><strong>Adaptive quality</strong><small>Steps down under sustained load and recovers gradually.</small></span><input class="menu-toggle" type="checkbox" data-preference="adaptiveQuality" ${s.adaptiveQuality ? 'checked' : ''} aria-label="Adaptive quality"></label>
        <label class="menu-setting"><span><strong>Pixel ratio limit</strong><small>A maximum device and preset may lower further.</small></span><select data-preference="pixelRatio" aria-label="Pixel ratio limit">${[.5, .75, 1, 1.25, 1.5, 2].map(value => `<option value="${value}" ${s.pixelRatio === value ? 'selected' : ''}>${value.toFixed(2)}×</option>`).join('')}</select></label>
        <label class="menu-setting"><span><strong>Show guidance</strong><small>Display the in-game movement hints.</small></span><input class="menu-toggle" type="checkbox" data-preference="showHints" ${s.showHints ? 'checked' : ''} aria-label="Show movement guidance"></label>
      </section><section><h3>Controls & survival</h3>
        <label class="menu-setting menu-setting-range"><span><strong>Mouse sensitivity</strong><small>Right-drag and touch camera speed.</small></span><div><input type="range" data-preference="mouseSensitivity" min="0.25" max="2.5" step="0.05" value="${s.mouseSensitivity}" aria-label="Mouse sensitivity"><output data-preference-value="mouseSensitivity">${s.mouseSensitivity.toFixed(2)}×</output></div></label>
        <label class="menu-setting"><span><strong>Calm seas mode</strong><small>No hunger, thirst, or shark damage in gameplay.</small></span><input class="menu-toggle" type="checkbox" data-preference="relaxed" ${s.relaxed ? 'checked' : ''} aria-label="Calm seas mode"></label>
        ${button('CUSTOMIZE KEYBOARD CONTROLS', 'controls', 'menu-choice full-width')}
        <p class="settings-footnote">${this.controlSaveMessage || 'Escape remains reserved as an always-available menu exit. Changes are saved separately from your voyage.'}</p>
        <p class="settings-footnote">Low disables shadows and reduces scenery, particles, view distance, ocean detail, and resolution. All gathering, landmarks, puzzles, and survival interactions remain available.</p>
      </section></div>${this.panelFooter()}`;
  }

  renderControls() {
    this.controlSaveMessage = '';
    this.panelElement.innerHTML = `${this.panelHeading('YOUR HANDS, YOUR WAY', 'Keyboard controls.', 'Remap the bindings used by the real movement, swimming, survival, and navigation systems.')}
      <div id="keyboard-controls-menu"></div>`;
    this.controlsEditor = new ControlsEditor({
      element: this.panelElement.querySelector('#keyboard-controls-menu'),
      bindings: this.inputBindings,
      onBack: () => this.openPanel('settings'),
      onSaved: persisted => {
        this.controlSaveMessage = persisted ? 'Keyboard controls saved and applied on this device.' : 'Controls applied for this session, but browser storage did not allow saving them.';
        this.controlsEditor?.dispose();
        this.controlsEditor = null;
        this.openPanel('settings');
      },
    });
  }

  renderGuide() {
    const k = action => this.keycaps(action);
    const sections = [
      ['01', 'Move & look', `${k('moveForward')}${k('moveLeft')}${k('moveBackward')}${k('moveRight')} or the left stick moves. Right-drag or the right stick looks around. ${k('jump')} / gamepad A jumps or climbs out of the water; ${k('sprint')} runs. While swimming, ${k('dive')} toggles a dive and ${k('swimUp')} rises. Use ${k('zoomIn')} / ${k('zoomOut')} or Shift + wheel to zoom.`],
      ['02', 'Gather what the current brings', `Select the salvage hook with ${k('slot1')}. Hold left mouse to charge and release near drifting salvage. On land, approach a resource and press ${k('interact')} / gamepad X. Collection feedback names exactly what entered your inventory.`],
      ['03', 'Inventory, crafting & research', `${k('inventory')} / gamepad Y opens the paused workshop. Crafting lists real ingredients and missing requirements. Workstations use ${k('interact')}; research at a workbench documents rare island materials and unlocks useful recipes.`],
      ['04', 'Build & upgrade your raft', `Equip the hammer with ${k('slot2')}. Choose a module above the quickbar; green means valid placement. Right-click builds, ${k('rotateBuild')} rotates, ${k('repairBlock')} repairs, and holding ${k('removeBlock')} dismantles. Structures must retain support from a core foundation. Research unlocks nets, rain collection, plating, and windcatchers.`],
      ['05', 'Health, hunger & thirst', `Thirst drains faster than hunger. Eat and drink from the quickbar; purify seawater and cook fish at stations. Warnings appear before critical states. Storms, reefs, jellyfish, fire, and sharks are telegraphed hazards—not offline penalties.`],
      ['06', 'Sail & navigate', `${k('helm')} / gamepad B takes or leaves the helm; ${k('moveForward')}${k('moveLeft')}${k('moveBackward')}${k('moveRight')} steers. ${k('map')} opens the ocean chart for automatic courses and anchor control. Wind and upgraded navigation affect sailing. Automatic approaches stop offshore so you can swim ashore.`],
      ['07', 'Islands, treasure & ruins', `Every shore has finite supplies and environmental stories. Follow trails to journals and landmarks. Read clues with ${k('interact')}, revisit them with ${k('journal')}, and activate carved waystones in the journal’s order. Hidden chests reward exploration once. Each coast also has one finite sunken cache on a real reef shelf: press ${k('dive')} while swimming, then ${k('interact')} nearby to recover it. The three-fragment rescue objective remains your main route home.`],
      ['08', 'Save, continue & recover', `The game autosaves every 20 simulated seconds and when you return to the menu. Export or import from Settings. CONTINUE validates and restores the local V2 voyage. New Game always asks before replacing an existing one; unreadable saves are protected and can be downloaded or quarantined.`],
    ];
    this.panelElement.innerHTML = `${this.panelHeading('A FIELD GUIDE TO FINDING YOUR FEET', 'How to play.', 'The actual bindings used by this build. Inventory, map, journal, and pause menus stop survival time.')}
      <div class="menu-guide-grid">${sections.map(([number, title, text]) => `<article><span>${number}</span><div><h3>${title}</h3><p>${text}</p></div></article>`).join('')}</div>
      <div class="guide-extra"><span>${k('slot1')}–${k('slot8')} ${k('quickbarPrevious')} ${k('quickbarNext')} / wheel · quickbar</span><span>${k('toggleHUD')} · hide HUD</span><span>${k('help')} · guide</span><span>${k('performance')} · performance</span><span><kbd>ESC</kbd> / Start · pause</span></div>${this.panelFooter()}`;
  }

  renderCredits() {
    this.panelElement.innerHTML = `${this.panelHeading('THE PERSON BEHIND THE HORIZON', 'Credits.', 'An original browser-based pirate survival and exploration adventure.')}
      <div class="credits-layout"><div class="credits-mark">${logoMark()}<span>TIDEBOUND<br><strong>GOLD</strong></span></div><dl><div><dt>GAME</dt><dd>Tidebound Gold</dd></div><div><dt>DEVELOPER</dt><dd>Tosin</dd></div><div><dt>EMAIL</dt><dd><a href="mailto:tosingamer02@gmail.com">tosingamer02@gmail.com</a></dd></div><div><dt>INSTAGRAM</dt><dd><a href="https://www.instagram.com/alpha_r00t/" target="_blank" rel="noopener noreferrer">@alpha_r00t ${icon('arrow', '', 15)}</a></dd></div></dl></div>
      <div class="credits-note"><p>Built with Three.js and Vite. Procedural models, island art, interface illustrations, and synthesized audio are created locally. Bundled typefaces: Fraunces, Outfit, and DM Mono.</p><p>Third-party license notices are included in <code>public/licenses/</code> and the standalone game. No account, tracking, paid API, or remote asset service is required.</p></div>${this.panelFooter()}`;
  }

  changePreference(control) {
    const id = control.dataset.preference;
    let value = control.type === 'checkbox' ? control.checked : control.value;
    if (control.type === 'range' || id === 'pixelRatio') value = Number(value);
    this.settings = this.onSettings({ ...this.settings, [id]: value });
    const output = this.panelElement.querySelector(`[data-preference-value="${id}"]`);
    if (output) output.textContent = id === 'mouseSensitivity' ? `${this.settings.mouseSensitivity.toFixed(2)}×` : `${Math.round(this.settings[id] * 100)}%`;
    this.scene?.setQuality(this.settings);
  }

  async startVoyage(mode, confirmed = false) {
    if (this.busy) return;
    if (mode === 'continue') {
      const latest = this.onRefreshSave();
      this.updateSaveStatus(latest);
      if (!latest.data) { this.openPanel(latest.error ? 'save-error' : 'play'); return; }
    }
    this.busy = true;
    this.root.classList.add('menu-busy');
    try {
      const result = await this.onPlay({ mode, confirmed });
      if (result === false && !this.disposed) {
        this.busy = false;
        this.root.classList.remove('menu-busy', 'menu-departing');
        this.home.inert = !!this.panel;
      }
    } catch (error) {
      this.busy = false;
      this.root.classList.remove('menu-busy', 'menu-departing');
      this.updateSaveStatus(this.onRefreshSave());
      this.saveStatus = { data: null, error: error.message || 'The voyage could not be initialized.' };
      this.openPanel('save-error');
    }
  }

  restoreBackup() {
    if (this.busy) return;
    this.busy = true;
    Promise.resolve(this.onRestoreBackup(false)).then(status => {
      this.busy = false;
      this.updateSaveStatus(status);
      this.openPanel('play');
    }).catch(error => {
      this.busy = false;
      this.saveStatus = { data: null, error: error.message };
      this.openPanel('save-error');
    });
  }

  downloadRawSave() {
    const raw = readRawSave(localStorage) ?? readRawSave(localStorage, RECOVERY_SAVE_KEY);
    if (!raw) return;
    const blob = new Blob([raw], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'tidebound-unreadable-save-recovery.txt';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  showLaunchError(message) {
    this.panel = 'launch-error';
    this.home.inert = true;
    this.overlay.classList.remove('hidden');
    this.panelElement.className = 'menu-panel menu-panel-save-error';
    this.panelElement.innerHTML = `${this.panelHeading('VOYAGE INITIALIZATION', 'We could not set sail.', 'No replacement world was created and your existing local voyage remains available. You can return to the menu and try again.')}
      <div class="save-error-detail"><strong>WHAT HAPPENED</strong><p>${esc(message || 'The 3D game could not be initialized on this device.')}</p></div>
      <div class="menu-choice-stack">${button('BACK TO MAIN MENU', 'close', 'menu-choice primary')}</div>`;
    this.panelElement.querySelector('button')?.focus();
  }

  async beginTransition() {
    this.root.classList.add('menu-departing');
    this.home.inert = true;
    const delay = matchMedia('(prefers-reduced-motion: reduce)').matches ? 60 : 650;
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.abort.abort();
    this.controlsEditor?.dispose();
    this.controlsEditor = null;
    this.scene?.dispose();
    this.root.remove();
  }
}
