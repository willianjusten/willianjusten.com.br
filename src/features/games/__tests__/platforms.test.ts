import { describe, expect, it } from "vitest";
import { EMPTY_BAND_CLASS, PLATFORM_STYLES, platformStyle } from "../lib/platforms";

describe("platformStyle", () => {
  it("styles the shelf platforms with their own band", () => {
    expect(platformStyle("switch2")).toBe(PLATFORM_STYLES.switch2);
  });

  it("gives any other platform a neutral band carrying its own name", () => {
    expect(platformStyle("Nintendo 64")).toEqual({
      name: "Nintendo 64",
      bandText: "NINTENDO 64",
      bandClass: EMPTY_BAND_CLASS,
      dotClass: "dot-all",
    });
  });
});
