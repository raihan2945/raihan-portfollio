// Tiny UI sound engine. Every sound is synthesised with the Web Audio API,
// so there are no audio files to download.
//
// Browsers only let audio start after a real user gesture (click, tap, key).
// Scrolling with a wheel or trackpad doesn't count, so the page stays silent
// until the visitor first interacts; `unlockAudio` is called on those gestures.

export type Sound = "tick" | "hover" | "click" | "section" | "toggle";

const KEY = "sound";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let enabled: boolean | null = null;
const listeners = new Set<() => void>();

/** Sound is on unless the visitor muted it. Kept in memory too, in case storage is blocked. */
export function soundEnabled(): boolean {
  if (enabled === null) {
    try {
      enabled = localStorage.getItem(KEY) !== "off";
    } catch {
      enabled = true;
    }
  }
  return enabled;
}

export function setSoundEnabled(on: boolean) {
  enabled = on;
  try {
    localStorage.setItem(KEY, on ? "on" : "off");
  } catch {}
  listeners.forEach((l) => l());
}

export function subscribeSound(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

/** Create or resume the audio context. Call from a user-gesture handler. */
export function unlockAudio() {
  if (!ctx) {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.7;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
}

/** One enveloped oscillator: quick attack, exponential decay, optional pitch glide. */
function tone(
  a: AudioContext,
  out: AudioNode,
  { from, to = from, dur, gain, type = "sine", delay = 0 }: {
    from: number;
    to?: number;
    dur: number;
    gain: number;
    type?: OscillatorType;
    delay?: number;
  },
) {
  const t = a.currentTime + delay;
  const osc = a.createOscillator();
  const env = a.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(from, t);
  if (to !== from) osc.frequency.exponentialRampToValueAtTime(to, t + dur);
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(gain, t + 0.004);
  env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(env).connect(out);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

/** Minimum gap per sound, so a nav jump across several sections chimes once. */
const minGapMs: Partial<Record<Sound, number>> = { section: 700, hover: 40 };
const lastPlayed: Partial<Record<Sound, number>> = {};

export function playSound(kind: Sound) {
  if (!ctx || !master || ctx.state !== "running" || !soundEnabled()) return;
  const now = performance.now();
  if (now - (lastPlayed[kind] ?? -Infinity) < (minGapMs[kind] ?? 0)) return;
  lastPlayed[kind] = now;
  const a = ctx;
  const out = master;
  const jitter = () => 1 + (Math.random() - 0.5) * 0.08;

  switch (kind) {
    case "tick": // a soft detent, like a scroll wheel
      tone(a, out, { from: 1900 * jitter(), to: 1300, dur: 0.028, gain: 0.03, type: "triangle" });
      break;
    case "hover": // a faint blip
      tone(a, out, { from: 1250 * jitter(), to: 1500, dur: 0.05, gain: 0.018 });
      break;
    case "click": // a rounded pop with a little click on top
      tone(a, out, { from: 560, to: 260, dur: 0.12, gain: 0.07 });
      tone(a, out, { from: 1800, to: 900, dur: 0.04, gain: 0.012, type: "triangle" });
      break;
    case "section": // a two-note chime as a new section comes into view
      tone(a, out, { from: 784, dur: 0.4, gain: 0.03 });
      tone(a, out, { from: 1175, dur: 0.55, gain: 0.025, delay: 0.08 });
      break;
    case "toggle": // a quick upward sweep
      tone(a, out, { from: 320, to: 980, dur: 0.18, gain: 0.05 });
      break;
  }
}
