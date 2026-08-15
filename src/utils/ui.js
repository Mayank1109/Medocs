// UI and component utilities
import { popupActions } from "../store/componentSlice";
import { modalActions } from "../store/modalSlice";
import store from "../store/store";

export const showMessage = (status = "error", mssg) => {
  store.dispatch(popupActions.display({ status, message: mssg }));
};

export const modalDisplayHandler = (event, actionType, payload = null) => {
  event.preventDefault();
  store.dispatch(modalActions.display({ actionType, payload }));
};

export function notImplementedToast(toast, feature = "This feature") {
  toast.info(
    "Coming soon",
    `${feature} isn't available yet — we're actively working on it.`,
  );
}

// File accent color based on type/category
export function getFileAccent({ fileType, category }) {
  if (fileType === "JPG" || fileType === "PNG" || fileType === "image")
    return "green";
  if (category === "rx") return "violet";
  if (category === "cert") return "blue";
  return "red";
}
