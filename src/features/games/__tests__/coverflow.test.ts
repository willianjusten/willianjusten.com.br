import { describe, expect, it } from "vitest";
import {
  clampIndex,
  formatCounter,
  getCasePose,
  indexAfterDrag,
  indexAfterKey,
} from "../lib/coverflow";

describe("clampIndex", () => {
  it("keeps the index inside the list", () => {
    expect(clampIndex(-3, 5)).toBe(0);
    expect(clampIndex(9, 5)).toBe(4);
    expect(clampIndex(2, 5)).toBe(2);
  });

  it("is 0 for an empty list", () => {
    expect(clampIndex(3, 0)).toBe(0);
  });
});

describe("indexAfterDrag", () => {
  it("ignores drags of 40px or less", () => {
    expect(indexAfterDrag(2, 40, 6)).toBe(2);
    expect(indexAfterDrag(2, -40, 6)).toBe(2);
    expect(indexAfterDrag(2, 10, 6)).toBe(2);
  });

  it("moves one case for a short drag past the threshold, dragging left goes forward", () => {
    expect(indexAfterDrag(2, -41, 6)).toBe(3);
    expect(indexAfterDrag(2, 41, 6)).toBe(1);
  });

  it("moves one case per roughly 110px", () => {
    expect(indexAfterDrag(0, -230, 8)).toBe(2);
    expect(indexAfterDrag(5, 340, 8)).toBe(2);
  });

  it("clamps at both ends", () => {
    expect(indexAfterDrag(4, -900, 6)).toBe(5);
    expect(indexAfterDrag(1, 900, 6)).toBe(0);
  });
});

describe("indexAfterKey", () => {
  it("steps with the arrow keys and clamps", () => {
    expect(indexAfterKey(2, "ArrowRight", 5)).toBe(3);
    expect(indexAfterKey(2, "ArrowLeft", 5)).toBe(1);
    expect(indexAfterKey(4, "ArrowRight", 5)).toBe(4);
    expect(indexAfterKey(0, "ArrowLeft", 5)).toBe(0);
  });

  it("returns undefined for other keys", () => {
    expect(indexAfterKey(2, "Enter", 5)).toBeUndefined();
  });
});

describe("formatCounter", () => {
  it("is one-based", () => {
    expect(formatCounter(0, 14)).toBe("1 / 14");
    expect(formatCounter(0, 0)).toBe("0 / 0");
  });
});

describe("getCasePose", () => {
  it("puts the active case forward and flat", () => {
    expect(getCasePose(3, 3)).toMatchObject({
      translateX: 0,
      translateZ: 140,
      rotateY: 0,
      zIndex: 100,
      opacity: 1,
      interactive: true,
    });
  });

  it("fans neighbours out at 58 degrees facing the centre", () => {
    expect(getCasePose(4, 3)).toMatchObject({ translateX: 150, translateZ: -90, rotateY: -58 });
    expect(getCasePose(2, 3)).toMatchObject({ translateX: -150, translateZ: -90, rotateY: 58 });
    expect(getCasePose(5, 3)).toMatchObject({ translateX: 255, translateZ: -140, zIndex: 98 });
  });

  it("hides cases more than four steps away", () => {
    expect(getCasePose(9, 3)).toMatchObject({ opacity: 0, interactive: false });
    expect(getCasePose(7, 3)).toMatchObject({ opacity: 1, interactive: true });
  });
});
