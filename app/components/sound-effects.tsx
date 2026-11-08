"use client";

import { useEffect } from "react";
import { playSound, unlockAudio } from "./sound";

/** Pixels scrolled per tick, and the minimum gap between ticks. */
const TICK_EVERY = 120;
const TICK_GAP_MS = 55;

/**
 * Page-wide sound effects: ticks while scrolling, a blip when the mouse moves
 * onto a link or button, and a pop on click. Renders nothing.
 *
 * Elements can opt out with `data-sound="none"` or ask for a different click
 * sound with `data-sound="toggle"`.
 */
export function SoundEffects() {
  useEffect(() => {
    const gestures = ["pointerdown", "keydown", "touchend"] as const;
    gestures.forEach((g) => window.addEventListener(g, unlockAudio, { passive: true }));

    let lastY = window.scrollY;
    let travelled = 0;
    let lastTick = 0;
    const onScroll = () => {
      const y = window.scrollY;
      travelled += Math.abs(y - lastY);
      lastY = y;
      if (travelled < TICK_EVERY) return;
      const now = performance.now();
      if (now - lastTick < TICK_GAP_MS) return;
      travelled = 0;
      lastTick = now;
      playSound("tick");
    };

    let hovered: Element | null = null;
    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = e.target instanceof Element ? e.target.closest("a, button") : null;
      if (el === hovered) return;
      hovered = el;
      if (el && el.getAttribute("data-sound") !== "none") playSound("hover");
    };

    const onClick = (e: MouseEvent) => {
      const el = e.target instanceof Element ? e.target.closest("a, button") : null;
      if (!el) return;
      const kind = el.getAttribute("data-sound");
      if (kind === "none") return;
      playSound(kind === "toggle" ? "toggle" : "click");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("click", onClick);
    return () => {
      gestures.forEach((g) => window.removeEventListener(g, unlockAudio));
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
