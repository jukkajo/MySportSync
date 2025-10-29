import fastify from "../fastify.js";

// Get allowed sports of platform
export async function getSystemSportTypesAndTeams() {
  const client = await fastify.pg.connect();
  try {
    const { rows } = await client.query(`SELECT s.id, s.name, t.team FROM sports s;`); 
    return rows;
  } catch (error) {
    throw new Error("Database query failed.");
  } finally {
    client.release();
  }
}
