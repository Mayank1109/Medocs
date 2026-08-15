import { useDispatch } from "react-redux";
import { useToast } from "../useToast";
import { docActions } from "../../store/docSlice";
import { editDocument, toggleFavorite } from "../../services/documentService";

/**
 * Hook for document metadata operations
 * Handles editing and toggling favorite status
 */
export const useDocumentMeta = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const editDocHandler = async (documentId, editData) => {
    if (!documentId) {
      toast.error("Update failed", "No document selected.");
      return;
    }

    try {
      const response = await editDocument(documentId, {
        fileName: editData.fileName,
        fileDescription: editData.description,
        category: editData.category,
        documentDate: editData.documentDate,
      });

      if (response.data.messageType !== "Success") {
        throw new Error(response.data.message || "Update failed");
      }

      toast.success("Document updated", "Your changes were saved.");
      dispatch(docActions.setRefresh());
      return response.data;
    } catch (error) {
      toast.error(
        "Update failed",
        error.response?.data?.message ||
          "Could not update document. Try again later.",
      );
      throw error;
    }
  };

  const toggleFavoriteHandler = async (documentId) => {
    if (!documentId) {
      toast.error("Failed", "No document selected.");
      return;
    }

    try {
      const response = await toggleFavorite(documentId);
      if (response.data.messageType !== "Success") {
        throw new Error(response.data.message || "Failed to update favorite");
      }

      toast.success(
        response.data.data.favorite
          ? "Added to favorites"
          : "Removed from favorites",
        response.data.data.fileName || "",
      );
      dispatch(docActions.setRefresh());
      return response.data;
    } catch (error) {
      toast.error(
        "Failed",
        error.response?.data?.message || "Could not update favorite status.",
      );
      throw error;
    }
  };

  return { editDocHandler, toggleFavoriteHandler };
};
