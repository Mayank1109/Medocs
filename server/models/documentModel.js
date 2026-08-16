const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
      index: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    documentDate: {
      type: Date,
      required: true,
      index: true,
    },
    fileSize: Number,
    fileDescription: String,
    storagePath: String,
    category: {
      type: String,
      required: true,
      index: true,
    },
    favorite: {
      type: Boolean,
      default: false,
      index: true,
    },
    isAnalyzed: {
      type: Boolean,
      default: false,
      index: true,
    },
    lastAnalyzedAt: {
      type: Date,
      default: null,
    },
    accessList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isEncrypted: { type: Boolean, default: true },
    cloudinaryId: String,
  },
  { timestamps: true },
);

// compound index for listing
DocumentSchema.index({ ownerId: 1, category: 1, documentDate: -1 });
DocumentSchema.index({ ownerId: 1, documentDate: -1 });
const Document = mongoose.model("Document", DocumentSchema);

module.exports = Document;
