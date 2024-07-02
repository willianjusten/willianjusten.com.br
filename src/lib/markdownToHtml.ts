import { unified } from "unified";
import parse from "remark-parse";
import rehype from "remark-rehype";
import headings from "rehype-autolink-headings";
import slug from "rehype-slug";
import stringify from "rehype-stringify";
import rehypeShiki from "@shikijs/rehype";

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(parse)
    .use(rehype)
    .use(rehypeShiki, {
      theme: "one-dark-pro",
    })
    .use(slug)
    .use(headings, {
      behavior: "wrap",
    })
    .use(stringify)
    .process(markdown);

  return result.toString();
}
