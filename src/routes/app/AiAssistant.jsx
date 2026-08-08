import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import ChatHistory from "../../components/ai/ChatHistory";
import ChatMessage from "../../components/ai/ChatMessage";
import ComparisonReport from "../../components/ai/ComparisonReport";
import {
  IconSparkleSmall,
  IconTrash,
  IconX,
  IconFilePdf,
  IconFileImage,
  IconStethoscope,
  IconTrendUp,
  IconPersonDoctor,
  IconLeaf,
  IconPerson,
  IconCompare,
  IconPaperclip,
  IconPlusSmall,
  IconMic,
  IconSend,
} from "../../icons/AppIcons";
import "./AiAssistant.css";
import { notImplementedToast } from "../../utility/Functions";
import { useToast } from "../../hooks/useToast";

const LDL_CONTENT = [
  {
    type: "p",
    text: 'LDL (Low-Density Lipoprotein) is often called "bad cholesterol" because high levels can lead to plaque buildup in your arteries over time.',
  },
  { type: "h4", text: "What it means:" },
  {
    type: "ul",
    items: [
      "High LDL increases the risk of heart disease and stroke.",
      "It can narrow your arteries and reduce blood flow.",
      "The higher it stays for a long time, the greater the risk.",
    ],
  },
  { type: "h4", text: "Common causes:" },
  {
    type: "ul",
    items: [
      "High saturated fat intake",
      "Lack of physical activity",
      "Overweight or obesity",
      "Smoking",
      "Family history",
    ],
  },
  { type: "h4", text: "What you can do:" },
  {
    type: "ul",
    items: [
      "Eat a heart-healthy diet (more fiber, less saturated fat)",
      "Exercise regularly",
      "Maintain a healthy weight",
      "Avoid smoking",
      "Take prescribed medication if advised by your doctor",
    ],
  },
  {
    type: "p",
    text: "Since your LDL has improved from 152 to 138 mg/dL, you're moving in the right direction! 🎉",
  },
];

const PLACEHOLDER_CONTENT = [
  {
    type: "p",
    text: "This is a saved conversation. Wire up real conversation history from your backend to load its messages here.",
  },
];

/**
 * Only "compare" and "ldl" have full seeded conversations (matching the
 * two reference screenshots). Every other history item shows a
 * placeholder — swap PLACEHOLDER_CONTENT for real data once you have a
 * conversations API.
 */
const SEEDED_CONVERSATIONS = {
  compare: {
    suggestions: [
      { icon: <IconStethoscope />, text: "What's still concerning?" },
      { icon: <IconTrendUp />, text: "What caused the improvement?" },
      { icon: <IconPersonDoctor />, text: "Should I see a doctor?" },
      { icon: <IconFilePdf />, text: "Generate summary PDF" },
    ],
    messages: [
      {
        role: "user",
        content:
          "Can you compare my two blood test reports and tell me what has improved?",
        timestamp: "10:42 AM",
      },
      { role: "ai", node: <ComparisonReport />, showFeedback: true },
    ],
  },
  ldl: {
    suggestions: [
      { icon: <IconStethoscope />, text: "What is a normal LDL range?" },
      { icon: <IconLeaf />, text: "How can I lower LDL naturally?" },
      { icon: <IconPerson />, text: "Explain in simple words" },
      { icon: <IconCompare />, text: "Compare my reports" },
    ],
    messages: [
      {
        role: "user",
        content: "What does high LDL mean?",
        timestamp: "10:45 AM",
      },
      { role: "ai", content: LDL_CONTENT, showFeedback: true },
    ],
  },
};

const DEFAULT_SUGGESTIONS = [
  { icon: <IconStethoscope />, text: "Summarise this report" },
  { icon: <IconPerson />, text: "Explain in simple words" },
  { icon: <IconCompare />, text: "Compare with previous" },
];

const CONTEXT_DOCS = [
  {
    id: "ctx-1",
    name: "Blood Test — June 2026",
    meta: "PDF · Jun 3, 2026",
    accent: "red",
    type: "pdf",
  },
  {
    id: "ctx-2",
    name: "Blood Test — January 2026",
    meta: "PDF · Jan 8, 2026",
    accent: "green",
    type: "pdf",
  },
];

