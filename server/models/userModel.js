const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String }, // will be optional for google users
    googleId: { type: String, index: true },
    authProviders: {
      local: { type: Boolean, default: false },
      google: { type: Boolean, default: false },
    },
    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      default: "patient",
      index: true,
    },
    isActive: { type: Boolean, default: true },
    lastLogin: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
