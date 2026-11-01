/** Pure globe geometry: no DOM, no clock. Angles in degrees unless a name says radians. */

export type GeoPoint = { lat: number; lon: number };

/** Where the camera looks (the point at the centre of the disc) and how far it is zoomed in. */
export type GlobeView = GeoPoint & { zoom: number };

export type ProjectedPoint = {
  /** Pixels right of the globe centre. */
  x: number;
  /** Pixels below the globe centre. */
  y: number;
  /** Cosine of the angle from the view centre: 1 facing the viewer, 0 on the rim, negative behind. */
  depth: number;
  isFront: boolean;
};

export const MIN_ZOOM = 1;
export const MAX_ZOOM = 16;
export const MIN_LATITUDE = -70;
export const MAX_LATITUDE = 80;
/** Pins closer than this on screen merge into one cluster. */
export const CLUSTER_THRESHOLD_IN_PIXELS = 38;
/** The flight zoom cap is this many zoom-degrees divided by the degrees left to travel. */
const ZOOM_ARC_NUMERATOR = 40;
const MIN_REMAINING_DEGREES = 0.05;

const RADIANS_PER_DEGREE = Math.PI / 180;
const DEGREES_PER_RADIAN = 180 / Math.PI;
/** Extra zoom past the exact splitting zoom so the split pins clear the threshold. */
const SPLIT_ZOOM_MARGIN = 1.15;

const toRadians = (degrees: number) => degrees * RADIANS_PER_DEGREE;
const toDegrees = (radians: number) => radians * DEGREES_PER_RADIAN;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Wraps a longitude into [-180, 180). */
export function wrapLongitude(lon: number): number {
  return ((((lon + 180) % 360) + 360) % 360) - 180;
}

/** Orthographic projection of a point on a sphere of `radiusInPixels` seen from `view`. */
export function project(point: GeoPoint, view: GeoPoint, radiusInPixels: number): ProjectedPoint {
  const lat = toRadians(point.lat);
  const centerLat = toRadians(view.lat);
  const lonOffset = toRadians(point.lon - view.lon);

  const right = Math.cos(lat) * Math.sin(lonOffset);
  const up =
    Math.cos(centerLat) * Math.sin(lat) - Math.sin(centerLat) * Math.cos(lat) * Math.cos(lonOffset);
  const depth =
    Math.sin(centerLat) * Math.sin(lat) + Math.cos(centerLat) * Math.cos(lat) * Math.cos(lonOffset);

  return {
    x: right * radiusInPixels,
    y: -up * radiusInPixels,
    depth,
    isFront: depth > 0,
  };
}

/** Great-circle distance between two points. */
export function angularDistanceInDegrees(from: GeoPoint, to: GeoPoint): number {
  const fromLat = toRadians(from.lat);
  const toLat = toRadians(to.lat);
  const lonOffset = toRadians(to.lon - from.lon);
  const cosine =
    Math.sin(fromLat) * Math.sin(toLat) + Math.cos(fromLat) * Math.cos(toLat) * Math.cos(lonOffset);
  return toDegrees(Math.acos(clamp(cosine, -1, 1)));
}

/** Turns a drag of `deltaX`/`deltaY` pixels into a new view, so the surface follows the pointer. */
export function rotateByDrag(
  view: GlobeView,
  deltaX: number,
  deltaY: number,
  radiusInPixels: number,
): GlobeView {
  const degreesPerPixel = toDegrees(1 / radiusInPixels);
  return {
    ...view,
    lon: wrapLongitude(view.lon - deltaX * degreesPerPixel),
    lat: clamp(view.lat + deltaY * degreesPerPixel, MIN_LATITUDE, MAX_LATITUDE),
  };
}

export type ClusterablePin = { id: string; geo: GeoPoint; x: number; y: number };

export type PinCluster = {
  /** Stable id built from the member ids, so React keys survive re-clustering. */
  id: string;
  members: ClusterablePin[];
  /** Mean screen position of the members. */
  x: number;
  y: number;
  /** Mean position on the sphere of the members. */
  geo: GeoPoint;
};

function meanGeoPoint(points: GeoPoint[]): GeoPoint {
  let sumX = 0;
  let sumY = 0;
  let sumZ = 0;
  for (const point of points) {
    const lat = toRadians(point.lat);
    const lon = toRadians(point.lon);
    sumX += Math.cos(lat) * Math.cos(lon);
    sumY += Math.cos(lat) * Math.sin(lon);
    sumZ += Math.sin(lat);
  }
  return {
    lat: toDegrees(Math.atan2(sumZ, Math.hypot(sumX, sumY))),
    lon: toDegrees(Math.atan2(sumY, sumX)),
  };
}

