const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
      },
    ],
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
    lastMessage: String,
  },
  { timestamps: true },
);

ChatSchema.index({ updatedAt: -1 });

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;
