const mongoose = require("mongoose");

const FolderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
      index: true,
    },

    path: {
      type: String,
      index: true,
    },

    isRoot: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

FolderSchema.index({ ownerId: 1, parentId: 1 });

module.exports = mongoose.model("Folder", FolderSchema);
