import { buildRetirementFeed } from "@/lib/retirement-feed";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildRetirementFeed(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
