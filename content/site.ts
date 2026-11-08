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
   * Screenshots, first one leading. The card preview cycles through them on
   * hover (arrows, dots and swipe switch them), and clicking it opens a
   * full-screen gallery with zoom, captions and thumbnails. The alt text
   * doubles as the gallery's description line, so keep it descriptive.
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
    { label: "Building since", value: "2021", note: "Three roles, frontend to full-stack" },
    { label: "Live products", value: "06", note: "E-commerce, fintech, community and internal tools" },
  ],

  // Section headings. Each one lights up word by word as it scrolls into view.
  sections: {
    work: "Live products I've designed, built and shipped, from storefront to admin and API.",
    experience: "Where I've been building, owning features from the database to the deploy.",
    tools: "The tools I reach for every day.",
    contact: "Have a product in mind? Let's build something good together.",
  },

  socials: [
    { label: "GitHub", href: "https://github.com/raihan2945" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/raihan2945/" },
    // TODO: replace with your real X profile URL, or remove
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
    "Prisma",
    "Tailwind CSS",
    "OpenAI API",
    "LangChain",
    "pgvector",
    "Docker",
    "Kubernetes",
    "AWS",
    "GitHub Actions",
    "Terraform",
    "Nginx",
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
      title: "AI",
      blurb:
        "LLM features that hold up in production: grounded in your data, measurable and cheap to run.",
      items: ["LLM APIs (OpenAI, Claude)", "RAG & vector search", "Agents & tool calling", "Prompt design & evals", "Streaming AI interfaces"],
    },
    {
      title: "DevOps",
      blurb:
        "Automated delivery and reproducible infrastructure, with observability and sensible costs.",
      items: ["Docker & Kubernetes", "AWS / Vercel", "CI/CD with GitHub Actions", "Terraform", "Monitoring & logging"],
    },
  ],

  // TODO: confirm `role` and `year` for each project.
  projects: [
    {
      slug: "iacc-connect",
      title: "IACC Connect",
      summary:
        "Internal audit management for Radiant's audit department: audit projects run through a staged review workflow, with sections, document requisitions, risk-rated observations and auditee replies with corrective actions. Draft reports are versioned, final reports are laid out in a page editor and exported to PDF, and follow-ups are tracked. Runs on a private network.",
      role: "Full-stack",
      year: "2026",
      tags: ["Audit workflow", "Report editor", "PDF export", "Dashboards"],
      palette: ["#1e3a8a", "#fdba74"],
      images: [
        {
          src: "/work/iacc-connect/dashboard.png",
          alt: "IACC Connect dashboard with total, in-progress, completed and overdue audit counts, an audit project list and overdue requisitions waiting on the user",
          caption: "Dashboard",
        },
        {
          src: "/work/iacc-connect/project-overview.png",
          alt: "IACC Connect audit project page with its workflow step, audit sections with requisition and observation counts, the team and progress",
          caption: "Audit project",
        },
        {
          src: "/work/iacc-connect/observation-form.png",
          alt: "IACC Connect observation form with implication, risk magnitude and recommendation, the auditee's reply with corrective and preventive actions, and responsible people",
          caption: "Observation",
        },
        {
          src: "/work/iacc-connect/draft-report.png",
          alt: "IACC Connect draft report grouping observations by section with status, follow-up and auditees, plus saved versions",
          caption: "Draft report",
        },
        {
          src: "/work/iacc-connect/final-report-editor.png",
          alt: "IACC Connect final report editor with formatting tools beside a cover page preview, and PDF export",
          caption: "Final report editor",
        },
      ],
    },
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
    {
      slug: "dupaaa",
      title: "DUPAAA",
      summary:
        "Website and admin for the Dhaka University Public Administration Alumni Association: a member directory, membership and life-member payments, events with free or paid booking, a notice board, publications and a photo gallery, with Bangla and English content.",
      role: "Full-stack",
      year: "2026",
      tags: ["Next.js", "Community", "Payments", "Admin panel"],
      href: "https://dupaaa.org",
      palette: ["#312e81", "#fcd34d"],
      images: [
        {
          src: "/work/dupaaa/events.png",
          alt: "DUPAAA admin events list with dates, free or paid booking type, fee, booking counts and status",
          caption: "Admin · Events",
        },
        {
          src: "/work/dupaaa/publications.png",
          alt: "DUPAAA admin publications list with periodical, yearly and special issues, their published dates and status",
          caption: "Admin · Publications",
        },
        {
          src: "/work/dupaaa/notice-editor.png",
          alt: "DUPAAA notice editor with a Bangla notice, publish and expiry dates, visibility, pin to top and an image",
          caption: "Admin · Notice editor",
        },
        {
          src: "/work/dupaaa/members.png",
          alt: "DUPAAA member directory filtered by status, session, profession and role, with member names and photos blurred",
          caption: "Admin · Members",
        },
        {
          src: "/work/dupaaa/dashboard.png",
          alt: "DUPAAA admin dashboard with shortcuts to profiles, students, membership payments, notices, events, publications and photos",
          caption: "Admin · Dashboard",
        },
        {
          src: "/work/dupaaa/gallery.png",
          alt: "DUPAAA public website gallery of archive photos from alumni batches at Dhaka University",
          caption: "Public website",
        },
      ],
    },
    {
      slug: "radiant-erp",
      title: "Radiant General Service ERP",
      summary:
        "Internal ERP for Radiant Pharmaceuticals' general service team: car and bike fleet with drivers, maintenance jobs and two-step approvals, fuel, tolls and parking, plus parts inventory, assets, HRM and petty cash. Runs on a private network.",
      role: "Full-stack",
      year: "2025",
      tags: ["ERP", "Fleet management", "Inventory", "Dashboards"],
      palette: ["#0e7490", "#a5f3fc"],
      images: [
        {
          src: "/work/radiant-erp/cars.png",
          alt: "Radiant ERP car list with pool, individual and special fleet totals, filters by type and allotment, and each car's brand, model, registration and type",
          caption: "Fleet",
        },
        {
          src: "/work/radiant-erp/car-maintenance.png",
          alt: "Radiant ERP car details on the maintenance tab, with job and spend totals, a maintenance log and two approval stages",
          caption: "Car · Maintenance",
        },
        {
          src: "/work/radiant-erp/maintenance-tasks.png",
          alt: "Radiant ERP maintenance job drawer with repair order, diagnosis, mileage, next service date and a list of tasks",
          caption: "Maintenance job",
        },
        {
          src: "/work/radiant-erp/parts-inventory.png",
          alt: "Radiant ERP parts inventory for one part, listing stock by model, brand and part number with price and stock history",
          caption: "Parts inventory",
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
      period: "2021 — 2023",
      role: "Frontend Developer",
      company: "Impala Intech",
      companyHref: "https://impalaintech.com",
      summary: "Joined the team building responsive, accessible interfaces for client web applications.",
    },
  ] satisfies Experience[] as Experience[],
};
