import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("/llms.txt", () => {
  it("serves a plain-text summary with the sections, places and real links", async () => {
    const response = GET();
    const body = await response.text();

    expect(response.headers.get("content-type")).toContain("text/plain");
    expect(body.startsWith("# Willian Justen\n\n> ")).toBe(true);
    expect(body).toContain("https://willianjusten.com.br/#games");
    expect(body).toContain("São Paulo, Brazil (home)");
    expect(body).toContain("https://github.com/willianjusten");
  });

  it("never repeats a placeholder or an em dash", async () => {
    const body = await GET().text();

    expect(body).not.toMatch(/\[[^\]]+\](?!\()/);
    expect(body).not.toContain("—");
  });
});
