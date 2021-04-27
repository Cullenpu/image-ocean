const express = require("express");
const cors = require("cors");
const session = require("express-session");

const { mongoose } = require("./db/mongoose");
const { User } = require("./models/user");
const { Image } = require("./models/image");

mongoose.set("useFindAndModify", false);

const app = express();
app.use(express.json());

const env = process.env.NODE_ENV;
if (env !== "production") {
  app.use(cors());
}

// Create a session and session cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET || "SESSION_SECRET", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
    // Store the sessions on the database in production
    store:
      env === "production"
        ? MongoStore.create({
            mongoUrl:
              process.env.MONGODB_URI || "mongodb://localhost:27017/StudentAPI",
          })
        : null,
  })
);

function isMongoError(error) {
  // Checks if Mongo database suddenly disconnects
  return (
    typeof error === "object" &&
    error !== null &&
    error.name === "MongoNetworkError"
  );
}

// Create a new user
app.post("/users", async (req, res) => {
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
app.post("/users/login", async (req, res) => {
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
app.get("/users/logout", (req, res) => {
  // Remove the session
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send();
    }
  });
});

// Get all public images
app.get("/images", async (req, res) => {
  try {
    const images = await Image.find({ private: false });
    res.send(images);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

app.get("/images/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (req.session.user === id) {
      // User is fetching their own photos
      // Get all of user's own images including private ones
      const images = await Image.find({ _id: id });
      res.send(images);
    } else {
      // Get only the public images of this user
      const images = await Image.find({ _id: id, private: false });
      res.send(images);
    }
  } catch (err) {
    if (isMongoError(err)) {
      res.status(500).send("Internal server error");
    } else {
      console.log(err);
      res.status(404).send("User not found");
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
