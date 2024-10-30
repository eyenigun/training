const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'yourUrootsername',
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

  // Run a SQL query
  const query = 'SELECT * FROM item';
  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    console.log('Results: ', results);

    // Close the connection
    connection.end((err) => {
      if (err) {
        console.error('Error ending the connection: ' + err.stack);
        return;
      }
      console.log('Connection ended');
    });
  });
});
