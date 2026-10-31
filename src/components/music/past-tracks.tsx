import { Pause, Play } from "lucide-react";
import type { PlayableTrack } from "@/content/music-board";
import type { MusicLabels } from "./music-board";

type PastTracksProps = {
  locale: string;
  tracks: PlayableTrack[];
  labels: MusicLabels;
  playingTrackId: string | null;
  onToggle: (trackId: string, previewUrl: string) => void;
};

function formatMonth(month: string, locale: string): string {
  const [year, monthNumber] = month.split("-").map(Number);
  return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric", timeZone: "UTC" })
    .format(new Date(Date.UTC(year, monthNumber - 1, 1)))
    .replace(".", "");
}

export function PastTracks({ locale, tracks, labels, playingTrackId, onToggle }: PastTracksProps) {
  return (
    <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-3">
      <h3 className="m-0 font-mono text-overline font-normal tracking-[0.08em] text-text-muted uppercase">
        {labels.previously}
      </h3>
      <ol className="m-0 list-none border-t border-line p-0">
        {tracks.map((track) => {
          const isPlaying = playingTrackId === track.id;
          const buttonLabel = (isPlaying ? labels.pauseTrack : labels.previewTrack).replace(
            "{title}",
            track.title,
          );

          return (
            <li
              key={track.id}
              data-playing={isPlaying}
              className="song group flex items-center gap-4 rounded-sm border-b border-line px-0 py-2 hover:bg-surface hover:px-3 focus-within:bg-surface focus-within:px-3 data-[playing=true]:bg-surface data-[playing=true]:px-3"
            >
              <time
                dateTime={track.month}
                className="w-[76px] shrink-0 font-mono text-overline text-text-muted"
              >
                {formatMonth(track.month, locale)}
              </time>
              <span className="min-w-0 flex-1 font-medium">
                {track.title}
                <span className="font-normal text-text-muted">, {track.artist}</span>
              </span>
              <button
                type="button"
                aria-label={buttonLabel}
                aria-pressed={isPlaying}
                disabled={!track.previewUrl}
                title={track.previewUrl ? undefined : labels.previewUnavailable}
                onClick={() => track.previewUrl && onToggle(track.id, track.previewUrl)}
                className="song-play flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-pill border-0 bg-transparent p-0 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="flex size-8 items-center justify-center rounded-pill bg-accent text-on-accent">
                  {isPlaying ? (
                    <Pause size={12} fill="currentColor" aria-hidden="true" />
                  ) : (
                    <Play size={12} fill="currentColor" aria-hidden="true" />
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
