import axios from "axios";
import { authActions } from "../store/authSlice";
import store from "../store/store";
const api = axios.create({
  baseURL: "http://localhost:7000",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Request Interceptor - Token:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

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
        const res = await api.post("/auth/refresh", null, {
          withCredentials: true,
        });

        const newToken = res.data.token;

        localStorage.setItem("token", newToken);
        api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

        store.dispatch(
          authActions.loginSuccess({
            token: newToken,
            user: store.getState().auth.user,
          }),
        );

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
