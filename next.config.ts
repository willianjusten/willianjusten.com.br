import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import oldPostSlugs from "./data/legacy/old-post-slugs.json";
import { KEPT_REDIRECTS, buildRetirementRedirects } from "./src/lib/retirement-redirects";

const nextConfig: NextConfig = {
  async redirects() {
    // Kept redirects come first so they win over the generic post rules.
    return [...KEPT_REDIRECTS, ...buildRetirementRedirects(oldPostSlugs)];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
