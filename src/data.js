// Data-only definitions: edit these without changing the game systems.
export const META = Object.freeze({ title: "Tidebound Gold", version: '1.2.0', saveVersion: 2 });
export const ITEMS = {
  wood: { name: 'Driftwood', icon: 'wood', color: '#b78351', description: 'Sun-bleached timber. The beginning of a home.', stack: 99 },
  plastic: { name: 'Plastic', icon: 'plastic', color: '#80bbba', description: 'A little ocean waste, a lot of possibility.', stack: 99 },
  leaf: { name: 'Palm leaf', icon: 'leaf', color: '#86a361', description: 'Weave into rope, sails, and shelter.', stack: 99 },
  scrap: { name: 'Scrap metal', icon: 'scrap', color: '#a6aaa7', description: 'Weathered metal from another life.', stack: 99 },
  rope: { name: 'Rope', icon: 'rope', color: '#d4ba82', description: 'Twisted palm fibers. Holds things together.', stack: 99 },
  vine: { name: 'Wild vine', icon: 'vine', color: '#75925e', description: 'Research this island plant to unlock collection nets.', stack: 99, research: 'net' },
  copper: { name: 'Copper ore', icon: 'ore', color: '#b57b5c', description: 'Found on islands. Research it to unlock a signal beacon.', stack: 99, research: 'beacon' },
  signal: { name: 'Signal fragment', icon: 'signal', color: '#dfb85d', description: 'A salvaged radio component. Find three to call for rescue.', stack: 3 },
  resin: { name: 'Palm resin', icon: 'leaf', color: '#cda365', description: 'A palm-cay discovery. Study it after vines for rain collection and hearty meals.', stack: 99, research: 'rainCollector' },
  coral: { name: 'Sea glass coral', icon: 'ore', color: '#b4cfc3', description: 'Reef-hardened material. Study it after copper for protective raft plating.', stack: 99, research: 'armor' },
  relic: { name: 'Navigator’s lens', icon: 'compass', color: '#cba96d', description: 'A rare outpost instrument. Study it after copper for a windcatcher.', stack: 99, research: 'windcatcher' },
  heartyMeal: { name: 'Island stew', icon: 'cookedFish', color: '#d1a16c', description: '+45 hunger, +15 thirst. Fish and coconut, made to go a little further.', hunger: 45, thirst: 15, stack: 20, consumable: true },
  hook: { name: 'Salvage hook', icon: 'hook', color: '#d8bc7a', description: 'Hold to charge. Release to cast. Click again to reel in.', stack: 1, tool: true },
  hammer: { name: 'Building hammer', icon: 'hammer', color: '#b58b61', description: 'Select a structure, point at your raft, and build.', stack: 1, tool: true },
  spear: { name: 'Wooden spear', icon: 'spear', color: '#b89c71', description: 'Repel the shark during its charge. Also a good fishing companion.', stack: 1, tool: true },
  fishingRod: { name: 'Fishing rod', icon: 'fishing', color: '#b3946d', description: 'Cast into the sea. When the float dips, click to catch a fish.', stack: 1, tool: true },
  paddle: { name: 'Paddle', icon: 'paddle', color: '#ad7d4f', description: 'Click the ocean to paddle in that direction. G: take the helm.', stack: 1, tool: true },
  rawFish: { name: 'Raw fish', icon: 'fish', color: '#92b5bb', description: '+10 hunger, −5 health. Better cooked over a fire.', hunger: 10, health: -5, stack: 20, consumable: true },
  cookedFish: { name: 'Grilled fish', icon: 'cookedFish', color: '#d78d5d', description: '+30 hunger. A little comfort, a long way from land.', hunger: 30, stack: 20, consumable: true },
  water: { name: 'Fresh water', icon: 'water', color: '#75bfc9', description: '+40 thirst. Purify seawater or collect it during rain.', thirst: 40, stack: 20, consumable: true },
  coconut: { name: 'Coconut', icon: 'coconut', color: '#aa8461', description: '+15 hunger, +15 thirst. Found beneath island palms.', hunger: 15, thirst: 15, stack: 20, consumable: true },
  seaweed: { name: 'Tide kelp', icon: 'leaf', color: '#77a779', description: 'A useful, flexible kelp gathered from the submerged shelves.', stack: 99 },
  shell: { name: 'Seashell', icon: 'shell', color: '#c9a78b', description: 'A sturdy shell, smoothed by the current. Useful for diving gear.', stack: 99 },
  ironOre: { name: 'Seabed iron', icon: 'ore', color: '#89948f', description: 'Iron-rich nodules found on the deeper seabed.', stack: 99 },
  pearl: { name: 'Pearl oyster', icon: 'pearl', color: '#ece1ca', description: 'A rare pearl from the dark shelves. Study it at a workbench to understand pressure gear.', stack: 99, research: 'pearl' },
  deepCrystal: { name: 'Abyss crystal', icon: 'crystal', color: '#69c9d0', description: 'A luminous pressure-stabilizer from the deepest shelves, used to craft extra oxygen tanks.', stack: 99 },
  oxygenTank: { name: 'Pressure-rated oxygen tank', icon: 'water', color: '#82c3c3', description: 'Passive dive equipment. Adds 44 seconds of breathing reserve; tanks are capped at 124 seconds.', stack: 4 },
  divingFins: { name: 'Brass diving fins', icon: 'paddle', color: '#c4a46d', description: 'Passive dive equipment. Improves underwater swimming speed by 35%.', stack: 1 },
};

