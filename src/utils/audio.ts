// Procedural Web Audio API sound generator - 100% offline, zero asset dependencies

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private melodyTimer: any = null;
  private isMelodyPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopMelody();
    } else {
      this.initCtx();
      this.startMelody();
      this.playChime();
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  // Play a soft sweet chime for buttons, stickers, or cards
  public playChime(freq = 880) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.15);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch {
      // Audio fallback
    }
  }

  // Gentle music box tune playing in loop
  public startMelody() {
    if (this.isMuted || this.isMelodyPlaying) return;
    this.initCtx();
    if (!this.ctx) return;

    this.isMelodyPlaying = true;
    // Pentatonic scale frequencies: C5, D5, E5, G5, A5, C6
    const notes = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
    let noteIndex = 0;

    const playNext = () => {
      if (this.isMuted || !this.isMelodyPlaying || !this.ctx) return;

      const f = notes[noteIndex % notes.length];
      noteIndex++;

      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now);

        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.2);
      } catch {
        // Fallback
      }

      this.melodyTimer = setTimeout(playNext, 1800 + Math.random() * 400);
    };

    playNext();
  }

  public stopMelody() {
    this.isMelodyPlaying = false;
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
  }
}

export const soundFx = new SoundController();
