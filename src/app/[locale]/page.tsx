import { getTranslations } from "next-intl/server";
import { resolveLocale } from "@/i18n/resolve-locale";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "Home" });

  return (
    <main className="mx-auto flex min-h-screen max-w-page flex-col justify-center gap-4 px-8">
      <h1 className="font-display text-display leading-[0.88] font-extrabold tracking-[-0.04em]">
        {t("heading")}
      </h1>
      <p className="max-w-[640px] text-lead text-text-2">{t("subheading")}</p>
    </main>
  );
}
