// This file stores API endpoint URLs. You can update these later if needed.

module.exports = {
  SPOTIFY: {
    // Used to request access tokens
    TOKEN_URL: 'https://accounts.spotify.com/api/token',
    
    // Base URL for the Spotify Web API
    BASE_URL: 'https://api.spotify.com/v1',
    
    // Specific endpoints (add more here as needed)
    // NOTE: Hardcoded to a specific album API per user request
    NEW_RELEASES: 'https://api.spotify.com/v1/albums/4OYdTHNgjhXzgVjbqsb0tO',
    FEATURED_PLAYLISTS: 'https://api.spotify.com/v1/browse/featured-playlists',
    CATEGORIES: 'https://api.spotify.com/v1/browse/categories'
  }
};
