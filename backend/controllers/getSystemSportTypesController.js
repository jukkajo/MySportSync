import { getSystemSportTypes } from "../services/sportsService.js";

// Function to fetch allowed sports of app
export async function getSystemSportTypesController(request, reply) {
  try {
    const rows = await getSystemSportTypes();
    reply.status(200).send({ data: rows });
  } catch (err) {
    request.log.error(err);
    reply.status(500).send({ error: "Sport-types fetch failed" });
  }
}
