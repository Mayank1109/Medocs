const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["upload", "ai_analysis", "share", "system"],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    relatedDocumentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
  },
  { timestamps: true },
);

NotificationSchema.index({ ownerId: 1, createdAt: -1 });

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
