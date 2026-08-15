import { useDispatch } from "react-redux";
import { useToast } from "../useToast";
import { docActions } from "../../store/docSlice";
import { uploadDocument } from "../../services/documentService";
import { mapDocument } from "../../utils/index";

/**
 * Hook for document upload functionality
 * Handles uploading documents with progress tracking
 */
export const useDocumentUpload = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const onProgress = (progressEvent) => {
    const percent = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total,
    );
    console.log(`Upload progress: ${percent}%`);
  };

  const submitHandler = async (uploadDetails) => {
    const formData = new FormData();
    formData.append("file", uploadDetails.file);
    formData.append("fileName", uploadDetails.name);
    formData.append("documentDate", uploadDetails.date);
    formData.append("description", uploadDetails.description);
    formData.append("category", uploadDetails.category);

    try {
      const response = await uploadDocument(formData, onProgress);
      const data = response.data;

      if (data.messageType !== "Success") {
        throw new Error(data.message || "Upload failed");
      }

      toast.success(
        "Document uploaded",
        `${uploadDetails.name} was added successfully.`,
      );

      dispatch(docActions.setRefresh());
      return mapDocument(data.data);
    } catch (error) {
      toast.error(
        "Upload failed",
        error.response?.data?.message ||
          "Could not upload document. Try again later.",
      );
      throw error;
    }
  };

  return { submitHandler };
};
