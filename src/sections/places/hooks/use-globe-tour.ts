"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GlobePlace } from "../lib/places-board";

const TOUR_STEP_IN_MS = 2800;
const TOUR_PHOTOS_PER_STOP = 2;

export type TourStep = { place: GlobePlace; photoIndex: number };

/** The tour visits the trips in content order, showing up to two photos at each stop. */
export function planTour(places: readonly GlobePlace[]): TourStep[] {
  return places.flatMap((place) =>
    place.photos
      .slice(0, TOUR_PHOTOS_PER_STOP)
      .map((_photo, photoIndex) => ({ place, photoIndex })),
  );
}

/** Plays `onStep` for each tour stop on a timer, and stops after the last one. */
export function useGlobeTour(places: readonly GlobePlace[], onStep: (step: TourStep) => void) {
  const tourTimerRef = useRef<number | null>(null);
  const [isTouring, setIsTouring] = useState(false);

  const stopTour = useCallback(() => {
    if (tourTimerRef.current !== null) window.clearInterval(tourTimerRef.current);
    tourTimerRef.current = null;
    setIsTouring(false);
  }, []);

  useEffect(() => stopTour, [stopTour]);

  const startTour = useCallback(() => {
    const steps = planTour(places);
    if (steps.length === 0) return;
    let stepIndex = 0;
    const playStep = () => {
      const step = steps[stepIndex];
      if (!step) {
        stopTour();
        return;
      }
      stepIndex++;
      onStep(step);
    };
    stopTour();
    setIsTouring(true);
    playStep();
    tourTimerRef.current = window.setInterval(playStep, TOUR_STEP_IN_MS);
  }, [onStep, places, stopTour]);

  const isTourRunning = useCallback(() => tourTimerRef.current !== null, []);

  return { isTouring, startTour, stopTour, isTourRunning };
}
