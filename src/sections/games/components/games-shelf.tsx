"use client";

import { useCallback, useRef, useState } from "react";
import { useGameReactions } from "../hooks/use-game-reactions";
import {
  useGameRecommendations,
  type RecommendationSubmission,
} from "../hooks/use-game-recommendations";
import { clampIndex } from "../lib/coverflow";
import type { ShelfGame } from "../lib/games-board";
import { countByList, countByPlatform, type PlatformFilter } from "../lib/shelf";
import {
  buildShelfCases,
  type ShelfCase,
  type ShelfCaseLabels,
  type ShelfList,
} from "../lib/shelf-cases";
import { RecommendForm, type RecommendFormLabels } from "./recommend-form";
import { ShelfDetails, type ShelfDetailsLabels } from "./shelf-details";
import { ShelfFilters, type ShelfFiltersLabels } from "./shelf-filters";
import { ShelfStage, type ShelfStageLabels } from "./shelf-stage";

/** Lets the "like this" link scroll to the form before the search box takes focus. */
const FOCUS_DELAY_IN_MILLISECONDS = 50;

type GamesShelfLabels = ShelfFiltersLabels &
  ShelfStageLabels &
  ShelfDetailsLabels &
  ShelfCaseLabels & {
    reactionError: string;
    voteRateLimited: string;
    emptyRecommendedTitle: string;
    emptyRecommendedNote: string;
    emptyTitle: string;
    emptyNote: string;
    form: RecommendFormLabels;
  };

type GamesShelfProps = {
  games: ShelfGame[];
  labels: GamesShelfLabels;
};

export function GamesShelf({ games, labels }: GamesShelfProps) {
  const [activeList, setActiveList] = useState<ShelfList>("playing");
  const [platform, setPlatform] = useState<PlatformFilter>("all");
  const [rawIndex, setRawIndex] = useState(0);
  const reactions = useGameReactions();
  const { recommendations, voteError, submit, toggleVote } = useGameRecommendations();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const listCounts = { ...countByList(games), recommended: recommendations.length };
  const platformCounts =
    activeList === "recommended"
      ? countByPlatform([], "playing")
      : countByPlatform(games, activeList);
  const cases = buildShelfCases({
    list: activeList,
    platform,
    games,
    recommendations,
    reactionCounts: reactions.counts,
    myReactions: reactions.mine,
    labels,
  });
  const activeIndex = clampIndex(rawIndex, cases.length);
  const activeCase = cases[activeIndex] ?? null;
  const isRecommendedTab = activeList === "recommended";
  const errorText =
    voteError === "rate_limited"
      ? labels.voteRateLimited
      : voteError || reactions.hasError
        ? labels.reactionError
        : null;

  const focusStage = useCallback(() => stageRef.current?.focus({ preventScroll: true }), []);

  function chooseList(list: ShelfList) {
    setActiveList(list);
    setRawIndex(0);
  }

  function choosePlatform(nextPlatform: PlatformFilter) {
    setPlatform(nextPlatform);
    setRawIndex(0);
  }

  function openRecommended() {
    chooseList("recommended");
    tabsRef.current?.scrollIntoView({ block: "center" });
  }

  function focusRecommendForm() {
    setTimeout(() => searchInputRef.current?.focus(), FOCUS_DELAY_IN_MILLISECONDS);
  }

  function toggleReaction({ reaction }: ShelfCase) {
    if (reaction.target.kind === "game") reactions.toggle(reaction.target.gameSlug);
    else toggleVote(reaction.target.recommendationId);
  }

  async function submitRecommendation(submission: RecommendationSubmission) {
    const outcome = await submit(submission);
    if (outcome.kind === "saved" && outcome.recommendation) {
      const savedId = outcome.recommendation.id;
      setActiveList("recommended");
      setPlatform("all");
      setRawIndex(outcome.recommendations.findIndex((item) => item.id === savedId));
    }
    return outcome;
  }

  return (
    <div className="mt-10">
      <ShelfFilters
        labels={labels}
        activeList={activeList}
        listCounts={listCounts}
        platform={platform}
        platformCounts={platformCounts}
        tabsRef={tabsRef}
        onChooseList={chooseList}
        onChoosePlatform={choosePlatform}
      />

      <div className="overflow-hidden rounded-2xl border border-line bg-surface">
        <ShelfStage
          labels={labels}
          cases={cases}
          activeIndex={activeIndex}
          emptyTitle={isRecommendedTab ? labels.emptyRecommendedTitle : labels.emptyTitle}
          stageRef={stageRef}
          onChangeIndex={setRawIndex}
          onFocusStage={focusStage}
        />
        <ShelfDetails
          labels={labels}
          activeList={activeList}
          activeCase={activeCase}
          emptyTitle={isRecommendedTab ? labels.emptyRecommendedTitle : labels.emptyTitle}
          emptyNote={isRecommendedTab ? labels.emptyRecommendedNote : labels.emptyNote}
          errorText={errorText}
          onToggleReaction={toggleReaction}
          onRecommendSimilar={focusRecommendForm}
        />
      </div>

      <RecommendForm
        labels={labels.form}
        searchInputRef={searchInputRef}
        recommendedCount={recommendations.length}
        onOpenRecommended={openRecommended}
        onSubmit={submitRecommendation}
      />
    </div>
  );
}
