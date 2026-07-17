import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/authSlice";
import api from "../../api/api";
import LoadingScreen from "../../components/ui/LoadingScreen";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const authenticate = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        navigate("/auth", { replace: true });
        return;
      }

      localStorage.removeItem("token");
      dispatch(authActions.logout());

      localStorage.setItem("token", token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      try {
        const res = await api.get("/auth/me");

        dispatch(
          authActions.loginSuccess({
            token,
            user: res.data.user,
          }),
        );

        window.history.replaceState({}, document.title, "/oauth-success");
        navigate("/dashboard", { replace: true });
      } catch {
        navigate("/auth", { replace: true });
      }
    };

    authenticate();
  }, []);

  return <LoadingScreen message="Signing you in…" />;
};

export default OAuthSuccess;
