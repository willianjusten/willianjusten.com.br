import { describe, expect, it } from "vitest";
import { createFixedStepper } from "../animation-loop";

const SIXTY_HERTZ_FRAME = 1000 / 60;

function stepsOver(frameDurations: number[]) {
  const stepFrame = createFixedStepper();
  return frameDurations.map((duration) => stepFrame(duration));
}

describe("createFixedStepper", () => {
  it("advances once on the first frame", () => {
    expect(stepsOver([0])).toEqual([1]);
  });

  it("steps once per frame at 60 Hz, even with timer jitter", () => {
    const jittered = [0, 16.5, 16.8, 16.6, 16.7, 16.4, 17];
    expect(stepsOver(jittered)).toEqual([1, 1, 1, 1, 1, 1, 1]);
  });

  it("steps every other frame at 120 Hz", () => {
    const frames = [0, ...Array.from({ length: 8 }, () => SIXTY_HERTZ_FRAME / 2)];
    const steps = stepsOver(frames);
    expect(steps.reduce((total, count) => total + count, 0)).toBe(5);
    expect(Math.max(...steps)).toBe(1);
  });

  it("catches up on a dropped frame", () => {
    expect(stepsOver([0, SIXTY_HERTZ_FRAME * 2])).toEqual([1, 2]);
  });

  it("drops a long stall instead of replaying it", () => {
    const stepFrame = createFixedStepper();
    stepFrame(0);
    expect(stepFrame(5000)).toBe(4);
    expect(stepFrame(SIXTY_HERTZ_FRAME)).toBe(1);
  });
});
