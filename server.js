const express = require("express");
const cors = require("cors");

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
