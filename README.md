# Tidebound Gold

A single-player, browser-based Three.js ocean-survival adventure. Gather salvage, build a connected raft, stay fed and watered, explore procedural islands, and follow the keepers' coded route to the last light. Version **1.3.0** ("Voyager"), save schema **2**, island generation **3**.

**New in 1.3:** upgraded tools, a 13-branch research tree, advanced stations (smelter, cooking pot, recycler, engine, crop plots, storage, paint mill, trading post, charting table), meals with real buffs, three authored story shores with four-digit codes and a boss finale, 23 Voyage Log achievements, difficulty presets, shareable world seeds, first-person view, photo mode, camera shake / hit-stop / floating numbers, layered audio, interactive first-steps guidance, cosmetic building and paint, and fixed touch controls in landscape.

This upgrades Tosin’s Tidebound / the original Tidebreak project **in place**. It is the playable game, not a separate island demo. The vanilla ESM / Three.js / Vite architecture, original core controls, rescue route, development scripts, and offline deployment remain. The cinematic menu and C/touch shallow-dive controls are additive. No new runtime dependencies were added.

## Play

**No installation:** open `Tidebound-Gold.html` in a modern WebGL-capable browser. Code, fonts, procedural art/audio, and license notices are embedded; no network requests are required. `Tosins-Tidebound.html` and `Tidebreak.html` are identical compatibility copies for existing launchers.

**Moving old saves:** browser storage is tied to the site origin (and sometimes the exact local HTML path). For an existing local voyage, keep the old `Tidebreak.html` path with the updated compatibility copy, or export the old save and import it in the new file. A new filename/domain/port may have separate storage.

**Embedded previews:** storage, downloads, audio, and fullscreen depend on iframe/browser permissions. Download the HTML and open it directly for reliable local saving/export. The game still plays when browser storage is unavailable; do not assume an embedded preview will retain progress.

1. Choose **Play** for a new voyage or **Continue** for a validated save. The animated menu does not start survival simulation behind it. New Game asks before replacing an existing voyage. Hold/release the hook near floating salvage.
2. Use the purifier and grill with **F**; eat/drink from your quickbar.
3. Equip the hammer to extend your raft; keep a path to a core foundation.
4. Open **M**, chart a course, and swim ashore. Follow the landing trail to a journal and overlook; look for the side path into a sheltered grotto.
5. Read keeper journals with **F**, revisit clues with **J**, and solve ordered waystones where present. Hidden chests reward exploration once. While swimming, press **C** (or the touch C button) for a shallow dive; recover one sunken reef cache per island with **F**, then surface with **C** or **Space**. There is no oxygen timer.
6. Research copper, recover three island signal fragments, build a beacon, and press **F** beside it. This original rescue route is unchanged and does not require the new puzzles. You can keep exploring after rescue.

For a slower PC, start with **Low**, a **0.50–0.75 pixel-ratio limit**, and adaptive quality enabled. Use **F3** to inspect your own machine. There is no verified hardware-GPU FPS guarantee.

## Controls

| Control | Action |
|---|---|
| WASD / left stick | Move; steer while at the helm |
| Space / gamepad A | Jump / leave the water; surface from a dive |
| **C / touch C** | Toggle a shallow dive while swimming; surface while diving |
| Shift | Run |
| Left mouse | Use equipped item; hold/release to cast hook |
| Right drag / right stick | Look around |
| Right click with hammer | Place a structure |
| 1–8, Q/E, wheel / bumpers | Select quickbar slot |
| R | Rotate structure by 90° |
| **Hold X with hammer** | Dismantle the outlined target within 4 m; release or change target to cancel |
| T | Repair targeted structure within 4 m for one driftwood |
| F / gamepad X | Interact: stations, finite resources, landmark supplies, beacon |
| G / gamepad B | Take/leave the helm |
| M | Ocean chart, automatic course, anchor control |
| Tab or I / gamepad Y | Paused inventory, crafting, research |
| Esc / gamepad Start | Pause/resume |
| J | Voyage journal and optional quests |
| H | Hide/show HUD |
| ? or F1 | Field guide |
| **V** | Toggle first-person / third-person camera |
| **P** | Photo mode (hide HUD); **F9** saves a PNG postcard |
| **B** | Voyage Log (achievements) |
| **Hold R + drag** | Smoothly rotate the build ghost; tap R for 90° |
| Touch chart / V buttons | Ocean chart and camera view on any coarse-pointer screen, including landscape |
| **F3** | Toggle hidden-by-default performance monitor |
| + / −, Shift + wheel | Camera zoom |

