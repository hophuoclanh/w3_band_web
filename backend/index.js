const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get('/available/:city', async (req, res) => {
  const city = decodeURIComponent(req.params.city);
  try {
    const result = await pool.query(
      'SELECT total_available FROM ticket_inventory WHERE city = $1',
      [city]
    );
    res.json(result.rows[0] || { total_available: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/buy-ticket', async (req, res) => {
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
});

// ✅ KEEP THIS AT THE VERY END!
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});