export default function AIAssistantPage() {
  const [activeId, setActiveId] = useState("ldl");
  const [contextDocs, setContextDocs] = useState(CONTEXT_DOCS);
  const [messagesById, setMessagesById] = useState(() => {
    const initial = {};
    Object.entries(SEEDED_CONVERSATIONS).forEach(([id, convo]) => {
      initial[id] = convo.messages;
    });
    return initial;
  });
  const [inputValue, setInputValue] = useState("");
  const [hasWarnedNoBackend, setHasWarnedNoBackend] = useState(false);
  const activeConvo = SEEDED_CONVERSATIONS[activeId];
  const toast = useToast();
  const messages =
    messagesById[activeId] ||
    PLACEHOLDER_CONTENT.map((c) => ({ role: "ai", content: [c] }));
  const suggestions = activeConvo
    ? activeConvo.suggestions
    : DEFAULT_SUGGESTIONS;

  function handleSend() {
    if (!inputValue.trim()) return;
    if (!inputValue.trim()) return;
    if (!hasWarnedNoBackend) {
      notImplementedToast(toast, "AI Assistant chat");
      setHasWarnedNoBackend(true);
    }
    setMessagesById((prev) => ({
      ...prev,
      [activeId]: [
        ...(prev[activeId] || []),
        { role: "user", content: inputValue, timestamp: "Now" },
      ],
    }));
    setInputValue("");
    // No backend wired up — this appends the message locally only.
    // A real AI reply would come from your API here.
  }

  function handleClear() {
    setMessagesById((prev) => ({ ...prev, [activeId]: [] }));
  }

  function removeContextDoc(id) {
    setContextDocs((docs) => docs.filter((d) => d.id !== id));
  }

  return (
    <>
      <main className="main-content ai-page">
        <div className="chat-header-group">
          <div className="page-header">
            <div>
              <h1 className="page-header__title">
                AI Assistant{" "}
                <span className="page-header__sparkle">
                  <IconSparkleSmall />
                </span>
              </h1>
              <p className="page-header__subtitle">
                Ask questions about your health records
              </p>
            </div>
            <button
              type="button"
              className="button button--secondary"
              onClick={handleClear}
              style={{ width: "11rem" }}
            >
              <IconTrash size="1.5rem" />
              Clear chat history
            </button>
          </div>

          {contextDocs.length > 0 && (
            <div className="context-bar">
              <span className="context-bar__label">Context:</span>
              {contextDocs.map((doc) => (
                <div className="context-chip" key={doc.id}>
                  <span
                    className={`doc-icon-v2 doc-icon-v2--sm doc-icon-v2--${doc.accent}`}
                  >
                    {doc.type === "image" ? <IconFileImage /> : <IconFilePdf />}
                  </span>
                  <div>
                    <div className="context-chip__name">{doc.name}</div>
                    <div className="context-chip__meta">{doc.meta}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeContextDoc(doc.id)}
                    aria-label="Remove from context"
                  >
                    <IconX />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="chat-thread">
          {messages.length === 0 ? (
            <div className="chat-thread__empty">
              No messages yet — ask a question below.
            </div>
          ) : (
            messages.map((m, i) => <ChatMessage key={i} {...m} />)
          )}
        </div>
        <div className="chat-footer">
          <div className="chat-suggestions">
            {suggestions.map((s) => (
              <button
                type="button"
                className="chip chat-suggestion"
                key={s.text}
                onClick={() => setInputValue(s.text)}
              >
                {s.icon}
                {s.text}
              </button>
            ))}
          </div>

          <div className="chat-input">
            <button
              type="button"
              className="chat-input__icon-btn"
              aria-label="Attach file"
            >
              <IconPaperclip />
            </button>
            <button
              type="button"
              className="chat-input__icon-btn chat-input__icon-btn--box"
              aria-label="Add"
            >
              <IconPlusSmall />
            </button>
            <input
              type="text"
              placeholder="Ask anything about your health…"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              type="button"
              className="chat-input__icon-btn"
              aria-label="Voice input"
            >
              <IconMic />
            </button>
            <button
              type="button"
              className="chat-input__send"
              onClick={handleSend}
              aria-label="Send"
            >
              <IconSend />
            </button>
          </div>

          <p className="chat-disclaimer">
            Medocs AI can make mistakes. Please verify important information.
          </p>
        </div>
      </main>
    </>
  );
}
