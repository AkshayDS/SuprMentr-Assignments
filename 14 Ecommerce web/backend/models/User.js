// ============================================================
// models/User.js — User Schema
// ============================================================
// Defines the User model for MongoDB with the following fields:
//   - name, email (unique), password, address, phone
//
// SECURITY:
//   - The pre('save') hook automatically hashes the password
//     using bcryptjs before storing it in the database.
//   - The matchPassword() method compares a plain-text password
//     against the stored hash for login verification.
// ============================================================

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    address: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// ---- PRE-SAVE HOOK: Hash password before saving ----
// This runs every time .save() is called on a User document.
// We only hash if the password field has been modified (not on
// every profile update).
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ---- INSTANCE METHOD: Compare passwords on login ----
// Takes the plain-text password entered by the user and
// compares it to the hashed password stored in MongoDB.
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
