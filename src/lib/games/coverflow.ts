/** Pixels of drag that must be exceeded before the shelf moves at all. */
export const DRAG_THRESHOLD_IN_PIXELS = 40;
/** Roughly this much drag moves the shelf by one case. */
export const PIXELS_PER_CASE = 110;
/** Cases further than this from the active one fade out. */
const MAX_VISIBLE_DISTANCE = 4;

const ACTIVE_DEPTH_IN_PIXELS = 140;
const SIDE_DEPTH_IN_PIXELS = -40;
const DEPTH_STEP_IN_PIXELS = 50;
const FIRST_SIDE_OFFSET_IN_PIXELS = 150;
const SIDE_STEP_IN_PIXELS = 105;
const SIDE_ROTATION_IN_DEGREES = 58;
const BASE_Z_INDEX = 100;

export function clampIndex(index: number, count: number): number {
  return Math.max(0, Math.min(index, count - 1));
}

/** Dragging left (negative distance) moves forward through the list. */
export function indexAfterDrag(activeIndex: number, dragDistance: number, count: number): number {
  if (Math.abs(dragDistance) <= DRAG_THRESHOLD_IN_PIXELS) {
    return activeIndex;
  }
  const steps = Math.round(dragDistance / PIXELS_PER_CASE) || Math.sign(dragDistance);
  return clampIndex(activeIndex - steps, count);
}

export function indexAfterKey(activeIndex: number, key: string, count: number): number | undefined {
  if (key === "ArrowRight") return clampIndex(activeIndex + 1, count);
  if (key === "ArrowLeft") return clampIndex(activeIndex - 1, count);
  return undefined;
}

export function formatCounter(activeIndex: number, count: number): string {
  return `${count === 0 ? 0 : activeIndex + 1} / ${count}`;
}

export type CasePose = {
  translateX: number;
  translateZ: number;
  rotateY: number;
  zIndex: number;
  opacity: number;
  interactive: boolean;
};

export function getCasePose(index: number, activeIndex: number): CasePose {
  const offset = index - activeIndex;
  const distance = Math.abs(offset);
  const side = offset < 0 ? -1 : 1;
  const isActive = offset === 0;
  const isVisible = distance <= MAX_VISIBLE_DISTANCE;

  return {
    translateX: isActive
      ? 0
      : side * (FIRST_SIDE_OFFSET_IN_PIXELS + (distance - 1) * SIDE_STEP_IN_PIXELS),
    translateZ: isActive
      ? ACTIVE_DEPTH_IN_PIXELS
      : SIDE_DEPTH_IN_PIXELS - distance * DEPTH_STEP_IN_PIXELS,
    rotateY: isActive ? 0 : -side * SIDE_ROTATION_IN_DEGREES,
    zIndex: BASE_Z_INDEX - distance,
    opacity: isVisible ? 1 : 0,
    interactive: isVisible,
  };
}
