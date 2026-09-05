import { PresetSound } from '../config/intervention.config';

let currentAudio: HTMLAudioElement | null = null;
let currentSynthStop: (() => void) | null = null;

export function stopCurrentSound() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (currentSynthStop) {
    currentSynthStop();
    currentSynthStop = null;
  }
}

export function playSoundCue(sound: PresetSound, onEnd?: () => void) {
  stopCurrentSound();

  if (!sound.audioSrc) return;

  if (sound.audioSrc.startsWith('synth:')) {
    const type = sound.audioSrc.replace('synth:', '');
    playSynthSound(type, onEnd);
    return;
  }

  try {
    const audio = new Audio(sound.audioSrc);
    currentAudio = audio;

    audio.onended = () => {
      if (currentAudio === audio) {
        currentAudio = null;
      }
      onEnd?.();
    };

    audio.onerror = (e) => {
      console.warn("Audio playback error, falling back to synth chime:", e);
      playSynthSound('bell', onEnd);
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Autoplay blocked or audio error:", err);
        playSynthSound('bell', onEnd);
      });
    }
  } catch (err) {
    console.error("Failed to play sound:", err);
    playSynthSound('bell', onEnd);
  }
}

function playSynthSound(type: string, onEnd?: () => void) {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) {
      onEnd?.();
      return;
    }
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === 'bell' || type === 'chime') {
      const frequencies = [587.33, 880, 1174.66, 1760];
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const initialGain = 0.25 / (idx + 1);
        gain.gain.setValueAtTime(initialGain, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 2.5);
      });

      const timer = setTimeout(() => {
        onEnd?.();
      }, 2500);
      currentSynthStop = () => clearTimeout(timer);
    } else if (type === 'gong') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 3);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 3);

      const timer = setTimeout(() => {
        onEnd?.();
      }, 3000);
      currentSynthStop = () => clearTimeout(timer);
    } else {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.15);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);

      const timer = setTimeout(() => {
        onEnd?.();
      }, 300);
      currentSynthStop = () => clearTimeout(timer);
    }
  } catch (e) {
    console.error("Web Audio error:", e);
    onEnd?.();
  }
}