Dismantling requires a continuous **0.95-second hold**, or **1.6 seconds** when other structures will detach. Core foundations cannot be manually removed. Detached structures become reclaimable supplies; interrupted work refunds its reserved inputs immediately. A brief tap never dismantles. Repair and dismantle reach are both 4 m; building reach remains 8 m.

Movement shortcuts, including F3, ignore inputs, textareas, selects, and contenteditable text. Touch movement/action controls remain; optional F3 access is also available in Settings. Physical gamepad hardware has not been verified in this environment.

## Survival and building

- Health, hunger, and thirst have a maximum of 100.
- Thirst drains 0.5/s; hunger 0.2/s. At zero, thirst causes 2 health/s damage and hunger 0.5 health/s. Regeneration requires both above 80.
- Raw fish: +10 hunger, −5 health. Grilled fish: +30 hunger. Fresh water: +40 thirst. Coconut: +15 hunger/thirst.
- Work-in-progress ingredients are reserved once. Cancellation or station destruction returns exactly those inputs, not an extra output.
- Structures occupy a strict 1 m 3D grid. Four original 2×2 core cells root the raft. Stations need a real floor below; adjacent stations cannot suspend a deck.
- Upper floors can bridge horizontally from a floor supported by a wall/stairs. Removing support checks the whole component.
- The shark circles, warns, highlights a targeted foundation, then charges. A normal bite causes 20 foundation damage; a spear strike causes 15 shark damage and interrupts its charge. Spear cooldown: 0.65 s. Successful defense creates a retreat window; defeating a shark yields fish, scrap, and sometimes sea glass.
- Reefs scrape unprotected foundations. Jellyfish deal 5 damage and slow movement by 30% for 10 s.
- A 20-minute day/night cycle and clear/rain/fog/storm weather remain. Storm wave amplitude is exactly 4× calm. Lightning can start fires; fresh water extinguishes a nearby fire.
- Calm seas mode disables hunger/thirst drain and shark damage, including a charge already in progress. Other environmental hazards still exist.
- If the final core is destroyed, the existing death/revival flow runs instead of leaving an unsaveable living raft. Revival retains the original partial supply-loss mechanic.

## New, optional progression

The original three-cache rescue route is unchanged. Extra research does **not** add another mandatory grind.

| Biome | Finite landmark | Discovery / reward |
|---|---|---|
| Tropical paradise | Tidal spring | Curved cove, palms, meandering bluff trail, occasional cascade; water and resin |
| Coral atoll | Wrecked skiff | Open lagoon, coral shelf, sea gate and a genuinely boardable broken wreck; coral and scrap |
| Jungle ruins | Navigator’s temple | Dense broad-leaf canopy, stone terraces, overgrown temple; lens and copper |
| Pirate hideout | Quartermaster’s shelter | Hooked beach, sailcloth camp, occasional broken lookout; water and resin |
| Volcanic terraces | Basalt survey camp | Faceted caldera, basalt slopes, warm fumarole particles; coral and scrap |
| Overgrown research outpost | Field station | Headland, fern clearings, roofed instrument station; lens and copper |

Every island retains its original cache/resources and also gains a biome research resource. Landmarks have their own geometry, supplies, short journal entry, and persistent collection ID. Duplicate/stale collection requests cannot give loot twice.

Each island also has one finite **sunken keeper’s cache** on an actual submerged reef shelf. It requires the shallow-dive state, ordinary interaction reach and line of sight; surface collection is rejected. Its sea-glass coral, two scrap and rope feed existing research/building, its short clue joins the journal, and the optional **Below the Blue** quest grants one cooked fish. Diving uses the existing swimming controller with seabed clamping, a submerged camera, local fog and filtered ambience—no oxygen meter, separate underwater world or new loot economy.

### Follow a shore’s miniature adventure

