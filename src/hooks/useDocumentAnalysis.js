import { useState } from "react";
import { analyzeDocument, askAboutDocument } from "../services/analysisService";
import { useToast } from "./useToast";

function isQuotaMessage(err) {
  return err.response?.status === 429;
}

export function useDocumentAnalysis() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quotaReached, setQuotaReached] = useState(false);
  const toast = useToast();

  async function summarize(docId) {
    setLoading(true);
    try {
      const response = await analyzeDocument(docId);
      const summary = response.data.data.summary;
      setMessages((m) => [...m, { role: "ai", text: summary }]);
    } catch (err) {
      handleFailure(err, "Analysis failed");
    } finally {
      setLoading(false);
    }
  }

  async function ask(docId, question) {
    setMessages((m) => [...m, { role: "user", text: question }]);
    setLoading(true);
    try {
      const response = await askAboutDocument(docId, question);
      const answer = response.data.data.answer;
      setMessages((m) => [...m, { role: "ai", text: answer }]);
    } catch (err) {
      handleFailure(err, "Question failed");
    } finally {
      setLoading(false);
    }
  }

  function handleFailure(err, toastTitle) {
    const message =
      err.response?.data?.message || "Something went wrong. Try again later.";
    if (isQuotaMessage(err)) {
      setQuotaReached(true);
      toast.warning("Daily AI limit reached", message);
      return;
    }
    toast.error(toastTitle, message);
    setMessages((m) => [...m, { role: "ai", text: message, isError: true }]);
  }

  function reset() {
    setMessages([]);
    setQuotaReached(false);
  }

  return { messages, loading, quotaReached, summarize, ask, reset };
}
