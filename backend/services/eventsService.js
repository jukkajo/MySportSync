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
        e.description,
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

// Save new sport event into database
export async function saveEvent({
  sport,
  homeTeamId,
  opponentTeamId,
  event_start,
  event_place,
  planned_duration,
  description,
}) {
  const client = await fastify.pg.connect();
  try {
    const query = `
      INSERT INTO events (
        home_team_id,
        opponent_team_id,
        event_start,
        planned_duration,
        event_place,
        event_timezone,
        description,
        created_at,
        updated_at
      )
      VALUES ($1, $2, $3, $4, $5, 'Europe/Vienna', $6, NOW(), NOW())
      RETURNING id, home_team_id, opponent_team_id, event_start, planned_duration, event_place,
      (SELECT team_name FROM teams WHERE id = $1) AS home_team_name,
      (SELECT team_name FROM teams WHERE id = $2) AS opponent_team_name,
      $6 AS desc,
      $7 AS sport,
      event_start + planned_duration AS event_end;
    `;

    const values = [
      homeTeamId,
      opponentTeamId,
      event_start,
      planned_duration,
      event_place,
      description,
      sport // To be injected in return object
    ];

    const { rows } = await client.query(query, values);
    return rows[0];
  } catch (err) {
    console.error("Error saving event:", err);
    throw new Error("Database insert failed.");
  } finally {
    client.release();
  }
}
