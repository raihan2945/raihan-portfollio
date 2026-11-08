"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/content/site";
import { ArrowUpRight, ChevronLeft, ChevronRight, CloseIcon, ZoomInIcon, ZoomOutIcon } from "./icons";
import { playSound } from "./sound";

/** How far the zoom magnifies, and how far a swipe must travel to change slide. */
const ZOOM = 2.2;
const SWIPE_PX = 50;

type Zoom = { on: boolean; x: number; y: number };
const ZOOMED_OUT: Zoom = { on: false, x: 50, y: 50 };

const clamp = (n: number) => Math.min(100, Math.max(0, n));

/**
 * Full-screen screenshot viewer for one project, built on a native modal
 * <dialog> (top layer, focus trap, Esc to close, focus returns to the opener).
 *
 * Arrows / Home / End and swipes change slide; clicking the image zooms in at
 * that point. While zoomed, a mouse pans by moving and a finger pans by dragging.
 * The slide index is owned by the card, so closing leaves the card on the last
 * screenshot viewed.
 */
export function ProjectGallery({
  project: p,
  open,
  index,
  onIndex,
  onClose,
}: {
  project: Project;
  open: boolean;
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const images = p.images ?? [];
  const n = images.length;
  const dialog = useRef<HTMLDialogElement>(null);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const drag = useRef<{ id: number; x: number; y: number; ox: number; oy: number; moved: boolean } | null>(null);
  const [zoom, setZoom] = useState<Zoom>(ZOOMED_OUT);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    else if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    thumbs.current[index]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [open, index]);

  const current = images[index];
  if (!current) return null;

  function go(i: number, tick = false) {
    const next = (i + n) % n;
    if (next === index) return;
    setZoom(ZOOMED_OUT);
    onIndex(next);
    if (tick) playSound("tick");
  }

  function toggleZoom(x = 50, y = 50) {
    setZoom((z) => (z.on ? { ...z, on: false } : { on: true, x, y }));
  }

  /** Pointer position as a percentage of the image's own (untransformed) box. */
  function pointAt(e: React.PointerEvent<HTMLElement>) {
    const el = e.currentTarget;
    return { x: clamp((e.nativeEvent.offsetX / el.offsetWidth) * 100), y: clamp((e.nativeEvent.offsetY / el.offsetHeight) * 100) };
  }

  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (e.button !== 0) return;
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, ox: zoom.x, oy: zoom.y, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    // A zoomed mouse pans by hovering: the spot under the cursor stays put.
    if (zoom.on && e.pointerType === "mouse") {
      setZoom({ on: true, ...pointAt(e) });
      if (drag.current) drag.current.moved = true;
      return;
    }
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.hypot(dx, dy) > 6) d.moved = true;
    if (zoom.on) {
      // Drag to pan: shifting the origin by δ moves the content by −(ZOOM−1)·δ.
      const el = e.currentTarget;
      setZoom({
        on: true,
        x: clamp(d.ox - (dx / (ZOOM - 1) / el.offsetWidth) * 100),
        y: clamp(d.oy - (dy / (ZOOM - 1) / el.offsetHeight) * 100),
      });
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved) {
      const at = pointAt(e);
      toggleZoom(at.x, at.y);
    } else if (!zoom.on && Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) {
      go(index + (dx < 0 ? 1 : -1), true);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: n - 1 };
    if (e.key in keys) {
      e.preventDefault();
      go(keys[e.key], true);
    } else if (e.key === "z" || e.key === "Z") {
      toggleZoom();
    }
  };

  /** Clicks on empty space (not the image or a control) close the viewer. */
  const closeOnEmpty = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const arrow =
    "grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur transition-colors hover:bg-white hover:text-[#121212] disabled:pointer-events-none disabled:opacity-0";

  return createPortal(
    <dialog
      ref={dialog}
      aria-label={`${p.title} screenshots`}
      onClose={() => {
        setZoom(ZOOMED_OUT);
        onClose();
      }}
      onKeyDown={onKeyDown}
      onClick={closeOnEmpty}
      className="gallery m-0 size-full max-h-none max-w-none overflow-hidden border-0 bg-transparent p-0 text-white"
    >
      <div className="flex h-full flex-col" onClick={closeOnEmpty}>
        {/* Top bar */}
        <header className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-baseline gap-3">
            <h2 className="truncate font-display text-xl font-semibold tracking-tight sm:text-2xl">{p.title}</h2>
            <span className="shrink-0 font-display text-sm font-semibold tabular-nums text-white/50">
              {index + 1} / {n}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {p.href && (
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center gap-1.5 rounded-full bg-white/10 px-4 font-display text-sm font-semibold ring-1 ring-white/15 transition-colors hover:bg-white hover:text-[#121212]"
              >
                <span className="hidden sm:inline">Visit site</span>
                <ArrowUpRight width={16} height={16} />
              </a>
            )}
            <button
              type="button"
              onClick={() => toggleZoom()}
              aria-label={zoom.on ? "Zoom out" : "Zoom in"}
              aria-pressed={zoom.on}
              title={zoom.on ? "Zoom out (Z)" : "Zoom in (Z)"}
              className="hidden size-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 transition-colors hover:bg-white hover:text-[#121212] sm:grid"
            >
              {zoom.on ? <ZoomOutIcon /> : <ZoomInIcon />}
            </button>
            <button
              type="button"
              autoFocus
              onClick={onClose}
              aria-label="Close"
              title="Close (Esc)"
              className="grid size-10 place-items-center rounded-full bg-white text-[#121212] transition-transform hover:rotate-90"
            >
              <CloseIcon />
            </button>
          </div>
        </header>

        {/* Stage */}
        <div className="relative grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)] overflow-hidden px-3 py-2 sm:px-20" onClick={closeOnEmpty}>
          <div className="gallery-frame grid min-h-0 grid-rows-[minmax(0,1fr)] place-items-center" onClick={closeOnEmpty}>
            {images.map((img, j) => {
              const active = j === index;
              return (
                <Image
                  key={img.src}
                  src={img.src}
                  alt={active ? img.alt : ""}
                  aria-hidden={!active}
                  width={1920}
                  height={1080}
                  sizes="100vw"
                  draggable={false}
                  onPointerDown={active ? onPointerDown : undefined}
                  onPointerMove={active ? onPointerMove : undefined}
                  onPointerUp={active ? onPointerUp : undefined}
                  onPointerCancel={() => (drag.current = null)}
                  className={`col-start-1 row-start-1 h-auto max-h-full w-auto max-w-full select-none rounded-xl shadow-[0_16px_40px_-16px_rgb(0_0_0/0.6)] ring-1 ring-white/10 transition-[opacity,scale,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                    active
                      ? `${zoom.on ? "cursor-zoom-out touch-none" : "cursor-zoom-in touch-pan-y"}`
                      : "pointer-events-none scale-[0.97] opacity-0"
                  }`}
                  style={
                    active
                      ? { transform: `scale(${zoom.on ? ZOOM : 1})`, transformOrigin: `${zoom.x}% ${zoom.y}%` }
                      : undefined
                  }
                />
              );
            })}
          </div>

          {n > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous screenshot"
                className={`${arrow} absolute left-2 top-1/2 -translate-y-1/2 sm:left-5`}
                disabled={zoom.on}
              >
                <ChevronLeft width={20} height={20} />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next screenshot"
                className={`${arrow} absolute right-2 top-1/2 -translate-y-1/2 sm:right-5`}
                disabled={zoom.on}
              >
                <ChevronRight width={20} height={20} />
              </button>
            </>
          )}
        </div>

        {/* Caption + thumbnails */}
        <footer className="px-4 pb-4 pt-4 sm:px-6 sm:pb-5" onClick={closeOnEmpty}>
          <div aria-live="polite" className="mx-auto max-w-3xl text-center">
            <p className="font-display text-lg font-semibold">{current.caption ?? p.title}</p>
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-white/55">{current.alt}</p>
          </div>

          {n > 1 && (
            <div className="mt-4 flex justify-center">
              <div className="flex max-w-full gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none]">
                {images.map((img, j) => (
                  <button
                    key={img.src}
                    ref={(el) => {
                      thumbs.current[j] = el;
                    }}
                    type="button"
                    onClick={() => go(j)}
                    aria-label={`Show ${img.caption ?? `screenshot ${j + 1}`}`}
                    aria-current={j === index}
                    className={`relative aspect-[16/10] w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition-[opacity,box-shadow] duration-300 sm:w-24 ${
                      j === index ? "opacity-100 ring-white" : "opacity-45 ring-transparent hover:opacity-80"
                    }`}
                  >
                    <Image src={img.src} alt="" fill sizes="96px" className="object-cover object-left-top" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="mt-3 hidden text-center text-xs text-white/35 sm:block">
            ← → to browse · click the image or press Z to zoom · Esc to close
          </p>
        </footer>
      </div>
    </dialog>,
    document.body,
  );
}
