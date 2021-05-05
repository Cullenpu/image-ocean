const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const { mongoose } = require("./db/mongoose");
const MongoStore = require("connect-mongo");
const users = require("./routes/users");
const images = require("./routes/images");

mongoose.set("useFindAndModify", false);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const env = process.env.NODE_ENV;
if (env !== "production") {
  // Enable CORS if in development, for React local development server to connect to the web server
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
}

// Create a session and session cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET || "eZ3BeAQz3hs92R82ycky", // Make a SESSION_SECRET environment variable when deploying (for example, on heroku)
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

app.use("/users", users);
app.use("/images", images);

// Serve the build
app.use(express.static(path.join(__dirname, "/client/build")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app };
