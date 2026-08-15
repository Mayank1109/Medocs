import { useDispatch } from "react-redux";
import { useToast } from "../useToast";
import { modalActions } from "../../store/modalSlice";
import { prepareDocument } from "../../services/documentService";

/**
 * Hook for document preview/open functionality
 * Handles opening documents in preview modal or downloading to disk
 */
export const useDocumentPreview = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const openDocHandler = async (document) => {
    if (!document) {
      toast.error("Error", "No document selected.");
      return;
    }

    const result = await prepareDocument(document);
    if (result.error) {
      dispatch(
        modalActions.display({
          actionType: "Error",
          payload: { message: result.error },
        }),
      );
      return;
    }

    if (result?.isPreviewable) {
      dispatch(
        modalActions.display({
          actionType: "Preview",
          payload: result,
        }),
      );
    } else {
      window.open(result.url, "_blank");
    }
  };

  return { openDocHandler };
};
