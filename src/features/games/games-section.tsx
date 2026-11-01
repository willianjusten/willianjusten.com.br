import { Gamepad2 } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { gameCovers } from "@/content/game-covers";
import { games } from "@/content/games";
import { SectionShell } from "@/components/section-shell";
import { GamesShelf } from "./components/games-shelf";
import { buildShelfEntries } from "./lib/games-board";

export async function GamesSection() {
  const t = await getTranslations("Sections.games");
  const locale = await getLocale();
  const shelfEntries = buildShelfEntries(games, gameCovers, locale);

  return (
    <SectionShell
      id="games"
      icon={Gamepad2}
      eyebrow={t("eyebrow")}
      title={t("title")}
      intro={t("intro")}
    >
      <GamesShelf
        games={shelfEntries}
        labels={{
          tabsLabel: t("shelf.tabsLabel"),
          platformsLabel: t("shelf.platformsLabel"),
          all: t("shelf.all"),
          tabs: {
            playing: t("shelf.tabs.playing"),
            played: t("shelf.tabs.played"),
            wishlist: t("shelf.tabs.wishlist"),
            recommended: t("shelf.tabs.recommended"),
          },
          status: {
            playing: t("shelf.status.playing"),
            played: t("shelf.status.played"),
            wishlist: t("shelf.status.wishlist"),
            recommended: t("shelf.status.recommended"),
          },
          reaction: {
            playing: t("shelf.reaction.playing"),
            played: t("shelf.reaction.played"),
            wishlist: t("shelf.reaction.wishlist"),
            recommended: t("shelf.reaction.recommended"),
          },
          reactionError: t("shelf.reactionError"),
          voteRateLimited: t("shelf.voteRateLimited"),
          reactionPressedRecommended: t("shelf.reactionPressedRecommended"),
          sticker: t.raw("shelf.sticker"),
          pendingSticker: t("shelf.pendingSticker"),
          pendingNote: t("shelf.pendingNote"),
          rating: t.raw("shelf.rating"),
          stageLabel: t("shelf.stageLabel"),
          previous: t("shelf.previous"),
          next: t("shelf.next"),
          showGame: t.raw("shelf.showGame"),
          counterHint: t("shelf.counterHint"),
          soon: t("shelf.soon"),
          emptyRecommendedTitle: t("shelf.emptyRecommendedTitle"),
          emptyRecommendedNote: t("shelf.emptyRecommendedNote"),
          emptyTitle: t("shelf.emptyTitle"),
          emptyNote: t("shelf.emptyNote"),
          recommendLike: t("shelf.recommendLike"),
          form: {
            title: t("form.title"),
            subtitle: t("form.subtitle"),
            searchLabel: t("form.searchLabel"),
            searchPlaceholder: t("form.searchPlaceholder"),
            resultsLabel: t("form.resultsLabel"),
            searching: t("form.searching"),
            noResults: t("form.noResults"),
            searchError: t("form.searchError"),
            credit: t("form.credit"),
            chooseAnother: t("form.chooseAnother"),
            honeypotLabel: t("form.honeypotLabel"),
            submit: t.raw("form.submit"),
            submitting: t("form.submitting"),
            doneApproved: t.raw("form.doneApproved"),
            donePending: t.raw("form.donePending"),
            rateLimited: t("form.rateLimited"),
            failed: t("form.failed"),
            seeAll: t.raw("form.seeAll"),
          },
        }}
      />
    </SectionShell>
  );
}
