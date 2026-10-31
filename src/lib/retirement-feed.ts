const SITE_URL = "https://willianjusten.com.br";
const FAREWELL_PUBLISHED_AT = new Date("2026-11-01T12:00:00Z");

/** Builds the permanent RSS feed: a single item announcing the blog retirement. */
export function buildRetirementFeed(): string {
  const publishedAt = FAREWELL_PUBLISHED_AT.toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Willian Justen</title>
    <link>${SITE_URL}/</link>
    <description>The blog is retired. Thank you for reading all these years.</description>
    <language>en</language>
    <lastBuildDate>${publishedAt}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <item>
      <title>Thank you, and goodbye</title>
      <link>${SITE_URL}/</link>
      <guid isPermaLink="false">blog-retirement</guid>
      <pubDate>${publishedAt}</pubDate>
      <description>Thank you for following the blog all these years. It is retired now, and willianjusten.com.br is my home for places, games, NBA and music. Obrigado por acompanhar o blog todos esses anos.</description>
    </item>
  </channel>
</rss>
`;
}
