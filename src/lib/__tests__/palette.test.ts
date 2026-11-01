import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { palette, withAlpha } from "../palette";

const globalsCss = readFileSync("src/app/globals.css", "utf8");

function cssToken(name: string): string | undefined {
  return globalsCss.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`))?.[1];
}

describe("palette", () => {
  it("mirrors the colour tokens in globals.css", () => {
    expect(palette).toMatchObject({
      background: cssToken("bg"),
      text: cssToken("text"),
      textSecondary: cssToken("text-2"),
      textMuted: cssToken("text-muted"),
      accent: cssToken("accent"),
      accentHigh: cssToken("accent-hi"),
      accentLow: cssToken("accent-lo"),
      onAccent: cssToken("on-accent"),
    });
  });

  it("turns a hex colour and an opacity into rgba", () => {
    expect(withAlpha("#ff6b35", 0.38)).toBe("rgba(255, 107, 53, 0.38)");
  });
});
