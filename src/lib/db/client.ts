import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { readConnectionString } from "./connection-string";
import * as schema from "./schema";

function createDatabase() {
  return drizzle({ client: neon(readConnectionString()), schema });
}

export type Database = ReturnType<typeof createDatabase>;

let cachedDatabase: Database | undefined;

/** Lazy so that importing a route never needs credentials at build time. */
export function getDatabase(): Database {
  cachedDatabase ??= createDatabase();
  return cachedDatabase;
}
