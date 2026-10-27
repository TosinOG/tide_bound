# Why Raft-Style Games Feel Better Than Tidebound Gold

**A competitive teardown and inspiration list — 27 October 2026**

> **Update (27 Oct 2026):** the recommendations below were implemented in the Voyager update (v1.3.0). See [`VOYAGER-UPDATE.md`](VOYAGER-UPDATE.md) for exactly what shipped, plus the mobile landscape fix.


Scope: `tide_bound` @ `arena/086ec891-tide-bound`, Tidebound Gold v1.2.0 (save schema 2, island generation 3), compared against the Raft v1.05b Windows build you shared on Dropbox, the finished Raft 1.0 (2022), Flotsam 1.0 (2025), and the player/critic consensus on why these games are enjoyable.

---

## How this was put together (and one honest caveat)

| Evidence | What I looked at |
|---|---|
| Your game | `README.md`, `Tidebound-Gold-Guide.md`, `src/data.js`, `src/systems.js`, `src/game.js`, `src/world.js`, `src/ui.js`, `src/audio.js`, `src/island-generation.js`, `src/assets.js`, plus the release screenshots in `reports/`. |
| Official build you linked | `V1.05b_Raft_Win64/ReadMe.txt` (controls), `.../_Data/output_log.txt` (Unity 2017.1.0f3, PlayWay Water, save path), and the strings/metadata inside `.../_Data/Managed/Assembly-CSharp.dll` (class, method and asset names such as `PlayerAnimator`, `Trigger_HookThrow`, `Cropplot`, `Chest`, `SoundManager`, `NetworkBehaviour`, `SelectCategoryDecorations`). |
| Modern Raft / Flotsam | Reviews and reference material linked in **Sources** at the end. |

**Caveat:** the shared build is a Windows-only `.exe` and cannot be executed in this Linux sandbox, so observations about v1.05b come from its shipped files, not a play session. Everything about *your* game comes from reading the running source, not guesswork. Also, "better" is contextual: Raft is a 20+ hour co-op product built by a studio; yours is a single-player browser prototype. The useful question is **which design levers create enjoyment, and which of them can you borrow cheaply.**

---

## TL;DR — the ten things other raft games do better

1. **A reason to keep sailing.** Their goals escalate into authored destinations and a real finale. Yours is "find 3 caches → build beacon → press F → victory modal".
2. **Progression that changes how you play.** Better hooks, axes, sails → steering wheel → engines, advanced stations, batteries. Your 21 items and 5 tools never improve.
3. **Systems that interlock.** Farming → cooking → buffs; ore → smelter → ingots; trash → recycler → trading currency. Your crafting is mostly gather → spend → receive.
4. **Survival that rewards mastery instead of upkeep.** 10+ cooking recipes, juices, crop plots, animals. You have 5 consumables, 2 cooking recipes, and two meters that only drain.
5. **Threat variety.** Sharks, birds, boars, screechers, lurkers, bears, bosses. You have one shark plus jellyfish, lightning and reefs.
6. **Worlds that surprise.** Handcrafted story islands with NPCs, notes, puzzles, traders, underwater loot. Your six procedural biomes are pretty, but every island is the same checklist.
7. **Building as self-expression.** Decorations, paint, furniture, storage, half-blocks, smooth rotation. Your 13 structures are all purely functional.
8. **Game feel and immersion.** First-person animated hands, per-action animation triggers, footsteps by surface, layered sound, high-end water with foam, spray and underwater effects. You have a third-person orbit camera, one sine-based swing animation, 10 synthesized beeps and a damage flash.
9. **Replayability and social play.** Co-op, 104 achievements, unlockable characters, creative mode, seed sharing, trading. You are single-player with one difficulty and a modal ending.
10. **Onboarding by doing, not reading.** Both genres fail at this, which is precisely your opportunity to beat them.

Underneath all ten is one pattern: **the other games give the player a visible, compounding sense of growth — of their raft, their capabilities, their knowledge of the world, and their standing with other players.** Tidebound Gold is a well-built, complete loop, but its loop stays the same size from minute 2 to minute 90.

---

## First, what your game already does better

Be fair to yourself before copying anyone:

