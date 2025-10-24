import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyPostgres from '@fastify/postgres';
import dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify({ logger: true });

// CORS for frontend requests
await fastify.register(fastifyCors, { origin: true });

// PostgreSQL plugin
await fastify.register(fastifyPostgres, {
  connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
});

// Root
fastify.get('/', async (req, reply) => {
  return { message: 'Hello & Welcome to MySportSync API ' };
});

// Routes
import eventsRoutes from './routes/eventRoutes.js';
fastify.register(eventsRoutes, { prefix: '/api/events' });

// Starting server
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT, host: '0.0.0.0' });
    console.log(`Server running in: http://localhost:${process.env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

