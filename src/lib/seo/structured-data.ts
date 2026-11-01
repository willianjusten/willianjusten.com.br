import type { Locale } from "next-intl";
import { places } from "@/content/places";
import { profile } from "@/content/profile";
import { localeUrl, SITE_URL } from "@/lib/site";

const PERSON_NAME = "Willian Justen";
const JOB_TITLE = "Product Engineer";
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LANGUAGE_TAGS = { en: "en", pt: "pt-BR" } as const satisfies Record<Locale, string>;

type PageCopy = { title: string; description: string };

/** Profile links that point at Will's real accounts, skipping service homepages still standing in. */
export function realProfileUrls(): string[] {
  const { email: _email, ...accountLinks } = profile.links;
  return Object.values(accountLinks)
    .filter((link) => !link.isPlaceholder)
    .map((link) => link.href);
}

export function buildStructuredData(locale: Locale, copy: PageCopy) {
  const pageUrl = localeUrl(locale);
  const home = places.find((place) => place.isHome);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: PERSON_NAME,
        inLanguage: Object.values(LANGUAGE_TAGS),
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profile-page`,
        url: pageUrl,
        name: copy.title,
        description: copy.description,
        inLanguage: LANGUAGE_TAGS[locale],
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: PERSON_NAME,
        url: SITE_URL,
        jobTitle: JOB_TITLE,
        description: copy.description,
        worksFor: {
          "@type": "Organization",
          name: profile.now.building.company,
          url: profile.now.building.link,
        },
        ...(home
          ? { homeLocation: { "@type": "Place", name: `${home.name}, ${home.country}` } }
          : {}),
        sameAs: realProfileUrls(),
      },
    ],
  };
}

/** Serialises JSON-LD for a `<script>` tag, escaping `<` so the payload cannot close the tag early. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
