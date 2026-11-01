import { PLATFORM_STYLES } from "@/sections/games/lib/platforms";
import { currentlyPlaying, games } from "@/content/games";
import { places } from "@/content/places";
import { profile } from "@/content/profile";
import englishMessages from "../../../messages/en.json";
import { COURTSIDE_URL, localeUrl, SITE_URL } from "@/lib/site";
import { realProfileUrls } from "./structured-data";

const SECTION_KEYS = ["places", "games", "nba", "music"] as const;
/** Rich-text link tags in the copy, such as `<unsplash>Unsplash</unsplash>`. */
const RICH_TEXT_LINK_PATTERN = /<(\w+)>(.*?)<\/\1>/g;
const RICH_TEXT_LINK_URLS: Record<string, string> = {
  unsplash: profile.links.unsplash.href,
  pexels: profile.links.pexels.href,
};

/** Turns rich-text link tags into Markdown links, or plain text when the tag has no URL. */
function toMarkdown(richText: string): string {
  return richText.replace(RICH_TEXT_LINK_PATTERN, (_tag, name: string, label: string) => {
    const url = RICH_TEXT_LINK_URLS[name];
    return url ? `[${label}](${url})` : label;
  });
}

/**
 * Plain-text site summary for LLM crawlers (llmstxt.org). Built from the English copy and the
 * content modules, so it never repeats a `[placeholder]` and stays in step with the page.
 */
export function buildLlmsText(): string {
  const { Metadata, Header, Sections, Hero } = englishMessages;
  const { now } = profile;
  const playing = currentlyPlaying(games);

  const sectionLines = SECTION_KEYS.map(
    (key) => `- [${Header[key]}](${SITE_URL}/#${key}): ${toMarkdown(Sections[key].intro)}`,
  );
  const placeLines = places.map((place) => {
    const location = place.name === place.country ? place.name : `${place.name}, ${place.country}`;
    return `- ${location}${place.isHome ? " (home)" : ""}`;
  });
  const linkLines = [
    ...realProfileUrls().map((url) => `- ${url}`),
    `- [Courtside, the NBA app](${COURTSIDE_URL})`,
    `- [RSS feed](${SITE_URL}/feed.xml)`,
  ];

  return [
    "# Willian Justen",
    "",
    `> ${Metadata.description}`,
    "",
    `Personal site of Willian Justen, in English at ${localeUrl("en")} and in Portuguese at ${localeUrl("pt")}. It replaced the blog that used to live at this address; old post URLs now redirect here.`,
    "",
    "## Sections",
    "",
    ...sectionLines,
    "",
    "## Now",
    "",
    `- ${Hero.building.label}: [${Hero.building.value}](${now.building.link})`,
    `- ${Hero.playing.label}: ${playing.title} (${PLATFORM_STYLES[playing.platform].name})`,
    `- ${Hero.lastSeen.label}: ${now.lastSeen.place}, ${now.lastSeen.when.en}`,
    "",
    "## Places visited",
    "",
    ...placeLines,
    "",
    "## Links",
    "",
    ...linkLines,
    "",
  ].join("\n");
}
