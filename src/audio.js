import { normalizePreferences } from './config.js';

// All sound is synthesized locally. One instance is shared by the menu and game,
// so scene transitions never create a second AudioContext or ocean loop.
export class SeaAudio {
  constructor(settings = {}) {
    this.context = null;
    this.settings = normalizePreferences(settings);
    this.volume = this.settings.volume; // backwards-compatible inspector field
    this.enabled = true;
    this.master = null;
    this.ambience = null;
    this.effects = null;
    this.music = null;
    this.scene = 'menu';
    this.nodes = [];
  }

  init() {
    if (this.context) {
      this.context.resume().catch(() => {});
      return;
    }
    try {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      const c = this.context;
      this.master = c.createGain();
      this.ambience = c.createGain();
      this.effects = c.createGain();
      this.music = c.createGain();
      this.ambience.connect(this.master);
      this.effects.connect(this.master);
      this.music.connect(this.master);
      this.master.connect(c.destination);

      // Filtered, slowly breathing ocean noise.
      const buffer = c.createBuffer(1, c.sampleRate * 4, c.sampleRate);
      const samples = buffer.getChannelData(0);
      let last = 0;
      for (let i = 0; i < samples.length; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + .02 * white) / 1.02;
        samples[i] = last * 3.5;
      }
      const noise = c.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;
      const filter = c.createBiquadFilter();
      this.oceanFilter = filter;
      filter.type = 'lowpass';
      filter.frequency.value = 850;
      const seaGain = c.createGain();
      seaGain.gain.value = .16;
      noise.connect(filter);
      filter.connect(seaGain);
      seaGain.connect(this.ambience);
      const lfo = c.createOscillator();
      const depth = c.createGain();
      lfo.frequency.value = .075;
      depth.gain.value = .045;
      lfo.connect(depth);
      depth.connect(seaGain.gain);
      noise.start();
      lfo.start();
      this.nodes.push(noise, lfo);

      // An original, restrained three-note ambient score. Continuous oscillators
      // avoid timers and duplicate music when moving between menu and gameplay.
      const chord = [110, 164.81, 220];
      this.chordNodes = [];
      chord.forEach((frequency, index) => {
        const oscillator = c.createOscillator();
        const gain = c.createGain();
        const drift = c.createOscillator();
        const driftDepth = c.createGain();
        oscillator.type = index === 1 ? 'triangle' : 'sine';
        oscillator.frequency.value = frequency;
        oscillator.detune.value = index * 3 - 3;
        gain.gain.value = index === 1 ? .018 : .026;
        drift.frequency.value = .025 + index * .011;
        driftDepth.gain.value = index === 1 ? .009 : .012;
        drift.connect(driftDepth);
        driftDepth.connect(gain.gain);
        oscillator.connect(gain);
        gain.connect(this.music);
        oscillator.start();
        drift.start();
        this.nodes.push(oscillator, drift);
        this.chordNodes.push({ oscillator, base: frequency, index });
      });
      // A quiet tension layer that swells only when a shark is close.
      const tension = c.createOscillator(), tensionGain = c.createGain();
      tension.type = 'sawtooth'; tension.frequency.value = 55;
      tensionGain.gain.value = 0;
      const tensionFilter = c.createBiquadFilter(); tensionFilter.type = 'lowpass'; tensionFilter.frequency.value = 180;
      tension.connect(tensionFilter); tensionFilter.connect(tensionGain); tensionGain.connect(this.ambience);
      tension.start(); this.nodes.push(tension); this.tensionGain = tensionGain;
      this.applySettings(this.settings);
      this.setScene(this.scene);
    } catch {
      this.context = null;
      this.master = this.ambience = this.effects = this.music = null;
    }
  }

  applySettings(settings) {
    this.settings = normalizePreferences({ ...this.settings, ...settings });
    this.volume = this.settings.volume;
    if (!this.context) return;
    const t = this.context.currentTime;
    this.master.gain.setTargetAtTime(this.enabled ? this.settings.volume : 0, t, .08);
    this.ambience.gain.setTargetAtTime(this.settings.ambienceVolume, t, .12);
    this.effects.gain.setTargetAtTime(this.settings.effectsVolume, t, .08);
    this.setScene(this.scene);
  }

  setScene(scene) {
    this.scene = scene === 'game' ? 'game' : 'menu';
    if (!this.context || !this.music) return;
    const level = this.settings.musicVolume * (this.scene === 'menu' ? .9 : .28);
    this.music.gain.setTargetAtTime(level, this.context.currentTime, .35);
  }

  setUnderwater(active) {
    if (this.context && this.oceanFilter) this.oceanFilter.frequency.setTargetAtTime(active ? 310 : 850, this.context.currentTime, .18);
  }

  /** Retune the ambient drone for weather and raise a low tension bed near danger. */
  setMood(weather = 'clear', threat = 0) {
    if (!this.context) return;
    const t = this.context.currentTime;
    const shift = weather === 'storm' ? .94 : weather === 'rain' ? .97 : weather === 'fog' ? 1.03 : 1;
    for (const node of this.chordNodes || []) node.oscillator.frequency.setTargetAtTime(node.base * shift, t, 1.5);
    if (this.tensionGain) this.tensionGain.gain.setTargetAtTime(Math.max(0, Math.min(1, threat)) * .045, t, .6);
  }

  /** Short surface-aware footstep. Callers throttle this to a few times a second. */
  footstep(surface = 'wood') {
    if (!this.context || !this.enabled) return;
    const t = this.context.currentTime, c = this.context;
    const osc = c.createOscillator(), gain = c.createGain();
    osc.type = 'triangle';
    osc.frequency.value = surface === 'water' ? 150 + Math.random() * 40 : surface === 'sand' ? 95 + Math.random() * 25 : 175 + Math.random() * 35;
    gain.gain.setValueAtTime(.0001, t);
    gain.gain.linearRampToValueAtTime(surface === 'water' ? .05 : .035, t + .008);
    gain.gain.exponentialRampToValueAtTime(.0001, t + .09);
    osc.connect(gain); gain.connect(this.effects); osc.start(t); osc.stop(t + .1);
    osc.onended = () => { osc.disconnect(); gain.disconnect(); };
  }

  /** Two low thumps when health is critical. */
  heartbeat() {
    this.tone(62, .13, 'sine', .075);
    this.tone(58, .17, 'sine', .06, .17);
  }

  setVolume(value) { this.applySettings({ volume: value }); }
  setMusicVolume(value) { this.applySettings({ musicVolume: value }); }
  setAmbienceVolume(value) { this.applySettings({ ambienceVolume: value }); }
  setEffectsVolume(value) { this.applySettings({ effectsVolume: value }); }

  toggle() {
    this.enabled = !this.enabled;
    this.applySettings();
    return this.enabled;
  }

  tone(freq, duration = .15, type = 'sine', gain = .13, delay = 0) {
    if (!this.context || !this.enabled) return;
    const t = this.context.currentTime + delay;
    const oscillator = this.context.createOscillator();
    const envelope = this.context.createGain();
    oscillator.type = type;
    oscillator.frequency.value = freq;
    envelope.gain.setValueAtTime(.0001, t);
    envelope.gain.linearRampToValueAtTime(Math.max(.0001, gain), t + .01);
    envelope.gain.exponentialRampToValueAtTime(.0001, t + duration);
    oscillator.connect(envelope);
    envelope.connect(this.effects);
    oscillator.start(t);
    oscillator.stop(t + duration + .02);
    oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); };
  }

  play(name) {
    if (!this.context) return;
    if (name === 'collect' || name === 'craft') {
      this.tone(523, .24, 'sine', .1);
      this.tone(783, .3, 'sine', .07, .08);
    } else if (name === 'build') {
      this.tone(165, .15, 'triangle', .25);
      this.tone(110, .12, 'triangle', .16, .08);
    } else if (name === 'hook') {
      this.tone(420, .12, 'triangle', .055);
      this.tone(290, .19, 'sine', .07, .06);
    } else if (name === 'damage') {
      this.tone(75, .23, 'sawtooth', .15);
    } else if (name === 'click') {
      this.tone(620, .05, 'sine', .025);
    } else if (name === 'discover') {
      [392, 523, 659, 784].forEach((f, i) => this.tone(f, .7, 'sine', .06, i * .13));
    } else if (name === 'splash') {
      this.tone(180, .2, 'sine', .08);
      this.tone(95, .3, 'triangle', .05, .04);
    } else if (name === 'warning') {
      this.tone(196, .4, 'triangle', .1);
      this.tone(185, .5, 'triangle', .08, .4);
    } else if (name === 'rescue') {
      [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 1.2, 'sine', .08, i * .18));
    } else if (name === 'bite') {
      this.tone(110, .3, 'sawtooth', .2); this.tone(72, .38, 'square', .12, .05);
    } else if (name === 'shark') {
      this.tone(88, .7, 'sawtooth', .09); this.tone(66, .85, 'sine', .08, .12);
    } else if (name === 'levelup') {
      [392, 523, 659, 880].forEach((f, i) => this.tone(f, .45, 'triangle', .07, i * .08));
    } else if (name === 'achievement') {
      [523, 659, 784].forEach((f, i) => this.tone(f, .55, 'sine', .06, i * .1));
    } else if (name === 'coin' || name === 'trade') {
      this.tone(880, .1, 'triangle', .08); this.tone(1175, .18, 'sine', .06, .07);
    } else if (name === 'paint') {
      this.tone(330, .1, 'triangle', .06); this.tone(494, .14, 'sine', .05, .06);
    } else if (name === 'engine') {
      this.tone(70, .5, 'sawtooth', .07); this.tone(105, .35, 'triangle', .045, .06);
    } else if (name === 'crate' || name === 'code') {
      [440, 554, 659, 880].forEach((f, i) => this.tone(f, .35, 'sine', .055, i * .07));
    } else if (name === 'boss') {
      [98, 92, 87, 82].forEach((f, i) => this.tone(f, .8, 'sawtooth', .09, i * .16));
    } else if (name === 'buff') {
      [523, 784, 1047].forEach((f, i) => this.tone(f, .6, 'sine', .05, i * .09));
    } else if (name === 'photo') {
      this.tone(1200, .06, 'sine', .05); this.tone(700, .1, 'sine', .04, .05);
    }
  }
}
