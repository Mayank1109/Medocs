import { useSelector } from "react-redux";
import { useDocumentActions } from "../../hooks/useDocuments";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import UploadDocumentModal from "./UploadDocumentModal";
import { useOptions } from "../../context/OptionsProvider";
import DeleteDocumentModal from "./DeleteDocumentModal";
import PreviewDocumentModal from "./PreviewDocumentModal";
import ShareDocumentModal from "./ShareDocumentModal";
import ProfileEditModal from "./ProfileEditModal";
import { useProfileActions } from "../../hooks/useProfileActions";
import DeleteAccountModal from "./deleteAccountModal";

const Modal = () => {
  const {
    submitHandler,
    deleteDocHandler,
    editDocHandler,
    modalCloseHandler,
    downloadDocHandler,
    printDocHandler,
  } = useDocumentActions();
  const {
    profile,
    editProfileHandler,
    modalCloseHandler: closeProfileModal,
  } = useProfileActions();
  const { actionType, isModalVisible } = useSelector((state) => state.modal);
  const modalData = useSelector((state) => state.modal.data);
  const { payload } = useOptions();

  let modalContent = null;
  // Actions that explicitly provide modal data (such as a newly uploaded
  // document) must not be overridden by the document left in the options menu.
  const activeDoc = modalData ?? payload;

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

    case "EditPersonalInfo":
      modalContent = (
        <ProfileEditModal
          isOpen={isModalVisible}
          onClose={closeProfileModal}
          onSaved={editProfileHandler}
          section="personal"
          profile={profile}
        />
      );
      break;

    case "EditHealthInfo":
      modalContent = (
        <ProfileEditModal
          isOpen={isModalVisible}
          onClose={closeProfileModal}
          onSaved={editProfileHandler}
          section="health"
          profile={profile}
        />
      );
      break;

    case "EditEmergencyContact":
      modalContent = (
        <ProfileEditModal
          isOpen={isModalVisible}
          onClose={closeProfileModal}
          onSaved={editProfileHandler}
          section="emergencyContact"
          profile={profile}
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

    case "Analyze":
      modalContent = (
        <PreviewDocumentModal
          isOpen={isModalVisible}
          onClose={modalCloseHandler}
          document={activeDoc}
          autoAnalyze
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

    case "DeleteAccount":
      modalContent = (
        <DeleteAccountModal
          isOpen={isModalVisible}
          onClose={closeProfileModal}
          onConfirm={deleteAccountHandler}
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
