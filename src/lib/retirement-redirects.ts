export type RedirectRule = {
  source: string;
  destination: string;
  permanent: true;
};

const POST_DESTINATION = "/pt?from=blog";
const HOME_DESTINATION = "/";

/** Old blog routes that have no post behind them. `:path*` also matches the bare route. */
const OLD_ROUTE_SOURCES = [
  "/page/:path*",
  "/tags/:path*",
  "/about",
  "/about/",
  "/cursos",
  "/cursos/",
  "/series",
  "/series/",
  "/search",
  "/search/",
  "/js/",
  "/jekyll/",
  "/svg/",
  "/dev/",
];

/** Turns the committed list of old post slugs into permanent redirect rules. */
export function buildRetirementRedirects(oldPostSlugs: readonly string[]): RedirectRule[] {
  const postRules = oldPostSlugs.flatMap((slug) => [
    { source: `/${slug}`, destination: POST_DESTINATION, permanent: true as const },
    { source: `/${slug}/`, destination: POST_DESTINATION, permanent: true as const },
  ]);
  const routeRules = OLD_ROUTE_SOURCES.map((source) => ({
    source,
    destination: HOME_DESTINATION,
    permanent: true as const,
  }));

  return [...postRules, ...routeRules];
}
