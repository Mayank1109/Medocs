const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getMyProfile,
  updateMyProfile,
  uploadAvatar,
  exportProfileData,
  deleteAccount,
} = require("../controllers/profileController");

router.use(authMiddleware);

const AVATAR_MAX_SIZE_BYTES = 5 * 1024 * 1024;
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

router.get("/me", getMyProfile);
router.put("/me", updateMyProfile);
router.patch("/me/avatar", avatarUpload.single("avatar"), uploadAvatar);
router.get("/me/export", exportProfileData);
router.delete("/me", deleteAccount);

module.exports = router;