- Every generated island has a finite landing cache, its original resource IDs, a research discovery and landmark supplies, **plus a keeper’s journal and a hidden grotto chest**.
- Follow pale natural trails uphill; use the arch, temple, canopy break or lookout silhouette as an orientation cue. The overlook is an actual reachable bluff. Broken watchtower ladders are scenery, not an advertised climbing mechanic.
- Press **F** near a journal. **J** keeps its clue available. Some islands have sun/tide/star waystones; the journal gives their deterministic order. The starter cove always has this puzzle. Wrong-order or repeated activations do not give extra supplies; activated stones remain visible and solid.
- The grotto’s useful one-time reward is a biome research item, three scrap, two cooked fish and a rope. Read the journal first; finish its waystones when present. These optional finds feed the existing research, survival and quest systems.
- Secret chests stay **inside** their shelter; collection requires physical reach, a reasonable height difference and an unobstructed line of sight. Architecture remains after looting.
- Coves, lagoons and shelves are real terrain/water boundaries. Automatic courses route around them and stop offshore for your current raft footprint. You still swim to shore; the boat does not teleport onto a beach.

Research is data-driven and documents rather than consumes the item:

- **Vine → collection net**, as before.
- **Copper → rescue beacon**, as before.
- **Vine + palm resin → rain collector and island stew.** A collector produces one water per 35 simulated seconds of rain, without fuel, stopping at 30 stored water. Stew gives +45 hunger and +15 thirst.
- **Copper + sea glass coral → raft plating.** Plating above a foundation halves shark bite damage and prevents reef scraping on that foundation. Plates take wear from bites.
- **Copper + navigator’s lens → windcatcher.** One provides a 20% manual/charted sailing bonus; additional ones do not stack.

Main quests and five optional discovery/research quests are definitions in `data.js`. Modest rewards are granted once, with completion IDs saved. Existing completed V1 goals are marked without replaying rewards.

## Performance, quality, simulation

Settings provide **Low / Medium / High**, a separate adaptive toggle, and a 0.50–2.00 maximum pixel ratio. Device/preset/adaptive limits may render lower than that maximum.

- Low: no shadows, 48 ocean subdivisions, reduced particles/rain/clouds/birds and distance detail; pixel-ratio cap 0.75.
- Medium: 512 px shadows, 80 ocean subdivisions, balanced effects; pixel-ratio cap 1.25.
- High: 1024 px shadows, 128 ocean subdivisions, full effect budget; pixel-ratio cap 1.75.
- Adaptive quality has sustained-load windows, recovery hysteresis, and a ceiling at the requested preset. Turn it off for comparisons.
- F3 samples the existing Game frame loop. It shows current/rolling average/min/max FPS, frame time, the last 240 frame times, Three.js draw calls/triangles/geometries/textures, active quality, and actual pixel ratio. DOM/graph updates are throttled to **at most four times per second**, and may be slower if frames stall. Hidden monitoring does no DOM painting. JS heap bytes appear only when the browser exposes `performance.memory`; no estimated GPU-memory number is invented.
- One existing RAF loop owns rendering. Simulation uses a 1/30 s accumulator, at most eight steps per frame, and a 0.25 s accepted wall-time limit. Severe stalls deliberately slow game time rather than creating an unbounded catch-up spiral.
- Pauses, hidden-tab/focus suspension, and context loss clear held input and reset the accumulator. There is no offline hunger/crafting penalty.
- Normal play budgets one new chunk decision per rendered frame. The 3×3 neighborhood streams around the raft. Owned chunk buffers are disposed on unload; shared templates/materials are not.
- Primitive buffers and static model templates are reused. Per-color/per-plank draws are batched with vertex colors. Damage-material clones are disposed on repair/removal. Large breakaway cascades consolidate supply bundles instead of allocating thousands of debris meshes.

See `UPGRADE-REPORT.md` and `reports/profile-islands-{before,after}.json` for this Gold upgrade’s measured results and important FPS caveats. The original 1.1 report/profiles remain historical evidence. The baseline profile was recorded **before** implementation. A cosmetic HUD-filter removal experiment was not retained because it did not improve the software-renderer measurements.

## Saving, migration, and import safety

