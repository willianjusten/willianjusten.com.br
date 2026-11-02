"use client";

/* The frame is a keyboard-operable widget (arrow keys rotate it) and the canvas is a described image. */
/* oxlint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex, jsx-a11y/prefer-tag-over-role */

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useGlobeAlbum } from "../hooks/use-globe-album";
import { useGlobeDrag } from "../hooks/use-globe-drag";
import { useGlobeScene } from "../hooks/use-globe-scene";
import { project, zoomToSplit } from "../lib/globe-math";
import {
  INITIAL_VIEW,
  baseRadiusOf,
  createGlobeMotion,
  flyTo,
  nudgeByArrowKey,
  zoomBy,
  zoomOutToStart,
} from "../lib/globe-motion";
import { hasPhotosToStep, stepAlbum, type GlobePlace } from "../lib/places-board";
import { AlbumPanel, type AlbumLabels } from "./album-panel";
import { GlobeControls, type GlobeControlsLabels } from "./globe-controls";
import { GLOBE_FRAME_CLASS } from "./globe-frame";
import { GlobePin } from "./globe-pin";
import { PhotoViewer } from "./photo-viewer";

type GlobeLabels = GlobeControlsLabels & {
  description: string;
  clusterOf: string;
  album: AlbumLabels;
};

const HOME_ZOOM = 1.8;
const PLACE_ZOOM = 14;

export function Globe({ places, labels }: { places: GlobePlace[]; labels: GlobeLabels }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const expandButtonRef = useRef<HTMLButtonElement>(null);
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);
  const shouldRefocusExpandRef = useRef(false);
  const motionRef = useRef(createGlobeMotion());
  const {
    selectedSlug,
    selectedSlugRef,
    album,
    isAlbumOpenRef,
    selectPlace,
    openAlbum,
    showPhotoAt,
  } = useGlobeAlbum();
  const albumPlace = album ? places.find((place) => place.slug === album.slug) : undefined;
  const canStepPhotos = useMemo(() => hasPhotosToStep(places), [places]);
  const { clustersByLeadRef, registerPinElement, focusPin } = useGlobeScene({
    frameRef,
    canvasRef,
    motionRef,
    selectedSlugRef,
    isAlbumOpenRef,
    places,
    clusterLabel: labels.clusterOf,
  });

  const clearSelection = useCallback(() => {
    setIsPhotoExpanded(false);
    selectPlace(null);
    openAlbum(null);
  }, [openAlbum, selectPlace]);

  const resetView = useCallback(() => {
    clearSelection();
    flyTo(motionRef.current, INITIAL_VIEW, INITIAL_VIEW.zoom);
  }, [clearSelection]);

  const closeAlbum = useCallback(() => {
    if (!album) return;
    clearSelection();
    // Focus first: a pin's focus handler may start a flight, which the zoom-out below must override.
    focusPin(album.slug);
    zoomOutToStart(motionRef.current);
  }, [album, clearSelection, focusPin]);

  // Pins, controls and the album stop their own presses, so a tap here landed on the empty globe.
  const dragHandlers = useGlobeDrag(motionRef, canvasRef, closeAlbum);

  const openPlace = useCallback(
    (place: GlobePlace, photoIndex: number) => {
      const motion = motionRef.current;
      selectPlace(place.slug);
      openAlbum(place.photos.length > 0 ? { slug: place.slug, photoIndex } : null);
      // Never zoom out to open a place: a cluster that only split near full zoom would merge again.
      flyTo(motion, place, place.isHome ? HOME_ZOOM : Math.max(PLACE_ZOOM, motion.zoomGoal));
    },
    [openAlbum, selectPlace],
  );

  const stepPhoto = useCallback(
    (direction: 1 | -1) => {
      if (!album) return;
      const next = stepAlbum(places, album, direction);
      const nextPlace = places.find((place) => place.slug === next.slug);
      if (next.slug === album.slug || !nextPlace) showPhotoAt(next.photoIndex);
      else openPlace(nextPlace, next.photoIndex);
    },
    [album, openPlace, places, showPhotoAt],
  );

  const activate = useCallback(
    (place: GlobePlace) => {
      const motion = motionRef.current;
      const cluster = clustersByLeadRef.current.get(place.slug);
      const canvas = canvasRef.current;
      if (cluster && cluster.members.length > 1 && canvas) {
        const splitZoom = zoomToSplit(
          cluster.members.map((member) => member.geo),
          baseRadiusOf(canvas.clientWidth, canvas.clientHeight),
        );
        flyTo(motion, cluster.geo, Math.max(splitZoom, motion.view.zoom));
        return;
      }
      openPlace(place, 0);
    },
    [clustersByLeadRef, openPlace],
  );

  const bringPlaceToFront = useCallback((place: GlobePlace) => {
    const motion = motionRef.current;
    if (!project(place, motion.view, 1).isFront) flyTo(motion, place, motion.view.zoom);
  }, []);

  const albumSlug = album?.slug;
  useEffect(() => {
    const panel = panelRef.current;
    // Stepping into another place from inside the panel keeps focus on the button that did it.
    if (albumSlug && panel && !panel.contains(document.activeElement)) panel.focus();
  }, [albumSlug]);

  const expandPhoto = useCallback(() => setIsPhotoExpanded(true), []);

  const collapsePhoto = useCallback(() => {
    shouldRefocusExpandRef.current = true;
    setIsPhotoExpanded(false);
  }, []);

  // The expand button is inert while the viewer is open, so focus returns once it is interactive again.
  useEffect(() => {
    if (isPhotoExpanded || !shouldRefocusExpandRef.current) return;
    shouldRefocusExpandRef.current = false;
    expandButtonRef.current?.focus({ preventScroll: true });
  }, [isPhotoExpanded]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && album) {
      event.preventDefault();
      closeAlbum();
      return;
    }
    if (event.target !== event.currentTarget) return;
    if (nudgeByArrowKey(motionRef.current, event.key)) event.preventDefault();
  };

  return (
    <div
      ref={frameRef}
      tabIndex={0}
      role="group"
      aria-label={labels.description}
      {...dragHandlers}
      onKeyDown={onKeyDown}
      className={`relative cursor-grab touch-none overflow-hidden select-none ${GLOBE_FRAME_CLASS}`}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={labels.description}
        className="absolute inset-0 size-full"
      />

      <div inert={isPhotoExpanded} className="contents">
        {places.map((place) => (
          <GlobePin
            key={place.slug}
            place={place}
            isSelected={place.slug === selectedSlug}
            onMount={registerPinElement}
            onActivate={activate}
            onFocus={bringPlaceToFront}
          />
        ))}

        <GlobeControls
          labels={labels}
          onZoomBy={(factor) => zoomBy(motionRef.current, factor)}
          onReset={resetView}
        />

        {album && albumPlace ? (
          <AlbumPanel
            place={albumPlace}
            photoIndex={album.photoIndex}
            canStep={canStepPhotos}
            labels={labels.album}
            panelRef={panelRef}
            expandButtonRef={expandButtonRef}
            onExpand={expandPhoto}
            onShowPhoto={showPhotoAt}
            onStep={stepPhoto}
            onClose={closeAlbum}
          />
        ) : null}
      </div>

      {isPhotoExpanded && album && albumPlace ? (
        <PhotoViewer
          photo={albumPlace.photos[album.photoIndex]}
          photoIndex={album.photoIndex}
          total={albumPlace.photos.length}
          canStep={canStepPhotos}
          labels={labels.album}
          onStep={stepPhoto}
          onClose={collapsePhoto}
        />
      ) : null}
    </div>
  );
}
