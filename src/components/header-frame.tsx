"use client";

import { useEffect, useState, type ReactNode } from "react";

const SCROLLED_THRESHOLD_IN_PIXELS = 40;

/** Header chrome: transparent over the hero, a slimmer translucent bar once scrolled past 40px. */
export function HeaderFrame({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function syncScrollState() {
      setIsScrolled(window.scrollY > SCROLLED_THRESHOLD_IN_PIXELS);
    }
    syncScrollState();
    window.addEventListener("scroll", syncScrollState, { passive: true });
    return () => window.removeEventListener("scroll", syncScrollState);
  }, []);

  return (
    <header className="site-header" data-scrolled={isScrolled}>
      <div className="mx-auto flex max-w-page items-center gap-x-6 px-5 sm:px-8">{children}</div>
    </header>
  );
}
