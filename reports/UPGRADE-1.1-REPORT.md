# Tosin’s Tidebound — upgrade and verification report

**Delivered:** 21 October 2026 · **Game:** 1.1.0 · **Save schema:** 2  
**Project:** existing vanilla ESM / Three.js / Vite browser game, upgraded in place.

## Outcome

Rebranded the playable game and extended its existing architecture rather than replacing it. Added a hidden F3 monitor, scalable/adaptive graphics, substantially fewer GPU resources/draw submissions, reliable versioned saves and reservations, protected hold-to-dismantle, optional biome research/raft upgrades, and capped simulation/context recovery. The original rescue route and controls remain. No new runtime dependencies.

**Final `npm run test:all` exited 0:** 56 unit/system tests, 47 browser test groups, and 2 standalone/offline groups passed. Production/standalone builds succeeded. Raw output: `reports/final-all-tests.log`.

**Important performance limitation:** all browser measurements used forced SwiftShader, not a hardware GPU. Draw calls, geometry allocation and CPU submission time improved; software FPS did not improve consistently, and the Low capture regressed. This report does **not** claim a measured low-end-PC FPS win or production-scale endurance.

## 1. Branding and compatibility

- New browser tab, loading/fallback text, intro, HUD wordmark, menus, field guide, pause/death/rescue screens, settings and export filename identify **Tosin’s Tidebound**.
- Package/lock root metadata is `tosins-tidebound` 1.1.0; save version is 2.
- New standalone entry is `Tosins-Tidebound.html`. `Tidebreak.html` remains an identical compatibility copy, not a second old build.
- `window.tidebound` is the developer inspector; `window.tidebreak` remains an alias for existing tools/tests.
- Original V1 save key, source folder/import paths, Vite config, deployment behavior, bundled fonts, and original license attribution are retained. References to Tidebreak in migration help, compatibility names and legal attribution are intentional historical references, not current game branding.

## 2. What changed

### Monitoring and performance

The F3 panel starts hidden. It uses the existing frame owner and a fixed-size sample ring: current/rolling average/min/max FPS, frame ms, rolling graph, Three.js calls/triangles/geometries/textures, actual pixel ratio, quality and fixed-step count. It paints at most every 250 ms, never owns a RAF, and does not paint while hidden. Startup/resume resets discard incomplete intervals rather than clamping them into a fabricated 10,000 FPS maximum; both unit and actual Game-frame regressions cover this. JS heap memory is shown only if `performance.memory` exists; no GPU-memory estimate is fabricated. Shortcuts ignore text-entry controls/contenteditable elements.

Low/Medium/High genuinely change ocean subdivisions, shadow state/map sizes, particles, rain, birds/clouds, distance detail and ratio ceilings. Adaptive quality uses sustained-load windows, cooldown and recovery hysteresis, with a ceiling at the user's requested preset. A separate 0.50–2.00 ratio maximum is adjustable.

Static models batch plank/color draws into shared buffers with vertex colors. Primitive/model/material caches have bounded, reusable keys; damage clones have explicit ownership and are freed on repair/removal. Frustum/distance visibility and a budgeted 3×3 chunk neighborhood bound work; owned island buffers are disposed on unload. Large detached structures consolidate recoverable supplies into at most 12 floating bundles.

### Save reliability

V2 preserves player motion/survival/debuff state, raft motion/buoyancy/anchor/sail/helm/course, structures/HP/production timers, inventory, research, world/clock/weather, journal, quest completion IDs, camera/selection, active jobs, fires, shark state, and reclaimed bundles.

