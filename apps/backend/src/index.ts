import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
// import { Server, IncomingMessage, ServerResponse } from "http";

let port = (process.env.PORT || 3000) as number;
const enviroment = process.env.enviroment || "development";

const envToLogger = {
  production: true,
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
};

const fastify = Fastify({
  logger: envToLogger[enviroment as "production" | "development"] || true,
});

fastify.get("/", () => {
  return { message: "Hello World!" };
});

const start = async () => {
  try {
    fastify.listen({ port });
    // const address = server.server.address();
    // const port = typeof address === "string" ? address : address?.port;
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
