import React, { useState } from "react";
import "./modal.css";
import ReactDOM from "react-dom";
import axios from "axios";
import PopOver from "../../ui/popover";
import { modalActions } from "../../store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { popupActions } from "../../store/componentSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const [loginStatus, setLoginStatus] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [labName, setLabName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [dateName, setDateName] = useState("");
  const [docFile, setdocFile] = useState("");

  const selectedRow = useSelector((state) => state.option.selectedRow);
  const isPopupVisible = useSelector((state) => state.popup.isPopupVisible);
  const actionType = useSelector((state) => state.modal.actionType);
  const ModalCloseHandler = (event) => {
    event.preventDefault();

    dispatch(modalActions.hide());
  };

  const deleteDocHandler = async (event) => {
    event.preventDefault();
    const idToDelete = selectedRow;
    try {
      await fetch(`http://localhost:7000/dashboard/${idToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: idToDelete }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("document delted successfully");
            dispatch(modalActions.hide());
          } else {
            throw new Error("Failed to delete document");
          }
        })
        .catch((error) => {
          console.error("Error deleting document:", error);
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file_name", fileName);
    formData.append("lab", labName);
    formData.append("date", dateName);
    formData.append("doctor", doctorName);
    formData.append("file", docFile);

    if (!fileName || !labName || !dateName || !doctorName || !docFile) {
      setMessage("field invalid or empty!!");
      setLoginStatus("fail");
      dispatch(popupActions.display());

      isPopupVisible && <PopOver mssg={message} status={loginStatus} />;

      return;
    }

    axios
      .post("http://localhost:7000/dashboard", formData)
      .then((res) => {})
      .catch((err) => console.log(err));

    dispatch(modalActions.hide());
  };
  let modalContent = null;
  switch (actionType) {
    case "upload":
      modalContent = (
        <>
          {isPopupVisible && <PopOver mssg={message} status={loginStatus} />}

          <input
            type="text"
            id="Name"
            placeholder="File Name"
            onChange={(e) => setFileName(e.target.value)}
            required
          />
          <input
            type="text"
            id="Lab"
            placeholder="Lab Name"
            onChange={(e) => setLabName(e.target.value)}
            required
          />
          <input
            type="date"
            id="Date"
            placeholder="Date"
            onChange={(e) => setDateName(e.target.value)}
            required
          />
          <input
            type="text"
            id="Doctor"
            placeholder="Doctor's Name"
            onChange={(e) => setDoctorName(e.target.value)}
            required
          />
          <input
            type="file"
            id="file"
            onChange={(e) => setdocFile(e.target.files[0])}
            required
          />
          <button className="modal__btn" onClick={submitHandler}>
            Upload
          </button>
        </>
      );
      break;

    case "delete":
      modalContent = (
        <>
          <h1>Move File to bin ?</h1>
          <button className="modal__btn" onClick={deleteDocHandler}>
            Confirm
          </button>
          <button className="modal__btn" onClick={ModalCloseHandler}>
            Cancel
          </button>
        </>
      );
      break;

    case "edit":
      modalContent = <>will do it later</>;
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
    <>
      <form className="modal hidden" method="POST">
        <div className="flex">
          <button className="modal__btn-close" onClick={ModalCloseHandler}>
            ⨉
          </button>
        </div>

        {modalContent}
      </form>

      <div className="overlay hidden" onClick={ModalCloseHandler}></div>
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