export const BLOCKS = {
  foundation: { name: 'Foundation', icon: 'foundation', description: 'One square meter of solid ground. Expands your home.', cost: { wood: 2, plastic: 1 }, hp: 100, buoyant: true, wooden: true, mass: 22 },
  floor: { name: 'Upper floor', icon: 'floor', description: 'A new level. Requires a wall or stairs underneath.', cost: { wood: 3 }, hp: 80, wooden: true, mass: 12 },
  wall: { name: 'Wooden wall', icon: 'wall', description: 'A little shelter from the open sea. Supports a floor above.', cost: { wood: 3, leaf: 2 }, hp: 80, wooden: true, mass: 10 },
  stairs: { name: 'Stairs', icon: 'stairs', description: 'Build up, not just out. Connects the next level.', cost: { wood: 4, rope: 1 }, hp: 100, wooden: true, mass: 18 },
  workbench: { name: 'Workbench', icon: 'workbench', description: 'The heart of your workshop. Craft within four meters.', cost: { wood: 6, scrap: 2 }, hp: 120, wooden: true, station: true, mass: 20 },
  purifier: { name: 'Water purifier', icon: 'purifier', description: 'F: start purifying seawater. Uses one piece of driftwood.', cost: { wood: 4, plastic: 4 }, hp: 100, wooden: true, station: true, mass: 14 },
  grill: { name: 'Small grill', icon: 'grill', description: 'F: cook raw fish with one piece of driftwood.', cost: { wood: 4, scrap: 3 }, hp: 100, wooden: true, station: true, mass: 16 },
  net: { name: 'Collection net', icon: 'net', description: 'Automatically catches nearby floating salvage. Research a vine first.', cost: { wood: 3, rope: 3 }, hp: 70, wooden: true, buoyant: true, research: 'vine', mass: 10 },
  sail: { name: 'Sail', icon: 'sail', description: 'F: unfurl the canvas and let the trade winds carry you.', cost: { wood: 5, leaf: 8, rope: 2 }, hp: 100, wooden: true, station: true, mass: 25 },
  rainCollector: { name: 'Rain collector', icon: 'purifier', description: 'Automatically collects one fresh water every 35 seconds of rain. No fuel; pauses when your water reserve reaches 30.', cost: { wood: 4, plastic: 3, rope: 1 }, hp: 100, wooden: true, station: true, research: 'resin', mass: 12 },
  armor: { name: 'Raft plating', icon: 'foundation', description: 'Build over a foundation. Halves shark damage to that foundation and protects it from reef scrapes.', cost: { wood: 2, scrap: 3, coral: 1 }, hp: 140, research: 'coral', mass: 24 },
  windcatcher: { name: 'Windcatcher', icon: 'compass', description: 'An outpost instrument that improves manual sailing and charted courses by 20%. One is enough.', cost: { wood: 4, rope: 2, copper: 2, relic: 1 }, hp: 100, wooden: true, station: true, research: 'relic', mass: 16 },
  beacon: { name: 'Signal beacon', icon: 'beacon', description: 'Your way home. Three signal fragments, one clear frequency.', cost: { wood: 6, scrap: 8, copper: 3, signal: 3 }, hp: 150, station: true, research: 'copper', mass: 20 },
};

