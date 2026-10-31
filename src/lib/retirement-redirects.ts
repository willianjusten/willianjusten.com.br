export type RedirectRule = {
  source: string;
  destination: string;
  statusCode: 301;
};

/** Old URLs that still have a home. The my-trips audience was Portuguese, so it lands on /pt. */
export const KEPT_REDIRECTS = [
  { source: "/my-trips/", destination: "/pt#places" },
  { source: "/my-trips", destination: "/pt#places" },
  { source: "/japanese-words/", destination: "https://japanese-words.willianjusten.com.br/" },
  { source: "/learn-japanese/", destination: "https://learn-japanese.willianjusten.com.br/" },
  {
    source: "/js-com-tdd-na-pratica-na-udemy/",
    destination: "https://www.youtube.com/@WillianJustenCursos",
  },
  {
    source: "/novo-curso-aprenda-criar-sites-animados-greensock/",
    destination: "https://willianjusten.com.br",
  },
  {
    source: "/novo-curso-gatsby-crie-um-site-pwa-com-react-graphql-netlify-cms/",
    destination: "https://willianjusten.com.br",
  },
].map((rule) => ({ ...rule, statusCode: 301 as const }));

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
    { source: `/${slug}`, destination: POST_DESTINATION, statusCode: 301 as const },
    { source: `/${slug}/`, destination: POST_DESTINATION, statusCode: 301 as const },
  ]);
  const routeRules = OLD_ROUTE_SOURCES.map((source) => ({
    source,
    destination: HOME_DESTINATION,
    statusCode: 301 as const,
  }));

  return [...postRules, ...routeRules];
}
