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
  /** Company website (optional). */
  companyHref?: string;
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

  // Big numbers in the intro cards.
  stats: [
    { label: "Building since", value: "2022", note: "At Impala Intech, across three roles" },
    { label: "Live products", value: "03", note: "E-commerce and fintech, in production" },
  ],

  // Section headings. Each one lights up word by word as it scrolls into view.
  sections: {
    work: "Live products I've designed, built and shipped, from storefront to admin and API.",
    experience: "Where I've been building, owning features from the database to the deploy.",
    tools: "The tools I reach for every day.",
    contact: "Have a product in mind? Let's build something good together.",
  },

  socials: [
    // TODO: replace with your real profile URLs
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "X / Twitter", href: "https://x.com/" },
  ],

  tools: [
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
      images: [
        {
          src: "/work/nirapod-business/investor-dashboard.png",
          alt: "Nirapod Business investor dashboard with total balance, wallet and invested amounts, open projects and upcoming returns",
          caption: "Investor dashboard",
        },
        {
          src: "/work/nirapod-business/projects.png",
          alt: "Nirapod Business project listings with minimum investment, expected ROI, duration and funding goal for each project",
          caption: "Projects",
        },
        {
          src: "/work/nirapod-business/wallet.png",
          alt: "Nirapod Business wallet with available balance, add money, withdraw and invest actions, and a transaction history",
          caption: "Wallet",
        },
        {
          src: "/work/nirapod-business/website.png",
          alt: "Nirapod Business public website listing running investment projects with shares raised, markup return and closing dates",
          caption: "Public website",
        },
      ],
    },
  ] satisfies Project[] as Project[],

  experience: [
    // TODO: sharpen the summaries with real products, scale and impact.
    {
      period: "2025 — Now",
      role: "Software Engineer",
      company: "Impala Intech",
      companyHref: "https://impalaintech.com",
      summary:
        "Building client software end to end at a studio that ships web, mobile and AI-driven products.",
    },
    {
      period: "2023 — 2025",
      role: "Full-stack Developer",
      company: "Impala Intech",
      companyHref: "https://impalaintech.com",
      summary:
        "Moved into full-stack work: the APIs and data models as well as the interfaces on top of them.",
    },
    {
      period: "2022 — 2023",
      role: "Frontend Developer",
      company: "Impala Intech",
      companyHref: "https://impalaintech.com",
      summary: "Joined the team building responsive, accessible interfaces for client web applications.",
    },
  ] satisfies Experience[] as Experience[],
};
