import { useState, useEffect } from "react";
import {
  IconX,
  IconDownload,
  IconShare,
  IconInfo,
  IconFilePdf,
  IconFileImage,
  IconSend,
  IconSparkleSmall,
} from "../../icons/AppIcons";
import ReactMarkdown from "react-markdown";
import { getAccent } from "../../utils/document";
import { useDocumentAnalysis } from "../../hooks/useDocumentAnalysis";
import "./PreviewDocumentModal.css";
import AIThinkingIndicator from "./AIThinkingIndicator";
import { notImplementedToast } from "../../utils/ui";
import { useToast } from "../../hooks/useToast";
export default function PreviewDocumentModal({ isOpen, onClose, document }) {
  const { messages, loading, quotaReached, summarize, ask, reset } =
    useDocumentAnalysis();
  const [input, setInput] = useState("");
  const toast = useToast();
  useEffect(() => {
    reset();
    setInput("");
  }, [document?.id]);

  if (!isOpen || !document) return null;

  const isImage = document.fileType === "JPG" || document.fileType === "PNG";
  const isPdf = document.fileType === "PDF";
  const accent = getAccent(document);

  function handleSend() {
    const value = input.trim();
    if (!value || loading || quotaReached) return;
    setInput("");
    ask(document.id, value);
  }

  function handleShareClick(e) {
    e.preventDefault();
    notImplementedToast(toast, "Sharing");
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
            <button
              type="button"
              className="preview-header-btn"
              onClick={handleShareClick}
            >
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
              {messages.length === 0 && !loading && (
                <div className="preview-chat__ai chat-bubble--ai">
                  Get an AI summary, or ask a question about this document.
                </div>
              )}
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div className="chat-bubble--user preview-chat__user" key={i}>
                    {m.text}
                  </div>
                ) : (
                  <div
                    className={`chat-bubble--ai preview-chat__ai${m.isError ? " preview-chat__ai--error" : ""}`}
                    key={i}
                  >
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                  </div>
                ),
              )}
              {loading && (
                <AIThinkingIndicator subtext="Reading your document…" />
              )}
            </div>

            {messages.length === 0 && (
              <div className="preview-chat__suggestions">
                <button
                  type="button"
                  className={`chip preview-chat__suggestion${loading ? " button--loading" : ""}`}
                  onClick={() => summarize(document.id)}
                  disabled={loading || quotaReached}
                >
                  <IconSparkleSmall /> Summarize this document
                </button>
              </div>
            )}

            {quotaReached && (
              <div className="preview-chat__quota-banner">
                <IconInfo />
                You've reached today's AI usage limit. Please try again
                tomorrow.
              </div>
            )}

            <div className="preview-chat__input-row">
              <input
                type="text"
                placeholder={
                  quotaReached
                    ? "Daily limit reached"
                    : "Ask anything about your report…"
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={loading || quotaReached}
              />
              <button
                type="button"
                className="preview-chat__send"
                onClick={handleSend}
                disabled={loading || quotaReached}
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
