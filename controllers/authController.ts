import { Request, Response } from 'express';
import axios from 'axios';
import { CookieOptions } from 'express';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '';
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://127.0.0.1:5000/auth/callback';
const FRONTEND_URI = process.env.FRONTEND_URI || 'http://localhost:5173';

export const login = (req: Request, res: Response): void => {
  // Required scope to play songs and get user identity
  const scope = 'streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state playlist-read-private playlist-read-collaborative';

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URI,
  });
  res.redirect(`https://accounts.spotify.com/authorize?${params}`);
};

export const callback = async (req: Request, res: Response): Promise<void> => {
  const code = req.query.code as string || null;

  if (!code) {
    res.redirect(`${FRONTEND_URI}/?error=missing_code`);
    return;
  }

  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: new URLSearchParams({
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      }).toString(),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
      }
    });

    const { access_token, refresh_token, expires_in } = response.data;
    const expires_at = Date.now() + (expires_in * 1000);
    const cookieOpts: CookieOptions = { httpOnly: true, secure: true, sameSite: 'none' as const };

    res.cookie('access_token', access_token, cookieOpts);
    res.cookie('refresh_token', refresh_token, cookieOpts);
    res.cookie('expires_at', expires_at.toString(), cookieOpts);

    res.redirect(`${FRONTEND_URI}/`);
  } catch (error: any) {
    console.error('Error during token exchange:', error?.response?.data || error);
    res.redirect(`${FRONTEND_URI}/#error=invalid_token`);
  }
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  const refresh_token = req.cookies.refresh_token;
  if (!refresh_token) {
    res.status(401).json({ error: 'Refresh token is required' });
    return;
  }

  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }).toString(),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
      }
    });

    const { access_token, refresh_token: new_refresh_token, expires_in } = response.data;
    const expires_at = Date.now() + (expires_in * 1000);
    const cookieOpts: CookieOptions = { httpOnly: true, secure: true, sameSite: 'none' as const };

    res.cookie('access_token', access_token, cookieOpts);
    res.cookie('expires_at', expires_at.toString(), cookieOpts);
    if (new_refresh_token) {
      res.cookie('refresh_token', new_refresh_token, cookieOpts);
    }

    res.json({ access_token, expires_in });
  } catch (error: any) {
    console.error('Error during token refresh:', error?.response?.data || error);
    res.status(400).json({ error: 'failed_refresh' });
  }
}

export const getToken = (req: Request, res: Response): void => {
  const access_token = req.cookies.access_token;
  const expires_at = req.cookies.expires_at;
  res.json({ access_token: access_token || null, expires_at: expires_at || null });
};

export const logout = (req: Request, res: Response): void => {
  // IMPORTANT: clearCookie options must exactly match the options used when setting
  // the cookie (secure, sameSite, path). Otherwise browsers ignore the clear.
  const cookieOpts: CookieOptions = { httpOnly: true, secure: true, sameSite: 'none' as const };
  res.clearCookie('access_token', cookieOpts);
  res.clearCookie('refresh_token', cookieOpts);
  res.clearCookie('expires_at', cookieOpts);
  res.json({ success: true });
};
