import { useState } from "react";
import {
  IconX,
  IconTrash,
  IconFilePdf,
  IconFileImage,
} from "../../icons/AppIcons";
import { IconCheck } from "../../icons/AuthIcons";
import { getAccent } from "../../utils/document";
import "./DeleteDocumentModal.css";

export default function DeleteDocumentModal({
  isOpen,
  onClose,
  document,
  onConfirm,
  onViewBin,
}) {
  const [deleted, setDeleted] = useState(false);
  const [deleting, setDeleting] = useState(false);
  if (!isOpen || !document) return null;

  function resetAndClose() {
    setDeleted(false);
    onClose?.();
  }

  async function handleConfirm() {
    setDeleting(true);
    try {
      await onConfirm?.();
      setDeleted(true);
    } catch (err) {
      // deleteDocHandler already shows a toast on failure — just stay on this screen
    } finally {
      setDeleting(false);
    }
  }

  const isImage = document.fileType === "JPG" || document.fileType === "PNG";
  const accent = getAccent(document);
  const meta = `${document.fileType} · ${document.size} · Uploaded ${document.date}`;

  return (
    <div className="modal-backdrop" onClick={resetAndClose}>
      {!deleted ? (
        <div
          className="modal delete-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal__header">
            <h2 className="modal__title">Delete document</h2>
            <button
              type="button"
              className="upload-modal__close"
              onClick={resetAndClose}
              aria-label="Close"
            >
              <IconX />
            </button>
          </div>

          <div className="modal__body">
            <span className="delete-modal__icon">
              <IconTrash />
            </span>
            <h3 className="delete-modal__heading">Move to bin?</h3>
            <p className="delete-modal__sub">
              This document will be moved to the bin. You can restore it within
              30 days.
            </p>

            <div className="file-card file-card--static">
              <span
                className={`doc-icon-v2 doc-icon-v2--sm doc-icon-v2--${accent}`}
              >
                {isImage ? <IconFileImage /> : <IconFilePdf />}
              </span>
              <div className="file-card__info">
                <div className="file-card__name">{document.name}</div>
                <div className="file-card__meta">{meta}</div>
              </div>
            </div>
          </div>

          <div className="modal__footer delete-modal__footer">
            <button
              type="button"
              className="button button--secondary"
              onClick={resetAndClose}
              disabled={deleting}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`button button--danger${deleting ? " button--loading" : ""}`}
              onClick={handleConfirm}
              disabled={deleting}
            >
              <IconTrash /> Move to bin
            </button>
          </div>
        </div>
      ) : (
        <div
          className="upload-success delete-success"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="upload-modal__close"
            onClick={resetAndClose}
            aria-label="Close"
          >
            <IconX />
          </button>

          <div className="upload-success__badge">
            <span className="upload-success__dot upload-success__dot--1" />
            <span className="upload-success__dot upload-success__dot--2" />
            <span className="upload-success__dot upload-success__dot--3" />
            <span className="upload-success__dot upload-success__dot--4" />
            <span className="upload-success__dot upload-success__dot--5" />
            <span className="upload-success__dot upload-success__dot--6" />
            <span className="upload-success__check">
              <IconCheck />
            </span>
          </div>

          <h2 className="upload-success__title">Moved to bin</h2>
          <p className="upload-success__sub">
            This document has been moved to the bin. You can restore it anytime
            within 30 days.
          </p>

          <div className="upload-success__card">
            <span
              className={`doc-icon-v2 doc-icon-v2--sm doc-icon-v2--${accent}`}
            >
              {isImage ? <IconFileImage /> : <IconFilePdf />}
            </span>
            <div className="upload-success__card-info">
              <div className="upload-success__card-name">{document.name}</div>
              <div className="upload-success__card-meta">{meta}</div>
            </div>
          </div>

          <button
            type="button"
            className="button delete-success__view-btn"
            onClick={onViewBin}
          >
            View in bin
          </button>
        </div>
      )}
    </div>
  );
}
