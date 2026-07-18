import { useState } from "react";
import {
  IconX,
  IconDownload,
  IconShare,
  IconInfo,
  IconFilePdf,
  IconFileImage,
  IconSend,
} from "../../icons/AppIcons";
import { getAccent } from "../../data/documents";
import "./PreviewDocumentModal.css";

const SEED_MESSAGES = [
  {
    role: "ai",
    text: "Ask me anything about this document once you've had a look — I can help summarize or explain what's in it.",
  },
];

const SUGGESTIONS = [
  "Summarize this document",
  "What are the key values?",
  "Explain this in plain language",
];

export default function PreviewDocumentModal({ isOpen, onClose, document }) {
  const [messages, setMessages] = useState(SEED_MESSAGES);
  const [input, setInput] = useState("");

  if (!isOpen || !document) return null;

  const isImage = document.fileType === "JPG" || document.fileType === "PNG";
  const isPdf = document.fileType === "PDF";
  const accent = getAccent(document);

  function sendMessage(text) {
    const value = text ?? input;
    if (!value.trim()) return;
    setMessages((m) => [...m, { role: "user", text: value }]);
    setInput("");
    // Note: this thread is still a static mock — no real AI call wired yet.
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
        <div className="preview-modal__header">
          <span
            className={`doc-icon-v2 doc-icon-v2--sm doc-icon-v2--${accent}`}
          >
            {isImage ? <IconFileImage /> : <IconFilePdf />}
          </span>
          <div className="preview-modal__header-info">
            <h2>{document.name}</h2>
            <p>
              {document.category} · {document.fileType} · {document.size} ·
              Uploaded {document.date}
            </p>
          </div>
          <div className="preview-modal__header-actions">
            <a
              href={document.storagePath}
              download={document.name}
              className="preview-header-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconDownload /> Download
            </a>
            <button type="button" className="preview-header-btn">
              <IconShare /> Share
            </button>
            <button
              type="button"
              className="upload-modal__close"
              onClick={onClose}
              aria-label="Close"
            >
              <IconX />
            </button>
          </div>
        </div>

        <div className="preview-modal__body">
          <div className="preview-modal__main">
            <div className="preview-canvas preview-canvas--real">
              {isPdf && (
                <iframe
                  src={`${document.storagePath}#view=FitH`}
                  title={document.name}
                  className="preview-file-frame"
                />
              )}
              {isImage && (
                <img
                  src={document.storagePath}
                  alt={document.name}
                  className="preview-file-image"
                />
              )}
              {!isPdf && !isImage && (
                <div className="preview-unsupported">
                  <p>Preview isn't available for {document.fileType} files.</p>
                  <a
                    href={document.storagePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                  >
                    Open file
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="preview-modal__sidebar">
            <div className="preview-chat__header">
              <span className="preview-chat__title">
                <span className="preview-chat__dot" />
                Ask AI
              </span>
              <span className="preview-chat__about">about this report</span>
            </div>

            <div className="preview-chat__thread">
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div className="chat-bubble--user preview-chat__user" key={i}>
                    {m.text}
                  </div>
                ) : (
                  <div className="chat-bubble--ai preview-chat__ai" key={i}>
                    {m.text}
                  </div>
                ),
              )}
            </div>

            <div className="preview-chat__suggestions">
              {SUGGESTIONS.map((s) => (
                <button
                  type="button"
                  className="chip preview-chat__suggestion"
                  key={s}
                  onClick={() => sendMessage(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="preview-chat__input-row">
              <input
                type="text"
                placeholder="Ask anything about your report…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                type="button"
                className="preview-chat__send"
                onClick={() => sendMessage()}
                aria-label="Send"
              >
                <IconSend />
              </button>
            </div>
          </div>
        </div>

        <div className="preview-modal__footer">
          <IconInfo />
          This preview is for reference only. Please consult your doctor for
          medical advice.
        </div>
      </div>
    </div>
  );
}
