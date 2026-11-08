"use client";

import { useEffect, useState } from "react";
import { AboutIcon, ExperienceIcon, HomeIcon, MailIcon, WorkIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";

const items = [
  { id: "home", href: "#top", label: "Home", Icon: HomeIcon },
  { id: "work", href: "#work", label: "Work", Icon: WorkIcon },
  { id: "experience", href: "#experience", label: "Experience", Icon: ExperienceIcon },
  { id: "about", href: "#about", label: "About", Icon: AboutIcon },
  { id: "contact", href: "#contact", label: "Contact", Icon: MailIcon },
];

const button =
  "group relative grid size-10 place-items-center rounded-full transition-colors duration-300";

/**
 * Floating section nav: a vertical pill on the right on large screens and a
 * bar along the bottom on smaller ones. Highlights the section in view.
 */
export function SideNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      // A thin band across the middle of the viewport decides the active section.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="rise fixed bottom-4 left-1/2 z-50 -translate-x-1/2 lg:bottom-auto lg:left-auto lg:right-6 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0"
      style={{ "--rise-delay": "500ms" } as React.CSSProperties}
    >
      <ul className="card flex items-center gap-1 rounded-full p-1.5 lg:flex-col">
        {items.map(({ id, href, label, Icon }) => {
          const on = active === id;
          return (
            <li key={id}>
              <a
                href={href}
                aria-label={label}
                aria-current={on ? "location" : undefined}
                className={`${button} ${on ? "bg-ink text-bg" : "text-ink-soft hover:bg-bg hover:text-ink"}`}
              >
                <Icon />
                <span className="pointer-events-none absolute right-full mr-3 hidden translate-x-1 whitespace-nowrap rounded-full bg-ink px-3 py-1 font-display text-sm font-semibold text-bg opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 lg:block">
                  {label}
                </span>
              </a>
            </li>
          );
        })}
        <li aria-hidden className="mx-1 h-6 w-px bg-line lg:mx-0 lg:my-1 lg:h-px lg:w-6" />
        <li>
          <ThemeToggle className={`${button} text-ink-soft hover:bg-bg hover:text-ink`} />
        </li>
      </ul>
    </nav>
  );
}
