# Tidebound Gold — menu and shallow-dive verification

Date: 2026-10-23  
Branch: `arena/b9c29843-tide-bound`  
Recoverable baseline: `001ea08631f30c623f93634ebc7347baab7288b5`

## Implemented and exercised

### Menu-first application

- The animated Three.js menu is constructed before gameplay; no survival world, player, or gameplay RAF runs behind it.
- PLAY, validated CONTINUE, SETTINGS, HOW TO PLAY and CREDITS are functional. New Game over an existing or unreadable save requires explicit confirmation.
- Continue failures preserve the original payload and explain the problem. Confirmed replacement retains an exact raw recovery copy when storage permits; ordinary replacement retains the previous validated save.
- Volume/music/ambience/effects, quality, adaptive quality, pixel ratio, sensitivity, relaxed survival, weather and hints use bounded settings. Global preferences are separate from voyage saves.
- Pause → Main Menu saves and disposes gameplay. Later entry creates a fresh game with one owned RAF/listener set.
- Credits contain only the requested game/developer/contact details and working email/Instagram links.
- Keyboard focus, Escape behavior, responsive panels, reduced-motion handling and portrait layouts were exercised.

### Focused underwater exploration

- **C** and the touch **C** button toggle a shallow dive while swimming. **C** or **Space** surfaces. There is deliberately no oxygen timer.
- The existing movement controller is seabed-aware; very shallow ground and raft ledge grabs safely clear diving. The camera is actually below the analytical water surface while diving.
- Every island deterministically places one finite sunken keeper's cache on an existing submerged coral-shelf region after land-resource/navigation validation. Land routes and original resource IDs are not moved to accommodate it.
- Surface collection is rejected. Recovery requires diving, existing reach/line-of-sight rules and a live island/resource reference.
- Each cache grants existing useful items (one sea-glass coral, two scrap, one rope), adds a connected journal clue and advances the optional `below-the-blue` quest. Its reward is one existing cooked fish.
- Collection, quest rewards and notebook entries are exactly once. The underwater HUD, fog, water surface and filtered ambience restore on surfacing/menu disposal.

## Current verification results

| Check | Result |
|---|---|
| JavaScript syntax checks (`src/*.js`, `tests/*.mjs`) | Passed |
| `git diff --check` | Passed |
| `npm test` | **71/71 passed** |
| `npm run build` | Passed; 28 modules transformed |
| `node tests/menu.mjs` | **21/21 passed**, zero captured browser/console errors |
| `node tests/exploration.mjs` | **14/14 passed**, zero captured browser/console errors |
| `npm run build:standalone` | Passed; self-contained HTML is 1.41 MB |
| `node tests/standalone.mjs` | **2/2 offline scenarios passed**, zero external requests/errors |

Current production build output:

- `dist/index.html`: 1.66 kB (0.91 kB gzip)
- `dist/assets/index-B0luDSs7.css`: 94.07 kB (19.96 kB gzip)
- `dist/assets/index-B1W1SfmJ.js`: 799.18 kB (230.00 kB gzip)

Machine-readable browser results:

- `reports/gold2-menu-smoke.json`
- `reports/gold2-exploration-smoke.json`

Visual evidence inspected:

- `reports/gold2-menu-desktop.png`
- `reports/gold2-menu-settings.png`
- `reports/gold2-menu-mobile.png`
- `reports/gold2-menu-mobile-guide.png`
- `reports/gold2-reef-dive.png`
- `reports/gold2-reef-mobile.png`

## Environment and honest performance limits

Browser checks used headless **Chromium 153 with SwiftShader software rendering**. Desktop viewport was **1440×900, DPR 1**; mobile emulation was **390×844, DPR 1** with touch. Reef tests use deterministic inspector positioning to avoid a long sail, then exercise actual keyboard/touch input, movement, interaction, inventory/quest events and menu/save flows.

**No current hardware-GPU FPS measurement was taken.** SwiftShader screenshots, draw counts and functional test duration are not hardware FPS evidence. Real low-end GPUs (including GT710-class hardware), physical phones/gamepads, Firefox and Safari remain unverified in this environment. No FPS guarantee is made.

The older `npm run test:browser` / `npm run test:all` browser aggregates were not rerun after the menu-first architecture change and are not included in the 35 menu/exploration checks above. The current standalone suite was updated and run separately. Historical profile reports remain historical, not measurements of this build.

## Save and deployment notes

- Save schema remains **2**, storage keys remain compatible, and island generation remains **3**.
- Additive fields are `progress.reefs` and `player.diving`; old saves default to `0` and `false`. Diving is normalized off if the saved player is not swimming.
- `:explore:reef` collected IDs are validated with the other exploration IDs. Existing inventory, structures, research, quests, rescue progress and V1→V2 migration remain in place.
- Preferences use `tidebound.settings.v1`; voyage data remains in `tidebound.save.v2`. Raw corrupt-save recovery uses `tidebound.save.recovery.raw` when a replacement is explicitly confirmed.
- `vercel.json` remains the standard Vite deployment: build `npm run build`, output `dist`. No environment variables, secrets, paid services or remote runtime assets were added.
- The production build succeeded locally. **No Vercel deployment or live-URL change was performed in this stage.**

## Reproduce locally

```sh
npm ci
npm run dev -- --port 3000
# In another terminal:
npm test
npm run build
npm run test:menu
npm run test:exploration
npm run test:standalone
```

The browser scripts use Playwright's normal Chromium by default. In this sandbox only, they were run with:

```sh
CHROMIUM_EXECUTABLE=/tmp/chromium LD_LIBRARY_PATH=/tmp/al2023/lib node tests/menu.mjs
CHROMIUM_EXECUTABLE=/tmp/chromium LD_LIBRARY_PATH=/tmp/al2023/lib node tests/exploration.mjs
CHROMIUM_EXECUTABLE=/tmp/chromium LD_LIBRARY_PATH=/tmp/al2023/lib node tests/standalone.mjs
```
