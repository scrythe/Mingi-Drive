// import { getCookie, setCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { encrypt, secret } from "./session";
import type { Context } from "hono";

import { Database } from "bun:sqlite";
import { getSignedCookie, setSignedCookie } from "hono/cookie";

const db = new Database("mydb.sqlite");
db.query(
  // "DROP TABLE sessions"
  "CREATE TABLE IF NOT EXISTS sessions (id INTEGER PRIMARY KEY, token TEXT, data TEXT);",
).run();

async function createSession(c: Context) {
  const token = crypto.randomUUID();
  const changes = db
    .query("INSERT INTO sessions (token, data) VALUES (?1, ?2);")
    .run(token, "");
  const data = { id: changes.lastInsertRowid, token };
  const cookie = encrypt(data);
  await setSignedCookie(c, "session", cookie, secret, {
    prefix: "host",
    httpOnly: true,
    // maxAge: 900,
    // expires: new Date(Date.now() + 900 * 1000),
    sameSite: "lax",
  });
}

const middleware = createMiddleware(async (c, next) => {
  await createSession(c);
  const sessions = db.query("SELECT id, token, data FROM sessions;").all();
  // const sid = getSession(c);
  return c.json(sessions);
  // next()
});

export default middleware;
