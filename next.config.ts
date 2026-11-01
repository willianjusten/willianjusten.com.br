import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import oldPostSlugs from "./data/legacy/old-post-slugs.json";
import tripPhotos from "./src/content/generated/trip-photos.json";
import { buildSiteRedirects } from "./src/lib/retirement/retirement-redirects";

const nextConfig: NextConfig = {
  images: {
    // IGDB cover art and the Cloudinary trip albums, resized and re-encoded by next/image.
    remotePatterns: [
      new URL("https://images.igdb.com/igdb/image/upload/**"),
      new URL(`https://res.cloudinary.com/${tripPhotos.cloudName}/image/upload/**`),
    ],
  },
  // Old blog links end in a slash; buildSiteRedirects strips it itself, after the old URL rules.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return buildSiteRedirects(oldPostSlugs);
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
