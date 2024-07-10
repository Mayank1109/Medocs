import React from "react";
import Auth from "../components/Auth/Auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { useEffect } from "react";

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, []);
  return (
    <>
      <Auth />
    </>
  );
};

export default AuthPage;
