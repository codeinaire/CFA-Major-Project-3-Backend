const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// schema for the db
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter first name!',
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: 'Please enter email address!',
  },
  password: {
    type: String,
    required: 'Please enter a password!',
  },
  location: {
    type: String,
    trim: true,
    required: 'Please enter your city and state!',
  },
  motivation: {
    type: Number,
    required: 'Select a motivation to best personalise your experince.',
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

// This is where the entered password is tested with eth password in the database
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};


/**
 * The pre-save hook method.
 NOTE this is where the password is changed into a salted hashed to be stored in the database. This is for security reasons.
 */
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
