// Inline SVG icons. Plain functions, usable from server and client components.

type IconProps = React.SVGProps<SVGSVGElement>;

const stroke = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const solid = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true } as const;

export function SoundOnIcon(p: IconProps) {
  return (
    <svg {...stroke} {...p}>
      <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4Z" />
      <path d="M15.5 9a4.2 4.2 0 0 1 0 6M18.2 6.5a8 8 0 0 1 0 11" />
    </svg>
  );
}

export function SoundOffIcon(p: IconProps) {
  return (
    <svg {...stroke} {...p}>
      <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4Z" />
      <path d="m16 9.5 5 5M21 9.5l-5 5" />
    </svg>
  );
}

export function HomeIcon(p: IconProps) {
  return (
    <svg {...stroke} {...p}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9v11a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1V9" />
    </svg>
  );
}

export function WorkIcon(p: IconProps) {
  return (
    <svg {...stroke} {...p}>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M8.5 7V5.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2V7M3 12.5h18" />
    </svg>
  );
}

export function ExperienceIcon(p: IconProps) {
  return (
    <svg {...stroke} {...p}>
      <path d="M9 6h11M9 12h11M9 18h7" />
      <circle cx="4.5" cy="6" r="1" />
      <circle cx="4.5" cy="12" r="1" />
      <circle cx="4.5" cy="18" r="1" />
    </svg>
  );
}

export function AboutIcon(p: IconProps) {
  return (
    <svg {...stroke} {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

export function MailIcon(p: IconProps) {
  return (
    <svg {...stroke} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function ArrowUpRight(p: IconProps) {
  return (
    <svg {...stroke} {...p}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function GitHubIcon(p: IconProps) {
  return (
    <svg {...solid} {...p}>
      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57l-.02-2.04c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.08-.74.09-.73.09-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22l-.01 3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3" />
    </svg>
  );
}

export function LinkedInIcon(p: IconProps) {
  return (
    <svg {...solid} {...p}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function XIcon(p: IconProps) {
  return (
    <svg {...solid} {...p}>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
    </svg>
  );
}

/** Picks a brand icon from a social link's label, falling back to an arrow. */
export function SocialIcon({ label, ...p }: IconProps & { label: string }) {
  const l = label.toLowerCase();
  if (l.includes("github")) return <GitHubIcon {...p} />;
  if (l.includes("linkedin")) return <LinkedInIcon {...p} />;
  if (l.includes("twitter") || l.startsWith("x")) return <XIcon {...p} />;
  return <ArrowUpRight {...p} />;
}
