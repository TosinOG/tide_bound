# Tidebound Gold

A single-player, browser-based Three.js ocean-survival adventure. Gather salvage, build a connected raft, stay fed and watered, explore procedural islands, and assemble a rescue beacon. Version **1.3.0**, save schema **2**, island generation **3**.

> **Voyager update (1.3):** See [`VOYAGER-UPDATE.md`](VOYAGER-UPDATE.md) for upgraded tools, 13 research branches, advanced stations, buff meals, three story shores with codes and a boss finale, achievements, difficulty presets, first-person and photo modes, and fixed mobile landscape controls. The original rescue route, Calm Seas mode and no-durability tools are unchanged.

This upgrades Tosin’s Tidebound / the original Tidebreak project **in place**. It is the playable game, not a separate island demo. The vanilla ESM / Three.js / Vite architecture, old controls, rescue route, development scripts, and offline deployment remain. No new runtime dependencies were added.

## Play

**No installation:** open `Tidebound-Gold.html` in a modern WebGL-capable browser. Code, fonts, procedural art/audio, and license notices are embedded; no network requests are required. `Tosins-Tidebound.html` and `Tidebreak.html` are identical compatibility copies for existing launchers.

**Moving old saves:** browser storage is tied to the site origin (and sometimes the exact local HTML path). For an existing local voyage, keep the old `Tidebreak.html` path with the updated compatibility copy, or export the old save and import it in the new file. A new filename/domain/port may have separate storage.

**Embedded previews:** storage, downloads, audio, and fullscreen depend on iframe/browser permissions. Download the HTML and open it directly for reliable local saving/export. The game still plays when browser storage is unavailable; do not assume an embedded preview will retain progress.

1. Begin your voyage. Hold/release the hook near floating salvage.
2. Use the purifier and grill with **F**; eat/drink from your quickbar.
3. Equip the hammer to extend your raft; keep a path to a core foundation.
4. Open **M**, chart a course, and swim ashore. Follow the landing trail to a journal and overlook; look for the side path into a sheltered grotto.
5. Read keeper journals with **F**, revisit clues with **J**, and solve ordered waystones where present. Hidden chests reward exploration once.
6. Research copper, recover three island signal fragments, build a beacon, and press **F** beside it. This original rescue route is unchanged and does not require the new puzzles. You can keep exploring after rescue.

For a slower PC, start with **Low**, a **0.50–0.75 pixel-ratio limit**, and adaptive quality enabled. Use **F3** to inspect your own machine. There is no verified hardware-GPU FPS guarantee.

## Controls

| Control | Action |
|---|---|
| WASD / left stick | Move; steer while at the helm |
| Space / gamepad A | Jump / leave the water |
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

Main quests and four optional discovery/research quests are definitions in `data.js`. Modest rewards are granted once, with completion IDs saved. Existing completed V1 goals are marked without replaying rewards.

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

- V2 saves now identify island generation **3** and persist journal reads, valid ordered waystone prefixes, finite hidden loot, and the optional adventure quest counters. The storage key/schema have not changed.
- Generation-1/2 voyages retain their inventory, original resource/landmark IDs and collected supplies. Expanded shores safely reproject a stranded raft/player and retarget old automatic courses; they do not regenerate old loot. Defined unsupported future generation versions are rejected, rather than silently loaded as today’s world. Export a backup before upgrading a valuable voyage.
- V2 saves include inventory, health/hunger/thirst/sting state, player position/velocity/movement flags/cooldowns, raft position/rotation/velocity/buoyancy/anchor/sail/helm/course, structures/HP/production timers, research, clock/weather timer, journal/discoveries, quest completions, camera/quickbar selection, reserved jobs, fires, shark state, and reclaimed floating bundles.
- Jobs are keyed by grid coordinate and recipe ID, not recreated numeric block IDs or untrusted recipe objects. Loading does not spend/refund them a second time.
- Autosave runs every 20 **simulated** seconds; manual save, tab suspension and unload also attempt saving. Storage errors do not prevent playing; export is the fallback where download permission exists.
- Current key: `tidebound.save.v2`. Original `tidebreak.save.v1` is recognized and retained. Its snapshots already refunded old craft reservations, so migration never refunds those again.
- A legitimate V1 structure held up only by the old adjacency bug is removed from the migrated graph and its **full building cost** is refunded once. This is reported on migration/import. Truly detached/malformed components are rejected rather than converted into free resources.
- Imports are size-limited, schema-validated, normalized, then require confirmation. Unknown versions/items/recipes, nonfinite or negative counts, duplicate cells/jobs, broken supports, and invalid states are rejected before replacement.
- A known-good previous autosave and separate pre-import backup are retained when storage allows. Settings can restore a backup after confirmation.
- Corrupt local saves are protected from automatic overwrite; a temporary new voyage does not destroy them.
- Import/reset navigation suppresses the old page’s unload autosave, preventing it from overwriting the incoming save or resurrecting an erased voyage.
- Gold generation-3 exploration saves are not a supported downgrade into 1.1; retain a pre-Gold export and archived source for rollback.
- V2 cannot be loaded by the old V1 game. The untouched V1 key/archived source is the rollback option.

