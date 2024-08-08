// import { getCookie, setCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { decrypt, encrypt, secret } from "./encryption";
import type { Context } from "hono";

import { Database } from "bun:sqlite";
import { getSignedCookie, setSignedCookie } from "hono/cookie";
const db = new Database("mydb.sqlite");
db.query("DROP TABLE  IF EXISTS sessions").run();
db.query(
  "CREATE TABLE sessions (id INTEGER PRIMARY KEY, token TEXT, data TEXT);",
).run();

export async function createSession(c: Context, data={}) {
  const token = crypto.randomUUID();
  const { lastInsertRowid: id } = db
    .query("INSERT INTO sessions (token, data) VALUES (?1, ?2);")
    .run(token, JSON.stringify(data));
  await saveCookie(c, id, token);
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

// async function deleteSession(id: number | bigint) {
//   db.query("DELETE FROM sessions WHERE WHERE id = ?1").run(id);
// }

async function saveCookie(c: Context, id: number | bigint, token: string) {
  const data = { id, token };
  const cookie = encrypt(data);
  await setSignedCookie(c, "session", cookie, secret, {
    // prefix: "host",
    httpOnly: true,
    // maxAge: 900,
    // expires: new Date(Date.now() + 900 * 1000),
    sameSite: "lax",
  });
}

export class Session {
  data: object;
  delete: boolean;

  constructor(data: object) {
    this.data = data;
    this.delete = false;
  }
  // setData(data: object) {
  //   this.cache.data = data;
  // }
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
  const session = new Session(data);
  c.set("session", session);

  await next();
  console.log(db.query("SELECT * FROM sessions").all());
  // if (session.delete) return deleteSession(id);
  updateData(session, id, token);
});

export default sessionMiddleware;
