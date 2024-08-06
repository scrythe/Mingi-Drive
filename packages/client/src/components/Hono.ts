import { hc } from "hono/client";
import { AppType } from "server";
export const client = hc<AppType>("http://localhost:3000/");
