const { Pool } = require("pg");
const { env } = require("./src/env.mjs");

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to the database successfully!");
    client.release();
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  } finally {
    await pool.end();
  }
};

testConnection();
