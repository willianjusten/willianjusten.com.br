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

  it("anchors a pin's bottom centre on its screen position", () => {
    const { pins } = layout({ places: [PARIS] });

    expect(pinOf(pins, "paris")?.transform).toBe(
      "translate(400px, 300px) translate(-50%, -100%) scale(1)",
    );
  });
});
