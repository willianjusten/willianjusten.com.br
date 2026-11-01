"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ON_FIRE_STREAK,
  PERSONAL_STATS_STORAGE_KEY,
  parsePersonalStats,
  recordPersonalShot,
  type PersonalStats,
} from "../lib/personal-stats";
import { pickShotSound, SHOT_SOUND_FILES, type ShotSound } from "../lib/shot-sounds";
import {
  clampAngle,
  DEFAULT_SHOT_ANGLE_IN_DEGREES,
  getDragVelocity,
  getKeyboardVelocity,
  getShotGeometry,
  isShootableSpeed,
  isShotOver,
  launchBall,
  stepBall,
  type Ball,
  type Velocity,
} from "../lib/shot-physics";
import { drawScene, RESULT_MESSAGE_FRAMES, type SceneState } from "../lib/shot-renderer";
import type { ShotTotals } from "../server/shot-stats";
import { runWhileVisible } from "@/shared/lib/animation-loop";
import { fetchJson, postJson } from "@/shared/lib/fetch-json";
import { fillTemplate } from "@/shared/lib/fill-template";
import { ShotScoreboard, type ShotScoreboardLabels } from "./shot-scoreboard";

export type ShotGameLabels = ShotScoreboardLabels & {
  canvasDescription: string;
  /** Contains `{angle}`. */
  keyboardAim: string;
  swish: string;
  bucket: string;
  onFire: string;
};

const KEYBOARD_ANGLE_STEP_IN_DEGREES = 2;
const POINTER_GRAB_RADIUS_IN_PIXELS = 70;
const NET_DECAY_PER_FRAME = 0.95;
const MAX_DEVICE_PIXEL_RATIO = 2;
const MILLISECONDS_PER_SECOND = 1000;
const SHOT_KEYS = new Set([" ", "Enter"]);
const SHOTS_ENDPOINT = "/api/nba/shots";

type GameRuntime = {
  ball: Ball | null;
  pointer: { x: number; y: number } | null;
  keyboardHoldStart: number | null;
  keyboardAngle: number;
  netEnergy: number;
  message: { text: string; framesLeft: number } | null;
  seconds: number;
  wasScoredThisShot: boolean;
};

function readFontFamily(element: HTMLElement, variableName: string, fallback: string): string {
  const resolved = getComputedStyle(element).getPropertyValue(variableName).trim();
  return resolved ? `${resolved}, ${fallback}` : fallback;
}

