const aiService = require("../services/aiService");

async function analyzeDocument(req, res) {
  try {
    const analysis = await aiService.analyzeUserDocument({
      userId: req.user._id,
      docId: req.params.id,
    });

    return res.status(201).json({
      message: "Document analysis completed.",
      data: analysis,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Unable to analyze document",
    });
  }
}

async function askDocumentQuestion(req, res) {
  try {
    const result = await aiService.askDocumentQuestion({
      userId: req.user._id,
      docId: req.params.id,
      question: req.body.question,
    });

    return res.status(200).json({
      message: "Answered.",
      data: result,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Unable to process the question",
    });
  }
}

async function getMetricTrends(req, res) {
  try {
    const result = await aiService.getMetricTrends({
      userId: req.user._id,
      test: req.query.test,
    });

    return res.status(200).json({
      messageType: "Success",
      data: result,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      messageType: "Error",
      message: error.message || "Failed to fetch metric trends",
    });
  }
}

module.exports = {
  analyzeDocument,
  askDocumentQuestion,
  getMetricTrends,
};
