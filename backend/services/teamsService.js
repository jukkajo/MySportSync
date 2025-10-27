import fastify from "../fastify.js";

// Fetch teams, supports optional filtering by name
export async function getTeams(search = "") {
  const client = await fastify.pg.connect();
  try {
    const query = `
      SELECT 
        t.id, 
        t.team_name, 
        s.name AS sport_name
      FROM teams t
      LEFT JOIN sports s ON t.sport_id = s.id
      WHERE t.team_name ILIKE $1
      ORDER BY t.team_name ASC
      LIMIT 50;
    `;
    const { rows } = await client.query(query, [`%${search}%`]);
    return rows;
  } catch (err) {
    throw new Error("Database query failed.");
  } finally {
    client.release();
  }
}

