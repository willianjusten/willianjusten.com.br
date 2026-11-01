"use client";

import { useCallback, useRef, useState } from "react";

export type Album = { slug: string; photoIndex: number };

/**
 * The selected place and its open album. Each is mirrored in a ref so the frame loop can read the
 * latest value without re-subscribing.
 */
export function useGlobeAlbum() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selectedSlugRef = useRef<string | null>(null);
  const [album, setAlbum] = useState<Album | null>(null);
  const isAlbumOpenRef = useRef(false);

  const selectPlace = useCallback((slug: string | null) => {
    selectedSlugRef.current = slug;
    setSelectedSlug(slug);
  }, []);

  const openAlbum = useCallback((nextAlbum: Album | null) => {
    isAlbumOpenRef.current = nextAlbum !== null;
    setAlbum(nextAlbum);
  }, []);

  const showPhotoAt = useCallback((photoIndex: number) => {
    setAlbum((current) => (current ? { ...current, photoIndex } : current));
  }, []);

  return {
    selectedSlug,
    selectedSlugRef,
    album,
    isAlbumOpenRef,
    selectPlace,
    openAlbum,
    showPhotoAt,
  };
}
