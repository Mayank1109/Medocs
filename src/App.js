import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/homePage";
import DashboardPage from "./Pages/dashboardPage";
import LoginPage, { action as loginAction } from "./Pages/loginPage";
import RegisterPage from "./Pages/RegisterPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/login", element: <LoginPage />, action: loginAction },
  { path: "/register", element: <RegisterPage /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
