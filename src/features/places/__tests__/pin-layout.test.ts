import { describe, expect, it } from "vitest";
import { layoutPins, type PinLayoutInput } from "../lib/pin-layout";

const PARIS = { slug: "paris", name: "Paris", country: "France", lat: 48.86, lon: 2.35 };
const VERSAILLES = {
  slug: "versailles",
  name: "Versailles",
  country: "France",
  lat: 48.8,
  lon: 2.13,
};
const TOKYO = { slug: "tokyo", name: "Tokyo", country: "Japan", lat: 35.68, lon: 139.69 };
const KYOTO = { slug: "kyoto", name: "Kyoto", country: "Japan", lat: 35.01, lon: 135.77 };
const OSAKA = { slug: "osaka", name: "Osaka", country: "Japan", lat: 34.69, lon: 135.5 };
const NARA = { slug: "nara", name: "Nara", country: "Japan", lat: 34.69, lon: 135.8 };
const PORTO = {
  slug: "porto-de-galinhas",
  name: "Porto de Galinhas",
  country: "Brazil",
  lat: -8.5,
  lon: -35,
};
const MARAGOGI = { slug: "maragogi", name: "Maragogi", country: "Brazil", lat: -9.01, lon: -35.22 };

function layout(overrides: Partial<PinLayoutInput> = {}) {
  return layoutPins({
    places: [PARIS, VERSAILLES, TOKYO],
    frame: { width: 800, height: 600, centerX: 400, centerY: 300, radius: 250 },
    view: { lat: PARIS.lat, lon: PARIS.lon, zoom: 1 },
    selectedSlug: null,
    clusterLabel: "Cluster of",
    ...overrides,
  });
}

const pinOf = (pins: ReturnType<typeof layout>["pins"], slug: string) =>
  pins.find((pin) => pin.slug === slug);

function screenPointOf(pins: ReturnType<typeof layout>["pins"], slug: string) {
  const [, x, y] =
    pinOf(pins, slug)?.transform.match(/^translate\((-?[\d.]+)px, (-?[\d.]+)px\)/) ?? [];
  return { x: Number(x), y: Number(y) };
}

describe("layoutPins", () => {
  it("merges nearby places into one pin led by the first member", () => {
    const { pins, clustersByLead } = layout();

    const lead = pinOf(pins, "paris");
    expect(lead?.memberCount).toBe(2);
    expect(lead?.ariaLabel).toBe("Cluster of 2: Paris, Versailles");
    expect(clustersByLead.get("paris")?.members).toHaveLength(2);

    const member = pinOf(pins, "versailles");
    expect(member).toMatchObject({ opacity: "0", isInteractive: false, isFocusable: false });
  });

  it("lets the selected place lead its cluster", () => {
    const { pins } = layout({ selectedSlug: "versailles" });

    expect(pinOf(pins, "versailles")?.memberCount).toBe(2);
    expect(pinOf(pins, "paris")?.isFocusable).toBe(false);
  });

  it("hides places on the far side but keeps them focusable", () => {
    const { pins } = layout({ view: { lat: -35, lon: -40, zoom: 1 } });

    expect(pinOf(pins, "tokyo")).toMatchObject({
      opacity: "0",
      isInteractive: false,
      isFocusable: true,
    });
  });

  it("splits a cluster and names the pins once zoomed in", () => {
    const { pins } = layout({
      view: { lat: PARIS.lat, lon: PARIS.lon, zoom: 16 },
      frame: { width: 800, height: 600, centerX: 400, centerY: 300, radius: 20_000 },
    });

    expect(pinOf(pins, "paris")).toMatchObject({
      memberCount: 1,
      showsName: true,
      ariaLabel: "Paris, France",
    });
    expect(pinOf(pins, "versailles")?.isInteractive).toBe(true);
  });

  it("fans out places still crowded at full zoom so each one can be opened, keeping their directions", () => {
    const { pins, clustersByLead } = layout({
      places: [KYOTO, OSAKA, NARA],
      view: { lat: 34.8, lon: 135.69, zoom: 16 },
      frame: { width: 800, height: 600, centerX: 400, centerY: 300, radius: 4_000 },
    });

    for (const slug of ["kyoto", "osaka", "nara"]) {
      expect(pinOf(pins, slug)).toMatchObject({
        memberCount: 1,
        isInteractive: true,
        showsName: true,
      });
    }
    expect([...clustersByLead.values()].every((cluster) => cluster.members.length === 1)).toBe(
      true,
    );

    const kyoto = screenPointOf(pins, "kyoto");
    const osaka = screenPointOf(pins, "osaka");
    const nara = screenPointOf(pins, "nara");
    for (const [first, second] of [
      [kyoto, osaka],
      [kyoto, nara],
      [osaka, nara],
    ]) {
      expect(Math.hypot(first.x - second.x, first.y - second.y)).toBeGreaterThanOrEqual(80);
    }
    expect(kyoto.y).toBeLessThan(osaka.y);
    expect(kyoto.y).toBeLessThan(nara.y);
    expect(osaka.x).toBeLessThan(nara.x);
  });

  it("also fans out pins that would overlap at full zoom without being close enough to merge", () => {
    const { pins } = layout({
      places: [PORTO, MARAGOGI],
      view: { lat: -8.75, lon: -35.11, zoom: 14 },
      frame: { width: 800, height: 600, centerX: 400, centerY: 300, radius: 4_000 },
    });

    const porto = screenPointOf(pins, "porto-de-galinhas");
    const maragogi = screenPointOf(pins, "maragogi");
    expect(Math.hypot(porto.x - maragogi.x, porto.y - maragogi.y)).toBeGreaterThanOrEqual(80);
    expect(porto.y).toBeLessThan(maragogi.y);
  });

  it("anchors a pin's bottom centre on its screen position", () => {
    const { pins } = layout({ places: [PARIS] });

    expect(pinOf(pins, "paris")?.transform).toBe(
      "translate(400px, 300px) translate(-50%, -100%) scale(1)",
    );
  });
});
