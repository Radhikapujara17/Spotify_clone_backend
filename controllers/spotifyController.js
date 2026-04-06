const endpoints = require('../config/endpoints');
const axios = require('axios');

// Example controller function: Get new releases
const getNewReleases = async (req, res) => {
  try {
    // 1. Get Access Token
    const tokenResponse = await axios.post(
      endpoints.SPOTIFY.TOKEN_URL,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // 2. Fetch New Releases
    const releasesResponse = await axios.get(endpoints.SPOTIFY.NEW_RELEASES, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // Send the albums data to the frontend
    res.json(releasesResponse.data.albums.items);
  } catch (error) {
    console.error("Error fetching Spotify data:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to fetch Spotify data" });
  }
};

module.exports = {
  getNewReleases
};
