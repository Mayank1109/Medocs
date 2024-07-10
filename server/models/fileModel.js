const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    file_name: {
      type: String,
      required: true,
    },
    lab: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return value.length <= 5 * 1024 * 1024;
        },
        message: "File size must be less than or equal to 5MB",
      },
    },
  },
  { timestamps: true }
);

const User_File = mongoose.model("User_File", fileSchema);

module.exports = User_File;
