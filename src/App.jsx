import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/Dashboard";
import DocumentsPage from "./pages/Documents";
import AIAssistantPage from "./pages/AiAssistant";
import NotificationsPage from "./pages/NotificationsPage";
import AuthPage from "./routes/auth/AuthPage";
import OAuthSuccess from "./routes/auth/OAuthSuccess";
import "./components/ui/LoadingStates.css";
import WorkInProgress from "./pages/WorkInProgress";
import SettingsPage from "./pages/SettingsPage";
import AccountPage from "./pages/AccountPage";
import ProtectedRoute from "./routes/auth/ProtectedRoute";
import PublicOnlyRoute from "./routes/auth/PublicOnlyRoute";
import RootLayout from "./pages/RootLayout";
import AppLayout from "./pages/AppLayout";
import VitalsPage from "./pages/VitalsPage";
import { AppProviders } from "./context";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },

      {
        element: <PublicOnlyRoute />,
        children: [
          {
            path: "/login",
            element: <Navigate to="/auth?mode=login" replace />,
          },
          {
            path: "/signup",
            element: <Navigate to="/auth?mode=signup" replace />,
          },
          { path: "/auth", element: <AuthPage /> },
        ],
      },

      { path: "/oauth-success", element: <OAuthSuccess /> },

      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { path: "/dashboard", element: <DashboardPage /> },
              { path: "/documents", element: <DocumentsPage /> },
              { path: "/ai-assistant", element: <AIAssistantPage /> },
              { path: "/vitals", element: <VitalsPage /> },
              {
                path: "/share-profile",
                element: <WorkInProgress title="Share profile" />,
              },
              { path: "/notifications", element: <NotificationsPage /> },
              { path: "/settings", element: <SettingsPage /> },
              { path: "/profile", element: <AccountPage /> },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AppProviders>
      <RouterProvider router={Router} />
    </AppProviders>
  );
}

export default App;
