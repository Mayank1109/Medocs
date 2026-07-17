import { useState } from "react";
import {
  IconX,
  IconDownload,
  IconShare,
  IconZoomIn,
  IconZoomOut,
  IconMaximize,
  IconInfo,
  IconFilePdf,
  IconFileImage,
  IconPlusSmall,
  IconSend,
  IconSparkleSmall,
} from "../../icons/AppIcons";
import "./PreviewDocumentModal.css";

const CBC_ROWS = [
  { test: "Haemoglobin", result: "14.2 g/dL", range: "13 – 17", flag: "good" },
  { test: "WBC", result: "7.1 K/µL", range: "4 – 11", flag: "good" },
  { test: "Platelets", result: "245 K/µL", range: "150 – 400", flag: "good" },
];

const LIPID_ROWS = [
  {
    test: "Total cholesterol",
    result: "215 mg/dL",
    range: "<200",
    flag: "warn",
  },
  { test: "LDL", result: "138 mg/dL", range: "<130", flag: "warn" },
  { test: "HDL", result: "52 mg/dL", range: ">40", flag: "good" },
  { test: "Triglycerides", result: "142 mg/dL", range: "<150", flag: "good" },
];

const THYROID_ROWS = [
  { test: "TSH", result: "2.4 mIU/L", range: "0.5 – 5", flag: "good" },
];

const SEED_MESSAGES = [
  {
    role: "ai",
    node: (
      <>
        Hi Mayank! I've read your blood test. Your{" "}
        <span className="hl-good">CBC values look normal</span>. However, your{" "}
        <span className="hl-warn">
          LDL and total cholesterol are slightly elevated
        </span>
        . Want me to explain what that means?
      </>
    ),
  },
  { role: "user", text: "Yes, what does high LDL mean?" },
  {
    role: "ai",
    node: (
      <>
        LDL is often called &ldquo;bad cholesterol.&rdquo; Your reading of{" "}
        <span className="hl-warn">138 mg/dL</span> is slightly above the ideal
        limit of 130. Over time, high LDL can increase risk of arterial plaque.
        Dietary changes like reducing saturated fat often help.
      </>
    ),
  },
];

const SUGGESTIONS = [
  "Is my cholesterol dangerous?",
  "Compare with my last report",
  "What foods should I avoid?",
];

/**
 * Props:
 *  - isOpen, onClose
 *  - document: { name, category, fileType, size, uploadedDate, accent }
 *
 * NOTE: the report content (Apollo Diagnostics letterhead, CBC/lipid/
 * thyroid tables) is a hand-built mock, not a real PDF renderer — it
 * exists to make the preview feel real for this one seeded document.
 * Wiring an actual file viewer (react-pdf, an <iframe>, etc.) is a
 * separate integration task. The Ask AI thread here is also its own
 * scoped mini-chat, seeded with one example exchange — it doesn't share
 * state with the main AI Assistant page.
 */
export default function PreviewDocumentModal({ isOpen, onClose, document }) {
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [messages, setMessages] = useState(SEED_MESSAGES);
  const [input, setInput] = useState("");

  if (!isOpen || !document) return null;

  const isImage = document.fileType === "JPG" || document.fileType === "PNG";

  function sendMessage(text) {
    const value = text ?? input;
    if (!value.trim()) return;
    setMessages((m) => [...m, { role: "user", text: value }]);
    setInput("");
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
        <div className="preview-modal__header">
          <span
            className={`doc-icon-v2 doc-icon-v2--sm doc-icon-v2--${document.accent}`}
          >
            {isImage ? <IconFileImage /> : <IconFilePdf />}
          </span>
          <div className="preview-modal__header-info">
            <h2>{document.name}</h2>
            <p>
              {document.category} · {document.fileType} · {document.size} ·
              Uploaded {document.uploadedDate}
            </p>
          </div>
          <div className="preview-modal__header-actions">
            <button type="button" className="preview-header-btn">
              <IconDownload /> Download
            </button>
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
          {/* ---------- Left: viewer ---------- */}
          <div className="preview-modal__main">
            <div className="preview-toolbar">
              <button
                type="button"
                className="toolbar-btn"
                onClick={() => setZoom((z) => Math.max(60, z - 10))}
                aria-label="Zoom out"
              >
                <IconZoomOut />
              </button>
              <span className="preview-toolbar__page">{page} / 2</span>
              <button
                type="button"
                className="toolbar-btn toolbar-btn--accent"
                onClick={() => setZoom((z) => Math.min(150, z + 10))}
                aria-label="Zoom in"
              >
                <IconZoomIn />
              </button>
              <button type="button" className="toolbar-btn">
                <IconMaximize />
              </button>
            </div>

            <div className="preview-canvas">
              <div
                className="report-page"
                style={{ transform: `scale(${zoom / 100})` }}
              >
                {page === 1 ? (
                  <>
                    <div className="report-page__letterhead">
                      <div className="report-page__logo">
                        Apollo<span>Diagnostics</span>
                      </div>
                      <div className="report-page__patient">
                        <div>
                          <strong>Patient:</strong> Mayank Chauhan
                        </div>
                        <div>DOB: 12 Mar 2000 &nbsp;|&nbsp; Gender: Male</div>
                        <div>Report date: 3 Jun 2026</div>
                      </div>
                    </div>

                    <ReportSection
                      title="Complete blood count"
                      rows={CBC_ROWS}
                    />
                    <ReportSection title="Lipid profile" rows={LIPID_ROWS} />
                    <ReportSection title="Thyroid" rows={THYROID_ROWS} />
                  </>
                ) : (
                  <div className="report-page__notes">
                    <h3>Additional remarks</h3>
                    <p>
                      All other parameters are within normal limits. Recommend
                      dietary review for lipid profile and follow-up panel in 3
                      months.
                    </p>
                    <p className="report-page__signature">
                      — Dr. A. Sharma, MD Pathology
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="preview-thumbnails">
              <button
                type="button"
                className={`preview-thumb${page === 1 ? " active" : ""}`}
                onClick={() => setPage(1)}
              >
                <span className="preview-thumb__mock" />
                <span className="preview-thumb__label">1</span>
              </button>
              <button
                type="button"
                className={`preview-thumb${page === 2 ? " active" : ""}`}
                onClick={() => setPage(2)}
              >
                <span className="preview-thumb__mock preview-thumb__mock--alt" />
                <span className="preview-thumb__label">2</span>
              </button>
              <button
                type="button"
                className="preview-thumb preview-thumb--add"
                title="Adding pages isn't wired up yet"
              >
                <IconPlusSmall />
                <span className="preview-thumb__label">Add page</span>
              </button>
            </div>
          </div>

          {/* ---------- Right: Ask AI ---------- */}
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
                    {m.node ?? m.text}
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

function ReportSection({ title, rows }) {
  return (
    <div className="report-page__section">
      <h4>{title}</h4>
      <div className="report-page__table">
        <div className="report-page__row report-page__row--head">
          <span>Test</span>
          <span>Result</span>
          <span>Reference Range</span>
        </div>
        {rows.map((r) => (
          <div className="report-page__row" key={r.test}>
            <span>{r.test}</span>
            <span
              className={
                r.flag === "warn"
                  ? "report-page__result--warn"
                  : "report-page__result--good"
              }
            >
              {r.result}
            </span>
            <span className="report-page__range">{r.range}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
