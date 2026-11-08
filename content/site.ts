// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update
//  the site — no component changes needed.
// ─────────────────────────────────────────────────────────────

export type Project = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  year: string;
  tags: string[];
  /** Live site or case-study link. Leave empty to render without a link. */
  href?: string;
  /** Source code link (optional). */
  repo?: string;
  /** Two colours used for the hover preview card gradient. */
  palette: [string, string];
  /** Optional screenshot in /public, e.g. "/work/my-project.jpg". */
  image?: string;
  /** Marks a slot that still needs real content. */
  placeholder?: boolean;
};

export type Experience = {
  period: string;
  role: string;
  company: string;
  summary: string;
  placeholder?: boolean;
};

export const site = {
  name: "Raihan Ahmad",
  initials: "RA",
  role: "Full-stack Engineer",
  url: "https://example.com", // TODO: your production domain
  email: "raihanahmad999@gmail.com",
  available: true,
  availabilityText: "Available for new projects",
  copyrightYear: "2026",

  headline: {
    lead: "Full-stack engineer building",
    accent: "calm, fast",
    tail: "software — from schema to pixel.",
  },

  intro:
    "I design and ship complete products: thoughtful interfaces, reliable APIs, and the infrastructure that keeps them running. I like small teams, clear problems, and code that's pleasant to come back to.",

  facts: [
    { label: "Focus", value: "Product engineering" },
    { label: "Core stack", value: "TypeScript · React · Node" },
    { label: "Data", value: "PostgreSQL · Redis" },
  ],

  socials: [
    // TODO: replace with your real profile URLs
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "X / Twitter", href: "https://x.com/" },
  ],

  marquee: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Redis",
    "GraphQL",
    "Docker",
    "AWS",
    "Tailwind CSS",
    "Prisma",
    "CI/CD",
  ],

  about: {
    statement:
      "I care about the whole path — the database schema, the API contract, the deploy pipeline, and the last pixel of the interface.",
    body: [
      "Working across the stack means fewer hand-offs and fewer surprises. I can take an idea from a rough sketch to a production system, and I make the trade-offs explicit along the way.",
      "I value boring, well-tested foundations so the interesting parts of a product can move quickly.",
    ],
  },

  capabilities: [
    {
      title: "Frontend",
      blurb:
        "Accessible, responsive interfaces with attention to motion, typography and performance.",
      items: ["React & Next.js", "TypeScript", "Tailwind CSS", "Design systems", "Web performance"],
    },
    {
      title: "Backend",
      blurb:
        "Clear APIs and data models that stay maintainable as the product and team grow.",
      items: ["Node.js", "REST & GraphQL", "PostgreSQL", "Redis & queues", "Auth & payments"],
    },
    {
      title: "Infrastructure",
      blurb:
        "Pragmatic cloud setups with automated delivery, observability and sensible costs.",
      items: ["Docker", "AWS / Vercel", "CI/CD pipelines", "Monitoring", "Testing strategy"],
    },
  ],

  // ── Replace these placeholder slots with your real work ──
  projects: [
    {
      slug: "project-one",
      title: "Commerce Platform",
      summary: "Placeholder — headless storefront with a custom admin and payments.",
      role: "Full-stack",
      year: "2026",
      tags: ["Next.js", "PostgreSQL", "Stripe"],
      palette: ["#2f54eb", "#9fb3ff"],
      placeholder: true,
    },
    {
      slug: "project-two",
      title: "Realtime Analytics",
      summary: "Placeholder — live dashboards streaming millions of events a day.",
      role: "Backend & UI",
      year: "2025",
      tags: ["Node.js", "WebSockets", "Redis"],
      palette: ["#0f766e", "#7dd3c0"],
      placeholder: true,
    },
    {
      slug: "project-three",
      title: "Developer API",
      summary: "Placeholder — public API, SDKs and documentation portal.",
      role: "API design",
      year: "2025",
      tags: ["GraphQL", "TypeScript", "Docs"],
      palette: ["#1e293b", "#94a3b8"],
      placeholder: true,
    },
    {
      slug: "project-four",
      title: "Booking System",
      summary: "Placeholder — scheduling, notifications and team calendars.",
      role: "Full-stack",
      year: "2024",
      tags: ["React", "Prisma", "AWS"],
      palette: ["#4338ca", "#c4b5fd"],
      placeholder: true,
    },
  ] satisfies Project[] as Project[],

  experience: [
    {
      period: "2024 — Now",
      role: "Full-stack Engineer",
      company: "Company name",
      summary: "Placeholder — what you built, owned and improved.",
      placeholder: true,
    },
    {
      period: "2022 — 2024",
      role: "Software Engineer",
      company: "Company name",
      summary: "Placeholder — key products, scale and impact.",
      placeholder: true,
    },
    {
      period: "2020 — 2022",
      role: "Frontend Developer",
      company: "Company name",
      summary: "Placeholder — where it started.",
      placeholder: true,
    },
  ] satisfies Experience[] as Experience[],
};
