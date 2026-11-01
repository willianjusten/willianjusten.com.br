/**
 * Calls `onFrame` on every animation frame while `element` is on screen and the tab is visible,
 * so offscreen canvases cost nothing. `onFrame` gets the milliseconds since the previous frame,
 * 0 on the first frame after a pause. Returns the cleanup for a `useEffect`.
 */
export function runWhileVisible(
  element: Element,
  onFrame: (elapsedInMilliseconds: number) => void,
): () => void {
  let frameId = 0;
  let previousFrameTime: number | undefined;
  let isInViewport = false;

  function loop(frameTime: number) {
    onFrame(previousFrameTime === undefined ? 0 : frameTime - previousFrameTime);
    previousFrameTime = frameTime;
    frameId = requestAnimationFrame(loop);
  }

  function stop() {
    cancelAnimationFrame(frameId);
    frameId = 0;
    previousFrameTime = undefined;
  }

  function sync() {
    if (!isInViewport || document.hidden) stop();
    else if (!frameId) frameId = requestAnimationFrame(loop);
  }

  const observer = new IntersectionObserver(([entry]) => {
    isInViewport = entry.isIntersecting;
    sync();
  });
  observer.observe(element);
  document.addEventListener("visibilitychange", sync);

  return () => {
    observer.disconnect();
    document.removeEventListener("visibilitychange", sync);
    stop();
  };
}

const STEP_IN_MILLISECONDS = 1000 / 60;
/** A frame this fraction of a step short still counts as a step; the shortfall carries over. */
const STEP_TOLERANCE = 0.1;
/** Past this, a long stall is dropped instead of replayed in one burst. */
const MAX_STEPS_PER_FRAME = 4;

/**
 * Turns frame durations into fixed 60 Hz steps, so motion tuned per frame runs at the same speed
 * on 120 Hz screens. One step is pending at the start, so the first frame advances.
 */
export function createFixedStepper(): (elapsedInMilliseconds: number) => number {
  let pendingMilliseconds = STEP_IN_MILLISECONDS;
  return (elapsedInMilliseconds) => {
    pendingMilliseconds += elapsedInMilliseconds;
    const steps = Math.floor(pendingMilliseconds / STEP_IN_MILLISECONDS + STEP_TOLERANCE);
    if (steps > MAX_STEPS_PER_FRAME) {
      pendingMilliseconds = 0;
      return MAX_STEPS_PER_FRAME;
    }
    pendingMilliseconds -= steps * STEP_IN_MILLISECONDS;
    return steps;
  };
}

/** Read `.matches` per frame, so a mid-session settings change takes effect. */
export function reducedMotionQuery(): MediaQueryList {
  return window.matchMedia("(prefers-reduced-motion: reduce)");
}