// A research discovery is documented, not consumed. Prerequisites create useful branches.
export const RESEARCH = {
  vine: { title: 'A better way to gather', unlock: 'net', requires: [], description: 'Strong fibers become collection nets: more time exploring, less time chasing driftwood.' },
  copper: { title: 'A voice across the water', unlock: 'beacon', requires: [], description: 'Copper carries a current. Three island signal fragments can become your way home.' },
  resin: { title: 'Provisioned by the palms', unlock: 'rainCollector', requires: ['vine'], description: 'Waterproof lashings unlock automatic rain collection and nourishing island stew.' },
  coral: { title: 'A home with stronger edges', unlock: 'armor', requires: ['copper'], description: 'Reef-hardened plates halve shark bites and stop reef scraping on the foundation below.' },
  relic: { title: 'Read the trade winds', unlock: 'windcatcher', requires: ['copper'], description: 'An old navigator’s lens unlocks a windcatcher: 20% faster helming and charted sailing.' },
  pearl: { title: 'A breath beyond the surface', unlock: 'oxygenTank', requires: [], description: 'Study a deep-water pearl at your workbench. The pressure-rated tank and fitted fins turn short reef dips into real underwater expeditions.' },
};

export const QUEST_CHAPTERS = [
  { title: 'A place to begin', description: 'Big things start with small discoveries.' },
  { title: 'Beyond the horizon', description: 'There is more out here than open water.' },
  { title: 'Someone is listening', description: 'A little courage travels a long way.' },
];
export const QUESTS = [
  { id: 'salvage', chapter: 0, title: 'Bring in floating salvage', counter: 'salvaged', target: 4, tip: 'Hold & release your hook near debris', reward: { wood: 2 } },
  { id: 'expand', chapter: 0, title: 'Give your raft room to grow', counter: 'built', target: 1, tip: 'Select the hammer · build on an edge', reward: { plastic: 1 } },
  { id: 'water', chapter: 0, title: 'Make a little fresh water', counter: 'water', target: 1, tip: 'F beside your water purifier', reward: { coconut: 1 } },
  { id: 'shore', chapter: 1, title: 'Set foot on a new shore', counter: 'islands', target: 1, tip: 'M: open the chart and set a course', reward: { rope: 1 } },
  { id: 'signal', chapter: 1, title: 'Recover signal fragments', counter: 'caches', target: 3, tip: 'One finite supply cache on each island' },
  { id: 'frequency', chapter: 1, title: 'Research the signal beacon', research: 'copper', target: 1, tip: 'Find copper · research at your workbench' },
  { id: 'home', chapter: 2, title: 'Send a signal home', counter: 'rescued', target: 1, tip: 'Build a beacon, then press F beside it' },
  { id: 'curiosity', optional: true, title: 'Discover an island landmark', counter: 'poi', target: 1, tip: 'Look for a spring, wrecked skiff, or old observatory', reward: { coconut: 2 } },
  { id:'trail-reader',optional:true,title:'Read a keeper’s trail journal',counter:'journals',target:1,tip:'Follow the island trail to an elevated overlook',reward:{water:1} },
  { id:'hidden-share',optional:true,title:'Recover a hidden provision chest',counter:'secrets',target:1,tip:'Find the grotto beyond the overlook; some latches answer carved waystones',reward:{leaf:4} },
  { id: 'provisions', optional: true, title: 'Let the rain provide', research: 'resin', target: 1, tip: 'Find palm resin; study vines, then resin', reward: { rope: 2 } },
  { id: 'fortify', optional: true, title: 'Learn from the reef', research: 'coral', target: 1, tip: 'Find sea glass coral; study copper, then coral', reward: { scrap: 2 } },
  { id: 'navigator', optional: true, title: 'Read an older compass', research: 'relic', target: 1, tip: 'Find a navigator’s lens at an outpost', reward: { wood: 3 } },
  { id: 'below-the-blue', optional: true, title: 'Recover a sunken keeper’s cache', counter: 'reefs', target: 1, tip: 'Dive below the tide · steer with the right stick · swim up or down with the dive controls', reward: { cookedFish: 1 } },
  { id: 'lanternwake', optional: true, title: 'Unlock the Lanternwake locker', counter: 'wrecks', target: 1, tip: 'Find the brass key in the wreck, then open the captain’s locker', reward: { seaweed: 4, pearl: 1 } },
];

