import Regex from "../data/validationData";
import { popupActions } from "../store/componentSlice";
import { modalActions } from "../store/modalSlice";
import store from "../store/store";
import { createSelector } from "@reduxjs/toolkit";

const showMessage = (status = "error", mssg) => {
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

const modalDisplayHandler = (event, actionType, payload = null) => {
  event.preventDefault();
  store.dispatch(modalActions.display({ actionType, payload }));
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

function notImplementedToast(toast, feature = "This feature") {
  toast.info(
    "Coming soon",
    `${feature} isn't available yet — we're actively working on it.`,
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function initialsOf(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatBytes(bytes) {
  if (!bytes) return "0 MB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

const STORAGE_CAP_BYTES = 1024 * 1024 * 1024;

export {
  modalDisplayHandler,
  profileCompletionPercentage,
  showMessage,
  getFileAccent,
  notImplementedToast,
  formatDate,
  initialsOf,
  formatBytes,
  STORAGE_CAP_BYTES,
};
