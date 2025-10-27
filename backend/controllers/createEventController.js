import { saveEvent } from "../services/eventsService.js";

export async function createEventController(request, reply) {
  try {
    const { sport, homeTeamId, opponentTeamId, date, time, venue, description, plannedDuration } = request.body;

    // Very basic validation
    if (!sport || !homeTeamId || !opponentTeamId || !date || !time || !venue || !description || !plannedDuration) {
      return reply.status(400).send({ error: "Missing required fields." });
    }

    // Combine date and time into postgresql timestamp (Postgressql handles timezone)
    const event_start = new Date(`${date}T${time}`);

    // Converting plannedDuration (minutes) into sql interval format
    const durationInterval = `${plannedDuration} minutes`;

    // Prepare event payload
    const eventData = {
      sport,
      homeTeamId,
      opponentTeamId,
      event_start,
      event_place: venue,
      planned_duration: durationInterval,
      description,
    };

    // Save event
    const result = await saveEvent(eventData);

    // Success
    reply.status(200).send({ message: "Event saved successfully.", data: result });
  } catch (err) {
    request.log.error(err);
    reply.status(500).send({ error: "Event creation failed" });
  }
}
