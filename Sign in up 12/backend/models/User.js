const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Ensures no duplicate emails can be created
    lowercase: true, // Converts the email to lowercase before saving
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
}, { timestamps: true });

// Pre-save hook to hash the password before saving it to the database
// This function runs automatically every time we call user.save()
userSchema.pre('save', async function () {
  // If the password hasn't been modified (e.g., during a profile update), don't re-hash it
  if (!this.isModified('password')) return;

  // Generate a salt with a cost factor of 10
  // The salt adds random data to the hash, preventing dictionary and rainbow table attacks
  const salt = await bcrypt.genSalt(10);
  
  // Hash the plain-text password with the generated salt
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare candidate password with the user's hashed password (useful for login later)
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
