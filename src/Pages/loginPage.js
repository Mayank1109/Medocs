import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Login from "../components/loginRegister/Login";
import { json, redirect } from "react-router-dom";
const LoginPage = () => {
  return (
    <>
      <Header />
      <Login />
      <Footer />
    </>
  );
};

export default LoginPage;

export async function action({ request, params }) {
  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  //soon: manage the token
  return redirect("/");
}
