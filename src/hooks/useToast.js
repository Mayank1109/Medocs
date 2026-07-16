import { useDispatch } from "react-redux";
import { popupActions } from "../store/componentSlice";

export function useToast() {
  const dispatch = useDispatch();

  const showToast = (status, message, options = {}) => {
    dispatch(popupActions.display({ status, message, ...options }));
  };

  const dismissToast = (id) => dispatch(popupActions.dismiss(id));

  return { showToast, dismissToast };
}
