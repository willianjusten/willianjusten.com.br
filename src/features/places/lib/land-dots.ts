import { LAND_MASK_BASE64, LAND_MASK_STEP_IN_DEGREES } from "./land-mask";

export type LandDots = {
  /** sin and cos of each dot's latitude, and its longitude in radians, as parallel arrays. */
  sinLat: Float32Array;
  cosLat: Float32Array;
  lonRadians: Float32Array;
  count: number;
};

export function decodeLandDots(
  base64Mask: string = LAND_MASK_BASE64,
  stepInDegrees: number = LAND_MASK_STEP_IN_DEGREES,
): LandDots {
  const bytes = Uint8Array.from(atob(base64Mask), (character) => character.charCodeAt(0));
  const columns = 360 / stepInDegrees;
  const rows = 180 / stepInDegrees;
  const sinLat: number[] = [];
  const cosLat: number[] = [];
  const lonRadians: number[] = [];

  for (let row = 0; row < rows; row++) {
    const lat = ((90 - stepInDegrees * (row + 0.5)) * Math.PI) / 180;
    for (let column = 0; column < columns; column++) {
      const cellIndex = row * columns + column;
      if (!(bytes[cellIndex >> 3] & (1 << (cellIndex & 7)))) continue;
      sinLat.push(Math.sin(lat));
      cosLat.push(Math.cos(lat));
      lonRadians.push(((-180 + stepInDegrees * (column + 0.5)) * Math.PI) / 180);
    }
  }

  return {
    sinLat: Float32Array.from(sinLat),
    cosLat: Float32Array.from(cosLat),
    lonRadians: Float32Array.from(lonRadians),
    count: sinLat.length,
  };
}
