import { useCallback, useEffect, useRef, useState } from "react";
import {
  PERSONAL_STATS_STORAGE_KEY,
  parsePersonalStats,
  recordPersonalShot,
  type PersonalStats,
} from "../lib/personal-stats";
import type { ShotTotals } from "../server/shot-stats";
import { fetchJson, postJson } from "@/lib/fetch-json";

const SHOTS_ENDPOINT = "/api/nba/shots";

/** Client only: the shot game never renders on the server, so storage is readable on mount. */
export function useShotStats() {
  const [storedStats] = useState(() =>
    parsePersonalStats(window.localStorage.getItem(PERSONAL_STATS_STORAGE_KEY)),
  );
  const personalStatsRef = useRef<PersonalStats>(storedStats);
  const [personalStats, setPersonalStats] = useState<PersonalStats>(storedStats);
  const [totals, setTotals] = useState<ShotTotals | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchJson<ShotTotals>(SHOTS_ENDPOINT, { signal: controller.signal })
      .then(setTotals)
      // The all-visitors cell keeps its dash; the game itself does not need the totals.
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const recordShot = useCallback((made: boolean) => {
    const next = recordPersonalShot(personalStatsRef.current, made);
    personalStatsRef.current = next;
    setPersonalStats(next);
    try {
      window.localStorage.setItem(PERSONAL_STATS_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Private mode or full storage: stats just do not persist.
    }
    postJson<ShotTotals>(SHOTS_ENDPOINT, { made })
      .then(setTotals)
      // A rate-limited or failed post leaves the last known totals on screen.
      .catch(() => undefined);
  }, []);

  return { personalStats, personalStatsRef, totals, recordShot };
}
