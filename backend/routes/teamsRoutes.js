import { getTeamsController } from "../controllers/getTeamsController.js";

export default async function teamRoutes(fastify, options) {
  // Get teams: supports search query
  fastify.route({
    method: "GET",
    url: "/get-teams",
    handler: getTeamsController,
  });
}

