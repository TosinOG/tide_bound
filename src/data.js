// Data-only definitions: edit these without changing the game systems.
export const META = Object.freeze({ title: "Tidebound Gold", version: '1.3.2', saveVersion: 2 });
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
  hook: { name: 'Salvage hook', icon: 'hook', color: '#d8bc7a', description: 'Hold to charge. Release to cast. Click again to reel in.', stack: 1, tool: true, family: 'hook', tier: 0 },
  hammer: { name: 'Building hammer', icon: 'hammer', color: '#b58b61', description: 'Select a structure, point at your raft, and build.', stack: 1, tool: true },
  spear: { name: 'Wooden spear', icon: 'spear', color: '#b89c71', description: 'Repel the shark during its charge. Also a good fishing companion.', stack: 1, tool: true },
  fishingRod: { name: 'Fishing rod', icon: 'fishing', color: '#b3946d', description: 'Cast into the sea. When the float dips, click to catch a fish.', stack: 1, tool: true },
  paddle: { name: 'Paddle', icon: 'paddle', color: '#ad7d4f', description: 'Click the ocean to paddle in that direction. G: take the helm.', stack: 1, tool: true },
  rawFish: { name: 'Raw fish', icon: 'fish', color: '#92b5bb', description: '+10 hunger, −5 health. Better cooked over a fire.', hunger: 10, health: -5, stack: 20, consumable: true },
  cookedFish: { name: 'Grilled fish', icon: 'cookedFish', color: '#d78d5d', description: '+30 hunger. A little comfort, a long way from land.', hunger: 30, stack: 20, consumable: true },
  water: { name: 'Fresh water', icon: 'water', color: '#75bfc9', description: '+40 thirst. Purify seawater or collect it during rain.', thirst: 40, stack: 20, consumable: true },
  coconut: { name: 'Coconut', icon: 'coconut', color: '#aa8461', description: '+15 hunger, +15 thirst. Found beneath island palms.', hunger: 15, thirst: 15, stack: 20, consumable: true },
  // --- Voyager update: upgraded tools ---
  scrapHook: { name: 'Scrap hook', icon: 'hook', color: '#c9b489', description: 'A reinforced hook. Casts farther and hauls in two pieces of salvage at once.', stack: 1, tool: true, family: 'hook', tier: 1 },
  chainHook: { name: 'Chain hook', icon: 'hook', color: '#e0cf9b', description: 'The finest hook afloat. Huge range, a fast cast, and three pieces per haul.', stack: 1, tool: true, family: 'hook', tier: 2 },
  metalSpear: { name: 'Metal spear', icon: 'spear', color: '#c9c3ae', description: 'A sharpened tip. Nearly double the damage against a charging shark.', stack: 1, tool: true, family: 'spear', tier: 1 },
  axe: { name: 'Salvage axe', icon: 'repair', color: '#b7a487', description: 'Dismantle twice as fast and gather extra timber from island wood.', stack: 1, tool: true },
  paintBrush: { name: 'Paint brush', icon: 'flag', color: '#d8a37c', description: 'Click a structure to paint it. Click again to cycle through eight colours.', stack: 1, tool: true },
  // --- Voyager update: materials and food ---
  copperIngot: { name: 'Copper ingot', icon: 'ore', color: '#d59a6a', description: 'Smelted copper. The backbone of engines and charting instruments.', stack: 99 },
  tradeToken: { name: 'Trader’s token', icon: 'compass', color: '#dfc483', description: 'Pressed from recycled salvage. The keeper at a trading post accepts these.', stack: 99 },
  palmSeed: { name: 'Palm seed', icon: 'leaf', color: '#8ca86a', description: 'Plant it in a crop plot to grow a little food of your own.', stack: 99, research: 'palmSeed' },
  mackerel: { name: 'Silver mackerel', icon: 'fish', color: '#a9c6c9', description: 'A common catch. Good in the cooking pot.', stack: 20 },
  puffer: { name: 'Reef puffer', icon: 'fish', color: '#d8c78b', description: 'An unusual catch. Careful cooks prize it.', stack: 20 },
  lanternFish: { name: 'Lantern fish', icon: 'fish', color: '#9fd5c4', description: 'A glowing deep-water fish found while diving. A rare recipe ingredient.', stack: 20 },
  seaStew: { name: 'Stormproof stew', icon: 'cookedFish', color: '#cf9c62', description: '+45 hunger, +15 thirst. Storms and lightning cannot hurt you for 3 minutes.', hunger: 45, thirst: 15, stack: 20, consumable: true, buff: 'stormShield' },
  reefSalad: { name: 'Reef salad', icon: 'leaf', color: '#a9c48a', description: '+30 hunger, +25 thirst. Swim and dive 50% faster for 3 minutes.', hunger: 30, thirst: 25, stack: 20, consumable: true, buff: 'swiftSwim' },
  spicedFish: { name: 'Spiced sailor’s fish', icon: 'cookedFish', color: '#d78b5b', description: '+40 hunger. Spear strikes hit twice as hard for 3 minutes.', hunger: 40, stack: 20, consumable: true, buff: 'spearMight' },
  // --- Voyager update: research discoveries ---
  seaChart: { name: 'Torn sea chart', icon: 'map', color: '#d8c393', description: 'A fragment of a keeper’s chart. Study it to build a charting table.', stack: 99, research: 'seaChart' },
  brassGear: { name: 'Brass gear', icon: 'settings', color: '#c5a86c', description: 'Salvaged machinery. Study it to build a smelter.', stack: 99, research: 'brassGear' },
  steamCore: { name: 'Steam core', icon: 'wind', color: '#b2c2b6', description: 'A compact pressure vessel. Study it to build a raft engine.', stack: 99, research: 'steamCore' },
  pigment: { name: 'Island pigment', icon: 'flag', color: '#cf8f72', description: 'Vivid mineral colour. Study it to build a paint mill.', stack: 99, research: 'pigment' },
  recipeBook: { name: 'Keeper’s recipe book', icon: 'book', color: '#c9b58a', description: 'Water-stained pages of meals. Study them to build a cooking pot.', stack: 99, research: 'recipeBook' },
  gearBlueprint: { name: 'Recycler blueprint', icon: 'research', color: '#a9c1bb', description: 'Plans for turning spare salvage into trade tokens. Study them to build a recycler.', stack: 99, research: 'gearBlueprint' },
  brassHinge: { name: 'Brass hinge', icon: 'scrap', color: '#c3ae7c', description: 'A sturdy hinge. Study it to build proper storage chests.', stack: 99, research: 'brassHinge' },
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
  // --- Voyager update: advanced stations ---
  chartTable: { name: 'Charting table', icon: 'map', category: 'station', description: 'F: enter keeper codes and reveal the next story destination.', cost: { wood: 6, scrap: 3, copperIngot: 1, seaChart: 1 }, hp: 120, wooden: true, station: true, research: 'seaChart', mass: 22 },
  smelter: { name: 'Small smelter', icon: 'ore', category: 'station', description: 'F: smelt two copper ore into one ingot. Uses a little driftwood.', cost: { wood: 5, scrap: 6, brassGear: 1 }, hp: 130, station: true, research: 'brassGear', mass: 28 },
  cookingPot: { name: 'Cooking pot', icon: 'grill', category: 'station', description: 'F: cook a discoverable meal with a real buff. Open crafting to choose a recipe.', cost: { wood: 4, scrap: 5, recipeBook: 1 }, hp: 110, station: true, research: 'recipeBook', mass: 20 },
  cropPlot: { name: 'Crop plot', icon: 'leaf', category: 'station', description: 'Plant a palm seed; harvest coconuts and leaves every 90 seconds. Watch for gulls.', cost: { wood: 5, leaf: 6, rope: 2 }, hp: 90, wooden: true, station: true, research: 'palmSeed', produces: 'coconut', interval: 90, mass: 14 },
  recycler: { name: 'Recycler', icon: 'scrap', category: 'station', description: 'F: compress five spare materials into one trader’s token.', cost: { wood: 4, scrap: 8, gearBlueprint: 1 }, hp: 120, station: true, research: 'gearBlueprint', mass: 26 },
  storageChest: { name: 'Storage chest', icon: 'backpack', category: 'station', description: 'F: open shared raft storage. Every chest on your raft shares one hold.', cost: { wood: 8, rope: 2, brassHinge: 1 }, hp: 100, wooden: true, station: true, research: 'brassHinge', mass: 18 },
  engine: { name: 'Raft engine', icon: 'wind', category: 'station', description: 'F: feed it driftwood to sail against the wind at double speed for five minutes.', cost: { wood: 6, scrap: 10, copperIngot: 2, steamCore: 1 }, hp: 140, station: true, research: 'steamCore', mass: 34 },
  paintMill: { name: 'Paint mill', icon: 'flag', category: 'station', description: 'F: mix one pigment into two charges of paint for your brush.', cost: { wood: 5, scrap: 3, pigment: 1 }, hp: 100, wooden: true, station: true, research: 'pigment', mass: 16 },
  tradingPost: { name: 'Trading post', icon: 'compass', category: 'station', description: 'F: trade tokens with the keeper for blueprints, seeds and rare fish.', cost: { wood: 8, plastic: 4, tradeToken: 2, brassHinge: 1 }, hp: 120, wooden: true, station: true, mass: 24 },
  // --- Voyager update: cosmetics (pure self-expression) ---
  flag: { name: 'Signal flag', icon: 'flag', category: 'cosmetic', description: 'A splash of colour above your deck. Click with a paint brush to restyle.', cost: { wood: 2, leaf: 3 }, hp: 60, wooden: true, cosmetic: true, mass: 4 },
  lantern: { name: 'Deck lantern', icon: 'sun', category: 'cosmetic', description: 'A warm little light for long nights at sea.', cost: { wood: 2, scrap: 1 }, hp: 60, cosmetic: true, mass: 4 },
  hammock: { name: 'Hammock', icon: 'rope', category: 'cosmetic', description: 'Proof that someone actually lives here.', cost: { leaf: 6, rope: 2 }, hp: 60, wooden: true, cosmetic: true, mass: 5 },
  planter: { name: 'Flower planter', icon: 'leaf', category: 'cosmetic', description: 'A little green thing that asks nothing of you.', cost: { wood: 3, leaf: 3 }, hp: 60, wooden: true, cosmetic: true, mass: 6 },
  paintedWall: { name: 'Painted wall', icon: 'wall', category: 'cosmetic', description: 'A wall with colour already mixed into the timber.', cost: { wood: 3, leaf: 2 }, hp: 80, wooden: true, cosmetic: true, mass: 10 },
  rug: { name: 'Woven rug', icon: 'leaf', category: 'cosmetic', description: 'Softens a hard day on the planks.', cost: { leaf: 5, rope: 1 }, hp: 40, cosmetic: true, mass: 3 },
  table: { name: 'Small table', icon: 'workbench', category: 'cosmetic', description: 'Somewhere to put a map, a meal, or your thoughts.', cost: { wood: 4, rope: 1 }, hp: 70, wooden: true, cosmetic: true, mass: 8 },
  chair: { name: 'Deck chair', icon: 'stairs', category: 'cosmetic', description: 'A seat with a view of absolutely everywhere.', cost: { wood: 3, leaf: 2 }, hp: 60, wooden: true, cosmetic: true, mass: 6 },
};

