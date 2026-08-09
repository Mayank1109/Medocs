const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const Profile = require("../models/profileModel");
const Document = require("../models/documentModel");
const DocumentAnalysis = require("../models/documentAnalysisModel");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../services/geminiService");

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

const AVATAR_MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_AVATAR_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const avatarUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: AVATAR_MAX_SIZE_BYTES, files: 1 },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_AVATAR_TYPES.has(file.mimetype)) {
      const error = new Error("Only JPEG, PNG, and WEBP images are allowed.");
      error.status = 400;
      return cb(error);
    }
    return cb(null, true);
  },
});

// GET /profile/me — fetch combined profile + real usage stats
router.get("/me", async (req, res) => {
  try {
    let profile = await Profile.findOne({ userId: req.user._id });

    if (!profile) {
      profile = await Profile.create({ userId: req.user._id });
    }

    const [documentCount, sizeAgg, aiAnalysesCount] = await Promise.all([
      Document.countDocuments({ ownerId: req.user._id }),
      Document.aggregate([
        { $match: { ownerId: req.user._id } },
        { $group: { _id: null, totalBytes: { $sum: "$fileSize" } } },
      ]),
      DocumentAnalysis.countDocuments({
        ownerId: req.user._id,
        status: "completed",
      }),
    ]);

    const storageUsedBytes = sizeAgg[0]?.totalBytes || 0;

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

        // usage stats (real)
        documentCount,
        storageUsedBytes,
        aiAnalysesCount,
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

// PATCH /profile/me/avatar — upload/replace avatar image
router.patch("/me/avatar", avatarUpload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        messageType: "Error",
        message: "Image file is required",
      });
    }

    const existingProfile = await Profile.findOne({ userId: req.user._id });

    const result = await uploadToCloudinary(req.file.buffer);

    // clean up the old avatar in Cloudinary, if one exists, so orphaned
    // images don't accumulate on every re-upload
    if (existingProfile?.avatarCloudinaryId) {
      await deleteFromCloudinary(existingProfile.avatarCloudinaryId);
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: req.user._id },
      {
        avatarUrl: result.secure_url,
        avatarCloudinaryId: result.public_id,
      },
      { new: true, upsert: true, runValidators: true },
    );

    return res.status(200).json({
      messageType: "Success",
      message: "Avatar updated successfully!",
      data: updatedProfile,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      messageType: "Error",
      message: "An error occurred while uploading the avatar",
    });
  }
});

module.exports = router;
