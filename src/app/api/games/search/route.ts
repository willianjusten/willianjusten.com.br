import { getIgdbClient } from "@/sections/games/server/igdb-server";
import { createSearchRoute } from "@/sections/games/server/recommendation-routes";

const searchRoute = createSearchRoute({
  searchGames: async (text) => getIgdbClient().searchGames(text),
});

export const GET = searchRoute.GET;
