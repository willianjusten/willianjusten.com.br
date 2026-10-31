"use client";

import type { PlayableTrack } from "@/content/music-board";
import { PastTracks } from "./past-tracks";
import { RecordPlayer } from "./record-player";
import { usePreviewPlayer } from "./use-preview-player";

export type MusicLabels = {
  songOfTheMoment: string;
  record: string;
  play: string;
  pause: string;
  previewUnavailable: string;
  hint: string;
  listenOn: string;
  youtubeMusic: string;
  spotify: string;
  appleMusic: string;
  credit: string;
  previously: string;
  /** Contains `{title}`. */
  previewTrack: string;
  /** Contains `{title}`. */
  pauseTrack: string;
};

type MusicBoardProps = {
  locale: string;
  songOfTheMoment: PlayableTrack;
  pastTracks: PlayableTrack[];
  labels: MusicLabels;
};

export function MusicBoard({ locale, songOfTheMoment, pastTracks, labels }: MusicBoardProps) {
  const { playingTrackId, toggle } = usePreviewPlayer();

  return (
    <div className="mt-10 flex flex-wrap items-stretch gap-x-10 gap-y-8">
      <RecordPlayer
        track={songOfTheMoment}
        labels={labels}
        isPlaying={playingTrackId === songOfTheMoment.id}
        onToggle={toggle}
      />
      <PastTracks
        locale={locale}
        tracks={pastTracks}
        labels={labels}
        playingTrackId={playingTrackId}
        onToggle={toggle}
      />
    </div>
  );
}
