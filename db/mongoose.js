const mongoose = require("mongoose");

/* Connnect to the database */
const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/imageAPI";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = { mongoose }; // Export the active connection.
