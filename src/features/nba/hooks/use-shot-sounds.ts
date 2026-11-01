import { useCallback, useRef } from "react";
import { pickShotSound, SHOT_SOUND_FILES, type ShotSound } from "../lib/shot-sounds";

export function useShotSounds() {
  const soundsRef = useRef<Partial<Record<ShotSound, HTMLAudioElement>>>({});
  const playingSoundRef = useRef<HTMLAudioElement | null>(null);
  const missStreakRef = useRef(0);

  const play = useCallback((sound: ShotSound | null) => {
    if (!sound) return;
    const audio = (soundsRef.current[sound] ??= new Audio(SHOT_SOUND_FILES[sound]));
    const previous = playingSoundRef.current;
    if (previous && previous !== audio) previous.pause();
    audio.currentTime = 0;
    playingSoundRef.current = audio;
    // Autoplay can still be refused (for example on an unfocused tab); the game goes on silently.
    audio.play().catch(() => undefined);
  }, []);

  const playMake = useCallback(
    (makeStreak: number) => {
      missStreakRef.current = 0;
      play(pickShotSound({ made: true, makeStreak, missStreak: 0 }));
    },
    [play],
  );

  const playMiss = useCallback(() => {
    missStreakRef.current += 1;
    play(pickShotSound({ made: false, makeStreak: 0, missStreak: missStreakRef.current }));
  }, [play]);

  return { playMake, playMiss };
}
