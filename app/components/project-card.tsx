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
      style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}
      onMouseEnter={() => setPlaying(true)}
      onMouseLeave={() => setPlaying(false)}
      onFocus={() => setPlaying(true)}
      onBlur={() => setPlaying(false)}
      className="group card rounded-[28px] p-2"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-bg">
        {images.length > 0 ? (
          images.map((img, j) => (
            <Image
              key={img.src}
              src={img.src}
              alt={j === frame ? img.alt : ""}
              aria-hidden={j !== frame}
              fill
              sizes="(min-width: 1560px) 620px, (min-width: 1024px) 1000px, 100vw"
              className="object-cover object-left-top transition-[opacity,scale] duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.015]"
              style={{ opacity: j === frame ? 1 : 0 }}
            />
          ))
        ) : (
          <div
            className="flex h-full items-end p-6"
            style={{
              background: `radial-gradient(120% 90% at 20% 15%, ${p.palette[1]} 0%, transparent 60%), linear-gradient(135deg, ${p.palette[0]}, ${p.palette[1]})`,
            }}
          >
            <span className="font-display text-5xl font-semibold text-white">{p.title}</span>
          </div>
        )}

        {current && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 font-display text-sm font-semibold text-[#121212] shadow-sm backdrop-blur">
            {current.caption ?? p.title}
          </span>
        )}

        {images.length > 1 && (
          <div className="absolute right-3 top-3 flex items-center rounded-full bg-white/90 px-1.5 shadow-sm backdrop-blur">
            {images.map((img, j) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setFrame(j)}
                aria-label={`Show ${img.caption ?? `screenshot ${j + 1}`}`}
                aria-pressed={j === frame}
                className="grid h-7 place-items-center px-1"
              >
                <span
                  className={`block h-1.5 rounded-full bg-[#121212] transition-all duration-500 ${
                    j === frame ? "w-5" : "w-1.5 opacity-25"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-start gap-4 px-4 pb-4 pt-5 sm:px-5">
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
            {p.tags.slice(0, 2).join(" · ")}
          </p>
          <h3 className="mt-1 font-display text-3xl font-semibold leading-none tracking-tight sm:text-[2.5rem]">
            {p.href ? (
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                {p.title}
              </a>
            ) : (
              p.title
            )}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">{p.summary}</p>
          <div className="mt-4 flex flex-wrap gap-1.5 font-display text-sm font-semibold">
            <span className="rounded-full bg-bg px-3 py-1">{p.year}</span>
            <span className="rounded-full bg-bg px-3 py-1 text-ink-soft">{p.role}</span>
            {p.tags.slice(2).map((t) => (
              <span key={t} className="rounded-full bg-bg px-3 py-1 text-ink-soft">
                {t}
              </span>
            ))}
            {p.placeholder && (
              <span className="rounded-full bg-accent-soft px-3 py-1 text-accent">Placeholder</span>
            )}
          </div>
        </div>

        {p.href && (
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            aria-hidden
            className="grid size-14 shrink-0 place-items-center rounded-2xl bg-ink text-bg transition-colors duration-300 group-hover:bg-accent group-hover:text-white"
          >
            <ArrowUpRight width={22} height={22} className="transition-transform duration-500 group-hover:rotate-45" />
          </a>
        )}
      </div>
    </article>
  );
}
