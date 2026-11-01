import {
  clampLatitude,
  clampZoom,
  rotateByDrag,
  stepFlight,
  wrapLongitude,
  type FlightTarget,
  type GeoPoint,
  type GlobeView,
} from "./globe-math";

export const INITIAL_VIEW: GlobeView = { lat: 18, lon: -25, zoom: 1 };
const VIEW_RADIUS_RATIO = 0.42;
export const CENTER_Y_RATIO = 0.52;
const INERTIA_DECAY = 0.94;
const IDLE_SPIN_DEGREES_PER_FRAME = 0.06;
const IDLE_VELOCITY_LIMIT = 0.02;
const ZOOM_EASING = 0.08;
const KEY_ROTATE_IMPULSE = 1.5;
/** While an album is open on a wide stage, the globe slides left so the place stays clear of the panel. */
const ALBUM_CENTER_X_RATIO = 0.34;
const ALBUM_SHIFT_MIN_WIDTH = 760;
const CENTER_EASING = 0.08;

/** Unit direction of each arrow key as [longitude, latitude]. */
const ARROW_DIRECTIONS: Record<string, [number, number]> = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, 1],
  ArrowDown: [0, -1],
};

/** Mutable per-frame state of the globe camera, kept in a ref so the frame loop never re-renders. */
export type GlobeMotion = {
  view: GlobeView;
  velocity: { lon: number; lat: number };
  flightTarget: FlightTarget | null;
  zoomGoal: number;
  drag: { lastX: number; lastY: number } | null;
  /** Eased towards the stage centre, or towards the left while an album is open. */
  centerX: number | null;
};

export function createGlobeMotion(): GlobeMotion {
  return {
    view: INITIAL_VIEW,
    velocity: { lon: 0, lat: 0 },
    flightTarget: null,
    zoomGoal: INITIAL_VIEW.zoom,
    drag: null,
    centerX: null,
  };
}

export function baseRadiusOf(width: number, height: number): number {
  return Math.min(width, height) * VIEW_RADIUS_RATIO;
}

export function flyTo(motion: GlobeMotion, point: GeoPoint, zoom: number) {
  motion.velocity = { lon: 0, lat: 0 };
  motion.zoomGoal = clampZoom(zoom);
  motion.flightTarget = { lat: clampLatitude(point.lat), lon: point.lon, zoom: motion.zoomGoal };
}

export function zoomBy(motion: GlobeMotion, factor: number) {
  motion.zoomGoal = clampZoom(motion.zoomGoal * factor);
  if (motion.flightTarget) motion.flightTarget = { ...motion.flightTarget, zoom: motion.zoomGoal };
}

export function zoomOutToStart(motion: GlobeMotion) {
  motion.flightTarget = null;
  motion.zoomGoal = INITIAL_VIEW.zoom;
}

export function startDrag(motion: GlobeMotion, x: number, y: number) {
  motion.flightTarget = null;
  motion.drag = { lastX: x, lastY: y };
}

export function dragTo(motion: GlobeMotion, x: number, y: number, baseRadius: number) {
  if (!motion.drag) return;
  const next = rotateByDrag(
    motion.view,
    x - motion.drag.lastX,
    y - motion.drag.lastY,
    baseRadius * motion.view.zoom,
  );
  motion.velocity = {
    lon: wrapLongitude(next.lon - motion.view.lon),
    lat: next.lat - motion.view.lat,
  };
  motion.view = next;
  motion.drag = { lastX: x, lastY: y };
}

export function endDrag(motion: GlobeMotion) {
  motion.drag = null;
}

/** Adds an arrow key's spin to the globe. Returns false for any other key. */
export function nudgeByArrowKey(motion: GlobeMotion, key: string): boolean {
  const direction = ARROW_DIRECTIONS[key];
  if (!direction) return false;
  const impulse = KEY_ROTATE_IMPULSE / motion.view.zoom;
  motion.flightTarget = null;
  motion.velocity = {
    lon: motion.velocity.lon + direction[0] * impulse,
    lat: motion.velocity.lat + direction[1] * impulse,
  };
  return true;
}

function easeZoom(motion: GlobeMotion) {
  motion.view = {
    ...motion.view,
    zoom: motion.view.zoom + (motion.zoomGoal - motion.view.zoom) * ZOOM_EASING,
  };
}

/** One frame of motion: a flight, or inertia plus an idle spin, or only zoom easing while dragged. */
export function advanceGlobe(motion: GlobeMotion, canIdleSpin: boolean) {
  if (motion.drag) {
    easeZoom(motion);
    return;
  }
  if (motion.flightTarget) {
    const { view, hasArrived } = stepFlight(motion.view, motion.flightTarget);
    motion.view = view;
    if (hasArrived) motion.flightTarget = null;
    return;
  }
  const { velocity } = motion;
  motion.view = {
    lon: wrapLongitude(motion.view.lon + velocity.lon),
    lat: clampLatitude(motion.view.lat + velocity.lat),
    zoom: motion.view.zoom + (motion.zoomGoal - motion.view.zoom) * ZOOM_EASING,
  };
  velocity.lon *= INERTIA_DECAY;
  velocity.lat *= INERTIA_DECAY;
  if (canIdleSpin && Math.abs(velocity.lon) < IDLE_VELOCITY_LIMIT) {
    motion.view = {
      ...motion.view,
      lon: wrapLongitude(motion.view.lon + IDLE_SPIN_DEGREES_PER_FRAME / motion.view.zoom),
    };
  }
}

export function easeCenterX(motion: GlobeMotion, width: number, isAlbumOpen: boolean): number {
  const targetCenterX =
    isAlbumOpen && width >= ALBUM_SHIFT_MIN_WIDTH ? width * ALBUM_CENTER_X_RATIO : width / 2;
  motion.centerX =
    motion.centerX === null
      ? targetCenterX
      : motion.centerX + (targetCenterX - motion.centerX) * CENTER_EASING;
  return motion.centerX;
}
