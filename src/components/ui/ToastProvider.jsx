import { useCallback, useRef, useState } from "react";
import { ToastContext } from "../../hooks/useToast";
import { IconX } from "../../icons/AppIcons";

let idCounter = 0;

export function ToastProvider({ children, duration = 4500 }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const push = useCallback(
    (variant, title, message) => {
      const id = ++idCounter;
      setToasts((t) => [...t, { id, variant, title, message }]);
      timers.current[id] = setTimeout(() => dismiss(id), duration);
    },
    [duration, dismiss],
  );

  const api = {
    success: (title, message) => push("success", title, message),
    error: (title, message) => push("error", title, message),
    warning: (title, message) => push("warning", title, message),
    info: (title, message) => push("info", title, message),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="toast-stack">
        {toasts.map((t) => (
          <div className={`toast toast--${t.variant}`} key={t.id}>
            <span className={`toast__dot toast__dot--${t.variant}`} />
            <div className="toast__body">
              <div className="toast__title">{t.title}</div>
              {t.message && <div className="toast__msg">{t.message}</div>}
            </div>
            <button
              type="button"
              className="toast__close"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
            >
              <IconX />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
