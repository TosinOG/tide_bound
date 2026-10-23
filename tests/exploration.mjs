import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROMIUM_EXECUTABLE || undefined,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader', '--in-process-gpu', '--no-zygote'],
});
const base = 'http://127.0.0.1:3000';
const errors = [], checks = [];
const check = (name, condition) => { assert.ok(condition, name); checks.push(name); console.log('PASS', name); };
const gameReady = page => page.waitForFunction(() => window.tidebound?.ready && tidebound.started, null, { timeout: 60000 });
const menuReady = page => page.waitForFunction(() => window.tideboundApp?.menu && !tideboundApp.transitioning, null, { timeout: 60000 });
const watch = page => {
  page.on('pageerror', error => { errors.push(error.stack); console.error(error); });
  page.on('console', message => { if (message.type() === 'error') { errors.push(message.text()); console.error(message.text()); } });
};
let activePage;
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await context.addInitScript(() => localStorage.setItem('tidebound.settings.v1', JSON.stringify({ quality: 'low', adaptiveQuality: false, pixelRatio: .75, volume: 0 })));
  const page = activePage = await context.newPage(); watch(page);
  await page.goto(base, { waitUntil: 'networkidle' }); await menuReady(page);
  await page.locator('[data-menu-action="play"]').click();
  await page.locator('[data-menu-action="voyage-new"]').click(); await gameReady(page);

  const setup = await page.evaluate(() => {
    const g = tidebound, island = g.world.islands.find(i => i.id === '0,-1') || g.world.islands.find(i => i.reefCache);
    if (!island?.reefCache) throw Error('No generated reef cache in the streamed islands');
    const cache = island.reefCache; g.keys.clear();
    g.player.position.set(cache.position.x, -.68, cache.position.z); g.player.velocity.set(0, -.01, 0);
    g.player.onRaft = false; g.player.grounded = false; g.player.swimming = false; g.player.diving = false;
    g.world.update(g.player.position); g.updatePlayer(1/60); g.ui.update();
    window.testReef = { island, cache };
    return { id: cache.id, y: cache.position.y, swimming: g.player.swimming, loot: cache.loot };
  });
  check('A real generated cache sits on a submerged shelf and the fixture starts swimming', setup.y < -.62 && setup.y > -2.6 && setup.swimming);
  await page.keyboard.press('f'); await page.waitForTimeout(150);
  check('Surface interaction cannot recover a dive-only cache', await page.evaluate(() => !testReef.cache.collected && !tidebound.ui.modal));
  const before = await page.evaluate(() => ({ coral: tidebound.inventory.count('coral'), scrap: tidebound.inventory.count('scrap'), rope: tidebound.inventory.count('rope'), fish: tidebound.inventory.count('cookedFish') }));
  await page.keyboard.press('c'); await page.waitForTimeout(800);
  const dive = await page.evaluate(async () => {
    const { waveHeight } = await import('/src/world.js'), g = tidebound, p = g.player;
    return { diving: p.diving, swimming: p.swimming, depth: waveHeight(p.position.x, p.position.z, g.simTime, g.ocean.uniforms.amplitude.value) - p.position.y, cameraDepth: waveHeight(g.camera.position.x, g.camera.position.z, g.simTime, g.ocean.uniforms.amplitude.value) - g.camera.position.y, wash: document.body.classList.contains('underwater'), status: !document.querySelector('#dive-status').classList.contains('hidden'), nearest: g.world.nearestResource(p.position, 2.4, p.diving)?.original.type };
  });
  check('C enters a bounded shallow dive with submerged camera, HUD and reef interaction context', dive.diving && dive.swimming && dive.depth > .75 && dive.depth < 2.2 && dive.cameraDepth > .05 && dive.wash && dive.status && dive.nearest === 'reefCache');
  await page.screenshot({ path: 'reports/gold2-reef-dive.png', animations: 'disabled' });
  await page.keyboard.press('f'); await page.waitForSelector('.lore-content');
  const recovered = await page.evaluate(() => ({ collected: testReef.cache.collected, reefs: tidebound.progress.reefs, coral: tidebound.inventory.count('coral'), scrap: tidebound.inventory.count('scrap'), rope: tidebound.inventory.count('rope'), notes: tidebound.notebook.length, title: tidebound.notebook.at(-1)?.title }));
  check('F recovers the existing-material loot and connected story exactly through gameplay events', recovered.collected && recovered.reefs === 1 && recovered.coral === before.coral + 1 && recovered.scrap === before.scrap + 2 && recovered.rope === before.rope + 1 && recovered.notes === 1 && recovered.title === 'Sunken keeper’s cache');
  await page.getByRole('button', { name: /Keep it in your journal/ }).click();
  await page.waitForFunction(() => tidebound.quests.completed.has('below-the-blue'), null, { timeout: 15000 });
  check('The optional reef quest completes and grants its existing cooked-fish reward', await page.evaluate(() => tidebound.quests.completed.has('below-the-blue')));
  check('Quest reward is applied once to the real inventory', await page.evaluate(fish => tidebound.inventory.count('cookedFish') === fish + 1, before.fish));
  const settled = await page.evaluate(() => ({ ...tidebound.inventory.counts }));
  await page.keyboard.press('f'); await page.waitForTimeout(350);
  check('A collected cache cannot be harvested again', await page.evaluate(() => testReef.cache.collected && tidebound.progress.reefs === 1 && !tidebound.ui.modal));
  check('Repeated interaction does not duplicate any inventory item', await page.evaluate(before => Object.entries(before).every(([id, count]) => tidebound.inventory.count(id) === count), settled));
  const savedRaw = await page.evaluate(() => { tidebound.save(); return localStorage.getItem('tidebound.save.v2'); });
  const saved = JSON.parse(savedRaw);
  check('The live V2 save contains additive diving, reef progress and collected-ID state', saved.version === 2 && saved.player.diving && saved.progress.reefs === 1 && saved.world.collected.includes(setup.id));

  await page.reload({ waitUntil: 'networkidle' }); await menuReady(page);
  await page.locator('#continue-button').click(); await gameReady(page); await page.waitForTimeout(400);
  check('Continue restores the dive and recovered cache without replaying loot', await page.evaluate(expected => {
    const g = tidebound, cache = g.world.islands.find(i => i.id === '0,-1')?.reefCache;
    return g.player.diving && g.player.swimming && g.progress.reefs === 1 && cache?.collected && Object.entries(expected).every(([id, count]) => g.inventory.count(id) === count);
  }, settled));
  await page.keyboard.press('c'); await page.waitForTimeout(500);
  check('C reliably returns to ordinary swimming and clears underwater presentation', await page.evaluate(() => !tidebound.player.diving && tidebound.player.swimming && !document.body.classList.contains('underwater')));
  await context.close();

  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  await mobileContext.addInitScript(raw => { localStorage.setItem('tidebound.save.v2', raw); localStorage.setItem('tidebound.settings.v1', JSON.stringify({ quality: 'low', adaptiveQuality: false, pixelRatio: .75, volume: 0 })); }, savedRaw);
  const mobile = activePage = await mobileContext.newPage(); watch(mobile);
  await mobile.goto(base, { waitUntil: 'networkidle' }); await menuReady(mobile); await mobile.locator('#continue-button').tap(); await gameReady(mobile); await mobile.waitForTimeout(400);
  check('Touch layout exposes a usable dive/surface button without horizontal overflow', await mobile.locator('[data-action="dive"]').isVisible() && await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await mobile.screenshot({ path: 'reports/gold2-reef-mobile.png', animations: 'disabled' });
  await mobile.locator('[data-action="dive"]').tap(); await mobile.waitForTimeout(400);
  check('The touch button performs the same real surface transition as C', await mobile.evaluate(() => !tidebound.player.diving && tidebound.player.swimming));
  await mobileContext.close();

  check('No browser page errors or console errors during diving, recovery, reload or touch', errors.length === 0);
  fs.writeFileSync('reports/gold2-exploration-smoke.json', JSON.stringify({ passed: checks.length, checks, errors, environment: { browser: 'Chromium 153 / SwiftShader', desktop: '1440×900 DPR 1', mobile: '390×844 DPR 1', note: 'Functional checks only; no hardware FPS claim.' } }, null, 2));
  console.log(`ALL ${checks.length} EXPLORATION CHECKS PASSED`);
} catch (error) {
  if (activePage && !activePage.isClosed()) await activePage.screenshot({ path: 'reports/gold2-exploration-failure.png', animations: 'disabled' }).catch(() => {});
  fs.writeFileSync('reports/gold2-exploration-smoke.json', JSON.stringify({ passed: checks.length, checks, errors: [...errors, error.stack], failed: true }, null, 2));
  console.error(error); process.exitCode = 1;
} finally { await browser.close(); }
