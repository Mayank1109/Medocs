import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { modalDisplayHandler } from "../utils/ui";
import { useOptions } from "../context/OptionsProvider";
import { useToast } from "./useToast";
import { useDocumentDelete } from "./data-fetching/useDocumentDelete";
import { useDocumentPreview } from "./data-fetching/useDocumentPreview";
import { useDocumentUpload } from "./data-fetching/useDocumentUpload";
import { useDocumentMeta } from "./data-fetching/useDocumentMeta";
import { useDocumentInteractions } from "./data-fetching/useDocumentInteractions";
import { modalActions } from "../store/modalSlice";

/**
 * Composite hook for backward compatibility
 * Combines individual document action hooks
 * @deprecated Use individual hooks instead: useDocumentDelete, useDocumentUpload, etc.
 */
export const useDocumentActions = () => {
  const { payload } = useOptions();
  const dispatch = useDispatch();
  const { closeOptions } = useOptions();
  const toast = useToast();

  const { deleteDocHandler, deletingId } = useDocumentDelete();
  const { openDocHandler } = useDocumentPreview();
  const { submitHandler } = useDocumentUpload();
  const { editDocHandler, toggleFavoriteHandler } = useDocumentMeta();
  const { downloadDocHandler, printDocHandler, shareDocHandler } =
    useDocumentInteractions();

  const handleActionClick = async (event, actionType) => {
    event.preventDefault();
    console.log(actionType, ": actionType");
    if (actionType === "Open") {
      await openDocHandler(payload);
      closeOptions();
      return;
    }

    modalDisplayHandler(event, actionType, payload);
    closeOptions();
  };

  const modalCloseHandler = (event) => {
    event?.preventDefault();
    dispatch(modalActions.hide());
  };

  return {
    handleActionClick,
    deleteDocHandler: () => deleteDocHandler(payload?.id),
    modalCloseHandler,
    submitHandler,
    editDocHandler: (editdata) => editDocHandler(payload?.id, editdata),
    downloadDocHandler: () => downloadDocHandler(payload),
    printDocHandler,
    deletingId,
    toggleFavoriteHandler: (documentId) =>
      toggleFavoriteHandler(documentId || payload?.id),
  };
};
