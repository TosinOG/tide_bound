# Uploading Tidebound Gold to itch.io

The file to upload is **`Tidebound-Gold-itch.zip`** (about 0.52 MB, 19 files).
It is already packaged the way itch.io expects — do not re-zip it, and do not add
a folder around it. `index.html` sits at the **root** of the archive.

---

## 1. Create the project

1. Go to <https://itch.io/game/new>.
2. **Title:** `Tidebound Gold`
3. **Project URL:** `tidebound-gold` (or your preference).
4. **Classification:** Game · **Kind of project:** HTML
5. **Pricing:** *No payments* is fine (you can enable donations later).

## 2. Upload the build

1. Under **Uploads**, click **Upload files** and choose `Tidebound-Gold-itch.zip`.
2. Once uploaded, tick **“This file will be played in the browser”**.
   *(This checkbox is what makes it an HTML5 game — the page will not play otherwise.)*
3. Leave the embed/viewport settings at their defaults, or use:
   - **Embed options:** `1280 × 720` (the game is fully responsive and will fill whatever size you give it)
   - **Mobile friendly:** ✅ on — touch controls are built in (portrait and landscape)
   - **Fullscreen button:** ✅ on

## 3. Page content (copy & paste)

**Short description / tagline**

> A little raft. An endless ocean. Gather, build, explore, and make yourself at sea.

**Description**

```
Tidebound Gold is a calm, single-player ocean survival adventure you can play in your browser.

You wake on a small raft with a salvage hook and a horizon. Pull wreckage from the water to build out
your home, keep yourself fed and watered, and sail toward islands that only appear once you get close.
Follow the keepers' coded route to the last light — or ignore it and just live out there for a while.

WHAT'S IN IT
• A connected, buildable raft — floors, walls, stairs, sails, workbenches, storage, an engine and paint
• 50+ buildable pieces across raft, workstation and decoration tabs
• A 13-branch research tree, meals with real buffs, farming, recycling and a trading post
• Procedurally generated islands, reefs to dive, sharks to fend off, weather that matters
• Three authored story shores with four-digit codes and a boss finale
• 23 Voyage Log achievements, difficulty presets, shareable world seeds
• First-person view, photo mode, layered audio, gamepad support
• Works on phones and tablets — touch controls in both orientations

No installation, no account, no downloads. Your voyage saves to your own device.

Made with Three.js. Everything — models, textures, sound — is generated in code.
```

**Genre:** Survival · **Tags:** `survival`, `ocean`, `crafting`, `exploration`, `3d`, `singleplayer`, `relaxing`, `procedural-generation`, `webgl`, `threejs`, `touch-friendly`

**Controls (worth putting on the page)**

```
WASD / arrows — move            Right-drag — look around
Space — jump                    Shift — run
Hold LEFT-CLICK — cast hook     G — take the helm
Tab — backpack & crafting       M — ocean chart
C — dive / surface              F — interact
V — first / third person        P — photo mode
B — voyage log                  Esc — pause
Touch screens: on-screen joystick + action buttons (portrait and landscape)
```

## 4. Why this package works on itch.io

itch.io hosts HTML5 uploads from a sub-directory (`html-classic.itch.zone/html/<id>/...`)
inside an iframe, which breaks three things that normal web builds rely on. All three are handled:

| itch.io constraint | How this build handles it |
|---|---|
| Root-absolute URLs (`/assets/…`) 404 when served from a sub-folder | Built with Vite `base: './'`, so every script, stylesheet and font reference is **relative**. Verified by serving the unzipped archive from `/html/9876543/` — all 11 resources returned 200. |
| `localStorage` can throw inside a sandboxed iframe | Save code catches it; the HUD shows *“EXPORT TO KEEP YOUR VOYAGE”* and the voyage still plays. Verified with storage deliberately throwing. |
| `requestFullscreen` / Font Loading API can be missing or blocked | Both are feature-detected and time-boxed; the game boots and the menu stays usable. |
| Whole game runs inside an iframe | Booted the packaged build in a sandboxed, sub-directory context: menu rendered, PLAY worked, the game created its canvas and HUD with **zero runtime errors**. |

Nothing in the package calls out to the network — fonts, art and audio are all local,
so it loads fast and works offline after the first visit.

## 5. Rebuilding the package

```bash
npm ci
npm run package:itch
```

That rebuilds `Tidebound-Gold-itch.zip` and re-runs the three checks automatically:
relative-path validation, zip layout (index.html at the root), and the
serve-from-a-sub-directory test.

## 6. Licences

The zip ships `licenses/` with the SIL OFL notices for Outfit, Fraunces and DM Mono,
plus Three.js's MIT notice. Keep that folder in the upload — it satisfies the font
and library licence requirements on a commercial storefront.
