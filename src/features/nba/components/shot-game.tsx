"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useShotSounds } from "../hooks/use-shot-sounds";
import { useShotStats } from "../hooks/use-shot-stats";
import {
  advanceRuntime,
  createGameRuntime,
  getScoreText,
  markScored,
  shoot,
  type RuntimeEvents,
} from "../lib/game-runtime";
import { ON_FIRE_STREAK } from "../lib/personal-stats";
import { createSceneRenderer } from "../lib/renderer/scene";
import { attachShotInput, getAimVelocity } from "../lib/shot-input";
import { getShotGeometry } from "../lib/shot-physics";
import { createFixedStepper, runWhileVisible } from "@/lib/animation-loop";
import { fitCanvas, getCanvasPixelRatio } from "@/lib/canvas";
import { fillTemplate } from "@/lib/fill-template";
import { COURT_HEIGHT_CLASS, SHOT_GAME_FRAME_CLASS } from "./shot-game-frame";
import { ShotScoreboard, type ShotScoreboardLabels } from "./shot-scoreboard";

export type ShotGameLabels = ShotScoreboardLabels & {
  canvasDescription: string;
  keyboardAim: string;
  swish: string;
  bucket: string;
  onFire: string;
};

function readFontFamily(element: HTMLElement, variableName: string, fallback: string): string {
  const resolved = getComputedStyle(element).getPropertyValue(variableName).trim();
  return resolved ? `${resolved}, ${fallback}` : fallback;
}

export function ShotGame({ labels }: { labels: ShotGameLabels }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runtimeRef = useRef(createGameRuntime());
  const labelsRef = useRef(labels);
  const { personalStats, personalStatsRef, totals, recordShot } = useShotStats();
  const { playMake, playMiss } = useShotSounds();
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    labelsRef.current = labels;
  }, [labels]);

  const finishShot = useCallback(
    (made: boolean) => {
      if (!made) playMiss();
      recordShot(made);
    },
    [playMiss, recordShot],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const runtime = runtimeRef.current;
    const drawScene = createSceneRenderer();
    const fonts = {
      display: readFontFamily(canvas, "--font-bricolage", "sans-serif"),
      mono: readFontFamily(canvas, "--font-jetbrains-mono", "monospace"),
    };

    let pixelRatio = 0;
    let geometry = getShotGeometry(0, 0);
    const resizeCanvas = () => {
      const size = fitCanvas(canvas, context);
      pixelRatio = size.pixelRatio;
      geometry = getShotGeometry(size.width, size.height);
    };
    resizeCanvas();

    const events: RuntimeEvents = {
      onScore: (outcome) => {
        const streakAfterMake = personalStatsRef.current.streak + 1;
        const text = getScoreText(outcome, streakAfterMake, labelsRef.current);
        markScored(runtime, text);
        setAnnouncement(text);
        playMake(streakAfterMake);
      },
      onShotOver: finishShot,
    };

    const render = () => {
      const { aim } = runtime;
      const isAimingWithKeyboard = aim.keyboardHoldStart !== null;
      drawScene(context, geometry, {
        ball: runtime.ball,
        aimVelocity: runtime.ball ? null : getAimVelocity(aim, geometry),
        keyboardAngleInDegrees: isAimingWithKeyboard ? aim.keyboardAngle : null,
        isOnFire: personalStatsRef.current.streak >= ON_FIRE_STREAK,
        netEnergy: runtime.netEnergy,
        message: runtime.message,
        seconds: runtime.seconds,
        fonts,
        labels: {
          keyboardAim: (angle) => fillTemplate(labelsRef.current.keyboardAim, { angle }),
        },
      });
    };

    // Resizing clears the canvas, so it is repainted in the same frame instead of flashing blank.
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      render();
    });
    resizeObserver.observe(canvas);
    const stepFrame = createFixedStepper();
    const stopLoop = runWhileVisible(canvas, (elapsedInMilliseconds) => {
      // Moving the window to another screen changes the ratio without resizing the canvas.
      if (getCanvasPixelRatio() !== pixelRatio) resizeCanvas();
      for (let step = stepFrame(elapsedInMilliseconds); step > 0; step--) {
        advanceRuntime(runtime, geometry, events);
      }
      render();
    });
    const detachInput = attachShotInput(canvas, {
      aim: runtime.aim,
      getGeometry: () => geometry,
      isBallInFlight: () => runtime.ball !== null,
      shoot: (velocity) => shoot(runtime, geometry, velocity),
    });

    return () => {
      stopLoop();
      detachInput();
      resizeObserver.disconnect();
    };
  }, [finishShot, personalStatsRef, playMake]);

  return (
    <div className={`reveal overflow-hidden shadow-3 ${SHOT_GAME_FRAME_CLASS}`}>
      <ShotScoreboard
        labels={labels}
        personalStats={personalStats}
        totals={totals}
        isOnFire={personalStats.streak >= ON_FIRE_STREAK}
      />
      {/* A canvas has no img equivalent; the role plus label is the required description. */}
      <canvas
        ref={canvasRef}
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
        role="img"
        aria-label={labels.canvasDescription}
        tabIndex={0}
        className={`block w-full cursor-grab touch-none -outline-offset-3 ${COURT_HEIGHT_CLASS}`}
      />
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
