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
import NotificationsPage from "./routes/app/NotificationsPage";
import { OptionsProvider } from "./hooks/useOptions";
import AuthPage from "./routes/auth/AuthPage";
import OAuthSuccess from "./routes/auth/OAuthSuccess";
import { ToastProvider } from "./components/ui/ToastProvider";
import "./components/ui/LoadingStates.css";
import WorkInProgress from "./routes/app/WorkInProgress";
import SettingsPage from "./routes/app/SettingsPage";
import AccountPage from "./routes/app/AccountPage";
import { SidebarProvider } from "./hooks/useSidebar";
import ProtectedRoute from "./routes/auth/ProtectedRoute";
import PublicOnlyRoute from "./routes/auth/PublicOnlyRoute";
import RootLayout from "./routes/app/RootLayout";
import AppLayout from "./routes/app/AppLayout";
import { ThemeProvider } from "./hooks/useTheme";

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
              { path: "/vitals", element: <WorkInProgress title="Vitals" /> },
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
    <ThemeProvider>
      <ToastProvider>
        <SidebarProvider>
          <OptionsProvider>
            <RouterProvider router={Router} />
          </OptionsProvider>
        </SidebarProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