export const RECIPES = [
  { id: 'rope', name: 'Palm-fiber rope', output: 'rope', amount: 2, ingredients: { leaf: 2 }, seconds: 2, category: 'essentials', description: 'Twist palm leaves into something stronger.' },
  { id: 'water', name: 'Fresh water', output: 'water', amount: 1, ingredients: { wood: 1 }, seconds: 8, category: 'food', station: 'purifier', description: 'A clean drink, distilled from the sea.' },
  { id: 'cookedFish', name: 'Grilled fish', output: 'cookedFish', amount: 1, ingredients: { rawFish: 1, wood: 1 }, seconds: 8, category: 'food', station: 'grill', description: 'A proper meal. Restores thirty hunger.' },
  { id: 'spear', name: 'Wooden spear', output: 'spear', amount: 1, ingredients: { wood: 5, rope: 2, scrap: 1 }, seconds: 5, category: 'tools', description: 'The ocean has teeth. Now you do, too.' },
  { id: 'fishingRod', name: 'Fishing rod', output: 'fishingRod', amount: 1, ingredients: { wood: 4, rope: 3 }, seconds: 5, category: 'tools', description: 'There is always something beneath the surface.' },
  { id: 'paddle', name: 'Wooden paddle', output: 'paddle', amount: 1, ingredients: { wood: 4, plastic: 2 }, seconds: 3, category: 'tools', description: 'A little more say in where you end up.' },
  { id: 'heartyMeal', name: 'Island stew', output: 'heartyMeal', amount: 1, ingredients: { rawFish: 1, coconut: 1, wood: 1 }, seconds: 8, category: 'food', station: 'grill', research: 'resin', description: 'A more sustaining meal: +45 hunger and +15 thirst.' },
  { id: 'oxygenTank', name: 'Pressure-rated oxygen tank', output: 'oxygenTank', amount: 1, ingredients: { ironOre: 5, scrap: 4, rope: 2, pearl: 1, deepCrystal: 1 }, seconds: 12, category: 'tools', station: 'workbench', research: 'pearl', description: 'A workbench-built reserve, stabilized with an abyss crystal. Adds 44 seconds to your dive time, up to a 124-second total.' },
  { id: 'divingFins', name: 'Brass diving fins', output: 'divingFins', amount: 1, ingredients: { seaweed: 4, shell: 4, rope: 2 }, seconds: 8, category: 'tools', station: 'workbench', research: 'pearl', description: 'A fitted pair that increases underwater swimming speed by 35%.' },
  ...Object.entries(BLOCKS).map(([id, b]) => ({ id: `build_${id}`, name: b.name, output: id, block: id, amount: 1, ingredients: b.cost, seconds: 0, category: 'building', research: b.research, description: b.description })),
];

