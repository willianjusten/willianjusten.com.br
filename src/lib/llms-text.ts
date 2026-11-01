import { places } from "@/content/places";
import { profile } from "@/content/profile";
import englishMessages from "../../messages/en.json";
import { COURTSIDE_URL, localeUrl, SITE_URL } from "./site";
import { realProfileUrls } from "./structured-data";

const SECTION_KEYS = ["places", "games", "nba", "music"] as const;

/**
 * Plain-text site summary for LLM crawlers (llmstxt.org). Built from the English copy and the
 * content modules, so it never repeats a `[placeholder]` and stays in step with the page.
 */
export function buildLlmsText(): string {
  const { Metadata, Header, Sections, Hero } = englishMessages;
  const { now } = profile;

  const sectionLines = SECTION_KEYS.map(
    (key) => `- [${Header[key]}](${SITE_URL}/#${key}): ${Sections[key].intro}`,
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
    `- ${Hero.playing.label}: ${now.playing.title} (${now.playing.platform})`,
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
