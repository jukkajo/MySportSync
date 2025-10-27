import { createEventController } from "../controllers/createEventController.js";
import { getEventsController } from "../controllers/getEventsController.js";
import { getSystemSportTypesController } from "../controllers/getSystemSportTypesController.js";

export default async function eventRoutes(fastify, options) {
  // To save sport event
  // Expects
  fastify.route({
    method: 'POST',
    url: '/save-event',
    handler: createEventController,
  });
  
  // To get limited amount of sport events
  // Expects param: limit (number)
  fastify.route({
    method: 'GET',
    url: '/get-events',
    handler: getEventsController,
  });
  
  // Get all available/allowed sport types
  fastify.route({
    method: "GET",
    url: "/get-sport-types",
    handler: getSystemSportTypesController,
  });

}

