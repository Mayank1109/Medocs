import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import popupReducer from "./componentSlice";
import modalReducer from "./modalSlice";
import optionReducer from "./optionsSlice";
import docReducer from "./docSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popupReducer,
    modal: modalReducer,
    option: optionReducer,
    doc: docReducer,
  },
});

export default store;
