const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to generate a JWT token
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'fallback_super_secret_key';
  return jwt.sign({ id }, secret, {
    expiresIn: '30d',
  });
};

exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    const user = await User.create({
      fullName,
      email,
      password,
    });

    if (user) {
      const token = generateToken(user._id);
      return res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        token: token,
      });
    } else {
      return res.status(400).json({ message: 'Invalid user data provided' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};

// Login User Controller
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Verify password using the method created on User schema
    if (user && (await user.comparePassword(password))) {
      const token = generateToken(user._id);
      return res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        token: token,
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
};
