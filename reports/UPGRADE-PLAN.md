# Tosin’s Tidebound — implementation ledger

## Constraints
Keep the existing vanilla ESM / Three.js / Vite architecture, controls, old save migration, scripts and offline deployment. No new runtime dependencies. Existing debug alias `window.tidebreak` and legacy standalone filename remain compatible.

## Inspection and baseline (before implementation)
- Read every handwritten source module, complete stylesheet, HTML, configs, package/lock roots, tests, packaging script, README and license. Checked bundled font/license provenance and checksums; generated bundles are outputs, not editable source.
- Existing unit suite: 16/16 passed.
- Existing browser suites: all 12 gameplay and 11 additional checks passed.
- Existing standalone suite: both offline/opaque-sandbox checks passed.
- Production build succeeded before changes.
- `profile-before.json`: identical seeded 960×600 Chromium/SwiftShader scenario used for the after profile. High: 456.93 mean draw calls, 536 geometries; Low: 458 calls, 542 geometries. Tool/ghost churn increased geometries 544 → 585.
- FPS is software-renderer-only evidence (~1.58 FPS baseline), not a hardware-GPU or low-end-PC guarantee.

## Incremental implementation
1. Pure-system safety: strict inventory transactions, support-aware connectivity/removal preview, atomic craft settlement, fixed-step clock, versioned save validation/migration, data-driven research/quests. Run old and new unit tests.
2. GPU/resource lifecycle and quality: bounded shared primitives/model templates, material batching, disposal ownership, scalable ocean/shadows/atmosphere, chunk/entity distance culling, adaptive quality, single-loop F3 monitor. Reprofile using the same test.
3. Integrate save snapshots/restored reservations and raft/player states; safe imports/backups; capped simulation; focus/context-loss recovery; highlighted hold-to-dismantle; station interruption safety.
4. Add finite biome POIs/resources, three research branches/raft upgrades, optional quest rewards, shark recovery/cooldown/target warnings. Preserve the original rescue route.
5. Rebrand all player-facing surfaces and project metadata, retain deployment compatibility, extend browser regressions, rebuild/verify offline deliverables, report actual results and limitations.

Results below are updated only after checks run; the final report is the authoritative delivery summary.

## Completed implementation and verification
- All five incremental stages above completed in the existing architecture, with no new runtime dependencies.
- Initial 37 safety tests, then 51 system/world tests, then final **56/56** tests passed as coverage expanded.
- Original 23 browser groups remain unchanged and passed again in the final run. New regressions passed **24/24** after fixing the real import/reset unload-autosave race.
- Regression fixtures initially exposed HUD cursor interception rather than an invalid support rule; fixture coordinates now verify that the canvas receives input. Precise F3 throttling is unit-tested; browser checks allow delayed paints under stalled software frames.
- Full final `npm run test:all`: exit 0, 233.542 s; 56 system tests + 47 browser groups + 2 standalone groups. Production JS 696.41 kB (gzip 192.95 kB); standalone 1,360,673 bytes with an identical legacy-name alias.
- `profile-after.json` records about 70% fewer draw calls and 91% fewer geometries. Low software FPS regressed in that capture; no hardware/low-end FPS guarantee is claimed. A compositor diagnostic did not justify removing visual filters, so that experiment was not retained.
- Warm GPU churn 55→55; rendered sailing roundtrip 55→max60→55; 120-crossing pure-system fixture bounded at nine chunks. These are limited regressions, not an hours-long soak or universal leak proof.
- Active jobs/import/V1/reset/corrupt-save handling use actual reloads; real X tap/hold and native context loss/restoration passed. Focus/tab tests are synthetic; physical gamepad/hardware GPU/non-Chromium remain unverified.
- Additional release smoke verified the manual anchor/helm transition and a real branded V2 JSON download with zero page errors.
- README/guide/report and root/source/offline artifacts refreshed. See `../UPGRADE-REPORT.md` for modified files, controls, exact results and limitations.

- Final visual review caught an incomplete-frame startup/resume maximum-FPS artifact. Reset intervals are now omitted, not clamped; added one unit and one actual Game-frame regression. The complete suite was rerun after the fix, then standalone/guide/report/source artifacts rebuilt.
