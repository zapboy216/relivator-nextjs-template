// pages/api/test-db-connection.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const client = await pool.connect();
    res
      .status(200)
      .json({ message: "Connected to the database successfully!" });
    client.release();
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to connect to the database",
        error: error.message,
      });
  }
}
