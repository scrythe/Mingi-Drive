import { createMiddleware } from "hono/factory";
import { decrypt, encrypt, secret } from "./encryption";
import type { Context } from "hono";

import { Database } from "bun:sqlite";
import { deleteCookie, getSignedCookie, setSignedCookie } from "hono/cookie";
const db = new Database("mydb.sqlite");
db.query("DROP TABLE  IF EXISTS sessions").run();
db.query(
  "CREATE TABLE sessions (id INTEGER PRIMARY KEY, token TEXT, data TEXT);",
).run();

export async function createSession(c: Context, data = {}) {
  const token = crypto.randomUUID();
  const { lastInsertRowid: id } = db
    .query("INSERT INTO sessions (token, data) VALUES (?1, ?2);")
    .run(token, JSON.stringify(data));
  await saveCookie(c, id, token);
}

export async function deleteSession(c: Context, id: number | bigint) {
  db.query("DELETE FROM sessions WHERE (id = ?1);").run(id);
  deleteCookie(c, "session");
}

async function getSession(c: Context) {
  const cookie = await getSessionCookie(c);
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
  return { id, data: JSON.parse(sessionData.data) };
}

async function updateData(
  session: Session,
  id: number | bigint,
  token: string,
) {
  const dataJson = JSON.stringify(session.data);
  db.query("UPDATE sessions SET token = ?1, data = ?2 WHERE id = ?3").run(
    token,
    dataJson,
    id,
  );
}

// Branch Prediction
function setSessionCookieFunc() {
  if ((process.env.NODE_ENV = "production"))
    return (c: Context, cookie: string) => {
      return setSignedCookie(c, "session", cookie, secret, {
        prefix: "host",
        httpOnly: true,
        // maxAge: 900,
        // expires: new Date(Date.now() + 900 * 1000),
        sameSite: "none",
      });
    };
  return (c: Context, cookie: string) => {
    return setSignedCookie(c, "session", cookie, secret, {
      httpOnly: true,
      // maxAge: 900,
      // expires: new Date(Date.now() + 900 * 1000),
      sameSite: "lax",
    });
  };
}

function getSessionCookieFunc() {
  if ((process.env.NODE_ENV = "production"))
    return (c: Context) => {
      return getSignedCookie(c, secret, "session", "host");
    };
  return (c: Context) => {
    return getSignedCookie(c, secret, "session");
  };
}

const setSessionCookie = setSessionCookieFunc();
const getSessionCookie = getSessionCookieFunc();

async function saveCookie(c: Context, id: number | bigint, token: string) {
  const data = { id, token };
  const cookie = encrypt(data);
  await setSessionCookie(c, cookie);
}

export class Session {
  data: object;
  id: number | bigint;

  constructor(data: object, id: number | bigint) {
    this.data = data;
    this.id = id;
  }
  get(key: string): unknown {
    // @ts-ignore
    return this.data[key];
  }
  set(key: string, value: unknown) {
    // @ts-ignore
    this.data[key] = value;
  }
}

const sessionMiddleware = createMiddleware(async (c, next) => {
  const sessionRes = await getSession(c);
  if (sessionRes == false) return next();
  const { id, data } = sessionRes;
  const token = crypto.randomUUID();

  await saveCookie(c, id, token);
  const session = new Session(data, id);
  c.set("session", session);

  await next();
  updateData(session, id, token);
});

export default sessionMiddleware;
