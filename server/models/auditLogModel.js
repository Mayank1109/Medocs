const mongoose = require("mongoose");

const AuditLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    action: {
      type: String,
      enum: ["VIEW", "UPLOAD", "DELETE", "MESSAGE", "UPDATE_PROFILE"],
      required: true,
    },
    entityType: {
      type: String,
      enum: ["DOCUMENT", "CHAT", "PROFILE"],
    },
    entityId: mongoose.Schema.Types.ObjectId,
    ipAddress: String,
  },
  { timestamps: true },
);

AuditLogSchema.index({ entityType: 1, entityId: 1 });
AuditLogSchema.index({ createdAt: -1 });

const AuditLog = mongoose.model("AuditLog", AuditLogSchema);
module.exports = AuditLog;
