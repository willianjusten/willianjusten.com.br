const MAX_PIXEL_RATIO = 2;

export function getCanvasPixelRatio(): number {
  return Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
}

/**
 * Sizes the backing store to the element at up to 2x density and scales the context to CSS pixels.
 * The store is only reassigned when it changed, because reassigning clears the canvas.
 */
export function fitCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
  const pixelRatio = getCanvasPixelRatio();
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const storeWidth = Math.round(width * pixelRatio);
  const storeHeight = Math.round(height * pixelRatio);
  if (canvas.width !== storeWidth || canvas.height !== storeHeight) {
    canvas.width = storeWidth;
    canvas.height = storeHeight;
  }
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  return { width, height, pixelRatio };
}
