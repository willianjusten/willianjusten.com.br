"use client";

import { useEffect, useState } from "react";
import { fetchJson, isAbortError } from "@/shared/lib/fetch-json";
import type { IgdbSearchResult } from "../lib/igdb";

const SEARCH_ENDPOINT = "/api/games/search";
const SEARCH_DEBOUNCE_IN_MILLISECONDS = 300;
const MIN_SEARCH_LENGTH = 2;

type SearchResponse = { query: string; results: IgdbSearchResult[]; hasFailed: boolean };

/** Debounced search through our own route; IGDB is never called from the browser. */
export function useGameSearch(rawQuery: string) {
  const query = rawQuery.trim();
  const [response, setResponse] = useState<SearchResponse | null>(null);
  const isSearchable = query.length >= MIN_SEARCH_LENGTH;

  useEffect(() => {
    if (!isSearchable) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetchJson<{ results: IgdbSearchResult[] }>(
        `${SEARCH_ENDPOINT}?q=${encodeURIComponent(query)}`,
        { signal: controller.signal },
      )
        .then((body) => setResponse({ query, results: body.results, hasFailed: false }))
        .catch((error: unknown) => {
          if (!isAbortError(error)) setResponse({ query, results: [], hasFailed: true });
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
