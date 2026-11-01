import type { GameList, GamePlatform } from "@/content/games";

/** A game as the client shelf sees it: the note is already picked for the visitor's locale. */
export type ShelfEntry = {
  slug: string;
  title: string;
  platform: GamePlatform;
  list: GameList;
  year: number | string;
  note: string;
  /** Stars for a played game, absent until it is rated. */
  rating?: number;
  tone: string;
  /** Portrait IGDB cover, or null to show the tone and title instead. */
  coverUrl: string | null;
};

/** What a 3D case needs to draw itself; the cover art replaces the tone and the title text. */
export type CaseEntry = {
  title: string;
  platform: GamePlatform;
  tone: string;
  coverUrl?: string | null;
  /** Pill above the title, e.g. "recommended x3". */
  sticker?: string;
};
