import { createHighlighter, Highlighter } from "shiki";

let highlighterInstance: Highlighter | null = null;

export async function getHighlighterInstance(): Promise<Highlighter> {
  if (!highlighterInstance) {
    highlighterInstance = await createHighlighter({
      langs: [
        "html",
        "css",
        "js",
        "ts",
        "yaml",
        "json",
        "bash",
        "ruby",
        "jsx",
        "scss",
        "pug",
        "markdown",
      ],
      themes: ["one-dark-pro"],
    });
  }
  return highlighterInstance;
}
