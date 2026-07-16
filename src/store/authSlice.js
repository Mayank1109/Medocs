import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");

const initialAuthState = {
  isAuthenticated: !!localStorage.getItem("token"),
  user: userFromStorage || null,
  token: tokenFromStorage || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    restoreAuth(state, action) {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
