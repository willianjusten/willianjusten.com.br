"use client";

import { ExternalLink, Pause, Play } from "lucide-react";
import { useEffect, useRef, type PointerEvent } from "react";
import type { PlayableTrack } from "../lib/music-board";
import type { MusicLabels } from "./music-board";

/** 3 degrees per frame at 60fps is 180 degrees a second. */
const SPIN_DEGREES_PER_FRAME = 3;
/** Pointer at an edge tilts the record by half of this, so the maximum is 17 degrees. */
const TILT_RANGE_IN_DEGREES = 34;
const EQ_BAR_COUNT = 5;

type RecordPlayerProps = {
  track: PlayableTrack;
  heading: string;
  labels: MusicLabels;
  isPlaying: boolean;
  /** Plays the record swap animation whenever the track changes. */
  animateSwap: boolean;
  onToggle: (trackId: string, previewUrl: string) => void;
};

export function RecordPlayer({
  track,
  heading,
  labels,
  isPlaying,
  animateSwap,
  onToggle,
}: RecordPlayerProps) {
  const discRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const discAngleRef = useRef(0);
  const dragRef = useRef<{ lastPointerAngle: number } | null>(null);
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;

    function renderFrame() {
      if (isPlayingRef.current && !dragRef.current && !reducedMotion.matches) {
        discAngleRef.current += SPIN_DEGREES_PER_FRAME;
      }
      if (discRef.current) {
        discRef.current.style.transform = `rotate(${discAngleRef.current.toFixed(2)}deg)`;
      }
      frameId = requestAnimationFrame(renderFrame);
    }

    function stopLoop() {
      cancelAnimationFrame(frameId);
      frameId = 0;
    }

    // The loop only runs while the record is on screen.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!frameId) frameId = requestAnimationFrame(renderFrame);
      } else {
        stopLoop();
      }
    });
    if (stackRef.current) visibilityObserver.observe(stackRef.current);

    return () => {
      visibilityObserver.disconnect();
      stopLoop();
    };
  }, []);

  function pointerAngleOnDisc(event: PointerEvent<HTMLDivElement>): number {
    const bounds = event.currentTarget.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    return (Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180) / Math.PI;
  }

  function startScratch(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { lastPointerAngle: pointerAngleOnDisc(event) };
  }

  function scratch(event: PointerEvent<HTMLDivElement>) {
    if (!dragRef.current) return;
    const currentAngle = pointerAngleOnDisc(event);
    // The +540 / -180 wraps the difference into -180..180 so crossing the 180 degree seam is smooth.
    const angleChange = ((currentAngle - dragRef.current.lastPointerAngle + 540) % 360) - 180;
    discAngleRef.current += angleChange;
    dragRef.current.lastPointerAngle = currentAngle;
  }

  function endScratch() {
    dragRef.current = null;
  }

  function tiltTowardPointer(event: PointerEvent<HTMLDivElement>) {
    const stack = stackRef.current;
    if (!stack) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontalRatio = (event.clientX - bounds.left) / bounds.width;
    const verticalRatio = (event.clientY - bounds.top) / bounds.height;
    const tiltX = (0.5 - verticalRatio) * TILT_RANGE_IN_DEGREES;
    const tiltY = (horizontalRatio - 0.5) * TILT_RANGE_IN_DEGREES;
    stack.style.transform = `rotateX(${tiltX.toFixed(1)}deg) rotateY(${tiltY.toFixed(1)}deg)`;
  }

  function resetTilt() {
    if (stackRef.current) stackRef.current.style.transform = "";
  }

  const listenLinks = [
    { label: labels.youtubeMusic, href: track.youtubeMusicUrl },
    { label: labels.spotify, href: track.spotifyUrl },
    { label: labels.appleMusic, href: track.appleMusicUrl },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));

  const hasPreview = Boolean(track.previewUrl);

  return (
    <div className="reveal box-border flex w-full max-w-full shrink-0 grow-0 basis-full sm:w-(--record-panel-width) sm:basis-(--record-panel-width) flex-col items-center gap-5 rounded-xl border border-line-strong bg-(image:--panel-gradient) px-6 py-7">
      <div
        onPointerMove={tiltTowardPointer}
        onPointerLeave={resetTilt}
        className="p-2 [perspective:700px]"
      >
        <div
          ref={stackRef}
          data-playing={isPlaying}
          className="record-stack relative h-[184px] w-[204px] [transform-style:preserve-3d]"
        >
          <div className="record-glow absolute top-2 left-0 size-(--record-size) rounded-pill bg-[conic-gradient(from_0deg,var(--accent),var(--accent-hi),var(--accent-lo),var(--accent))] blur-[26px]" />
          <div className="absolute top-2 left-0 size-(--record-size) rounded-pill bg-black shadow-disc [transform:translateZ(-10px)]" />
          <div
            key={track.id}
            className={`absolute inset-0 [transform-style:preserve-3d] ${animateSwap ? "record-swap" : ""}`}
          >
            <div
              ref={discRef}
              // A div, not an img: it is a draggable control that spins.
              // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
              role="img"
              aria-label={labels.record}
              title={labels.hint}
              onPointerDown={startScratch}
              onPointerMove={scratch}
              onPointerUp={endScratch}
              onPointerCancel={endScratch}
              className="record-disc absolute top-2 left-0 flex size-(--record-size) cursor-grab touch-none items-center justify-center rounded-pill bg-[repeating-radial-gradient(circle,var(--bg-sunken)_0_2px,var(--surface-raised)_2px_4px)] active:cursor-grabbing"
            >
              <div className="relative flex aspect-square w-[36%] items-center justify-center rounded-pill bg-accent">
                <span
                  aria-hidden="true"
                  className="absolute top-[18%] font-mono text-[6px] tracking-[1px] text-on-accent"
                >
                  WJ · SIDE A
                </span>
                <div className="aspect-square w-[16%] rounded-pill bg-bg" />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute top-2 left-0 size-(--record-size) rounded-pill record-sheen" />
          <div className="record-arm pointer-events-none absolute top-0 right-2 flex h-[118px] w-3.5 origin-[50%_7px] flex-col items-center">
            <span className="box-border size-3.5 rounded-pill border-2 border-text-2 bg-line-input" />
            <span className="w-1 flex-auto rounded-xs bg-[linear-gradient(var(--text-2),var(--text-faint))]" />
            <span className="h-[18px] w-3 rounded-[3px] bg-text-2" />
          </div>
        </div>
      </div>

      <div className="flex w-full items-center gap-4">
        <button
          type="button"
          aria-label={isPlaying ? labels.pause : labels.play}
          aria-pressed={isPlaying}
          disabled={!hasPreview}
          title={hasPreview ? undefined : labels.previewUnavailable}
          onClick={() => track.previewUrl && onToggle(track.id, track.previewUrl)}
          className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-pill border-0 bg-accent p-0 text-on-accent shadow-glow transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPlaying ? (
            <Pause size={18} fill="currentColor" aria-hidden="true" />
          ) : (
            <Play size={18} fill="currentColor" aria-hidden="true" />
          )}
        </button>
        <div
          key={track.id}
          className={`flex min-w-0 flex-col gap-0.5 ${animateSwap ? "record-info-swap" : ""}`}
        >
          <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-text-muted uppercase">
            {heading}
            <span
              data-playing={isPlaying}
              aria-hidden="true"
              className="record-eq flex h-2.5 items-end gap-0.5"
            >
              {Array.from({ length: EQ_BAR_COUNT }, (_, barIndex) => (
                <span key={barIndex} className="w-0.5 self-stretch rounded-xs bg-accent" />
              ))}
            </span>
          </span>
          <span className="truncate font-display text-2xl leading-[1.15] font-bold">
            {track.title}
          </span>
          <span className="truncate text-small text-text-2">{track.artist}</span>
          <span className="truncate text-micro text-text-faint">{track.album}</span>
        </div>
      </div>

      {listenLinks.length > 0 && (
        <nav
          aria-label={labels.listenOn}
          className="flex w-full flex-col gap-1 border-t border-line pt-3"
        >
          <span className="font-mono text-[11px] tracking-[0.08em] text-text-muted uppercase">
            {labels.listenOn}
          </span>
          <ul className="m-0 -ml-2 flex list-none flex-wrap p-0">
            {listenLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1 px-2 text-small text-text-2 transition-colors hover:text-text"
                >
                  {link.label}
                  <ExternalLink size={11} aria-hidden="true" className="text-text-faint" />
                </a>
              </li>
            ))}
          </ul>
          <p className="m-0 text-micro text-text-faint">{labels.credit}</p>
        </nav>
      )}
    </div>
  );
}
