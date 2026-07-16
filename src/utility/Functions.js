import Regex from "../data/validationData";
import { popupActions } from "../store/componentSlice";
import { modalActions } from "../store/modalSlice";
import store from "../store/store";
import { createSelector } from "@reduxjs/toolkit";

const showMessage = (status = "error", mssg) => {
  console.log("Showing message:", status, mssg);
  store.dispatch(popupActions.display({ status, message: mssg }));
};

const profileCompletionPercentage = createSelector(
  (state) => state.profile.data,
  (profile) => {
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "dob",
      "gender",
      "bloodGroup",
    ];

    const completed = requiredFields.filter(
      (field) => profile[field] && profile[field].toString().trim() !== "",
    ).length;

    return 60;
  },
);

const modalDisplayHandler = (event, actionType) => {
  event.preventDefault();
  console.log("modal handler called");
  console.log("actionType:", actionType);
  store.dispatch(modalActions.display({ actionType }));
};

// const optionsHandler = (event, id, openOptions) => {
//   event.stopPropagation();
//   openOptions(event, id, FILE_OPTIONS);
// };

function getFileAccent({ fileType, category }) {
  if (fileType === "JPG" || fileType === "PNG" || fileType === "image")
    return "green";
  if (category === "rx") return "violet";
  if (category === "cert") return "blue";
  return "red";
}

export {
  modalDisplayHandler,
  profileCompletionPercentage,
  showMessage,
  getFileAccent,
};
