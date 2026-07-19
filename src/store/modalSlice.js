import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  isModalVisible: false,
  actionType: null,
  data: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    display(state, action) {
      console.log("REDUCER: display reducer running", action.payload);
      state.isModalVisible = true;
      state.actionType = action.payload.actionType;
      state.data = action.payload.payload ?? null;
    },
    hide(state) {
      state.isModalVisible = false;
      state.actionType = null;
      state.data = null;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
