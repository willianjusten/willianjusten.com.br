import coversJson from "./generated/game-covers.json";
import { gameCoversFileSchema } from "./game-cover-schema";

/** Written by `pnpm games:covers`. Do not edit by hand. */
export const gameCovers = gameCoversFileSchema.parse(coversJson);
