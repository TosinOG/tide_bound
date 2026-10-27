# Handing over a reference build

How to get another game's build in front of the agent so its mechanics can be studied, and how that turns into code in this repo.

## 1. Best option: a link instead of an upload

The sandbox can reach **github.com, codeload.github.com, api.github.com, npm and PyPI** and nothing else. These were tested here, not assumed:

| Route | Works? | Detail |
|---|---|---|
| `git clone` / `git push` over github.com | **Yes** | any repo the authenticated account can see |
| Repo tarball/zip via codeload | **Yes** | `https://codeload.github.com/OWNER/REPO/tar.gz/refs/heads/main` |
| GitHub **Releases** download | **No** | assets are served from `release-assets.githubusercontent.com` → connection EOF |
| GitHub **Git LFS** | **No** | objects come from `media.githubusercontent.com` → blocked |
| `raw.githubusercontent.com`, gists | **No** | blocked |
| itch.io / GameJolt / Steam / GOG / any CDN | **No** | outside the allow-list |
| Page text of a hosted web game | Usually | the reader can fetch the page, then read the JS |
| A file on your own PC | Only small ones | see step 2 |

So for anything large the only working route is **a git repository**: files are committed, pushed to github.com, and cloned inside the sandbox. A repo is also the right place for a 100 MB reference build — it stays out of this project's history.

### The 100 MB problem

GitHub rejects any single file over **100 MiB** (it warns above 50 MiB). "About 100 MB" is right on that cliff, so pick one:

1. **Slim it first (preferred).** A shipped build is mostly textures, audio and video; the mechanics live in scripts, data tables and configs. A 100 MB build usually shrinks to 5–20 MB once assets are dropped — small enough to attach directly. See the commands in §2.
2. **Split it.** Raw byte-splitting is lossless and this tool rejoins the parts automatically:
   - 7-Zip → *Split to volumes* → `90M`, or macOS/Linux `split -b 90m game.zip game.zip.part-`
   - This repo's intake script globs `*.001`, `*.002`, … and `*.part-aa`, `*.part-ab`, … and concatenates them before unpacking.
3. **Trim the git history.** One commit, no history, keeps the clone small: `git init && git add -A && git commit -m ref && git push`.

If the game is a packed single blob (`data.win`, `*.pck`, a Unity `.assets` file), slimming will not help — those *are* the game. Split them instead.

## 2. If the file only exists on your machine

Attachment pickers usually filter by extension, not by magic bytes. Any of these work:

1. **Rename and attach** – `game.zip` → `game.zip.bin` (or `.dat`). The sandbox identifies it by content, and `unzip` opens it normally. Tell me the real name in the message.
2. **Attach the already-unpacked pieces** – if the build is loose files, attach the few that matter (scripts, data JSON, configs) rather than the whole tree.
3. **Push it to GitHub** – a private repo, one commit, then send the URL. Best for a build with thousands of files.
4. **Do not paste base64** – it bloats the conversation and loses the file.

### Trimming a build down to its logic

PowerShell (Windows):

```powershell
Expand-Archive game.zip -DestinationPath game
$keep = '*.js','*.mjs','*.json','*.cs','*.lua','*.gd','*.gml','*.py','*.rb','*.xml',
        '*.txt','*.cfg','*.ini','*.yaml','*.yml','*.ts','*.gd','*.yy','*.as','*.hx'
$out = New-Item -ItemType Directory -Force out
Get-ChildItem game -Recurse -File -Include $keep | ForEach-Object {
  Copy-Item $_.FullName (Join-Path $out ($_.FullName -replace '[\\/:]','_'))
}
Compress-Archive (Join-Path $out '*') game-slim.zip -Force
```

macOS / Linux:

```bash
unzip -q game.zip -d game
mkdir -p slim
find game -type f \( -name '*.js' -o -name '*.json' -o -name '*.cs' -o -name '*.lua' \
  -o -name '*.gd' -o -name '*.gml' -o -name '*.py' -o -name '*.rb' -o -name '*.xml' \
  -o -name '*.txt' -o -name '*.cfg' -o -name '*.ini' -o -name '*.yaml' -o -name '*.yml' \
  -o -name '*.ts' -o -name '*.as' -o -name '*.hx' \) -exec cp --parents {} slim/ \;
(cd slim && zip -qr ../game-slim.zip .)
du -sh game-slim.zip
```

Swap the keep-list for whatever the engine actually uses (§4): Godot also needs `.tscn`/`.tres`, RPG Maker needs `.json`, GameMaker needs `data.win` — and that one cannot be trimmed, because it *is* the game.

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
