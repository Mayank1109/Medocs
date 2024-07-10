const User_File = require("../models/fileModel");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "../uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// display all the docs
const show = (req, res, next) => {
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
};

//store the docs in database
const store = (req, res, next) => {
  try {
    let data = new User_File({
      file_name: req.body.file_data.file_name,
      lab: req.body.file_data.lab,
      date: req.body.file_data.date,
      doctor: req.body.file_data.doctor,
      file: req.body.file_data.file,
    });

    if (req.file) {
      employee.file = req.file.path;
    }

    console.log(data);
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
    res.json({
      message: "An error occured!",
    });
  }
};

module.exports = {
  store,
  show,
};
