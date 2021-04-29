const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");
const users = require("./routes/users");
const images = require("./routes/images");

mongoose.set("useFindAndModify", false);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.use("/users", users);
app.use("/images", images);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
