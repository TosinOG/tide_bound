import { chromium as playwrightChromium } from '@playwright/test';
import assert from 'node:assert/strict';

const executablePath = process.env.CHROMIUM_EXECUTABLE || undefined;
const browser = await playwrightChromium.launch({
  headless: true,
  ...(executablePath ? { executablePath } : {}),
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader', '--in-process-gpu', '--no-zygote'],
});
const base = process.env.GAME_BASE_URL || 'http://127.0.0.1:3000';
const errors = [], checks = [];
const check = (name, result) => { assert.ok(result, name); checks.push(name); console.log('PASS', name); };
const watch = page => {
  page.on('pageerror', error => { errors.push(error.stack); console.error('PAGE ERROR', error.stack); });
  page.on('console', message => { if (message.type() === 'error') { errors.push(message.text()); console.error('CONSOLE ERROR', message.text()); } });
};
const readyMenu = page => page.waitForFunction(() => window.tideboundApp?.menu && !tideboundApp.transitioning, null, { timeout: 60000 });
const readyGame = page => page.waitForFunction(() => window.tidebound?.ready && tidebound.started && !tidebound.disposed, null, { timeout: 60000 });
async function startNewVoyage(page) {
  await page.goto(base, { waitUntil: 'networkidle' });
  await readyMenu(page);
  await page.locator('[data-menu-action="play"]').click();
  await page.locator('[data-menu-action="voyage-new"]').click();
  await readyGame(page);
  await page.waitForTimeout(500);
}