// A research discovery is documented, not consumed. Prerequisites create useful branches.
export const RESEARCH = {
  vine: { title: 'A better way to gather', unlock: 'net', requires: [], description: 'Strong fibers become collection nets: more time exploring, less time chasing driftwood.' },
  copper: { title: 'A voice across the water', unlock: 'beacon', requires: [], description: 'Copper carries a current. Three island signal fragments can become your way home.' },
  resin: { title: 'Provisioned by the palms', unlock: 'rainCollector', requires: ['vine'], description: 'Waterproof lashings unlock automatic rain collection and nourishing island stew.' },
  coral: { title: 'A home with stronger edges', unlock: 'armor', requires: ['copper'], description: 'Reef-hardened plates halve shark bites and stop reef scraping on the foundation below.' },
  relic: { title: 'Read the trade winds', unlock: 'windcatcher', requires: ['copper'], description: 'An old navigator’s lens unlocks a windcatcher: 20% faster helming and charted sailing.' },
  // --- Voyager update: the deepening tech tree ---
  seaChart: { title: 'A map that remembers', unlock: 'chartTable', requires: ['copper'], description: 'A charting table reads keeper codes and points toward the story shores.' },
  brassGear: { title: 'Fire and metal', unlock: 'smelter', requires: ['copper'], description: 'Smelt copper ore into ingots for serious machinery.' },
  recipeBook: { title: 'The keeper’s kitchen', unlock: 'cookingPot', requires: ['resin'], description: 'Cook real meals that grant temporary abilities.' },
  palmSeed: { title: 'Grow a little home', unlock: 'cropPlot', requires: ['vine'], description: 'Crop plots grow coconuts and leaves while you explore.' },
  pigment: { title: 'Colour on the water', unlock: 'paintMill', requires: [], description: 'A paint mill makes paint charges for a brush and a more personal raft.' },
  gearBlueprint: { title: 'Nothing goes to waste', unlock: 'recycler', requires: ['copper'], description: 'Recycle surplus salvage into tokens for the trading post.' },
  brassHinge: { title: 'Room for everything', unlock: 'storageChest', requires: [], description: 'Storage chests give your raft a shared hold for supplies.' },
  steamCore: { title: 'Against the wind', unlock: 'engine', requires: ['brassGear'], description: 'An engine lets you sail wherever you choose, regardless of the trade winds.' },
};

