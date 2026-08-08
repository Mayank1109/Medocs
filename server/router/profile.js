const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");

router.use(authMiddleware);

const ALLOWED_GENDERS = new Set([
  "male",
  "female",
  "other",
  "prefer_not_to_say",
]);
const ALLOWED_BLOOD_GROUPS = new Set([
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
]);

const UPDATABLE_FIELDS = [
  "avatarUrl",
  "phone",
  "dateOfBirth",
  "gender",
  "height",
  "weight",
  "occupation",
  "location",
  "bloodGroup",
  "allergies",
  "chronicConditions",
  "currentMedications",
  "pastSurgeries",
  "emergencyContact",
  "notesForDoctor",
];

// GET /profile/me — fetch combined profile, create Profile row on first access
router.get("/me", async (req, res) => {
  try {
    let profile = await Profile.findOne({ userId: req.user._id });

    if (!profile) {
      profile = await Profile.create({ userId: req.user._id });
    }

    return res.status(200).json({
      messageType: "Success",
      message: "Profile fetched successfully!",
      data: {
        // from User
        userName: req.user.userName,
        email: req.user.email,
        role: req.user.role,
        memberSince: req.user.createdAt,
        lastLogin: req.user.lastLogin,
        authProviders: req.user.authProviders,

        // from Profile
        avatarUrl: profile.avatarUrl,
        phone: profile.phone,
        dateOfBirth: profile.dateOfBirth,
        gender: profile.gender,
        height: profile.height,
        weight: profile.weight,
        occupation: profile.occupation,
        location: profile.location,
        bloodGroup: profile.bloodGroup,
        allergies: profile.allergies,
        chronicConditions: profile.chronicConditions,
        currentMedications: profile.currentMedications,
        pastSurgeries: profile.pastSurgeries,
        emergencyContact: profile.emergencyContact,
        notesForDoctor: profile.notesForDoctor,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      messageType: "Error",
      message: "Failed to fetch profile",
    });
  }
});

// PUT /profile/me — partial update
router.put("/me", async (req, res) => {
  try {
    const { gender, bloodGroup } = req.body;

    if (
      gender !== undefined &&
      gender !== null &&
      !ALLOWED_GENDERS.has(gender)
    ) {
      return res.status(400).json({
        messageType: "Error",
        message: "Invalid gender value",
      });
    }

    if (
      bloodGroup !== undefined &&
      bloodGroup !== null &&
      !ALLOWED_BLOOD_GROUPS.has(bloodGroup)
    ) {
      return res.status(400).json({
        messageType: "Error",
        message: "Invalid blood group value",
      });
    }

    const updateData = {};
    for (const field of UPDATABLE_FIELDS) {
      if (req.body[field] !== undefined) {
        updateData[field] =
          field === "dateOfBirth" ? new Date(req.body[field]) : req.body[field];
      }
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: req.user._id },
      updateData,
      { new: true, upsert: true, runValidators: true },
    );

    return res.status(200).json({
      messageType: "Success",
      message: "Profile updated successfully!",
      data: updatedProfile,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      messageType: "Error",
      message: "An error occurred while updating the profile",
    });
  }
});

module.exports = router;
