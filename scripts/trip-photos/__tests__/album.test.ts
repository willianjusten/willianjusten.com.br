import { describe, expect, it } from "vitest";
import { buildAlbums, type CloudinaryImage } from "../album.ts";

function image(overrides: Partial<CloudinaryImage> & { public_id: string }): CloudinaryImage {
  return {
    folder: overrides.public_id.slice(0, overrides.public_id.lastIndexOf("/")),
    filename: overrides.public_id.slice(overrides.public_id.lastIndexOf("/") + 1),
    width: 4000,
    height: 3000,
    ...overrides,
  };
}

describe("buildAlbums", () => {
  it("groups photos by folder in filename order, with a numeric prefix setting the order", () => {
    const albums = buildAlbums(
      ["trips/2026-paris"],
      [
        image({ public_id: "trips/2026-paris/10-louvre" }),
        image({ public_id: "trips/2026-paris/02-seine", width: 3000, height: 4000 }),
        image({ public_id: "trips/2026-paris/01-eiffel" }),
      ],
    );

    expect(albums["trips/2026-paris"]).toEqual([
      { publicId: "trips/2026-paris/01-eiffel", width: 4000, height: 3000 },
      { publicId: "trips/2026-paris/02-seine", width: 3000, height: 4000 },
      { publicId: "trips/2026-paris/10-louvre", width: 4000, height: 3000 },
    ]);
  });

  it("reads camera settings from EXIF and fills the gaps from hand-typed context", () => {
    const albums = buildAlbums(
      ["trips/2026-paris"],
      [
        image({
          public_id: "trips/2026-paris/01-eiffel",
          image_metadata: {
            Make: "FUJIFILM",
            Model: "X-T5",
            FocalLength: "35.0 mm",
            FNumber: "2",
            ExposureTime: "1/250",
            ISO: "160",
            DateTimeOriginal: "2026:04:12 18:03:11",
          },
          context: { title: "Eiffel at dusk", lens: "XF35mmF1.4 R" },
        }),
      ],
    );

    expect(albums["trips/2026-paris"][0]).toEqual({
      publicId: "trips/2026-paris/01-eiffel",
      width: 4000,
      height: 3000,
      title: "Eiffel at dusk",
      exif: {
        camera: "FUJIFILM X-T5",
        lens: "XF35mmF1.4 R",
        focalLength: "35mm",
        aperture: "f/2",
        shutter: "1/250s",
        iso: "ISO 160",
        year: "2026",
      },
    });
  });

  it("leaves EXIF out for an old photo with neither EXIF nor context", () => {
    const albums = buildAlbums(
      ["trips/2016-petropolis"],
      [
        image({
          public_id: "trips/2016-petropolis/palace",
          image_metadata: { JFIFVersion: "1.02", DPI: "72" },
        }),
      ],
    );

    expect(albums["trips/2016-petropolis"][0]).toEqual({
      publicId: "trips/2016-petropolis/palace",
      width: 4000,
      height: 3000,
    });
  });

  it("fails loudly naming every configured folder that has no photos", () => {
    expect(() =>
      buildAlbums(
        ["trips/2026-paris", "trips/2026-bruges", "trips/2026-dinant"],
        [image({ public_id: "trips/2026-paris/01-eiffel" })],
      ),
    ).toThrow(/trips\/2026-bruges, trips\/2026-dinant/);
  });
});
