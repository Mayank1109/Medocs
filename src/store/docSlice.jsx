import { createSlice } from "@reduxjs/toolkit";

const initialDocState = { userDocs: null };

const docSlice = createSlice({
  name: "doc",
  initialState: initialDocState,
  reducers: {
    setDocs(state, action) {
      state.userDocs = action.payload;
    },
  },
});

export const docActions = docSlice.actions;

export default docSlice.reducer;
