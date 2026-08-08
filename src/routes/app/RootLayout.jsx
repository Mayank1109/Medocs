import { Outlet } from "react-router-dom";
import { useBackNavigationGuard } from "../../hooks/useBackNavigationGuard";
import { useTrackSafeHistory } from "../../hooks/useTrackSafeHistory.js";
import { useAuthBootstrap } from "../../hooks/useAuthBootstrap.js";
import { useSelector } from "react-redux";
import LoadingScreen from "../../components/ui/LoadingScreen.jsx";

export default function RootLayout() {
  useBackNavigationGuard();
  useTrackSafeHistory();
  useAuthBootstrap();

  const authChecked = useSelector((state) => state.auth.authChecked);

  if (!authChecked) {
    return <LoadingScreen message="Loading…" />;
  }

  return <Outlet />;
}
