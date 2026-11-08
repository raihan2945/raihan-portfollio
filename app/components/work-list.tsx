"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/site";

export function WorkList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  // Ease the floating preview toward the cursor.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = pos.current;
      p.x += (p.tx - p.x) * 0.14;
      p.y += (p.ty - p.y) * 0.14;
      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function onMove(e: React.MouseEvent) {
    pos.current.tx = e.clientX;
    pos.current.ty = e.clientY;
  }

  return (
    <div
      className="relative"
      onMouseEnter={(e) => {
        // Snap to the cursor on entry so the preview doesn't glide in from (0,0).
        Object.assign(pos.current, { x: e.clientX, y: e.clientY, tx: e.clientX, ty: e.clientY });
      }}
      onMouseMove={onMove}
      onMouseLeave={() => setActive(null)}
    >
      <ul className="border-t border-line">
        {projects.map((p, i) => {
          const Row = p.href ? "a" : "div";
          return (
            <li
              key={p.slug}
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <Row
                {...(p.href ? { href: p.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                tabIndex={p.href ? undefined : 0}
                className={`group grid grid-cols-12 items-baseline gap-x-4 gap-y-2 border-b border-line py-7 outline-none transition-colors duration-500 sm:py-9 ${
                  active !== null && active !== i ? "text-ink-faint" : ""
                }`}
              >
                <span className="col-span-2 font-mono text-xs text-ink-faint sm:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="col-span-10 sm:col-span-6">
                  <h3 className="text-3xl font-medium tracking-tight transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-3 group-focus-visible:translate-x-3 sm:text-5xl">
                    {p.title}
                    <span className="font-serif-italic ml-2 text-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                      ↗
                    </span>
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">{p.summary}</p>
                </div>

                <div className="col-span-10 col-start-3 flex flex-wrap gap-1.5 sm:col-span-3 sm:col-start-auto">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft"
                    >
                      {t}
                    </span>
                  ))}
                  {p.placeholder && (
                    <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
                      Placeholder
                    </span>
                  )}
                </div>

                <div className="col-span-10 col-start-3 flex justify-between font-mono text-xs text-ink-faint sm:col-span-2 sm:col-start-auto sm:flex-col sm:items-end sm:gap-1">
                  <span>{p.role}</span>
                  <span>{p.year}</span>
                </div>
              </Row>
            </li>
          );
        })}
      </ul>

      {/* Cursor-following preview (pointer devices only) */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden [@media(hover:hover)]:block"
      >
        <div
          className={`relative h-56 w-80 overflow-hidden rounded-2xl shadow-2xl shadow-black/20 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
            active === null ? "scale-75 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          {projects.map((p, i) => (
            <div
              key={p.slug}
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                opacity: active === i ? 1 : 0,
                background: p.image
                  ? `center / cover no-repeat url(${p.image})`
                  : `radial-gradient(120% 90% at 20% 15%, ${p.palette[1]} 0%, transparent 60%), linear-gradient(135deg, ${p.palette[0]}, ${p.palette[1]})`,
              }}
            >
              {!p.image && (
                <div className="flex h-full flex-col justify-between p-5 text-white">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-80">
                    {p.tags.join(" · ")}
                  </span>
                  <span className="font-serif-italic text-4xl leading-none">{p.title}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
