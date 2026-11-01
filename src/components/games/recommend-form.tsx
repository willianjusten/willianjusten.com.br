"use client";

/* oxlint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events, jsx-a11y/no-autofocus, jsx-a11y/no-noninteractive-element-to-interactive-role, jsx-a11y/prefer-tag-over-role */

import { Search, X } from "lucide-react";
import { useId, useState } from "react";
import type { ChangeEvent, FormEvent, KeyboardEvent, Ref } from "react";
import { flushSync } from "react-dom";
import { pickPrimaryPlatform } from "@/lib/games/igdb";
import type { IgdbSearchResult } from "@/lib/games/igdb";
import { CoverThumb } from "./cover-thumb";
import { PLATFORM_STYLES } from "./platform-style";
import type { RecommendationSubmission, SubmitOutcome } from "./use-game-recommendations";
import { useGameSearch } from "./use-game-search";

export type RecommendFormLabels = {
  title: string;
  subtitle: string;
  searchLabel: string;
  searchPlaceholder: string;
  resultsLabel: string;
  searching: string;
  noResults: string;
  searchError: string;
  credit: string;
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
  searchInputRef: Ref<HTMLInputElement>;
  recommendedCount: number;
  onOpenRecommended: () => void;
  onSubmit: (submission: RecommendationSubmission) => Promise<SubmitOutcome>;
};

const MAX_RESULTS_SHOWN = 6;
const FIELD_CLASS =
  "w-full rounded-md border border-line-input bg-bg px-3.5 text-[15px] text-text placeholder:text-text-faint";

type Feedback = { tone: "success" | "error"; text: string } | null;

function formatMeta(result: Pick<IgdbSearchResult, "year" | "platforms">): string {
  const platforms = result.platforms.map((platform) => PLATFORM_STYLES[platform].name);
  return [result.year, ...platforms].filter(Boolean).join(" · ");
}

