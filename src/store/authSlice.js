import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");

const initialAuthState = {
  isAuthenticated: false,
  authChecked: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.authChecked = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.authChecked = true;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    restoreAuth(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.authChecked = true;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
