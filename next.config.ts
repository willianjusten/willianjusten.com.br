import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import oldPostSlugs from "./data/legacy/old-post-slugs.json";
import { KEPT_REDIRECTS, buildRetirementRedirects } from "./src/lib/retirement-redirects";

const nextConfig: NextConfig = {
  images: {
    // IGDB cover art, resized and re-encoded by next/image instead of loaded at full size.
    remotePatterns: [new URL("https://images.igdb.com/igdb/image/upload/**")],
  },
  async redirects() {
    // Kept redirects come first so they win over the generic post rules.
    return [...KEPT_REDIRECTS, ...buildRetirementRedirects(oldPostSlugs)];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
