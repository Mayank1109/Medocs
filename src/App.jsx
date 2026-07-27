import { useState } from "react";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./routes/app/LandingPage";
import DashboardPage from "./routes/app/Dashboard";
import DocumentsPage from "./routes/app/Documents";
import AIAssistantPage from "./routes/app/AiAssistant";
import Modal from "./components/ui/Modal";
import NotificationsPage from "./routes/app/NotificationsPage";
import { OptionsProvider } from "./hooks/useOptions";
import { useSelector } from "react-redux";
import AuthPage from "./routes/auth/AuthPage";
import OAuthSuccess from "./routes/auth/OAuthSuccess";
import { ToastProvider } from "./components/ui/ToastProvider";
import "./components/ui/LoadingStates.css";
import Options from "./components/ui/Options";
import WorkInProgress from "./routes/app/WorkInProgress";
import SettingsPage from "./routes/app/SettingsPage";
import ProfilePage from "./routes/app/ProfilePage";
import AccountPage from "./routes/app/AccountPage";
import { SidebarProvider } from "./hooks/useSidebar";

const Router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/login", element: <Navigate to="/auth?mode=login" replace /> },
      { path: "/signup", element: <Navigate to="/auth?mode=signup" replace /> },
      { path: "/auth", element: <AuthPage /> },
      { path: "/oauth-success", element: <OAuthSuccess /> },
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/documents", element: <DocumentsPage /> },
      { path: "/ai-assistant", element: <AIAssistantPage /> },
      { path: "/vitals", element: <WorkInProgress title="Vitals" /> },
      {
        path: "/share-profile",
        element: <WorkInProgress title="Share profile" />,
      },
      {
        path: "/notifications",
        element: <NotificationsPage />,
      },
      { path: "/settings", element: <SettingsPage /> },
      { path: "/profile", element: <AccountPage /> },
    ],
  },
]);

function App() {
  const isModalVisible = useSelector((state) => state.modal.isModalVisible);
  const [count, setCount] = useState(0);

  return (
    <ToastProvider>
      <SidebarProvider>
        <OptionsProvider>
          <RouterProvider router={Router} />
          {isModalVisible && <Modal />}
          <Options />
        </OptionsProvider>
      </SidebarProvider>
    </ToastProvider>
  );
}

export default App;