- Reservations are identified by recipe ID and stable grid station key, not mutable numeric block IDs or imported recipe objects.
- Ingredients are spent once, completion clears the reservation before callbacks, cancellation refunds once, and station destruction settles immediately.
- Rainwater's fuel-free variant is explicit: it cannot create/refund fuel during save/cancel/load.
- Strict validation precedes import confirmation and storage replacement. Unknown/newer versions, malformed numbers/counts/items, overlapping cells, unsupported graphs, duplicate/missing-station jobs, invalid research, oversized data and impossible state are rejected safely.
- V1 inventory already contains old in-progress refunds, so migration does not refund those jobs again or replay old quest rewards.
- A legitimate V1 station suspended sideways by the old support bug is converted into its full building materials once; the player is informed. Truly detached/invalid V1 data remains rejected without destroying its source.
- Original V1 storage is retained. Rotating previous-save and separate pre-import backups are maintained when storage permits.
- Corrupt local data is protected from overwrite by the temporary voyage.
- A regression found that the old page's unload autosave overwrote confirmed imports and could resurrect a reset voyage. Import/new-voyage navigation now suppresses that old-page save; **both are tested across real navigation/reload**.
- Very small positive HP produced by fractional simulation damage is accepted; a zero-health/dead snapshot is not mistaken for a living checkpoint.

### Building and crafting safety

Hammer targets receive an outline and contextual message, with reach and core checks. Dismantling requires an uninterrupted 0.95 s hold, or 1.6 s if support will cascade; a tap/release/target change/pause cancels it. Core foundations cannot be manually dismantled. The preview and actual support graph use the same rules. Stations cannot hold up decks sideways; upper floors retain horizontal bridge behavior from legitimate wall/stair supports. Detached station jobs refund exact reserved inputs before salvage is granted. Grid placement validates occupancy/integer coordinates and protects existing cells.

### Progression and combat

Seven main and four optional quests are data-driven with persistent, exactly-once rewards. The old three-cache/copper/beacon rescue route is unchanged.

- Palm cay: tidal spring, palm resin, water and island notes.
- Coral atoll: wrecked skiff, sea glass coral and scrap.
- Forgotten outpost: abandoned observatory, navigator’s lens and copper.
- Finite landmark/resource collection IDs persist across streaming/reload; stale/double collection is rejected.
- Resin research after vine unlocks a rain collector and island stew.
- Coral research after copper unlocks raft plating: half shark damage, plate wear, reef protection.
- Lens research after copper unlocks a nonstacking 20% sailing windcatcher bonus.
- A collector produces one water per 35 rain-seconds up to 30; no rain/fuel loophole. Stew gives +45 hunger/+15 thirst.
- Shark behavior adds visible approach/target warnings, unplated-edge preference, attack/retreat/stun safeguards, a 0.65 s spear cooldown, and fish/scrap/occasional sea-glass rewards. Calm-seas mode interrupts an existing charge. Exact-center retreat vectors cannot become zero/NaN.

No dive/underwater or extra enemy-species system was added; these would expand scope beyond the existing prototype architecture.

### Loop and stability

The existing single RAF now separates fixed simulation updates from rendering: 1/30 s steps, at most eight per rendered frame, max accepted frame delta 0.25 s, discarded excess backlog. Severe stalls slow game time rather than generating a catch-up spiral. Pauses/focus/visibility changes clear held keyboard, pointer, touch, gamepad and cast state and reset the accumulator. Context loss saves/pauses; native restoration rebuilds graphics while retaining the pause dialog, without starting another loop. Exact-center reef collision uses a nonzero escape direction. Losing the final core enters the existing death/revival flow. Anchoring also exits helm control and clears raft velocity/course.

## 3. Profiling — recorded before optimizing

`tests/profile.mjs` was added and run on the original code before implementation; `reports/profile-before.json` preserves that capture. The after capture uses the same browser, viewport/DPR, seed, anchored relaxed/clear scenario, 3.5 s warmup and approximately 10 s sample window per preset, with adaptive quality off. The after capture preceded only late persistence and incomplete-frame-interval safety fixes; rendering assets/budgets were unchanged. This is a matched scenario, **not a bit-for-bit frame replay**: fixed simulation and population timing changed.

Environment: Node 20.20.2, Chromium 156.0.8078.4, Three.js 0.170.0, ANGLE/Vulkan SwiftShader, 960×600, device DPR 1. High actual ratio 1; Low 0.75.

