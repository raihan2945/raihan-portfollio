"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex w-fit items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-ink-soft transition-colors hover:border-ink hover:text-ink"
    >
      <span aria-live="polite">{copied ? "Copied ✓" : "Copy email"}</span>
    </button>
  );
}