export const QUEST_CHAPTERS = [
  { title: 'A place to begin', description: 'Big things start with small discoveries.' },
  { title: 'Beyond the horizon', description: 'There is more out here than open water.' },
  { title: 'Someone is listening', description: 'A little courage travels a long way.' },
  { title: 'A coded horizon', description: 'The keepers left more than supplies behind.' },
  { title: 'The last light', description: 'One final shore, and a voice on the radio.' },
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
  { id: 'below-the-blue', optional: true, title: 'Recover a sunken keeper’s cache', counter: 'reefs', target: 1, tip: 'Swim to a coastal reef · C to dive · F beside the submerged cache', reward: { cookedFish: 1 } },
  { id: 'upgraded-hook', optional: true, title: 'Craft a better hook', counter: 'upgrades', target: 1, tip: 'Find a barrel crate · research a blueprint · craft at the workbench', reward: { wood: 4 } },
  { id: 'first-meal', optional: true, title: 'Cook a keeper’s meal', counter: 'cooked', target: 1, tip: 'Build a cooking pot and try one of the discovered recipes', reward: { palmSeed: 1 } },
  { id: 'first-trade', optional: true, title: 'Trade with the keeper', counter: 'trades', target: 1, tip: 'Recycle spare salvage, then use a trading post', reward: { tradeToken: 2 } },
  { id: 'painted-home', optional: true, title: 'Put your own colour on the raft', counter: 'painted', target: 1, tip: 'Craft a paint brush and click a structure', reward: { pigment: 1 } },
  { id: 'charted-code', chapter: 3, title: 'Decode the keeper’s chart', counter: 'codes', target: 3, tip: 'Read keeper journals on story shores, then use a charting table', reward: { copperIngot: 2 } },
  { id: 'home-final', chapter: 4, title: 'Reach the last light', counter: 'finale', target: 1, tip: 'Follow the chart to the lighthouse and defend your beacon' },
];

