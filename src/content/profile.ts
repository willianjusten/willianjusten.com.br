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
    unsplash: link,
    pexels: link,
    /** Either a real address or a `[placeholder]`; rendered as a mailto link only when real. */
    email: z.object({ address: z.union([z.email(), placeholderText]) }),
  }),
  now: z.object({
    building: z.object({ company: z.string().min(1) }),
    playing: z.object({
      title: z.string().min(1),
      platform: z.string().min(1),
      hours: z.union([z.number().int().positive(), placeholderText]),
    }),
    lastSeen: z.object({ place: z.string().min(1), when: localizedText }),
  }),
  nba: z.object({
    rootingTeam: textOrPlaceholder,
    /** Who Courtside was built with, in the order they are credited. */
    builtWith: z.array(textOrPlaceholder).min(1),
  }),
});

export type Profile = z.output<typeof profileSchema>;

export const profileData: z.input<typeof profileSchema> = {
  links: {
    github: { href: "https://github.com/willianjusten" },
    linkedin: { href: "https://www.linkedin.com/", isPlaceholder: true },
    instagram: { href: "https://www.instagram.com/", isPlaceholder: true },
    unsplash: { href: "https://unsplash.com/", isPlaceholder: true },
    pexels: { href: "https://www.pexels.com/", isPlaceholder: true },
    email: { address: "[your email]" },
  },
  now: {
    building: { company: "Spoke" },
    playing: { title: "Crimson Desert", platform: "PC", hours: "[hours]" },
    lastSeen: {
      place: "Amsterdam, NL",
      when: { en: "October 2026", pt: "Outubro de 2026" },
    },
  },
  nba: { rootingTeam: "[Team]", builtWith: ["[Collaborator one]", "[Collaborator two]"] },
};

export const profile: Profile = profileSchema.parse(profileData);
