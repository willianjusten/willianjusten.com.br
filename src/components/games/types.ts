import type { GameList, GamePlatform } from "@/content/games";

/** A game as the client shelf sees it: the note is already picked for the visitor's locale. */
export type ShelfEntry = {
  slug: string;
  title: string;
  platform: GamePlatform;
  list: GameList;
  year: number | string;
  note: string;
  tone: string;
};
