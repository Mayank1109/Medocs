import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { popupActions } from "../../store/componentSlice";
import { IconX } from "../../icons/AppIcons";
import "./Toast.css";

function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast.duration) return;
    const timer = setTimeout(() => onDismiss(toast.id), toast.duration);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div className={`toast toast--${toast.status}`} role="status">
      <span className="toast__dot" />
      <div className="toast__body">
        <p className="toast__title">{toast.title}</p>
        {toast.message ? (
          <p className="toast__message">{toast.message}</p>
        ) : null}
      </div>
      <button
        type="button"
        className="toast__close"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
      >
        <IconX />
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const toasts = useSelector((state) => state.popup.toasts);
  const dispatch = useDispatch();
  const handleDismiss = (id) => dispatch(popupActions.dismiss(id));

  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={handleDismiss} />
      ))}
    </div>
  );
}
