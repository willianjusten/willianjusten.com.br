"use client";

import { useEffect, useState, type ReactNode } from "react";

const SCROLLED_THRESHOLD_IN_PIXELS = 40;

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
    <header
      data-scrolled={isScrolled}
      className="pointer-events-none fixed inset-x-0 top-0 z-100 py-3 transition-[background,padding,box-shadow,backdrop-filter] duration-(--dur-base) ease-[ease] data-[scrolled=true]:bg-header-glass data-[scrolled=true]:py-2 data-[scrolled=true]:shadow-(--header-shadow) data-[scrolled=true]:backdrop-blur-[16px] data-[scrolled=true]:backdrop-saturate-140 sm:py-6 sm:data-[scrolled=true]:py-3 [&>*>*]:pointer-events-auto"
    >
      <div className="mx-auto flex max-w-page items-center gap-x-6 px-5 sm:px-8">{children}</div>
    </header>
  );
}
