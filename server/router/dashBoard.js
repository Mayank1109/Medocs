const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const {
  listDocuments,
  deleteDocument,
  uploadDocument,
  updateDocument,
  downloadDocument,
  getGroupedDocuments,
  toggleFavorite,
} = require("../controllers/documentController");

router.use(authMiddleware);

const MAX_UPLOAD_SIZE_BYTES =
  Number(process.env.MAX_UPLOAD_SIZE_BYTES) || 10 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_UPLOAD_SIZE_BYTES, files: 1 },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      const error = new Error("Only PDF, JPEG, and PNG files are allowed.");
      error.status = 400;
      return cb(error);
    }
    return cb(null, true);
  },
});

router.get("/documents", listDocuments);
router.delete("/documents/:id", deleteDocument);
router.post("/upload", upload.single("file"), uploadDocument);
router.put("/documents/:id", updateDocument);
router.get("/documents/:id/download", downloadDocument);
router.get("/documents/grouped", getGroupedDocuments);
router.patch("/documents/:id/favorite", toggleFavorite);

module.exports = router;