- V2 saves now identify island generation **3** and persist journal reads, valid ordered waystone prefixes, finite hidden/reef loot, shallow-dive state, and the optional adventure quest counters. Older V2 saves default safely to zero reef progress and not diving. The storage key/schema have not changed.
- Generation-1/2 voyages retain their inventory, original resource/landmark IDs and collected supplies. Expanded shores safely reproject a stranded raft/player and retarget old automatic courses; they do not regenerate old loot. Defined unsupported future generation versions are rejected, rather than silently loaded as today’s world. Export a backup before upgrading a valuable voyage.
- V2 saves include inventory, health/hunger/thirst/sting state, player position/velocity/movement flags/cooldowns, raft position/rotation/velocity/buoyancy/anchor/sail/helm/course, structures/HP/production timers, research, clock/weather timer, journal/discoveries, quest completions, camera/quickbar selection, reserved jobs, fires, shark state, and reclaimed floating bundles.
- Jobs are keyed by grid coordinate and recipe ID, not recreated numeric block IDs or untrusted recipe objects. Loading does not spend/refund them a second time.
- Autosave runs every 20 **simulated** seconds; manual save, tab suspension and unload also attempt saving. Storage errors do not prevent playing; export is the fallback where download permission exists.
- Current key: `tidebound.save.v2`. Original `tidebreak.save.v1` is recognized and retained. Its snapshots already refunded old craft reservations, so migration never refunds those again.
- A legitimate V1 structure held up only by the old adjacency bug is removed from the migrated graph and its **full building cost** is refunded once. This is reported on migration/import. Truly detached/malformed components are rejected rather than converted into free resources.
- Imports are size-limited, schema-validated, normalized, then require confirmation. Unknown versions/items/recipes, nonfinite or negative counts, duplicate cells/jobs, broken supports, and invalid states are rejected before replacement.
- A known-good previous autosave and separate pre-import backup are retained when storage allows. Settings can restore a backup after confirmation.
- Corrupt local saves are never silently replaced. Continue explains the validation failure; a separately confirmed New Game preserves the exact raw payload in `tidebound.save.recovery.raw` when storage allows.
- Import/reset navigation suppresses the old page’s unload autosave, preventing it from overwriting the incoming save or resurrecting an erased voyage.
- Gold generation-3 exploration saves are not a supported downgrade into 1.1; retain a pre-Gold export and archived source for rollback.
- V2 cannot be loaded by the old V1 game. The untouched V1 key/archived source is the rollback option.

Global menu/gameplay preferences live separately in `tidebound.settings.v1`; changing them does not write voyage progress. Continue uses the same strict save validator as import. Pause → Main Menu saves and disposes gameplay before the menu scene is created, and later entry constructs a fresh game rather than duplicating loops/listeners.

In-flight hook casts and fishing animations reset on reload. Ordinary procedural debris is reseeded; reclaimed bundles are saved, but abandoned bundles can still drift out of range and be lost to the sea. The death screen itself is not a checkpoint; the latest living save remains until revival is saved.

## Voyager update (1.3)

### Mobile / touch

Touch controls no longer disappear when a phone is rotated. The old stylesheet only displayed `.mobile-controls` under `max-width:640px`, so a typical 844×390 landscape screen showed no joystick and no action pad. `Game.resize()` now marks coarse-pointer landscape with `body.touch-landscape`, and the stylesheet gives that mode its own layout: joystick left, action pad right, compact vitals, a centred quickbar, safe-area insets, and no overlapping side panels. The pad also includes chart and camera buttons, and holding the hook button charges a cast before release. Modals still hide the pad.

### Progression that changes the verbs

- **Tool tiers:** `scrapHook` and `chainHook` extend range, casting speed and haul size (up to three pieces per cast); `metalSpear` nearly doubles damage; `axe` speeds dismantling and gathers extra island timber.
- **Research:** 13 branches. Keeper crates (a new floating debris type) drop discovery items: torn sea chart, brass gear, steam core, pigment, recipe book, recycler blueprint, brass hinge, palm seed. Each unlocks a real station and respects prerequisites.
- **Stations:** `smelter` (copper → ingots), `cookingPot` (three buff meals), `recycler` (surplus → trade tokens), `tradingPost` (ten trades), `storageChest` (shared hold), `cropPlot` (grows coconuts/leaves every 90 s), `paintMill`, `engine` (five minutes of wind-independent sailing), `chartTable` (keeper codes).
- **Building:** 8 cosmetic pieces (flag, lantern, hammock, planter, painted wall, rug, table, chair) and a `paintBrush` with eight colours. The build bar now has Raft / Workstations / Decorations tabs.
- **Fishing:** bites still yield a raw fish, plus a weighted chance of mackerel, reef puffer or lantern fish for recipes.

