import Image from "next/image";
import type { PointerEvent } from "react";
import type { GlobePlace } from "../lib/places-board";

/** The globe's frame loop positions the pin and writes its badge, name and label directly. */
export type GlobePinElements = {
  pin: HTMLButtonElement;
  name: HTMLSpanElement;
  badge: HTMLSpanElement;
};

type GlobePinProps = {
  place: GlobePlace;
  isSelected: boolean;
  onMount: (slug: string, element: Partial<GlobePinElements>) => void;
  onActivate: () => void;
  onFocus: () => void;
  onPointerDown: (event: PointerEvent) => void;
};

/** A photo card on a stick for one place. Hidden until the frame loop places it. */
export function GlobePin({
  place,
  isSelected,
  onMount,
  onActivate,
  onFocus,
  onPointerDown,
}: GlobePinProps) {
  const [cover] = place.photos;
  return (
    <button
      type="button"
      ref={(pin) => {
        if (pin) onMount(place.slug, { pin });
      }}
      aria-pressed={isSelected}
      onPointerDown={onPointerDown}
      onClick={onActivate}
      onFocus={onFocus}
      style={{ transformOrigin: "50% 100%" }}
      className="absolute top-0 left-0 flex cursor-pointer flex-col items-center border-0 bg-transparent p-0 hover:brightness-125 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <span
        ref={(name) => {
          if (name) onMount(place.slug, { name });
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
          ref={(badge) => {
            if (badge) onMount(place.slug, { badge });
          }}
          aria-hidden="true"
          className="absolute -top-2.5 -right-2.5 hidden h-[22px] min-w-[22px] items-center justify-center rounded-pill bg-accent px-1.5 font-mono text-overline font-medium text-on-accent"
        />
      </span>
      <span aria-hidden="true" className={`h-2.5 w-0.5 ${isSelected ? "bg-accent" : "bg-text"}`} />
      <span
        aria-hidden="true"
        className="-mt-px size-2 rounded-full bg-accent shadow-[0_0_0_3px_var(--bg),0_0_14px_var(--accent)]"
      />
    </button>
  );
}
