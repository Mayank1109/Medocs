import ReactDOM from "react-dom";
import { useRef } from "react";
import { useOptions } from "../../hooks/useOptions";
import "./Options.css";
import { useDocumentActions } from "../../hooks/useDocuments";
import useContextMenuPosition from "../../hooks/useContextMenuPosition";
import { IconX } from "../../icons/AppIcons";

const Options = () => {
  const modalRef = useRef(null);
  const { handleActionClick, deletingId } = useDocumentActions();
  const { isOpen, options, anchorposition, payload, closeOptions } =
    useOptions();
  const position = useContextMenuPosition(modalRef, anchorposition, isOpen);

  if (!isOpen) return null;

  const isDeleting = payload?.id && payload.id === deletingId;

  return ReactDOM.createPortal(
    <>
      <div
        ref={modalRef}
        className="options-modal"
        style={{ top: position.top, left: position.left }}
      >
        <button
          className="options-modal__close"
          onClick={() => closeOptions()}
          aria-label="Close"
        >
          <IconX />
        </button>

        <ul>
          {options.map((option) => {
            const Icon = option.icon;
            const isDanger = option.type === "Delete";
            const showDivider = option.dividerBefore;
            const disabled = isDanger && isDeleting;

            return (
              <div key={option.type}>
                {showDivider && (
                  <li className="options-modal__divider" aria-hidden="true" />
                )}
                <li>
                  <button
                    type="button"
                    className={`options-modal__item${isDanger ? " options-modal__item--danger" : ""}${disabled ? " options-modal__item--loading" : ""}`}
                    onClick={(event) => {
                      if (disabled) return;
                      handleActionClick(event, option.type);
                    }}
                  >
                    {Icon && <Icon />}
                    {disabled ? "Moving to bin…" : option.label}
                  </button>
                </li>
              </div>
            );
          })}
        </ul>
      </div>

      <div className="overlay__choose" onClick={() => closeOptions()}></div>
    </>,
    document.getElementById("options-root"),
  );
};

export default Options;
