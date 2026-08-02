import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalDisplayHandler, notImplementedToast } from "../utility/Functions";
import { mapDocument } from "../utility/mapDocument";
import {
  deleteDocument,
  editDocument,
  prepareDocument,
  uploadDocument,
} from "../services/documentService";
import { docActions } from "../store/docSlice";
import { modalActions } from "../store/modalSlice";
import { useOptions } from "./useOptions";
import { useToast } from "./useToast";

export const useDocumentActions = () => {
  const { payload } = useOptions();
  const dispatch = useDispatch();
  const { closeOptions } = useOptions();
  const [deletingId, setDeletingId] = useState(null);
  const toast = useToast();

  const handleActionClick = async (event, actionType) => {
    event.preventDefault();
    console.log(actionType, ": actionType");
    if (actionType === "Open") {
      openDocHandler(event);
      closeOptions();
      return;
    }

    modalDisplayHandler(event, actionType, payload);
    closeOptions();
  };

  const handleDeleteScenario = (messageType) => {
    if (messageType === "Success") {
      toast.success("Document deleted", "Document moved to bin.");
    } else {
      toast.error("Delete failed", "Failed to delete document.");
    }
    dispatch(docActions.setRefresh());
  };

  const openDocHandler = async (event) => {
    event.preventDefault();
    const result = await prepareDocument(payload);
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

  const deleteDocHandler = async (event) => {
    event?.preventDefault();
    const idToDelete = payload?.id;

    if (!idToDelete) {
      const err = new Error("No document ID provided for deletion.");
      toast.error("Delete failed", "Something went wrong. Try again.");
      throw err;
    }

    setDeletingId(idToDelete);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response = await deleteDocument(idToDelete);
      if (response.data.messageType !== "Success") {
        throw new Error(response.data.message || "Delete failed");
      }
      handleDeleteScenario(response.data.messageType);
    } catch (err) {
      toast.error(
        "Delete failed",
        "Could not delete document. Try again later.",
      );
      throw err;
    } finally {
      setDeletingId(null);
    }
  };

  const modalCloseHandler = (event) => {
    event?.preventDefault();
    dispatch(modalActions.hide());
  };

  const onprogress = (progressEvent) => {
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
      const response = await uploadDocument(formData, onprogress);
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

  const editDocHandler = async (event, editdata) => {
    event?.preventDefault();

    try {
      const response = await editDocument(payload.id, {
        fileName: editdata.fileName,
        fileDescription: editdata.description,
        category: editdata.category,
        documentDate: editdata.documentDate,
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

  const downloadDocHandler = (event) => {
    event?.preventDefault();
    const doc = payload;
    if (!doc?.storagePath) {
      toast.error("Download failed", "No document selected.");
      return;
    }
    const downloadUrl = doc.storagePath.replace(
      "/upload/",
      "/upload/fl_attachment/",
    );
    window.open(downloadUrl, "_blank");
  };

  const printDocHandler = (e) => {
    e?.preventDefault();
    notImplementedToast(toast, "Printing");
  };

  const shareDocHandler = (e) => {
    e?.preventDefault();
    notImplementedToast(toast, "Sharing");
  };

  return {
    handleActionClick,
    deleteDocHandler,
    modalCloseHandler,
    submitHandler,
    editDocHandler,
    downloadDocHandler,
    printDocHandler,
    deletingId,
  };
};
