import { ArrowRight, Heart } from "lucide-react";
import { PLATFORM_STYLES } from "../lib/platforms";
import type { ShelfCase, ShelfList } from "../lib/shelf-cases";
import { StarRating } from "./star-rating";

export type ShelfDetailsLabels = {
  status: Record<ShelfList, string>;
  reaction: Record<ShelfList, string>;
  /** Shown on the Recommended tab once this browser has recommended the game. */
  reactionPressedRecommended: string;
  /** Contains `{rating}` and `{max}`. */
  rating: string;
  recommendLike: string;
};

type ShelfDetailsProps = {
  labels: ShelfDetailsLabels;
  activeList: ShelfList;
  activeCase: ShelfCase | null;
  emptyTitle: string;
  emptyNote: string;
  errorText: string | null;
  onToggleReaction: (shelfCase: ShelfCase) => void;
  onRecommendSimilar: () => void;
};

export function ShelfDetails({
  labels,
  activeList,
  activeCase,
  emptyTitle,
  emptyNote,
  errorText,
  onToggleReaction,
  onRecommendSimilar,
}: ShelfDetailsProps) {
  const reaction = activeCase?.reaction;
  const isReacted = reaction?.pressed ?? false;
  const reactionLabel = labels.reaction[activeList];
  const pressedReactionLabel =
    activeList === "recommended"
      ? labels.reactionPressedRecommended
      : `${reactionLabel} · ${reaction?.count ?? 0}`;
  const note = activeCase ? activeCase.note : emptyNote;
  const meta = [
    labels.status[activeList],
    ...(activeCase ? [PLATFORM_STYLES[activeCase.entry.platform].name, activeCase.year] : []),
  ].filter((part) => part !== null);

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-line px-5 pt-5 pb-6 sm:px-7">
      <div aria-live="polite" className="flex min-w-0 flex-[1_1_340px] flex-col gap-1.5">
        <p className="m-0 font-mono text-xs text-accent">{meta.join(" · ")}</p>
        <h3 className="m-0 font-display text-[30px] leading-none font-extrabold tracking-[-0.02em]">
          {activeCase?.entry.title ?? emptyTitle}
        </h3>
        {activeCase?.rating ? (
          <StarRating rating={activeCase.rating} label={labels.rating} />
        ) : null}
        {note !== "" ? <p className="m-0 text-ui text-text-2">{note}</p> : null}
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={isReacted}
          disabled={!reaction?.isEnabled}
          onClick={() => activeCase && onToggleReaction(activeCase)}
          className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-pill border px-4 text-sm whitespace-nowrap transition-colors sm:px-[18px] disabled:cursor-default disabled:opacity-40 ${
            isReacted
              ? "border-accent bg-accent/15 text-white"
              : "border-line-strong text-text hover:border-line-hover"
          }`}
        >
          <Heart size={16} aria-hidden="true" fill={isReacted ? "currentColor" : "none"} />
          {isReacted ? pressedReactionLabel : reactionLabel}
        </button>
        {activeCase?.canRecommendSimilar ? (
          <a
            href="#recommend"
            onClick={onRecommendSimilar}
            className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-line-strong px-4 text-sm whitespace-nowrap text-text no-underline sm:px-[18px] transition-colors hover:border-line-hover"
          >
            {labels.recommendLike}
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        ) : null}
      </div>
      {errorText ? (
        <p role="alert" className="m-0 basis-full text-sm text-text-muted">
          {errorText}
        </p>
      ) : null}
    </div>
  );
}
