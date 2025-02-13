const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isSuper: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Admin', adminSchema);