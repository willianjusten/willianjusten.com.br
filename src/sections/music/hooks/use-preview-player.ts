"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * One shared audio element for the whole music section, so starting any preview
 * stops whichever one was playing.
 */
export function usePreviewPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    const stop = () => setPlayingTrackId(null);
    audio.addEventListener("ended", stop);
    audio.addEventListener("error", stop);
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeEventListener("ended", stop);
      audio.removeEventListener("error", stop);
      audioRef.current = null;
    };
  }, []);

  const toggle = useCallback(
    (trackId: string, previewUrl: string) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (playingTrackId === trackId) {
        audio.pause();
        setPlayingTrackId(null);
        return;
      }

      audio.pause();
      audio.src = previewUrl;
      setPlayingTrackId(trackId);
      audio.play().catch(() => setPlayingTrackId(null));
    },
    [playingTrackId],
  );

  return { playingTrackId, toggle };
}
