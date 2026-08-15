// Authentication history and navigation utilities
import { SAFE_IDX_KEY } from "../constants/storage";

export function markSafeEntry() {
  const idx = window.history.state?.idx;
  console.log("[markSafeEntry] state:", window.history.state, "idx:", idx);
  if (typeof idx === "number") {
    sessionStorage.setItem(SAFE_IDX_KEY, String(idx));
  }
}

export function getSafeIdx() {
  const raw = sessionStorage.getItem(SAFE_IDX_KEY);
  console.log("[getSafeIdx] raw:", raw);
  return raw ? Number(raw) : 0;
}

export function performLogout(dispatch, navigate, logoutAction) {
  return new Promise((resolve) => {
    const target = getSafeIdx();
    const currentIdx = window.history.state?.idx ?? 0;
    const delta = target - currentIdx;
    console.log(
      "[performLogout] target:",
      target,
      "currentIdx:",
      currentIdx,
      "delta:",
      delta,
    );
    let settled = false;
    let timeoutId;

    function finish() {
      if (settled) return;
      settled = true;
      window.removeEventListener("popstate", handlePop);
      clearTimeout(timeoutId);
      dispatch(logoutAction);
      navigate("/auth?mode=login"); // no `replace` — this PUSHES, which discards forward entries
      resolve();
    }

    function handlePop() {
      finish();
    }

    if (delta < 0) {
      window.addEventListener("popstate", handlePop);
      timeoutId = setTimeout(finish, 300);
      window.history.go(delta);
    } else {
      finish();
    }
  });
}
