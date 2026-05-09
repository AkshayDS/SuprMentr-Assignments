// ============================================================
// config/db.js — Database Connection
// ============================================================
// Centralized MongoDB connection using Mongoose.
// Reads the connection string from the MONGO_URI env variable
// set in .env. Called once from server.js on startup.
// ============================================================

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // Timeout after 10s
      family: 4,                       // Force IPv4 — fixes DNS SRV issues on Render
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit process on failure
  }
};

export default connectDB;
