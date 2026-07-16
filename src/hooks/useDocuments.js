import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalDisplayHandler } from "../utility/Functions";
import {
  deleteDocument,
  editDocument,
  prepareDocument,
  uploadDocument,
} from "../services/documentService";
import { docActions } from "../store/docSlice";
import { popupActions } from "../store/componentSlice";
import { modalActions } from "../store/modalSlice";
import { useOptions } from "./useOptions";

export const useDocumentActions = () => {
  const { payload } = useOptions();
  const dispatch = useDispatch();
  const { closeOptions } = useOptions();

  const handleActionClick = async (event, actionType) => {
    event.preventDefault();
    console.log(actionType, ": actionType");
    if (actionType === "Open") {
      console.log("Open action triggered with payload:", payload);
      openDocHandler(event);
      closeOptions();
      return;
    }

    modalDisplayHandler(event, actionType);
    closeOptions();
  };

  const handleDeleteScenario = (messageType) => {
    dispatch(
      popupActions.display({
        message:
          messageType === "Success"
            ? "Document moved to bin"
            : "Failed to delete document",
        status: messageType === "Success" ? "success" : "error",
      }),
    );
    dispatch(docActions.setRefresh());
  };

  const openDocHandler = async (event) => {
    event.preventDefault();
    console.log("Open document handler called with payload:", payload);
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
    event.preventDefault();
    const idToDelete = payload?._id;
    console.log("Document ID to delete:", idToDelete);
    try {
      if (!idToDelete) {
        console.error("No document ID provided for deletion.");
        return;
      }
      const response = await deleteDocument(idToDelete);
      console.log(response.data);
      handleDeleteScenario(response.data.messageType);
    } catch (err) {
      dispatch(
        popupActions.display({
          message: "Could not delete document. Try again later.",
          status: "error",
        }),
      );
    } finally {
      dispatch(modalActions.hide());
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
    console.log("submit handler called");
    console.log(uploadDetails);
    const formData = new FormData();
    formData.append("file", uploadDetails.file);
    formData.append("fileName", uploadDetails.name); // matches req.body.fileName
    formData.append("documentDate", uploadDetails.date); // matches req.body.documentDate
    formData.append("description", uploadDetails.description);
    formData.append("category", uploadDetails.category);

    try {
      let response = await uploadDocument(formData, onprogress);
      response = response.data;
      dispatch(
        popupActions.display({
          message:
            response.messageType === "Success"
              ? "Document Uploaded Successfully"
              : "Failed to upload document",
          status: response.messageType === "Success" ? "success" : "error",
        }),
      );
      dispatch(docActions.setRefresh());
    } catch (error) {
      dispatch(
        popupActions.display({
          message: "Could not Upload document. Try again later.",
          status: "error",
        }),
      );
    } finally {
      console.log("will set loading here ....once finished will show a popup");
      dispatch(modalActions.hide());
    }
  };

  const editDocHandler = async (event, editdata) => {
    event.preventDefault();
    console.log("edit document handler called with data:", {
      ...editdata,
      id: payload?._id,
    });
    console.log("payload in edit handler:", payload);
    try {
      let response = await editDocument(payload._id, {
        fileName: editdata.fileName,
        fileDescription: editdata.description,
        category: editdata.fileType,
        documentDate: editdata.documentDate,
      });
      response = response.data;
      dispatch(
        popupActions.display({
          message:
            response.messageType === "Success"
              ? "Document Updated Successfully"
              : "Failed to update document",
          status: response.messageType === "Success" ? "success" : "error",
        }),
      );
      dispatch(docActions.setRefresh());
    } catch (error) {
      dispatch(
        popupActions.display({
          message: "Could not update document. Try again later.",
          status: "error",
        }),
      );
    } finally {
      console.log("will set loading here ....once finished will show a popup");
      dispatch(modalActions.hide());
    }
  };

  const downloadDocHandler = (event) => {
    event.preventDefault();
  };

  const printDocHandler = (event) => {
    event.preventDefault();
  };

  return {
    handleActionClick,
    deleteDocHandler,
    modalCloseHandler,
    submitHandler,
    editDocHandler,
    downloadDocHandler,
    printDocHandler,
  };
};
