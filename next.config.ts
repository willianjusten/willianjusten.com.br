import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import oldPostSlugs from "./data/legacy/old-post-slugs.json";
import { buildRetirementRedirects } from "./src/lib/retirement-redirects";

const KEPT_REDIRECTS = [
  { source: "/my-trips/", destination: "/#places" },
  { source: "/my-trips", destination: "/#places" },
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
].map((rule) => ({ ...rule, permanent: true }));

const nextConfig: NextConfig = {
  async redirects() {
    // Kept redirects come first so they win over the generic post rules.
    return [...KEPT_REDIRECTS, ...buildRetirementRedirects(oldPostSlugs)];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
