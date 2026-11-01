"use client";

import { useEffect, useRef } from "react";

export function HeroSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    const heroSection = spotlight?.parentElement;
    if (!spotlight || !heroSection || !window.matchMedia("(hover: hover)").matches) return;

    let frameId = 0;
    let pointerX = 0;
    let pointerY = 0;

    const paintSpotlight = () => {
      frameId = 0;
      const bounds = spotlight.getBoundingClientRect();
      spotlight.style.setProperty("--pointer-x", `${pointerX - bounds.left}px`);
      spotlight.style.setProperty("--pointer-y", `${pointerY - bounds.top}px`);
    };

    function followPointer(event: PointerEvent) {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frameId) frameId = requestAnimationFrame(paintSpotlight);
    }

    heroSection.addEventListener("pointermove", followPointer, { passive: true });
    return () => {
      heroSection.removeEventListener("pointermove", followPointer);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-1 bg-[radial-gradient(520px_circle_at_var(--pointer-x,72%)_var(--pointer-y,30%),var(--spotlight-glow),transparent_60%)]"
    />
  );
}
