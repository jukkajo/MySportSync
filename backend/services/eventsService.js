import fastify from "../fastify.js";

export async function getCurrentAndUpcomingEvents(limit = 15) {
  const client = await fastify.pg.connect();
  try {
    // Fetch upcoming and live events
    const result = await client.query(
      `SELECT
        e.id AS event_id,
        s.name AS sport,
        ht.team_name AS home_team,
        ot.team_name AS opponent_team,
        e.event_start,
        e.event_start + e.planned_duration AS event_end,
        e.event_place,
        CASE
          WHEN e.event_start <= NOW() AND e.event_start + e.planned_duration > NOW() THEN 'live'
          WHEN e.event_start > NOW() THEN 'upcoming'
          ELSE 'past'
        END AS status
      FROM events e
      JOIN teams ht ON e.home_team_id = ht.id
      JOIN teams ot ON e.opponent_team_id = ot.id
      JOIN sports s ON ht.sport_id = s.id
      WHERE e.event_start + e.planned_duration > NOW()
      ORDER BY status DESC, e.event_start ASC
      LIMIT $1;`,
      [limit]
    );
    return result.rows;
  } catch (error) {
    throw new Error("Database query failed");
  } finally {
    client.release();
  }
}
