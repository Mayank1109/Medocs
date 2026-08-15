import { useToast } from "../useToast";
import { notImplementedToast } from "../../utils/ui";

/**
 * Hook for document interaction utilities
 * Handles download, print, share, and other non-core operations
 */
export const useDocumentInteractions = () => {
  const toast = useToast();

  const downloadDocHandler = (document) => {
    if (!document?.storagePath) {
      toast.error("Download failed", "No document selected.");
      return;
    }

    const downloadUrl = document.storagePath.replace(
      "/upload/",
      "/upload/fl_attachment/",
    );
    window.open(downloadUrl, "_blank");
  };

  const printDocHandler = () => {
    notImplementedToast(toast, "Printing");
  };

  const shareDocHandler = () => {
    notImplementedToast(toast, "Sharing");
  };

  return {
    downloadDocHandler,
    printDocHandler,
    shareDocHandler,
  };
};
