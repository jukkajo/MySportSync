import fastify from "./fastify.js";
import dotenv from 'dotenv';

dotenv.config();

// Root
fastify.get('/', async (req, reply) => {
  return { message: 'Hello & Welcome to MySportSync API ' };
});

// Routes
import eventsRoutes from './routes/eventRoutes.js';
fastify.register(eventsRoutes, { prefix: '/api/events' });

import teamRoutes from './routes/teamsRoutes.js';
fastify.register(teamRoutes, { prefix: '/api/teams' });

// Starting server
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 4000, host: '0.0.0.0' });
    console.log(`Server running in: http://localhost:${process.env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