export const BIOMES = [
  { id: 'palm', name: 'Tropical paradise', sand: 0xf0d9aa, grass: 0x609a5b, rock: 0x8c998d, special: 'resin', poi: { id: 'spring', name: 'Tidal spring', kind: 'spring', icon: 'water', loot: { water: 2, resin: 1 }, story: 'Among the palms, someone lined a shallow spring with river stones. A little fresh water; a little proof that you are not the first to rest here.' }, treeCount: 12, resources: ['coconut', 'vine', 'wood', 'copper'] },
  { id: 'reef', name: 'Coral atoll', sand: 0xead8b6, grass: 0x91aa73, rock: 0x899b9d, special: 'coral', poi: { id: 'wreck', name: 'Wrecked skiff', kind: 'wreck', icon: 'paddle', loot: { coral: 2, scrap: 3 }, story: 'The old skiff never made it across the reef. Its weathered plates and sea glass carry the lesson onward: a home needs strong edges.' }, treeCount: 7, resources: ['copper', 'scrap', 'coconut', 'vine'] },
  { id: 'ruins', name: 'Jungle ruins', sand: 0xddc99f, grass: 0x4c8458, rock: 0x92988f, special: 'relic', poi: { id: 'observatory', name: 'Navigator’s temple', kind: 'observatory', icon: 'compass', loot: { relic: 1, copper: 2 }, story: 'A brass lens still points into the trade winds. The keeper measured currents here, not days. Perhaps a way forward can be learned from what they left behind.' }, treeCount: 9, resources: ['copper', 'vine', 'scrap', 'coconut'] },
  { id:'pirate', legacyIndex:0, name:'Pirate hideout', sand:0xe6c58e,grass:0x688f57,rock:0x849083,special:'resin',treeCount:18,resources:['coconut','vine','wood','copper'],poi:{id:'spring',name:'Quartermaster’s shelter',kind:'camp',icon:'backpack',loot:{water:2,resin:1},story:'A sailcloth roof, a marked chart, a share of provisions. The quartermaster left fresh water and palm resin for the next crew to find this sheltered shore.'}},
  { id:'volcano', legacyIndex:1,name:'Volcanic terraces',sand:0x77817a,grass:0x79916b,rock:0x515f5e,special:'coral',treeCount:10,resources:['copper','scrap','coconut','vine'],poi:{id:'wreck',name:'Basalt survey camp',kind:'camp',icon:'ore',loot:{coral:2,scrap:3},story:'The survey crew carried reef glass up to the cool basalt terraces to test their instruments. Copper in the scarps and sheltered palms still reward a patient landing.'}},
  { id:'outpost',legacyIndex:2,name:'Overgrown research outpost',sand:0xdacdab,grass:0x5e956b,rock:0x829891,special:'relic',treeCount:20,resources:['copper','vine','scrap','coconut'],poi:{id:'observatory',name:'Overgrown field station',kind:'observatory',icon:'research',loot:{relic:1,copper:2},story:'Vines have reclaimed the shutters, but a brass current-reader survives beneath the roof. The keeper’s measurements point to steady trade winds and a way to make your raft travel farther.'}},
];

export const WEATHER = {
  clear: { label: 'Clear skies', icon: 'sun', amplitude: 1, fog: .0018, rain: 0, duration: 180, wind: 6.4 },
  rain: { label: 'Passing rain', icon: 'rain', amplitude: 1.5, fog: .004, rain: .6, duration: 110, wind: 11.2 },
  fog: { label: 'Sea mist', icon: 'fog', amplitude: .8, fog: .013, rain: 0, duration: 95, wind: 3.8 },
  storm: { label: 'Storm warning', icon: 'storm', amplitude: 4, fog: .007, rain: 1, duration: 100, wind: 24.6 },
};

export const QUICKBAR = ['hook', 'hammer', 'spear', 'cookedFish', 'water', 'fishingRod', 'paddle', null];
export const STARTER_ITEMS = { wood: 12, plastic: 8, leaf: 10, scrap: 5, rope: 3, hook: 1, hammer: 1, spear: 1, fishingRod: 1, paddle: 1, rawFish: 2, cookedFish: 2, water: 3 };
export const ISLAND_NAMES = ['Pelican Cay', 'Whisper Key', 'Morrow Atoll', 'Driftwood Reach', 'Lantern Isle', 'The Quiet Shore', 'Copperhead Cay', 'Saltwind Key', 'Sunspoke Island', 'Lost Letter Atoll'];
export const LORE = [
  { title: 'A letter, never sent', text: 'If you are reading this, the currents brought us to the same place. There is copper in the cliffs, and an old signal component in every outpost. Three of them might be enough. Keep the fire lit. Someone is listening.' },
  { title: 'The keeper’s log', text: 'Day 41. We stopped counting the miles. Mira says the ocean is not empty; it is simply keeping its own time. We left a radio component for the next traveler. May your seas be kinder than ours.' },
  { title: 'A frequency in the blue', text: 'Frequency 104.8. At dawn, the static almost sounds like a voice. We have planted a palm beside the old station. By the time you find this, it should be tall enough to offer a little shade.' },
];
