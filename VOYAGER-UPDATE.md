# Tidebound Gold — Voyager Update (1.3.0)

**Date:** 27 October 2026 · **Branch:** `arena/086ec891-tide-bound`
**Save schema:** 2 (unchanged) · **Island generation:** 3 (unchanged)

This update implements the recommendations from [`RAFT-GAMES-COMPARISON.md`](RAFT-GAMES-COMPARISON.md), fixes the disappearing mobile landscape controls, and adds a few extra quality-of-life improvements. Everything is additive: existing v1/v2 saves load with bounded defaults, the original three-cache beacon rescue still works, Calm Seas still exists, and tools still have no durability.

---

## 1. The mobile landscape bug — fixed

**Cause.** `src/style.css` only revealed `.mobile-controls` inside `@media(max-width:640px)`. A phone rotated to a typical 844×390 (or 926×428) viewport has `width > 640`, so the base rule `.mobile-controls{display:none}` applied and the joystick plus all four action buttons vanished. A second rule, `@media(pointer:fine) and (max-width:640px)`, hid them on touch-capable narrow screens too.

**Fix.**
- `Game.resize()` now detects a coarse pointer (`matchMedia('(pointer:coarse)')` or `navigator.maxTouchPoints`) and adds `body.touch-landscape` for any landscape orientation, plus `body.touch-device` for general touch styling.
- New CSS: `body.touch-landscape .mobile-controls{display:block!important}` (and a coarse-pointer landscape media query as a fallback), with `body.touch-landscape.menu-open .mobile-controls{display:none!important}` so modals are never blocked.
- Landscape-specific layout: joystick bottom-left, action pad bottom-right (both with `env(safe-area-inset-*)`), compact vitals top-left, centred quickbar with smaller slots, hidden side panels/quest card, repositioned toasts / prompts / build bar / guide card, and `#hud{overflow:hidden}` to prevent scrolling.
- Two extra touch buttons (ocean chart **M**, camera view **V**) and larger hit targets.
- **Hold the hook button to charge a cast** (pointerdown starts `charging`, pointerup casts); the follow-up click is suppressed so a cast never fires twice.
- Regression coverage: `tests/voyager.test.js` asserts the CSS rules and the runtime class logic. The DOM harness instantiates the game at 844×390 and confirms both body classes are set.

---

## 2. The ten gaps from the comparison, implemented

