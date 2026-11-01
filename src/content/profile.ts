import { z } from "zod";

/** Unknown values are written as `[like this]` so they render visibly until Will fills them in. */
const PLACEHOLDER_PATTERN = /^\[.+\]$/;

export function isPlaceholder(value: string): boolean {
  return PLACEHOLDER_PATTERN.test(value);
}

const placeholderText = z.string().regex(PLACEHOLDER_PATTERN);
const localizedText = z.object({ en: z.string().min(1), pt: z.string().min(1) });

/** A real value, or a visible `[placeholder]` while it is unknown. */
const textOrPlaceholder = z.string().min(1);

const link = z.object({
  href: z.url(),
  /** True while the URL is only the service homepage and not Will's real profile. */
  isPlaceholder: z.boolean().default(false),
});

export const profileSchema = z.object({
  links: z.object({
    github: link,
    linkedin: link,
    instagram: link,
    x: link,
    unsplash: link,
    pexels: link,
    /** Either a real address or a `[placeholder]`; rendered as a mailto link only when real. */
    email: z.object({ address: z.union([z.email(), placeholderText]) }),
  }),
  now: z.object({
    building: z.object({ company: z.string().min(1), link: z.url() }),
    lastSeen: z.object({ place: z.string().min(1), when: localizedText }),
  }),
  nba: z.object({
    /** Who Courtside was built with, in the order they are credited. */
    builtWith: z.array(textOrPlaceholder).min(1),
  }),
});

export type Profile = z.output<typeof profileSchema>;

/** The X handle, e.g. `@Willian_justen`, taken from the profile URL's last path segment. */
export function xHandle(xProfileUrl: string): string {
  return `@${new URL(xProfileUrl).pathname.replaceAll("/", "")}`;
}

export const profileData: z.input<typeof profileSchema> = {
  links: {
    github: { href: "https://github.com/willianjusten" },
    linkedin: { href: "https://www.linkedin.com/in/willianjusten/" },
    instagram: { href: "https://www.instagram.com/will_justen/" },
    x: { href: "https://x.com/Willian_justen" },
    unsplash: { href: "https://unsplash.com/@willianjusten" },
    pexels: { href: "https://www.pexels.com/@willianjusten/" },
    email: { address: "willianjustenqui@gmail.com" },
  },
  now: {
    building: { company: "Spoke", link: "https://spoke.com/connect" },
    lastSeen: {
      place: "Amsterdam, NL",
      when: { en: "October 2026", pt: "Outubro de 2026" },
    },
  },
  nba: { builtWith: ["Bruna Grassi", "Marcus Silva"] },
};

export const profile: Profile = profileSchema.parse(profileData);
