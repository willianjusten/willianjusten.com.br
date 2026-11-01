import { describe, expect, it } from "vitest";
import { fillTemplate } from "../lib/fill-template";

describe("fillTemplate", () => {
  it("fills every placeholder it has a value for", () => {
    expect(fillTemplate("{index} of {total}", { index: 2, total: 9 })).toBe("2 of 9");
  });

  it("leaves placeholders without a value untouched", () => {
    expect(fillTemplate("Recommend {title}", {})).toBe("Recommend {title}");
  });
});
