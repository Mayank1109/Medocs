// hooks/useTrackSafeHistory.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { markSafeEntry } from "../utils/auth";

const SAFE_LANDING_PATHS = new Set(["/", "/oauth-success"]);

export function useTrackSafeHistory() {
  const location = useLocation();
  useEffect(() => {
    if (SAFE_LANDING_PATHS.has(location.pathname)) {
      markSafeEntry();
    }
  }, [location.pathname]);
}
