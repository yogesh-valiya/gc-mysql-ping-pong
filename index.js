const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8080;

// Load environment variables from env.json
const envConfig = JSON.parse(fs.readFileSync('env.json', 'utf8'));
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

// Example MySQL query endpoint
app.get('/test', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ solution: results[0].solution });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  connection.end();
  process.exit(0);
});