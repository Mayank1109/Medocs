const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
      index: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    content: { type: String, required: true },
    type: {
      type: String,
      enum: ["text", "file"],
      default: "text",
    },
  },
  { timestamps: true },
);

// ordered message retrieval
MessageSchema.index({ chatId: 1, createdAt: 1 });

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
