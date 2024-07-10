import React from "react";
import "./App.css";
import ChatPage from "./Pages/chatPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/homePage";
import DashBoardPage from "./Pages/dashboardPage";
import AuthPage from "./Pages/authPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/auth", element: <AuthPage /> },
  { path: "/dashboard", element: <DashBoardPage /> },
  { path: "/chat", element: <ChatPage /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
