"use client";

import { useRef, type PointerEvent } from "react";

const SWIPE_THRESHOLD_IN_PIXELS = 50;

/** Calls `onSwipe(1)` for a swipe to the left (the next photo) and `onSwipe(-1)` for one to the right. */
export function useSwipe(onSwipe: (direction: 1 | -1) => void) {
  const startXRef = useRef<number | null>(null);
  const didSwipeRef = useRef(false);

  const onPointerDown = (event: PointerEvent) => {
    startXRef.current = event.clientX;
    didSwipeRef.current = false;
  };

  const onPointerUp = (event: PointerEvent) => {
    const startX = startXRef.current;
    startXRef.current = null;
    if (startX === null) return;
    const distance = event.clientX - startX;
    if (Math.abs(distance) < SWIPE_THRESHOLD_IN_PIXELS) return;
    didSwipeRef.current = true;
    onSwipe(distance < 0 ? 1 : -1);
  };

  /** True once right after a swipe, so the click the browser fires when it ends can be ignored. */
  const consumeSwipe = () => {
    const didSwipe = didSwipeRef.current;
    didSwipeRef.current = false;
    return didSwipe;
  };

  return { onPointerDown, onPointerUp, consumeSwipe };
}
