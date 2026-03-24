// ============================================================
// routes/userRoutes.js — Auth & Profile API Routes
// ============================================================
// Handles all user-related endpoints:
//   POST /api/users/register   → Create new user, return JWT
//   POST /api/users/login      → Verify credentials, return JWT
//   GET  /api/users/profile    → Get logged-in user's data (protected)
//   PUT  /api/users/profile    → Update profile fields (protected)
//
// The JWT is generated with the user's MongoDB _id and expires
// in 30 days. The frontend stores this token in localStorage
// and sends it back in the Authorization header for protected
// routes.
// ============================================================

import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// ---- Helper: Generate JWT ----
// Signs a token containing the user's _id.
// The same JWT_SECRET is used to sign AND verify tokens.
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// ================================================================
// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
// ================================================================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create user (password is hashed automatically by the pre-save hook)
    const user = await User.create({ name, email, password });

    // Return user data + JWT
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// ================================================================
// @route   POST /api/users/login
// @desc    Authenticate user & return JWT
// @access  Public
// ================================================================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Verify password using the bcrypt matchPassword() method
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// ================================================================
// @route   GET /api/users/profile
// @desc    Get current user's profile data
// @access  Protected (requires valid JWT)
// ================================================================
router.get('/profile', protect, async (req, res) => {
  // req.user is set by the authMiddleware after verifying the JWT
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
});

// ================================================================
// @route   PUT /api/users/profile
// @desc    Update user's profile (name, address, phone)
// @access  Protected (requires valid JWT)
// ================================================================
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // Only update the fields that are sent in the request body
      user.name = req.body.name || user.name;
      user.address = req.body.address !== undefined ? req.body.address : user.address;
      user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;

      // If user wants to change password (optional)
      if (req.body.password) {
        user.password = req.body.password; // Will be hashed by pre-save hook
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        address: updatedUser.address,
        phone: updatedUser.phone,
        token: generateToken(updatedUser._id), // Return fresh token
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
});

export default router;
