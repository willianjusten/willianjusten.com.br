import { createIgdbClient } from "./igdb";
import type { IgdbClient } from "./igdb";

let cachedClient: IgdbClient | undefined;

/** Server only. Lazy so that importing a route never needs credentials at build time. */
export function getIgdbClient(): IgdbClient {
  if (!cachedClient) {
    const clientId = process.env.IGDB_CLIENT_ID;
    const clientSecret = process.env.IGDB_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      throw new Error("IGDB_CLIENT_ID and IGDB_CLIENT_SECRET must be set");
    }
    cachedClient = createIgdbClient({ clientId, clientSecret });
  }
  return cachedClient;
}
