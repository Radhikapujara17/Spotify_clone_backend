import { Router } from 'express';
import { login, callback, refresh, getToken, logout } from '../controllers/authController';

const router = Router();

router.get('/login', login);
router.get('/callback', callback);
router.post('/refresh', refresh);
router.get('/token', getToken);
router.post('/logout', logout);

export default router;
