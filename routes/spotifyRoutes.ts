import { Router } from 'express';
import * as spotifyController from '../controllers/spotifyController';

const router = Router();

// Define route for GET /api/spotify/new-releases
router.get('/new-releases', spotifyController.getNewReleases);

// Define route for GET /api/spotify/search
router.get('/search', spotifyController.searchSpotify);

export default router;
