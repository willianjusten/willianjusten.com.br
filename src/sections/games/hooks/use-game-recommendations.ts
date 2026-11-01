"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { sortRecommendations } from "../lib/recommendations";
import type { RecommendationView } from "../lib/recommendations";
import { readBrowserId } from "../lib/browser-id";

const RECOMMENDATIONS_ENDPOINT = "/api/games/recommendations";
const RATE_LIMITED_STATUS = 429;

export type RecommendationSubmission = {
  igdbId: number;
  /** Honeypot value; real visitors leave it empty. */
  website: string;
};

export type SubmitOutcome =
  /** `recommendation` is null when the server dropped it (honeypot) or the game is hidden. */
  | {
      kind: "saved";
      recommendation: RecommendationView | null;
      /** The shelf order after the new game was merged in. */
      recommendations: RecommendationView[];
    }
  | { kind: "rate_limited" }
  | { kind: "failed" };

export type VoteError = "rate_limited" | "failed";

export function useGameRecommendations() {
  const [recommendations, setRecommendations] = useState<RecommendationView[]>([]);
  const [voteError, setVoteError] = useState<VoteError | null>(null);
  const browserIdRef = useRef<string | undefined>(undefined);
  const recommendationsRef = useRef(recommendations);

  const replaceRecommendations = useCallback((next: RecommendationView[]) => {
    recommendationsRef.current = next;
    setRecommendations(next);
  }, []);

  useEffect(() => {
    let isCurrent = true;
    try {
      browserIdRef.current = readBrowserId();
    } catch {
      return;
    }
    fetch(`${RECOMMENDATIONS_ENDPOINT}?browserId=${browserIdRef.current}`)
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((body: { recommendations: RecommendationView[] }) => {
        if (isCurrent) {
          replaceRecommendations(body.recommendations);
        }
      })
      .catch(() => {});
    return () => {
      isCurrent = false;
    };
  }, [replaceRecommendations]);

  const submit = useCallback(
    async (submission: RecommendationSubmission): Promise<SubmitOutcome> => {
      const browserId = browserIdRef.current;
      if (!browserId) {
        return { kind: "failed" };
      }
      try {
        const response = await fetch(RECOMMENDATIONS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...submission, browserId }),
        });
        if (response.status === RATE_LIMITED_STATUS) {
          return { kind: "rate_limited" };
        }
        if (!response.ok) {
          return { kind: "failed" };
        }
        const body: { recommendation: RecommendationView | null } = await response.json();
        const saved = body.recommendation;
        const merged = saved
          ? sortRecommendations([
              ...recommendationsRef.current.filter((item) => item.id !== saved.id),
              saved,
            ])
          : recommendationsRef.current;
        replaceRecommendations(merged);
        return { kind: "saved", recommendation: saved, recommendations: merged };
      } catch {
        return { kind: "failed" };
      }
    },
    [replaceRecommendations],
  );

  const toggleVote = useCallback(
    async (recommendationId: number) => {
      const browserId = browserIdRef.current;
      const before = recommendationsRef.current.find((item) => item.id === recommendationId);
      if (!browserId || !before) {
        setVoteError("failed");
        return;
      }
      const voted = !before.mine;
      const patch = (changes: Partial<RecommendationView>) =>
        replaceRecommendations(
          recommendationsRef.current.map((item) =>
            item.id === recommendationId ? { ...item, ...changes } : item,
          ),
        );

      setVoteError(null);
      patch({ mine: voted, count: Math.max(0, before.count + (voted ? 1 : -1)) });
      try {
        const response = await fetch(`${RECOMMENDATIONS_ENDPOINT}/votes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ recommendationId, browserId, voted }),
        });
        if (!response.ok) {
          setVoteError(response.status === RATE_LIMITED_STATUS ? "rate_limited" : "failed");
          patch({ mine: before.mine, count: before.count });
          return;
        }
        const saved: { count: number } = await response.json();
        patch({ count: saved.count });
      } catch {
        setVoteError("failed");
        patch({ mine: before.mine, count: before.count });
      }
    },
    [replaceRecommendations],
  );

  return { recommendations, voteError, submit, toggleVote };
}
