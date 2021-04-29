const express = require("express");
const router = express.Router();

const { User } = require("../models/User");
const { isMongoError } = require("./utils");

// Create a new user
app.post("/", async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  try {
    // Save user
    const newUser = await user.save();
    res.send(newUser);
  } catch (err) {
    if (isMongoError(err)) {
      res.status(500).send("Internal server error");
    } else {
      console.log(err);
      res.status(400).send("Bad Request");
    }
  }
});

// User login
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findByUsernamePassword(username, password);
    req.session.user = _id;
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send();
  }
});

// User logout
app.get("/logout", (req, res) => {
  // Remove the session
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send();
    }
  });
});

module.exports = router;
