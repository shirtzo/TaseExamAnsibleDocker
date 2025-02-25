const express = require('express');
const { Pool } = require('pg');
const app = express();

let visitCount = 0;

const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'postgres',
  password: 'mysecretpassword',
  port: 5432,
});

const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS visits (
      id SERIAL PRIMARY KEY,
      count INT DEFAULT 0
    );
  `;
  await pool.query(query);
  console.log("Table 'visits' is ready.");
};

const updateVisits = async () => {
  const result = await pool.query('SELECT count FROM visits WHERE id = 1');
  if (result.rows.length === 0) {
    await pool.query('INSERT INTO visits (count) VALUES (1)');
  } else {
    const newCount = result.rows[0].count + 1;
    await pool.query('UPDATE visits SET count = $1 WHERE id = 1', [newCount]);
  }
};

app.post('/update-visits', async (req, res) => {
  try {
    console.log("Received a visit update request!");

    await updateVisits();
    console.log("Visit count updated successfully.");

    res.status(200).send('Visit count updated');
  } catch (err) {
    console.error("Error updating visit count:", err);
    res.status(500).send("Error updating visit count.");
  }
});

app.listen(8081, () => {
  console.log('Counter service is listening on port 8081');
});
