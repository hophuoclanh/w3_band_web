import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  const { city } = req.query;

  if (!city) return res.status(400).json({ error: 'Missing city parameter' });

  try {
    const result = await pool.query(
      'SELECT total_available FROM ticket_inventory WHERE city = $1',
      [decodeURIComponent(city)]
    );
    res.json(result.rows[0] || { total_available: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}
