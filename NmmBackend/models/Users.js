const mongoose = require('mongoose');

const { Schema } = mongoose;

// schema for the db
const userSchema = new Schema({
  fullName: {
    type: String,
    trim: true,
    required: 'Please enter first name!',
  },
  emailAddress: {
    type: String,
    trim: true,
    unique: true,
    required: 'Please enter email address!',
  },

  location: {
    type: String,
    trim: true,
    required: 'Please enter your city and state!',
  },
  bio: {
    type: String,
  },
  personalQuote: {
    type: String,
    trim: true,
  },
  photo: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
