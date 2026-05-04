require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Import routes
const spotifyRoutes = require('./routes/spotifyRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Middleware
app.use(helmet());
app.use(limiter);
const FRONTEND_URI = process.env.FRONTEND_URI || 'http://localhost:5173';
app.use(cors({
  origin: FRONTEND_URI,
  credentials: true
}));
app.use(express.json());

// Mount the imported routes
app.use('/api/spotify', spotifyRoutes);
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);

// A simple root route
app.get('/', (req, res) => {
  res.send('Hello World! The Spotify Clone Backend is running.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
