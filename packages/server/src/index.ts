import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import sessionMiddleware, {
  createSession,
  deleteSession,
  type Session,
} from "./session";
import { createConnection } from "mysql2/promise";

const connection = await createConnection({
  host: process.env["HOST"],
  user: process.env["USER"],
  password: process.env["PASSWORD"],
  database: process.env["DATABASE"],
});

const app = new Hono<{
  Variables: {
    session?: Session;
  };
}>();

app.use("*", cors());
app.use("*", sessionMiddleware);

async function userExists(username: string, email: string) {
  const res = await sql<{
    username: string;
    password: string;
    email: string;
  }>("SELECT username, email FROM users WHERE (username = ? OR email = ?);", [
    username,
    email,
  ]);
  if (!res) return [true, "server error"];
  const user = res[0];
  if (!user) return [false];
  if (user.username == username) return [true, "username exists"];
  if (user.email == email) return [true, "email exists"];
  return [true, "server error"];
}

const registerSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
});

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

async function sql<T>(sql: string, values: any) {
  const res = await connection
    .query(sql, values)
    .catch((err) => console.log(err));
  if (!res) return;
  return res[0] as T[];
}

const route = app
  .post("register", zValidator("json", registerSchema), async (c) => {
    const session = c.get("session");
    if (session && session.get("username"))
      return c.json("already created an account");
    const { username, password, email } = c.req.valid("json");
    const [error, data] = await userExists(username, email);
    if (error) return c.json(data, 400);
    const hashedPassword = await Bun.password.hash(password);
    const res = await sql(
      "INSERT INTO users (username, password, email) VALUES (?, ?, ?);",
      [username, hashedPassword, email],
    );
    if (!res) return c.json("could not create user", 400);
    await createSession(c, { username });
    return c.json("created user successfully");
  })
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const session = c.get("session");
    if (session && session.get("username")) return c.json("already logged in");
    const { username, password } = c.req.valid("json");
    const res = await sql<{
      username: string;
      password: string;
    }>("SELECT username, password FROM users WHERE (username = ?);", [
      username,
    ]);
    if (!res) return c.json("server error", 400);
    const user = res[0];
    if (!user) return c.json("user does not exist");
    const isPassword = await Bun.password.verify(password, user.password);
    if (!isPassword) return c.json("wrong password");
    await createSession(c, { username });
    return c.json(isPassword);
  })
  .post("/logout", (c) => {
    const session = c.get("session");
    if (!session || !session.get("username")) return c.json("no session");
    deleteSession(c, session.id);
    return c.json("succesfully logged out");
  });

app.all("*", (c) => c.json("website not found", 404));

export type AppType = typeof route;
export default {
  port: process.env["PORT"],
  fetch: app.fetch,
};
