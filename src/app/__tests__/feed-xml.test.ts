import { describe, expect, it } from "vitest";
import { GET } from "../feed.xml/route";

describe("/feed.xml", () => {
  it("serves RSS with exactly one farewell item linking to the new site", async () => {
    const response = GET();
    const body = await response.text();

    expect(response.headers.get("content-type")).toContain("application/rss+xml");
    expect(body).toContain('<rss version="2.0"');
    expect(body.match(/<item>/g)).toHaveLength(1);
    expect(body).toContain("<link>https://willianjusten.com.br/</link>");
    expect(body).toContain("<language>pt-BR</language>");
    expect(body).not.toContain("—");
  });
});
