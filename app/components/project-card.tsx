"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Project } from "@/content/site";
import { ArrowUpRight, ChevronLeft, ChevronRight, ExpandIcon } from "./icons";
import { ProjectGallery } from "./project-gallery";

const FRAME_MS = 2200;
const SWIPE_PX = 40;

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribeReduced(cb: () => void) {
  const m = window.matchMedia(REDUCED);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}

/**
 * A work card. Hovering (or focusing) it steps through the project's
 * screenshots, with a progress bar showing the next change. Arrows, dots and
 * a horizontal swipe switch screenshots directly; clicking the preview opens
 * the full-screen gallery at the screenshot showing.
 */
export function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const images = p.images ?? [];
  const n = images.length;
  const [frame, setFrame] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  // The gallery mounts on first open and then stays, so it can animate closed.
  const [galleryMounted, setGalleryMounted] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);
  const swipe = useRef<{ x: number; y: number; swiped: boolean } | null>(null);

  const autoplay = hovered && !open && !reduced && n > 1;

  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(() => setFrame((f) => (f + 1) % n), FRAME_MS);
    return () => clearTimeout(id);
  }, [autoplay, frame, n]);

  const current = images[frame];
  const step = (d: number) => setFrame((f) => (f + d + n) % n);

  function openGallery() {
    setGalleryMounted(true);
    setOpen(true);
  }

  const control =
    "grid size-8 place-items-center rounded-full bg-white/90 text-[#121212] shadow-sm backdrop-blur transition-[opacity,scale] duration-300 hover:scale-110";

  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${(index % 3) * 70}ms` } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="group card flex flex-col rounded-3xl p-1.5 transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgb(0_0_0/0.18)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] border border-line bg-bg">
        {n > 0 ? (
          images.map((img, j) => (
            <Image
              key={img.src}
              src={img.src}
              alt={j === frame ? img.alt : ""}
              aria-hidden={j !== frame}
              fill
              sizes="(min-width: 1560px) 400px, (min-width: 1280px) 380px, (min-width: 1024px) 560px, 100vw"
              className="object-cover object-left-top transition-[opacity,scale] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
              style={{ opacity: j === frame ? 1 : 0 }}
            />
          ))
        ) : (
          <div
            className="flex h-full items-end p-5"
            style={{
              background: `radial-gradient(120% 90% at 20% 15%, ${p.palette[1]} 0%, transparent 60%), linear-gradient(135deg, ${p.palette[0]}, ${p.palette[1]})`,
            }}
          >
            <span className="font-display text-3xl font-semibold text-white">{p.title}</span>
          </div>
        )}

        {n > 0 && (
          <>
            {/* The whole preview opens the gallery; a horizontal drag swipes instead. */}
            <button
              type="button"
              aria-label={`Open ${p.title} gallery, ${n} screenshot${n === 1 ? "" : "s"}`}
              onPointerDown={(e) => {
                swipe.current = { x: e.clientX, y: e.clientY, swiped: false };
              }}
              onPointerUp={(e) => {
                const s = swipe.current;
                if (!s || n < 2) return;
                const dx = e.clientX - s.x;
                if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(e.clientY - s.y)) {
                  s.swiped = true;
                  step(dx < 0 ? 1 : -1);
                }
              }}
              onClick={() => {
                if (swipe.current?.swiped) return;
                openGallery();
              }}
              className="absolute inset-0 z-[1] cursor-zoom-in touch-pan-y rounded-[18px] outline-offset-[-3px]"
            />

            <span className="pointer-events-none absolute right-2.5 top-2.5 z-[2] flex items-center gap-1.5 rounded-full bg-[#121212]/75 px-2.5 py-1 font-display text-xs font-semibold text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 pointer-coarse:opacity-100">
              <ExpandIcon width={12} height={12} strokeWidth={2} />
              {n > 1 ? `${frame + 1} / ${n}` : "View"}
            </span>

            {autoplay && (
              <span
                key={frame}
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[3px] origin-left bg-accent"
                style={{ animation: `card-progress ${FRAME_MS}ms linear both` }}
              />
            )}

            <span className="pointer-events-none absolute bottom-2.5 left-2.5 z-[2] max-w-[55%] truncate rounded-full bg-white/90 px-2.5 py-0.5 font-display text-xs font-semibold text-[#121212] shadow-sm backdrop-blur">
              {current?.caption ?? p.title}
            </span>
          </>
        )}

        {n > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous screenshot"
              className={`${control} absolute left-2.5 top-1/2 z-[2] -translate-y-1/2 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 pointer-coarse:hidden`}
            >
              <ChevronLeft width={16} height={16} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next screenshot"
              className={`${control} absolute right-2.5 top-1/2 z-[2] -translate-y-1/2 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 pointer-coarse:hidden`}
            >
              <ChevronRight width={16} height={16} />
            </button>

            <div className="absolute bottom-2.5 right-2.5 z-[2] flex items-center rounded-full bg-white/90 px-1 shadow-sm backdrop-blur">
              {images.map((img, j) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setFrame(j)}
                  aria-label={`Show ${img.caption ?? `screenshot ${j + 1}`}`}
                  aria-pressed={j === frame}
                  className="grid h-6 place-items-center px-[3px]"
                >
                  <span
                    className={`block h-1 rounded-full bg-[#121212] transition-all duration-500 ${
                      j === frame ? "w-4" : "w-1 opacity-25"
                    }`}
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {galleryMounted && (
        <ProjectGallery project={p} open={open} index={frame} onIndex={setFrame} onClose={() => setOpen(false)} />
      )}

      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
              {p.tags.slice(0, 2).join(" · ")}
            </p>
            <h3 className="mt-1 font-display text-[1.4rem] font-semibold leading-tight tracking-tight">
              {p.href ? (
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                  {p.title}
                </a>
              ) : (
                p.title
              )}
            </h3>
          </div>

          {p.href && (
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              aria-hidden
              className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-ink-soft transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-bg"
            >
              <ArrowUpRight width={16} height={16} className="transition-transform duration-500 group-hover:rotate-45" />
            </a>
          )}
        </div>

        <p className="mb-4 mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft" title={p.summary}>
          {p.summary}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5 border-t border-line pt-3.5 font-display text-xs font-semibold">
          <span className="rounded-full bg-ink px-2.5 py-1 text-bg">{p.year}</span>
          <span className="rounded-full bg-bg px-2.5 py-1 text-ink-soft">{p.role}</span>
          {p.tags.slice(2).map((t) => (
            <span key={t} className="rounded-full bg-bg px-2.5 py-1 text-ink-soft">
              {t}
            </span>
          ))}
          {p.placeholder && <span className="rounded-full bg-accent-soft px-2.5 py-1 text-accent">Placeholder</span>}
        </div>
      </div>
    </article>
  );
}
