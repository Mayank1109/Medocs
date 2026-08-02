import { useState } from "react";
import {
  IconX,
  IconShare,
  IconEye,
  IconLock,
  IconPersonAdd,
  IconCopy,
  IconShieldCheck,
  IconCalendar,
  IconChevronDown,
  IconFilePdf,
  IconFileImage,
} from "../../icons/AppIcons";
import "./ShareDocumentModal.css";

const ACCESS_LEVELS = [
  {
    key: "view",
    label: "View only",
    sub: "Can view but cannot edit or download",
  },
  { key: "comment", label: "Can comment", sub: "Can view and leave comments" },
  { key: "edit", label: "Can edit", sub: "Can view, comment, and edit" },
];

export default function ShareDocumentModal({
  isOpen,
  onClose,
  document,
  shareUrl = "https://medocs.app/share/abc123def456",
  onDone,
}) {
  const [accessMode, setAccessMode] = useState("anyone"); // "anyone" | "invite"
  const [accessLevel, setAccessLevel] = useState("view");
  const [levelMenuOpen, setLevelMenuOpen] = useState(false);
  const [expiryOpen, setExpiryOpen] = useState(false);
  const [expiryDate, setExpiryDate] = useState("30 Jun 2026");
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordOn, setPasswordOn] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !document) return null;

  const isImage = document.fileType === "JPG" || document.fileType === "PNG";
  const meta = `${document.fileType} · ${document.size} · Uploaded ${document.date}`;
  const currentLevel = ACCESS_LEVELS.find((l) => l.key === accessLevel);

  function copyLink() {
    navigator.clipboard?.writeText(shareUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="share-modal" onClick={(e) => e.stopPropagation()}>
        <div className="share-modal__header">
          <span className="share-modal__icon">
            <IconShare />
          </span>
          <div>
            <h2>Share document</h2>
            <p>Share securely with doctors, clinics or anyone.</p>
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

        <div className="share-modal__body">
          <div className="file-card file-card--static">
            <span
              className={`doc-icon-v2 doc-icon-v2--sm doc-icon-v2--${document.accent}`}
            >
              {isImage ? <IconFileImage /> : <IconFilePdf />}
            </span>
            <div className="file-card__info">
              <div className="file-card__name">{document.name}</div>
              <div className="file-card__meta">{document.meta}</div>
            </div>
          </div>

          {/* ---------- Who can access ---------- */}
          <span className="share-section-label">Who can access</span>
          <div className="access-options">
            <button
              type="button"
              className={`access-option${accessMode === "anyone" ? " active" : ""}`}
              onClick={() => setAccessMode("anyone")}
            >
              <span className="access-option__radio" />

              <span className="access-option__text">
                <span className="access-option__title">
                  Anyone with the link
                </span>
                <span className="access-option__sub">
                  Anyone with the link can view
                </span>
              </span>
            </button>

            <button
              type="button"
              className={`access-option${accessMode === "invite" ? " active" : ""}`}
              onClick={() => setAccessMode("invite")}
            >
              <span className="access-option__radio" />

              <span className="access-option__text">
                <span className="access-option__title">
                  Only people I invite
                </span>
                <span className="access-option__sub">
                  Only invited people can access
                </span>
              </span>
            </button>
          </div>

          <div className="dropdown-row-wrap">
            <button
              type="button"
              className="dropdown-row"
              onClick={() => setLevelMenuOpen((v) => !v)}
            >
              <span className="dropdown-row__icon">
                <IconEye />
              </span>
              <span className="dropdown-row__text">
                <span className="dropdown-row__title">
                  {currentLevel.label}
                </span>
                <span className="dropdown-row__sub">{currentLevel.sub}</span>
              </span>
              <IconChevronDown />
            </button>
            {levelMenuOpen && (
              <div className="dropdown-row__menu">
                {ACCESS_LEVELS.map((l) => (
                  <button
                    type="button"
                    key={l.key}
                    className={`dropdown-row__option${accessLevel === l.key ? " active" : ""}`}
                    onClick={() => {
                      setAccessLevel(l.key);
                      setLevelMenuOpen(false);
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ---------- Link settings ---------- */}

          <div className="link-settings-grid">
            <div className="dropdown-row-wrap">
              <button
                type="button"
                className="dropdown-row"
                onClick={() => setExpiryOpen((v) => !v)}
              >
                <span className="dropdown-row__icon">
                  <IconCalendar />
                </span>
                <span className="dropdown-row__text">
                  <span className="dropdown-row__title">Expires on</span>
                  <span className="dropdown-row__sub">{expiryDate}</span>
                </span>
                <IconChevronDown />
              </button>
              {expiryOpen && (
                <div className="dropdown-row__menu">
                  {["30 Jun 2026", "7 days from now", "Never"].map((d) => (
                    <button
                      type="button"
                      key={d}
                      className={`dropdown-row__option${expiryDate === d ? " active" : ""}`}
                      onClick={() => {
                        setExpiryDate(d);
                        setExpiryOpen(false);
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ---------- Share link ---------- */}
          <span className="share-section-label">Share link</span>
          <div className="share-link-row">
            <input type="text" readOnly value={shareUrl} />
            <button
              type="button"
              className="button button--secondary share-link-row__copy"
              onClick={copyLink}
            >
              <IconCopy /> {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
        </div>

        <div className="share-modal__footer">
          <button type="button" className="share-modal__invite">
            <span className="share-modal__invite-icon">
              <IconPersonAdd />
            </span>
            Invite people
          </button>
          <div className="share-modal__footer-actions">
            <button
              type="button"
              className="button button--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="button" className="button" onClick={onDone}>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
