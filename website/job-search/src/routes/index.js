const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const router = express.Router();

// MySQL database connection configuration
const dbConfig = {
    host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'job_search_db'
};

// Serve the HTML file
router.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../../public') });
});

// Handle job request and save results
router.get('/search', async (req, res) => {
    const { reqName, company, position, k1, k2, k3, k4, k5 } = req.query;

    try {
        const connection = await mysql.createConnection(dbConfig);

        const [result] = await connection.execute(
            'INSERT INTO job_requests (Req_Name, Company, Position, K1, K2, K3, K4, K5) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [reqName, company, position, k1, k2, k3, k4, k5]
        );

        await connection.end();

        res.json({ message: 'Job request saved successfully' });
    } catch (error) {
        console.error('Error saving job request:', error);
        res.status(500).json({ error: 'An error occurred while saving the job request' });
    }
});

// Query job requests from the database
router.get('/results', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);

        const [results] = await connection.execute('SELECT * FROM job_requests');

        await connection.end();

        res.json(results);
    } catch (error) {
        console.error('Error fetching job requests:', error);
        res.status(500).json({ error: 'An error occurred while fetching job requests' });
    }
});

module.exports = router;