In-flight hook casts and fishing animations reset on reload. Ordinary procedural debris is reseeded; reclaimed bundles are saved, but abandoned bundles can still drift out of range and be lost to the sea. The death screen itself is not a checkpoint; the latest living save remains until revival is saved.

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
npm test                      # 68 pure-system / world / quality / island tests
npm run test:browser          # 57 groups: original play + endgame + upgrade + real island walks
npm run test:islands          # island units + real-controller six-biome acceptance
npm run test:seeds            # additional 360-layout deterministic placement sweep
npm run test:standalone       # rebuild and test offline/file + opaque iframe
npm run test:all              # all of the above tests
npm run profile               # islands-after profile; dev server required on port 3000
node tests/generation-profile.mjs after  # CPU-only streaming diagnostic
node tests/island-views-profile.mjs       # actual Low on-shore rendering profile
node tests/release-smoke.mjs              # local static web-build smoke
```

Keep the dev server running in another terminal for browser tests and profiling.

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
| `audio.js`, `main.js` | Local WebAudio and existing bootstrap |

`window.tidebound` is the local developer inspector. `window.tidebreak` remains a compatibility alias; neither is a read-only security boundary. Browser tests use this API for deterministic fixtures.

## Limits and licensing

This is a playable procedural prototype, not a production survival release. It is single-player, has one active shark plus jellyfish, simplified collisions/boat motion, reusable procedural architectural/vegetation modules, and no underwater/dive system, multiplayer, manual world seed UI, or external services. A raft is limited to 2,000 structures and save/import payloads to 2 MB; world/journal history is also validated to finite bounds. Very large rafts/long histories and real low-end GPUs need further hardware testing. **GT710-class hardware has not been verified.** Low keeps nearby solid scenery and all interactions, with reduced foliage density, lower canopy/terrain LOD, no shadows and a pixel cap. In the software-renderer profile it draws fewer calls/triangles than 1.1, but measured FPS is lower; this is not claimed as a GPU speedup. Coral, submerged rocks and stranded wrecks are scenery/hazards around existing swimming, not a new diving or underwater-looting system. Context recovery depends on the browser; a persistently lost context may require reloading. Physical gamepads and Firefox/Safari have not been verified here.

Source is MIT licensed. Original attribution is retained in `LICENSE.txt`; font and Three.js redistribution notices are in `public/licenses/` and embedded in standalone HTML. Bundled fonts and original third-party notices were not replaced.


## Horizon and discovery

Shores are no longer visible when you start. The world streams in 240 m chunks
and land only appears within a 170 m sight line, so you find islands by sailing
toward them. Press **M** to open the ocean chart — it auto-zooms to show distant
shores, and "Set a course" sails there automatically. When land first comes into
view you get a "Land ho" message. Your hook (hold to charge, release to cast)
pulls in floating salvage; clicking again recalls a missed cast. The fishing
line now runs from the tip of your rod to the float.
