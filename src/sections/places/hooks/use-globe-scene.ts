"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";
import {
  createFixedStepper,
  reducedMotionQuery,
  runWhileVisible,
} from "@/shared/lib/animation-loop";
import { fitCanvas } from "@/shared/lib/canvas";
import { writePinLayout, type GlobePinElements } from "../components/globe-pin";
import type { PinCluster } from "../lib/globe-math";
import {
  CENTER_Y_RATIO,
  advanceGlobe,
  baseRadiusOf,
  easeCenterX,
  type GlobeMotion,
} from "../lib/globe-motion";
import { drawGlobe, readGlobeColors } from "../lib/globe-renderer";
import { decodeLandDots } from "../lib/land-dots";
import { layoutPins, type PinLayout } from "../lib/pin-layout";
import type { GlobePlace } from "../lib/places-board";

type GlobeSceneOptions = {
  frameRef: RefObject<HTMLDivElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  motionRef: RefObject<GlobeMotion>;
  selectedSlugRef: RefObject<string | null>;
  isAlbumOpenRef: RefObject<boolean>;
  places: readonly GlobePlace[];
  clusterLabel: string;
};

/**
 * Runs the frame loop while the globe is on screen: advances the motion, paints the canvas and
 * writes each pin's layout to its DOM nodes.
 */
export function useGlobeScene({
  frameRef,
  canvasRef,
  motionRef,
  selectedSlugRef,
  isAlbumOpenRef,
  places,
  clusterLabel,
}: GlobeSceneOptions) {
  const clustersByLeadRef = useRef(new Map<string, PinCluster>());
  const pinElementsRef = useRef(new Map<string, Partial<GlobePinElements>>());
  const writtenPinsRef = useRef(new Map<string, PinLayout>());

  const registerPinElement = useCallback((slug: string, element: Partial<GlobePinElements>) => {
    const pinElements = pinElementsRef.current;
    pinElements.set(slug, { ...pinElements.get(slug), ...element });
    writtenPinsRef.current.delete(slug);
  }, []);

  const focusPin = useCallback(
    (slug: string) => pinElementsRef.current.get(slug)?.pin?.focus(),
    [],
  );

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!frame || !canvas || !context) return;

    const landDots = decodeLandDots();
    const colors = readGlobeColors();
    const reducedMotion = reducedMotionQuery();
    let size = fitCanvas(canvas, context);
    const resizeObserver = new ResizeObserver(() => {
      size = fitCanvas(canvas, context);
    });
    resizeObserver.observe(canvas);

    const stepFrame = createFixedStepper();
    const paint = (elapsedInMilliseconds = 0) => {
      const motion = motionRef.current;
      const { width, height } = size;
      for (let step = stepFrame(elapsedInMilliseconds); step > 0; step--) {
        advanceGlobe(motion, !selectedSlugRef.current && !reducedMotion.matches);
        easeCenterX(motion, width, isAlbumOpenRef.current);
      }
      const { view } = motion;
      const globeFrame = {
        width,
        height,
        centerX: motion.centerX ?? width / 2,
        centerY: height * CENTER_Y_RATIO,
        radius: baseRadiusOf(width, height) * view.zoom,
      };
      drawGlobe(context, globeFrame, view, landDots, colors);

      const { pins, clustersByLead } = layoutPins({
        places,
        frame: globeFrame,
        view,
        selectedSlug: selectedSlugRef.current,
        clusterLabel,
      });
      clustersByLeadRef.current = clustersByLead;
      const writtenPins = writtenPinsRef.current;
      for (const pin of pins) {
        writePinLayout(pinElementsRef.current.get(pin.slug) ?? {}, pin, writtenPins.get(pin.slug));
        writtenPins.set(pin.slug, pin);
      }
    };

    paint();
    const stopLoop = runWhileVisible(frame, paint);

    return () => {
      stopLoop();
      resizeObserver.disconnect();
    };
  }, [frameRef, canvasRef, motionRef, selectedSlugRef, isAlbumOpenRef, places, clusterLabel]);

  return { clustersByLeadRef, registerPinElement, focusPin };
}
