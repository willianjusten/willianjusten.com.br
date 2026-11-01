"use client";

import { useRef, useState, type FormEvent, type RefObject } from "react";
import { flushSync } from "react-dom";
import { fillTemplate } from "@/lib/fill-template";
import type { RecommendationSubmission, SubmitOutcome } from "../hooks/use-game-recommendations";
import type { IgdbSearchResult } from "../lib/igdb";
import { GameSearchCombobox, type GameSearchLabels } from "./game-search-combobox";
import { PickedGameCard } from "./picked-game-card";

export type RecommendFormLabels = GameSearchLabels & {
  title: string;
  subtitle: string;
  chooseAnother: string;
  honeypotLabel: string;
  /** Contains `{title}`. */
  submit: string;
  submitting: string;
  /** Contains `{title}`. */
  doneApproved: string;
  /** Contains `{title}`. */
  donePending: string;
  rateLimited: string;
  failed: string;
  /** Contains `{count}`. */
  seeAll: string;
};

type RecommendFormProps = {
  labels: RecommendFormLabels;
  searchInputRef: RefObject<HTMLInputElement | null>;
  recommendedCount: number;
  onOpenRecommended: () => void;
  onSubmit: (submission: RecommendationSubmission) => Promise<SubmitOutcome>;
};

type Feedback = { tone: "success" | "error"; text: string } | null;

export function RecommendForm({
  labels,
  searchInputRef,
  recommendedCount,
  onOpenRecommended,
  onSubmit,
}: RecommendFormProps) {
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<IgdbSearchResult | null>(null);
  const [website, setWebsite] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  function changeQuery(nextQuery: string) {
    setQuery(nextQuery);
    setFeedback(null);
  }

  // The search box hides once a game is picked, so focus moves on to the next action.
  function pick(result: IgdbSearchResult) {
    flushSync(() => {
      setPicked(result);
      setFeedback(null);
    });
    submitButtonRef.current?.focus();
  }

  function clearPick() {
    flushSync(() => setPicked(null));
    searchInputRef.current?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!picked || isSending) {
      return;
    }
    setIsSending(true);
    setFeedback(null);
    const outcome = await onSubmit({ igdbId: picked.igdbId, website });
    setIsSending(false);
    if (outcome.kind === "saved") {
      const doneText =
        outcome.recommendation?.status === "approved" ? labels.doneApproved : labels.donePending;
      flushSync(() => {
        setFeedback({ tone: "success", text: fillTemplate(doneText, { title: picked.title }) });
        setPicked(null);
        setQuery("");
      });
      searchInputRef.current?.focus();
    } else {
      setFeedback({
        tone: "error",
        text: outcome.kind === "rate_limited" ? labels.rateLimited : labels.failed,
      });
    }
  }

  return (
    <div
      id="recommend"
      className="relative mt-6 scroll-mt-24 rounded-2xl border border-line bg-surface"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      >
        <div className="absolute -top-22.5 -right-22.5 size-65 rounded-full bg-accent/20 blur-3xl" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="relative flex max-w-lead flex-col gap-3.5 p-6 sm:p-8"
      >
        <h3 className="m-0 font-display text-2xl font-bold">{labels.title}</h3>
        <p className="-mt-1.5 mb-0 text-sm text-text-muted">{labels.subtitle}</p>

        <GameSearchCombobox
          labels={labels}
          inputRef={searchInputRef}
          query={query}
          isHidden={picked !== null}
          onQueryChange={changeQuery}
          onPick={pick}
        />

        {picked ? (
          <>
            <PickedGameCard
              game={picked}
              chooseAnotherLabel={labels.chooseAnother}
              onClear={clearPick}
            />

            <label aria-hidden="true" className="sr-only">
              {labels.honeypotLabel}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
            </label>

            <button
              ref={submitButtonRef}
              type="submit"
              disabled={isSending}
              className="min-h-12 pill-primary px-6 text-ui transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {isSending ? labels.submitting : fillTemplate(labels.submit, { title: picked.title })}
            </button>
          </>
        ) : null}

        <output
          className={`m-0 text-eyebrow ${feedback?.tone === "error" ? "text-text-2" : "text-accent"} ${feedback ? "" : "hidden"}`}
        >
          {feedback?.text}
        </output>

        {recommendedCount > 0 ? (
          <button
            type="button"
            onClick={onOpenRecommended}
            className="min-h-11 self-start pill-outline px-4 text-eyebrow text-text-2"
          >
            {fillTemplate(labels.seeAll, { count: recommendedCount })}
          </button>
        ) : null}
      </form>
    </div>
  );
}
