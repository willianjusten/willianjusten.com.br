import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import proxy from "./proxy";

function visit(pathname: string, headers: Record<string, string> = {}) {
  const request = new NextRequest(`http://localhost:3000${pathname}`, { headers });
  return proxy(request);
}

function redirectPathname(response: Response) {
  const location = response.headers.get("location");
  return location ? new URL(location).pathname : null;
}

describe("locale routing", () => {
  it("serves English at the unprefixed root for an English browser", () => {
    const response = visit("/", { "accept-language": "en-US,en;q=0.9" });

    expect(redirectPathname(response)).toBeNull();
    expect(response.headers.get("x-middleware-rewrite")).toContain("/en");
  });

  it("redirects a pt-BR browser on its first visit to /pt", () => {
    const response = visit("/", { "accept-language": "pt-BR,pt;q=0.9,en;q=0.8" });

    expect(redirectPathname(response)).toBe("/pt");
  });

  it("honors a remembered English choice over a pt-BR browser", () => {
    const response = visit("/", {
      "accept-language": "pt-BR,pt;q=0.9",
      cookie: "NEXT_LOCALE=en",
    });

    expect(redirectPathname(response)).toBeNull();
  });

  it("keeps /pt on Portuguese for an English browser", () => {
    const response = visit("/pt", { "accept-language": "en-US,en;q=0.9" });

    expect(redirectPathname(response)).toBeNull();
  });

  it("never prefixes the default locale", () => {
    const response = visit("/en");

    expect(redirectPathname(response)).toBe("/");
  });
});
