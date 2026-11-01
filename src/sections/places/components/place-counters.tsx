"use client";

import type { CSSProperties } from "react";
import { useNearViewport } from "@/shared/hooks/use-near-viewport";

type Counter = { key: string; value: string; label: string };

const FIRST_COUNTER_DELAY_IN_SECONDS = 0.2;
const COUNTER_DELAY_STEP_IN_SECONDS = 0.1;
const DIGIT_DELAY_STEP_IN_SECONDS = 0.035;

/** Flip tiles for the Places header; the digits flip in once the counters scroll into view. */
export function PlaceCounters({ label, counters }: { label: string; counters: Counter[] }) {
  const { elementRef, isNearViewport: isInView } = useNearViewport<HTMLUListElement>("0px");
  return (
    <ul ref={elementRef} aria-label={label} className="m-0 flex list-none gap-7 p-0">
      {counters.map((counter, counterIndex) => (
        <li key={counter.key} className="flex flex-col gap-1.5">
          <span aria-hidden="true" className="flex gap-0.75 perspective-[400px]">
            {[...counter.value].map((digit, digitIndex) => (
              <span
                key={digitIndex}
                className={isInView ? "flip-in" : "inline-flex"}
                style={
                  {
                    "--flip-delay": `${
                      FIRST_COUNTER_DELAY_IN_SECONDS +
                      counterIndex * COUNTER_DELAY_STEP_IN_SECONDS +
                      digitIndex * DIGIT_DELAY_STEP_IN_SECONDS
                    }s`,
                  } as CSSProperties
                }
              >
                <span className="flip-tile is-counter">{digit}</span>
              </span>
            ))}
          </span>
          <span className="font-mono text-overline tracking-[0.12em] text-text-muted uppercase">
            <span className="sr-only">{Number(counter.value)} </span>
            {counter.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
