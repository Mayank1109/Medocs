import { useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "../useToast";
import { docActions } from "../../store/docSlice";
import { deleteDocument } from "../../services/documentService";

/**
 * Hook for document deletion functionality
 * Handles deleting a document with confirmation and user feedback
 */
export const useDocumentDelete = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [deletingId, setDeletingId] = useState(null);

  const deleteDocHandler = async (documentId) => {
    if (!documentId) {
      toast.error("Delete failed", "No document selected.");
      return;
    }

    setDeletingId(documentId);
    try {
      // Brief delay for UX
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await deleteDocument(documentId);
      if (response.data.messageType !== "Success") {
        throw new Error(response.data.message || "Delete failed");
      }

      toast.success("Document deleted", "Document moved to bin.");
      dispatch(docActions.setRefresh());
      return response.data;
    } catch (error) {
      toast.error(
        "Delete failed",
        error.response?.data?.message ||
          "Could not delete document. Try again later.",
      );
      throw error;
    } finally {
      setDeletingId(null);
    }
  };

  return { deleteDocHandler, deletingId };
};