### Survival with choices

`SurvivalStats` now supports food buffs (`stormShield`, `swiftSwim`, `spearMight`) and bounded difficulty rates. Three presets — Drifter, Castaway, Stormchaser — scale thirst/hunger drain, damage, salvage yield and shark patience. Meals add +hunger/+thirst plus an ability; buffs are saved and expire after 180 simulated seconds. Island razorvine patches, a crop-stealing gull and an armoured boss shark add variety without removing Calm Seas or the no-durability kindness.

### A story with a destination

Three fixed story chunks (Radio Reef, The Vasagatan, Lighthouse Key) are authored shorelines with a keeper figure, a four-digit code, a supply cache and lore. The starter cove's journal reveals the first code (4821). Build a charting table, enter codes, and the ocean chart sails you to the next shore. At the last light, interact with the cold lamp to summon a great shark; defeat it and the finale plays with credits, a Voyage Log summary and an optional endless voyage with escalating storms. The original three-fragment beacon rescue still works unchanged.

### Feel, feedback and meta

Camera shake and hit-stop on bites/lightning/landing, floating pickup and damage numbers, wake particles behind a moving raft, footsteps by surface, low-health heartbeat, weather-retuned ambient music, shark tension bed, distinct swing/thrust/chop/eat poses, first-person viewmodel with crosshair, photo mode with PNG export, a 3D objective beam for the interactive six-step tutorial, 23 saved achievements that each grant a trade token, shareable world seeds, difficulty presets, and post-finale endless mode.

Everything new is data-driven in `src/data.js`, validated in `src/persistence.js`, and covered by `tests/voyager.test.js`. Old v1/v2 saves load with bounded defaults; no migration or re-grind is required.

## Develop and test

Paths below refer to the extracted source folder.

Node **20.19+** (tested here on 20.20.2):

```sh
npm ci
npm run dev -- --port 3000
```

The existing Vite server binds `0.0.0.0`, accepts preview hosts, and uses port 3000. The existing source directory name can remain `tidebreak`; imports and deployment paths were not renamed.

```sh
npm run build                 # production web build in dist/
npm run preview               # serve the production build
npm run build:standalone      # Gold standalone + both identical legacy-name copies
npx playwright install chromium
npm test                      # 80 pure-system / world / quality / island / Voyager tests
npm run test:menu             # 21 current menu/save/lifecycle browser checks; dev server required
npm run test:exploration      # 14 current shallow-dive/save/touch browser checks; dev server required
npm run test:browser          # additional legacy end-to-end scripts; not part of the current 35-check result
npm run test:islands          # island units + legacy real-controller six-biome acceptance
npm run test:seeds            # additional 360-layout deterministic placement sweep
npm run test:standalone       # rebuild and test offline/file + opaque iframe
npm run test:all              # all of the above tests
npm run profile               # islands-after profile; dev server required on port 3000
node tests/generation-profile.mjs after  # CPU-only streaming diagnostic
node tests/island-views-profile.mjs       # actual Low on-shore rendering profile
node tests/release-smoke.mjs              # local static web-build smoke
```

Keep the dev server running in another terminal for browser tests and profiling. For the current menu/diving update, the verified set is `npm test`, `npm run build`, `npm run test:menu`, `npm run test:exploration`, and standalone packaging plus `tests/standalone.mjs`: **80/80 unit tests (v1.3), 35/35 menu/exploration Chromium checks, and 2/2 offline standalone scenarios**. The older `test:browser` / `test:all` aggregates were not rerun and are not included in those counts. Machine-readable results are in `reports/gold2-menu-smoke.json` and `reports/gold2-exploration-smoke.json`; see `reports/GOLD-2-VERIFICATION.md` for scope and limitations.

