const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { geminiLimiter } = require("../middleware/rateLimiters");
const {
  analyzeDocument,
  askDocumentQuestion,
  getMetricTrends,
} = require("../controllers/aiController");

router.use(authMiddleware);

router.post("/documents/:id/analyze", geminiLimiter, analyzeDocument);
router.post("/documents/:id/ask", geminiLimiter, askDocumentQuestion);
router.get("/documents/metrics/trends", getMetricTrends);

module.exports = router;
