"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchJson, HttpError, postJson } from "@/shared/lib/fetch-json";
import { readBrowserId } from "../lib/browser-id";
import { sortRecommendations, type RecommendationView } from "../lib/recommendations";

const RECOMMENDATIONS_ENDPOINT = "/api/games/recommendations";
const VOTES_ENDPOINT = `${RECOMMENDATIONS_ENDPOINT}/votes`;
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
      recommendations: RecommendationView[];
    }
  | { kind: "rate_limited" }
  | { kind: "failed" };

export type VoteError = "rate_limited" | "failed";

function isRateLimited(error: unknown): boolean {
  return error instanceof HttpError && error.status === RATE_LIMITED_STATUS;
}

export function useGameRecommendations() {
  const [recommendations, setRecommendations] = useState<RecommendationView[]>([]);
  const [voteError, setVoteError] = useState<VoteError | null>(null);
  const browserIdRef = useRef<string | undefined>(undefined);
  // Mirrors the state so async handlers merge into the latest list, not the one they closed over.
  const recommendationsRef = useRef(recommendations);

  const replaceRecommendations = useCallback((next: RecommendationView[]) => {
    recommendationsRef.current = next;
    setRecommendations(next);
  }, []);

  useEffect(() => {
    const browserId = readBrowserId();
    browserIdRef.current = browserId;
    if (!browserId) return;
    const controller = new AbortController();
    fetchJson<{ recommendations: RecommendationView[] }>(
      `${RECOMMENDATIONS_ENDPOINT}?browserId=${browserId}`,
      { signal: controller.signal },
    )
      .then((body) => replaceRecommendations(body.recommendations))
      // The Recommended tab then shows its empty state; submitting still works.
      .catch(() => undefined);
    return () => controller.abort();
  }, [replaceRecommendations]);

  const submit = useCallback(
    async (submission: RecommendationSubmission): Promise<SubmitOutcome> => {
      const browserId = browserIdRef.current;
      if (!browserId) return { kind: "failed" };
      try {
        const { recommendation: saved } = await postJson<{
          recommendation: RecommendationView | null;
        }>(RECOMMENDATIONS_ENDPOINT, { ...submission, browserId });
        const merged = saved
          ? sortRecommendations([
              ...recommendationsRef.current.filter((item) => item.id !== saved.id),
              saved,
            ])
          : recommendationsRef.current;
        replaceRecommendations(merged);
        return { kind: "saved", recommendation: saved, recommendations: merged };
      } catch (error) {
        return { kind: isRateLimited(error) ? "rate_limited" : "failed" };
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
        const saved = await postJson<{ count: number }>(VOTES_ENDPOINT, {
          recommendationId,
          browserId,
          voted,
        });
        patch({ count: saved.count });
      } catch (error) {
        setVoteError(isRateLimited(error) ? "rate_limited" : "failed");
        patch({ mine: before.mine, count: before.count });
      }
    },
    [replaceRecommendations],
  );

  return { recommendations, voteError, submit, toggleVote };
}
