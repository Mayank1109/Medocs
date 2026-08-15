const Profile = require("../models/profileModel");
const Document = require("../models/documentModel");
const DocumentAnalysis = require("../models/documentAnalysisModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const RefreshToken = require("../models/refreshTokenModel");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../services/geminiService");

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
  "notificationPreferences",
];

async function getMyProfile(req, res) {
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
        userName: req.user.userName,
        email: req.user.email,
        role: req.user.role,
        memberSince: req.user.createdAt,
        lastLogin: req.user.lastLogin,
        authProviders: req.user.authProviders,
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
        notificationPreferences: profile.notificationPreferences,
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
}

async function updateMyProfile(req, res) {
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
}

async function uploadAvatar(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        messageType: "Error",
        message: "Image file is required",
      });
    }

    const existingProfile = await Profile.findOne({ userId: req.user._id });
    const result = await uploadToCloudinary(req.file.buffer);

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
}

async function exportProfileData(req, res) {
  try {
    const [profile, documents, analyses, notifications] = await Promise.all([
      Profile.findOne({ userId: req.user._id }),
      Document.find({ ownerId: req.user._id }).select(
        "fileName fileType category fileSize documentDate storagePath createdAt",
      ),
      DocumentAnalysis.find({
        ownerId: req.user._id,
        status: "completed",
      }).select("documentId summary createdAt"),
      Notification.find({ ownerId: req.user._id }).select(
        "type title message read createdAt",
      ),
    ]);

    const exportData = {
      exportedAt: new Date().toISOString(),
      account: {
        userName: req.user.userName,
        email: req.user.email,
        role: req.user.role,
        memberSince: req.user.createdAt,
      },
      profile: profile || null,
      documents,
      aiAnalyses: analyses,
      notifications,
    };

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=medocs-data-export.json",
    );
    res.setHeader("Content-Type", "application/json");
    return res.status(200).send(JSON.stringify(exportData, null, 2));
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      messageType: "Error",
      message: "Failed to export data",
    });
  }
}

async function deleteAccount(req, res) {
  try {
    const userId = req.user._id;
    const documents = await Document.find({ ownerId: userId });

    await Promise.allSettled(
      documents.map((doc) => deleteFromCloudinary(doc.cloudinaryId)),
    );

    const profile = await Profile.findOne({ userId });
    if (profile?.avatarCloudinaryId) {
      await deleteFromCloudinary(profile.avatarCloudinaryId).catch(() => {});
    }

    await Promise.all([
      Document.deleteMany({ ownerId: userId }),
      DocumentAnalysis.deleteMany({ ownerId: userId }),
      Notification.deleteMany({ ownerId: userId }),
      Profile.deleteOne({ userId }),
      RefreshToken.deleteMany({ userId }),
    ]);

    await User.findByIdAndDelete(userId);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/auth/refresh",
    });

    return res.status(200).json({
      messageType: "Success",
      message: "Account deleted successfully.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      messageType: "Error",
      message: "Failed to delete account. Please try again.",
    });
  }
}

module.exports = {
  getMyProfile,
  updateMyProfile,
  uploadAvatar,
  exportProfileData,
  deleteAccount,
};
