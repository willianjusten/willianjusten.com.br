import { getTranslations } from "next-intl/server";
import { HeaderFrame } from "./header-frame";
import { LocaleToggle } from "./locale-toggle";

const navigationLinks = [
  { key: "places", href: "#places" },
  { key: "games", href: "#games" },
  { key: "nba", href: "#nba" },
  { key: "music", href: "#music" },
] as const;

export async function Header() {
  const t = await getTranslations("Header");

  return (
    <HeaderFrame>
      <a
        href="#top"
        aria-label={t("backToTop")}
        className="inline-flex min-h-11 min-w-11 items-center justify-center no-underline"
      >
        <span className="wiggle flex size-9 items-center justify-center rounded-sm bg-(image:--ball-light) font-display text-[17px] font-extrabold text-on-accent">
          wj
        </span>
      </a>
      <nav
        aria-label={t("navigationLabel")}
        className="order-3 flex basis-full flex-wrap gap-x-7 text-ui font-medium [text-shadow:0_1px_12px_rgba(0,0,0,0.6)] min-[900px]:order-none min-[900px]:basis-auto"
      >
        {navigationLinks.map(({ key, href }) => (
          <a
            key={key}
            href={href}
            className="nav-link inline-flex min-h-11 items-center no-underline"
          >
            <span className="nav-link-label">{t(key)}</span>
          </a>
        ))}
      </nav>
      <LocaleToggle />
    </HeaderFrame>
  );
}
