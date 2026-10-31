import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { resolveLocale } from "@/i18n/resolve-locale";
import { routing } from "@/i18n/routing";
import { palette, withAlpha } from "@/lib/palette";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });

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
            fontWeight: 800,
          }}
        >
          wj
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>
            Willian Justen
          </div>
          <div style={{ marginTop: 28, fontSize: 38, color: palette.textMuted, maxWidth: 1040 }}>
            {t("tagline")}
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
