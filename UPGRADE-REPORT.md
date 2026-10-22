# Tidebound Gold — implemented island upgrade

**Release:** 1.2.0 · **Date:** 22 October 2026 · **Save schema:** 2 · **Island generation:** 3

## Status

Implemented directly in the existing browser Three.js game. This is not a separate landscape demo, static showcase, or replacement architecture. The existing survival, raft grid/support/HP, crafting, research, sailing, rescue ending, controls, saving, chunk streaming, pools, and single frame loop remain.

The representative-island gate was completed **before** the six-biome rollout. The completed game now has six deterministic island families, real trails and terrain collision, finite exploration rewards, journals, optional ordered-waystone puzzles, and bounded detail levels. Deployment/account changes were **not** performed; the earlier deployment request remains paused.

No runtime dependency was added. Art/geometry is original procedural work using the existing asset system; there are no downloaded reference-game assets or runtime CDN dependencies.

## 1. Representative-first implementation

`reports/islands-stage1.json` is the preserved pre-rollout record. Exactly **one** of seven loaded islands—the existing starter shore—was upgraded at that stage. Its real controller followed **49/49 waypoints in 933 ticks, with zero stuck ticks**, and finished 0.504 m from the journal. That early representative contained 46 canopy trees, 220 understory placements, a spring cascade, 14 pickups, and a reachable side route into its shelter. Journal/order/finite-reward checks and rendering completed without page errors.

Only after that gate did the generator replace the other biome families. Later all-biome acceptance has separate reports and screenshots; the historical stage-one JSON/images were not replaced with post-rollout evidence.

## 2. The playable islands

| Biome | Terrain/identity | Functional exploration and existing rewards |
|---|---|---|
| Tropical paradise | Curved cove, pale beach, turquoise approach, palm canopy, shelves and an occasional spring cascade | Landing trail, spring supplies, keeper journal, bluff/sea gate, grotto; resin/water |
| Coral atoll | Broken ring, open lagoon, coral/submerged rock shelf, lower rocky rises | Stranded skiff with a genuinely boardable broken hull, keeper route, sea gate and sheltered cache; coral/scrap |
| Jungle ruins | Taller ridge, dense broad-leaf canopy, ferns and overgrown stone architecture | Temple clearing, viewpoint, journal and concealed side trail; lens/copper |
| Pirate hideout | Hooked coast, sheltered beach, sailcloth camp, occasional broken lookout | Quartermaster supplies, marked route, journal, optional waystones and grotto; resin/water |
| Volcanic terraces | Faceted caldera, darker basalt/sand palette, sparser vegetation, fumarole particles | Survey camp, climbing trail, high outlook, journal and sheltered supplies; coral/scrap |
| Overgrown research outpost | Headland, fern-rich clearings, roofed instrument station | Field-station supplies, high journal route, optional cascade and hidden shelter; lens/copper |

The silhouettes are actual land/water geometry, not just circular collision exclusions. Height/slope-dependent sand, grass and rock colors, subtle trail wear, varied leaning palms, broad-leaf trees, bushes, ferns, flowers, grasses, seated logs, boulders and coastal coral are placed through deterministic biome rules. Reusable temples, roofed camps, observatories, sea gates, broken lookouts and faceted grotto modules supply recognizable orientation points.

Cheap vertex wind, birds, foam, depth-tinted transparent shallows, restrained caustics, cascade/mist/fumarole effects, haze and the existing day/weather lighting animate the scene. Close-to-lens foliage uses opaque screen-door fading for camera readability rather than an alpha-blended forest or a post-process pass.

### Every shore’s miniature adventure

- Original resource/cache/landmark IDs and their research/rescue purpose are retained.
- Every generated island adds a **keeper’s journal and a hidden grotto chest**, with a meandering ascent, reachable elevated bluff and side route.
- Some shores have ordered sun/tide/star waystones. The starter cove always does. The readable journal carries the deterministic order; notes remain in **J**.
- The journal gates the exploration reward; where waystones exist, the correct saved prefix must also be complete. Repeated, wrong-order or stale collection attempts cannot manufacture supplies.
- A secret chest grants one biome research item, three scrap, two cooked fish and one rope, once. Optional journal/secret quests also use the existing quest manager and exactly-once reward handling.
- Activated stones remain visible/solid. Looting does not erase a cave, temple, station, skiff or camp.
- The original three-signal-fragment rescue route remains available without solving the optional puzzles.

