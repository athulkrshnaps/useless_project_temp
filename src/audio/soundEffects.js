// Authentic Elephant Acoustic Audio Synthesizer & Custom Audio Loader for ElephantFit
// - Preloads custom audio files at startup so playback is instant with zero latency
// - Seamlessly falls back to procedural bioacoustic Web Audio API oscillators if files are absent

class ElephantSoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    // Preloaded audio elements - one per sound name
    this._pool = {};
    // Kick off preloading as soon as the module loads
    if (typeof window !== 'undefined') {
      ['rumble', 'trumpet', 'footstep', 'chime', 'warning'].forEach(name => {
        this._preload(name);
      });
    }
  }

  // Preload a sound file into the pool (mp3 first, wav fallback)
  _preload(name) {
    const audio = new window.Audio();
    audio.preload = 'auto';
    audio.volume = 1.0;

    // If mp3 fails to load, switch to wav
    audio.addEventListener('error', () => {
      const wav = new window.Audio();
      wav.preload = 'auto';
      wav.volume = 1.0;
      wav.src = `/audio/${name}.wav`;
      wav.load();
      this._pool[name] = wav;
    }, { once: true });

    audio.src = `/audio/${name}.mp3`;
    audio.load();
    this._pool[name] = audio;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  // Play preloaded audio or fall back to Web Audio synthesis
  playCustomOrSynthesized(name, synthFallback) {
    if (this.muted) return;

    // Always call init() synchronously to unblock AudioContext on user gesture
    this.init();

    const audio = this._pool[name];
    if (audio && audio.src) {
      // Reset to start so re-clicking always replays from beginning
      audio.currentTime = 0;
      audio.volume = 1.0;
      const p = audio.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => {
          // File missing or blocked - fall back to synthesis
          synthFallback();
        });
      }
      return;
    }

    synthFallback();
  }

  // Authentic Elephant Low-Frequency Chest Rumble (Infrasonic Contact Call)
  playDeepRumble() {
    this.playCustomOrSynthesized('rumble', () => {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const subOsc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      subOsc.type = 'sine';

      osc.frequency.setValueAtTime(36, now);
      osc.frequency.linearRampToValueAtTime(28, now + 0.8);
      osc.frequency.linearRampToValueAtTime(24, now + 1.6);

      subOsc.frequency.setValueAtTime(45, now);
      subOsc.frequency.linearRampToValueAtTime(34, now + 1.6);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(95, now);
      filter.frequency.linearRampToValueAtTime(65, now + 1.5);
      filter.Q.setValueAtTime(4.0, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.4, now + 0.3);
      gain.gain.setValueAtTime(0.38, now + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      osc.connect(filter);
      subOsc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      subOsc.start(now);
      osc.stop(now + 1.9);
      subOsc.stop(now + 1.9);
    });
  }

  // Authentic Elephant Trumpet Call
  playAuthenticTrumpet() {
    this.playCustomOrSynthesized('trumpet', () => {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(320, now);
      osc1.frequency.exponentialRampToValueAtTime(580, now + 0.18);
      osc1.frequency.linearRampToValueAtTime(510, now + 0.45);
      osc1.frequency.exponentialRampToValueAtTime(680, now + 0.7);

      osc2.frequency.setValueAtTime(324, now);
      osc2.frequency.exponentialRampToValueAtTime(584, now + 0.18);
      osc2.frequency.linearRampToValueAtTime(514, now + 0.45);
      osc2.frequency.exponentialRampToValueAtTime(684, now + 0.7);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(850, now);
      filter.Q.setValueAtTime(2.8, now);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.linearRampToValueAtTime(0.35, now + 0.12);
      gain.gain.setValueAtTime(0.32, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.0);
      osc2.stop(now + 1.0);
    });
  }

  // Heavy Resonant Footstep
  playFootstepRumble() {
    this.playCustomOrSynthesized('footstep', () => {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(65, now);
      osc.frequency.exponentialRampToValueAtTime(22, now + 0.18);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    });
  }

  // Friendly gym chime for workout increments
  playChime() {
    this.playCustomOrSynthesized('chime', () => {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    });
  }

  // Peanut warning alert
  playWarning() {
    this.playCustomOrSynthesized('warning', () => {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.setValueAtTime(210, now + 0.1);
      osc.frequency.setValueAtTime(260, now + 0.2);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.38);
    });
  }

  // Aliases for backwards compatibility and bug prevention
  playTrumpet() {
    this.playAuthenticTrumpet();
  }

  playStomp() {
    this.playFootstepRumble();
  }

  playCrunch() {
    this.playDeepRumble();
  }

  playCelebration() {
    this.playAuthenticTrumpet();
  }
}

export const sounds = new ElephantSoundEngine();
