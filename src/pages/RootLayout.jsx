import { Outlet } from "react-router-dom";
import { useBackNavigationGuard } from "../hooks/useBackNavigationGuard";
import { useTrackSafeHistory } from "../hooks/useTrackSafeHistory.js";
import { useAuthBootstrap } from "../hooks/useAuthBootstrap.js";
import { useSelector } from "react-redux";
import LoadingScreen from "../components/ui/LoadingScreen.jsx";
import Modal from "../components/ui/Modal";
import Options from "../components/ui/Options";

export default function RootLayout() {
  useBackNavigationGuard();
  useTrackSafeHistory();
  useAuthBootstrap();

  const authChecked = useSelector((state) => state.auth.authChecked);
  const isModalVisible = useSelector((state) => state.modal.isModalVisible);

  if (!authChecked) {
    return <LoadingScreen message="Loading…" />;
  }

  return (
    <>
      <Outlet />
      {isModalVisible && <Modal />}
      <Options />
    </>
  );
}
