const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define route for GET /api/users/profile
router.get('/profile', userController.getUserProfile);

module.exports = router;
