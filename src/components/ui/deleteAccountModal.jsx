import { useState } from "react";
import { IconX, IconTrash } from "../../icons/AppIcons";
import "./UploadDocumentModal.css";

export default function DeleteAccountModal({ isOpen, onClose, onConfirm }) {
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const isMatch = confirmText.trim() === "DELETE";

  if (!isOpen) return null;

  async function handleConfirm() {
    if (!isMatch) return;
    setDeleting(true);
    setError("");
    try {
      await onConfirm();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not delete your account. Please try again.",
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
        <div className="upload-modal__header">
          <div>
            <h2>Delete account</h2>
            <p>This action is permanent and cannot be undone.</p>
          </div>
          <button
            type="button"
            className="upload-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            <IconX />
          </button>
        </div>

        <div className="upload-modal__body">
          <p>
            This will permanently delete your account, all uploaded documents,
            AI analyses, and profile data. This cannot be reversed.
          </p>

          <div className="field-block">
            <label className="field-block__label">Type DELETE to confirm</label>
            <input
              type="text"
              className="field-block__input"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
              autoComplete="off"
            />
          </div>

          {error && <p className="upload-modal__error">{error}</p>}
        </div>

        <div className="upload-modal__footer">
          <button
            type="button"
            className="button button--secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`button button--danger${deleting ? " button--loading" : ""}`}
            onClick={handleConfirm}
            disabled={!isMatch || deleting}
          >
            <IconTrash /> Delete my account
          </button>
        </div>
      </div>
    </div>
  );
}
