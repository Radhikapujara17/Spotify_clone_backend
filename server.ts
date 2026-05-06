import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';

// Import routes
import spotifyRoutes from './routes/spotifyRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
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
app.use(cookieParser());

// Mount the imported routes
app.use('/api/spotify', spotifyRoutes);
app.use('/auth', authRoutes);

// A simple root route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! The Spotify Clone Backend is running.');
});

// Start the server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