export function ShotGame({ labels }: { labels: ShotGameLabels }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // This component only renders on the client (see shot-game-loader), so storage is readable here.
  const [storedStats] = useState(() =>
    parsePersonalStats(window.localStorage.getItem(PERSONAL_STATS_STORAGE_KEY)),
  );
  const runtimeRef = useRef<GameRuntime>({
    ball: null,
    pointer: null,
    keyboardHoldStart: null,
    keyboardAngle: DEFAULT_SHOT_ANGLE_IN_DEGREES,
    netEnergy: 0,
    message: null,
    seconds: 0,
    wasScoredThisShot: false,
  });
  const personalStatsRef = useRef<PersonalStats>(storedStats);
  const missStreakRef = useRef(0);
  const soundsRef = useRef<Partial<Record<ShotSound, HTMLAudioElement>>>({});
  const playingSoundRef = useRef<HTMLAudioElement | null>(null);
  const labelsRef = useRef(labels);
  const [personalStats, setPersonalStats] = useState<PersonalStats>(storedStats);
  const [totals, setTotals] = useState<ShotTotals | null>(null);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    labelsRef.current = labels;
  }, [labels]);

  useEffect(() => {
    const controller = new AbortController();
    fetchJson<ShotTotals>(SHOTS_ENDPOINT, { signal: controller.signal })
      .then(setTotals)
      // The all-visitors cell keeps its dash; the game itself does not need the totals.
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const playShotSound = useCallback((sound: ShotSound | null) => {
    if (!sound) return;
    const audio = (soundsRef.current[sound] ??= new Audio(SHOT_SOUND_FILES[sound]));
    const previous = playingSoundRef.current;
    if (previous && previous !== audio) previous.pause();
    audio.currentTime = 0;
    playingSoundRef.current = audio;
    // Autoplay can still be refused (for example on an unfocused tab); the game goes on silently.
    audio.play().catch(() => undefined);
  }, []);

  const finishShot = useCallback(
    (made: boolean) => {
      if (made) {
        missStreakRef.current = 0;
      } else {
        missStreakRef.current += 1;
        playShotSound(
          pickShotSound({ made: false, makeStreak: 0, missStreak: missStreakRef.current }),
        );
      }
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
    },
    [playShotSound],
  );

  useEffect(() => {
    const mountedCanvas = canvasRef.current;
    const mountedContext = mountedCanvas?.getContext("2d");
    if (!mountedCanvas || !mountedContext) return;
    // Rebound as non-null so the hoisted helpers below keep the narrowing.
    const canvas: HTMLCanvasElement = mountedCanvas;
    const context: CanvasRenderingContext2D = mountedContext;
    const runtime = runtimeRef.current;

    const fonts = {
      display: readFontFamily(canvas, "--font-bricolage", "sans-serif"),
      mono: readFontFamily(canvas, "--font-jetbrains-mono", "monospace"),
    };

    function getGeometry() {
      return getShotGeometry(canvas.clientWidth, canvas.clientHeight);
    }

    function resizeCanvas() {
      const ratio = Math.min(MAX_DEVICE_PIXEL_RATIO, window.devicePixelRatio || 1);
      const width = Math.round(canvas.clientWidth * ratio);
      const height = Math.round(canvas.clientHeight * ratio);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function getAimVelocity(): Velocity | null {
      if (runtime.pointer) return getDragVelocity(getGeometry(), runtime.pointer);
      if (runtime.keyboardHoldStart !== null) {
        const heldSeconds =
          (performance.now() - runtime.keyboardHoldStart) / MILLISECONDS_PER_SECOND;
        return getKeyboardVelocity(heldSeconds, runtime.keyboardAngle);
      }
      return null;
    }

    function shoot(velocity: Velocity) {
      if (runtime.ball || !isShootableSpeed(velocity)) return;
      runtime.ball = launchBall(getGeometry(), velocity);
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
      playShotSound(pickShotSound({ made: true, makeStreak: streakAfterMake, missStreak: 0 }));
    }

    function advanceFrame() {
      runtime.seconds += 1 / 60;
      runtime.netEnergy *= NET_DECAY_PER_FRAME;
      if (runtime.message && --runtime.message.framesLeft <= 0) runtime.message = null;

      const ball = runtime.ball;
      if (!ball) return;
      const geometry = getGeometry();
      const outcome = stepBall(ball, geometry);
      if (outcome) handleScore(outcome);
      if (isShotOver(ball, geometry)) {
        runtime.ball = null;
        finishShot(runtime.wasScoredThisShot);
      }
    }

    function render() {
      const geometry = getGeometry();
      const stats = personalStatsRef.current;
      const isAimingWithKeyboard = runtime.keyboardHoldStart !== null;
      const scene: SceneState = {
        ball: runtime.ball,
        aimVelocity: runtime.ball ? null : getAimVelocity(),
        keyboardAngleInDegrees: isAimingWithKeyboard ? runtime.keyboardAngle : null,
        isOnFire: stats.streak >= ON_FIRE_STREAK,
        netEnergy: runtime.netEnergy,
        message: runtime.message,
        seconds: runtime.seconds,
        fonts,
        labels: {
          keyboardAim: (angle) => fillTemplate(labelsRef.current.keyboardAim, { angle }),
        },
      };
      drawScene(context!, geometry, scene);
    }

    const stopLoop = runWhileVisible(canvas, () => {
      resizeCanvas();
      advanceFrame();
      render();
    });

    function toCanvasPoint(event: PointerEvent) {
      const bounds = canvas.getBoundingClientRect();
      return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    }
    function onPointerDown(event: PointerEvent) {
      if (runtime.ball) return;
      const geometry = getGeometry();
      const point = toCanvasPoint(event);
      const distance = Math.hypot(point.x - geometry.startX, point.y - geometry.startY);
      if (distance > POINTER_GRAB_RADIUS_IN_PIXELS) return;
      runtime.pointer = point;
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    }
    function onPointerMove(event: PointerEvent) {
      if (runtime.pointer) runtime.pointer = toCanvasPoint(event);
    }
    function releasePointer(event: PointerEvent, shouldShoot: boolean) {
      if (!runtime.pointer) return;
      if (shouldShoot) shoot(getDragVelocity(getGeometry(), toCanvasPoint(event)));
      runtime.pointer = null;
      canvas.style.cursor = "";
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    }
    const onPointerUp = (event: PointerEvent) => releasePointer(event, true);
    const onPointerCancel = (event: PointerEvent) => releasePointer(event, false);

    function releaseKeyboardShot() {
      if (runtime.keyboardHoldStart === null) return;
      const velocity = getAimVelocity();
      runtime.keyboardHoldStart = null;
      if (velocity) shoot(velocity);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        const direction = event.key === "ArrowUp" ? 1 : -1;
        runtime.keyboardAngle = clampAngle(
          runtime.keyboardAngle + direction * KEYBOARD_ANGLE_STEP_IN_DEGREES,
        );
        event.preventDefault();
      } else if (SHOT_KEYS.has(event.key)) {
        event.preventDefault();
        if (!event.repeat && !runtime.ball && runtime.keyboardHoldStart === null) {
          runtime.keyboardHoldStart = performance.now();
        }
      }
    }
    function onKeyUp(event: KeyboardEvent) {
      if (!SHOT_KEYS.has(event.key)) return;
      event.preventDefault();
      releaseKeyboardShot();
    }

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerCancel);
    canvas.addEventListener("keydown", onKeyDown);
    canvas.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("blur", releaseKeyboardShot);

    return () => {
      stopLoop();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerCancel);
      canvas.removeEventListener("keydown", onKeyDown);
      canvas.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("blur", releaseKeyboardShot);
    };
  }, [finishShot, playShotSound]);

  return (
    <div className="reveal min-w-0 flex-[999_1_560px] overflow-hidden rounded-xl border border-line-strong bg-bg-sunken shadow-3">
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
        className="block h-[400px] w-full cursor-grab touch-none -outline-offset-3"
      />
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
