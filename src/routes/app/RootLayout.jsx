import { Outlet } from "react-router-dom";
import { useBackNavigationGuard } from "../../hooks/useBackNavigationGuard";
import { useTrackSafeHistory } from "../../hooks/useTrackSafeHistory.js";

export default function RootLayout() {
  useBackNavigationGuard();
  useTrackSafeHistory();
  return <Outlet />;
}
