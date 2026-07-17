import { IconSparkleSmall } from "./DashboardIcons";

/**
 * Shown in the chat thread while waiting for the AI's response to
 * start streaming. `subtext` describes what's happening behind the
 * scenes (e.g. "Analysing your report", "Reading your documents").
 */
export default function AIThinkingIndicator({ subtext = "Analysing your report" }) {
  return (
    <div className="chat-row chat-row--ai">
      <span className="chat-avatar"><IconSparkleSmall /></span>
      <div className="thinking-bubble">
        <div className="thinking-bubble__row">
          <span className="thinking-bubble__label">AI is thinking…</span>
        </div>
        <div className="dots">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
        <p className="thinking-bubble__subtext">{subtext}</p>
      </div>
    </div>
  );
}
