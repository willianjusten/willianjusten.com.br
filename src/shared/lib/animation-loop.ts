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

/** Read `.matches` per frame, so a mid-session settings change takes effect. */
export function reducedMotionQuery(): MediaQueryList {
  return window.matchMedia("(prefers-reduced-motion: reduce)");
}
