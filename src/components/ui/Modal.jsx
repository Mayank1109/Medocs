import { useSelector } from "react-redux";
import { useDocumentActions } from "../../hooks/useDocuments";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import UploadDocumentModal from "./UploadDocumentModal";
import { useOptions } from "../../hooks/useOptions";
import DeleteDocumentModal from "./DeleteDocumentModal";
import PreviewDocumentModal from "./PreviewDocumentModal";
import ShareDocumentModal from "./ShareDocumentModal";

const Modal = () => {
  const {
    submitHandler,
    deleteDocHandler,
    editDocHandler,
    modalCloseHandler,
    downloadDocHandler,
    printDocHandler,
  } = useDocumentActions();

  const { actionType, isModalVisible } = useSelector((state) => state.modal);
  const modalData = useSelector((state) => state.modal.data);
  const { payload } = useOptions();

  let modalContent = null;
  const activeDoc = payload || modalData;

  switch (actionType) {
    case "Upload":
      modalContent = (
        <UploadDocumentModal
          isOpen={isModalVisible}
          onClose={modalCloseHandler}
          onUploaded={submitHandler}
        />
      );
      break;

    case "Delete":
      modalContent = (
        <DeleteDocumentModal
          isOpen={isModalVisible}
          onClose={modalCloseHandler}
          onConfirm={deleteDocHandler}
          document={activeDoc}
        />
      );
      break;

    case "Edit":
      modalContent = (
        <UploadDocumentModal
          isOpen={isModalVisible}
          onClose={modalCloseHandler}
          document={activeDoc}
          onSaved={(editData) => editDocHandler(null, editData)}
        />
      );
      break;

    case "Preview":
      modalContent = (
        <PreviewDocumentModal
          isOpen={isModalVisible}
          onClose={modalCloseHandler}
          document={activeDoc}
        />
      );
      break;

    case "Share":
      modalContent = (
        <ShareDocumentModal
          isOpen={isModalVisible}
          onClose={modalCloseHandler}
          document={activeDoc}
          shareUrl={activeDoc?.storagePath}
          onDone={modalCloseHandler}
        />
      );
      break;

    default:
      modalContent = null;
      break;
  }

  return ReactDOM.createPortal(
    <>{modalContent}</>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
