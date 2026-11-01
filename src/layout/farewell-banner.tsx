"use client";

import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type FarewellBannerProps = {
  label: string;
  message: string;
  dismissLabel: string;
};

export function FarewellBanner({ label, message, dismissLabel }: FarewellBannerProps) {
  const searchParams = useSearchParams();
  const [isDismissed, setIsDismissed] = useState(false);

  if (searchParams.get("from") !== "blog" || isDismissed) return null;

  return (
    <div className="mx-auto max-w-page px-8 pt-24">
      <aside
        aria-label={label}
        className="flex items-center gap-x-4 rounded-lg border border-line-strong bg-surface px-5 py-2 text-ui text-text-2 shadow-2 motion-safe:animate-banner-in"
      >
        <p className="flex-1">{message}</p>
        <button
          type="button"
          aria-label={dismissLabel}
          onClick={() => setIsDismissed(true)}
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-sm text-text-muted hover:text-text"
        >
          <X size={18} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </aside>
    </div>
  );
}