| Metric | High before | High after | Low before | Low after |
|---|---:|---:|---:|---:|
| Sampled rendered frames | 14 | 18 | 15 | 10 |
| Mean draw calls/frame | 456.93 | 139.11 | 458.00 | 129.00 |
| Mean triangles/frame | 66,483.5 | 54,773.1 | 66,673.5 | 26,505.0 |
| GPU geometries | 536 | 46 | 542 | 47 |
| Textures | 3 | 3 | 3 | 2 |
| Mean CPU time in renderer call | 6.84 ms | 3.13 ms | 5.14 ms | 2.89 ms |
| Observed software FPS | 1.58 | 1.89 | 1.58 | 1.14 |
| Mean frame time | 632.4 ms | 528.9 ms | 634.8 ms | 874.9 ms |
| P95 frame time | 1,110.4 ms | 1,209.5 ms | 1,412.4 ms | 1,270.5 ms |

Measured draw-call reduction: **69.6% High / 71.8% Low**. Geometry reduction: **91.4% / 91.3%**. Triangle reduction: **17.6% / 60.2%**. CPU renderer-call time fell about **54% / 44%**; that time excludes GPU wait, compositing and presentation.

The Low software FPS regression is not hidden. Small sample counts, shared virtualized CPU/GPU emulation and compositor/presentation behavior make this unsuitable for claiming target-hardware FPS. A diagnostic (`reports/compositor-profile.json`) measured original HUD 2.89 FPS, hidden HUD 1.44, simplified filters 1.08, restored original 3.32; cosmetic filter removal was therefore **not retained**. These short diagnostics also are not hardware evidence.

GPU lifetime evidence:

- Original profiler's cold 24 tool/ghost swaps: **544→585 geometries**. Updated cold run: **47→51** (first-use cached tool templates).
- Final regression, after warming tools/templates: **55→55** through 24 swaps and ghost rebuilds; ten damage/repair cycles stayed **55**, with shared materials restored.
- Rendered 12-stop chunk roundtrip: **55→maximum 60→55**; nine chunks at the end.
- Pure world stress: 120 deterministic chunk crossings kept nine chunks and bounded shared caches, with disposal ownership assertions.

These bounded tests are regression evidence, not proof of every possible JS/GPU leak or an hours-long voyage.

## 4. Actual final verification

Final command: `npm run test:all` — **exit 0, 233.542 s** in this sandbox.

| Suite | Actual result |
|---|---|
| Original `systems.test.js` | 16/16 passed, retained unchanged |
| `upgrade.test.js` | 25/25 passed |
| `world.test.js` | 15/15 passed |
| Original gameplay browser suite | 12/12 groups passed, retained unchanged |
| Original additional/endgame suite | 11/11 groups passed, retained unchanged |
| New upgrade browser regressions | 24/24 groups passed |
| Standalone offline / opaque iframe | 2/2 groups passed |
| Production build | 17 modules; JS 696.41 kB, gzip 192.95 kB; CSS 75.08 kB, gzip 15.64 kB |
| Standalone | 1,360,673 bytes; legacy alias byte-identical; embedded fonts/code/licenses |

Coverage includes original hook/build/fishing/consumption/movement/swimming, workstations/nets, deterministic world/regeneration, weather/fire/jellyfish/shark, research/rescue/death/revival, mobile layout; active workshop/grill job reload and completion once; station-loss refunds; no-fuel rain variant; input-driven X tap/hold; core/range/cascade protections; landmark collection/research/upgrades; warm GPU churn/rendered streaming; quality budgets/F3 throttling/text-entry guards; fixed-step low-FPS/stall limits; native WebGL context loss/restoration; invalid/cancelled/confirmed import; pre-import backup contents; new-voyage reset; actual V1-key migration; corrupt-local-save protection.

Method caveats:

- Browser fixtures expose the existing developer API and sometimes advance timers/positions for reproducibility under very slow SwiftShader. The 120-second stall is simulated; the chunk journeys are deterministic teleports, not hours of manual sailing.
- Focus/visibility handlers are tested with synthetic DOM events, not a real OS tab switch. WebGL loss/restoration uses the browser's actual `WEBGL_lose_context` extension.
- Import and active-job restoration use real reloads. X dismantling uses real keyboard hold/tap input. Original gameplay uses mouse/keyboard plus deterministic setup helpers.
- No physical gamepad, hardware GPU, Firefox, Safari, mobile device GPU, or prolonged production soak was available. Mobile checks verify responsive viewport/touch UI, not device hardware.
- An additional release smoke verified manual anchor/helm/velocity behavior and an actual branded V2 JSON download; `reports/release-smoke.json` records it.
- New regressions recorded no page/console errors; profiler error arrays are empty. Expected WebGL loss/restoration notices are not failures.

