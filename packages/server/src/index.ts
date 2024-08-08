import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { sql, db, usersTable } from "database";
import { Session, sessionMiddleware } from "hono-sessions";
import { BunSqliteStore } from "hono-sessions/bun-sqlite-store";
import { Database } from "bun:sqlite";
import middleware from "./cookie";

const app = new Hono<{
  Variables: {
    session: Session;
    session_key_rotation: boolean;
  };
}>();

app.use("*", cors());
// const dbBun = new Database("./database.sqlite");
// const store = new BunSqliteStore(dbBun);
// const query = dbBun.query("SELECT * FROM sessions");

// app.use(
//   "*",
//   sessionMiddleware({
//     store,
//     encryptionKey: "password_at_least_32_characters_long", // Required for CookieStore, recommended for others
//     expireAfterSeconds: 900, // Expire session after 15 minutes of inactivity
//     cookieOptions: {
//       sameSite: "Lax", // Recommended for basic CSRF protection in modern browsers
//       path: "/", // Required for this library to work properly
//       httpOnly: true, // Recommended to avoid XSS attacks
//     },
//   }),
// );

app.use("*", middleware);

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

const route = app
  .post("/register", zValidator("json", registerSchema), async (c) => {
    const { username, password, email } = c.req.valid("json");
    if (await usernameExists(username))
      return c.json("username already exists");
    if (await emailExists(email)) return c.json("email already exists");
    const hashedPassword = await Bun.password.hash(password);
    const res = await db
      .insert(usersTable)
      .values({ username, password: hashedPassword, email });
    return c.json(res);
  })
  .get("/signed-cookie", async (c) => {
    const session = c.get("session");
    console.log(session.getCache());
    if (session.get("counter")) {
      session.set("counter", (session.get("counter") as number) + 1);
    } else {
      session.set("counter", 1);
    }
    console.log(query.run());

    // await setSignedCookie(c, "great_cookie", "blueberry", "hm");
    return c.json(session.get("counter")!);
  })
  .get("/", (c) => {
    const session = c.get("session");
    // session.set("lol", "les go");
    return c.json("hm");
  });

app.all("*", (c) => c.json(c.req.json(), 404));

export type AppType = typeof route;
export default app;
