import { Fragment } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import portrait from "./asset/raihan.webp";
import { CopyEmail } from "./components/copy-email";
import { ArrowUpRight, SocialIcon } from "./components/icons";
import { ProjectCard } from "./components/project-card";
import { RevealObserver } from "./components/reveal-observer";
import { SideNav } from "./components/side-nav";
import { SoundEffects } from "./components/sound-effects";

function delay(ms: number) {
  return { "--reveal-delay": `${ms}ms` } as React.CSSProperties;
}

function rise(ms: number) {
  return { "--rise-delay": `${ms}ms` } as React.CSSProperties;
}

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.16em] text-ink-soft ${className}`}
    >
      <span className="size-1.5 rounded-full bg-accent" />
      {children}
    </p>
  );
}

/** Section heading: eyebrow tucked into the first line, words lit on scroll. */
function SectionHead({ label, text }: { label: string; text: string }) {
  const words = text.split(" ");
  return (
    <div data-reveal className="relative">
      <Eyebrow className="mb-4 sm:absolute sm:left-0 sm:top-[0.85rem] sm:mb-0">{label}</Eyebrow>
      <h2 className="lit font-display text-[clamp(1.9rem,4.4vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.01em] sm:indent-[11rem]">
        {words.map((w, i) => (
          <Fragment key={i}>
            <span
              className="lit-word"
              style={{ "--p": words.length > 1 ? i / (words.length - 1) : 0 } as React.CSSProperties}
            >
              {w}
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </h2>
    </div>
  );
}

function ProfileCard() {
  const firstName = site.name.split(" ")[0];
  return (
    <div className="card rise mx-auto flex h-full max-w-md flex-col gap-5 rounded-[28px] p-5 sm:p-6 lg:max-w-none">
      <div className="flex items-center justify-between gap-3">
        <a
          href="#top"
          aria-label={`${site.name}, back to top`}
          className="grid size-11 place-items-center rounded-full bg-ink font-display text-base font-bold tracking-wide text-bg transition-transform duration-700 hover:rotate-[360deg]"
        >
          {site.initials}
        </a>
        {site.available && (
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2 font-display text-sm font-semibold text-ink-soft">
            <span className="pulse-dot relative size-1.5 rounded-full bg-accent text-accent" />
            {site.availabilityText}
          </p>
        )}
      </div>

      <div className="relative aspect-[1/0.95] overflow-hidden rounded-[22px] bg-[#1d2129] lg:aspect-auto lg:min-h-0 lg:flex-1">
        <Image
          src={portrait}
          alt={`Portrait of ${site.name}`}
          fill
          sizes="(min-width: 1024px) 340px, 448px"
          placeholder="blur"
          loading="eager"
          fetchPriority="high"
          className="object-cover object-top"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-2 text-center font-script text-[4.5rem] leading-none text-white [text-shadow:0_4px_24px_rgb(0_0_0/0.35)]"
        >
          {firstName}
        </span>
      </div>

      <div className="text-center">
        <a
          href={`mailto:${site.email}`}
          className="break-all font-display text-xl font-semibold transition-colors hover:text-accent"
        >
          {site.email}
        </a>
        <p className="mt-0.5 text-sm text-ink-faint">{site.role}</p>
      </div>

      <ul className="flex justify-center gap-2">
        {site.socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid size-10 place-items-center rounded-full border border-line bg-bg text-ink-soft transition-colors hover:border-ink hover:bg-ink hover:text-bg"
            >
              <SocialIcon label={s.label} />
            </a>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="group flex items-center justify-between rounded-full border border-line py-1.5 pl-5 pr-1.5 font-display text-base font-semibold transition-colors hover:border-ink"
      >
        Get in touch
        <span className="grid size-10 place-items-center rounded-full bg-ink text-bg transition-[background-color,rotate] duration-500 group-hover:rotate-45 group-hover:bg-accent group-hover:text-white">
          <ArrowUpRight />
        </span>
      </a>
    </div>
  );
}

export default function Home() {
  const headWords = site.headline.lead.split(" ");
  const pills = [site.facts[0].value, ...site.capabilities.map((c) => c.title)];

  return (
    <div id="top">
      {/* Soft drifting orb behind everything */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden lg:left-[380px]">
        <div className="orb" />
      </div>

      <RevealObserver />
      <SoundEffects />
      <SideNav />

      <div className="px-4 pb-28 pt-4 sm:px-6 lg:grid lg:grid-cols-[minmax(320px,370px)_minmax(0,1fr)] lg:gap-10 lg:pb-4 lg:pl-4 lg:pr-24">
        <aside className="lg:sticky lg:top-4 lg:h-[calc(100svh-2rem)]">
          <ProfileCard />
        </aside>

        <main className="mx-auto w-full max-w-[720px]">
          {/* ── Introduction ─────────────────────────────────── */}
          <section id="home" className="pt-16 lg:pt-20">
            <Eyebrow className="rise">Introduction</Eyebrow>

            <h1 className="mt-6 font-display text-[clamp(2.7rem,6.4vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.015em]">
              {headWords.map((w, i) => (
                <span key={i} className="rise inline-block" style={rise(80 + i * 60)}>
                  {w}&nbsp;
                </span>
              ))}
              <span className="rise inline-block text-accent" style={rise(80 + headWords.length * 60)}>
                {site.headline.accent}&nbsp;
              </span>
              <span className="rise inline text-ink-faint" style={rise(160 + headWords.length * 60)}>
                {site.headline.tail}
              </span>
            </h1>

            <p className="rise mt-7 max-w-xl text-base leading-relaxed text-ink-soft" style={rise(600)}>
              {site.intro}
            </p>

            <ul className="rise mt-8 flex flex-wrap gap-2" style={rise(700)}>
              {pills.map((t) => (
                <li key={t} className="card rounded-full px-4 py-2 font-display text-sm font-semibold">
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-12 grid gap-3 sm:grid-cols-2">
              {site.stats.map((s, i) => (
                <div
                  key={s.label}
                  className="rise card flex min-h-[200px] flex-col justify-between rounded-[28px] p-6"
                  style={rise(800 + i * 100)}
                >
                  <Eyebrow>{s.label}</Eyebrow>
                  <div className="flex items-end justify-between gap-4">
                    <p className="max-w-[12ch] text-sm leading-snug text-ink-faint">{s.note}</p>
                    <p className="font-display text-[5.5rem] font-medium leading-[0.8] tracking-[-0.03em]">
                      {s.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Work ─────────────────────────────────────────── */}
          <section id="work" className="pt-28 sm:pt-36">
            <SectionHead label="Selected work" text={site.sections.work} />
            <div className="mt-12 space-y-6">
              {site.projects.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          </section>

          {/* ── Experience ───────────────────────────────────── */}
          <section id="experience" className="pt-28 sm:pt-36">
            <SectionHead label="Experience" text={site.sections.experience} />
            <ol className="mt-10">
              {site.experience.map((e, i) => (
                <li
                  key={i}
                  data-reveal
                  style={delay(i * 80)}
                  className="flex flex-col gap-3 border-b border-line py-6 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                >
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 text-sm text-ink-faint">
                      {e.companyHref ? (
                        <a
                          href={e.companyHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 transition-colors hover:text-accent"
                        >
                          {e.company}
                          <ArrowUpRight width={12} height={12} />
                        </a>
                      ) : (
                        e.company
                      )}
                      {e.placeholder && (
                        <span className="rounded-full bg-accent-soft px-2 py-0.5 font-display text-xs font-semibold text-accent">
                          Placeholder
                        </span>
                      )}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight">{e.role}</h3>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-ink-soft">{e.summary}</p>
                  </div>
                  <span className="card w-fit shrink-0 rounded-full px-3.5 py-1.5 font-display text-sm font-semibold">
                    {e.period}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {/* ── About ────────────────────────────────────────── */}
          <section id="about" className="pt-28 sm:pt-36">
            <SectionHead label="About me" text={site.about.statement} />

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {site.about.body.map((para, i) => (
                <p key={i} data-reveal style={delay(i * 100)} className="text-base leading-relaxed text-ink-soft">
                  {para}
                </p>
              ))}
            </div>

            <dl data-reveal className="card mt-10 grid gap-5 rounded-[28px] p-6 sm:grid-cols-3">
              {site.facts.map((f) => (
                <div key={f.label}>
                  <dt className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-ink-faint">
                    {f.label}
                  </dt>
                  <dd className="mt-1 font-display text-lg font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {site.capabilities.map((c, i) => (
                <div key={c.title} data-reveal style={delay((i % 2) * 100)} className="card flex flex-col rounded-[28px] p-6">
                  <span className="font-display text-sm font-semibold text-accent">0{i + 1}</span>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.blurb}</p>
                  <ul className="mt-5 space-y-2 border-t border-line pt-5">
                    {c.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm">
                        <span className="size-1 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="pt-24">
              <SectionHead label="Toolbox" text={site.sections.tools} />
              <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {site.tools.map((t, i) => (
                  <li
                    key={t}
                    data-reveal
                    style={delay((i % 3) * 60)}
                    className="card group flex items-center justify-between gap-3 rounded-2xl px-4 py-4 transition-colors hover:border-ink"
                  >
                    <span className="font-display text-lg font-semibold">{t}</span>
                    <span className="font-display text-sm font-semibold text-ink-faint transition-colors group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── Contact ──────────────────────────────────────── */}
          <section id="contact" className="pt-28 sm:pt-36">
            <SectionHead label="Contact" text={site.sections.contact} />

            <div data-reveal className="card mt-10 rounded-[28px] p-6 sm:p-8">
              <p className="text-sm text-ink-faint">Write to me at</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-1 block break-all font-display text-[clamp(1.7rem,4.6vw,2.75rem)] font-semibold leading-tight transition-colors hover:text-accent"
              >
                {site.email}
              </a>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex h-12 items-center gap-4 rounded-full bg-ink pl-5 pr-1.5 font-display text-base font-semibold text-bg"
                >
                  Start a project
                  <span className="grid size-9 place-items-center rounded-full bg-accent text-white transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight />
                  </span>
                </a>
                <CopyEmail email={site.email} />
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-display text-base font-semibold text-ink-soft transition-colors hover:text-ink"
                    >
                      <SocialIcon label={s.label} width={14} height={14} />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <footer className="mt-20 flex flex-col gap-2 border-t border-line py-6 font-display text-sm font-semibold text-ink-faint sm:flex-row sm:justify-between">
            <span>
              © {site.copyrightYear} {site.name}
            </span>
            <a href="#top" className="transition-colors hover:text-ink">
              Back to top ↑
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}
