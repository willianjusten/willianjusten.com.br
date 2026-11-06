import { describe, expect, it } from "vitest";
import imageLoader from "../image-loader";

const CLOUDINARY_PHOTO = "https://res.cloudinary.com/demo/image/upload/trips/2026-rio/photo";
const IGDB_COVER = "https://images.igdb.com/igdb/image/upload/t_cover_big/co6jar.jpg";

describe("imageLoader", () => {
  it("asks Cloudinary for the requested width in an automatic format", () => {
    expect(imageLoader({ src: CLOUDINARY_PHOTO, width: 640 })).toBe(
      "https://res.cloudinary.com/demo/image/upload/f_auto,c_limit,w_640,q_auto/trips/2026-rio/photo",
    );
  });

  it("passes an explicit quality to Cloudinary", () => {
    expect(imageLoader({ src: CLOUDINARY_PHOTO, width: 640, quality: 60 })).toContain(",q_60/");
  });

  it("caps Cloudinary widths", () => {
    expect(imageLoader({ src: CLOUDINARY_PHOTO, width: 3840 })).toContain(",w_2400,");
  });

  it("picks the smallest IGDB cover at least as wide as the request", () => {
    expect(imageLoader({ src: IGDB_COVER, width: 64 })).toContain("/t_cover_small/");
    expect(imageLoader({ src: IGDB_COVER, width: 256 })).toContain("/t_cover_big/");
    expect(imageLoader({ src: IGDB_COVER, width: 384 })).toContain("/t_cover_big_2x/");
  });

  it("falls back to the largest IGDB cover for wide requests", () => {
    expect(imageLoader({ src: IGDB_COVER, width: 1080 })).toContain("/t_cover_big_2x/");
  });

  it("leaves other sources untouched", () => {
    expect(imageLoader({ src: "/assets/me.png", width: 640 })).toBe("/assets/me.png");
  });
});
