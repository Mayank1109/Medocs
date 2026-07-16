const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const authMiddleware = require("../middleware/authMiddleware");
const Document = require("../models/documentModel");
const DocumentAnalysis = require("../models/documentAnalysisModel");
const multer = require("multer");
router.use(authMiddleware);

const { v2: cloudinary } = require("cloudinary");
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "medocs", resource_type: "auto" },
      (error, result) => (error ? reject(error) : resolve(result)),
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

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

function getAnalysisInput(document, fileBuffer) {
  const base64 = fileBuffer.toString("base64");
  if (document.fileType === "application/pdf") {
    return {
      type: "input_file",
      filename: document.fileName,
      file_data: `data:application/pdf;base64,${base64}`,
      detail: "low",
    };
  }

  return {
    type: "input_image",
    image_url: `data:${document.fileType};base64,${base64}`,
    detail: "high",
  };
}

async function analyzeDocument(document, storedFile) {
  const fileBuffer = await fs.promises.readFile(storedFile);
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL,
      input: [
        {
          role: "user",
          content: [
            getAnalysisInput(document, fileBuffer),
            {
              type: "input_text",
              text: "Summarize this medical document in plain language. List notable values, dates, medications, and follow-up questions when present. Do not diagnose, and state clearly when information is uncertain.",
            },
          ],
        },
      ],
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error?.message || "AI provider request failed");
  }

  if (!payload.output_text) {
    throw new Error("AI provider returned no analysis text");
  }

  return payload.output_text;
}

router.get("/documents", async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
    const { category } = req.query;
    const filter = {
      ownerId: req.user._id,
    };

    if (category) {
      filter.category = category;
    }
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

    if (deletedDoc.cloudinaryId) {
      await cloudinary.uploader
        .destroy(deletedDoc.cloudinaryId)
        .catch((err) => {
          console.error("Cloudinary delete failed:", err);
        });
    }

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

    const storedFile = path.join(
      UPLOAD_DIR,
      path.basename(document.storagePath || ""),
    );
    if (!fs.existsSync(storedFile)) {
      return res.status(404).json({ message: "Document file not found" });
    }

    return res.download(storedFile, document.fileName);
  } catch (err) {
    return res.status(500).json({ message: "Unable to download document" });
  }
});

router.post("/documents/:id/analyze", async (req, res) => {
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

    if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL) {
      return res.status(503).json({
        message: "AI analysis is not configured on this server.",
      });
    }

    const storedFile = path.join(
      UPLOAD_DIR,
      path.basename(document.storagePath || ""),
    );
    if (!fs.existsSync(storedFile)) {
      return res.status(404).json({ message: "Document file not found" });
    }

    const analysis = await DocumentAnalysis.create({
      documentId: document._id,
      ownerId: req.user._id,
      status: "processing",
      provider: "openai",
      model: process.env.OPENAI_MODEL,
    });

    try {
      analysis.summary = await analyzeDocument(document, storedFile);
      analysis.status = "completed";
      await analysis.save();
      return res
        .status(201)
        .json({ message: "Document analysis completed.", data: analysis });
    } catch (error) {
      analysis.status = "failed";
      analysis.error = error.message;
      await analysis.save();
      return res.status(502).json({ message: "Document analysis failed." });
    }
  } catch (err) {
    return res.status(500).json({ message: "Unable to analyze document" });
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

module.exports = router;
