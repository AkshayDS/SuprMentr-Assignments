const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// POST route for registering a new user
// Endpoint: /api/auth/register
router.post('/register', registerUser);

// POST route for logging in an existing user
// Endpoint: /api/auth/login
router.post('/login', loginUser);

module.exports = router;
