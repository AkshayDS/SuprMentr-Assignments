// ============================================================
// server.js — Express Server Entry Point
// ============================================================
// Main server file that:
// 1. Loads environment variables from .env
// 2. Connects to MongoDB via config/db.js
// 3. Mounts API routes for products and users
// ============================================================

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';
import userRoutes from './routes/userRoutes.js';

// Load environment variables BEFORE anything else
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 18451;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// ---- ROUTES ----

// Mount user auth routes at /api/users
app.use('/api/users', userRoutes);

// @route   GET /api/products
// @desc    Get products with optional filtering
// @access  Public
app.get('/api/products', async (req, res) => {
  try {
    const { category, maxPrice, search } = req.query;
    
    // Build query object based on filter parameters
    let query = {};
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (maxPrice) {
      query.price = { $lte: Number(maxPrice) };
    }
    
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    }
    
    console.log('Fetching products with query:', query);
    const products = await Product.find(query).sort({ createdAt: -1 });
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Basic check route
app.get('/', (req, res) => {
  res.send('Ecommerce API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
