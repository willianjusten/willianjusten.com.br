"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { readBrowserId } from "./browser-id";

const REACTIONS_ENDPOINT = "/api/games/reactions";

export function useGameReactions() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [mine, setMine] = useState<ReadonlySet<string>>(new Set());
  const [hasError, setHasError] = useState(false);
  const browserIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    let isCurrent = true;
    try {
      browserIdRef.current = readBrowserId();
    } catch {
      return;
    }
    fetch(`${REACTIONS_ENDPOINT}?browserId=${browserIdRef.current}`)
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((snapshot: { counts: Record<string, number>; mine: string[] }) => {
        if (isCurrent) {
          setCounts(snapshot.counts);
          setMine(new Set(snapshot.mine));
        }
      })
      .catch(() => {});
    return () => {
      isCurrent = false;
    };
  }, []);

  const toggle = useCallback(
    async (gameSlug: string) => {
      const browserId = browserIdRef.current;
      if (!browserId) {
        setHasError(true);
        return;
      }
      const wasReacted = mine.has(gameSlug);
      const reacted = !wasReacted;
      const setReacted = (value: boolean) =>
        setMine((previous) => {
          const next = new Set(previous);
          if (value) next.add(gameSlug);
          else next.delete(gameSlug);
          return next;
        });

      setHasError(false);
      setReacted(reacted);
      setCounts((previous) => ({
        ...previous,
        [gameSlug]: Math.max(0, (previous[gameSlug] ?? 0) + (reacted ? 1 : -1)),
      }));

      try {
        const response = await fetch(REACTIONS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gameSlug, browserId, reacted }),
        });
        if (!response.ok) {
          throw new Error(String(response.status));
        }
        const saved: { count: number } = await response.json();
        setCounts((previous) => ({ ...previous, [gameSlug]: saved.count }));
      } catch {
        setReacted(wasReacted);
        setCounts((previous) => ({
          ...previous,
          [gameSlug]: Math.max(0, (previous[gameSlug] ?? 0) + (reacted ? -1 : 1)),
        }));
        setHasError(true);
      }
    },
    [mine],
  );

  return { counts, mine, hasError, toggle };
}
