const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');

// Define route for GET /api/spotify/new-releases
router.get('/new-releases', spotifyController.getNewReleases);

// Define route for GET /api/spotify/search
router.get('/search', spotifyController.searchSpotify);

module.exports = router;
