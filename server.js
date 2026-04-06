require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import routes
const spotifyRoutes = require('./routes/spotifyRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mount the imported routes
app.use('/api/spotify', spotifyRoutes);
app.use('/api/users', userRoutes);

// A simple root route
app.get('/', (req, res) => {
  res.send('Hello World! The Spotify Clone Backend is running.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
