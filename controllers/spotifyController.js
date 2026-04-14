const endpoints = require('../config/endpoints');
const axios = require('axios');

// Example controller function: Get new releases
const getNewReleases = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Missing Authorization header" });
    }

    const accessToken = authHeader.split(' ')[1];

    // Support dynamic pagination
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 20;

    // Fetch User's Liked Songs
    const releasesResponse = await axios.get('https://api.spotify.com/v1/me/tracks', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        limit: limit,
        offset: offset
      }
    });

    // Send the tracks data to the frontend
    const playlistData = releasesResponse.data;

    // Map the playlist tracks so they have the same shape the frontend expects
    const formattedTracks = playlistData.items?.map(item => {
      const track = item.track;
      if (!track) return null;
      return {
        id: track.id,
        name: track.name,
        artists: track.artists,
        images: track.album?.images || [],
        type: 'track',
        uri: track.uri,
        preview_url: track.preview_url
      };
    }).filter(Boolean) || [];

    res.json({
      items: formattedTracks,
      hasMore: !!playlistData.next
    });
  } catch (error) {
    console.error("Error fetching Spotify data:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to fetch Spotify data" });
  }
};

const searchSpotify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Missing Authorization header" });
    }

    const accessToken = authHeader.split(' ')[1];

    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: "Search query 'q' is required" });
    }

    const limit = parseInt(req.query.limit) || 20;

    const searchResponse = await axios.get(endpoints.SPOTIFY.SEARCH, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        q: query,
        type: 'track',
        limit: limit
      }
    });

    const searchData = searchResponse.data;

    const formattedTracks = searchData.tracks?.items?.map(track => {
      if (!track) return null;
      return {
        id: track.id,
        name: track.name,
        artists: track.artists,
        images: track.album?.images || [],
        type: 'track',
        uri: track.uri,
        preview_url: track.preview_url
      };
    }).filter(Boolean) || [];

    res.json(formattedTracks);
  } catch (error) {
    console.error("Error searching Spotify:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to perform search" });
  }
};

module.exports = {
  getNewReleases,
  searchSpotify
};
