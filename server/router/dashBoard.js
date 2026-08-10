const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const authMiddleware = require("../middleware/authMiddleware");
const Document = require("../models/documentModel");
const DocumentAnalysis = require("../models/documentAnalysisModel");
const { geminiLimiter } = require("../middleware/rateLimiters");
const multer = require("multer");
const Notification = require("../models/notificationModel");
const profile = require("../models/profileModel");
const {
  analyzeDocument,
  askAboutDocument,
  isQuotaError,
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../services/geminiService");
const { AI_ERRORS } = require("../constants/errorMessages");

router.use(authMiddleware);

const MAX_UPLOAD_SIZE_BYTES =
  Number(process.env.MAX_UPLOAD_SIZE_BYTES) || 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
]);
const ALLOWED_CATEGORIES = new Set(["lab", "rx", "invoice", "cert", "misc"]);

const storage = multer.memoryStorage();

const upload = multer({
  storage,
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

router.get("/documents", async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
    const { category, favorite } = req.query;
    const filter = { ownerId: req.user._id };
    if (category) filter.category = category;
    if (favorite !== undefined) filter.favorite = favorite === "true";
    const skip = (page - 1) * limit;

    const [docs, total] = await Promise.all([
      Document.find(filter)
        .populate("uploadedBy", "userName email")
        .populate("ownerId", "userName email")
        .sort({ documentDate: -1 })
        .skip(skip)
        .limit(limit),
      Document.countDocuments(filter),
    ]);

    res.json({
      data: docs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

router.delete("/documents/:id", async (req, res) => {
  try {
    const docId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(docId)) {
      return res.status(400).json({ message: "Invalid document ID" });
    }

    const deletedDoc = await Document.findOneAndDelete({
      _id: docId,
      ownerId: req.user._id,
    });

    if (!deletedDoc) {
      return res.status(404).json({
        messageType: "Error",
        message: "Document not found",
      });
    }

    await deleteFromCloudinary(deletedDoc.cloudinaryId);

    return res.status(200).json({
      messageType: "Success",
      message: "File deleted successfully!",
      data: deletedDoc,
    });
  } catch (err) {
    res.status(500).json({
      messageType: "Error",
      message: "An error occurred while deleting the document",
    });
  }
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        messageType: "Error",
        message: "File is required",
      });
    }

    const category = req.body.category || "misc";
    if (!ALLOWED_CATEGORIES.has(category)) {
      return res.status(400).json({ message: "Invalid document category" });
    }

    const result = await uploadToCloudinary(req.file.buffer);

    const document = new Document({
      ownerId: req.user._id,
      uploadedBy: req.user._id,
      fileName: req.body.fileName?.trim() || req.file.originalname,
      fileType: req.file.mimetype,
      fileDescription: req.body.description,
      fileSize: req.file.size,
      storagePath: result.secure_url,
      cloudinaryId: result.public_id,
      category,
      documentDate: req.body.documentDate
        ? new Date(req.body.documentDate)
        : new Date(),
    });

    const savedDoc = await document.save();

    await Notification.create({
      ownerId: req.user._id,
      type: "upload",
      title: "Document uploaded",
      message: `"${savedDoc.fileName}" was uploaded successfully.`,
      relatedDocumentId: savedDoc._id,
    });

    return res.status(201).json({
      messageType: "Success",
      message: "File added successfully!",
      data: savedDoc,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      messageType: "Error",
      message: "An error occured while uploading document",
    });
  }
});

router.put("/documents/:id", async (req, res) => {
  const { fileName, fileDescription, category, documentDate } = req.body;
  const docId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(docId)) {
      return res.status(400).json({
        messageType: "Error",
        message: "Invalid document ID",
      });
    }

    const updateData = {};

    if (fileName) updateData.fileName = fileName;
    if (fileDescription) updateData.fileDescription = fileDescription;
    if (category) {
      if (!ALLOWED_CATEGORIES.has(category)) {
        return res.status(400).json({ message: "Invalid document category" });
      }
      updateData.category = category;
    }
    if (documentDate) updateData.documentDate = new Date(documentDate);

    const updatedDoc = await Document.findOneAndUpdate(
      { _id: docId, ownerId: req.user._id },
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedDoc) {
      return res.status(404).json({
        messageType: "Error",
        message: "Document not found",
      });
    }

    return res.status(200).json({
      messageType: "Success",
      message: "Document updated successfully!",
      data: updatedDoc,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      messageType: "Error",
      message: "An error occurred while updating the document",
    });
  }
});

router.get("/documents/:id/download", async (req, res) => {
  try {
    const docId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(docId)) {
      return res.status(400).json({ message: "Invalid document ID" });
    }

    const document = await Document.findOne({
      _id: docId,
      ownerId: req.user._id,
    });
    if (!document)
      return res.status(404).json({ message: "Document not found" });
    if (!document.storagePath) {
      return res.status(404).json({ message: AI_ERRORS.FILE_NOT_FOUND });
    }

    const downloadUrl = document.storagePath.replace(
      "/upload/",
      "/upload/fl_attachment/",
    );
    return res.redirect(downloadUrl);
  } catch (err) {
    return res.status(500).json({ message: "Unable to download document" });
  }
});

