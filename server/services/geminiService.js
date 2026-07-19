const { v2: cloudinary } = require("cloudinary");
const { SUMMARY_PROMPT, buildAskPrompt } = require("../constants/aiPrompts");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function getAnalysisInput(document, fileBuffer) {
  const base64 = fileBuffer.toString("base64");
  return {
    inline_data: {
      mime_type: document.fileType,
      data: base64,
    },
  };
}

async function fetchDocumentBuffer(document) {
  const fileResponse = await fetch(document.storagePath);
  if (!fileResponse.ok) {
    throw new Error("Could not retrieve document file for analysis");
  }
  const arrayBuffer = await fileResponse.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function callGemini(document, fileBuffer, promptText) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              getAnalysisInput(document, fileBuffer),
              { text: promptText },
            ],
          },
        ],
      }),
    },
  );

  const payload = await response.json();

  if (!response.ok) {
    const err = new Error(
      payload.error?.message || "AI provider request failed",
    );
    err.status = response.status;
    err.geminiCode = payload.error?.status;
    throw err;
  }

  const text = payload.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("AI provider returned no text");
  }
  return text;
}

async function analyzeDocument(document) {
  const fileBuffer = await fetchDocumentBuffer(document);
  return callGemini(document, fileBuffer, SUMMARY_PROMPT);
}

async function askAboutDocument(document, question) {
  const fileBuffer = await fetchDocumentBuffer(document);
  return callGemini(document, fileBuffer, buildAskPrompt(question));
}

function isQuotaError(error) {
  return error.status === 429 || error.geminiCode === "RESOURCE_EXHAUSTED";
}

async function deleteFromCloudinary(cloudinaryId) {
  if (!cloudinaryId) return;
  await cloudinary.uploader.destroy(cloudinaryId).catch((err) => {
    console.error("Cloudinary delete failed:", err);
  });
}

async function uploadToCloudinary(buffer) {
  const streamifier = require("streamifier");
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "medocs", resource_type: "auto" },
      (error, result) => (error ? reject(error) : resolve(result)),
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

module.exports = {
  analyzeDocument,
  askAboutDocument,
  isQuotaError,
  uploadToCloudinary,
  deleteFromCloudinary,
};
