const express = require("express");
const router = express.Router();
const User_File = require("../models/fileModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/", (req, res) => {
  try {
    User_File.find()
      .then((response) => {
        res.json({
          response,
        });
      })
      .catch((error) => {
        res.json({
          message: "An error Occured",
        });
      });
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    await User_File.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.send(err);
  }
});

router.post("/", upload.single("file"), (req, res) => {
  try {
    let data = new User_File({
      file_name: req.body.file_name,
      lab: req.body.lab,
      date: req.body.date,
      doctor: req.body.doctor,
      file: req.file.path,
    });

    data
      .save()
      .then((response) => {
        res.json({
          message: "File added successfully!",
          data: response,
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
