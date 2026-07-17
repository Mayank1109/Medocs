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

  const isDeleting = payload?._id && payload._id === deletingId;

  return ReactDOM.createPortal(
    <>
      <div ref={modalRef} className="options-modal">
        <button
          className="modal__btn-close"
          onClick={() => closeOptions()}
          aria-label="Close"
        >
          <IconX />
        </button>

        <ul>
          {options.map((option, index) => {
            const Icon = option.icon;
            const isDanger = option.type === "Delete";
            const showDivider = option.dividerBefore;
            const disabled = isDanger && isDeleting;

            return (
              <div key={option.type}>
                {showDivider && (
                  <li
                    className="options-modal__divider"
                    aria-hidden="true"
                    style={{
                      listStyle: "none",
                      height: "1px",
                      backgroundColor: "var(--border)",
                      margin: "6px 4px",
                    }}
                  />
                )}
                <li
                  onClick={(event) => {
                    if (disabled) return;
                    handleActionClick(event, option.type);
                  }}
                  className={`flex${isDanger ? " options-modal__item--danger" : ""}${disabled ? " options-modal__item--loading" : ""}`}
                >
                  {Icon && (
                    <Icon
                      height="18"
                      width="18"
                      fill="none"
                      stroke={isDanger ? "var(--danger)" : "var(--text-color)"}
                    />
                  )}
                  <p>{disabled ? "Moving to bin…" : option.label}</p>
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
