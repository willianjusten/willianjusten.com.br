"use client";

import { useState } from "react";
import type { PlayableTrack } from "../lib/music-board";
import { PastTracks } from "./past-tracks";
import { RecordPlayer } from "./record-player";
import { usePreviewPlayer } from "../hooks/use-preview-player";

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
  onTheTurntable: string;
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
  const [loadedTrack, setLoadedTrack] = useState(songOfTheMoment);
  // Stays false until the first swap, so the record does not animate in on page load.
  const [hasSwappedRecord, setHasSwappedRecord] = useState(false);

  const listedTracks = [songOfTheMoment, ...pastTracks];

  function playListedTrack(trackId: string, previewUrl: string) {
    const track = listedTracks.find((listedTrack) => listedTrack.id === trackId);
    if (track && track.id !== loadedTrack.id) {
      setLoadedTrack(track);
      setHasSwappedRecord(true);
    }
    toggle(trackId, previewUrl);
  }

  const isSongOfTheMomentLoaded = loadedTrack.id === songOfTheMoment.id;

  return (
    <div className="mt-10 flex flex-wrap items-stretch gap-x-10 gap-y-8">
      <RecordPlayer
        track={loadedTrack}
        heading={isSongOfTheMomentLoaded ? labels.songOfTheMoment : labels.onTheTurntable}
        labels={labels}
        isPlaying={playingTrackId === loadedTrack.id}
        animateSwap={hasSwappedRecord}
        onToggle={toggle}
      />
      <PastTracks
        locale={locale}
        tracks={listedTracks}
        labels={labels}
        playingTrackId={playingTrackId}
        onToggle={playListedTrack}
      />
    </div>
  );
}
