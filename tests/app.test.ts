import request from 'supertest';
import app from '../server';

describe('Server Basics', () => {
  it('should return a 200 OK from the root endpoint', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('The Spotify Clone Backend is running');
  });
});
