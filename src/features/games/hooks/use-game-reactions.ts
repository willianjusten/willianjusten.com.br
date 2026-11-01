"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchJson, postJson } from "@/lib/fetch-json";
import type { ReactionSnapshot } from "../server/reaction-stats";
import { readBrowserId } from "../lib/browser-id";

const REACTIONS_ENDPOINT = "/api/games/reactions";

function withReaction(reactions: ReadonlySet<string>, gameSlug: string, isReacted: boolean) {
  const next = new Set(reactions);
  if (isReacted) next.add(gameSlug);
  else next.delete(gameSlug);
  return next;
}

export function useGameReactions() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [mine, setMine] = useState<ReadonlySet<string>>(new Set());
  const [hasError, setHasError] = useState(false);
  const browserIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const browserId = readBrowserId();
    browserIdRef.current = browserId;
    if (!browserId) return;
    const controller = new AbortController();
    fetchJson<ReactionSnapshot>(`${REACTIONS_ENDPOINT}?browserId=${browserId}`, {
      signal: controller.signal,
    })
      .then((snapshot) => {
        setCounts(snapshot.counts);
        setMine(new Set(snapshot.mine));
      })
      // The shelf still works without the counts; the hearts just start at zero.
      .catch(() => undefined);
    return () => controller.abort();
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
      const applyReaction = (isReacted: boolean) => {
        setMine((previous) => withReaction(previous, gameSlug, isReacted));
        setCounts((previous) => ({
          ...previous,
          [gameSlug]: Math.max(0, (previous[gameSlug] ?? 0) + (isReacted ? 1 : -1)),
        }));
      };

      setHasError(false);
      applyReaction(reacted);
      try {
        const saved = await postJson<{ count: number }>(REACTIONS_ENDPOINT, {
          gameSlug,
          browserId,
          reacted,
        });
        setCounts((previous) => ({ ...previous, [gameSlug]: saved.count }));
      } catch {
        applyReaction(wasReacted);
        setHasError(true);
      }
    },
    [mine],
  );

  return { counts, mine, hasError, toggle };
}
