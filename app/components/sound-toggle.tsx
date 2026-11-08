"use client";

import { useSyncExternalStore } from "react";
import { playSound, setSoundEnabled, soundEnabled, subscribeSound, unlockAudio } from "./sound";
import { SoundOffIcon, SoundOnIcon } from "./icons";

export function SoundToggle({ className = "" }: { className?: string }) {
  // The server can't know the visitor's choice, so it renders "on" and the
  // client corrects it after hydration.
  const on = useSyncExternalStore(subscribeSound, soundEnabled, () => true);

  function toggle() {
    unlockAudio();
    setSoundEnabled(!on);
    if (!on) playSound("toggle");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      data-sound="none"
      aria-label="Sound effects"
      aria-pressed={on}
      title={on ? "Mute sound effects" : "Turn on sound effects"}
      className={className}
    >
      {on ? <SoundOnIcon width={17} height={17} /> : <SoundOffIcon width={17} height={17} />}
    </button>
  );
}
