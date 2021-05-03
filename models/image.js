const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  user: mongoose.Schema.ObjectId, // The user who uploaded this image
  caption: String,
  private: Boolean,
  width: Number,
  height: Number,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Image = mongoose.model("Image", ImageSchema);
module.exports = { Image };
