/* User model */
"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
});

// Save user into DB
UserSchema.pre("save", function (next) {
  const user = this;

  // Checks to ensure password is not hashed more than once
  if (user.isModified("password")) {
    // Generate salt and hash the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// Find a User document by comparing the hashed password to a given one
UserSchema.statics.findByUsernamePassword = function (username, password) {
  const User = this;

  // First find the user by their username
  return User.findOne({ username: username }).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    // If the user exists, make sure their password is correct
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = { User };
