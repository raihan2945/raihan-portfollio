import Image from "next/image";
import { site } from "@/content/site";
import portrait from "./asset/raihan.webp";
import { Nav } from "./components/nav";
import { WorkList } from "./components/work-list";
import { CopyEmail } from "./components/copy-email";
import { RevealObserver } from "./components/reveal-observer";

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div data-reveal className="mb-12 flex items-center gap-4 sm:mb-16">
      <span className="font-mono text-xs text-accent">({index})</span>
      <span className="h-px w-10 bg-line" />
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">{children}</h2>
    </div>
  );
}

function delay(ms: number) {
  return { "--reveal-delay": `${ms}ms` } as React.CSSProperties;
}

export default function Home() {
  const words = site.headline.lead.split(" ");

  return (
    <>
      <Nav name={site.name} initials={site.initials} />
      <RevealObserver />

      <main id="top" className="flex-1 overflow-x-clip">
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-14 pt-32 sm:px-8 sm:pb-20">
          <div className="grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="mb-10 flex items-center gap-3">
                {/* Mobile / tablet avatar — the full portrait card shows on large screens */}
                <span
                  className="rise relative size-11 shrink-0 overflow-hidden rounded-full ring-1 ring-line lg:hidden"
                  style={{ "--rise-delay": "0ms" } as React.CSSProperties}
                >
                  <Image
                    src={portrait}
                    alt=""
                    fill
                    sizes="96px"
                    className="origin-[48%_30%] scale-[1.7] object-cover"
                  />
                </span>
                {site.available && (
                  <p
                    className="rise inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-bg-elev px-3.5 py-1.5 text-xs font-medium text-ink-soft"
                    style={{ "--rise-delay": "60ms" } as React.CSSProperties}
                  >
                    <span className="pulse-dot relative size-1.5 rounded-full bg-emerald-500 text-emerald-500" />
                    {site.availabilityText}
                  </p>
                )}
              </div>

              <h1 className="max-w-[17ch] text-[clamp(2.75rem,7.4vw,6.75rem)] font-medium leading-[0.95] tracking-[-0.045em] lg:max-w-none lg:text-[clamp(3.75rem,5.4vw,5.75rem)]">
                {words.map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <span
                      className="rise inline-block"
                      style={{ "--rise-delay": `${120 + i * 70}ms` } as React.CSSProperties}
                    >
                      {w}&nbsp;
                    </span>
                  </span>
                ))}
                <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <span
                    className="rise inline-block font-serif-italic text-accent"
                    style={{ "--rise-delay": `${120 + words.length * 70}ms` } as React.CSSProperties}
                  >
                    {site.headline.accent}&nbsp;
                  </span>
                </span>
                <span
                  className="rise inline text-ink-faint"
                  style={{ "--rise-delay": `${200 + words.length * 70}ms` } as React.CSSProperties}
                >
                  {site.headline.tail}
                </span>
              </h1>
            </div>

            {/* Portrait card (large screens) */}
            <figure
              className="rise relative mx-auto hidden w-full max-w-sm lg:col-span-4 lg:block"
              style={{ "--rise-delay": "450ms" } as React.CSSProperties}
            >
              <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#1d2129] ring-1 ring-line">
                <Image
                  src={portrait}
                  alt={`Portrait of ${site.name}`}
                  fill
                  sizes="(min-width: 1024px) 384px, 0px"
                  placeholder="blur"
                  loading="eager"
                  fetchPriority="high"
                  className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent"
                />
                <figcaption className="absolute inset-x-6 bottom-5 text-white">
                  <span className="block text-base font-medium tracking-tight">{site.name}</span>
                  <span className="text-sm text-white/70">{site.role}</span>
                </figcaption>
              </div>
            </figure>
          </div>

          <div className="mt-14 grid gap-10 border-t border-line pt-8 md:grid-cols-12">
            <p
              className="rise max-w-xl text-lg leading-relaxed text-ink-soft md:col-span-12 lg:col-span-6"
              style={{ "--rise-delay": "700ms" } as React.CSSProperties}
            >
              {site.intro}
            </p>

            <dl
              className="rise grid grid-cols-3 gap-4 md:col-span-8 lg:col-span-4 lg:grid-cols-1 lg:gap-3"
              style={{ "--rise-delay": "800ms" } as React.CSSProperties}
            >
              {site.facts.map((f) => (
                <div key={f.label} className="lg:flex lg:justify-between lg:gap-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                    {f.label}
                  </dt>
                  <dd className="mt-1 text-sm lg:mt-0">{f.value}</dd>
                </div>
              ))}
            </dl>

            <div
              className="rise flex items-start gap-3 whitespace-nowrap md:col-span-4 md:flex-col md:items-end lg:col-span-2"
              style={{ "--rise-delay": "900ms" } as React.CSSProperties}
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
              >
                See work
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </a>
              <a href="#contact" className="link-underline py-3 text-sm">
                Get in touch
              </a>
            </div>
          </div>
        </section>

        {/* ── Marquee ────────────────────────────────────────── */}
        <div
          className="marquee overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
          aria-label="Technologies"
        >
          <div className="marquee-track flex w-max">
            {[0, 1].map((dup) => (
              <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
                {site.marquee.map((t) => (
                  <li key={t} className="flex items-center">
                    <span className="px-7 text-lg font-medium tracking-tight text-ink-faint sm:text-xl">
                      {t}
                    </span>
                    <span className="size-1 rounded-full bg-accent/60" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* ── Work ───────────────────────────────────────────── */}
        <section id="work" className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
          <SectionLabel index="01">Selected work</SectionLabel>
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 data-reveal className="max-w-2xl text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-6xl">
              Things I&apos;ve <span className="font-serif-italic text-accent">designed</span>, built
              &amp; shipped.
            </h2>
            <p data-reveal style={delay(100)} className="max-w-xs text-sm leading-relaxed text-ink-soft">
              A few projects spanning product UI, APIs and infrastructure. Hover a row for a
              preview.
            </p>
          </div>
          <WorkList projects={site.projects} />
        </section>

        {/* ── About ──────────────────────────────────────────── */}
        <section id="about" className="border-t border-line bg-bg-elev/50">
          <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
            <SectionLabel index="02">About</SectionLabel>

            <p
              data-reveal
              className="max-w-5xl text-3xl leading-[1.2] tracking-[-0.02em] sm:text-5xl"
            >
              {site.about.statement.split("—")[0]}—
              <span className="font-serif-italic text-ink-soft">
                {site.about.statement.split("—").slice(1).join("—")}
              </span>
            </p>

            <div className="mt-14 grid gap-8 md:grid-cols-12">
              {site.about.body.map((para, i) => (
                <p
                  key={i}
                  data-reveal
                  style={delay(i * 100)}
                  className={`text-base leading-relaxed text-ink-soft md:col-span-4 ${
                    i === 0 ? "md:col-start-5" : ""
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-24 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
              {site.capabilities.map((c, i) => (
                <div
                  key={c.title}
                  data-reveal
                  style={delay(i * 120)}
                  className="group flex flex-col bg-bg p-8 transition-colors duration-500 hover:bg-bg-elev sm:p-10"
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-medium tracking-tight">{c.title}</h3>
                    <span className="font-mono text-xs text-ink-faint">0{i + 1}</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">{c.blurb}</p>
                  <ul className="mt-8 space-y-2.5 border-t border-line pt-6">
                    {c.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm">
                        <span className="size-1 rounded-full bg-accent transition-transform duration-500 group-hover:scale-150" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Experience ─────────────────────────────────────── */}
        <section id="experience" className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
          <SectionLabel index="03">Experience</SectionLabel>
          <ol className="border-t border-line">
            {site.experience.map((e, i) => (
              <li
                key={i}
                data-reveal
                style={delay(i * 80)}
                className="grid gap-2 border-b border-line py-8 md:grid-cols-12 md:gap-6"
              >
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint md:col-span-3 md:pt-2">
                  {e.period}
                </span>
                <div className="md:col-span-5">
                  <h3 className="text-2xl font-medium tracking-tight">{e.role}</h3>
                  <p className="mt-1 text-base text-ink-soft">{e.company}</p>
                </div>
                <p className="text-sm leading-relaxed text-ink-soft md:col-span-4 md:pt-2">
                  {e.summary}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Contact ────────────────────────────────────────── */}
        <section id="contact" className="relative border-t border-line">
          <div className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-40">
            <SectionLabel index="04">Contact</SectionLabel>
            <h2
              data-reveal
              className="max-w-5xl text-[clamp(2.75rem,9vw,8.5rem)] font-medium leading-[0.92] tracking-[-0.05em]"
            >
              Let&apos;s build something{" "}
              <span className="font-serif-italic text-accent">good</span>.
            </h2>

            <div data-reveal style={delay(120)} className="mt-14 flex flex-col gap-6 sm:flex-row sm:items-center">
              <a
                href={`mailto:${site.email}`}
                className="link-underline w-fit break-all text-xl tracking-tight sm:text-3xl"
              >
                {site.email}
              </a>
              <CopyEmail email={site.email} />
            </div>

            <ul data-reveal style={delay(200)} className="mt-16 flex flex-wrap gap-x-8 gap-y-3">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-ink"
                  >
                    {s.label}
                    <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>
            © {site.copyrightYear} {site.name}
          </span>
          <span>Designed &amp; built by hand</span>
          <a href="#top" className="transition-colors hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  );
}
