"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import { reducedMotionQuery, runWhileVisible } from "@/shared/lib/animation-loop";

/** 180 degrees a second, which is 3 degrees per frame at 60fps. */
const SPIN_DEGREES_PER_MILLISECOND = 0.18;
/** Pointer at an edge tilts the record by half of this, so the maximum is 17 degrees. */
const TILT_RANGE_IN_DEGREES = 34;

function pointerAngleOnDisc(event: PointerEvent<HTMLDivElement>): number {
  const bounds = event.currentTarget.getBoundingClientRect();
  const centerX = bounds.left + bounds.width / 2;
  const centerY = bounds.top + bounds.height / 2;
  return (Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180) / Math.PI;
}

export function useRecordSpin(isPlaying: boolean) {
  const discRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const discAngleRef = useRef(0);
  const dragRef = useRef<{ lastPointerAngle: number } | null>(null);
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const reducedMotion = reducedMotionQuery();
    let writtenDisc: HTMLDivElement | null = null;
    let writtenTransform = "";
    return runWhileVisible(stack, (elapsedInMilliseconds) => {
      if (isPlayingRef.current && !dragRef.current && !reducedMotion.matches) {
        discAngleRef.current += SPIN_DEGREES_PER_MILLISECOND * elapsedInMilliseconds;
      }
      const disc = discRef.current;
      const transform = `rotate(${discAngleRef.current.toFixed(2)}deg)`;
      // The disc remounts on a track change, so a new element always gets its first write.
      if (disc && (disc !== writtenDisc || transform !== writtenTransform)) {
        disc.style.transform = transform;
        writtenDisc = disc;
        writtenTransform = transform;
      }
    });
  }, []);

  const scratchHandlers = {
    onPointerDown(event: PointerEvent<HTMLDivElement>) {
      event.currentTarget.setPointerCapture(event.pointerId);
      dragRef.current = { lastPointerAngle: pointerAngleOnDisc(event) };
    },
    onPointerMove(event: PointerEvent<HTMLDivElement>) {
      if (!dragRef.current) return;
      const currentAngle = pointerAngleOnDisc(event);
      // The +540 / -180 wraps the difference into -180..180 so crossing the 180 degree seam is smooth.
      const angleChange = ((currentAngle - dragRef.current.lastPointerAngle + 540) % 360) - 180;
      discAngleRef.current += angleChange;
      dragRef.current.lastPointerAngle = currentAngle;
    },
    onPointerUp() {
      dragRef.current = null;
    },
    onPointerCancel() {
      dragRef.current = null;
    },
  };

  const tiltHandlers = {
    onPointerMove(event: PointerEvent<HTMLDivElement>) {
      const stack = stackRef.current;
      if (!stack) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      const horizontalRatio = (event.clientX - bounds.left) / bounds.width;
      const verticalRatio = (event.clientY - bounds.top) / bounds.height;
      const tiltX = (0.5 - verticalRatio) * TILT_RANGE_IN_DEGREES;
      const tiltY = (horizontalRatio - 0.5) * TILT_RANGE_IN_DEGREES;
      stack.style.transform = `rotateX(${tiltX.toFixed(1)}deg) rotateY(${tiltY.toFixed(1)}deg)`;
    },
    onPointerLeave() {
      if (stackRef.current) stackRef.current.style.transform = "";
    },
  };

  return { discRef, stackRef, scratchHandlers, tiltHandlers };
}
