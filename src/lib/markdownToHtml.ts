import { unified } from "unified";
import parse from "remark-parse";
import rehype from "remark-rehype";
import headings from "rehype-autolink-headings";
import slug from "rehype-slug";
import stringify from "rehype-stringify";
import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import { getHighlighterInstance } from "./highlighter";

export default async function markdownToHtml(markdown: string) {
  const highlighter = await getHighlighterInstance();

  const result = await unified()
    .use(parse)
    .use(rehype)
    .use(rehypeShikiFromHighlighter, highlighter, {
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
