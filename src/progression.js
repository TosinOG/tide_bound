// Data-driven quests, Voyage Log achievements and the interactive first-ten-minutes guide.
import { QUESTS, ACHIEVEMENTS, TUTORIAL_STEPS } from './data.js';

// Counters live with Game; definitions, completion IDs and rewards are independent.
export class QuestManager {
  constructor(bus,inventory,saved={}) {this.bus=bus;this.inventory=inventory;this.completed=new Set(saved.completed||[]);}
  entries(progress,research) {
    return QUESTS.map(q=>({...q,current:q.research?(research.has(q.research)?1:0):Number(progress[q.counter]||0),claimed:this.completed.has(q.id)}));
  }
  update(progress,research) {
    for(const q of this.entries(progress,research)) if(q.current>=q.target&&!this.completed.has(q.id)) {
      // Mark before emitting or granting: saves and reentrant listeners cannot replay rewards.
      this.completed.add(q.id);
      this.inventory.grant(q.reward||{});
      this.bus.emit('questComplete',q);
    }
  }
  toJSON() {return {completed:[...this.completed]};}
}

/** Derived numbers used by both the Voyage Log and the tutorial. */
export function voyageMetrics(game) {
  const p = game.progress || {}, v = game.voyage || {};
  const biomes = game.world?.biomesSeen instanceof Set ? game.world.biomesSeen.size
    : game.world ? new Set(game.world.islands.map(i => i.biome?.id).filter(Boolean)).size : 0;
  return {
    salvaged: p.salvaged || 0, built: p.built || 0, cooked: p.cooked || 0,
    islands: p.islands || 0, biomes, sharks: p.sharks || 0,
    research: game.crafting?.research?.size || 0, puzzles: p.puzzles || 0,
    reefs: p.reefs || 0, secrets: p.secrets || 0, codes: (v.codes || []).length,
    upgrades: p.upgrades || 0, trades: p.trades || 0, painted: p.painted || 0,
    day: game.time?.day || 1, finale: p.finale || 0, endless: p.endless || 0,
    water: p.water || 0, courses: p.courses || 0,
  };
}

/** A once-only, saved achievement track. Pure: it never mutates the game directly. */
export class VoyageLog {
  constructor(bus, saved = {}) {
    this.bus = bus;
    this.earned = new Set((saved.earned || []).filter(id => ACHIEVEMENTS.some(a => a.id === id)));
  }
  entries() { return ACHIEVEMENTS.map(a => ({ ...a, earned: this.earned.has(a.id) })); }
  update(game) {
    const m = voyageMetrics(game);
    for (const a of ACHIEVEMENTS) {
      if (this.earned.has(a.id)) continue;
      if (Number(m[a.metric] || 0) >= a.target) {
        this.earned.add(a.id);
        this.bus.emit('achievement', a);
      }
    }
  }
  toJSON() { return { earned: [...this.earned] }; }
}

/** Contextual, one-prompt-at-a-time onboarding. Skipped automatically on loaded voyages. */
export class Tutorial {
  constructor(bus, saved = {}) {
    this.bus = bus;
    this.step = Number.isInteger(saved.step) ? Math.max(0, Math.min(TUTORIAL_STEPS.length, saved.step)) : 0;
    this.done = !!saved.done || this.step >= TUTORIAL_STEPS.length;
  }
  current() { return this.done ? null : TUTORIAL_STEPS[this.step]; }
  update(game) {
    if (this.done) return;
    const m = voyageMetrics(game), step = this.current();
    if (!step) { this.done = true; return; }
    if (Number(m[step.metric] || 0) >= step.target) {
      this.step++;
      if (this.step >= TUTORIAL_STEPS.length) { this.done = true; this.bus.emit('tutorialComplete'); }
      else this.bus.emit('tutorialStep', this.current());
    }
  }
  skip() { this.done = true; this.step = TUTORIAL_STEPS.length; }
  toJSON() { return { step: this.step, done: this.done }; }
}
