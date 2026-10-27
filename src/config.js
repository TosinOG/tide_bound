// Global preferences are deliberately separate from voyage progress. A menu can
// change them without constructing a world or writing a save file.
export const PREFERENCES_KEY = 'tidebound.settings.v1';

export const DEFAULT_PREFERENCES = Object.freeze({
  volume: .35,
  musicVolume: .22,
  ambienceVolume: .65,
  effectsVolume: .75,
  quality: 'medium',
  adaptiveQuality: true,
  pixelRatio: 1.25,
  mouseSensitivity: 1,
  relaxed: false,
  dynamicWeather: true,
  showHints: true,
  difficulty: 'castaway',
  firstPerson: false,
  worldSeed: 0,
  interactiveGuide: true,
});

const finite = (value, fallback, min, max) => typeof value === 'number' && Number.isFinite(value)
  ? Math.min(max, Math.max(min, value)) : fallback;
const flag = (value, fallback) => typeof value === 'boolean' ? value : fallback;

/** Return a complete, bounded preference object. Unknown properties are discarded. */
export function normalizePreferences(input = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) input = {};
  const d = DEFAULT_PREFERENCES;
  let quality = input.quality ?? d.quality;
  const adaptiveQuality = flag(input.adaptiveQuality, quality === 'auto' ? true : d.adaptiveQuality);
  if (quality === 'auto') quality = 'medium';
  if (!['low', 'medium', 'high'].includes(quality)) quality = d.quality;
  return {
    volume: finite(input.volume, d.volume, 0, 1),
    musicVolume: finite(input.musicVolume, d.musicVolume, 0, 1),
    ambienceVolume: finite(input.ambienceVolume, d.ambienceVolume, 0, 1),
    effectsVolume: finite(input.effectsVolume, d.effectsVolume, 0, 1),
    quality,
    adaptiveQuality,
    pixelRatio: finite(input.pixelRatio, d.pixelRatio, .5, 2),
    mouseSensitivity: finite(input.mouseSensitivity, d.mouseSensitivity, .25, 2.5),
    relaxed: flag(input.relaxed, d.relaxed),
    dynamicWeather: flag(input.dynamicWeather, d.dynamicWeather),
    showHints: flag(input.showHints, d.showHints),
    difficulty: ['drifter', 'castaway', 'stormchaser'].includes(input.difficulty) ? input.difficulty : d.difficulty,
    firstPerson: flag(input.firstPerson, d.firstPerson),
    worldSeed: Number.isSafeInteger(input.worldSeed) && input.worldSeed >= 0 && input.worldSeed <= 999999 ? input.worldSeed : d.worldSeed,
    interactiveGuide: flag(input.interactiveGuide, d.interactiveGuide),
  };
}

/** Storage failures are non-fatal; preferences still work for this session. */
export function readPreferences(storage, fallback = {}) {
  try {
    const raw = storage?.getItem(PREFERENCES_KEY);
    return normalizePreferences(raw === null || raw === undefined ? fallback : JSON.parse(raw));
  } catch {
    return normalizePreferences(fallback);
  }
}

export function writePreferences(storage, preferences) {
  const normalized = normalizePreferences(preferences);
  try {
    if (!storage) return false;
    storage.setItem(PREFERENCES_KEY, JSON.stringify(normalized));
    return true;
  } catch {
    return false;
  }
}
