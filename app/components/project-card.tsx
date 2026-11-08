"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Project } from "@/content/site";
import { ArrowUpRight } from "./icons";

const FRAME_MS = 1800;

/**
 * A work card. Hovering (or focusing) it steps through the project's
 * screenshots; the dots switch screenshots directly, including on touch.
 */
export function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const images = p.images ?? [];
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || images.length < 2) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % images.length), FRAME_MS);
    return () => clearInterval(id);
  }, [playing, images.length]);

  const current = images[frame];

  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${(index % 3) * 70}ms` } as React.CSSProperties}
      onMouseEnter={() => setPlaying(true)}
      onMouseLeave={() => setPlaying(false)}
      onFocus={() => setPlaying(true)}
      onBlur={() => setPlaying(false)}
      className="group card flex flex-col rounded-3xl p-1.5 transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgb(0_0_0/0.18)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] border border-line bg-bg">
        {images.length > 0 ? (
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

        {current && (
          <span className="absolute bottom-2.5 left-2.5 rounded-full bg-white/90 px-2.5 py-0.5 font-display text-xs font-semibold text-[#121212] shadow-sm backdrop-blur">
            {current.caption ?? p.title}
          </span>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-2.5 right-2.5 flex items-center rounded-full bg-white/90 px-1 shadow-sm backdrop-blur">
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
        )}
      </div>

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
