"use client";

import { Pause, Play } from "lucide-react";
import { useRecordSpin } from "../hooks/use-record-spin";
import type { PlayableTrack } from "../lib/music-board";
import { ListenLinks } from "./listen-links";
import type { MusicLabels } from "./music-board";

/** Resting height of each equaliser bar and its offset into the bounce, so the bars move out of step. */
const EQ_BARS = [
  { restingScale: 0.3, delay: "0ms" },
  { restingScale: 0.6, delay: "-300ms" },
  { restingScale: 0.4, delay: "-600ms" },
  { restingScale: 0.8, delay: "-150ms" },
  { restingScale: 0.5, delay: "-450ms" },
];

type RecordPlayerProps = {
  track: PlayableTrack;
  heading: string;
  labels: MusicLabels;
  isPlaying: boolean;
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
  const { discRef, stackRef, scratchHandlers, tiltHandlers } = useRecordSpin(isPlaying);
  const hasPreview = Boolean(track.previewUrl);

  return (
    <div className="reveal flex shrink-0 basis-full flex-col items-center gap-5 rounded-xl border border-line-strong bg-(image:--panel-gradient) px-6 py-7 sm:basis-(--record-panel-width)">
      <div {...tiltHandlers} className="p-2 perspective-[700px]">
        <div
          ref={stackRef}
          data-playing={isPlaying}
          className="group/record relative h-46 w-51 transition-transform duration-250 ease-[ease-out] transform-3d [transform:rotateX(14deg)_rotateY(-12deg)] motion-reduce:transition-none"
        >
          <div className="absolute top-2 left-0 size-(--record-size) rounded-pill bg-[conic-gradient(from_0deg,var(--accent),var(--accent-hi),var(--accent-lo),var(--accent))] opacity-0 blur-[26px] transition-opacity duration-600 ease-[ease] group-data-[playing=true]/record:opacity-60 group-data-[playing=true]/record:motion-safe:animate-record-glow-spin" />
          <div className="absolute top-2 left-0 size-(--record-size) rounded-pill bg-black shadow-disc [transform:translateZ(-10px)]" />
          <div
            key={track.id}
            className={`absolute inset-0 transform-3d ${animateSwap ? "motion-safe:animate-record-swap" : ""}`}
          >
            <div
              ref={discRef}
              // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
              role="img"
              aria-label={labels.record}
              title={labels.hint}
              {...scratchHandlers}
              className="absolute top-2 left-0 flex size-(--record-size) cursor-grab touch-none items-center justify-center rounded-pill bg-[repeating-radial-gradient(circle,var(--bg-sunken)_0_2px,var(--surface-raised)_2px_4px)] active:cursor-grabbing"
            >
              <div className="flex aspect-square w-[36%] items-center justify-center rounded-pill bg-accent">
                <div className="aspect-square w-[16%] rounded-pill bg-bg" />
              </div>
            </div>
          </div>
          <div className="record-sheen pointer-events-none absolute top-2 left-0 size-(--record-size) rounded-pill" />
          <div className="pointer-events-none absolute top-0 right-2 flex h-29.5 w-3.5 origin-[50%_7px] -rotate-6 flex-col items-center transition-transform duration-900 ease-spring group-data-[playing=true]/record:rotate-26 motion-reduce:transition-none">
            <span className="size-3.5 rounded-pill border-2 border-text-2 bg-line-input" />
            <span className="w-1 flex-auto rounded-xs bg-[linear-gradient(var(--text-2),var(--text-faint))]" />
            <span className="h-4.5 w-3 rounded-[3px] bg-text-2" />
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
          className="flex size-12 shrink-0 items-center justify-center rounded-pill bg-accent text-on-accent shadow-glow transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPlaying ? (
            <Pause size={18} fill="currentColor" aria-hidden="true" />
          ) : (
            <Play size={18} fill="currentColor" aria-hidden="true" />
          )}
        </button>
        <div
          key={track.id}
          className={`flex min-w-0 flex-col gap-0.5 ${animateSwap ? "motion-safe:animate-record-info" : ""}`}
        >
          <span className="flex items-center gap-2 font-mono text-caption tracking-[0.08em] text-text-muted uppercase">
            {heading}
            <span
              data-playing={isPlaying}
              aria-hidden="true"
              className="group/eq flex h-2.5 items-end gap-0.5 opacity-0 transition-opacity duration-300 ease-out data-[playing=true]:opacity-100"
            >
              {EQ_BARS.map(({ restingScale, delay }) => (
                <span
                  key={delay}
                  style={{ transform: `scaleY(${restingScale})`, animationDelay: delay }}
                  className="w-0.5 origin-bottom self-stretch rounded-xs bg-accent group-data-[playing=true]/eq:motion-safe:animate-eq-bounce"
                />
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

      <ListenLinks track={track} labels={labels} />
    </div>
  );
}