| # | Gap | What 1.3 adds |
|---|---|---|
| 1 | Goal ladder | Three authored story shores (Radio Reef, The Vasagatan, Lighthouse Key) with keeper figures, four-digit codes, supply caches and lore. A `chartTable` reads codes and charts courses. Lighthouse Key has a cold lamp, a great shark boss, a finale with credits and an optional endless voyage. Starter cove journal reveals the first code (4821). |
| 2 | Progression that changes verbs | `scrapHook` → `chainHook` (range, cast speed, up to 3-item hauls), `metalSpear` (28 damage), `axe` (faster dismantle + bonus timber), `paintBrush`. 13 research branches unlock real stations; keeper crates are a new debris type that drops discovery items. |
| 3 | Interlocking economy | `smelter` (copper → ingots), `recycler` (surplus → trader's tokens), `tradingPost` (10 trades), `storageChest` (shared hold), `engine` (5 min of wind-independent 1.55× sailing), `cropPlot` (coconuts/leaves every 90 s), `paintMill`, `cookingPot`. |
| 4 | Survival depth | Three buff meals (`stormShield`, `swiftSwim`, `spearMight`), saved buff timers, weighted fishing table (raw fish, mackerel, puffer, lantern fish), three difficulty presets (Drifter / Castaway / Stormchaser). |
| 5 | Threat variety | Island razorvine patches, a crop-stealing gull with a scare mechanic, and an armoured 240 HP boss shark. Difficulty scales shark patience and damage. |
| 6 | Worlds that surprise | Fixed story chunks override procedural generation; each has a keeper figure, a code resource, a story cache and unique lore. Regular islands gain hazards and keep their trails/journals/waystones/grotto/reef caches. |
| 7 | Building as self-expression | 8 cosmetic blocks (flag, lantern, hammock, planter, painted wall, rug, table, chair), 8-colour paint system with saved `paint` on blocks, and Raft / Workstations / Decorations tabs in the build bar. Hold **R** + drag for smooth rotation. |
| 8 | Feel / immersion | Camera shake, hit-stop, floating pickup/damage numbers, wake particles, footsteps by surface, low-health heartbeat, weather-retuned ambient music, shark tension drone, over a dozen new sound cues, distinct thrust/chop/eat poses, first-person viewmodel with crosshair (**V**), photo mode (**P**, **F9** saves a PNG). |
| 9 | Replayability / social | 23 saved Voyage Log achievements (each grants a token), `B` achievements modal, shareable world seeds in menu + in-game Settings, difficulty presets, post-finale endless mode with escalating storms. True network co-op is still out of scope. |
| 10 | Onboarding | Interactive six-step guide card with a 3D objective beam, one prompt at a time, skippable, with a Settings toggle. Field guide and menu guide gained three new sections. |

Additional improvements not in the original list: build-bar categories, a shared raft hold, a crop-stealing gull, a boss shark variant, `stormShield` blocking lightning fires, difficulty-scaled loot, and a new `crate` debris type.

---

## 3. Quick start for the new content

1. **Begin** a voyage. The guide card shows one step at a time (catch salvage → build → purify → chart → research → defend).
2. Hook a **keeper's crate** (the small wooden box among the debris). It contains one of eight research discoveries plus scrap and rope.
3. Bring the discovery to a **workbench** → Research tab → study it. Research never consumes the item.
4. Build the unlocked station with the hammer (use the **Workstations** tab in the build bar). Press **F** near it.
5. Cook a meal at a **cooking pot**, grow food in a **crop plot**, smelt copper into ingots, recycle surplus into tokens, and trade at a **trading post**.
6. Read the starter cove's trail journal for code **4821**. Build a **charting table** and enter the code to sail to Radio Reef. Each story shore's journal reveals the next code.
7. At Lighthouse Key, interact with the cold lamp with three signal fragments to summon the boss. Defeat it with your spear to light the lamp and finish the story — or keep sailing in endless mode.
8. Press **V** for first-person, **P** then **F9** for a postcard, **B** for your Voyage Log. On a phone in landscape, the joystick and action pad now stay visible.

---

## 4. Files changed

**Core:** `src/data.js` (items, blocks, research, recipes, quests, story, achievements, tuning tables), `src/systems.js` (buffs, difficulty rates, block paint), `src/persistence.js` (validated `voyage` state, buffs, paint, new counters, story collected-ID patterns, boss shark state), `src/progression.js` (`VoyageLog`, `Tutorial`, `voyageMetrics`), `src/config.js` (difficulty, first-person, seed, guide preferences).

**Game:** `src/game.js` (tools, stations, story, boss/finale/endless, feel systems, first-person, photo, tutorial, achievements, engine/crops/gull, snapshot), `src/world.js` (seeded world, story chunks, `SeagullAI`, boss shark variants), `src/island-generation.js` (story shores, keeper figures, code/cache/lamp resources, razorvine hazards), `src/assets.js` (17 new block meshes + crate debris), `src/audio.js` (mood, footsteps, heartbeat, new cues).

**UI / presentation:** `src/ui.js` (guide card, float numbers, buff strip, crosshair, build categories, cookbook/chart/trade/storage/achievements modals, settings, victory, help), `src/style.css` (new panels + mobile landscape fix), `src/menu.js` (difficulty, first-person, guide, world seed, new guide sections).

**Build / docs:** `package.json` (v1.3.0, 80-test script), `README.md`, `BUILD-INFO.json`, `VOYAGER-UPDATE.md`, `tests/voyager.test.js`, regenerated `Tidebound-Gold.html` / `Tosins-Tidebound.html` / `Tidebreak.html` and `web-build/`.

---

## 5. Verification

| Check | Result |
|---|---|
| `npm test` | **80 / 80 passed** (71 existing + 9 new Voyager tests) |
| `npm run build` | Vite production build succeeded (872.9 kB JS, 104.9 kB CSS) |
| `npm run build:standalone` | 1.49 MB standalone HTML; all three filenames byte-identical |
| `web-build/` | Refreshed from `dist/` with matching hashed assets |
| DOM/WebGL-stub harness (3 scenarios) | Zero runtime errors: construction + frames + all modals + methods; story island + codes + boss + finale + save/reload; stations + tools + trade + storage + paint + first-person + photo + landscape resize |
| Chromium browser suites | **Not rerun.** `npx playwright install chromium` was blocked by the sandbox network (only GitHub/npm/pypi hosts are reachable). The existing browser tests were left untouched and should be rerun in a normal environment. |
| Hardware GPU / physical gamepad | Unverified, same as 1.2.0. |

### Known limits (unchanged or deliberate)

- Still single-player; no network co-op.
- The dive system is still shallow with no oxygen meter; story shores add code journals and a lamp rather than a full underwater ruin.
- Story shores are three authored locations, not eight like Raft 1.0.
- Photo export uses `canvas.toDataURL`; some embedded iframes may block downloads (the game already documents this for save export).
- `preserveDrawingBuffer` is intentionally **not** enabled for performance; `F9` captures synchronously inside the render frame. If a browser still returns a blank image, open the standalone HTML in its own tab.

---

## 6. Suggested next steps (not in this update)

1. Rerun `npm run test:browser`, `npm run test:menu`, `npm run test:exploration` and `npm run test:standalone` where Chromium is available; add a landscape-viewport assertion to `tests/endgame.mjs`.
2. Add the second and third story-island set-pieces (a boardable wreck interior and a volcanic forge) with their own puzzles.
3. Add a proper oxygen/air-pocket dive ruin for the reef lantern fish.
4. Consider lightweight async co-op (shared seed + ghost raft) rather than full netcode.
5. Profile the new stations and particle wake on Low preset; tune `ParticlePool` budgets if needed.
