"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useShotSounds } from "../hooks/use-shot-sounds";
import { useShotStats } from "../hooks/use-shot-stats";
import { ON_FIRE_STREAK } from "../lib/personal-stats";
import { RESULT_MESSAGE_FRAMES, type SceneMessage } from "../lib/renderer/overlay";
import { createSceneRenderer } from "../lib/renderer/scene";
import { attachShotInput, getAimVelocity, type AimState } from "../lib/shot-input";
import {
  DEFAULT_SHOT_ANGLE_IN_DEGREES,
  getShotGeometry,
  isShootableSpeed,
  isShotOver,
  launchBall,
  stepBall,
  type Ball,
  type Velocity,
} from "../lib/shot-physics";
import { runWhileVisible } from "@/shared/lib/animation-loop";
import { fillTemplate } from "@/shared/lib/fill-template";
import { COURT_HEIGHT_CLASS, SHOT_GAME_FRAME_CLASS } from "./shot-game-frame";
import { ShotScoreboard, type ShotScoreboardLabels } from "./shot-scoreboard";

export type ShotGameLabels = ShotScoreboardLabels & {
  canvasDescription: string;
  keyboardAim: string;
  swish: string;
  bucket: string;
  onFire: string;
};

const NET_DECAY_PER_FRAME = 0.95;
const MAX_DEVICE_PIXEL_RATIO = 2;

type GameRuntime = {
  ball: Ball | null;
  aim: AimState;
  netEnergy: number;
  message: SceneMessage | null;
  seconds: number;
  wasScoredThisShot: boolean;
};

function readFontFamily(element: HTMLElement, variableName: string, fallback: string): string {
  const resolved = getComputedStyle(element).getPropertyValue(variableName).trim();
  return resolved ? `${resolved}, ${fallback}` : fallback;
}

function getPixelRatio() {
  return Math.min(MAX_DEVICE_PIXEL_RATIO, window.devicePixelRatio || 1);
}

export function ShotGame({ labels }: { labels: ShotGameLabels }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runtimeRef = useRef<GameRuntime>({
    ball: null,
    aim: { pointer: null, keyboardHoldStart: null, keyboardAngle: DEFAULT_SHOT_ANGLE_IN_DEGREES },
    netEnergy: 0,
    message: null,
    seconds: 0,
    wasScoredThisShot: false,
  });
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

    let geometry = getShotGeometry(canvas.clientWidth, canvas.clientHeight);
    let pixelRatio = 0;
    const resizeCanvas = () => {
      pixelRatio = getPixelRatio();
      geometry = getShotGeometry(canvas.clientWidth, canvas.clientHeight);
      const width = Math.round(canvas.clientWidth * pixelRatio);
      const height = Math.round(canvas.clientHeight * pixelRatio);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };
    resizeCanvas();

    function shoot(velocity: Velocity) {
      if (runtime.ball || !isShootableSpeed(velocity)) return;
      runtime.ball = launchBall(geometry, velocity);
      runtime.wasScoredThisShot = false;
    }

    function handleScore(outcome: "swish" | "bucket") {
      const streakAfterMake = personalStatsRef.current.streak + 1;
      const text =
        streakAfterMake >= ON_FIRE_STREAK
          ? labelsRef.current.onFire
          : outcome === "bucket"
            ? labelsRef.current.bucket
            : labelsRef.current.swish;
      runtime.netEnergy = 1;
      runtime.message = { text, framesLeft: RESULT_MESSAGE_FRAMES };
      runtime.wasScoredThisShot = true;
      setAnnouncement(text);
      playMake(streakAfterMake);
    }

    function advanceFrame() {
      runtime.seconds += 1 / 60;
      runtime.netEnergy *= NET_DECAY_PER_FRAME;
      if (runtime.message && --runtime.message.framesLeft <= 0) runtime.message = null;

      const ball = runtime.ball;
      if (!ball) return;
      const outcome = stepBall(ball, geometry);
      if (outcome) handleScore(outcome);
      if (isShotOver(ball, geometry)) {
        runtime.ball = null;
        finishShot(runtime.wasScoredThisShot);
      }
    }

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
    const stopLoop = runWhileVisible(canvas, () => {
      // Moving the window to another screen changes the ratio without resizing the canvas.
      if (getPixelRatio() !== pixelRatio) resizeCanvas();
      advanceFrame();
      render();
    });
    const detachInput = attachShotInput(canvas, {
      aim: runtime.aim,
      getGeometry: () => geometry,
      isBallInFlight: () => runtime.ball !== null,
      shoot,
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
