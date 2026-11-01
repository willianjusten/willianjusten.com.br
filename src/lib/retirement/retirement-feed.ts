import { SITE_URL } from "@/lib/site";

const FAREWELL_PUBLISHED_AT = new Date("2026-11-01T12:00:00Z");

export function buildRetirementFeed(): string {
  const publishedAt = FAREWELL_PUBLISHED_AT.toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Willian Justen</title>
    <link>${SITE_URL}/</link>
    <description>O blog foi aposentado. Obrigado por ler todos esses anos.</description>
    <language>pt-BR</language>
    <lastBuildDate>${publishedAt}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <item>
      <title>Obrigado, e até logo</title>
      <link>${SITE_URL}/</link>
      <guid isPermaLink="false">blog-retirement</guid>
      <pubDate>${publishedAt}</pubDate>
      <description>Obrigado por acompanhar o blog todos esses anos. Ele foi aposentado, e willianjusten.com.br agora é a minha casa para lugares, jogos, NBA e música. Thank you for following the blog all these years.</description>
    </item>
  </channel>
</rss>
`;
}
