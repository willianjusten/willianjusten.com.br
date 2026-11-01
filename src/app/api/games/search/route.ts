import { getIgdbClient } from "@/features/games/server/igdb-server";
import { createSearchRoute } from "@/features/games/server/recommendation-routes";

const searchRoute = createSearchRoute({
  searchGames: async (text) => getIgdbClient().searchGames(text),
});

export const GET = searchRoute.GET;
