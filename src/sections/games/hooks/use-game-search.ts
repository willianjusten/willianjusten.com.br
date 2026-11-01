"use client";

import { useEffect, useState } from "react";
import type { IgdbSearchResult } from "../lib/igdb";

const SEARCH_ENDPOINT = "/api/games/search";
const SEARCH_DEBOUNCE_IN_MILLISECONDS = 300;
export const MIN_SEARCH_LENGTH = 2;

type SearchResponse = { query: string; results: IgdbSearchResult[]; hasFailed: boolean };

/** Debounced search through our own route; IGDB is never called from the browser. */
export function useGameSearch(rawQuery: string) {
  const query = rawQuery.trim();
  const [response, setResponse] = useState<SearchResponse | null>(null);
  const isSearchable = query.length >= MIN_SEARCH_LENGTH;

  useEffect(() => {
    if (!isSearchable) {
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch(`${SEARCH_ENDPOINT}?q=${encodeURIComponent(query)}`, { signal: controller.signal })
        .then((result) => (result.ok ? result.json() : Promise.reject(result)))
        .then((body: { results: IgdbSearchResult[] }) =>
          setResponse({ query, results: body.results, hasFailed: false }),
        )
        .catch((error: unknown) => {
          if (!(error instanceof DOMException && error.name === "AbortError")) {
            setResponse({ query, results: [], hasFailed: true });
          }
        });
    }, SEARCH_DEBOUNCE_IN_MILLISECONDS);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [isSearchable, query]);

  const hasAnswer = isSearchable && response?.query === query;
  return {
    isSearchable,
    isLoading: isSearchable && !hasAnswer,
    hasFailed: hasAnswer && response.hasFailed,
    results: hasAnswer ? response.results : [],
  };
}
