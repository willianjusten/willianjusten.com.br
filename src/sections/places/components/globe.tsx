"use client";

/* The frame is a keyboard-operable widget (arrow keys rotate it) and the canvas is a described image, as the ticket specifies. */
/* oxlint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex, jsx-a11y/prefer-tag-over-role */

import { Globe as GlobeIcon, Minus, Play, Plus, Square } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GlobePlace } from "../lib/places-board";
import {
  CLUSTER_THRESHOLD_IN_PIXELS,
  clampZoom,
  clusterPins,
  project,
  rotateByDrag,
  stepFlight,
  wrapLongitude,
  zoomToSplit,
  MAX_LATITUDE,
  MIN_LATITUDE,
  type FlightTarget,
  type GeoPoint,
  type GlobeView,
  type PinCluster,
} from "../lib/globe-math";
import { decodeLandDots } from "../lib/land-dots";
import { withAlpha } from "@/lib/palette";
import { AlbumPanel, type AlbumLabels } from "./album-panel";

export type GlobeLabels = {
  description: string;
  zoomIn: string;
  zoomOut: string;
  reset: string;
  hint: string;
  clusterOf: string;
  album: AlbumLabels;
  tour: { play: string; stop: string };
};

const INITIAL_VIEW: GlobeView = { lat: 18, lon: -25, zoom: 1 };
const VIEW_RADIUS_RATIO = 0.42;
const CENTER_Y_RATIO = 0.52;
const MAX_PIXEL_RATIO = 2;
const INERTIA_DECAY = 0.94;
const IDLE_SPIN_DEGREES_PER_FRAME = 0.06;
const IDLE_VELOCITY_LIMIT = 0.02;
const ZOOM_EASING = 0.08;
const KEY_ROTATE_IMPULSE = 1.5;
const HOME_ZOOM = 1.8;
const PLACE_ZOOM = 14;
const LABEL_ZOOM = 2.5;
/** Pins fade in between these depths so they dissolve at the rim instead of popping. */
const PIN_MIN_DEPTH = 0.08;
const PIN_FADE_RANGE = 4;
/** While an album is open on a wide stage, the globe slides left so the place stays clear of the panel. */
const ALBUM_CENTER_X_RATIO = 0.34;
const ALBUM_SHIFT_MIN_WIDTH = 760;
const CENTER_EASING = 0.08;
const TOUR_STEP_IN_MS = 2800;
const TOUR_PHOTOS_PER_STOP = 2;

type Album = { slug: string; photoIndex: number };
type TourStep = { place: GlobePlace; photoIndex: number };

/** The tour visits the trips in content order, showing up to two photos at each stop. */
function planTour(places: readonly GlobePlace[]): TourStep[] {
  return places.flatMap((place) =>
    place.photos
      .slice(0, TOUR_PHOTOS_PER_STOP)
      .map((_photo, photoIndex) => ({ place, photoIndex })),
  );
}

type GlobeState = {
  view: GlobeView;
  velocity: { lon: number; lat: number };
  flightTarget: FlightTarget | null;
  zoomGoal: number;
  drag: { lastX: number; lastY: number } | null;
  clustersByLead: Map<string, PinCluster>;
  /** Eased towards the stage centre, or towards the left while an album is open. */
  centerX: number | null;
};

