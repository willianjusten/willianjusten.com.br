"use client";

import { ExternalLink, Pause, Play } from "lucide-react";
import { useEffect, useRef, type PointerEvent } from "react";
import type { PlayableTrack } from "@/content/music-board";
import type { MusicLabels } from "./music-board";

/** 3 degrees per frame at 60fps is 180 degrees a second. */
const SPIN_DEGREES_PER_FRAME = 3;
/** Pointer at an edge tilts the record by half of this, so the maximum is 17 degrees. */
const TILT_RANGE_IN_DEGREES = 34;
const EQ_BAR_COUNT = 5;

type RecordPlayerProps = {
  track: PlayableTrack;
  labels: MusicLabels;
  isPlaying: boolean;
  onToggle: (trackId: string, previewUrl: string) => void;
};

export function RecordPlayer({ track, labels, isPlaying, onToggle }: RecordPlayerProps) {
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
    <div className="reveal box-border flex max-w-full flex-[0_0_280px] flex-col items-center gap-5 rounded-xl border border-[#26262b] bg-[linear-gradient(180deg,#19191d,#131316)] px-6 py-7">
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
          <div className="record-glow absolute top-2 left-0 size-[168px] rounded-pill bg-[conic-gradient(from_0deg,var(--accent),var(--accent-hi),var(--accent-lo),var(--accent))] blur-[26px]" />
          <div className="absolute top-2 left-0 size-[168px] rounded-pill bg-black shadow-[0_24px_40px_rgba(0,0,0,0.6)] [transform:translateZ(-10px)]" />
          <div
            ref={discRef}
            // A div, not an img: it is a draggable control that spins.
            // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
            role="img"
            aria-label={labels.record}
            onPointerDown={startScratch}
            onPointerMove={scratch}
            onPointerUp={endScratch}
            onPointerCancel={endScratch}
            className="record-disc absolute top-2 left-0 flex size-[168px] cursor-grab touch-none items-center justify-center rounded-pill bg-[repeating-radial-gradient(circle,var(--bg-sunken)_0_2px,var(--surface-raised)_2px_4px)] active:cursor-grabbing"
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
          <div className="pointer-events-none absolute top-2 left-0 size-[168px] rounded-pill bg-[conic-gradient(from_20deg,transparent_0_8%,rgba(255,255,255,0.13)_13%,transparent_20%_52%,rgba(255,255,255,0.09)_61%,transparent_68%)]" />
          <div className="record-arm pointer-events-none absolute top-0 right-2 flex h-[118px] w-3.5 origin-[50%_7px] flex-col items-center">
            <span className="box-border size-3.5 rounded-pill border-2 border-text-2 bg-line-input" />
            <span className="w-1 flex-auto rounded-xs bg-[linear-gradient(var(--text-2),var(--text-faint))]" />
            <span className="h-[18px] w-3 rounded-[3px] bg-text-2" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label={isPlaying ? labels.pause : labels.play}
          aria-pressed={isPlaying}
          disabled={!hasPreview}
          title={hasPreview ? undefined : labels.previewUnavailable}
          onClick={() => track.previewUrl && onToggle(track.id, track.previewUrl)}
          className="flex size-12 cursor-pointer items-center justify-center rounded-pill border-0 bg-accent p-0 text-on-accent shadow-glow transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPlaying ? (
            <Pause size={18} fill="currentColor" aria-hidden="true" />
          ) : (
            <Play size={18} fill="currentColor" aria-hidden="true" />
          )}
        </button>
        <div
          data-playing={isPlaying}
          aria-hidden="true"
          className="record-eq flex h-[22px] items-end gap-[3px]"
        >
          {Array.from({ length: EQ_BAR_COUNT }, (_, barIndex) => (
            <span key={barIndex} className="w-[3px] self-stretch rounded-xs bg-text-2" />
          ))}
        </div>
      </div>

      <p className="m-0 text-center font-mono text-[11px] text-text-faint">{labels.hint}</p>

      <div className="flex flex-col gap-0.5 text-center">
        <span className="font-mono text-[11px] tracking-[0.08em] text-text-muted uppercase">
          {labels.songOfTheMoment}
        </span>
        <span className="font-display text-2xl leading-[1.15] font-bold">{track.title}</span>
        <span className="text-ui text-text-muted">
          {track.artist} · {track.album}
        </span>
      </div>

      {listenLinks.length > 0 && (
        <nav aria-label={labels.listenOn} className="flex flex-col items-center gap-1">
          <span className="font-mono text-[11px] tracking-[0.08em] text-text-muted uppercase">
            {labels.listenOn}
          </span>
          <ul className="m-0 flex list-none flex-wrap justify-center gap-x-1 p-0">
            {listenLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1 px-2 text-small text-text-2"
                >
                  {link.label}
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <p className="m-0 text-center text-micro text-text-faint">{labels.credit}</p>
    </div>
  );
}