/**
 * Greedy screen-space clustering: each pin joins the first cluster whose centroid is within the
 * threshold, and the centroid is the mean of its members. Input order decides ties.
 */
export function clusterPins(
  pins: readonly ClusterablePin[],
  thresholdInPixels: number = CLUSTER_THRESHOLD_IN_PIXELS,
): PinCluster[] {
  const groups: ClusterablePin[][] = [];
  const centers: { x: number; y: number }[] = [];

  for (const pin of pins) {
    const groupIndex = centers.findIndex(
      (center) => Math.hypot(center.x - pin.x, center.y - pin.y) < thresholdInPixels,
    );
    if (groupIndex === -1) {
      groups.push([pin]);
      centers.push({ x: pin.x, y: pin.y });
      continue;
    }
    groups[groupIndex].push(pin);
    const members = groups[groupIndex];
    centers[groupIndex] = {
      x: members.reduce((sum, member) => sum + member.x, 0) / members.length,
      y: members.reduce((sum, member) => sum + member.y, 0) / members.length,
    };
  }

  return groups.map((members, index) => ({
    id: members.map((member) => member.id).join("+"),
    members,
    x: centers[index].x,
    y: centers[index].y,
    geo: meanGeoPoint(members.map((member) => member.geo)),
  }));
}

/**
 * The zoom at which the two closest members of a cluster sit just past the threshold apart. Near
 * the view centre, screen distance is roughly baseRadius * zoom * angle (in radians).
 */
export function zoomToSplit(
  memberGeos: readonly GeoPoint[],
  baseRadiusInPixels: number,
  thresholdInPixels: number = CLUSTER_THRESHOLD_IN_PIXELS,
): number {
  let closestAngleInRadians = Infinity;
  for (let first = 0; first < memberGeos.length; first++) {
    for (let second = first + 1; second < memberGeos.length; second++) {
      const angle = toRadians(angularDistanceInDegrees(memberGeos[first], memberGeos[second]));
      closestAngleInRadians = Math.min(closestAngleInRadians, angle);
    }
  }
  if (!Number.isFinite(closestAngleInRadians) || closestAngleInRadians === 0) return MAX_ZOOM;
  const exactZoom = thresholdInPixels / (baseRadiusInPixels * closestAngleInRadians);
  return clamp(exactZoom * SPLIT_ZOOM_MARGIN, MIN_ZOOM, MAX_ZOOM);
}

/** The highest zoom a flight may have while `remainingDegrees` of travel are left. */
export function zoomCapForRemainingDistance(remainingDegrees: number): number {
  return Math.max(MIN_ZOOM, ZOOM_ARC_NUMERATOR / Math.max(remainingDegrees, MIN_REMAINING_DEGREES));
}

export type FlightTarget = GeoPoint & { zoom: number };

/** How far the view moves toward its target each frame, as a fraction of the gap. */
const FLIGHT_EASING = 0.07;
/** A flight ends once the centre is this close to the target, in degrees. */
const FLIGHT_ARRIVAL_DEGREES = 0.02;

/**
 * One frame of a fly-to. The centre eases along the shortest path; the zoom eases toward the
 * target but is capped by the distance still to go, so a long flight stays zoomed out and only
 * zooms in as the rotation settles.
 */
export function stepFlight(
  view: GlobeView,
  target: FlightTarget,
): { view: GlobeView; hasArrived: boolean } {
  const lonGap = wrapLongitude(target.lon - view.lon);
  const latGap = target.lat - view.lat;
  const remainingDegrees = Math.hypot(lonGap, latGap);
  const zoomGoal = Math.min(target.zoom, zoomCapForRemainingDistance(remainingDegrees));
  return {
    view: {
      lon: wrapLongitude(view.lon + lonGap * FLIGHT_EASING),
      lat: clamp(view.lat + latGap * FLIGHT_EASING, MIN_LATITUDE, MAX_LATITUDE),
      zoom: clampZoom(view.zoom + (zoomGoal - view.zoom) * FLIGHT_EASING),
    },
    hasArrived: remainingDegrees < FLIGHT_ARRIVAL_DEGREES,
  };
}

export function clampZoom(zoom: number): number {
  return clamp(zoom, MIN_ZOOM, MAX_ZOOM);
}

export function clampLatitude(lat: number): number {
  return clamp(lat, MIN_LATITUDE, MAX_LATITUDE);
}
