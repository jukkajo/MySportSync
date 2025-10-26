import fastify from "../fastify.js";

// Get allowed sports of platform
export async function getSystemSportTypes() {
  const client = await fastify.pg.connect();
  try {
    const { rows } = await client.query(`SELECT id, name FROM sports;`); 
    return rows;
  } catch (error) {
    throw new Error("Database query failed.");
  } finally {
    client.release();
  }
}
