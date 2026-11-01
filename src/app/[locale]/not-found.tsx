import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NotFoundSection } from "@/features/not-found/not-found-section";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("NotFound");
  return { title: t("metaTitle") };
}

export default function NotFoundPage() {
  return <NotFoundSection />;
}
