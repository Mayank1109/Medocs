import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/homePage";
import LoginPage from "./Pages/loginPage";
import SignupPage from "./Pages/signupPage";
import DashBoardPage from "./Pages/dashboardPage";
import SettingsPage from "./Pages/settingsPage";
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/dashboard", element: <DashBoardPage /> },

  { path: "/settings", element: <SettingsPage /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
