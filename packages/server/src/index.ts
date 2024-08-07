import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { sql, db, usersTable } from "database";

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

async function usernameExists(username: string) {
  const userExist = await db
    .select()
    .from(usersTable)
    .where(sql`${usersTable.username}=${username}`);
  return userExist.length;
}

async function emailExists(email: string) {
  const userExist = await db
    .select()
    .from(usersTable)
    .where(sql`${usersTable.email}=${email}`);
  return userExist.length;
}

const route = app.post(
  "/register",
  zValidator("json", registerSchema),
  async (c) => {
    const { username, password, email } = c.req.valid("json");
    if (await usernameExists(username))
      return c.json("username already exists");
    if (await emailExists(email)) return c.json("email already exists");
    const hashedPassword = await Bun.password.hash(password);
    const res = await db
      .insert(usersTable)
      .values({ username, password: hashedPassword, email });
    return c.json(res);
  },
);

app.all("*", (c) => c.json(c.req.json(), 404));

export type AppType = typeof route;
export default app;
