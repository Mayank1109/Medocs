import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getSafeIdx } from "../utility/authHistory";

export function useBackNavigationGuard() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    function handlePopState() {
      if (isAuthenticated) return;

      const currentIdx = window.history.state?.idx;
      const safeIdx = getSafeIdx();

      if (typeof currentIdx === "number" && currentIdx > safeIdx) {
        // One jump straight past every stale protected entry,
        // instead of stepping back one at a time.
        window.history.go(safeIdx - currentIdx);
      }
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isAuthenticated]);
}
