const SAFE_IDX_KEY = "medocs_safe_history_idx";

export function markSafeEntry() {
  const idx = window.history.state?.idx;
  if (typeof idx === "number") {
    sessionStorage.setItem(SAFE_IDX_KEY, String(idx));
  }
}

export function getSafeIdx() {
  const raw = sessionStorage.getItem(SAFE_IDX_KEY);
  return raw ? Number(raw) : 0;
}
