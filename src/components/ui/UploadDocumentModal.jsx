import { useState, useRef, useEffect } from "react";
import {
  IconX,
  IconUploadCloud,
  IconTrash,
  IconFilePdf,
  IconFileImage,
  IconCalendar,
  IconChevronRight,
  IconSparkleSmall,
} from "../../icons/AppIcons";
import { IconCheck, IconEye } from "../../icons/AuthIcons";
import { getFileAccent } from "../../utility/Functions";
import "./UploadDocumentModal.css";
import { ACCEPTED_TYPES, CATEGORIES, MAX_SIZE_MB } from "../../data/modalData";
import { useFieldValidation } from "../../hooks/useFieldValidation";

function formatSize(bytes) {
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function extOf(filename) {
  return filename.split(".").pop().toLowerCase();
}

function todayFormatted() {
  return new Date().toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function UploadDocumentModal({ isOpen, onClose, onUploaded }) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [docName, setDocName] = useState("");
  const [category, setCategory] = useState("lab");
  const [docDate, setDocDate] = useState(todayFormatted());
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);
  const { validateInputHandler, validateFormHandler } = useFieldValidation();

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setFile(null);
      setError("");
      setDocName("");
      setCategory("lab");
      setDocDate(todayFormatted());
      setDescription("");
      setSuccess(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose?.();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function validateAndSetFile(f) {
    if (!f) return;
    const ext = extOf(f.name);
    if (!ACCEPTED_TYPES.includes(ext)) {
      setError(
        `Unsupported format ".${ext}". Try PDF, DOC, DOCX, JPG, or PNG.`,
      );
      return;
    }
    if (f.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File exceeds ${MAX_SIZE_MB} MB. Try a smaller file.`);
      return;
    }
    setError("");
    setFile(f);
    setDocName(f.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " "));
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    validateAndSetFile(f);
  }

  function handleUpload() {
    const isValid = validateFormHandler({
      fileName: docName,
      description,
    });
    if (!isValid) return;
    console.log("handleUpload fired", {
      file,
      docName,
      category,
      docDate,
      description,
    });
    setSuccess(true);
    onUploaded?.({
      file,
      name: docName,
      category,
      date: docDate,
      description,
    });
  }

  const accent = getFileAccent({
    fileType: file ? extOf(file.name).toUpperCase() : "PDF",
    category,
  });
  const isImage = file && ["jpg", "png"].includes(extOf(file.name));

  return (
    <div className="modal-backdrop" onClick={onClose}>
      {success ? (
        <div className="upload-success" onClick={(e) => onClose(e)}>
          <button
            type="button"
            className="upload-modal__close"
            onClick={onClose}
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

          <h2 className="upload-success__title">Upload complete!</h2>
          <p className="upload-success__sub">
            Your document has been uploaded successfully.
          </p>

          <div className="upload-success__card">
            <span
              className={`doc-icon-v2 doc-icon-v2--sm doc-icon-v2--${accent}`}
            >
              {isImage ? <IconFileImage /> : <IconFilePdf />}
            </span>
            <div className="upload-success__card-info">
              <div className="upload-success__card-name">
                {docName || "Document"}
              </div>
              <div className="upload-success__card-meta">
                {file ? extOf(file.name).toUpperCase() : "PDF"} ·{" "}
                {file ? formatSize(file.size) : ""} · Uploaded just now
              </div>
            </div>
            <IconChevronRight />
          </div>

          <div className="upload-success__actions">
            <button type="button" className="button button--secondary">
              <IconEye /> View document
            </button>
            <button type="button" className="button">
              <IconSparkleSmall /> Ask AI about this report
            </button>
          </div>
        </div>
      ) : (
        <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
          <div className="upload-modal__header">
            <div>
              <h2>Upload document</h2>
              <p>
                Step {step} of 2 —{" "}
                {step === 1 ? "Select your file" : "Add details"}
              </p>
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

          <div className="upload-stepper">
            <div className={`upload-stepper__step${step >= 1 ? " done" : ""}`}>
              <span className="upload-stepper__circle">
                {step > 1 ? <IconCheck /> : "1"}
              </span>
              Select file
            </div>
            <div className={`upload-stepper__line${step > 1 ? " done" : ""}`} />
            <div
              className={`upload-stepper__step${step === 2 ? " current" : ""}`}
            >
              <span className="upload-stepper__circle">2</span>
              Add details
            </div>
          </div>

          <div className="upload-modal__body">
            {step === 1 ? (
              <>
                {!file ? (
                  <div
                    className={`dropzone${dragActive ? " active" : ""}`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                  >
                    <span className="dropzone__icon">
                      <IconUploadCloud />
                    </span>
                    <p className="dropzone__title">
                      Drag &amp; drop one or more files here
                    </p>
                    <p className="dropzone__browse">
                      or <span>browse from your computer</span>
                    </p>
                    <p className="dropzone__hint">
                      Supported formats (Max {MAX_SIZE_MB} MB each)
                    </p>
                    <div className="dropzone__formats">
                      {["PDF", "DOC", "DOCX", "JPG", "PNG"].map((f) => (
                        <span key={f} className="dropzone__format-chip">
                          {f}
                        </span>
                      ))}
                    </div>
                    <input
                      ref={inputRef}
                      type="file"
                      hidden
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => validateAndSetFile(e.target.files?.[0])}
                    />
                  </div>
                ) : (
                  <>
                    <div className="file-card">
                      <span
                        className={`doc-icon-v2 doc-icon-v2--sm doc-icon-v2--${accent}`}
                      >
                        {isImage ? <IconFileImage /> : <IconFilePdf />}
                      </span>
                      <div className="file-card__info">
                        <div className="file-card__name">{file.name}</div>
                        <div className="file-card__meta">
                          {extOf(file.name).toUpperCase()} ·{" "}
                          {formatSize(file.size)}
                        </div>
                      </div>
                      <span className="file-card__check">
                        <IconCheck />
                      </span>
                    </div>
                    <button
                      type="button"
                      className="file-card__remove"
                      onClick={() => setFile(null)}
                    >
                      <IconTrash /> Remove
                    </button>

                    <div className="upload-banner">
                      <span className="upload-banner__icon">
                        <IconCheck />
                      </span>
                      <div>
                        <div className="upload-banner__title">
                          File uploaded successfully
                        </div>
                        <div className="upload-banner__sub">
                          Click Next to add document details.
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {error && <p className="upload-modal__error">{error}</p>}
              </>
            ) : (
              <>
                <div className="file-card file-card--compact">
                  <span
                    className={`doc-icon-v2 doc-icon-v2--sm doc-icon-v2--${accent}`}
                  >
                    {isImage ? <IconFileImage /> : <IconFilePdf />}
                  </span>
                  <div className="file-card__info">
                    <div className="file-card__name">{file?.name}</div>
                    <div className="file-card__meta">
                      {file ? extOf(file.name).toUpperCase() : ""} ·{" "}
                      {file ? formatSize(file.size) : ""}
                    </div>
                  </div>
                </div>

                <div className="field-block">
                  <label className="field-block__label">Document name</label>
                  <input
                    type="text"
                    className="field-block__input"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    onBlur={validateInputHandler}
                  />
                  <p className="field-block__hint">
                    You can rename your document.
                  </p>
                </div>

                <div className="field-block">
                  <label className="field-block__label">Category</label>
                  <div className="category-pills">
                    {CATEGORIES.map((c) => (
                      <button
                        type="button"
                        key={c.key}
                        className={`category-pill${category === c.key ? " active" : ""}`}
                        onClick={() => setCategory(c.key)}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="field-block">
                  <label className="field-block__label">
                    Document date (optional)
                  </label>
                  <div className="field-block__date">
                    <IconCalendar />
                    <input
                      type="text"
                      value={docDate}
                      onChange={(e) => setDocDate(e.target.value)}
                    />
                    {docDate && (
                      <button
                        type="button"
                        onClick={() => setDocDate("")}
                        aria-label="Clear date"
                      >
                        <IconX />
                      </button>
                    )}
                  </div>
                </div>

                <div className="field-block">
                  <label className="field-block__label">
                    Description (optional)
                  </label>
                  <textarea
                    className="field-block__textarea"
                    rows={3}
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={validateInputHandler}
                    placeholder="e.g. Full blood panel — lipid, thyroid, CBC."
                  />
                  <p className="field-block__hint">
                    Helps you find this document later.
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="upload-modal__footer">
            {step === 2 && (
              <button
                type="button"
                className="button button--secondary"
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
            )}
            <button
              type="button"
              className="button button--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            {step === 1 ? (
              <button
                type="button"
                className="button"
                disabled={!file}
                onClick={() => setStep(2)}
              >
                Next →
              </button>
            ) : (
              <button type="button" className="button" onClick={handleUpload}>
                <IconUploadCloud /> Upload document
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