export function RecommendForm({
  labels,
  searchInputRef,
  recommendedCount,
  onOpenRecommended,
  onSubmit,
}: RecommendFormProps) {
  const [query, setQuery] = useState("");
  const [isListDismissed, setIsListDismissed] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [picked, setPicked] = useState<IgdbSearchResult | null>(null);
  const [website, setWebsite] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const baseId = useId();
  const listId = `${baseId}-results`;
  const searchInputId = `${baseId}-search`;
  const { isSearchable, isLoading, hasFailed, results } = useGameSearch(query);
  const shownResults = results.slice(0, MAX_RESULTS_SHOWN);
  const isListOpen = isSearchable && picked === null && !isListDismissed;

  function changeQuery(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setIsListDismissed(false);
    setHighlightedIndex(-1);
    setFeedback(null);
  }

  function pick(result: IgdbSearchResult) {
    setPicked(result);
    setHighlightedIndex(-1);
    setFeedback(null);
  }

  function clearPick() {
    flushSync(() => setPicked(null));
    if (searchInputRef && "current" in searchInputRef) {
      searchInputRef.current?.focus();
    }
  }

  function handleSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setIsListDismissed(true);
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (shownResults.length === 0) {
        return;
      }
      event.preventDefault();
      setIsListDismissed(false);
      const step = event.key === "ArrowDown" ? 1 : -1;
      setHighlightedIndex(
        (current) => (current + step + shownResults.length) % shownResults.length,
      );
    } else if (event.key === "Enter" && isListOpen && highlightedIndex >= 0) {
      event.preventDefault();
      pick(shownResults[highlightedIndex]);
    }
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
      setFeedback({ tone: "success", text: doneText.replace("{title}", picked.title) });
      setPicked(null);
      setQuery("");
    } else {
      setFeedback({
        tone: "error",
        text: outcome.kind === "rate_limited" ? labels.rateLimited : labels.failed,
      });
    }
  }

  const optionId = (index: number) => `${baseId}-option-${index}`;

  return (
    <div
      id="recommend"
      className="relative mt-6 scroll-mt-24 rounded-2xl border border-line bg-surface"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      >
        <div className="absolute -top-[90px] -right-[90px] size-[260px] rounded-full bg-accent/20 blur-3xl" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="relative flex max-w-[640px] flex-col gap-3.5 p-6 sm:p-8"
      >
        <h3 className="m-0 font-display text-2xl font-bold">{labels.title}</h3>
        <p className="-mt-1.5 mb-0 text-sm text-text-muted">{labels.subtitle}</p>

        <div className={`relative ${picked ? "hidden" : ""}`}>
          <label htmlFor={searchInputId} className="sr-only">
            {labels.searchLabel}
          </label>
          <Search
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute top-3.5 left-3.5 text-text-faint"
          />
          <input
            id={searchInputId}
            ref={searchInputRef}
            type="search"
            role="combobox"
            aria-expanded={isListOpen}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={highlightedIndex >= 0 ? optionId(highlightedIndex) : undefined}
            autoComplete="off"
            value={query}
            placeholder={labels.searchPlaceholder}
            onChange={changeQuery}
            onKeyDown={handleSearchKeyDown}
            className={`${FIELD_CLASS} min-h-[46px] pl-[42px]`}
          />
          {isListOpen ? (
            <ul
              id={listId}
              role="listbox"
              aria-label={labels.resultsLabel}
              className="absolute inset-x-0 top-[52px] z-50 m-0 flex max-h-80 list-none flex-col gap-0.5 overflow-auto rounded-lg border border-line-strong bg-surface p-1.5 shadow-(--shadow-2)"
            >
              {shownResults.map((result, index) => (
                <li
                  key={result.igdbId}
                  id={optionId(index)}
                  role="option"
                  aria-selected={index === highlightedIndex}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => pick(result)}
                  className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-sm p-2 ${
                    index === highlightedIndex ? "bg-surface-hover" : "hover:bg-surface-hover"
                  }`}
                >
                  <CoverThumb
                    coverUrl={result.coverUrl}
                    platform={pickPrimaryPlatform(result.platforms)}
                    sizeClass="h-11 w-[34px]"
                    bandClass="h-2"
                  />
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-sm font-semibold text-text">
                      {result.title}
                      {result.year ? (
                        <span className="font-normal text-text-faint"> · {result.year}</span>
                      ) : null}
                    </span>
                    <span className="flex flex-wrap gap-1">
                      {result.platforms.map((platform) => (
                        <span
                          key={platform}
                          className={`rounded-xs px-1.5 py-px font-mono text-[9px] tracking-[0.5px] band-${platform}`}
                        >
                          {PLATFORM_STYLES[platform].bandText}
                        </span>
                      ))}
                    </span>
                  </span>
                </li>
              ))}
              {shownResults.length === 0 ? (
                <li role="presentation" className="px-3 py-2.5 text-sm text-text-muted">
                  {isLoading ? labels.searching : hasFailed ? labels.searchError : labels.noResults}
                </li>
              ) : null}
            </ul>
          ) : null}
          <p className="mt-2 mb-0 text-xs text-text-faint">
            <a
              href="https://www.igdb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-text-2"
            >
              {labels.credit}
            </a>
          </p>
        </div>

        {picked ? (
          <>
            <div className="flex items-center gap-3.5 rounded-lg border border-line-strong bg-bg p-3">
              <CoverThumb
                coverUrl={picked.coverUrl}
                platform={pickPrimaryPlatform(picked.platforms)}
                sizeClass="h-[66px] w-[52px] shadow-(--shadow-1)"
                bandClass="h-3"
              />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="truncate text-base font-bold">{picked.title}</span>
                <span className="font-mono text-[11px] text-text-muted">{formatMeta(picked)}</span>
              </div>
              <button
                type="button"
                aria-label={labels.chooseAnother}
                onClick={clearPick}
                className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-transparent text-text transition-colors hover:border-line-hover"
              >
                <X size={14} aria-hidden="true" />
              </button>
            </div>

            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label>
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
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="min-h-12 cursor-pointer rounded-pill border-0 bg-(image:--ball-light) px-6 text-[15px] font-semibold text-on-accent transition-opacity hover:opacity-90 disabled:cursor-default disabled:opacity-60"
            >
              {isSending ? labels.submitting : labels.submit.replace("{title}", picked.title)}
            </button>
          </>
        ) : null}

        <output
          className={`m-0 text-[13px] ${feedback?.tone === "error" ? "text-text-2" : "text-accent"} ${feedback ? "" : "hidden"}`}
        >
          {feedback?.text}
        </output>

        {recommendedCount > 0 ? (
          <button
            type="button"
            onClick={onOpenRecommended}
            className="min-h-11 cursor-pointer self-start rounded-pill border border-line-strong bg-transparent px-4 text-[13px] text-text-2 transition-colors hover:border-line-hover"
          >
            {labels.seeAll.replace("{count}", String(recommendedCount))}
          </button>
        ) : null}
      </form>
    </div>
  );
}