export const RECIPES = [
  { id: 'rope', name: 'Palm-fiber rope', output: 'rope', amount: 2, ingredients: { leaf: 2 }, seconds: 2, category: 'essentials', description: 'Twist palm leaves into something stronger.' },
  { id: 'water', name: 'Fresh water', output: 'water', amount: 1, ingredients: { wood: 1 }, seconds: 8, category: 'food', station: 'purifier', description: 'A clean drink, distilled from the sea.' },
  { id: 'cookedFish', name: 'Grilled fish', output: 'cookedFish', amount: 1, ingredients: { rawFish: 1, wood: 1 }, seconds: 8, category: 'food', station: 'grill', description: 'A proper meal. Restores thirty hunger.' },
  { id: 'spear', name: 'Wooden spear', output: 'spear', amount: 1, ingredients: { wood: 5, rope: 2, scrap: 1 }, seconds: 5, category: 'tools', description: 'The ocean has teeth. Now you do, too.' },
  { id: 'fishingRod', name: 'Fishing rod', output: 'fishingRod', amount: 1, ingredients: { wood: 4, rope: 3 }, seconds: 5, category: 'tools', description: 'There is always something beneath the surface.' },
  { id: 'paddle', name: 'Wooden paddle', output: 'paddle', amount: 1, ingredients: { wood: 4, plastic: 2 }, seconds: 3, category: 'tools', description: 'A little more say in where you end up.' },
  { id: 'heartyMeal', name: 'Island stew', output: 'heartyMeal', amount: 1, ingredients: { rawFish: 1, coconut: 1, wood: 1 }, seconds: 8, category: 'food', station: 'grill', research: 'resin', description: 'A more sustaining meal: +45 hunger and +15 thirst.' },
  // --- Voyager update: upgrades, meals and materials ---
  { id: 'scrapHook', name: 'Scrap hook', output: 'scrapHook', amount: 1, ingredients: { wood: 3, scrap: 4, rope: 2 }, seconds: 6, category: 'tools', description: 'A longer cast that can haul in two pieces of salvage.' },
  { id: 'chainHook', name: 'Chain hook', output: 'chainHook', amount: 1, ingredients: { scrap: 6, rope: 3, copperIngot: 1 }, seconds: 9, category: 'tools', research: 'brassGear', description: 'The best hook on the ocean: long range, fast cast, triple haul.' },
  { id: 'metalSpear', name: 'Metal spear', output: 'metalSpear', amount: 1, ingredients: { wood: 3, scrap: 4, rope: 2, copperIngot: 1 }, seconds: 7, category: 'tools', research: 'brassGear', description: 'Nearly double the damage when a shark charges.' },
  { id: 'axe', name: 'Salvage axe', output: 'axe', amount: 1, ingredients: { wood: 3, scrap: 3, rope: 1 }, seconds: 5, category: 'tools', description: 'Faster dismantling and extra timber from island wood.' },
  { id: 'paintBrush', name: 'Paint brush', output: 'paintBrush', amount: 1, ingredients: { wood: 2, leaf: 3, rope: 1 }, seconds: 4, category: 'tools', research: 'pigment', description: 'Paint any structure in one of eight colours.' },
  { id: 'copperIngot', name: 'Copper ingot', output: 'copperIngot', amount: 1, ingredients: { copper: 2, wood: 1 }, seconds: 7, category: 'essentials', station: 'smelter', research: 'brassGear', description: 'Refined metal for engines and instruments.' },
  { id: 'tradeToken', name: 'Trader’s token', output: 'tradeToken', amount: 1, ingredients: { wood: 2, plastic: 2, scrap: 1 }, seconds: 5, category: 'essentials', station: 'recycler', research: 'gearBlueprint', description: 'Press spare materials into something the keeper values.' },
  { id: 'seaStew', name: 'Stormproof stew', output: 'seaStew', amount: 1, ingredients: { mackerel: 1, coconut: 1, wood: 1 }, seconds: 9, category: 'food', station: 'cookingPot', research: 'recipeBook', description: 'A hearty meal that shrugs off storms for three minutes.' },
  { id: 'reefSalad', name: 'Reef salad', output: 'reefSalad', amount: 1, ingredients: { lanternFish: 1, leaf: 2 }, seconds: 8, category: 'food', station: 'cookingPot', research: 'recipeBook', description: 'A bright meal that speeds swimming and diving.' },
  { id: 'spicedFish', name: 'Spiced sailor’s fish', output: 'spicedFish', amount: 1, ingredients: { puffer: 1, cookedFish: 1, wood: 1 }, seconds: 9, category: 'food', station: 'cookingPot', research: 'recipeBook', description: 'A sharp meal that doubles spear damage for three minutes.' },
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

export const HOOK_TOOLS = Object.freeze(['hook', 'scrapHook', 'chainHook']);
export const QUICKBAR = ['hook', 'hammer', 'spear', 'cookedFish', 'water', 'fishingRod', 'paddle', null];
export const STARTER_ITEMS = { wood: 12, plastic: 8, leaf: 10, scrap: 5, rope: 3, hook: 1, hammer: 1, spear: 1, fishingRod: 1, paddle: 1, rawFish: 2, cookedFish: 2, water: 3 };
export const ISLAND_NAMES = ['Pelican Cay', 'Whisper Key', 'Morrow Atoll', 'Driftwood Reach', 'Lantern Isle', 'The Quiet Shore', 'Copperhead Cay', 'Saltwind Key', 'Sunspoke Island', 'Lost Letter Atoll'];
export const LORE = [
  { title: 'A letter, never sent', text: 'If you are reading this, the currents brought us to the same place. There is copper in the cliffs, and an old signal component in every outpost. Three of them might be enough. Keep the fire lit. Someone is listening.' },
  { title: 'The keeper’s log', text: 'Day 41. We stopped counting the miles. Mira says the ocean is not empty; it is simply keeping its own time. We left a radio component for the next traveler. May your seas be kinder than ours.' },
  { title: 'A frequency in the blue', text: 'Frequency 104.8. At dawn, the static almost sounds like a voice. We have planted a palm beside the old station. By the time you find this, it should be tall enough to offer a little shade.' },
];

// ---------------------------------------------------------------------------
// Voyager update: tuning tables and authored content
// ---------------------------------------------------------------------------

/** Hook/spear tiers. The best tool you own is always the one that is used. */
export const TOOL_TIERS = {
  hook: { range: 0, speed: 1, haul: 1, catchRadius: 1.15 },
  // The other tiers keep their original values; only the starter hook was too tight.
  scrapHook: { range: 7, speed: 1.2, haul: 2, catchRadius: 1.2 },
  chainHook: { range: 14, speed: 1.45, haul: 3, catchRadius: 1.7 },
  spear: { damage: 15 },
  metalSpear: { damage: 28 },
};

/** Food buffs. Durations are simulated seconds. */
export const BUFFS = {
  stormShield: { name: 'Stormproof', icon: 'storm', seconds: 180, description: 'Immune to lightning and storm damage.' },
  swiftSwim: { name: 'Swift swimmer', icon: 'water', seconds: 180, description: 'Swim and dive 50% faster.' },
  spearMight: { name: 'Sharp spear', icon: 'spear', seconds: 180, description: 'Double spear damage.' },
};

/** Difficulty presets. Castaway is the original, unchanged balance. */
export const DIFFICULTIES = {
  drifter: { label: 'Drifter', drain: .65, damage: .55, loot: 1.25, sharkCooldown: 95, description: 'A gentler ocean. More time to build and explore.' },
  castaway: { label: 'Castaway', drain: 1, damage: 1, loot: 1, sharkCooldown: 65, description: 'The original Tidebound balance.' },
  stormchaser: { label: 'Stormchaser', drain: 1.3, damage: 1.45, loot: .9, sharkCooldown: 45, description: 'Harsher thirst, sharper teeth, leaner salvage.' },
};

/** Paint colours, cycled by the brush. */
export const PALETTE = [
  { name: 'Natural', color: null }, { name: 'Seafoam', color: 0x79b7a8 },
  { name: 'Sunset', color: 0xd98a63 }, { name: 'Deep blue', color: 0x4d7b91 },
  { name: 'Coral', color: 0xdc978b }, { name: 'Golden', color: 0xd9b96e },
  { name: 'Fern', color: 0x6f9a67 }, { name: 'Ink', color: 0x3d4b52 },
];

/** Fishing catch table. `rare` catches need a bite window rather than a fixed fish. */
export const FISH_TABLE = [
  { id: 'rawFish', weight: 48 }, { id: 'mackerel', weight: 26 },
  { id: 'puffer', weight: 14 }, { id: 'lanternFish', weight: 12 },
];

/** What the keeper offers at a trading post. */
export const TRADES = [
  { id: 'trade-chart', name: 'Torn sea chart', cost: 2, give: { seaChart: 1 }, icon: 'map' },
  { id: 'trade-gear', name: 'Brass gear', cost: 2, give: { brassGear: 1 }, icon: 'settings' },
  { id: 'trade-core', name: 'Steam core', cost: 3, give: { steamCore: 1 }, icon: 'wind' },
  { id: 'trade-pigment', name: 'Island pigment', cost: 2, give: { pigment: 1 }, icon: 'flag' },
  { id: 'trade-book', name: 'Keeper’s recipe book', cost: 2, give: { recipeBook: 1 }, icon: 'book' },
  { id: 'trade-blueprint', name: 'Recycler blueprint', cost: 2, give: { gearBlueprint: 1 }, icon: 'research' },
  { id: 'trade-hinge', name: 'Brass hinge', cost: 2, give: { brassHinge: 1 }, icon: 'scrap' },
  { id: 'trade-seeds', name: 'Two palm seeds', cost: 1, give: { palmSeed: 2 }, icon: 'leaf' },
  { id: 'trade-lantern', name: 'Lantern fish', cost: 1, give: { lanternFish: 2 }, icon: 'fish' },
  { id: 'trade-meal', name: 'Stormproof stew', cost: 1, give: { seaStew: 1 }, icon: 'cookedFish' },
];

/** Three authored story destinations, placed deterministically in fixed chunks. */
export const STORY_ISLANDS = [
  { id: '1,-3', name: 'Radio Reef', code: '4821', first: true, biome: 2, x: 150, z: -250, radius: 14, title: 'A voice in the static', story: 'The first keeper built a radio tower on this reef. She wrote the code on the back of a chart and hid it where only a patient traveler would look. Four digits: 4821.', reward: { seaChart: 1, copperIngot: 1, pigment: 1 } },
  { id: '-2,-3', name: 'The Vasagatan', code: '7316', biome: 1, x: -150, z: -250, radius: 15, title: 'The ship that stopped', story: 'A cargo ship ran aground here generations ago. Its engine still has a core, and the captain’s log ends with four digits: 7316.', reward: { steamCore: 1, gearBlueprint: 1, copperIngot: 1 } },
  { id: '3,2', name: 'Lighthouse Key', code: '9053', biome: 0, x: 350, z: 250, radius: 16, title: 'The last light', story: 'Every keeper’s chart ends here. The lamp is cold, but a beacon placed at its foot can still call the world home. The final code is 9053.', reward: { recipeBook: 1, brassHinge: 1, palmSeed: 2 }, finale: true },
];
export const STORY_BY_CHUNK = Object.fromEntries(STORY_ISLANDS.map(i => [i.id, i]));

/*
 * Horizons and discovery.
 * A streaming chunk is deliberately large: with a 3x3 window the nearest
 * procedural shore sits roughly 300 units away instead of ~150, so the game
 * opens on empty water. Island meshes (and their shallow-water coast patch)
 * only appear inside ISLAND_SIGHT_DISTANCE, which makes land something you
 * sail toward and find rather than something already on screen at spawn.
 */
export const WORLD_CHUNK_SIZE = 240;
export const ISLAND_SIGHT_DISTANCE = 170;
/** Chunk 0,0 is centred on the spawn, so neighbouring shores start ~240m out. */
export const worldChunkKey = (x, z) => {
  const cx = Math.floor((x + WORLD_CHUNK_SIZE / 2) / WORLD_CHUNK_SIZE);
  const cz = Math.floor((z + WORLD_CHUNK_SIZE / 2) / WORLD_CHUNK_SIZE);
  return cx + ',' + cz;
};
/** Story shores keep their save ids, but are looked up by their streaming chunk. */
export const STORY_AT_CHUNK = Object.fromEntries(STORY_ISLANDS.map(i => [worldChunkKey(i.x, i.z), i]));

/** Voyage Log achievements. `metric` is a progress counter or a derived value. */
export const ACHIEVEMENTS = [
  { id: 'first-salvage', title: 'Something worth keeping', description: 'Haul in your first piece of salvage.', icon: 'hook', metric: 'salvaged', target: 1 },
  { id: 'salvage-50', title: 'The sea provides', description: 'Gather 50 pieces of salvage.', icon: 'hook', metric: 'salvaged', target: 50 },
  { id: 'builder', title: 'A place to stand', description: 'Build 10 structures.', icon: 'foundation', metric: 'built', target: 10 },
  { id: 'architect', title: 'A floating home', description: 'Build 60 structures.', icon: 'floor', metric: 'built', target: 60 },
  { id: 'cook', title: 'Warm meal', description: 'Cook your first keeper’s meal.', icon: 'cookedFish', metric: 'cooked', target: 1 },
  { id: 'shore', title: 'Land ho', description: 'Set foot on a new shore.', icon: 'island', metric: 'islands', target: 1 },
  { id: 'explorer', title: 'Six shores', description: 'Discover six islands.', icon: 'map', metric: 'islands', target: 6 },
  { id: 'cartographer', title: 'All the biomes', description: 'Discover all six island biomes.', icon: 'compass', metric: 'biomes', target: 6 },
  { id: 'defender', title: 'Not today', description: 'Repel a charging shark.', icon: 'spear', metric: 'sharks', target: 1 },
  { id: 'hunter', title: 'The sea blinks first', description: 'Repel five sharks.', icon: 'spear', metric: 'sharks', target: 5 },
  { id: 'researcher', title: 'Curiosity', description: 'Research your first discovery.', icon: 'research', metric: 'research', target: 1 },
  { id: 'scholar', title: 'Bookworm', description: 'Research every branch of the tree.', icon: 'research', metric: 'research', target: 13 },
  { id: 'puzzle', title: 'The right order', description: 'Solve a waystone puzzle.', icon: 'sun', metric: 'puzzles', target: 1 },
  { id: 'diver', title: 'Below the blue', description: 'Recover a sunken keeper’s cache.', icon: 'water', metric: 'reefs', target: 1 },
  { id: 'secret', title: 'A hidden share', description: 'Open a hidden provision chest.', icon: 'backpack', metric: 'secrets', target: 1 },
  { id: 'codebreaker', title: 'Three codes', description: 'Decode all three keeper charts.', icon: 'map', metric: 'codes', target: 3 },
  { id: 'upgrader', title: 'A better way', description: 'Craft an upgraded tool.', icon: 'settings', metric: 'upgrades', target: 1 },
  { id: 'trader', title: 'A fair exchange', description: 'Trade with the keeper.', icon: 'compass', metric: 'trades', target: 1 },
  { id: 'painter', title: 'Make it yours', description: 'Paint a structure on your raft.', icon: 'flag', metric: 'painted', target: 1 },
  { id: 'survivor', title: 'A week at sea', description: 'Survive seven days.', icon: 'sun', metric: 'day', target: 7 },
  { id: 'month-at-sea', title: 'A month of tides', description: 'Survive thirty days.', icon: 'moon', metric: 'day', target: 30 },
  { id: 'home', title: 'Someone heard you', description: 'Finish the voyage.', icon: 'signal', metric: 'finale', target: 1 },
  { id: 'endless', title: 'One more horizon', description: 'Keep sailing after the finale.', icon: 'wind', metric: 'endless', target: 1 },
];

/** Interactive first-ten-minutes tutorial. Each step unlocks one new control. */
export const TUTORIAL_STEPS = [
  { id: 'salvage', title: 'Bring the sea closer', prompt: 'Hold the left mouse button to charge your hook, then release it near floating salvage.', metric: 'salvaged', target: 1, key: '1', touch: 'Hold the hook button to cast.' },
  { id: 'build', title: 'Put down a few roots', prompt: 'Equip the hammer, choose a foundation, and click an edge of your raft to build.', metric: 'built', target: 1, key: '2' },
  { id: 'water', title: 'A drink of fresh water', prompt: 'Stand by your purifier and press F. Select water from your quickbar and click to drink.', metric: 'water', target: 1, key: 'F' },
  { id: 'chart', title: 'Look beyond the horizon', prompt: 'Press M, choose a nearby island, and set a course.', metric: 'courses', target: 1, key: 'M' },
  { id: 'research', title: 'Curiosity opens doors', prompt: 'Bring an island discovery to your workbench (Tab → Research) and study it.', metric: 'research', target: 1, key: 'TAB' },
  { id: 'defend', title: 'Respect what lives here', prompt: 'Keep your spear ready. Strike a shark while it charges your raft.', metric: 'sharks', target: 1, key: '3' },
];
