// import { drizzle } from "drizzle-orm/postgres-js";
// import { migrate } from "drizzle-orm/postgres-js/migrator";
// import postgres from "postgres";
import { config } from "dotenv";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

config({ path: ".env" });

// const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });
// const queryClient = postgres(process.env.DATABASE_URL!);
const queryClient = neon(process.env.DATABASE_URL!);
export const db = drizzle(queryClient);
