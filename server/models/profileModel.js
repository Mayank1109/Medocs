const mongoose = require("mongoose");

const MedicalProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    bloodGroup: String,
    allergies: [String],
    chronicConditions: [String],
    currentMedications: [String],
    pastSurgeries: [String],
    emergencyContact: {
      name: String,
      phone: String,
      relation: String,
    },
    notesForDoctor: String,
  },
  { timestamps: true },
);

const Profile = mongoose.model("MedicalProfile", MedicalProfileSchema);

module.exports = Profile;
