import { describe, expect, it } from "vitest";
import { formatSaoPauloTime } from "../lib/sao-paulo-time";

describe("formatSaoPauloTime", () => {
  it("shows 24h HH:MM in America/Sao_Paulo (UTC-3)", () => {
    expect(formatSaoPauloTime(new Date("2026-10-31T15:05:00Z"))).toBe("12:05");
  });

  it("wraps past midnight to the previous local day", () => {
    expect(formatSaoPauloTime(new Date("2026-10-31T02:30:00Z"))).toBe("23:30");
  });

  it("zero-pads midnight as 00:00 instead of 24:00", () => {
    expect(formatSaoPauloTime(new Date("2026-10-31T03:00:00Z"))).toBe("00:00");
  });
});
