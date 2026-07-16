import { IconSparkleSmall, IconDoubleCheck, IconThumbsUp, IconThumbsDown } from "../../icons/AppIcons";

/**
 * content blocks: { type: 'p' | 'h4', text } | { type: 'ul', items: string[] }
 * Used for prose-style AI answers (e.g. "What does high LDL mean?").
 * For structured answers (tables/charts), pass a `node` instead of
 * `content` — see ComparisonReport for that pattern.
 */
function renderBlock(block, i) {
  if (block.type === "h4") return <h4 key={i}>{block.text}</h4>;
  if (block.type === "ul") {
    return (
      <ul key={i}>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return <p key={i}>{block.text}</p>;
}

export default function ChatMessage({ role, content, node, timestamp, showFeedback }) {
  if (role === "user") {
    return (
      <div className="chat-row chat-row--user">
        <div className="chat-bubble--user">{content}</div>
        {timestamp && (
          <div className="chat-row__meta">
            {timestamp} <IconDoubleCheck />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="chat-row chat-row--ai">
      <span className="chat-avatar"><IconSparkleSmall /></span>

      <div className="chat-row__body">
        {node ? node : (
          <div className="ai-message">
            {content.map(renderBlock)}
          </div>
        )}

        {showFeedback && (
          <div className="chat-row__feedback">
            <button type="button" aria-label="Helpful"><IconThumbsUp /></button>
            <button type="button" aria-label="Not helpful"><IconThumbsDown /></button>
          </div>
        )}
      </div>
    </div>
  );
}
