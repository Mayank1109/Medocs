const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    // personal
    avatarUrl: String,
    avatarCloudinaryId: String,
    phone: String,
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer_not_to_say"],
    },
    height: Number, // cm
    weight: Number, // kg
    occupation: String,
    location: String,

    // medical
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    allergies: [String],
    chronicConditions: [String],
    currentMedications: [String],
    pastSurgeries: [String],
    emergencyContact: {
      name: String,
      phone: String,
      relation: String,
    },
    notesForDoctor: { type: String, maxlength: 1000 },
  },
  { timestamps: true },
);

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
