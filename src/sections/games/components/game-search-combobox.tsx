"use client";

/* oxlint-disable jsx-a11y/no-noninteractive-element-to-interactive-role, jsx-a11y/prefer-tag-over-role */

import { Search } from "lucide-react";
import { useId, useState, type KeyboardEvent, type Ref } from "react";
import { ExternalLink } from "@/shared/components/external-link";
import { useGameSearch } from "../hooks/use-game-search";
import type { IgdbSearchResult } from "../lib/igdb";
import { SearchResultOption } from "./search-result-option";

const MAX_RESULTS_SHOWN = 6;

export type GameSearchLabels = {
  searchLabel: string;
  searchPlaceholder: string;
  resultsLabel: string;
  searching: string;
  noResults: string;
  searchError: string;
  credit: string;
};

type GameSearchComboboxProps = {
  labels: GameSearchLabels;
  inputRef: Ref<HTMLInputElement>;
  query: string;
  isHidden: boolean;
  onQueryChange: (query: string) => void;
  onPick: (result: IgdbSearchResult) => void;
};

export function GameSearchCombobox({
  labels,
  inputRef,
  query,
  isHidden,
  onQueryChange,
  onPick,
}: GameSearchComboboxProps) {
  const [isListDismissed, setIsListDismissed] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const baseId = useId();
  const listId = `${baseId}-results`;
  const inputId = `${baseId}-search`;
  const optionId = (index: number) => `${baseId}-option-${index}`;
  const { isSearchable, isLoading, hasFailed, results } = useGameSearch(query);
  const shownResults = results.slice(0, MAX_RESULTS_SHOWN);
  const isListOpen = isSearchable && !isHidden && !isListDismissed;

  function pick(result: IgdbSearchResult) {
    setHighlightedIndex(-1);
    onPick(result);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
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

  return (
    <div className={`relative ${isHidden ? "hidden" : ""}`}>
      <label htmlFor={inputId} className="sr-only">
        {labels.searchLabel}
      </label>
      <Search
        size={18}
        aria-hidden="true"
        className="pointer-events-none absolute top-3.5 left-3.5 text-text-faint"
      />
      <input
        id={inputId}
        ref={inputRef}
        type="search"
        role="combobox"
        aria-expanded={isListOpen}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={highlightedIndex >= 0 ? optionId(highlightedIndex) : undefined}
        autoComplete="off"
        value={query}
        placeholder={labels.searchPlaceholder}
        onChange={(event) => {
          setIsListDismissed(false);
          setHighlightedIndex(-1);
          onQueryChange(event.target.value);
        }}
        onKeyDown={handleKeyDown}
        className="min-h-[46px] w-full rounded-md border border-line-input bg-bg pr-3.5 pl-[42px] text-ui text-text placeholder:text-text-faint"
      />
      {isListOpen ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={labels.resultsLabel}
          className="absolute inset-x-0 top-[52px] z-50 m-0 flex max-h-80 list-none flex-col gap-0.5 overflow-auto rounded-lg border border-line-strong bg-surface p-1.5 shadow-(--shadow-2)"
        >
          {shownResults.map((result, index) => (
            <SearchResultOption
              key={result.igdbId}
              id={optionId(index)}
              result={result}
              isHighlighted={index === highlightedIndex}
              onPick={pick}
            />
          ))}
          {shownResults.length === 0 ? (
            <li role="presentation" className="px-3 py-2.5 text-sm text-text-muted">
              {isLoading ? labels.searching : hasFailed ? labels.searchError : labels.noResults}
            </li>
          ) : null}
        </ul>
      ) : null}
      <p className="mt-1.5 mb-0 text-right text-micro text-text-faint">
        <ExternalLink
          href="https://www.igdb.com"
          className="no-underline opacity-70 transition-opacity hover:opacity-100"
        >
          {labels.credit}
        </ExternalLink>
      </p>
    </div>
  );
}
