import { createSlice, nanoid } from "@reduxjs/toolkit";

const STATUS_DEFAULT_TITLES = {
  success: "Success",
  error: "Something went wrong",
  warning: "Heads up",
  info: "Notice",
};

const STATUS_DEFAULT_DURATIONS = {
  success: 4000,
  error: 6000,
  warning: 5000,
  info: 4000,
};

const initialState = {
  toasts: [],
};

const componentSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    display: {
      reducer(state, action) {
        state.toasts.push(action.payload);
      },
      prepare({ message, status = "success", title, duration }) {
        return {
          payload: {
            id: nanoid(),
            message,
            status,
            title: title || STATUS_DEFAULT_TITLES[status] || "Notice",
            duration: duration ?? STATUS_DEFAULT_DURATIONS[status] ?? 4000,
          },
        };
      },
    },
    dismiss(state, action) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    clearAll(state) {
      state.toasts = [];
    },
  },
});

export const popupActions = componentSlice.actions;
export default componentSlice.reducer;
