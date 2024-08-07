import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { db, usersTable } from "database";

const app = new Hono();
app.use("*", cors());

export function getUsers() {
  return db.select().from(usersTable);
}

const registerSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
});

const route = app.post(
  "/register",
  zValidator("json", registerSchema),
  async (c) => {
    const data = c.req.valid("json");
    const users = await getUsers()
    console.log(users)
    return c.json(data);
  },
);

app.all("*", (c) => c.json(c.req.json(), 404));

export type AppType = typeof route;
export default app;