- **Zero friction.** One 1.5 MB HTML file, no install, no accounts, no network. Raft needs a download, a launcher and (for the shared build) Windows. This is a genuine distribution advantage for a browser game.
- **Art direction and UI craft.** The cinematic menu, Fraunces/Outfit typography, restrained palette, chapter cards and responsive touch HUD are more polished than most indie survival UIs. See `reports/gold2-menu-desktop.png`.
- **Serious save engineering.** Strict V1→V2 migration, schema validation, backups, reservation refunds, autosave every 20 simulated seconds, import confirmation, generation-version handling. The v1.05b build's ReadMe says saving happens only when you exit to the main menu or quit the game.
- **Per-island authored content.** Every generated island gets a landing cache, landmark with story, keeper journal, ordered waystones, hidden grotto chest, reef dive cache, trails and a reachable overlook — plus six distinct biome profiles. Early Raft was criticised for repeating identical islands ([5](https://checkpointgaming.net/reviews/2022/07/raft-review-sailing-seas-spearing-sharks/)).
- **Accessibility and kindness.** Calm Seas mode, optional puzzles that never gate rescue, no tool durability, no offline decay, quality presets, gamepad/touch support, F3 perf monitor, hidden-tab pause. Critics consistently call Raft's hunger/thirst micromanagement and brutal first hour its weakest part ([1](https://www.reddit.com/r/RaftTheGame/comments/vo6qqq/what_is_the_deal_with_this_game_why_has_it_been/), [4](https://www.shacknews.com/article/131150/raft-review-steam), [7](https://www.pcgamer.com/raft-review/)).
- **Engineering discipline.** 71 unit tests, deterministic island seeds, fixed-step simulation, adaptive quality, streaming chunks. That is why you can safely add content.

**Keep all of that.** Most of the recommendations below are additive, not replacements.

---

## The scoreboard

Counts for your side are from `src/data.js` and friends at the time of writing.

| Dimension | Tidebound Gold | Raft v1.05b (your shared build) | Raft 1.0 (2022) | Flotsam 1.0 (2025) |
|---|---|---|---|---|
| Playable camera | Third-person orbit only | First-person, animated held tools | First-person | Isometric colony view |
| Tools | 5, no tiers, no durability | Hook, axe, spear, fishing rod, hammer; axe chops palms | + metal/advanced tiers, metal detector, zipline, net launcher | Worker tools + specialist roles |
| Structures / buildings | 13, all functional | Blocks + **Decorations** category, chests, cooking stands, crop plots, item nets, sail, repairable blocks | Dozens incl. engines, steering, smelter, recycler, battery, sprinklers, paint mill | Large tech tree with functional town upgrades |
| Recipes | 7 craft (2 are cooking) + 13 builds | Cooking stand (food + purifier), raw/cooked foods, recipes menu | Cooking Pot (10 recipes + 3 star), Juicer, buffs | Multi-stage production chains |
| Research | 5 one-click discoveries | Crafting table with categories | Research Table + found blueprints + gated tech tree | Research tree + specialists |
| Story | 3 lore notes, 7 main quests, 1 ending modal | None (prototype) | 8 story locations in 3 chapters, radio codes, bosses, finale | Campaign, regions, per-specialist questlines |
| Threats | 1 shark, jellyfish, lightning, reefs | Shark (animation/audio states) | Shark, birds, boars, screechers, lurkers, bears, bosses | Pollution, drought, hazardous regions |
| Economy | Direct gather→craft | Barrels, item nets, chests | Trading Posts, Trash Cubes, Trade Coins, reputation tiers | Recycling economy, specialised workers |
| Food / water | 5 consumables, 2 stat bars | Multiple raw/cooked foods, seeds, tin cans, crop plots | Farming, animals, 6 special buff meals, smoothies | Farms, water/fuel dependencies |
| Audio | Ocean loop, 3-note drone, 10 sine/saw cues | SoundManager: footsteps, hungry/thirsty/injured/fatigue vocals, shark stingers, underwater audio, chest/cook sounds | Full scored soundtrack, ambient layers | Full soundtrack |
| Water | Procedural ShaderMaterial, 4 weather states | PlayWay Water: FFT waves, foam, spray, shoreline masks, underwater blur/drops/distortion, 5 named sea states | Same lineage, refined | Stylised shallow flooded world |
| Multiplayer | None (explicitly single-player) | UNET assemblies + `NetworkBehaviour`-derived classes ship in build | Full co-op | Single-player |
| Meta progression | None | Save slots | 104 achievements, unlockable characters, creative mode | Campaign + regions |
| Onboarding | Field guide (6 text sections), hints, chapter quest panel | ReadMe.txt wall of controls | Famously little tutorial ([1](https://www.metacritic.com/game/raft/)) | Mixed; some systems poorly explained |

---

## The ten gaps, in detail

### 1. A goal ladder — the single biggest difference

**What they do.** Raft 1.0 makes you build a Receiver and three Antennas, then feed it four-digit codes found on story islands. Each destination (Radio Tower, Vasagatan, Balboa, Caravan Town, Tangaroa, Varuna Point, Temperance, Utopia) is a hand-authored place with its own puzzle, enemies, blueprints and story reveal, spread across three chapters ([1](https://steamcommunity.com/sharedfiles/filedetails/?id=1648718375), [3](https://www.polygon.com/raft-guide/23189788/start-story-radio-tower-blueprints-location-receiver-antenna-battery-how-to/), [11](https://raft.fandom.com/wiki/Story)). Reviewers name this the most impressive part of the game ([5](https://checkpointgaming.net/reviews/2022/07/raft-review-sailing-seas-spearing-sharks/)). Flotsam 1.0 similarly added a campaign, new regions, and specialist questlines ([9](https://www.biogamergirl.com/2025/11/flotsam-from-plastic-to-prosperity-turn.html)).

**What you do.** `QUESTS` in `src/data.js`: 7 main quests over 3 chapters, culminating in `home` → `rescue()` which sets a flag, pauses, and opens `UI.victory()` — a modal with three stats. Three `LORE` notes are the entire narrative. The world itself has no escalating destination.

**Why it matters.** A checklist of counters ("salvage 4, build 1, make 1 water, find 3 caches") is a task list, not a journey. A ladder of *places* gives anticipation, novelty and a reason for one more session. Your islands already have journals and waystones; they are the perfect scaffolding for codes and a destination chain.

**Borrow this (medium effort, high payoff).**
- Add a `Charting Table` station (research-gated) that displays a coded bearing; journals on islands reveal four-digit codes. This reuses your `M` ocean chart and `J` journal.
- Author 3–5 fixed story islands with distinct mechanics (a wreck you must dive through, a pirate camp with hostile NPCs, a volcanic forge, a final station) in `src/island-generation.js`. Keep procedural islands as filler between them.
- Replace the single victory modal with a finale sequence: approach the last island, a set-piece (defend the beacon for 90 seconds while a storm and shark attack), then credits, an epilogue journal, and free-roam continue.
- Put the reveal in the world, not in a modal: readable notes, environmental silhouettes, a lighthouse that actually lights up.

---

### 2. Progression that changes the verbs

**What they do.** Raft's research table consumes materials to learn new recipes, and blueprints found in barrels unlock new stations and tools ([3](https://raft.fandom.com/wiki/Research_Table), [4](https://en.wikipedia.org/wiki/Raft_(video_game))). Players repeatedly say the small quality-of-life upgrades — a better bottle, a metal hook, a sail, a permanent anchor, engines — are what turned the game from a grind into a joy ([1](https://www.reddit.com/r/RaftTheGame/comments/vo6qqq/what_is_the_deal_with_this_game_why_has_it_been/), [7](https://www.pcgamer.com/raft-review/)). Flotsam's tech tree expands your reach as you climb it ([7](https://raiderking.com/flotsam-review-waterworld-without-the-crazy-stunts/)).

**What you do.** `RESEARCH` has 5 entries; each is found as an item and researched with a single button in the backpack. All 5 tools are static, and `src/ui.js` literally tells the player "Tools have no durability". `castHook()` gives magnetic aim assist, a 7–27 m range and no failure state; it never evolves. `CraftingManager` has one job slot.

**Why it matters.** If the action you perform most (hooking debris) feels identical at hour 0 and hour 3, the game feels static. Upgrades are not about bigger numbers; they're about *new capabilities* — multi-catch hooks, longer range, auto-reel, engines that let you sail against the wind.

**Borrow this (small/medium).**
- Three hook tiers in `src/data.js` (`hook` → `scrapHook` → `chainHook`): +range, +flying speed, 2-item catch, auto-reel. Implement in `castHook()`/`updateHook()`.
- `paddle` → `sail` → `helm` → `engine` (fuel = wood/resin) so navigation itself levels up; the engine finally lets you sail *against* the windcatcher's trade winds.
- Advanced stations: purifier → `condenser` (2 water/job), grill → `cookingPot` (multi-ingredient). Reuse the existing reservation/jobs system.
- Add a found-blueprint item (`blueprint:engine`) as a drop from barrels/grotto chests to make discovery feel earned.

---

### 3. Interlocking systems and a real economy

**What they do.** Raft refines ore into ingots in a smelter, turns surplus into Trash Cubes via a Recycler, and spends currency at Trading Posts with reputation tiers ([4](https://en.wikipedia.org/wiki/Raft_(video_game)), [10](https://raft.fandom.com/wiki/Trading_Post)). Flotsam's reviews repeatedly praise its layered production chains — collect → refine → craft → power — where water production needs fuel and food needs water ([2](https://gamecritix.co.uk/flotsam-review/), [6](https://www.xpnnetwork.com/post/flotsam-review-building-hope-on-a-sea-of-junk)).

**What you do.** `RECIPES` are almost all one-step: `leaf → rope`, `wood → water`, `rawFish + wood → cookedFish`. Copper is researched directly from ore; scrap is spent directly. There is no currency, no trader, no refining, no storage containers (the "chests" in `island-generation.js` are one-shot loot nodes, not containers), and no fuel. `STARTER_ITEMS` gives 12 wood / 8 plastic / 10 leaf / 5 scrap on top of barrels that drop 3 wood + 2 plastic + 2 scrap + 2 bonus — scarcity rarely forces a real choice.

**Why it matters.** Interdependencies create decisions ("do I spend these planks on a fire or expand the raft?" is the exact tension Raft players describe as engaging). A flat economy creates no decisions, only queueing.

**Borrow this (medium).**
- `copperOre` → `copperIngot` via a smelter that consumes wood; ingots unlock beacon/engine/windcatcher tiers.
- A `recycler` that compresses surplus into `tradeToken`; a wandering trader NPC on authored islands selling recipes, cosmetics and rare seeds.
- Buildable storage chests with a simple container UI (reuse `Inventory` with a `capacity` field) — this also gives large rafts a purpose.
- Make fuel a soft pressure for engines and advanced stations, not for basic survival (keep Calm Seas friendly).

---

### 4. Survival depth instead of survival upkeep

**What they do.** Raft 1.0 has gardening, cooking-pot recipes (10 + 3 star), a juicer, domesticated animals producing eggs/milk/wool, and meals that grant real buffs ([1](https://steamcommunity.com/sharedfiles/filedetails/?id=1648718375), [7](https://www.polygon.com/raft-guide/23185193/juice-juicer-recipes-list-cookpot-dishes-food/), [11](https://store.steampowered.com/app/648800/Raft/)). Even the 2017 prototype already shipped `Cropplot`, `Cropplot_Tree`, `Seed_Palm`, `PlantSeed`, `TreeChopper`, `Potato_Raw/Cooked`, `Beet_Raw/Cooked`, `Mackerel_Raw/Cooked`, `SharkMeat_Raw/Cooked`, `Tincan_saltWater/purifiedWater`, and `CookingStand_Food/Purifier`.

**What you do.** `SurvivalStats` has three bars; `ITEMS` has 5 consumables (raw fish, grilled fish, island stew, water, coconut) and 2 actual cooking recipes. Food is a flat stat refill with no buffs, no variety, no growing, no discovery. Your rain collector and island stew are a good start — they are the only two systems that add texture here.

**Why it matters.** Hunger/thirst as pure upkeep is the part reviewers like least ([5](https://checkpointgaming.net/reviews/2022/07/raft-review-sailing-seas-spearing-sharks/)). Cooking becomes fun when it is a *choice with upside* — a stew that grants cold resistance during a storm, a brew that speeds swimming, a crop you planted three days ago finally paying off.

**Borrow this (medium).**
- `cropPlot` structure + palm/coconut seeds; grow leaf/vine/coconut on the raft (reuse `production` timers on `GridManager` blocks).
- 4–6 cooking-pot recipes with buffs: `seaStew` (+storm resistance), `reefSalad` (+dive time / swim speed), `spicedFish` (+spear damage). The waystones/grotto chests are natural recipe-drop locations.
- A `fishingRod` catch table (currently every bite yields exactly 1 `rawFish`): mackerel, puffer, rare lantern fish used in recipes.
- Small passive island fauna (birds stealing crops) to make crop plots need a scarecrow.

---

### 5. Threat variety and memorable encounters

**What they do.** Beyond the shark, Raft has seagulls, puffers, warthogs, screechers, lurkers, bears, butler-bots and a boss at Varuna Point ([1](https://steamcommunity.com/sharedfiles/filedetails/?id=1648718375), [14](https://www.trueachievements.com/game/Raft/achievements)). Flotsam has hazardous regions (Industry Zone, Polluted Woods) that force risk/reward decisions ([9](https://www.biogamergirl.com/2025/11/flotsam-from-plastic-to-prosperity-turn.html)).

**What you do.** `SharkAI` is a solid little state machine (circling → targeting → attacking → fleeing, 65 s cooldown, plating mitigation, spear interrupt), but it is one enemy. Jellyfish deal 5 damage + a slow. Lightning starts fires. Reefs scrape foundations. That's the whole bestiary — `README.md` says so explicitly.

**Why it matters.** One enemy with a fixed 65-second rhythm becomes a metronome, not a threat. Variety is what makes an island feel like a place with its own risks, and a boss is what makes a chapter memorable.

**Borrow this (medium).**
- Island-specific hazards: thorny vines (slow), aggressive boars (charge), pirate sentries (ranged), volcano fumaroles (periodic damage zones). Reuse your existing `sting`/slow and `SharkAI` targeting logic.
- A boss encounter at the final island: a great shark with 3 phases that must be driven off while you power the beacon — this turns your existing spear/plating system into a climax.
- A seagull that steals from crop plots, so building a scarecrow is a real reaction to the world.

---

### 6. Worlds that surprise, not just worlds that vary

**What they do.** Raft mixes small/large procedural islands with fully authored story islands containing NPCs, notes, puzzles, traps, traders and underwater sections ([3](https://en.wikipedia.org/wiki/Raft_(video_game)), [11](https://raft.fandom.com/wiki/Story)). Flotsam's biomes — garbage patches, sunken ruins, whale feeding grounds, old settlements, oil platforms — each have distinct resources and challenges ([2](https://gamecritix.co.uk/flotsam-review/), [8](https://www.gsmgotech.com/2025/12/flotsam-review-build-floating-city-from.html)).

**What you do.** Six biome profiles in `src/island-terrain.js`, deterministic placement, and a genuinely nice per-island structure: landing cache, 3 trail pickups, landmark with story, special research item, journal, optional 3-rune puzzle, grotto chest, reef dive cache, jellies. This is *more* authored content per island than early Raft had. But it's also **the same content, in the same order, on every island**, and the README admits there is no oxygen system, no deep-sea terrain, and no separate underwater world.

**Why it matters.** Procedural variety changes the wallpaper; authored variety changes what you *do*. After two islands, a player can predict the entire third. That's when sessions end.

**Borrow this (large, do after #1).**
- Keep 6 biomes, but randomise the *activity mix*: some islands have no waystones, some have two grottos, some are a wreck-dive only, some are a pirate camp with NPCs.
- Add a full shallow underwater ruin with an oxygen meter (breath = a resource you manage, not a punishment) and a unique ingredient. Your `C` dive state already exists — extending it is cheaper than building it.
- Give each biome a signature interaction: volcanic forge (smelt without a raft station), outpost radio (reveals a code), atoll wreck (multi-room swim-through).
- Add NPCs — even 2D billboard dialogue — because a single other voice changes the emotional temperature of an empty ocean.

---

### 7. Building as self-expression and pride of ownership

**What they do.** Raft players routinely describe their raft as a home they're proud of ([4](https://www.shacknews.com/article/131150/raft-review-steam), [5](https://checkpointgaming.net/reviews/2022/07/raft-review-sailing-seas-spearing-sharks/)). The v1.05b DLL contains `SelectCategoryDecorations`, `Decorations`, `BlockMenu`, `SetGhostBlockState`, `CanBeRepaired`, `ChestSmall/ChestBig`, `ItemCollector`, and its ReadMe advertises "Hold R + mouse movement → Rotate buildable objects smoothly". Raft 1.0 adds a Paint Brush, paint mill, hammock, chairs, tables, rugs, lanterns, flags, decoration packages and dozens of achievements for building ([6](https://raft.fandom.com/wiki/Achievement_Guides)).

**What you do.** 13 structures, all functional, strict 1 m grid, `R` rotates 90° only, no cosmetics, no storage furniture, no colour choice, no decorative flags, no half-height pieces. `GridManager` is excellent engineering (support graphs, integrity cascades, dismantle refunds) but it exists for a purely utilitarian end.

**Why it matters.** Base-building games are played for *identity*, not efficiency. A raft that looks like its owner creates screenshots, shares, and attachment — free marketing and retention. Right now every player's raft looks the same.

**Borrow this (small for cosmetics, medium for variety).**
- Purely cosmetic recipes in `BLOCKS`: `flag`, `lantern`, `hammock`, `rug`, `planter`, `paintedWall` (data-only, no gameplay change — your `GridManager.canPlace` already handles arbitrary types).
- A `paintBrush` tool: click a structure, choose from 8 palette colours; store `color` on the block and apply a material tint in `createBlock`. This is a tiny change with a huge expressive payoff.
- Smooth rotation with `R`+drag (the 2017 build had it), plus half-height/triangle pieces if you want to go further.
- A "photo mode" (hide HUD with `H` + high-quality screenshot / PNG export) and a shareable raft code — cheap virality for a browser game.

---

### 8. Game feel, juice and immersion — the cheapest win on this list

**What they do.** The v1.05b DLL is full of feel systems: `PlayerAnimator`/`PlayerAnimation` with triggers `Trigger_HookThrow`, `Trigger_HookLoad`, `Trigger_HookFinished`, `Trigger_SpearHit`, `Trigger_FishingThrow/Retract/Load`, `AxeHit`, `Cook`, `Drink`, `BitingPlayer`, `SharkBegin`, `SharkAttack`, `PlayerDamage`; a `SoundManager` with `PlayFootStepSound`/`FootstepWood`, `hungrySound`, `thirstySound`, `injuredSound`, `fatigueSound`, `playerScreamSource`, `sharkBeginSource`, `underwaterAudio`, `ChestOpen/ChestClose`; and PlayWay Water with FFT waves, `WaterFoam`, `WaterSpray`, shoreline masks, planar reflections, underwater blur/drops/distortion and named sea states (`calmSeaWater`, `breezeSeaWater`, `choppySeaWater`, `stormSeaWater`, `calmShoreWater`).

**What you do.** `renderCamera()` is a third-person orbit with no first-person option. `createAvatar()` in `src/assets.js` builds a charming boxy character, but animation is one sine-driven limb swing plus a single `p.action` swing (`src/game.js`, `updatePlayer`). `SeaAudio` in `src/audio.js` is one filtered noise loop, a 3-note ambient drone, and 10 named oscillator cues (`collect`, `craft`, `build`, `hook`, `damage`, `click`, `discover`, `splash`, `warning`, `rescue`). There are no footsteps, no surface-dependent sounds, no low-stat vocal cues, no shark stinger, no screen shake or hit-stop (only `UI.damageFlash()`), no wake/foam behind the raft, no water spray. Particle bursts on hook splashes are the one bright spot — build on them.

**Why it matters.** "Feel" is what players notice before they understand any system. Raft's water and first-person hands are why a 2017 prototype looked and felt like a *game*, while a technically superior browser game can feel like a spreadsheet with a camera.

**Borrow this (small, do first).**
1. **Camera shake + hit-stop** on shark bites, lightning and storms: offset `camera.position` in `renderCamera()` with a decaying amplitude, and scale `clock.advance` input for 80 ms. ~30 lines.
2. **Layered audio** in `src/audio.js`: footstep ticks tied to `p.anim` and surface (sand/wood/water), a low-health breathing loop, a shark-approach stinger, a UI confirm chime, and a filtered "underwater" ambience (you already have `setUnderwater`).
3. **Water feedback**: a wake ribbon behind the raft, foam ring at island shorelines, spray particles on wave crests during storms. Your `Ocean` shader and `ParticlePool` are ready-made hooks.
4. **Distinct action animations**: separate arm poses for hooking, spearing, building, eating and swimming instead of one `p.action` sine. Add a visible held-tool bob and a reel-in rotation.
5. **First-person toggle** (`V`): place the camera at the avatar's head and show the held tool in view. Even a rough version doubles immersion and is a big differentiator for a browser game.
6. **Floating numbers** (`+3 Driftwood`, `−20 foundation`) on pickups and damage — cheap, constant positive reinforcement.

---

### 9. Replayability and the social layer

**What they do.** Raft 1.0 has co-op (explicitly praised in the Wikipedia critical summary), 104 achievements, unlockable characters, creative mode, and post-story free roam ([2](https://raft.fandom.com/wiki/Achievements), [3](https://en.wikipedia.org/wiki/Raft_(video_game)), [12](https://steamcommunity.com/sharedfiles/filedetails/?id=3499718632)). The 2017 prototype already shipped `UnityEngine.Networking.dll`, `NetworkBehaviour`-derived classes and `RGD_ItemNet`/`NetworkWater` — co-op was in from the start. Flotsam adds specialists with their own questlines and regions.

**What you do.** Single-player by design (README), one difficulty (`relaxed` toggle), no seed UI, no achievements, no challenges, no post-rescue escalation. `rescue()` pauses the game; the victory modal shows days at sea / new shores / a couple of counters.

**Why it matters.** Without meta-goals, one completed run is the end of the relationship. With them, players self-author goals and share them.

**Borrow this (small/medium, browser-friendly).**
- A **Voyage Log** of ~30 achievements (first shark repelled, 10 islands, 200 structures, all 6 biomes, all journals, 100% research, storm survival, no-death run) using your existing `EventBus` + `QuestManager`.
- **Seed sharing**: a visible world seed in Settings with an import field; deterministic islands already exist (`exploration.js`, `hash2`). Publish a weekly seed challenge.
- **Post-rescue endless mode**: escalating storm frequency, armoured shark variants, new islands with rarer loot — a reason to keep the save.
- **Difficulty presets** (Drifter / Castaway / Stormchaser) tuning drain rates, shark cooldown and loot; `SurvivalStats.update(dt, relaxed)` is one parameter away from this.
- **Asynchronous social** if true multiplayer is out of scope: share a raft snapshot code, a "ghost raft" from another player's save, or a screenshot postcard. Full network co-op is a large project — don't start there.

---

### 10. Onboarding — where you can beat them rather than copy them

**What they do.** Raft is repeatedly criticised for having essentially no tutorial and dropping players into starvation ([1](https://www.metacritic.com/game/raft/), [2](https://howlongtobeat.com/game/56668/reviews/latest/1), [9](https://www.metacritic.com/game/raft/user-reviews/)). Flotsam 1.0 reviews note "some mechanics poorly explained" ([3](https://gamenews.fyi/flotsam-review/)).

**What you do.** Better than them already: a cinematic menu with "How to play", a 6-section field guide (`renderHelp`), movement hints, a chapter quest panel, tooltips on every quest, a welcome card, and context-sensitive interaction prompts. But it's still a **wall of ~20 keybinds** (WASD, Space, Shift, F, G, M, C, Tab/I, J, H, ?/F1, R, X, T, 1–8, Q/E, wheel, F3, +/−) delivered before the player has touched anything, and the field guide is static text rather than a taught action.

**Why it matters.** Complexity without progressive disclosure is the #1 reason a browser game loses a visitor in 60 seconds. You have a 1.5 MB no-install game — the first five minutes are your entire funnel.

**Borrow this (small).**
- An interactive first 10 minutes: one contextual prompt at a time, gated by the player actually doing it ("Hold left mouse to charge your hook" → highlight the nearest barrel → after the catch, reveal the hammer). Fade the prompt only on success.
- Hide advanced controls until unlocked (helm, dive, waystones, dismantle) — reveal each with a small card at the moment it becomes relevant.
- Make the quest panel's current step a **3D objective marker** in the world (a soft beam on the purifier, an arrow toward the nearest island) instead of a text tip.
- Add a "skip guidance" toggle for returning players; keep the full field guide as reference.

---

## Priority roadmap (impact vs effort)

| # | Change | Impact | Effort | Main files |
|---|---|---|---|---|
| 1 | Camera shake, hit-stop, floating numbers, layered audio, wake/foam spray, distinct action animations | ★★★★★ | S | `game.js`, `audio.js`, `ui.js`, `world.js`, `assets.js` |
| 2 | Interactive first-10-minutes onboarding + 3D objective marker | ★★★★★ | S | `ui.js`, `game.js` |
| 3 | Tool tiers (hook ×3, axe, advanced purifier/grill, engine) + found blueprints | ★★★★★ | M | `data.js`, `systems.js`, `game.js`, `ui.js` |
| 4 | Cosmetic building (flags, lanterns, paint, storage chests, smooth rotation) + photo mode | ★★★★☆ | S–M | `data.js`, `assets.js`, `ui.js`, `game.js` |
| 5 | Charting Table + 4-digit codes + 3 authored story islands + boss finale | ★★★★★ | L | `data.js`, `island-generation.js`, `island-terrain.js`, `world.js`, `game.js`, `ui.js` |
| 6 | Cooking pot recipes with buffs, crop plots, varied fish, island fauna | ★★★★☆ | M | `data.js`, `systems.js`, `game.js`, `world.js` |
| 7 | Smelter/recycler/trader economy and storage containers | ★★★★☆ | M | `data.js`, `systems.js`, `ui.js`, `island-generation.js` |
| 8 | Achievements, seed sharing, difficulty presets, post-rescue endless mode | ★★★☆☆ | S–M | `progression.js`, `config.js`, `ui.js`, `world.js` |
| 9 | First-person toggle with animated held tools | ★★★★☆ | M | `game.js`, `assets.js` |
| 10 | Oxygen dive ruins, NPCs, hazard variety | ★★★☆☆ | L | `game.js`, `world.js`, `island-generation.js` |

**If you only do one thing this week:** #1 + #2. They cost days, not weeks, and they change how the entire existing game feels. **If you do one thing this month:** #3 + #5, because they change what the game *is* — from a loop into a journey.

---

## Don't copy their mistakes

Raft's most common complaints are your warning labels:

- **Grind and repetitive clicking** — "the core gameplay loop doesn't evolve in a meaningful way" ([10](https://steamcommunity.com/app/648800/discussions/2/5051317596400960831/)), and players complain about "the same unnecessary sequence of clicks hundreds of times" ([12](https://steamcommunity.com/app/648800)). Your magnetic hook assist and collection net are already the right answer; keep automating.
- **Hunger/thirst as busywork** — reviewers call it the least engaging element ([5](https://checkpointgaming.net/reviews/2022/07/raft-review-sailing-seas-spearing-sharks/)). Your Calm Seas mode and no-durability tools are kind; add depth to food, not faster drain.
- **Brutal, unclear early game** — "you're figuring out game mechanics at the same time that you're starving to death" ([1](https://www.reddit.com/r/RaftTheGame/comments/vo6qqq/what_is_the_deal_with_this_game_why_has_it_been/)). Your generous starter kit is a feature; keep it and teach with it.
- **Sharks as annoyance** ([4](https://www.shacknews.com/article/131150/raft-review-steam)). Your telegraphed, interruptible, plateable shark is already better designed than theirs — deepen it instead of multiplying it.
- **Repeated islands** ([5](https://checkpointgaming.net/reviews/2022/07/raft-review-sailing-seas-spearing-sharks/)). Your procedural biomes are a head start, but they need authored set-pieces sprinkled in.

---

## The one-sentence version

Raft and Flotsam are more enjoyable because **the player, the raft, and the world all visibly grow together**, wrapped in a world that feels physical and a journey that keeps promising something new. Tidebound Gold has an excellent foundation — it already fixes several of Raft's worst sins — but its systems stay the same size from start to finish. Add escalating goals, evolving tools, cosmetic ownership, and sensory feedback, and you will have borrowed their fun without inheriting their grind.

---

## Sources

**Raft — design, reception and what players enjoy**

- [Wikipedia — Raft (video game)](https://en.wikipedia.org/wiki/Raft_(video_game)) — progression, multiplayer, story islands, 5M+ sales, slow early game.
- [Shacknews — Raft review: An ocean of possibilities](https://www.shacknews.com/article/131150/raft-review-steam) — natural progression, pride in base, shark/hunger complaints.
- [PC Gamer — Raft review](https://www.pcgamer.com/raft-review/) — sail/anchor QoL turning chores into leisure; base travels with you.
- [Checkpoint Gaming — Raft Review](https://checkpointgaming.net/reviews/2022/07/raft-review-sailing-seas-spearing-sharks/) — story content as the highlight, repeated islands, hunger/thirst busywork.
- [Rock Paper Shotgun — Raft (early access review, 2020)](https://www.rockpapershotgun.com/raft-review-early-access-2) — collection nets automating gathering, guided progression, large islands with animals.
- [Reddit — "What is the deal with this game, why has it been reviewed so favourably?"](https://www.reddit.com/r/RaftTheGame/comments/vo6qqq/what_is_the_deal_with_this_game_why_has_it_been/) — small QoL upgrades making a huge difference; brutal early game.
- [Steam discussion — "The core gameplay loop really doesn't evolve"](https://steamcommunity.com/app/648800/discussions/2/5051317596400960831/) — lack of automation/efficiency boosts.
- [Metacritic — Raft user reviews](https://www.metacritic.com/game/raft/user-reviews/) — lack of early motivation/story access.
- [HowLongToBeat — Raft reviews](https://howlongtobeat.com/game/56668/reviews/latest/1) — no concise tutorial, unclear goals.

**Raft — specific systems**

- [Polygon — Research Table / Receiver / blueprints guide](https://www.polygon.com/raft-guide/23189788/start-story-radio-tower-blueprints-location-receiver-antenna-battery-how-to/)
- [Raft Wiki — Story](https://raft.fandom.com/wiki/Story), [Research Table](https://raft.fandom.com/wiki/Research_Table), [Achievements](https://raft.fandom.com/wiki/Achievements), [Trading Post](https://raft.fandom.com/wiki/Trading_Post)
- [Steam Community — Complete Guide](https://steamcommunity.com/sharedfiles/filedetails/?id=1648718375) — gardening, cooking recipes, animals, enemies, trading, engines.
- [Polygon — Cooking Pot / Juicer recipes](https://www.polygon.com/raft-guide/23185193/juice-juicer-recipes-list-cookpot-dishes-food/) — meals with buffs.
- [Steam store — Raft](https://store.steampowered.com/app/648800/Raft/) — "Farm and cook! Grow crops, catch and tend to animals".
- [TrueAchievements — Raft achievements](https://www.trueachievements.com/game/Raft/achievements) — boss at Varuna Point, finale.
- [Steam Community — 100% achievement guide](https://steamcommunity.com/sharedfiles/filedetails/?id=3499718632) — animals, co-op, characters.

**Flotsam — the other modern "raft" game**

- [GameCritix — Flotsam Review](https://gamecritix.co.uk/flotsam-review/) — layered economy, biome variety, production chains.
- [RaiderKing — Flotsam Review](https://raiderking.com/flotsam-review-waterworld-without-the-crazy-stunts/) — mobile town, tech tree, region variety.
- [BioGamerGirl — Flotsam: From Plastic to Prosperity](https://www.biogamergirl.com/2025/11/flotsam-from-plastic-to-prosperity-turn.html) — campaign, specialist questlines, functional upgrades.
- [GSMGoTech — Flotsam Review](https://www.gsmgotech.com/2025/12/flotsam-review-build-floating-city-from.html) — rescuing specialists, exploring submerged ruins.
- [Gamenews — Flotsam Review](https://gamenews.fyi/flotsam-review/) — "some mechanics poorly explained".
- [Rock Paper Shotgun — Flotsam early access review](https://www.rockpapershotgun.com/2019/10/15/flotsam-review-early-access/) — charming floating-town loop.

**Primary reference build (provided by the user)**

- Dropbox shared folder: `V1.05b_Raft_Win64/` — `ReadMe.txt`, `V1.05b_Raft_Win64_Data/output_log.txt`, `V1.05b_Raft_Win64_Data/Managed/Assembly-CSharp.dll`, `UnityEngine.Networking.dll`. Inspected 27 October 2026.
