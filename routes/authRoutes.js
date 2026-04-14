const express = require('express');
const router = express.Router();
const { login, callback, refresh } = require('../controllers/authController');

router.get('/login', login);
router.get('/callback', callback);
router.get('/refresh', refresh);

module.exports = router;
