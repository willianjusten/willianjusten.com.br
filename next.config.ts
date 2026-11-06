import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import oldPostSlugs from "./data/legacy/old-post-slugs.json";
import { buildSiteRedirects } from "./src/lib/retirement/retirement-redirects";

const nextConfig: NextConfig = {
  images: {
    // Cloudinary and IGDB resize the images themselves, so Vercel Image Optimization is not used.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  // Old blog links end in a slash; buildSiteRedirects strips it itself, after the old URL rules.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return buildSiteRedirects(oldPostSlugs);
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
