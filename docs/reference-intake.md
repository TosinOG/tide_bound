# Handing over a reference build

How to get another game's build in front of the agent so its mechanics can be studied, and how that turns into code in this repo.

## 1. Best option: a link instead of an upload

The sandbox can reach **GitHub, npm and PyPI** and nothing else. That decides the order:

| Source | Works? | What to send |
|---|---|---|
| Public GitHub repo (source or release) | Yes | the repo URL; it is cloned inside the sandbox |
| Private GitHub repo your account can see | Yes | the URL; `gh` is already authenticated as the repo owner |
| Browser/WebGL build hosted anywhere | Usually | the play URL; pages are fetched and the JS is read |
| itch.io / GameJolt free download | Sometimes | the page or direct download URL; gated or account-only links fail |
| Steam / GOG / Epic | No | the sandbox cannot reach the stores; send notes, wiki numbers or a guide instead |
| A file on your own PC | Only by attachment | see step 2 |

A GitHub repo is by far the most reliable path for anything larger than a few MB, and it keeps the reference build out of this repository's history.

## 2. If the file only exists on your machine

Attachment pickers usually filter by extension, not by magic bytes. Any of these work:

1. **Rename and attach** – `game.zip` → `game.zip.bin` (or `.dat`). The sandbox identifies it by content, and `unzip` opens it normally. Tell me the real name in the message.
2. **Attach the already-unpacked pieces** – if the build is loose files, attach the few that matter (scripts, data JSON, configs) rather than the whole tree.
3. **Push it to GitHub** – a private repo, one commit, then send the URL. Best for a build with thousands of files.
4. **Do not paste base64** – it bloats the conversation and loses the file.

Once the archive is in the workspace (for example `~/tide_bound/.intake/game.zip`), run:

```bash
node scripts/game-intake.mjs .intake/game.zip          # or a folder, or an already-downloaded build
node scripts/game-intake.mjs .intake/game.zip --strings # also scan binaries for gameplay vocabulary
```

It writes `reports/intake-<name>.md`: engine signature, file-type census, largest files, a ranked list of the files most likely to hold mechanics, and a next-step checklist. `.intake/` is gitignored, so the reference build never lands in a commit.

## 3. What the extraction actually does

- Reads, unpacks, lists, greps. It never runs the game, never executes a binary, and never uploads anything.
- Nested archives are left for a follow-up run (`game.zip` → `assets.zip`).
- Encrypted or packed formats that need a Windows GUI tool (FModel, UndertaleModTool, AssetStudio) cannot run here — in that case, observe the game and describe the behaviour instead.

## 4. Engine cheat-sheet

| Signature in the archive | Engine | Readable? |
|---|---|---|
| `*_Data/Managed/Assembly-CSharp.dll`, `globalgamemanagers` | Unity (Mono) | Values in `*.assets` (UABEA/AssetRipper); decompile the DLL for logic |
| `GameAssembly.dll`, `*_Data/il2cpp_data/` | Unity (IL2CPP) | Hardest; needs Il2CppDumper, usually observe instead |
| `project.godot`, `*.pck` | Godot | `.pck` unpacks; GDScript is readable unless encrypted |
| `data.win` | GameMaker | UndertaleModTool decompiles to GML |
| `www/data/*.json`, `js/rpg_core.js` | RPG Maker MV/MZ | Fully readable JSON and JS |
| `Game.rxdata` / `Game.rvdata2`, `*.rgssad` | RPG Maker XP/VX/Ace | Unpack the archive, dump Ruby data |
| `*.pak`, `*.uasset` | Unreal | Data tables via FModel; Blueprints are very hard |
| `c2runtime.js`, `c3runtime.js` | Construct | Readable compiled events |
| `resources/app.asar` | Electron | `npx @electron/asar extract` gives the original JS |
| `package.json`, `index.html`, bundled `*.js` | HTML5 | Read directly, or pretty-print the bundle |
| `libapp.so`, `flutter_assets/` | Flutter | Dart AOT snapshot; observe instead |

## 5. Legal and ethical guardrail

Mechanics and rules are not copyrightable; code, art, audio, names, level layouts and text are. So the workflow is always: **read for rules, write a spec, re-implement in this repo's own style.** Do not copy source files, assets, audio, UI text or character names, and check the reference build's licence/EULA — many commercial EULAs forbid reverse engineering even where the purpose is study. A public design breakdown of the same game is a safer citation than a disassembled build.

## 6. From intake to implemented feature

1. `reports/mechanics-<name>.md` — one section per mechanic: inputs, state, outputs, ordering, edge cases, and every tunable number.
2. `src/data.js` — the constants and tables, data-only.
3. `src/systems.js` — the rules, pure and testable; `src/game.js` — wiring, input, entities.
4. `src/ui.js` + `src/style.css` — only if the mechanic needs to be surfaced.
5. `tests/` — a unit test per rule, plus a browser test if the loop is visible.
6. `npm test`, then `npm run build:standalone` to refresh the offline HTML copy.