Broken watchtower ladders are explicitly scenery; their high **trail-side bluff** is the reachable viewpoint. There is no advertised tower-climbing or underwater-diving mechanic hiding behind a fake interaction.

## 3. Physical correctness and fixes made during acceptance

The canonical 65×65 triangulated field supplies the near terrain mesh, ground height, placements and route validation. Triangle-ray tests check rendered-height agreement. The far 24-segment mesh has its own exact triangle sampler for far canopy grounding. Near terrain detail extends across the foliage/resource interaction ranges, so the player does not approach pickups on a different-looking far surface.

- A 1.72 m character with approximately 0.28 m horizontal clearance is checked against rotated solid structures and nearby scenery. Navigation is slightly more conservative.
- Route validation checks quarter, middle and three-quarter points **along edges**, not just clear endpoints. This fixed a real starter-waystone collision that trapped the actual walking controller between clear grid nodes.
- Navigation conservatively routes around solid loot/scenery rather than treating a short log/chest as a guaranteed terrain-level step. This fixed a real outpost walking trap on a sloped log approach.
- Solid logs are placed on sufficiently flat ground and seated; boulder footprints match their visible extent. Rocks/logs stay clear of the intended trails. Low does not hide nearby solid trees or rocks to make a failing collision disappear.
- Grounded chest/book/bundle models, deeper architectural footings and terrain-aware placement avoid suspended props. Field-station/camp supplies were moved out of entrance centers. The observatory instrument and wreck mast have solid collision.
- Two large-atoll seeds exposed an unboardable decorative wreck floor. Its keel/deck are now grounded, the real 36 cm step is below the controller’s step limit, and a visibly broken side provides an entrance. Regression fixtures retain both seeds. The browser suite also physically walks onto a natural atoll wreck deck and verifies its standing height.
- Treasure repairs are constrained to the actual shelter interior; they cannot silently relocate a “hidden” reward to an unrelated reachable beach.
- Collection checks horizontal/vertical reach and line of sight. Cave walls, roofs and terrain prevent through-wall/through-ground grabbing. Camera collision stops before structural walls/roofs.
- Static placement is validated before collected-state visibility is applied. Reloading or collecting an item therefore cannot reroll/move the remaining pickups, vegetation or architecture.

Automatic sailing uses a bounded sea-route search against irregular terrain and the current raft footprint, not the old circular island radius. It rounds land, stops offshore, replans as needed, and retains hull scraping/damage. The actual starter-cove sailing test reached its offshore destination in 581 simulated steering steps, anchored, and recorded **zero hull penetrations**. Swimming ashore then reached the landing and collected its finite cache through normal interaction logic.

## 4. Saves and compatibility

The storage key remains `tidebound.save.v2`; the save schema remains **2**. The original `tidebreak.save.v1` migration and prior backup/import protections remain.

World generation is now **3**. Journal IDs, valid ordered-waystone prefixes, hidden-chest IDs, adventure counters and optional quest completions persist. The new IDs are deterministic and validated against seed/order rules. Malformed prefixes, missing prerequisite journal reads and defined unsupported future generation versions are rejected rather than accepted as free progress.

The generation-1/2 upgrade keeps original collected IDs, inventory and progress. A raft/player stranded by expanded terrain is moved to a physically valid nearby offshore/shore position; old automatic island courses are retargeted to an appropriate approach. Old supplies are not respawned. Import/reset still suppresses the departing page’s unload autosave so it cannot overwrite the incoming voyage.

Browser acceptance exercises both a complete multi-biome save/reload and a **real one-waystone checkpoint**. That partial checkpoint loads with the first activated stone visible, retains inventory exactly, walks to the remaining stones, and opens the chest for exactly one reward.