router.post("/documents/:id/analyze", geminiLimiter, async (req, res) => {
  try {
    const docId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(docId)) {
      return res.status(400).json({ message: "Invalid document ID" });
    }

    const document = await Document.findOne({
      _id: docId,
      ownerId: req.user._id,
    });
    if (!document)
      return res.status(404).json({ message: "Document not found" });

    if (!process.env.GEMINI_API_KEY || !process.env.GEMINI_MODEL) {
      return res.status(503).json({ message: AI_ERRORS.NOT_CONFIGURED });
    }

    if (!document.storagePath) {
      return res.status(404).json({ message: AI_ERRORS.FILE_NOT_FOUND });
    }

    const analysis = await DocumentAnalysis.create({
      documentId: document._id,
      ownerId: req.user._id,
      status: "processing",
      provider: "gemini",
      model: process.env.GEMINI_MODEL,
    });

    try {
      analysis.summary = await analyzeDocument(document);
      analysis.status = "completed";
      await analysis.save();

      await Notification.create({
        ownerId: req.user._id,
        type: "ai_analysis",
        title: "AI analysis completed",
        message: `Your analysis for "${document.fileName}" is ready.`,
        relatedDocumentId: document._id,
      });

      return res
        .status(201)
        .json({ message: "Document analysis completed.", data: analysis });
    } catch (error) {
      console.error("Analysis failed:", error.message);
      analysis.status = "failed";
      analysis.error = error.message;
      await analysis.save();
      if (isQuotaError(error)) {
        return res.status(429).json({ message: AI_ERRORS.QUOTA_EXCEEDED });
      }
      return res.status(502).json({ message: AI_ERRORS.ANALYSIS_FAILED });
    }
  } catch (err) {
    return res.status(500).json({ message: "Unable to analyze document" });
  }
});

router.post("/documents/:id/ask", geminiLimiter, async (req, res) => {
  try {
    const docId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(docId)) {
      return res.status(400).json({ message: "Invalid document ID" });
    }

    const { question } = req.body;
    if (!question?.trim()) {
      return res.status(400).json({ message: AI_ERRORS.QUESTION_REQUIRED });
    }

    const document = await Document.findOne({
      _id: docId,
      ownerId: req.user._id,
    });
    if (!document)
      return res.status(404).json({ message: "Document not found" });

    if (!process.env.GEMINI_API_KEY || !process.env.GEMINI_MODEL) {
      return res.status(503).json({ message: AI_ERRORS.NOT_CONFIGURED });
    }

    if (!document.storagePath) {
      return res.status(404).json({ message: AI_ERRORS.FILE_NOT_FOUND });
    }

    try {
      const answer = await askAboutDocument(document, question.trim());
      return res.status(200).json({ message: "Answered.", data: { answer } });
    } catch (error) {
      console.error("Ask failed:", error.message);
      if (isQuotaError(error)) {
        return res.status(429).json({ message: AI_ERRORS.QUOTA_EXCEEDED });
      }
      return res.status(502).json({ message: AI_ERRORS.ASK_FAILED });
    }
  } catch (err) {
    return res.status(500).json({ message: "Unable to process the question" });
  }
});

router.get("/documents/grouped", async (req, res) => {
  try {
    const { category } = req.query;

    const matchStage = {
      ownerId: new mongoose.Types.ObjectId(req.user._id),
    };

    if (category) {
      matchStage.category = category;
    }

    const groupedDocs = await Document.aggregate([
      { $match: matchStage },
      {
        $addFields: {
          year: { $year: "$documentDate" },
          month: { $month: "$documentDate" },
        },
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          documents: { $push: "$$ROOT" },
        },
      },
      {
        $set: {
          documents: {
            $sortArray: {
              input: "$documents",
              sortBy: { documentDate: -1 },
            },
          },
        },
      },
      {
        $sort: {
          "_id.year": -1,
          "_id.month": -1,
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          documents: 1,
        },
      },
    ]);

    res.json({ data: groupedDocs });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      messageType: "Error",
      message: "Failed to fetch grouped documents",
    });
  }
});

router.patch("/documents/:id/favorite", async (req, res) => {
  try {
    const docId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(docId)) {
      return res.status(400).json({
        messageType: "Error",
        message: "Invalid document ID",
      });
    }

    const document = await Document.findOne({
      _id: docId,
      ownerId: req.user._id,
    });

    if (!document) {
      return res.status(404).json({
        messageType: "Error",
        message: "Document not found",
      });
    }

    document.favorite = !document.favorite;
    await document.save();

    return res.status(200).json({
      messageType: "Success",
      message: "Favorite status updated!",
      data: document,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      messageType: "Error",
      message: "An error occurred while updating favorite status",
    });
  }
});

module.exports = router;
