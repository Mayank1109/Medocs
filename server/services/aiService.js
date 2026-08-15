const mongoose = require("mongoose");
const Document = require("../models/documentModel");
const DocumentAnalysis = require("../models/documentAnalysisModel");
const HealthMetric = require("../models/healthMetricModel");
const Notification = require("../models/notificationModel");
const { PLAUSIBLE_RANGES } = require("../constants/constants");
const { AI_ERRORS } = require("../constants/errorMessages");
const {
  analyzeDocument,
  askAboutDocument,
  extractHealthMetrics,
  isQuotaError,
  classifyDocument,
} = require("./geminiService");

function validateDocumentId(docId) {
  if (!mongoose.Types.ObjectId.isValid(docId)) {
    const error = new Error("Invalid document ID");
    error.status = 400;
    throw error;
  }
}

function isPlausible(testName, value) {
  const range = PLAUSIBLE_RANGES[testName];
  if (!range) return true;
  return value >= range.min && value <= range.max;
}

async function analyzeUserDocument({ userId, docId }) {
  validateDocumentId(docId);

  const document = await Document.findOne({ _id: docId, ownerId: userId });
  if (!document) {
    const error = new Error("Document not found");
    error.status = 404;
    throw error;
  }

  if (!process.env.GEMINI_API_KEY || !process.env.GEMINI_MODEL) {
    const error = new Error(AI_ERRORS.NOT_CONFIGURED);
    error.status = 503;
    throw error;
  }

  if (!document.storagePath) {
    const error = new Error(AI_ERRORS.FILE_NOT_FOUND);
    error.status = 404;
    throw error;
  }

  const analysis = await DocumentAnalysis.create({
    documentId: document._id,
    ownerId: userId,
    status: "processing",
    provider: "gemini",
    model: process.env.GEMINI_MODEL,
  });

  try {
    analysis.summary = await analyzeDocument(document);
    analysis.status = "completed";
    await analysis.save();

    try {
      const classification = await classifyDocument(document);

      if (
        classification.isMedicalDocument &&
        classification.confidence !== "low"
      ) {
        const metrics = await extractHealthMetrics(document);
        await HealthMetric.deleteMany({ documentId: document._id });

        if (metrics.length > 0) {
          const metricDocs = metrics
            .filter((m) => m.testName && typeof m.value === "number" && m.unit)
            .filter((m) => isPlausible(m.testName, m.value))
            .map((m) => ({
              documentId: document._id,
              ownerId: userId,
              testName: m.testName,
              value: m.value,
              unit: m.unit,
              date: m.date ? new Date(m.date) : document.documentDate,
              rawLabel: m.rawLabel,
            }));

          if (metricDocs.length > 0) {
            await HealthMetric.insertMany(metricDocs);
          }
        }
      } else {
        await HealthMetric.deleteMany({ documentId: document._id });
      }
    } catch (metricErr) {
      console.error("Health metric extraction failed:", metricErr.message);
    }

    await Notification.create({
      ownerId: userId,
      type: "ai_analysis",
      title: "AI analysis completed",
      message: `Your analysis for "${document.fileName}" is ready.`,
      relatedDocumentId: document._id,
    });

    return analysis;
  } catch (error) {
    console.error("Analysis failed:", error.message);
    analysis.status = "failed";
    analysis.error = error.message;
    await analysis.save();

    if (isQuotaError(error)) {
      const quotaError = new Error(AI_ERRORS.QUOTA_EXCEEDED);
      quotaError.status = 429;
      throw quotaError;
    }

    const aiError = new Error(AI_ERRORS.ANALYSIS_FAILED);
    aiError.status = 502;
    throw aiError;
  }
}

async function askDocumentQuestion({ userId, docId, question }) {
  validateDocumentId(docId);

  if (!question?.trim()) {
    const error = new Error(AI_ERRORS.QUESTION_REQUIRED);
    error.status = 400;
    throw error;
  }

  const document = await Document.findOne({ _id: docId, ownerId: userId });
  if (!document) {
    const error = new Error("Document not found");
    error.status = 404;
    throw error;
  }

  if (!process.env.GEMINI_API_KEY || !process.env.GEMINI_MODEL) {
    const error = new Error(AI_ERRORS.NOT_CONFIGURED);
    error.status = 503;
    throw error;
  }

  if (!document.storagePath) {
    const error = new Error(AI_ERRORS.FILE_NOT_FOUND);
    error.status = 404;
    throw error;
  }

  try {
    const answer = await askAboutDocument(document, question.trim());
    return { answer };
  } catch (error) {
    console.error("Ask failed:", error.message);
    if (isQuotaError(error)) {
      const quotaError = new Error(AI_ERRORS.QUOTA_EXCEEDED);
      quotaError.status = 429;
      throw quotaError;
    }

    const askError = new Error(AI_ERRORS.ASK_FAILED);
    askError.status = 502;
    throw askError;
  }
}

async function getMetricTrends({ userId, test }) {
  if (!test) {
    const error = new Error("Query param 'test' is required");
    error.status = 400;
    throw error;
  }

  const normalizedTest = test.toLowerCase().trim();
  const series = await HealthMetric.find({
    ownerId: userId,
    testName: normalizedTest,
  })
    .sort({ date: 1 })
    .select("value unit date rawLabel documentId -_id");

  return {
    testName: normalizedTest,
    series,
  };
}

module.exports = {
  analyzeUserDocument,
  askDocumentQuestion,
  getMetricTrends,
};
