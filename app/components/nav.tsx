"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Nav({ name, initials }: { name: string; initials: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-line bg-bg/75 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3" aria-label={`${name}, back to top`}>
          <span className="grid size-9 place-items-center rounded-full bg-ink font-mono text-[11px] font-medium tracking-wider text-bg transition-transform duration-500 group-hover:rotate-[360deg]">
            {initials}
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:inline">{name}</span>
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-line bg-bg/40 px-1.5 py-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="block rounded-full px-4 py-1.5 text-sm text-ink-soft transition-colors hover:bg-bg-elev hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85 md:hidden"
          >
            Contact
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
