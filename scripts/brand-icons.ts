/**
 * Run by hand after changing the logo mark: `pnpm icons`.
 * Renders the "wj" mark (same as the Open Graph image) to src/app/icon.png,
 * src/app/apple-icon.png and src/app/favicon.ico, which Next serves as the site icons.
 */
import { readFile, writeFile } from "node:fs/promises";
import { ImageResponse } from "next/og.js";
import { createElement } from "react";
import { palette } from "../src/lib/palette.ts";

const APP_DIRECTORY = new URL("../src/app/", import.meta.url);
const LOGO_FONT_URL = new URL(
  "../src/app/[locale]/fonts/BricolageGrotesque-ExtraBold.ttf",
  import.meta.url,
);
const LOGO_FONT_FAMILY = "Bricolage Grotesque";
const LOGO_FONT_WEIGHT = 800;

/** Proportions of the mark on the Open Graph image: a 96px tile, 16px corners, 52px letters. */
const CORNER_RADIUS_RATIO = 16 / 96;
const LETTER_SIZE_RATIO = 52 / 96;

const logoFont = await readFile(LOGO_FONT_URL);

async function renderMark(size: number, { rounded }: { rounded: boolean }): Promise<Buffer> {
  const mark = createElement(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: rounded ? size * CORNER_RADIUS_RATIO : 0,
        background: `linear-gradient(135deg, ${palette.accentHigh}, ${palette.accent} 45%, ${palette.accentLow})`,
        color: palette.onAccent,
        fontFamily: LOGO_FONT_FAMILY,
        fontWeight: LOGO_FONT_WEIGHT,
        fontSize: size * LETTER_SIZE_RATIO,
      },
    },
    "wj",
  );
  const image = new ImageResponse(mark, {
    width: size,
    height: size,
    fonts: [{ name: LOGO_FONT_FAMILY, data: logoFont, weight: LOGO_FONT_WEIGHT }],
  });
  return Buffer.from(await image.arrayBuffer());
}

/** An .ico file that wraps PNG images, which every current browser reads. */
function buildIco(images: { size: number; png: Buffer }[]): Buffer {
  const HEADER_SIZE = 6;
  const DIRECTORY_ENTRY_SIZE = 16;
  const header = Buffer.alloc(HEADER_SIZE);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2); // image type: icon
  header.writeUInt16LE(images.length, 4);

  let dataOffset = HEADER_SIZE + DIRECTORY_ENTRY_SIZE * images.length;
  const entries = images.map(({ size, png }) => {
    const entry = Buffer.alloc(DIRECTORY_ENTRY_SIZE);
    entry.writeUInt8(size, 0); // width
    entry.writeUInt8(size, 1); // height
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(dataOffset, 12);
    dataOffset += png.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...images.map(({ png }) => png)]);
}

// iOS masks the touch icon into its own rounded shape, so that one is a full square.
await writeFile(new URL("icon.png", APP_DIRECTORY), await renderMark(512, { rounded: true }));
await writeFile(
  new URL("apple-icon.png", APP_DIRECTORY),
  await renderMark(180, { rounded: false }),
);
const icoSizes = [16, 32, 48];
const icoImages = await Promise.all(
  icoSizes.map(async (size) => ({ size, png: await renderMark(size, { rounded: true }) })),
);
await writeFile(new URL("favicon.ico", APP_DIRECTORY), buildIco(icoImages));

console.log("Wrote src/app/icon.png, src/app/apple-icon.png and src/app/favicon.ico");
