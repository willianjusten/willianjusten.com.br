import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { resolveLocale } from "@/i18n/resolve-locale";
import { routing } from "@/i18n/routing";
import { palette, withAlpha } from "@/lib/palette";

export const alt = "Willian Justen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * next/og has no bold built-in font, so the site's fonts are bundled: Bricolage Grotesque
 * ExtraBold for the logo mark and name, Inter Regular for the tagline.
 */
const FONTS_DIRECTORY = join(process.cwd(), "src/app/[locale]/fonts");
const DISPLAY_FONT = {
  family: "Bricolage Grotesque",
  weight: 800,
  file: "BricolageGrotesque-ExtraBold.ttf",
} as const;
const BODY_FONT = { family: "Inter", weight: 400, file: "Inter-Regular.ttf" } as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const [displayFontData, bodyFontData] = await Promise.all([
    readFile(join(FONTS_DIRECTORY, DISPLAY_FONT.file)),
    readFile(join(FONTS_DIRECTORY, BODY_FONT.file)),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: palette.background,
        color: palette.text,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at 78% 18%, ${withAlpha(palette.accent, 0.38)}, ${withAlpha(palette.accent, 0)} 45%)`,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${palette.accentHigh}, ${palette.accent} 45%, ${palette.accentLow})`,
            color: palette.onAccent,
            fontSize: 52,
            fontFamily: DISPLAY_FONT.family,
            fontWeight: DISPLAY_FONT.weight,
          }}
        >
          wj
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 112,
              fontFamily: DISPLAY_FONT.family,
              fontWeight: DISPLAY_FONT.weight,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            Willian Justen
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 34,
              fontFamily: BODY_FONT.family,
              fontWeight: BODY_FONT.weight,
              color: palette.textMuted,
              maxWidth: 1040,
            }}
          >
            {t("tagline")}
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: DISPLAY_FONT.family, data: displayFontData, weight: DISPLAY_FONT.weight },
        { name: BODY_FONT.family, data: bodyFontData, weight: BODY_FONT.weight },
      ],
    },
  );
}
