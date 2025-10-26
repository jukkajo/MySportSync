import { getCurrentAndUpcomingEvents } from "../services/eventsService.js";

// Fetches live and upcoming events, ignores past ones
export async function getEventsController(request, reply) {
  const { limit = 15 } = request.query;
  try {
    const data = await getCurrentAndUpcomingEvents(limit);
    reply.status(200).send({ data });
  } catch (err) {
    request.log.error(err);
    reply.status(500).send({ error: "Events-fetch failed" });
  }
}

