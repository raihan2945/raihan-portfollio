// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update
//  the site — no component changes needed.
// ─────────────────────────────────────────────────────────────

export type Screenshot = {
  /** Path in /public, e.g. "/work/my-project/home.png". */
  src: string;
  alt: string;
  /** Short label shown on the hover preview, e.g. "Storefront". */
  caption?: string;
};

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
  /**
   * Screenshots, first one leading. The hover preview cycles through them;
   * touch devices get a swipeable strip under the summary.
   */
  images?: Screenshot[];
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

  // TODO: confirm `role` and `year` for each project.
  projects: [
    {
      slug: "fashion-villa",
      title: "Fashion Villa",
      summary:
        "Bangla-first fashion storefront for baby, kids', women's and men's wear, with WhatsApp ordering, cash on delivery and order tracking, run from an admin console for catalogue, orders, campaigns and SEO.",
      role: "Full-stack",
      year: "2025",
      tags: ["Next.js", "E-commerce", "Admin panel", "REST API"],
      href: "https://fashionvillasbd.com",
      palette: ["#be185d", "#fbcfe8"],
      images: [
        {
          src: "/work/fashion-villa/storefront.png",
          alt: "Fashion Villa storefront: Eid collection hero banner, kids' and accessories tiles, delivery and exchange perks",
          caption: "Storefront",
        },
        {
          src: "/work/fashion-villa/admin-settings.png",
          alt: "Fashion Villa admin console settings for the website logo, mobile logo, footer logo and favicon",
          caption: "Admin · Settings",
        },
        {
          src: "/work/fashion-villa/admin-products.png",
          alt: "Fashion Villa admin product editor with product photos and a live search engine listing preview",
          caption: "Admin · Product editor",
        },
      ],
    },
    {
      slug: "incommerce",
      title: "InCommerce",
      summary:
        "Electronics and PC-parts store with a PC builder, product compare, warranty checks, trade-in, EMI and a bilingual English/Bangla interface, backed by an admin with category spec templates and serial-tracked inventory.",
      role: "Full-stack",
      year: "2025",
      tags: ["E-commerce", "Admin panel", "i18n"],
      href: "http://incommerce.online",
      palette: ["#1d4ed8", "#93c5fd"],
      images: [
        {
          src: "/work/incommerce/storefront.png",
          alt: "InCommerce storefront: new-arrivals hero with a monitor, trade-in and pre-order tiles, and warranty, specs and delivery highlights",
          caption: "Storefront",
        },
        {
          src: "/work/incommerce/admin-products.png",
          alt: "InCommerce admin product list with search by model number or SKU, category, brand and status filters, prices and stock",
          caption: "Admin · Products",
        },
        {
          src: "/work/incommerce/admin-product-media.png",
          alt: "InCommerce admin product editor on the media tab, with image ordering, alt text and a publish checklist",
          caption: "Admin · Product media",
        },
        {
          src: "/work/incommerce/admin-categories.png",
          alt: "InCommerce admin category tree with the keyboards spec template of attributes, groups and required flags",
          caption: "Admin · Spec templates",
        },
      ],
    },
    {
      slug: "nirapod-business",
      title: "Nirapod Business",
      summary:
        "Shariah-compliant investment platform: investors fund Murabaha and Musharaka projects from a wallet and track repayments on a dashboard.",
      role: "Full-stack",
      year: "2025",
      tags: ["Next.js", "Fintech", "Dashboards"],
      href: "https://nirapadbusiness.com/",
      palette: ["#047857", "#a7f3d0"],
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
