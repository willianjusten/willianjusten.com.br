import { getIgdbClient } from "@/lib/games/igdb-server";
import { createSearchRoute } from "@/lib/games/recommendation-routes";

const searchRoute = createSearchRoute({
  searchGames: async (text) => getIgdbClient().searchGames(text),
});

export const GET = searchRoute.GET;
