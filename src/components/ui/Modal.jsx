import { useSelector } from "react-redux";
import { useDocumentActions } from "../../hooks/useDocuments";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import UploadDocumentModal from "./UploadDocumentModal";
import { useOptions } from "../../hooks/useOptions";
import DeleteDocumentModal from "./DeleteDocumentModal";
import PreviewDocumentModal from "./PreviewDocumentModal";

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
  console.log(
    "switch actionType:",
    JSON.stringify(actionType),
    typeof actionType,
  );

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
      console.log("Edit modal");
      //   modalContent = (

      //   );
      break;

    case "Preview":
      console.log("modalData: ", modalData);
      console.log("actionType: ", actionType);
      modalContent = (
        <PreviewDocumentModal
          isOpen={isModalVisible}
          onClose={modalCloseHandler}
          document={activeDoc}
        />
      );
      break;

    default:
      modalContent = (
        <>
          <h1>This is the default case , just in case</h1>
          <button className="modal__btn">Close</button>
        </>
      );
      break;
  }

  return ReactDOM.createPortal(
    <>{modalContent}</>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
