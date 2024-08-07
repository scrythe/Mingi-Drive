// import { getCookie, setCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { decrypt, encrypt, secret } from "./session";
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
    // prefix: "host",
    httpOnly: true,
    // maxAge: 900,
    // expires: new Date(Date.now() + 900 * 1000),
    sameSite: "lax",
  });
}

async function getSession(c: Context) {
  const cookie = await getSignedCookie(c, secret, "session");
  // const cookie = await getSignedCookie(c, secret, "session", "host");
  if (!cookie) return false;
  const { id, token } = decrypt(cookie);
  const sessionData = db
    .query<
      {
        data: string;
      },
      [number | bigint, string]
    >("SELECT data FROM sessions WHERE id = ?1 AND token = ?2;")
    .get(id, token);
  if (!sessionData) return false;
  return sessionData.data;
}

const middleware = createMiddleware(async (c, next) => {
  const sessionData = await getSession(c);
  if (sessionData == false) {
    await createSession(c);
    return next();
  }
  return c.json("hmm");
  const sessions = db.query("SELECT id, token, data FROM sessions;").all();
  return c.json(sessionData);
  // next()
});

export default middleware;
