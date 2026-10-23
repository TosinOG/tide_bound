import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROMIUM_EXECUTABLE || undefined,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader', '--in-process-gpu', '--no-zygote'],
});
const errors = [];
const checks = [];
const check = (name, condition) => { assert.ok(condition, name); checks.push(name); console.log('PASS', name); };
const base = 'http://127.0.0.1:3000';
const gameReady = page => page.waitForFunction(() => window.tidebound?.ready && tidebound.started, null, { timeout: 60000 });
const menuReady = page => page.waitForFunction(() => window.tideboundApp?.menu && !tideboundApp.transitioning, null, { timeout: 60000 });

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  page.on('pageerror', error => { errors.push(error.stack); console.error(error); });
  page.on('console', message => { if (message.type() === 'error') { errors.push(message.text()); console.error(message.text()); } });
  await page.goto(base, { waitUntil: 'networkidle' });
  await menuReady(page);
  await page.waitForSelector('#menu-canvas');
  check('Menu boots first without constructing gameplay', await page.evaluate(() => !window.tidebound && !tideboundApp.game && document.querySelectorAll('#stage canvas').length === 1));
  check('Fresh profile disables Continue and preserves the real title/tagline', await page.locator('#continue-button').isDisabled() && await page.locator('#game-title').innerText() === 'TIDEBOUND\nGOLD' && (await page.locator('.menu-tagline').innerText()).includes('Chart the Unknown. Claim the Forgotten.'));
  await page.screenshot({ path: 'reports/gold2-menu-desktop.png', animations: 'disabled' });

  await page.locator('[data-menu-action="settings"]').click();
  await page.selectOption('[data-preference="quality"]', 'low');
  await page.locator('[data-preference="musicVolume"]').fill('0.37');
  await page.locator('[data-preference="mouseSensitivity"]').fill('1.35');
  const preferences = await page.evaluate(() => ({ stored: JSON.parse(localStorage.getItem('tidebound.settings.v1')), ratio: tideboundApp.menu.scene.renderer.getPixelRatio(), audio: tideboundApp.menu.audio.settings }));
  check('Menu settings persist and affect the real renderer/audio', preferences.stored.quality === 'low' && preferences.stored.musicVolume === .37 && preferences.stored.mouseSensitivity === 1.35 && preferences.ratio <= .75 && preferences.audio.musicVolume === .37);
  await page.screenshot({ path: 'reports/gold2-menu-settings.png', animations: 'disabled' });
  await page.keyboard.press('Escape');
  check('Escape closes a panel and restores main-menu focus', await page.locator('#menu-panel-overlay').isHidden() && await page.evaluate(() => document.activeElement?.dataset.menuAction === 'settings'));

  await page.locator('[data-menu-action="credits"]').click();
  check('Credits contain only the specified public developer/contact details', await page.locator('.credits-layout').innerText().then(text => text.includes('Tosin') && text.includes('tosingamer02@gmail.com') && text.includes('@alpha_r00t')) && await page.locator('#menu-panel a[href="mailto:tosingamer02@gmail.com"]').count() === 1 && await page.locator('#menu-panel a[href="https://www.instagram.com/alpha_r00t/"]').count() === 1);
  await page.locator('#menu-panel [data-menu-action="close"]').first().click();
  await page.locator('[data-menu-action="guide"]').click();
  check('How to Play documents eight real gameplay subjects and bindings', await page.locator('.menu-guide-grid article').count() === 8 && (await page.locator('#menu-panel').innerText()).includes('F3') && (await page.locator('#menu-panel').innerText()).includes('TAB'));
  await page.keyboard.press('Escape');

  await page.locator('[data-menu-action="play"]').click();
  check('Play on a fresh profile offers an explicit New Game choice', await page.locator('[data-menu-action="voyage-new"]').isVisible() && await page.evaluate(() => !window.tidebound));
  await page.locator('[data-menu-action="voyage-new"]').click();
  await gameReady(page);
  check('New Game constructs and starts the existing game after the cinematic transition', await page.evaluate(() => tidebound === tidebreak && tideboundApp.game === tidebound && !tideboundApp.menu && document.querySelectorAll('#stage canvas').length === 1 && tidebound.grid.blocks.size > 0));
  const firstSave = await page.evaluate(() => JSON.parse(localStorage.getItem('tidebound.save.v2')));
  check('New Game creates a valid V2 snapshot using the existing save system', firstSave.version === 2 && firstSave.world.generationVersion === 3);
  await page.evaluate(() => { tidebound.inventory.add('scrap', 7); tidebound.save(); });
  const expectedScrap = await page.evaluate(() => tidebound.inventory.count('scrap'));
  await page.keyboard.press('Escape');
  await page.locator('[data-action="main-menu"]').click();
  await menuReady(page);
  check('Pause → Main Menu saves, disposes gameplay, and enables Continue', await page.evaluate(() => !window.tidebound && !tideboundApp.game && document.querySelectorAll('#stage canvas').length === 1 && !document.querySelector('#continue-button').disabled));
  check('Returning to the menu retains modified inventory', await page.evaluate(expected => JSON.parse(localStorage.getItem('tidebound.save.v2')).inventory.scrap === expected, expectedScrap));

  await page.locator('#continue-button').click();
  await gameReady(page);
  check('Continue restores inventory through actual validation/load', await page.evaluate(expected => tidebound.inventory.count('scrap') === expected && tidebound.saved.version === 2, expectedScrap));
  await page.keyboard.press('Escape');
  await page.locator('[data-action="main-menu"]').click();
  await menuReady(page);
  await page.reload({ waitUntil: 'networkidle' });
  await menuReady(page);
  check('A reload also lands on the menu rather than starting survival behind it', await page.evaluate(() => !window.tidebound && !tideboundApp.game && !document.querySelector('#continue-button').disabled));
  await page.locator('[data-menu-action="play"]').click();
  await page.locator('#menu-panel [data-menu-action="new"]').click();
  check('New Game over an existing voyage requires a separate confirmation', await page.locator('[data-menu-action="voyage-new-confirmed"]').isVisible() && await page.evaluate(() => !window.tidebound));
  await page.locator('[data-menu-action="voyage-new-confirmed"]').click();
  await gameReady(page);
  check('Confirmed New Game retains a valid previous-save backup', await page.evaluate(expected => {
    const previous = JSON.parse(localStorage.getItem('tidebound.save.previous.v2'));
    return previous.inventory.scrap === expected && tidebound.inventory.count('scrap') !== expected;
  }, expectedScrap));
  await context.close();

  const invalidContext = await browser.newContext({ viewport: { width: 1100, height: 760 } });
  await invalidContext.addInitScript(() => { if (!sessionStorage.getItem('fixture-set')) { localStorage.setItem('tidebound.save.v2', '{broken'); sessionStorage.setItem('fixture-set', '1'); } });
  const invalid = await invalidContext.newPage();
  invalid.on('pageerror', error => errors.push(error.stack));
  await invalid.goto(base, { waitUntil: 'networkidle' });
  await menuReady(invalid);
  check('Unreadable saves show recovery without initializing a replacement world', await invalid.evaluate(() => !window.tidebound && tideboundApp.menu.saveStatus.error && localStorage.getItem('tidebound.save.v2') === '{broken'));
  await invalid.locator('#continue-button').click();
  check('Recovery gives a useful error and preserves the raw data', (await invalid.locator('#menu-panel').innerText()).includes('could not be read') && await invalid.evaluate(() => localStorage.getItem('tidebound.save.v2') === '{broken'));
  await invalid.locator('#menu-panel [data-menu-action="new"]').click();
  await invalid.locator('[data-menu-action="voyage-new-confirmed"]').click();
  await gameReady(invalid);
  check('Confirmed invalid-save replacement keeps an exact raw recovery copy', await invalid.evaluate(() => localStorage.getItem('tidebound.save.recovery.raw') === '{broken' && JSON.parse(localStorage.getItem('tidebound.save.v2')).version === 2));
  await invalidContext.close();

  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  const mobile = await mobileContext.newPage();
  mobile.on('pageerror', error => errors.push(error.stack));
  await mobile.goto(base, { waitUntil: 'networkidle' });
  await menuReady(mobile);
  await mobile.waitForTimeout(500);
  check('Portrait menu fits without horizontal overflow', await mobile.evaluate(() => document.documentElement.scrollWidth <= innerWidth && document.querySelector('.menu-play').getBoundingClientRect().width > 100));
  await mobile.screenshot({ path: 'reports/gold2-menu-mobile.png', animations: 'disabled' });
  await mobile.locator('[data-menu-action="guide"]').tap();
  check('Portrait guide remains scrollable and usable', await mobile.locator('#menu-panel').isVisible() && await mobile.evaluate(() => document.querySelector('#menu-panel').scrollHeight >= document.querySelector('#menu-panel').clientHeight));
  await mobile.screenshot({ path: 'reports/gold2-menu-mobile-guide.png', animations: 'disabled' });
  await mobileContext.close();

  check('No browser page errors or console errors during menu/save transitions', errors.length === 0);
  fs.writeFileSync('reports/gold2-menu-smoke.json', JSON.stringify({ passed: checks.length, checks, errors, environment: { browser: 'Chromium 153 / SwiftShader', desktop: '1440×900 DPR 1', mobile: '390×844 DPR 1' } }, null, 2));
  console.log(`ALL ${checks.length} MENU CHECKS PASSED`);
} catch (error) {
  fs.writeFileSync('reports/gold2-menu-smoke.json', JSON.stringify({ passed: checks.length, checks, errors: [...errors, error.stack], failed: true }, null, 2));
  console.error(error);
  process.exitCode = 1;
} finally {
  await browser.close();
}
