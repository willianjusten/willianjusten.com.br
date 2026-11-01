"use client";

import type { PointerEvent, RefObject } from "react";
import { baseRadiusOf, dragTo, endDrag, startDrag, type GlobeMotion } from "../lib/globe-motion";

/** Pointer handlers that spin the globe under the finger and leave inertia on release. */
export function useGlobeDrag(
  motionRef: RefObject<GlobeMotion>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  onDragStart: () => void,
) {
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    onDragStart();
    startDrag(motionRef.current, event.clientX, event.clientY);
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.style.cursor = "grabbing";
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !motionRef.current.drag) return;
    const baseRadius = baseRadiusOf(canvas.clientWidth, canvas.clientHeight);
    dragTo(motionRef.current, event.clientX, event.clientY, baseRadius);
  };

  const onPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    endDrag(motionRef.current);
    event.currentTarget.style.cursor = "";
  };

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: onPointerEnd,
    onPointerCancel: onPointerEnd,
  };
}
