import { useEffect, useState } from "react";
import { IconSparkleSmall } from "./DashboardIcons";

/**
 * Simulates a streaming AI response by revealing `text` a few
 * characters at a time. This is a UI-only simulation — wire `text` up
 * to real incrementally-arriving tokens from your API and drop the
 * internal interval once you have a real stream to render instead.
 */
export default function AIStreamingMessage({ text, speed = 18, onDone }) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setShown("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <div className="chat-row chat-row--ai">
      <span className="chat-avatar"><IconSparkleSmall /></span>
      <div className="chat-bubble--ai">
        {shown}
        {!done && <span className="streaming-cursor" />}
      </div>
    </div>
  );
}
