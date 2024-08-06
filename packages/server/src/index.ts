import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const app = new Hono();

const registerSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
});

app.post("/register", zValidator("json", registerSchema), (c) => {
  const data = c.req.valid("json");
  return c.json(data);
});

app.all("*", (c) => c.json("Website does not exist", 404));

export default app;
