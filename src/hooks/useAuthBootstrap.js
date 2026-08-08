import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../api/api";
import { authActions } from "../store/authSlice";

export function useAuthBootstrap() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function verifySession() {
      const token = localStorage.getItem("token");

      if (!token) {
        dispatch(authActions.logout()); // clears state, sets authChecked: true
        return;
      }

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      try {
        const res = await api.get("/auth/me");
        dispatch(
          authActions.restoreAuth({
            token,
            user: res.data.user,
          }),
        );
      } catch {
        // token invalid/expired — api.js's own interceptor will have
        // already tried a refresh internally if this was a 401;
        // if we're here, refresh also failed
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(authActions.logout());
      }
    }

    verifySession();
  }, [dispatch]);
}