Export a backup before upgrading a valuable voyage. Downgrading a Gold exploration save into 1.1 is not supported; retain a pre-Gold export for rollback. Browser storage is origin/path dependent; keep the compatibility filename or export/import when moving domains, ports or local HTML filenames. Embedded previews may deny persistent storage/downloads; direct local HTML is the reliable offline option.

## 5. Verified results

The authoritative combined run is `reports/gold-final-all-tests.log`.

| Check | Verified result |
|---|---|
| Pure systems/world/quality/island suite | **68/68 passed**, zero failures; 20.155 s in the combined run |
| Preserved original gameplay | **12 browser groups passed** |
| Preserved endgame/survival/mobile | **11 browser groups passed** |
| Existing upgrade regressions | **24 browser groups passed** |
| New real-controller island acceptance | **10 browser groups passed**, all six natural biome fixtures completed |
| Offline/file and opaque-origin iframe | **2 checks passed**, zero game network requests |
| Additional deterministic seed sweep | **360/360 layouts**, six biomes × 60; zero generation/approach failures, 25 bounded placement repairs; maximum treasure offset from its intended shelter center was 0.4 m |
| Separate world stress rerun | **15/15 passed**, including 120 boundary crossings; 14.209 s |

The 57 browser groups are the 12 + 11 + 24 + 10 above, not 57 separate manual playthroughs. Deterministic fixtures advance time/positions where appropriate. The island suite then uses the **real `Game.updatePlayer` and `Game.interact`** to follow trails and collect rewards; it is not a separate movement demo or API-only collection test. The 360-layout sweep validates generation and physical approaches, not 360 controller playthroughs.

Other retained regressions cover strict 1 m grid/core/support rules; crafting reservations/cancellation/destruction refunds; rain collection/research upgrades; hold-X targeting and core protection; shark bite/spear cooldown; jellyfish/fire hazards; rescue/revival; exact snapshot restoration; corrupt/future imports; native WebGL context loss/restoration; focus suspension; capped catch-up; mobile layout; hidden-by-default F3 with at-most-4 Hz painting and no extra RAF.

`reports/islands-browser.json` records the natural fixture seeds, waypoints/ticks, rewards, partial-save continuation, migration, scraping and warmed render cycles. All six captured biome overview images and the trail image are in `reports/biome-*.png` and `reports/islands-final-trail.png`. No WebGL/page errors were recorded in that run. The final static production build also passed five release smoke checks: Gold/schema/generation boot, the real begin button, the six-section field guide, portrait guide layout, and saving without remote asset requests. See `reports/gold-release-smoke.json`.

## 6. Performance: measured costs, not a hardware promise

### Rendering budgets and ownership

Canopies and ground cover are instanced with shared geometry/materials; architectural colors/planks are merged. Wind uses shared time uniforms instead of per-tree JavaScript animation. Far canopy geometry/density and 64/24 terrain LOD reduce distant cost; canopy base matrices are precomputed and only swapped at LOD transitions. Low reduces non-solid ground cover, effects and distance while retaining **all nearby solid scenery and interactions**. Low shadows remain disabled. Existing resolution caps/adaptive quality remain available.

The shoreline is one reused **65×260 RGBA texture (67,600 bytes)** containing four nearby 16-bit height tiles. It updates on a changed island set, not every frame. There are no ocean reflections, FFT simulation, added post-processing chains or per-tree lights.

Owned chunk geometry and instance buffers are disposed on unload; finite shared templates are intentionally retained. Existing tool/ghost/damage-repair churn returned **54 → 54 → 54 geometries** after warmup. A controlled identical long-sailing roundtrip measured **80 → 80** geometries, maximum 96, with nine loaded chunks. Its cold first-use scene was 54: the extra finite foliage/reef variants upload lazily. The original allocation assertions were retained; the comparison now warms the same route before testing for continued growth. A separate four-cycle real-render test returned to nine home chunks, two textures, and stable final warmed geometry counts (60 → 60).

### CPU generation profiling and optimization

The Node CPU profile identified flood-fill clearance probes as a significant cost. A temporary 4 m collision broadphase now accelerates route construction. It is rebuilt after placement repairs and does **not** replace or weaken authoritative runtime collision/line-of-sight queries. A regression compares the entire walkability/parent/reachable arrays against brute-force rotated-collider queries and requires exact equality.

