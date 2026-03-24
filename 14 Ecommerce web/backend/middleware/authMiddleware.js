// ============================================================
// middleware/authMiddleware.js — JWT Verification
// ============================================================
// This middleware protects routes that require authentication.
//
// HOW IT WORKS:
// 1. The React frontend sends the JWT in the HTTP header:
//       Authorization: Bearer <token>
// 2. This middleware extracts the token from the header.
// 3. It verifies the token using jsonwebtoken and the same
//    JWT_SECRET used to sign it.
// 4. If valid, it attaches the user data to `req.user`
//    (excluding the password) so the route handler can use it.
// 5. If invalid or missing, it returns a 401 Unauthorized.
// ============================================================

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token;

  // Check for token in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token: "Bearer eyJhbGciOi..." → "eyJhbGciOi..."
      token = req.headers.authorization.split(' ')[1];

      // Verify the token with our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user data to the request (minus password)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Token is valid — proceed to the protected route
    } catch (error) {
      console.error('JWT verification failed:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

export default protect;