## 5. Modified and added files

Compared directly against the original source ZIP; original gameplay/endgame/system tests, icons, audio, font/license assets and Vite config remain unchanged.

**Modified handwritten source/config:**

- `index.html`, `src/main.js` — branding, boot/fallback/accessibility.
- `src/data.js` — metadata/content/research/quests/upgrades.
- `src/systems.js` — atomic inventory/crafting, support/removal and fixed-step system.
- `src/assets.js` — shared primitives/templates, batching and disposal ownership.
- `src/world.js` — stream/detail budgets, finite landmarks, scalable effects, shark/plate behavior.
- `src/game.js` — save/job integration, simulation/render boundary, safe removal, focus/context handling and new progression.
- `src/ui.js`, `src/style.css` — branded HUD/dialogs, quest/research/settings/import/backup/monitor/remove/threat UI.
- `package.json`, `package-lock.json` — metadata/test scripts only; pinned dependency versions unchanged.
- `scripts/package-standalone.mjs` — new output name, legacy alias, complete root MIT notice and safe callback replacements.
- `tests/standalone.mjs` — new brand/alias/F3/V2 assertions, still offline and opaque-origin checks.
- `README.md`, `LICENSE.txt` — updated guide and added contributor attribution; original attribution retained.

**New modules:** `src/persistence.js`, `src/performance.js`, `src/progression.js`.

**New tests/profiling:** `tests/upgrade.test.js`, `tests/world.test.js`, `tests/regressions.mjs`, `tests/profile.mjs`.

**Documentation/evidence:** this report, `reports/UPGRADE-PLAN.md`, before/after/compositor profiles, final test log, browser regression JSON and screenshots.

**Generated deliverables:** new standalone HTML, byte-identical legacy-name copy, production web build, updated guide/report, and source ZIP. The old original source/guide/HTML are retained separately as an archive; legacy root launch/download names point to the updated deliverables.

## 6. New controls and remaining limitations

**F3:** toggle performance panel; hidden on each boot. **Hold X with hammer:** 0.95 s dismantle, 1.6 s cascading dismantle, 4 m reach; release/change target to cancel. Existing movement/build/combat/map/journal controls remain. Settings adds presets, pixel-ratio maximum, adaptive toggle, monitor toggle and backup/import confirmation. Full controls are in `README.md` / the delivered guide and in-game field guide.

Remaining limits:

- Playable single-player procedural prototype; one active shark plus jellyfish, simplified motion/collisions, three reusable landmark types. No multiplayer, underwater simulation or new enemy species.
- Target-hardware stable FPS is **not verified**; the measured software Low FPS regression remains disclosed above. Larger rafts, long histories and longer soak tests remain worthwhile follow-up.
- Hook/fishing casts reset on reload. Ordinary ocean debris is reseeded; reclaimed bundles persist but can drift/despawn if abandoned. Death-screen state is not a checkpoint: the latest living save remains until revival is saved.
- Game time intentionally slows under extreme frame stalls. There is no offline crafting/hunger progression.
- Validated limits include 2 MB saves, 2,000 structures, bounded histories/coordinates/jobs; malformed/out-of-range old files are preserved/rejected rather than silently repaired. V2 is not backward-loadable in the V1 executable.
- Storage is origin/path-specific: a different URL, port, or local HTML filename may need export/import. Keeping the original `Tidebreak.html` path with the updated alias preserves the compatible entry point.
- Browser storage/download/fullscreen permissions differ, especially in an opaque sandboxed preview. The iframe can play without storage; download/open the standalone directly for dependable persistence. Export also requires download permission.
- Context restoration is browser-dependent. Persistent device loss may require a reload; the handler attempts a safe save first.
- Physical gamepads and non-Chromium browsers remain unverified.
