import express from 'express';
import fetch from 'node-fetch';
import mysql from 'mysql2/promise';

const app = express();
const PORT = process.env.PORT || 3333;
const OMDB_API_KEY = 'aed50798'; // Replace with your OMDb API key

// Configure the MySQL connection
const dbConfig = {
    host: 'localhost',
    user: 'root',  // Replace with your MySQL username
    password: 'Qwer1234!',  // Replace with your MySQL password
    database: 'movie_db'
};

// Middleware to serve static files
app.use(express.static('public'));

app.get('/search', async (req, res) => {
    const movieName = req.query.movieName;

    // Fetch movie data from OMDb API
    const response = await fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${OMDB_API_KEY}`);
    const data = await response.json();

    if (data.Response === 'True') {
        try {
            // Connect to the MySQL database
            const connection = await mysql.createConnection(dbConfig);

            // Insert the movie data into the database
            const [rows, fields] = await connection.execute(
                'INSERT INTO movies (title, year, genre, director, actors, plot, imdb_rating, poster) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [data.Title, data.Year, data.Genre, data.Director, data.Actors, data.Plot, data.imdbRating, data.Poster]
            );

            // Close the database connection
            await connection.end();
        } catch (error) {
            console.error('Error saving movie data to the database:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Send the API response back to the client
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
