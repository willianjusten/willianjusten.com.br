import { describe, expect, it } from "vitest";
import {
  MAX_ZOOM,
  angularDistanceInDegrees,
  clusterPins,
  project,
  rotateByDrag,
  stepFlight,
  wrapLongitude,
  zoomCapForRemainingDistance,
  zoomToSplit,
  type GlobeView,
} from "./globe-math";

const RADIUS = 200;
const PARIS = { lat: 48.86, lon: 2.35 };
const SAO_PAULO = { lat: -23.55, lon: -46.63 };

describe("project", () => {
  it("puts the view centre at the origin, facing the viewer", () => {
    const projected = project(PARIS, PARIS, RADIUS);
    expect(projected.x).toBeCloseTo(0);
    expect(projected.y).toBeCloseTo(0);
    expect(projected.depth).toBeCloseTo(1);
    expect(projected.isFront).toBe(true);
  });

  it("puts a point east of the centre to the right and north of it above", () => {
    const east = project({ lat: 0, lon: 30 }, { lat: 0, lon: 0 }, RADIUS);
    expect(east.x).toBeCloseTo(RADIUS * 0.5);
    const north = project({ lat: 30, lon: 0 }, { lat: 0, lon: 0 }, RADIUS);
    expect(north.y).toBeCloseTo(-RADIUS * 0.5);
  });

  it("marks the antipode as the back side", () => {
    const antipode = project({ lat: -48.86, lon: -177.65 }, PARIS, RADIUS);
    expect(antipode.isFront).toBe(false);
    expect(antipode.depth).toBeCloseTo(-1);
  });
});

describe("angularDistanceInDegrees", () => {
  it("is 90 degrees from the equator to a pole and 0 for the same point", () => {
    expect(angularDistanceInDegrees({ lat: 0, lon: 0 }, { lat: 90, lon: 0 })).toBeCloseTo(90);
    expect(angularDistanceInDegrees(PARIS, PARIS)).toBeCloseTo(0);
  });
});

describe("rotateByDrag", () => {
  const view: GlobeView = { lat: 0, lon: 0, zoom: 1 };

  it("drags the surface with the pointer and clamps the latitude", () => {
    expect(rotateByDrag(view, 10, 0, RADIUS).lon).toBeLessThan(0);
    expect(rotateByDrag(view, 0, 100000, RADIUS).lat).toBe(80);
    expect(rotateByDrag(view, 0, -100000, RADIUS).lat).toBe(-70);
  });

  it("wraps the longitude", () => {
    expect(wrapLongitude(190)).toBe(-170);
    expect(wrapLongitude(-190)).toBe(170);
  });
});

describe("clusterPins", () => {
  const pin = (id: string, x: number, y: number) => ({ id, geo: { lat: y, lon: x }, x, y });

  it("merges pins closer than the threshold and keeps far pins apart", () => {
    const clusters = clusterPins([pin("a", 0, 0), pin("b", 20, 0), pin("c", 200, 0)], 38);
    expect(clusters).toHaveLength(2);
    expect(clusters[0].members.map((member) => member.id)).toEqual(["a", "b"]);
    expect(clusters[1].members).toHaveLength(1);
  });

  it("places the screen centroid at the mean of the members", () => {
    const [cluster] = clusterPins([pin("a", 0, 0), pin("b", 20, 10)], 38);
    expect(cluster.x).toBeCloseTo(10);
    expect(cluster.y).toBeCloseTo(5);
  });

  it("places the geographic centroid between the members", () => {
    const [cluster] = clusterPins([pin("a", 0, 0), pin("b", 10, 0)], 38);
    expect(cluster.geo.lon).toBeCloseTo(5);
    expect(cluster.geo.lat).toBeCloseTo(0);
  });
});

describe("zoomToSplit", () => {
  it("needs a higher zoom for closer pins, capped at the maximum", () => {
    const brussels = { lat: 50.85, lon: 4.35 };
    const bruges = { lat: 51.21, lon: 3.22 };
    const apart = zoomToSplit([brussels, { lat: 48.86, lon: 2.35 }], 260);
    const near = zoomToSplit([brussels, bruges], 260);
    expect(near).toBeGreaterThan(apart);
    expect(zoomToSplit([brussels, brussels], 260)).toBe(MAX_ZOOM);
  });
});

describe("zoom arc", () => {
  it("allows less zoom the further there is left to travel", () => {
    expect(zoomCapForRemainingDistance(80)).toBeLessThan(zoomCapForRemainingDistance(10));
    expect(zoomCapForRemainingDistance(180)).toBe(1);
  });

  it("flies to the target, staying zoomed out until the rotation settles", () => {
    let view: GlobeView = { ...SAO_PAULO, zoom: 1 };
    const target = { ...PARIS, zoom: 14 };
    const firstFrame = stepFlight(view, target);
    expect(firstFrame.view.zoom).toBeLessThan(2);

    let hasArrived = false;
    for (let frame = 0; frame < 2000 && !hasArrived; frame++) {
      ({ view, hasArrived } = stepFlight(view, target));
    }
    expect(hasArrived).toBe(true);
    expect(view.lat).toBeCloseTo(PARIS.lat, 0);
    expect(view.lon).toBeCloseTo(PARIS.lon, 0);
  });
});
