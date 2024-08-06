import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
app.use('*', cors())

const registerSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
});

const route = app.post("/register", zValidator("json", registerSchema,), (c) => {
  const data = c.req.valid("json");
  return c.json(data);
});

app.post("/register", (c) => c.json("hm", 404));
app.all("*", (c) => c.json(c.req.json(), 404));

export type AppType = typeof route;
export default app;
