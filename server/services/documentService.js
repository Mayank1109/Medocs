const mongoose = require("mongoose");
const Document = require("../models/documentModel");
const Notification = require("../models/notificationModel");
const { uploadToCloudinary, deleteFromCloudinary } = require("./geminiService");

const ALLOWED_CATEGORIES = new Set(["lab", "rx", "invoice", "cert", "misc"]);

function validateDocumentId(docId) {
  if (!mongoose.Types.ObjectId.isValid(docId)) {
    const error = new Error("Invalid document ID");
    error.status = 400;
    throw error;
  }
}

async function listDocuments({ userId, page, limit, category, favorite }) {
  const filter = { ownerId: userId };
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

  return {
    data: docs,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

async function deleteDocument({ userId, docId }) {
  validateDocumentId(docId);

  const deletedDoc = await Document.findOneAndDelete({
    _id: docId,
    ownerId: userId,
  });

  if (!deletedDoc) {
    const error = new Error("Document not found");
    error.status = 404;
    throw error;
  }

  await deleteFromCloudinary(deletedDoc.cloudinaryId);
  return deletedDoc;
}

async function uploadDocument({ userId, file, body }) {
  if (!file) {
    const error = new Error("File is required");
    error.status = 400;
    throw error;
  }

  const category = body.category || "misc";
  if (!ALLOWED_CATEGORIES.has(category)) {
    const error = new Error("Invalid document category");
    error.status = 400;
    throw error;
  }

  const result = await uploadToCloudinary(file.buffer);

  const document = new Document({
    ownerId: userId,
    uploadedBy: userId,
    fileName: body.fileName?.trim() || file.originalname,
    fileType: file.mimetype,
    fileDescription: body.description,
    fileSize: file.size,
    storagePath: result.secure_url,
    cloudinaryId: result.public_id,
    category,
    documentDate: body.documentDate ? new Date(body.documentDate) : new Date(),
  });

  const savedDoc = await document.save();

  await Notification.create({
    ownerId: userId,
    type: "upload",
    title: "Document uploaded",
    message: `"${savedDoc.fileName}" was uploaded successfully.`,
    relatedDocumentId: savedDoc._id,
  });

  return savedDoc;
}

async function updateDocument({ userId, docId, body }) {
  validateDocumentId(docId);

  const { fileName, fileDescription, category, documentDate } = body;
  const updateData = {};

  if (fileName) updateData.fileName = fileName;
  if (fileDescription) updateData.fileDescription = fileDescription;
  if (category) {
    if (!ALLOWED_CATEGORIES.has(category)) {
      const error = new Error("Invalid document category");
      error.status = 400;
      throw error;
    }
    updateData.category = category;
  }
  if (documentDate) updateData.documentDate = new Date(documentDate);

  const updatedDoc = await Document.findOneAndUpdate(
    { _id: docId, ownerId: userId },
    updateData,
    { new: true, runValidators: true },
  );

  if (!updatedDoc) {
    const error = new Error("Document not found");
    error.status = 404;
    throw error;
  }

  return updatedDoc;
}

async function downloadDocument({ userId, docId }) {
  validateDocumentId(docId);

  const document = await Document.findOne({ _id: docId, ownerId: userId });
  if (!document) {
    const error = new Error("Document not found");
    error.status = 404;
    throw error;
  }

  if (!document.storagePath) {
    const error = new Error("File not found");
    error.status = 404;
    error.code = "FILE_NOT_FOUND";
    throw error;
  }

  return document.storagePath.replace("/upload/", "/upload/fl_attachment/");
}

async function getGroupedDocuments({ userId, category }) {
  const matchStage = { ownerId: new mongoose.Types.ObjectId(userId) };
  if (category) matchStage.category = category;

  return Document.aggregate([
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
          $sortArray: { input: "$documents", sortBy: { documentDate: -1 } },
        },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        documents: 1,
      },
    },
  ]);
}

async function toggleFavorite({ userId, docId }) {
  validateDocumentId(docId);

  const document = await Document.findOne({ _id: docId, ownerId: userId });
  if (!document) {
    const error = new Error("Document not found");
    error.status = 404;
    throw error;
  }

  document.favorite = !document.favorite;
  await document.save();
  return document;
}

module.exports = {
  listDocuments,
  deleteDocument,
  uploadDocument,
  updateDocument,
  downloadDocument,
  getGroupedDocuments,
  toggleFavorite,
  ALLOWED_CATEGORIES,
};
