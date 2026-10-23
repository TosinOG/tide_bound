# Tidebound Gold — cinematic menu and exploration upgrade plan

## Recoverable baseline

- Branch: `arena/b9c29843-tide-bound`
- Baseline commit: `001ea08631f30c623f93634ebc7347baab7288b5`
- Architecture verified from source: vanilla ESM, Three.js 0.170, Vite 7, local WebAudio, localStorage V2 saves, one `Game.frame` RAF loop.
- Existing playable systems: six deterministic biome families; streamed terrain/collision; finite resources and landmarks; journals and ordered waystones; hidden chests; inventory/crafting/research; support-aware grid building; sailing/chart/weather; survival/shark/jellyfish/fire hazards; quests/rescue; import/export/backups; quality/adaptive-quality controls; standalone packaging.
- `npm test`: 68/68 passed after `npm ci` (initial failure was missing dependencies).
- `npm run build`: passed after `npm ci`.
- Browser baseline could not initially launch because Chromium was absent; Playwright's CDN is not network-accessible in this sandbox. No browser result is inferred from the historical reports.

## File-by-file implementation

### Stage B — menu and safe lifecycle

- `src/main.js`: replace eager `new Game()` with an application coordinator. Keep menu and gameplay exclusive; show loading/error feedback and cinematic transitions.
- `src/menu.js` (new): accessible main menu, Play/Continue/New Game choices, save validation status, Settings, How to Play, Credits, keyboard/focus behavior, and independent persisted menu preferences.
- `src/menu-scene.js` (new): bounded original procedural Three.js sunset ocean/island/ship scene; one owned RAF; reduced-motion and quality awareness; complete renderer/resource disposal.
- `src/menu.css` (new, imported by the existing stylesheet or main): responsive cinematic menu and panel styling coherent with the current HUD.
- `src/game.js`: optional constructor bootstrap options while preserving `new Game()` compatibility; explicit start for menu entry; owned listeners/RAF and idempotent disposal; Main Menu callback; real audio/control/graphics settings.
- `src/ui.js`: Main Menu pause action, real setting controls, menu-aware save actions, listener cleanup, and no duplicate welcome flow after cinematic entry.
- `src/audio.js`: independent master/music/ambience/effects gains with no duplicated contexts or loops.
- `src/persistence.js`: additive validated setting defaults and save-status helpers only where needed; keep schema 2 and existing world/item/progress IDs.
- `src/config.js` (new if warranted): safe standalone preference storage shared by menu and game, separate from voyage data.

### Stages C–F — compatible gameplay improvements

- Reuse `island-terrain.js`, `island-generation.js`, `world.js`, `systems.js`, `data.js`, and `assets.js`; do not add another generator, inventory, construction engine, or quest framework.
- Audit the shallow-water gap and, if stable, add a focused swimming/reef interaction with clear feedback and persistence through existing collected IDs. Avoid oxygen and new physics unless justified by the existing controller.
- Improve existing feedback/audio/visual presentation and settings rather than adding decorative controls.
- Keep all six biome IDs, original rescue route, recipe IDs, construction rules, and save compatibility.

### Stage G — verification

- Add pure tests for preferences/save menu decisions and browser tests for menu-first boot, no gameplay initialization, Play/Continue/New confirmation, invalid-save recovery, panel keyboard access, pause-to-menu, and re-entry without duplicate loops/listeners.
- Run `npm test`, production build, available real-browser suites, standalone build/tests, and representative profiles where the environment permits.
- Record actual Chromium/renderer/viewport results and explicitly list unavailable hardware/browser coverage.
- Update README and the upgrade report only with verified functionality.

## Safety constraints

No new runtime services, paid assets, remote art/audio, or replacement template. No save deletion on ordinary menu transitions. New Game over an existing voyage requires confirmation and retains a recoverable previous save where storage permits. Invalid saves never silently become a new world. The existing Vercel Vite output remains `dist/`.

## Current status

Stage B (menu/lifecycle/settings/recovery) and the focused Stage C shallow-reef exploration increment are implemented and verified. The menu-aware unit/browser suites, production build and standalone offline package pass; see `GOLD-2-VERIFICATION.md` for exact current counts and unverified coverage. Broader legacy browser aggregates and hardware-GPU profiling were not rerun, and no Vercel deployment was performed.
