"use client";

import { useEffect, useRef, useState } from "react";

/** Start loading a section this far before it scrolls into view. */
export const NEAR_VIEWPORT_ROOT_MARGIN = "400px 0px";

/**
 * Turns true once the element nears the viewport, and stays true. Lets a section hold back its
 * client chunk until the visitor scrolls close to it.
 */
export function useNearViewport<ElementType extends HTMLElement>(
  rootMargin = NEAR_VIEWPORT_ROOT_MARGIN,
) {
  const elementRef = useRef<ElementType>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || isNearViewport) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsNearViewport(true);
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [isNearViewport, rootMargin]);

  return { elementRef, isNearViewport };
}
