const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// MySQL database connection configuration
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

// Serve static files from the public directory
app.use(express.static('public'));

// Handle job search by position, K1, and G1
app.get('/search', async (req, res) => {
    const { position, k1, g1 } = req.query;

    try {
        const connection = await mysql.createConnection(dbConfig);

        // Query to match Position, K1 exactly and G1 >=
        const [results] = await connection.execute(
            'SELECT Req_Name, Company, Position, K1, G1 FROM job_requests WHERE Position = ? AND K1 = ? AND G1 <= ?',
            [position, k1, g1]
        );

        await connection.end();

        res.json(results);
    } catch (error) {
        console.error('Error fetching job requests:', error);
        res.status(500).json({ error: 'An error occurred while fetching job requests' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
