import { describe, expect, it } from "vitest";
import { cleanConnectionString, readConnectionString } from "../connection-string";
import { getClientIp, hashIp } from "../ip-hash";
import { evaluateRateLimit, getWindowStart } from "../rate-limit";

describe("hashIp", () => {
  it("is deterministic, keyed by the secret and never contains the raw IP", () => {
    const hash = hashIp("203.0.113.9", "secret-a");
    expect(hash).toBe(hashIp("203.0.113.9", "secret-a"));
    expect(hash).not.toBe(hashIp("203.0.113.9", "secret-b"));
    expect(hash).not.toContain("203.0.113.9");
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it("refuses to hash without a secret", () => {
    expect(() => hashIp("203.0.113.9", "")).toThrow();
  });
});

describe("getClientIp", () => {
  it("uses the first x-forwarded-for entry", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.9, 10.0.0.1" });
    expect(getClientIp(headers)).toBe("203.0.113.9");
  });

  it("falls back to x-real-ip then unknown", () => {
    expect(getClientIp(new Headers({ "x-real-ip": "198.51.100.2" }))).toBe("198.51.100.2");
    expect(getClientIp(new Headers())).toBe("unknown");
  });
});

describe("evaluateRateLimit", () => {
  const rule = { routeKey: "test", maxHits: 30, windowInSeconds: 60 };
  const now = new Date("2026-10-31T12:00:20Z");

  it("allows up to the maximum and blocks beyond it", () => {
    expect(evaluateRateLimit(30, rule, now).allowed).toBe(true);
    expect(evaluateRateLimit(31, rule, now).allowed).toBe(false);
  });

  it("tells the caller how long until the window resets", () => {
    expect(evaluateRateLimit(31, rule, now).retryAfterInSeconds).toBe(40);
  });

  it("aligns windows to the window size", () => {
    expect(getWindowStart(now, 60).toISOString()).toBe("2026-10-31T12:00:00.000Z");
  });
});

describe("connection string", () => {
  it("strips invisible control characters from a pasted value", () => {
    expect(cleanConnectionString("\u001bpostgresql://host/db\n")).toBe("postgresql://host/db");
  });

  it("throws when empty", () => {
    expect(() => readConnectionString("")).toThrow();
  });
});