export function Globe({ places, labels }: { places: GlobePlace[]; labels: GlobeLabels }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pinRefs = useRef(new Map<string, HTMLButtonElement>());
  const badgeRefs = useRef(new Map<string, HTMLSpanElement>());
  const nameRefs = useRef(new Map<string, HTMLSpanElement>());
  const globeRef = useRef<GlobeState>({
    view: INITIAL_VIEW,
    velocity: { lon: 0, lat: 0 },
    flightTarget: null,
    zoomGoal: INITIAL_VIEW.zoom,
    drag: null,
    clustersByLead: new Map(),
    centerX: null,
  });
  const panelRef = useRef<HTMLElement>(null);
  const tourTimerRef = useRef<number | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selectedSlugRef = useRef<string | null>(null);
  const [album, setAlbum] = useState<Album | null>(null);
  const isAlbumOpenRef = useRef(false);
  const [isTouring, setIsTouring] = useState(false);
  const albumPlace = album ? places.find((place) => place.slug === album.slug) : undefined;

  const select = useCallback((slug: string | null) => {
    selectedSlugRef.current = slug;
    setSelectedSlug(slug);
  }, []);

  const showAlbum = useCallback((nextAlbum: Album | null) => {
    isAlbumOpenRef.current = nextAlbum !== null;
    setAlbum(nextAlbum);
  }, []);

  const stopTour = useCallback(() => {
    if (tourTimerRef.current !== null) window.clearInterval(tourTimerRef.current);
    tourTimerRef.current = null;
    setIsTouring(false);
  }, []);

  useEffect(() => stopTour, [stopTour]);

  const flyTo = useCallback((point: GeoPoint, zoom: number) => {
    const globe = globeRef.current;
    globe.velocity = { lon: 0, lat: 0 };
    globe.zoomGoal = clampZoom(zoom);
    globe.flightTarget = {
      lat: Math.min(MAX_LATITUDE, Math.max(MIN_LATITUDE, point.lat)),
      lon: point.lon,
      zoom: globe.zoomGoal,
    };
  }, []);

  const zoomBy = useCallback(
    (factor: number) => {
      stopTour();
      const globe = globeRef.current;
      globe.zoomGoal = clampZoom(globe.zoomGoal * factor);
      if (globe.flightTarget) globe.flightTarget = { ...globe.flightTarget, zoom: globe.zoomGoal };
    },
    [stopTour],
  );

  const resetView = useCallback(() => {
    stopTour();
    select(null);
    showAlbum(null);
    flyTo(INITIAL_VIEW, INITIAL_VIEW.zoom);
  }, [flyTo, select, showAlbum, stopTour]);

  const closeAlbum = useCallback(() => {
    if (!album) return;
    stopTour();
    select(null);
    showAlbum(null);
    // Focus first: a pin's focus handler may start a flight, which the zoom-out below must override.
    pinRefs.current.get(album.slug)?.focus();
    const globe = globeRef.current;
    globe.flightTarget = null;
    globe.zoomGoal = INITIAL_VIEW.zoom;
  }, [album, select, showAlbum, stopTour]);

  const showPhoto = useCallback(
    (photoIndex: number) => {
      stopTour();
      setAlbum((current) => (current ? { ...current, photoIndex } : current));
    },
    [stopTour],
  );

  const startTour = useCallback(() => {
    const steps = planTour(places);
    if (steps.length === 0) return;
    let stepIndex = 0;
    const playStep = () => {
      const step = steps[stepIndex];
      if (!step) {
        stopTour();
        return;
      }
      stepIndex++;
      select(step.place.slug);
      showAlbum({ slug: step.place.slug, photoIndex: step.photoIndex });
      flyTo(step.place, PLACE_ZOOM);
    };
    stopTour();
    setIsTouring(true);
    playStep();
    tourTimerRef.current = window.setInterval(playStep, TOUR_STEP_IN_MS);
  }, [flyTo, places, select, showAlbum, stopTour]);

  const activate = useCallback(
    (place: GlobePlace) => {
      stopTour();
      const cluster = globeRef.current.clustersByLead.get(place.slug);
      const canvas = canvasRef.current;
      if (cluster && cluster.members.length > 1 && canvas) {
        const baseRadius = Math.min(canvas.clientWidth, canvas.clientHeight) * VIEW_RADIUS_RATIO;
        const zoom = Math.max(
          zoomToSplit(
            cluster.members.map((member) => member.geo),
            baseRadius,
          ),
          globeRef.current.view.zoom,
        );
        flyTo(cluster.geo, zoom);
        return;
      }
      select(place.slug);
      showAlbum(place.photos.length > 0 ? { slug: place.slug, photoIndex: 0 } : null);
      flyTo(place, place.isHome ? HOME_ZOOM : PLACE_ZOOM);
    },
    [flyTo, select, showAlbum, stopTour],
  );

  const albumSlug = album?.slug;
  useEffect(() => {
    if (albumSlug && tourTimerRef.current === null) panelRef.current?.focus();
  }, [albumSlug]);

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!frame || !canvas || !context) return;

    const landDots = decodeLandDots();
    const styles = getComputedStyle(document.documentElement);
    const accent = styles.getPropertyValue("--accent");
    const dotColor = styles.getPropertyValue("--text-faint");
    const bodyHighlight = styles.getPropertyValue("--surface-raised");
    const bodyShade = styles.getPropertyValue("--bg-sunken");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const drawGlobe = (view: GlobeView, centerX: number, centerY: number, radius: number) => {
      context.clearRect(0, 0, width, height);

      if (radius < Math.max(width, height) * 1.2) {
        const halo = context.createRadialGradient(
          centerX,
          centerY,
          radius * 0.9,
          centerX,
          centerY,
          radius * 1.28,
        );
        halo.addColorStop(0, withAlpha(accent, 0.18));
        halo.addColorStop(0.45, withAlpha(accent, 0.06));
        halo.addColorStop(1, withAlpha(accent, 0));
        context.fillStyle = halo;
        context.beginPath();
        context.arc(centerX, centerY, radius * 1.28, 0, Math.PI * 2);
        context.fill();
      }

      const body = context.createRadialGradient(
        centerX - radius * 0.35,
        centerY - radius * 0.4,
        radius * 0.1,
        centerX,
        centerY,
        radius,
      );
      body.addColorStop(0, bodyHighlight);
      body.addColorStop(1, bodyShade);
      context.fillStyle = body;
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.fill();

      const yaw = (view.lon * Math.PI) / 180;
      const pitch = (view.lat * Math.PI) / 180;
      const cosPitch = Math.cos(pitch);
      const sinPitch = Math.sin(pitch);
      const baseDotSize = Math.max(1.3, radius * 0.0068);
      context.fillStyle = dotColor;
      for (let index = 0; index < landDots.count; index++) {
        const longitudeOffset = landDots.lonRadians[index] - yaw;
        const right = landDots.cosLat[index] * Math.sin(longitudeOffset);
        const up = landDots.sinLat[index];
        const toward = landDots.cosLat[index] * Math.cos(longitudeOffset);
        const depth = up * sinPitch + toward * cosPitch;
        if (depth <= 0) continue;
        const screenX = centerX + right * radius;
        const screenY = centerY - (up * cosPitch - toward * sinPitch) * radius;
        if (
          screenX < -baseDotSize ||
          screenX > width + baseDotSize ||
          screenY < -baseDotSize ||
          screenY > height + baseDotSize
        ) {
          continue;
        }
        context.globalAlpha = 0.18 + 0.82 * depth;
        const dotSize = baseDotSize * (0.55 + 0.45 * depth);
        if (dotSize < 4) {
          context.fillRect(screenX - dotSize / 2, screenY - dotSize / 2, dotSize, dotSize);
        } else {
          context.beginPath();
          context.arc(screenX, screenY, dotSize / 2, 0, Math.PI * 2);
          context.fill();
        }
      }
      context.globalAlpha = 1;
    };

    const placePins = (view: GlobeView, centerX: number, centerY: number, radius: number) => {
      const globe = globeRef.current;
      const selected = selectedSlugRef.current;
      const projections = places.map((place) => ({
        place,
        projected: project(place, view, radius),
      }));

      const visible = projections.filter(({ projected }) => projected.depth > PIN_MIN_DEPTH);
      const clusters = clusterPins(
        visible.map(({ place, projected }) => ({
          id: place.slug,
          geo: place,
          x: projected.x,
          y: projected.y,
        })),
        CLUSTER_THRESHOLD_IN_PIXELS,
      );

      const leadOf = new Map<string, PinCluster>();
      const hiddenMembers = new Set<string>();
      globe.clustersByLead = new Map();
      for (const cluster of clusters) {
        const lead = cluster.members.find((member) => member.id === selected) ?? cluster.members[0];
        leadOf.set(lead.id, cluster);
        globe.clustersByLead.set(lead.id, cluster);
        for (const member of cluster.members) {
          if (member.id !== lead.id) hiddenMembers.add(member.id);
        }
      }

      for (const { place, projected } of projections) {
        const pin = pinRefs.current.get(place.slug);
        if (!pin) continue;
        const cluster = leadOf.get(place.slug);
        const isVisible = projected.depth > PIN_MIN_DEPTH && !hiddenMembers.has(place.slug);
        const screenX = centerX + (cluster ? cluster.x : projected.x);
        const screenY = centerY + (cluster ? cluster.y : projected.y);
        const scale = 0.7 + 0.3 * projected.depth;
        pin.style.transform = `translate(${screenX}px, ${screenY}px) translate(-50%, -100%) scale(${scale})`;
        pin.style.zIndex = String(Math.round(Math.max(0, projected.depth) * 100));
        pin.style.opacity = isVisible
          ? String(Math.min(1, (projected.depth - PIN_MIN_DEPTH) * PIN_FADE_RANGE))
          : "0";
        pin.style.pointerEvents = isVisible ? "auto" : "none";
        pin.tabIndex = hiddenMembers.has(place.slug) ? -1 : 0;

        const memberCount = cluster ? cluster.members.length : 1;
        const badge = badgeRefs.current.get(place.slug);
        if (badge) {
          badge.style.display = memberCount > 1 ? "flex" : "none";
          badge.textContent = String(memberCount);
        }
        const name = nameRefs.current.get(place.slug);
        if (name) {
          const showsName =
            memberCount === 1 && (view.zoom > LABEL_ZOOM || selected === place.slug);
          name.style.display = showsName ? "block" : "none";
        }
        pin.setAttribute(
          "aria-label",
          memberCount > 1
            ? `${labels.clusterOf} ${memberCount}: ${cluster?.members
                .map((member) => places.find((candidate) => candidate.slug === member.id)?.name)
                .join(", ")}`
            : `${place.name}, ${place.country}`,
        );
      }
    };

    const advance = () => {
      const globe = globeRef.current;
      if (!globe.drag) {
        if (globe.flightTarget) {
          const { view, hasArrived } = stepFlight(globe.view, globe.flightTarget);
          globe.view = view;
          if (hasArrived) globe.flightTarget = null;
        } else {
          const { velocity } = globe;
          globe.view = {
            ...globe.view,
            lon: wrapLongitude(globe.view.lon + velocity.lon),
            lat: Math.min(MAX_LATITUDE, Math.max(MIN_LATITUDE, globe.view.lat + velocity.lat)),
            zoom: globe.view.zoom + (globe.zoomGoal - globe.view.zoom) * ZOOM_EASING,
          };
          velocity.lon *= INERTIA_DECAY;
          velocity.lat *= INERTIA_DECAY;
          const isIdle =
            !selectedSlugRef.current &&
            !reducedMotion.matches &&
            Math.abs(velocity.lon) < IDLE_VELOCITY_LIMIT;
          if (isIdle) {
            globe.view = {
              ...globe.view,
              lon: wrapLongitude(globe.view.lon + IDLE_SPIN_DEGREES_PER_FRAME / globe.view.zoom),
            };
          }
        }
      } else {
        globe.view = {
          ...globe.view,
          zoom: globe.view.zoom + (globe.zoomGoal - globe.view.zoom) * ZOOM_EASING,
        };
      }
    };

    const paint = () => {
      advance();
      const globe = globeRef.current;
      const { view } = globe;
      const radius = Math.min(width, height) * VIEW_RADIUS_RATIO * view.zoom;
      const targetCenterX =
        isAlbumOpenRef.current && width >= ALBUM_SHIFT_MIN_WIDTH
          ? width * ALBUM_CENTER_X_RATIO
          : width / 2;
      globe.centerX =
        globe.centerX === null
          ? targetCenterX
          : globe.centerX + (targetCenterX - globe.centerX) * CENTER_EASING;
      const { centerX } = globe;
      const centerY = height * CENTER_Y_RATIO;
      drawGlobe(view, centerX, centerY, radius);
      placePins(view, centerX, centerY, radius);
    };

    let animationFrame = 0;
    const loop = () => {
      paint();
      animationFrame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    visibilityObserver.observe(frame);
    paint();

    return () => {
      stop();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [places, labels.clusterOf]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    stopTour();
    const globe = globeRef.current;
    globe.flightTarget = null;
    globe.drag = { lastX: event.clientX, lastY: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.style.cursor = "grabbing";
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const globe = globeRef.current;
    if (!globe.drag) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const radius =
      Math.min(canvas.clientWidth, canvas.clientHeight) * VIEW_RADIUS_RATIO * globe.view.zoom;
    const next = rotateByDrag(
      globe.view,
      event.clientX - globe.drag.lastX,
      event.clientY - globe.drag.lastY,
      radius,
    );
    globe.velocity = {
      lon: wrapLongitude(next.lon - globe.view.lon),
      lat: next.lat - globe.view.lat,
    };
    globe.view = next;
    globe.drag = { lastX: event.clientX, lastY: event.clientY };
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    globeRef.current.drag = null;
    event.currentTarget.style.cursor = "";
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && album) {
      event.preventDefault();
      closeAlbum();
      return;
    }
    if (event.target !== event.currentTarget) return;
    const globe = globeRef.current;
    const impulse = KEY_ROTATE_IMPULSE / globe.view.zoom;
    const impulses: Record<string, [number, number]> = {
      ArrowLeft: [-impulse, 0],
      ArrowRight: [impulse, 0],
      ArrowUp: [0, impulse],
      ArrowDown: [0, -impulse],
    };
    const keyImpulse = impulses[event.key];
    if (!keyImpulse) return;
    event.preventDefault();
    stopTour();
    globe.flightTarget = null;
    globe.velocity = {
      lon: globe.velocity.lon + keyImpulse[0],
      lat: globe.velocity.lat + keyImpulse[1],
    };
  };

  const stopDrag = (event: React.PointerEvent) => event.stopPropagation();
  const controlClassName =
    "flex size-11 items-center justify-center rounded-md border border-line-strong bg-surface-raised text-text transition-colors hover:border-line-hover hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <div
      ref={frameRef}
      tabIndex={0}
      role="group"
      aria-label={labels.description}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
      className="relative h-[460px] w-full cursor-grab touch-none overflow-hidden rounded-xl border border-line bg-bg-sunken select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:h-[620px]"
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={labels.description}
        className="absolute inset-0 size-full"
      />

      {places.map((place) => {
        const isSelected = place.slug === selectedSlug;
        const [cover] = place.photos;
        return (
          <button
            key={place.slug}
            type="button"
            ref={(element) => {
              if (element) pinRefs.current.set(place.slug, element);
            }}
            aria-pressed={isSelected}
            onPointerDown={stopDrag}
            onClick={() => activate(place)}
            onFocus={() => {
              const projected = project(place, globeRef.current.view, 1);
              if (!projected.isFront) flyTo(place, globeRef.current.view.zoom);
            }}
            style={{ transformOrigin: "50% 100%" }}
            className="absolute top-0 left-0 flex cursor-pointer flex-col items-center border-0 bg-transparent p-0 hover:brightness-125 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span
              ref={(element) => {
                if (element) nameRefs.current.set(place.slug, element);
              }}
              className="mb-1.5 hidden rounded-xs bg-bg/85 px-2 py-0.5 text-overline font-semibold whitespace-nowrap text-text"
            >
              {place.name}
            </span>
            <span className="relative">
              <span
                aria-hidden="true"
                style={{ backgroundColor: place.color }}
                className={`relative block overflow-hidden rounded-xs border-2 shadow-1 ${
                  isSelected ? "h-11 w-15 border-accent" : "h-9 w-12 border-text"
                }`}
              >
                {cover ? (
                  <Image
                    src={cover.src}
                    alt=""
                    fill
                    sizes="60px"
                    placeholder="blur"
                    blurDataURL={cover.blurDataUrl}
                    className="object-cover"
                  />
                ) : null}
              </span>
              <span
                ref={(element) => {
                  if (element) badgeRefs.current.set(place.slug, element);
                }}
                aria-hidden="true"
                className="absolute -top-2.5 -right-2.5 hidden h-[22px] min-w-[22px] items-center justify-center rounded-pill bg-accent px-1.5 font-mono text-overline font-medium text-on-accent"
              />
            </span>
            <span
              aria-hidden="true"
              className={`h-2.5 w-0.5 ${isSelected ? "bg-accent" : "bg-text"}`}
            />
            <span
              aria-hidden="true"
              className="-mt-px size-2 rounded-full bg-accent shadow-[0_0_0_3px_var(--bg),0_0_14px_var(--accent)]"
            />
          </button>
        );
      })}

      <div className="absolute top-3 left-3 z-[200] flex flex-col gap-1.5">
        <button
          type="button"
          aria-label={labels.zoomIn}
          onPointerDown={stopDrag}
          onClick={() => zoomBy(2)}
          className={controlClassName}
        >
          <Plus size={18} strokeWidth={1.8} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={labels.zoomOut}
          onPointerDown={stopDrag}
          onClick={() => zoomBy(0.5)}
          className={controlClassName}
        >
          <Minus size={18} strokeWidth={1.8} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={labels.reset}
          onPointerDown={stopDrag}
          onClick={resetView}
          className={controlClassName}
        >
          <GlobeIcon size={18} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>

      <div className="absolute bottom-3 left-3 z-[200] flex flex-wrap items-center gap-3">
        <button
          type="button"
          aria-pressed={isTouring}
          onPointerDown={stopDrag}
          onClick={isTouring ? stopTour : startTour}
          className="flex min-h-11 cursor-pointer items-center gap-2 rounded-pill border-0 bg-(image:--ball-light) px-5 text-small font-semibold text-on-accent transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {isTouring ? (
            <Square size={14} fill="currentColor" strokeWidth={0} aria-hidden="true" />
          ) : (
            <Play size={14} fill="currentColor" strokeWidth={0} aria-hidden="true" />
          )}
          {isTouring ? labels.tour.stop : labels.tour.play}
        </button>
        <p className="pointer-events-none m-0 font-mono text-overline text-text-faint">
          {labels.hint}
        </p>
      </div>

      {album && albumPlace ? (
        <AlbumPanel
          place={albumPlace}
          photoIndex={album.photoIndex}
          labels={labels.album}
          panelRef={panelRef}
          onShowPhoto={showPhoto}
          onClose={closeAlbum}
          onPress={stopTour}
        />
      ) : null}
    </div>
  );
}
