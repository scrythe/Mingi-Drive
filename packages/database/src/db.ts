import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { config } from "dotenv";
config({ path: ".env" });

const queryClient = postgres(process.env["DATABASE_URL"]!);

export const db = drizzle(queryClient);
