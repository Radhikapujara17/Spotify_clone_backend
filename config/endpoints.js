// This file stores API endpoint URLs. You can update these later if needed.

module.exports = {
  SPOTIFY: {
    // Used to request access tokens
    TOKEN_URL: 'https://accounts.spotify.com/api/token',
    
    // Base URL for the Spotify Web API
    BASE_URL: 'https://api.spotify.com/v1',
    
    // Specific endpoints (add more here as needed)
    // NOTE: /browse/new-releases returns 403 Forbidden since the February 2026 API changes.
    // Using the search endpoint with tag:new is the official workaround.
    NEW_RELEASES: 'https://api.spotify.com/v1/search?q=tag:new&type=album&limit=20',
    FEATURED_PLAYLISTS: 'https://api.spotify.com/v1/browse/featured-playlists',
    CATEGORIES: 'https://api.spotify.com/v1/browse/categories'
  }
};
