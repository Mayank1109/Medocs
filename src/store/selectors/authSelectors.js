import { createSelector } from "@reduxjs/toolkit";

// Base selectors
export const selectAuthState = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthChecked = (state) => state.auth.authChecked;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

// Derived selectors
export const selectUserInfo = createSelector([selectUser], (user) => ({
  name: user?.userName || "User",
  email: user?.email || "",
  id: user?._id || null,
}));

export const selectIsAuthed = createSelector(
  [selectIsAuthenticated, selectAuthChecked],
  (isAuthenticated, authChecked) => ({
    isAuthenticated,
    authChecked,
  }),
);
