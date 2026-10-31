import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { resolveLocale } from "@/i18n/resolve-locale";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// next/og cannot read CSS variables, so the design tokens are mirrored here.
const colors = {
  background: "#0e0e10",
  text: "#edede8",
  muted: "#9a9a94",
  accent: "#ff6b35",
  accentHigh: "#ff9461",
  accentLow: "#d9501c",
  onAccent: "#0e0e10",
};

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
        background: colors.background,
        color: colors.text,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at 78% 18%, rgba(255, 107, 53, 0.38), rgba(255, 107, 53, 0) 45%)",
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
            background: `linear-gradient(135deg, ${colors.accentHigh}, ${colors.accent} 45%, ${colors.accentLow})`,
            color: colors.onAccent,
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
          <div style={{ marginTop: 28, fontSize: 38, color: colors.muted, maxWidth: 1040 }}>
            {t("tagline")}
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
