import { hc } from "hono/client";
import { AppType } from "server";
export const client = hc<AppType>(import.meta.env.VITE_SERVER_URL);
