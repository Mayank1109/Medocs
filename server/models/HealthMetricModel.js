const mongoose = require("mongoose");

const HealthMetricSchema = new mongoose.Schema(
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
    testName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    rawLabel: String,
  },
  { timestamps: true },
);

HealthMetricSchema.index({ ownerId: 1, testName: 1, date: 1 });

const HealthMetric = mongoose.model("HealthMetric", HealthMetricSchema);

module.exports = HealthMetric;
