import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyPostgres from "@fastify/postgres";
import dotenv from "dotenv";

dotenv.config();

const fastify = Fastify({ logger: true });

// Register plugins once
await fastify.register(fastifyCors, { origin: true });
await fastify.register(fastifyPostgres, {
  connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
});

export default fastify;

