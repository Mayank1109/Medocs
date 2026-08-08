import { httpService } from "../api/httpService";
import { BASE_URI, DOCUMENT_URI, VIEW_URI } from "../api/uriConfig";

const uploadDocument = (formData, onProgress) => {
  return httpService.post(DOCUMENT_URI.UPLOAD, formData, {
    onUploadProgress: onProgress,
  });
};

const getDocuments = (page, limit, category, favorite) => {
  return httpService.get(DOCUMENT_URI.LIST, {
    params: { page, limit, category, favorite },
  });
};

const deleteDocument = (id) => {
  return httpService.delete(DOCUMENT_URI.DELETE(id));
};

const editDocument = (id, updatedData) => {
  return httpService.put(DOCUMENT_URI.EDIT(id), updatedData);
};

const isPreviewAble = (type) => {
  return (
    type?.includes("pdf") || type?.includes("image") || type?.includes("text")
  );
};

const buildFileUrl = (storagePath) => {
  if (!storagePath) return null;

  const normalizedPath = storagePath.replace(/\\/g, "/");
  return `${VIEW_URI}/${normalizedPath}`;
};

const checkFileExists = async (url) => {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
};

const prepareDocument = async (payload) => {
  const url = buildFileUrl(payload?.storagePath);

  if (!url) {
    return { error: "Invalid file path" };
  }

  const exists = await checkFileExists(url);

  if (!exists) {
    return { error: "File not found" };
  }

  return {
    url,
    type: payload.fileType,
    isPreviewable: isPreviewAble(payload.fileType),
  };
};

const toggleFavorite = (id) => {
  return httpService.patch(DOCUMENT_URI.TOGGLE_FAVORITE(id));
};

export {
  uploadDocument,
  getDocuments,
  deleteDocument,
  editDocument,
  isPreviewAble,
  buildFileUrl,
  checkFileExists,
  prepareDocument,
  toggleFavorite,
};
