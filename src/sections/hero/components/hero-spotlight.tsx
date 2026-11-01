"use client";

import { useEffect, useRef } from "react";

/** Cursor-following glow. Writes the pointer position onto the hero section as CSS variables. */
export function HeroSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroSection = spotlightRef.current?.parentElement;
    if (!heroSection) return;

    function followPointer(event: PointerEvent) {
      if (!heroSection) return;
      const bounds = heroSection.getBoundingClientRect();
      heroSection.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
      heroSection.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
    }

    heroSection.addEventListener("pointermove", followPointer);
    return () => heroSection.removeEventListener("pointermove", followPointer);
  }, []);

  return <div ref={spotlightRef} className="spotlight" aria-hidden="true" />;
}
