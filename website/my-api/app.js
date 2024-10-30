const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Qwer1234!',
  database: 'sql_first'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route to handle the SQL query
app.get('/api/items', (req, res) => {
  const query = 'SELECT * FROM item';
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).send('Error running the query');
      throw error;
    }
    res.json(results); // Send the results as JSON
  });
});

// Define a route to add a new item
app.post('/api/items', (req, res) => {
  const newItem = req.body;
  const query = 'INSERT INTO item SET ?';
  connection.query(query, newItem, (error, results) => {
    if (error) {
      res.status(500).send('Error inserting the item');
      throw error;
    }
    res.status(201).send(`Item added with ID: ${results.insertId}`);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

