const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { Image } = require("../models/image");
const { isMongoError } = require("./utils");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ dest: "uploads/" });

// Get all public images
router.get("/", async (req, res) => {
  try {
    const images = await Image.find({ private: false });
    res.send(images);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

// Upload a single image
router.post("/", upload.single("image"), async (req, res) => {
  const image = {
    user: req.session.user,
    caption: req.body.caption,
    private: req.body.private,
    width: req.body.width,
    height: req.body.height,
    img: {
      data: fs.readFileSync(
        path.join(__dirname, "..", "uploads", req.file.filename)
      ),
      contentType: req.file.mimetype,
    },
  };
  Image.create(image, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send();
    }
  });
});

// Get all images of specified user
router.get("/:id", async (req, res) => {
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

module.exports = router;
