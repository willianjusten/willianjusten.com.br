/**
 * The design tokens from `src/app/globals.css` as plain values. Canvas drawing and `next/og`
 * cannot read CSS variables, so they mirror them here; `palette.test.ts` keeps the two in step.
 */
export const palette = {
  background: "#0e0e10",
  text: "#edede8",
  textSecondary: "#cfcfc8",
  textMuted: "#9a9a94",
  accent: "#ff6b35",
  accentHigh: "#ff9461",
  accentLow: "#d9501c",
  onAccent: "#0e0e10",
  white: "#ffffff",
  black: "#000000",
} as const;

/** `#rrggbb` plus an opacity from 0 to 1, as a CSS `rgba()` string. */
export function withAlpha(hexColor: string, alpha: number): string {
  const value = hexColor.trim().replace("#", "");
  const red = parseInt(value.slice(0, 2), 16);
  const green = parseInt(value.slice(2, 4), 16);
  const blue = parseInt(value.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
