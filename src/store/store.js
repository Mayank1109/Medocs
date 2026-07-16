import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import popupReducer from "./componentSlice";
import modalReducer from "./modalSlice";
import docReducer from "./docSlice";
import profileReducer from "./profileSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popupReducer,
    modal: modalReducer,
    doc: docReducer,
    profile: profileReducer,
  },
});

export default store;
