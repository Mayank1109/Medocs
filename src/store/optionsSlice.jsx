import { createSlice } from "@reduxjs/toolkit";

const initialOptionState = { isOptionsVisible: false, selectedRow: null };

const optionsSlice = createSlice({
  name: "option",
  initialState: initialOptionState,
  reducers: {
    display(state) {
      state.isOptionsVisible = true;
    },
    hide(state) {
      state.isOptionsVisible = false;
    },
    selectRow(state, action) {
      state.selectedRow = action.payload;
    },
  },
});

export const optionActions = optionsSlice.actions;

export default optionsSlice.reducer;
