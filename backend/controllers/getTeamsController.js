import { getTeams } from "../services/teamsService.js";

// Fetches teams, optionally filtered by team name
export async function getTeamsController(request, reply) {
  const { search = "" } = request.query;

  try {
    const rows = await getTeams(search);
    reply.status(200).send({ data: rows });
  } catch (err) {
    request.log.error(err);
    reply.status(500).send({ error: "Teams fetch failed" });
  }
}