The tests use headless Chromium/SwiftShader because a hardware GPU is not available here. Some test scenarios deliberately advance timers/positions or dispatch focus/visibility events. Native WebGL loss/restoration, actual save/import reloads, real keyboard hold/tap input, original mouse gameplay, mobile layout, and offline/opaque-origin boot are also exercised. See the report for actual run outcomes, not just available scripts.

## Source layout

| File | Responsibility |
|---|---|
| `data.js` | Items, structures, recipes, research, quests, biomes, landmark loot, weather |
| `systems.js` | Inventory transactions, survival, support grid, crafting, pooling, weather clock, fixed-step clock |
| `game.js` | Existing orchestration, controls, physics, building, jobs, save integration and single frame loop |
| `world.js` | Ocean/shoreline atlas, streaming orchestration, navigation/collision queries, debris, shark, atmosphere |
| `island-terrain.js` | Six deterministic profiles, shared triangulated heightfields, pads, trails, reachable-route validation |
| `island-assets.js`, `island-generation.js` | Original shared/instanced assets, biome rules, grounded placement, structures, journals, waystones, secret rewards, LOD |
| `coastal-navigation.js`, `exploration.js` | Bounded sea routing, stable exploration IDs/seeds and ordered-puzzle validation |
| `assets.js` | Procedural models, shared geometry/material/template caches, batching and ownership-aware disposal |
| `ui.js`, `style.css`, `icons.js` | HUD, menus, maps, research, journal, settings and responsive touch layout |
| `persistence.js` | Pure V1→V2 migration, strict validation, reservations and storage/backup boundaries |
| `performance.js` | Quality budgets, adaptive controller, frame-loop-driven F3 panel |
| `progression.js` | Data-driven quest evaluation and exactly-once rewards |
| `audio.js`, `main.js`, `config.js` | Shared local WebAudio, bounded preferences, menu-first application coordinator |
| `menu.js`, `menu-scene.js`, `menu.css` | Accessible cinematic menu, disposable procedural backdrop, responsive panels |
| `exploration.css` | Lightweight shallow-dive HUD and underwater presentation |

`window.tidebound` is the local developer inspector. `window.tidebreak` remains a compatibility alias; neither is a read-only security boundary. Browser tests use this API for deterministic fixtures.

## Limits and licensing

This is a playable procedural prototype, not a production survival release. It is single-player, has one active shark plus jellyfish, simplified collisions/boat motion, reusable procedural architectural/vegetation modules, and focused shallow reef diving rather than a free-roam deep-sea simulation. There is still no true multiplayer (single-player by design) and no external service; world seeds and difficulty are now configurable in Settings, and the Voyage Log is an asynchronous substitute for shared goals. A raft is limited to 2,000 structures and save/import payloads to 2 MB; world/journal history is also validated to finite bounds. Very large rafts/long histories and real low-end GPUs need further hardware testing. **GT710-class hardware has not been verified.** Low keeps nearby solid scenery and all interactions, with reduced foliage density, lower canopy/terrain LOD, no shadows and a pixel cap. In the software-renderer profile it draws fewer calls/triangles than 1.1, but measured FPS is lower; this is not claimed as a GPU speedup. Coral, submerged rocks and stranded wrecks remain scenery/hazards; only the finite reef caches use the new shallow-dive interaction. There is no oxygen system, deep-sea terrain, or separate underwater world. Context recovery depends on the browser; a persistently lost context may require reloading. Physical gamepads and Firefox/Safari have not been verified here.

Source is MIT licensed. Original attribution is retained in `LICENSE.txt`; font and Three.js redistribution notices are in `public/licenses/` and embedded in standalone HTML. Bundled fonts and original third-party notices were not replaced.


## GitHub repository and hosting build

This repository contains the complete editable Gold project, not just the standalone download.
`vercel.json` selects the standard Vite build (`npm run build`) and its `dist` output.
The existing automatic Git deployment is allowed for this upload; no hosting dashboard settings are changed.
The release report and `BUILD-INFO.json` describe the earlier offline release stage, when deployment was paused.
The standalone `Tidebound-Gold.html` still works without hosting or installation.
