import {
  CLUSTER_THRESHOLD_IN_PIXELS,
  clusterPins,
  project,
  type GlobeView,
  type PinCluster,
} from "./globe-math";
import type { GlobeFrame } from "./globe-renderer";
import type { GlobePlace } from "./places-board";

const LABEL_ZOOM = 2.5;
/** Pins fade in between these depths so they dissolve at the rim instead of popping. */
const PIN_MIN_DEPTH = 0.08;
const PIN_FADE_RANGE = 4;
const PIN_MIN_SCALE = 0.7;
const PIN_DEPTH_SCALE = 0.3;
/**
 * Some places sit too close to split even at full zoom (Kyoto, Osaka and Nara), so from this zoom
 * a crowded cluster fans its pins out in a ring instead of stacking them behind a count.
 */
const FAN_OUT_ZOOM = 12;
/** Gap between neighbouring fanned pins, wide enough for a photo card and its name tag. */
const FAN_SPACING_IN_PIXELS = 100;

type PinPlace = Pick<GlobePlace, "slug" | "name" | "country" | "lat" | "lon">;

/** Everything the frame loop writes to one pin's DOM, as the strings the DOM wants. */
export type PinLayout = {
  slug: string;
  transform: string;
  zIndex: string;
  opacity: string;
  isInteractive: boolean;
  isFocusable: boolean;
  /** Places merged into this pin; above 1 the pin shows a count badge. */
  memberCount: number;
  showsName: boolean;
  ariaLabel: string;
};

export type PinLayoutInput = {
  places: readonly PinPlace[];
  frame: GlobeFrame;
  view: GlobeView;
  selectedSlug: string | null;
  clusterLabel: string;
};

/**
 * Projects every place, merges pins that crowd each other on screen, and decides how each one is
 * drawn. A cluster is led by the selected place when it holds it, otherwise by its first member.
 */
export function layoutPins({ places, frame, view, selectedSlug, clusterLabel }: PinLayoutInput): {
  pins: PinLayout[];
  clustersByLead: Map<string, PinCluster>;
} {
  const projections = places.map((place) => ({
    place,
    projected: project(place, view, frame.radius),
  }));

  const isFannedOut = view.zoom >= FAN_OUT_ZOOM;
  const clusters = clusterPins(
    projections
      .filter(({ projected }) => projected.depth > PIN_MIN_DEPTH)
      .map(({ place, projected }) => ({
        id: place.slug,
        geo: place,
        x: projected.x,
        y: projected.y,
      })),
    // Fanned pins must clear a whole card, so anything closer than that counts as crowded.
    isFannedOut ? FAN_SPACING_IN_PIXELS : CLUSTER_THRESHOLD_IN_PIXELS,
  );

  const laidOutClusters = isFannedOut ? clusters.flatMap(fanOut) : clusters;

  const clustersByLead = new Map<string, PinCluster>();
  const hiddenMembers = new Set<string>();
  for (const cluster of laidOutClusters) {
    const lead = cluster.members.find((member) => member.id === selectedSlug) ?? cluster.members[0];
    clustersByLead.set(lead.id, cluster);
    for (const member of cluster.members) {
      if (member.id !== lead.id) hiddenMembers.add(member.id);
    }
  }

  const nameBySlug = new Map(places.map((place) => [place.slug, place.name]));
  const pins = projections.map(({ place, projected }): PinLayout => {
    const cluster = clustersByLead.get(place.slug);
    const isHidden = hiddenMembers.has(place.slug);
    const isVisible = projected.depth > PIN_MIN_DEPTH && !isHidden;
    const screenX = frame.centerX + (cluster ? cluster.x : projected.x);
    const screenY = frame.centerY + (cluster ? cluster.y : projected.y);
    const scale = PIN_MIN_SCALE + PIN_DEPTH_SCALE * projected.depth;
    const memberCount = cluster ? cluster.members.length : 1;
    return {
      slug: place.slug,
      transform: `translate(${screenX}px, ${screenY}px) translate(-50%, -100%) scale(${scale})`,
      zIndex: String(Math.round(Math.max(0, projected.depth) * 100)),
      opacity: isVisible
        ? String(Math.min(1, (projected.depth - PIN_MIN_DEPTH) * PIN_FADE_RANGE))
        : "0",
      isInteractive: isVisible,
      isFocusable: !isHidden,
      memberCount,
      showsName: memberCount === 1 && (view.zoom > LABEL_ZOOM || selectedSlug === place.slug),
      ariaLabel:
        memberCount > 1
          ? `${clusterLabel} ${memberCount}: ${cluster?.members
              .map((member) => nameBySlug.get(member.id))
              .join(", ")}`
          : `${place.name}, ${place.country}`,
    };
  });

  return { pins, clustersByLead };
}

/**
 * Splits a cluster into one-place clusters spread evenly on a ring around its centre. The ring is
 * turned so each place lands as close as it can to its real direction from the centre.
 */
function fanOut(cluster: PinCluster): PinCluster[] {
  const { members } = cluster;
  if (members.length < 2) return [cluster];
  const slotAngle = (2 * Math.PI) / members.length;
  const ringRadius = FAN_SPACING_IN_PIXELS / (2 * Math.sin(slotAngle / 2));
  const membersByAngle = members
    .map((member) => ({ member, angle: Math.atan2(member.y - cluster.y, member.x - cluster.x) }))
    .sort((first, second) => first.angle - second.angle);
  // Circular mean of how far each place sits from its slot: the ring turn that fits them best.
  const turn = Math.atan2(
    membersByAngle.reduce((sum, { angle }, index) => sum + Math.sin(angle - index * slotAngle), 0),
    membersByAngle.reduce((sum, { angle }, index) => sum + Math.cos(angle - index * slotAngle), 0),
  );
  return membersByAngle.map(({ member }, index) => {
    const angle = turn + index * slotAngle;
    const x = cluster.x + ringRadius * Math.cos(angle);
    const y = cluster.y + ringRadius * Math.sin(angle);
    return { members: [{ ...member, x, y }], x, y, geo: member.geo };
  });
}
