const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  user: Schema.Types.ObjectId, // The user who uploaded this image
  desc: String,
  private: Boolean,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Image = mongoose.model("Image", ImageSchema);
module.exports = { Image };
