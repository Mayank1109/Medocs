const documentService = require("../services/documentService");

async function listDocuments(req, res) {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
    const { category, favorite } = req.query;

    const result = await documentService.listDocuments({
      userId: req.user._id,
      page,
      limit,
      category,
      favorite,
    });

    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      messageType: "Error",
      message: error.message || "Failed to fetch documents",
    });
  }
}

async function deleteDocument(req, res) {
  try {
    const deletedDoc = await documentService.deleteDocument({
      userId: req.user._id,
      docId: req.params.id,
    });

    res.status(200).json({
      messageType: "Success",
      message: "File deleted successfully!",
      data: deletedDoc,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      messageType: "Error",
      message: error.message || "An error occurred while deleting the document",
    });
  }
}

async function uploadDocument(req, res) {
  try {
    const savedDoc = await documentService.uploadDocument({
      userId: req.user._id,
      file: req.file,
      body: req.body,
    });

    res.status(201).json({
      messageType: "Success",
      message: "File added successfully!",
      data: savedDoc,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      messageType: "Error",
      message: error.message || "An error occured while uploading document",
    });
  }
}

async function updateDocument(req, res) {
  try {
    const updatedDoc = await documentService.updateDocument({
      userId: req.user._id,
      docId: req.params.id,
      body: req.body,
    });

    res.status(200).json({
      messageType: "Success",
      message: "Document updated successfully!",
      data: updatedDoc,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      messageType: "Error",
      message: error.message || "An error occurred while updating the document",
    });
  }
}

async function downloadDocument(req, res) {
  try {
    const downloadUrl = await documentService.downloadDocument({
      userId: req.user._id,
      docId: req.params.id,
    });

    return res.redirect(downloadUrl);
  } catch (error) {
    if (error.code === "FILE_NOT_FOUND") {
      return res.status(404).json({ message: "File not found" });
    }
    return res.status(error.status || 500).json({
      message: error.message || "Unable to download document",
    });
  }
}

async function getGroupedDocuments(req, res) {
  try {
    const groupedDocs = await documentService.getGroupedDocuments({
      userId: req.user._id,
      category: req.query.category,
    });

    res.json({ data: groupedDocs });
  } catch (error) {
    res.status(error.status || 500).json({
      messageType: "Error",
      message: error.message || "Failed to fetch grouped documents",
    });
  }
}

async function toggleFavorite(req, res) {
  try {
    const document = await documentService.toggleFavorite({
      userId: req.user._id,
      docId: req.params.id,
    });

    res.status(200).json({
      messageType: "Success",
      message: "Favorite status updated!",
      data: document,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      messageType: "Error",
      message:
        error.message || "An error occurred while updating favorite status",
    });
  }
}

module.exports = {
  listDocuments,
  deleteDocument,
  uploadDocument,
  updateDocument,
  downloadDocument,
  getGroupedDocuments,
  toggleFavorite,
};
