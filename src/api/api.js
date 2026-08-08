import axios from "axios";
import { authActions } from "../store/authSlice";
import store from "../store/store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:7000",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let refreshPromise = null;

async function refreshAccessToken() {
  const res = await api.post("/auth/refresh", null, { withCredentials: true });
  const newToken = res.data.token;

  localStorage.setItem("token", newToken);
  api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

  store.dispatch(
    authActions.loginSuccess({
      token: newToken,
      user: store.getState().auth.user,
    }),
  );

  return newToken;
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // If a refresh is already in flight, piggyback on it instead
        // of starting a second one.
        if (!refreshPromise) {
          refreshPromise = refreshAccessToken().finally(() => {
            refreshPromise = null;
          });
        }

        const newToken = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem("token");
        store.dispatch(authActions.logout());
        window.location.href = "/auth";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
