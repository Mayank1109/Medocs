import { createSlice } from "@reduxjs/toolkit";

const initialDocState = { userDocs: [], refresh: false };

const docSlice = createSlice({
  name: "doc",
  initialState: initialDocState,
  reducers: {
    setDocs(state, action) {
      state.userDocs = action.payload;
    },
    setRefresh(state) {
      state.refresh = !state.refresh;
    },
  },
});

export const docActions = docSlice.actions;

export default docSlice.reducer;
