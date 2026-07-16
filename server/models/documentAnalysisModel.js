const mongoose = require("mongoose");

const DocumentAnalysisSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
      index: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    summary: String,
    extractedData: mongoose.Schema.Types.Mixed,
    provider: String,
    model: String,
    error: String,
  },
  { timestamps: true },
);

DocumentAnalysisSchema.index({ documentId: 1, createdAt: -1 });

module.exports = mongoose.model("DocumentAnalysis", DocumentAnalysisSchema);
