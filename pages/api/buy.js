import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { city, email, quantity } = req.body;

  try {
    const check = await pool.query('SELECT total_available FROM ticket_inventory WHERE city = $1', [city]);
    const available = check.rows[0]?.total_available || 0;

    if (available < quantity) {
      return res.status(400).json({ error: 'Not enough tickets available' });
    }

    await pool.query(
      'INSERT INTO tickets (city, email, quantity) VALUES ($1, $2, $3)',
      [city, email, quantity]
    );

    await pool.query(
      'UPDATE ticket_inventory SET total_available = total_available - $1 WHERE city = $2',
      [quantity, city]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
