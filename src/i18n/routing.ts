import { defineRouting } from "next-intl/routing";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export const routing = defineRouting({
  locales: ["en", "pt"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeCookie: { maxAge: ONE_YEAR_IN_SECONDS },
});
