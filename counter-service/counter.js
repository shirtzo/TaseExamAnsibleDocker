const { Pool } = require('pg');
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME || 'postgres',
  port: process.env.DB_PORT || '5432',
});


pool.query(`
    CREATE TABLE IF NOT EXISTS counter (
      id SERIAL PRIMARY KEY,
      count INTEGER DEFAULT 0
    );
  `, (err, res) => {
    if (err) {
      console.error('Error creating table', err.stack);
    } else {
      console.log('Table is ready');
    }
  });

  app.post('/increment', async (req, res) => {
    try {
      const result = await pool.query('SELECT count FROM counter WHERE id = 1');
      let count = result.rows[0] ? result.rows[0].count : 0;
  
      count++;
  
      await pool.query('INSERT INTO counter (count) VALUES ($1) ON CONFLICT (id) DO UPDATE SET count = $1', [count]);
  
      res.status(200).send(`Counter updated: ${count}`);
    } catch (err) {
      console.error('Error updating counter', err.stack);
      res.status(500).send('Error updating counter');
    }
  });
  
  app.listen(port, () => {
    console.log(`Counter service is running on http://localhost:${port}`);
  });