try {
  const desktop = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
  await desktop.addInitScript(() => localStorage.setItem('tidebound.settings.v1', JSON.stringify({ quality: 'low', adaptiveQuality: false, pixelRatio: .75, volume: 0 })));
  const page = await desktop.newPage(); watch(page);
  await page.goto(base, { waitUntil: 'networkidle' });
  await readyMenu(page);
  await page.locator('[data-menu-action="settings"]').click();
  await page.locator('[data-menu-action="controls"]').click();
  await page.locator('[data-keyboard-bind="moveRight"]').click();
  await page.keyboard.press('w');
  check('The main-menu rebinding editor warns about conflicts without silently stealing a key', await page.locator('.keyboard-conflict').count() === 1 && /Move forward/.test(await page.locator('.keyboard-conflict').innerText()));
  await page.locator('[data-keyboard-editor="cancel-conflict"]').click();
  check('Cancelling a conflict leaves the original right-movement binding intact', (await page.locator('[data-keyboard-bind="moveRight"]').innerText()).trim() === 'D');
  await page.locator('[data-keyboard-bind="moveRight"]').click();
  await page.keyboard.press('l');
  check('A new physical key can be captured for an actual gameplay action', (await page.locator('[data-keyboard-bind="moveRight"]').innerText()).trim() === 'L');
  await page.locator('[data-keyboard-editor="save"]').click();
  check('Saving from main-menu settings persists the independent keyboard profile', await page.evaluate(() => JSON.parse(localStorage.getItem('tidebound.controls.keyboard.v1')).bindings.moveRight[0] === 'KeyL') && /saved and applied/i.test(await page.locator('#menu-panel').innerText()));
  await startNewVoyage(page);
  check('Existing desktop voyage still starts with the original controller and no touch HUD', await page.evaluate(() => {
    const g = tidebound;
    return g.started && g.renderer.domElement.id === 'ocean-canvas' && g.world.islands.length > 0 && g.underwater.wreck.group.children.length > 18 && document.querySelector('#mobile-controls').hidden;
  }));

  const beforeMove = await page.evaluate(() => tidebound.raft.worldToLocal(tidebound.player.position.clone()).toArray());
  let movementClock = await page.evaluate(() => tidebound.simTime);
  await page.keyboard.down('d');
  await page.waitForFunction(start => tidebound.simTime >= start + .25, movementClock, { timeout: 15000 });
  await page.keyboard.up('d');
  const afterDefaultKey = await page.evaluate(() => tidebound.raft.worldToLocal(tidebound.player.position.clone()).toArray());
  movementClock = await page.evaluate(() => tidebound.simTime);
  await page.keyboard.down('l');
  await page.waitForFunction(start => tidebound.simTime >= start + .35, movementClock, { timeout: 15000 });
  await page.keyboard.up('l');
  const afterRemappedKey = await page.evaluate(() => tidebound.raft.worldToLocal(tidebound.player.position.clone()).toArray());
  const oldKeyMotion = Math.hypot(afterDefaultKey[0] - beforeMove[0], afterDefaultKey[2] - beforeMove[2]);
  const remappedMotion = Math.hypot(afterRemappedKey[0] - afterDefaultKey[0], afterRemappedKey[2] - afterDefaultKey[2]);
  check('Remapped desktop movement uses the captured key and no longer responds to the old key', oldKeyMotion < .12 && remappedMotion > .15);

  await page.keyboard.press('Escape');
  await page.locator('[data-action="settings"]').click();
  await page.locator('[data-action="controls"]').click();
  await page.locator('[data-keyboard-bind="jump"]').click();
  await page.keyboard.press('Escape');
  check('Escape cancels key capture without escaping the controls editor', await page.locator('#keyboard-controls-editor').count() === 1 && /Rebinding cancelled/.test(await page.locator('.keyboard-controls-status').innerText()));
  await page.locator('[data-keyboard-bind="zoomOut"]').click();
  await page.keyboard.press('i');
  check('In-game key capture suppresses gameplay shortcuts and reports the inventory conflict', await page.locator('.keyboard-conflict').count() === 1 && /Inventory & crafting/.test(await page.locator('.keyboard-conflict').innerText()) && await page.evaluate(() => tidebound.ui.modal === 'controls'));
  await page.locator('[data-keyboard-editor="cancel-conflict"]').click();
  await page.locator('[data-keyboard-editor="reset-all"]').click();
  await page.locator('[data-keyboard-editor="save"]').click();
  check('In-game reset restores and persists the complete default keyboard profile', await page.evaluate(() => JSON.parse(localStorage.getItem('tidebound.controls.keyboard.v1')).bindings.moveRight[0] === 'KeyD' && tidebound.inputBindings.actionForCode('KeyD') === 'moveRight'));
  await page.keyboard.press('Escape');

  const raftContacts = await page.evaluate(() => {
    const g = tidebound, p = g.player, V = p.position.constructor;
    p.position.copy(g.raft.localToWorld(new V(1.1, .27, -1)));
    p.velocity.set(0, 0, 0); p.onRaft = true; p.grounded = true; p.swimming = false; p.diving = false; p.surfacing = false;
    g.cameraYaw = 0; g.setActionDown('moveRight', true);
    for (let i = 0; i < 36; i++) g.updatePlayer(1 / 60);
    g.setActionDown('moveRight', false);
    const atWorkbenchSide = g.raft.worldToLocal(p.position.clone());
    p.position.copy(g.raft.localToWorld(new V(2, 1.27, -1)));
    p.velocity.set(0, -.3, 0); p.onRaft = false; p.grounded = false;
    for (let i = 0; i < 24; i++) g.updatePlayer(1 / 60);
    const onWorkbench = g.raft.worldToLocal(p.position.clone());
    p.position.copy(g.raft.localToWorld(new V(0, -1.25, 0)));
    p.velocity.set(0, 1, 0); p.onRaft = false; p.grounded = false; p.swimming = true; p.diving = true; p.surfacing = false;
    g.setActionDown('swimUp', true);
    for (let i = 0; i < 36; i++) g.updatePlayer(1 / 60);
    g.setActionDown('swimUp', false);
    const underDeck = g.raft.worldToLocal(p.position.clone()), foundation = g.raftCollisionCandidates(0, 0).find(c => c.blockType === 'foundation' && c.cx === 0 && c.cz === 0);
    return { stationSideX: atWorkbenchSide.x, stationTopY: onWorkbench.y, underDeckTop: underDeck.y + .92, foundationBottom: foundation.minY };
  });
  check('Raft collision keeps the player outside a workstation instead of clipping through it', raftContacts.stationSideX < 1.34);
  check('Walkable workstation surfaces support the player without falling through', Math.abs(raftContacts.stationTopY - 1.27) < .08);
  check('Swimming beneath a foundation stays below its underside collision face', raftContacts.underDeckTop <= raftContacts.foundationBottom + .015);

  const climbSetup = await page.evaluate(async () => {
    const { waveHeight } = await import('/src/world.js');
    const g=tidebound,p=g.player,V=p.position.constructor;
    const foundations=[...g.grid.blocks.values()].filter(block=>block.type==='foundation'&&block.y===0),outerX=Math.max(...foundations.map(block=>block.x));
    const edge=foundations.filter(block=>block.x===outerX&&!g.grid.at(block.x+1,0,block.z)&&!g.grid.at(block.x,1,block.z)).sort((a,b)=>Math.abs(a.z)-Math.abs(b.z))[0]||foundations[0];
    const side=g.raft.localToWorld(new V(edge.x+.86,0,edge.z));
    p.position.set(side.x,waveHeight(side.x,side.z,g.simTime,g.ocean.uniforms.amplitude.value)-1.05,side.z);
    p.velocity.set(0,0,0);p.onRaft=false;p.grounded=false;p.swimming=true;p.diving=false;p.surfacing=false;p.jumpCooldown=0;g.ui.update(true);
    return {sim:g.simTime,hint:document.querySelector('#action-prompt').textContent};
  });
  await page.keyboard.down('Space');
  await page.waitForFunction(start=>tidebound.simTime>=start+.12,climbSetup.sim,{timeout:10000});
  await page.keyboard.up('Space');
  const raftClimb=await page.evaluate(()=>{const p=tidebound.player,local=tidebound.raft.worldToLocal(p.position.clone()),support=tidebound.raftGround(p.position);return {onRaft:p.onRaft,swimming:p.swimming,grounded:p.grounded,localY:local.y,support:support?.block?.type||null,hint:document.querySelector('#action-prompt').textContent};});
  check('Space at the raft edge climbs the swimmer back onto a walkable deck',raftClimb.onRaft&&raftClimb.grounded&&!raftClimb.swimming&&!!raftClimb.support);
  check('Swimming HUD explains how to board the raft again',/climb back aboard/i.test(climbSetup.hint));

  await page.evaluate(async () => {
    const { waveHeight } = await import('/src/world.js');
    const g = tidebound, p = g.player;
    const candidates = [[180,0],[0,180],[-180,0],[0,-180],[150,100],[-150,100],[100,-150],[-100,-150]];
    const [x,z] = candidates.find(([x,z]) => Math.hypot(x-g.raft.position.x,z-g.raft.position.z)<220 && !g.world.groundAt(x,z) && g.underwater.floorAt(x,z)<-5) || candidates[0];
    p.position.set(x, waveHeight(x, z, g.simTime, g.ocean.uniforms.amplitude.value) - .68, z);
    p.velocity.set(0, 0, 0); p.onRaft = false; p.grounded = false; p.swimming = true; p.diving = false; p.surfacing = false;
    p.oxygen = g.underwater.oxygenCapacity(g.inventory); g.ui.update(true);
  });
  await page.waitForFunction(() => tidebound.player.swimming && !tidebound.player.diving, null, { timeout: 3000 });
  const simBeforeDive = await page.evaluate(() => tidebound.simTime);
  await page.keyboard.press('c');
  await page.waitForFunction(start => tidebound.simTime >= start + 1, simBeforeDive, { timeout: 20000 });
  await page.waitForFunction(() => !document.querySelector('#dive-status').classList.contains('hidden'), null, { timeout: 5000 });
  let dive = await page.evaluate(async () => {
    const { waveHeight } = await import('/src/world.js'), g = tidebound, p = g.player;
    return { diving: p.diving, swimming: p.swimming, depth: waveHeight(p.position.x, p.position.z, g.simTime, g.ocean.uniforms.amplitude.value) - p.position.y, oxygen: p.oxygen, oxygenVisible: !document.querySelector('#dive-status').classList.contains('hidden'), text: document.querySelector('#dive-status').textContent };
  });
  check('Keyboard C opens a real depth-controlled dive with a live oxygen meter', dive.diving && dive.swimming && dive.depth > .7 && dive.oxygen < 56 && dive.oxygenVisible && /OXYGEN/.test(dive.text));

  const yBeforeDown = await page.evaluate(() => tidebound.player.position.y);
  await page.keyboard.down('Control');
  await page.waitForFunction(() => tidebound.keys.has('control') && tidebound.player.velocity.y < -1.45, null, { timeout: 3000 });
  await page.waitForTimeout(350); await page.keyboard.up('Control');
  const yAfterDown = await page.evaluate(() => tidebound.player.position.y);
  check('Desktop Control input adds downward swimming thrust', yAfterDown < yBeforeDown - .2);
  const yBeforeUp = await page.evaluate(() => tidebound.player.position.y), upClock = await page.evaluate(() => tidebound.simTime);
  await page.keyboard.down('ArrowUp');
  await page.waitForFunction(() => tidebound.keys.has('arrowup'), null, { timeout: 3000 });
  await page.waitForFunction(start => tidebound.simTime >= start + .45, upClock, { timeout: 15000 });
  await page.keyboard.up('ArrowUp');
  const yAfterUp = await page.evaluate(() => tidebound.player.position.y);
  check('Desktop ArrowUp input provides independent upward swimming thrust', yAfterUp > yBeforeUp + .18);
  await page.keyboard.press('c'); await page.waitForFunction(() => !tidebound.player.diving && !tidebound.player.surfacing, null, { timeout: 12000 });
  const surfaceOxygen=await page.evaluate(()=>{tidebound.player.oxygen=Math.min(tidebound.player.oxygen,40);return tidebound.player.oxygen;}),surfaceSimTime=await page.evaluate(()=>tidebound.simTime);
  check('C performs a sustained return to the waterline rather than a shallow hop', await page.evaluate(() => tidebound.player.swimming && !tidebound.player.diving && tidebound.player.oxygen > 0));
  await page.waitForFunction(start=>tidebound.simTime>=start+.45,surfaceSimTime,{timeout:15000});
  check('Oxygen reserve recovers after reaching the surface',await page.evaluate(oxygen=>tidebound.player.oxygen>oxygen+.2,surfaceOxygen));

  const firstLoot = await page.evaluate(() => {
    const g = tidebound, p = g.player, key = g.underwater.wreck.key;
    p.position.copy(key.position); p.velocity.set(0, 0, 0); p.onRaft = false; p.grounded = false; p.swimming = true; p.diving = true; p.surfacing = false;
    p.oxygen = Math.max(30, p.oxygen); g.ui.update(true);
    return { keyId: key.id, beforeTank: g.inventory.count('oxygenTank'), beforeFins: g.inventory.count('divingFins') };
  });
  await page.waitForFunction(() => tidebound.underwater.nearby.some(resource => resource.id === 'wreck:brass-key'), null, { timeout: 5000 });
  await page.keyboard.press('f');
  await page.waitForFunction(id => tidebound.world.collected.has(id), firstLoot.keyId, { timeout: 5000 });
  check('A nearby dive-only wreck key is a real one-time interaction', await page.evaluate(id => tidebound.world.collected.has(id), firstLoot.keyId));
  await page.evaluate(() => {
    const g = tidebound, p = g.player, locker = g.underwater.wreck.cache;
    p.position.copy(locker.position); p.velocity.set(0, 0, 0); p.onRaft = false; p.grounded = false; p.swimming = true; p.diving = true; p.surfacing = false; p.oxygen = Math.max(25, p.oxygen);
  });
  await page.waitForFunction(() => tidebound.underwater.nearby.some(resource => resource.id === 'wreck:sealed-locker'), null, { timeout: 5000 });
  await page.keyboard.press('f'); await page.waitForSelector('.lore-content', { timeout: 5000 });
  const recovered = await page.evaluate(() => ({
    hasTank: tidebound.inventory.count('oxygenTank'), hasFins: tidebound.inventory.count('divingFins'), capacity:tidebound.underwater.oxygenCapacity(tidebound.inventory),
    wrecks: tidebound.progress.wrecks, reefs: tidebound.progress.reefs, key: tidebound.world.collected.has('wreck:brass-key'),
    locker: tidebound.world.collected.has('wreck:sealed-locker'), note: tidebound.notebook.at(-1)?.title,
  }));
  check('Brass key opens the Lanternwake locker and grants persistent oxygen/fins equipment', recovered.hasTank === firstLoot.beforeTank + 1 && recovered.hasFins === firstLoot.beforeFins + 1 && recovered.capacity === 100 && recovered.wrecks === 1 && recovered.reefs === 1 && recovered.key && recovered.locker && recovered.note === 'Keeper’s sealed locker');
  await page.locator('.lore-content [data-action="close"]').click();
  await page.waitForFunction(() => !tidebound.paused, null, { timeout: 5000 });
  const beforeJournal = await page.evaluate(() => tidebound.progress.journals);
  await page.evaluate(() => {
    const g = tidebound, p = g.player, journal = g.underwater.wreck.journal;
    p.position.copy(journal.position); p.velocity.set(0, 0, 0); p.swimming = true; p.diving = true; p.surfacing = false; p.onRaft = false; p.grounded = false;
  });
  await page.waitForTimeout(150); await page.keyboard.press('f'); await page.waitForSelector('.lore-content', { timeout: 5000 });
  check('The wreck captain’s log is a second finite collectible story', await page.evaluate(n => tidebound.progress.journals === n + 1 && tidebound.world.collected.has('wreck:captains-log'), beforeJournal));
  await page.locator('.lore-content [data-action="close"]').click();
  await page.waitForFunction(() => !tidebound.paused, null, { timeout: 5000 });
  const savedRaw = await page.evaluate(() => { tidebound.save(); return localStorage.getItem('tidebound.save.v2'); });
  const saved = JSON.parse(savedRaw);
  check('Version 2 save keeps new ocean IDs, oxygen, wreck progress and equipment without schema replacement', saved.version === 2 && saved.player.oxygen <= 124 && saved.progress.wrecks === 1 && ['wreck:brass-key', 'wreck:sealed-locker', 'wreck:captains-log'].every(id => saved.world.collected.includes(id)) && saved.inventory.oxygenTank === (recovered.hasTank ? 1 : 0));
  await page.reload({ waitUntil: 'networkidle' }); await readyMenu(page);
  await page.locator('#continue-button').click(); await readyGame(page); await page.waitForTimeout(400);
  const restoredState=await page.evaluate(()=>({oxygen:tidebound.player.oxygen,tank:tidebound.inventory.count('oxygenTank'),fins:tidebound.inventory.count('divingFins'),wrecks:tidebound.progress.wrecks,collected:[...tidebound.world.collected].filter(id=>id.startsWith('wreck:')),loaded:tidebound.saved?.player}));
  check('Continue restores oxygen, equipment, wreck story and exactly-once collection state', Math.abs(restoredState.oxygen-saved.player.oxygen)<1 && restoredState.tank===saved.inventory.oxygenTank && restoredState.fins===saved.inventory.divingFins && restoredState.wrecks===1 && restoredState.collected.includes('wreck:sealed-locker') && restoredState.collected.includes('wreck:captains-log'));
  await desktop.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, screen: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  await mobile.addInitScript(() => localStorage.setItem('tidebound.settings.v1', JSON.stringify({ quality: 'low', adaptiveQuality: false, pixelRatio: .75, volume: 0 })));
  const phone = await mobile.newPage(); watch(phone);
  await startNewVoyage(phone);
  await phone.waitForFunction(() => tidebound.ui.mobileControls.isTouch && !document.querySelector('#mobile-controls').hidden, null, { timeout: 10000 });
  check('Touch-first play exposes 17 usable controls while desktop layouts remain untouched', await phone.evaluate(() => tidebound.ui.mobileControls.elements.size === 17 && document.querySelector('[data-mobile-id="move"]') && document.querySelector('[data-mobile-id="look"]') && document.documentElement.scrollWidth <= innerWidth));

  const moveAndLook = await phone.evaluate(() => {
    const g=tidebound, ids=['move','look'];
    return Object.fromEntries(ids.map(id=>{const r=g.ui.mobileControls.elements.get(id).getBoundingClientRect();return[id,{x:r.left+r.width/2,y:r.top+r.height/2}];}));
  });
  const cdp = await mobile.newCDPSession(phone);
  const points = [
    { id: 17, x: moveAndLook.move.x, y: moveAndLook.move.y, radiusX: 4, radiusY: 4, force: 1 },
    { id: 29, x: moveAndLook.look.x, y: moveAndLook.look.y, radiusX: 4, radiusY: 4, force: 1 },
  ];
  const yawBefore = await phone.evaluate(() => tidebound.cameraYaw);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: points });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [
    { ...points[0], x: points[0].x + 28, y: points[0].y - 4 },
    { ...points[1], x: points[1].x - 30, y: points[1].y + 3 },
  ] });
  await phone.waitForTimeout(250);
  const simultaneous = await phone.evaluate(() => ({ move: { ...tidebound.touchMove }, yaw: tidebound.cameraYaw, pointers: tidebound.ui.mobileControls.pointerStates.size }));
  check('Two simultaneous touch pointers independently move and rotate the camera', Math.abs(simultaneous.move.x) > .2 && Math.abs(simultaneous.yaw - yawBefore) > .04 && simultaneous.pointers === 2);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await phone.waitForTimeout(120);
  check('Both joysticks release cleanly without leaving movement input stuck', await phone.evaluate(() => tidebound.touchMove.x === 0 && tidebound.touchMove.y === 0 && tidebound.ui.mobileControls.pointerStates.size === 0));

  const mobileClimbSetup=await phone.evaluate(async()=>{
    const {waveHeight}=await import('/src/world.js'),g=tidebound,p=g.player,V=p.position.constructor;
    const foundations=[...g.grid.blocks.values()].filter(block=>block.type==='foundation'&&block.y===0),outerX=Math.max(...foundations.map(block=>block.x));
    const edge=foundations.filter(block=>block.x===outerX&&!g.grid.at(block.x+1,0,block.z)&&!g.grid.at(block.x,1,block.z)).sort((a,b)=>Math.abs(a.z)-Math.abs(b.z))[0]||foundations[0];
    const side=g.raft.localToWorld(new V(edge.x+.86,0,edge.z));p.position.set(side.x,waveHeight(side.x,side.z,g.simTime,g.ocean.uniforms.amplitude.value)-1.05,side.z);
    p.velocity.set(0,0,0);p.onRaft=false;p.grounded=false;p.swimming=true;p.diving=false;p.surfacing=false;p.jumpCooldown=0;g.ui.update(true);return g.simTime;
  });
  await phone.waitForFunction(()=>!document.querySelector('[data-mobile-id="jump"]').hidden,null,{timeout:5000});
  const jumpBox=await phone.locator('[data-mobile-id="jump"]').boundingBox(),jumpTouch={id:37,x:jumpBox.x+jumpBox.width/2,y:jumpBox.y+jumpBox.height/2,radiusX:5,radiusY:5,force:1};
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[jumpTouch]});
  await phone.waitForFunction(start=>tidebound.simTime>=start+.12,mobileClimbSetup,{timeout:10000});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await phone.waitForFunction(()=>tidebound.player.onRaft&&!tidebound.player.swimming,null,{timeout:3000});
  check('Mobile jump control also climbs the swimmer back onto the raft',await phone.evaluate(()=>tidebound.player.onRaft&&!tidebound.player.swimming&&tidebound.player.grounded));

  await phone.evaluate(async () => {
    const { waveHeight } = await import('/src/world.js'),g=tidebound,p=g.player;
    const candidates=[[180,0],[0,180],[-180,0],[0,-180],[150,100],[-150,100],[100,-150],[-100,-150]];
    const [x,z]=candidates.find(([x,z])=>Math.hypot(x-g.raft.position.x,z-g.raft.position.z)<220&&!g.world.groundAt(x,z)&&g.underwater.floorAt(x,z)<-5)||candidates[0];
    p.position.set(x,waveHeight(x,z,g.simTime,g.ocean.uniforms.amplitude.value)-.68,z);p.velocity.set(0,0,0);p.onRaft=false;p.grounded=false;p.swimming=true;p.diving=false;p.surfacing=false;g.ui.update(true);
  });
  await phone.waitForFunction(()=>tidebound.player.swimming&&!tidebound.player.diving,null,{timeout:3000});
  const diveButton = phone.locator('[data-mobile-id="dive"]');
  await phone.waitForFunction(()=>tidebound.player.swimming&&!tidebound.player.diving&&!document.querySelector('[data-mobile-id="dive"]').hidden,null,{timeout:5000});
  const mobileSimBeforeDive=await phone.evaluate(()=>tidebound.simTime);
  await diveButton.tap();
  await phone.waitForFunction(()=>tidebound.player.diving,null,{timeout:5000});
  await phone.waitForFunction(start=>tidebound.simTime>=start+.55,mobileSimBeforeDive,{timeout:20000});
  const mobileDive=await phone.evaluate(()=>({diving:tidebound.player.diving,swimming:tidebound.player.swimming,oxygen:tidebound.player.oxygen,status:document.querySelector('#dive-status').textContent,hidden:document.querySelector('#dive-status').classList.contains('hidden'),paused:tidebound.paused,modal:tidebound.ui.modal,simTime:tidebound.simTime,capacity:tidebound.underwater.oxygenCapacity(tidebound.inventory),waterline:tidebound.player.position.y,uiDisposed:tidebound.ui.disposed,statsTimer:tidebound.statsTimer,frame:tidebound.frameCount,documentHidden:document.hidden}));
  check('Touch dive button enters the same oxygen-metered water volume',mobileDive.diving&&mobileDive.swimming&&mobileDive.capacity===56&&/OXYGEN/.test(mobileDive.status)&&!mobileDive.hidden);

  await phone.locator('[data-mobile-id="pause"]').tap();
  await phone.waitForFunction(() => tidebound.ui.modal === 'pause', null, { timeout: 5000 });
  await phone.locator('#modal-panel [data-action="settings"]').click();
  await phone.locator('#modal-panel [data-action="mobile-layout"]').click();
  await phone.waitForSelector('#control-editor-stage');
  check('The mobile HUD editor exposes a free-position stage, every control and per-control inspector', await phone.evaluate(() => document.querySelectorAll('[data-editor-control]').length === 17 && document.querySelector('[data-editor-field="x"]') && document.querySelector('[data-editor-field="scale"]') && document.querySelector('[data-editor-field="opacity"]')));
  const stage = await phone.locator('#control-editor-stage').boundingBox();
  const moveItem = await phone.locator('[data-editor-control="move"]').boundingBox();
  await phone.mouse.move(moveItem.x + moveItem.width/2, moveItem.y + moveItem.height/2);
  await phone.mouse.down(); await phone.mouse.move(moveItem.x + moveItem.width/2 + 38, moveItem.y + moveItem.height/2 + 19, { steps: 5 }); await phone.mouse.up();
  await phone.evaluate(() => {
    const input=document.querySelector('[data-editor-field="scale"]');input.value='1.3';input.dispatchEvent(new Event('input',{bubbles:true}));
    const journal=document.querySelector('[data-editor-control="journal"]');journal.click();
    const visible=document.querySelector('[data-editor-field="visible"]');visible.checked=false;visible.dispatchEvent(new Event('input',{bubbles:true}));
  });
  const saveLayout = await phone.evaluate(() => {
    const stage=document.querySelector('#control-editor-stage').getBoundingClientRect(),item=document.querySelector('[data-editor-control="move"]');
    return {x:(parseFloat(item.style.left)||0)/100,y:(parseFloat(item.style.top)||0)/100,width:stage.width,controls:document.querySelectorAll('[data-editor-control]').length};
  });
  await phone.locator('[data-editor-action="save"]').click();
  const persisted = await phone.evaluate(() => JSON.parse(localStorage.getItem('tidebound.mobile-controls.v1')));
  check('Dragging, resizing, visibility and local persistence update normalized mobile layout data', persisted.version===1 && persisted.controls.move.x>0.16 && persisted.controls.move.scale===1.3 && persisted.controls.journal.visible===false && saveLayout.controls===17);
  check('The applied control uses the saved normalized position and scaled hit area', await phone.evaluate(data => {
    const move=document.querySelector('[data-mobile-id="move"]');
    return Math.abs(parseFloat(move.style.left)/100-data.controls.move.x)<.001 && Math.abs(Number(move.style.getPropertyValue('--control-scale'))-data.controls.move.scale)<.001;
  }, persisted));
  await phone.evaluate(()=>tidebound.save());
  await phone.reload({ waitUntil: 'networkidle' }); await readyMenu(phone);
  await phone.locator('#continue-button').click(); await readyGame(phone);
  await phone.waitForFunction(()=>tidebound.ui.mobileControls.active,null,{timeout:10000});
  check('Custom positions, resizing and hidden controls restore after a game reload', await phone.evaluate(data => {
    const c=tidebound.ui.mobileControls.layout.controls,move=document.querySelector('[data-mobile-id="move"]');
    return Math.abs(c.move.x-data.controls.move.x)<.001 && c.move.scale===data.controls.move.scale && c.journal.visible===false && Math.abs(parseFloat(move.style.left)/100-data.controls.move.x)<.001;
  },persisted));

  await phone.locator('[data-mobile-id="pause"]').tap();
  await phone.waitForFunction(() => tidebound.ui.modal === 'pause', null, { timeout: 5000 });
  await phone.locator('#modal-panel [data-action="settings"]').click();
  await phone.locator('#modal-panel [data-action="mobile-layout"]').click();
  await phone.locator('[data-editor-field="x"]').evaluate(input=>{input.value='.6';input.dispatchEvent(new Event('input',{bubbles:true}));});
  await phone.locator('[data-editor-action="restore"]').click();
  check('Restore last saved discards unsaved editor changes without touching the saved layout', await phone.evaluate(x=>Math.abs(tidebound.ui.mobileControls.editorDraft.controls.move.x-x)<.001,persisted.controls.move.x));
  await phone.locator('[data-editor-action="reset"]').click();
  const resetX=await phone.evaluate(()=>JSON.parse(localStorage.getItem('tidebound.mobile-controls.v1')).controls.move.x);
  const draftX=await phone.evaluate(()=>tidebound.ui.mobileControls.editorDraft.controls.move.x);
  check('Reset control layout restores the documented defaults in the editor draft', draftX===.13 && resetX===persisted.controls.move.x);
  await phone.locator('[data-editor-action="save"]').click();
  const resetLayout=await phone.evaluate(()=>JSON.parse(localStorage.getItem('tidebound.mobile-controls.v1')));
  check('Saving a reset layout persists default positions and restores all touch targets', resetLayout.controls.move.x===.13 && resetLayout.controls.journal.visible===true);
  await phone.reload({ waitUntil: 'networkidle' }); await readyMenu(phone);
  await phone.locator('#continue-button').click(); await readyGame(phone);
  await phone.waitForFunction(()=>tidebound.ui.mobileControls.active,null,{timeout:10000});
  check('Saved mobile layout restores after a browser reload independently of the V2 voyage save', await phone.evaluate(()=>tidebound.ui.mobileControls.layout.controls.move.x===.13 && tidebound.ui.mobileControls.layout.controls.journal.visible===true && !document.querySelector('#mobile-controls').hidden));
  await mobile.close();

  check('No browser or renderer errors during desktop, underwater, save/reload and mobile control flows', errors.length===0);
  console.log(`ALL ${checks.length} RUNNING-GAME CHECKS PASSED`);
} catch (error) {
  console.error('FAILED AFTER', checks.length, 'CHECKS');
  console.error(error);
  process.exitCode = 1;
} finally {
  await browser.close();
}