On the same CPU-only ten-position blocking streaming diagnostic, warmed complete-batch mean fell from **278.251 ms to 123.219 ms (55.7% lower)**; initial batch fell from 1,005.422 to 775.278 ms. These are complete 3×3/blocking diagnostic batches, **not frame times or GPU FPS**. Normal gameplay retains the one-new-chunk-decision-per-frame budget. See `reports/generation-{before,after}.json` and the saved CPU profiles.

### Before/after renderer profile

Same 960×600 viewport, DPR 1, Chromium 156, forced SwiftShader software rendering, adaptive quality disabled, same home camera and nine chunks/seven islands. Low uses a 0.75 actual pixel ratio. Baseline was recorded before island implementation.

| Metric | Before High | Gold High | Before Low | Gold Low |
|---|---:|---:|---:|---:|
| Frame samples | 19 | 10 | 17 | 12 |
| Measured FPS | 1.966 | 1.181 | 1.749 | 1.319 |
| Mean frame ms | 508.689 | 846.820 | 571.694 | 758.242 |
| p95 frame ms | 892.600 | 1,426.800 | 938.000 | 1,263.800 |
| Mean render-submission CPU ms | 3.416 | 7.130 | 1.741 | 2.500 |
| Mean draw calls | 139 | 157 | 129 | 110 |
| Mean triangles | 54,773 | 207,893 | 26,505 | 23,213 |
| Allocated geometries at sample end | 46 | 83 | 47 | 84 |
| Allocated textures | 3 | 4 | 2 | 3 |
| Page errors | 0 | 0 | 0 | 0 |

**Do not read the lower Low draw/triangle counts as an FPS speedup.** Low calls fell 14.7% and triangles 12.4%, but measured software FPS fell about 24.6%. High deliberately renders substantially richer near scenery. The extra shader work/shore transparency/assets have a cost. Samples are short, software rendering is noisy, and render-submission CPU time excludes asynchronous GPU completion.

Additional on-shore Low profiles, without a pre-island shoreline baseline, measured approximately **59 calls / 86,318 triangles** at the starter journal and **67.7 calls / 114,019 triangles** in the jungle overlook. Their software FPS was 2.406 and 1.617 respectively. These are real rendering measurements, not a claim of playable frame rate on this software renderer. See `reports/profile-island-views.json`.

A shader-branching experiment was measured and **reverted** because the software-renderer result was worse. Its result is preserved separately, not substituted for the final source’s profile.

**No GT710, other physical low-end GPU, physical gamepad, Firefox/Safari, long manual endurance run or maximum-raft hardware benchmark was available. GT710-class playability is a design target, not a verified guarantee.** Start at Low, 0.50–0.75 resolution cap and adaptive quality, then inspect F3 on the actual machine.

## 7. Release and remaining limits

- `Tidebound-Gold.html`: embedded game code/fonts/original procedural art/audio/notices; no installation or runtime network required.
- `Tosins-Tidebound.html` and `Tidebreak.html`: identical compatibility aliases.
- `Tidebound-Gold-Source.zip`: editable source, local fonts/licenses, tests, reports, standalone copies and production `web-build/`.
- `Tidebound-Gold-Guide.md`: controls, exploration, saves, development and limitations.
- `Tidebound-Gold-Checksums.json`: release file sizes/hashes.

The source remains a single-player procedural prototype, with stylized modular art and simplified collisions/boat physics, not a production-art open-world release. Coastal coral, submerged rocks and stranded wrecks use existing swimming/hazards; there is no new dive/underwater-looting system. The save/raft/history bounds remain. Unsampled seeds, extreme rafts, browser/driver differences and very long voyages need additional manual/hardware coverage. Tested bounded placement/navigation is not a mathematical proof for every possible seed.

Original MIT attribution, Three.js MIT notices and local font licenses are retained. The prior 1.1 report is preserved as `reports/UPGRADE-1.1-REPORT.md`; its original source archive remains outside this release. No deployment, repository or account settings were changed.
