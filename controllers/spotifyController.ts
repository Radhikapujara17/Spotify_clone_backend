import { Request, Response } from 'express';
import endpoints from '../config/endpoints';
import axios from 'axios';

// Example controller function: Get new releases
export const getNewReleases = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: "Missing Authorization header" });
      return;
    }

    const accessToken = authHeader.split(' ')[1];

    // Support dynamic pagination
    const offset = parseInt(req.query.offset as string) || 0;
    const limit = parseInt(req.query.limit as string) || 20;

    // Fetch User's Liked Songs
    const releasesResponse = await axios.get(endpoints.SPOTIFY.NEW_RELEASES, {
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
    const formattedTracks = playlistData.items?.map((item: any) => {
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
  } catch (error: any) {
    console.error("Error fetching Spotify data:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to fetch Spotify data" });
  }
};

export const searchSpotify = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: "Missing Authorization header" });
      return;
    }

    const accessToken = authHeader.split(' ')[1];

    const query = req.query.q as string;
    if (!query) {
      res.status(400).json({ error: "Search query 'q' is required" });
      return;
    }

    const limit = Math.min(parseInt(req.query.limit as string) || 10, 10);
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

    const formattedTracks = searchData.tracks?.items?.map((track: any) => {
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
  } catch (error: any) {
    console.error("Error searching Spotify:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to perform search", details: error.response ? error.response.data : error.message });
  }
};
