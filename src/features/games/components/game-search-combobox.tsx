"use client";

/* oxlint-disable jsx-a11y/no-noninteractive-element-to-interactive-role, jsx-a11y/prefer-tag-over-role */

import { Search } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type Ref,
} from "react";
import { ExternalLink } from "@/components/external-link";
import { useGameSearch } from "../hooks/use-game-search";
import type { IgdbSearchResult } from "../lib/igdb";
import { SearchResultOption } from "./search-result-option";

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
  const isListOpen = isSearchable && !isHidden && !isListDismissed;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isListOpen) return;
    function dismissOnOutsidePress(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setIsListDismissed(true);
    }
    document.addEventListener("pointerdown", dismissOnOutsidePress);
    return () => document.removeEventListener("pointerdown", dismissOnOutsidePress);
  }, [isListOpen]);

  /** Tabbing away closes the list; a click on an option moves no focus, so it is unaffected. */
  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    if (event.relatedTarget) setIsListDismissed(true);
  }

  function pick(result: IgdbSearchResult) {
    setHighlightedIndex(-1);
    onPick(result);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setIsListDismissed(true);
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (results.length === 0) {
        return;
      }
      event.preventDefault();
      setIsListDismissed(false);
      const step = event.key === "ArrowDown" ? 1 : -1;
      setHighlightedIndex((current) => (current + step + results.length) % results.length);
    } else if (event.key === "Enter" && isListOpen && highlightedIndex >= 0) {
      event.preventDefault();
      pick(results[highlightedIndex]);
    }
  }

  return (
    <div ref={containerRef} onBlur={handleBlur} className={`relative ${isHidden ? "hidden" : ""}`}>
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
        onFocus={() => setIsListDismissed(false)}
        onBlur={handleBlur}
        className="min-h-11.5 w-full rounded-md border border-line-input bg-bg pr-3.5 pl-10.5 text-ui text-text placeholder:text-text-faint"
      />
      {isListOpen ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={labels.resultsLabel}
          className="absolute inset-x-0 top-13 z-50 m-0 flex max-h-80 list-none flex-col gap-0.5 overflow-auto rounded-lg border border-line-strong bg-surface p-1.5 shadow-(--shadow-2)"
        >
          {results.map((result, index) => (
            <SearchResultOption
              key={result.igdbId}
              id={optionId(index)}
              result={result}
              isHighlighted={index === highlightedIndex}
              onPick={pick}
            />
          ))}
          {results.length === 0 ? (
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
