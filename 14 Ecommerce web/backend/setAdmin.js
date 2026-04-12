import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const setAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOneAndUpdate(
      { email: '1jt22cs011@jyothyit.ac.in' },
      { isAdmin: true },
      { new: true }
    );
    console.log('User made Admin:', user);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

setAdmin();
