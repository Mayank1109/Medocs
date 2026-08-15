import { createSlice } from "@reduxjs/toolkit";

const initialDocState = {
  userDocs: [],
  page: 1,
  totalPages: 1,
  loading: false,
  refresh: false,
};

const docSlice = createSlice({
  name: "doc",
  initialState: initialDocState,
  reducers: {
    setDocs(state, action) {
      state.userDocs = action.payload.docs;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
    },
    appendDocs(state, action) {
      state.userDocs = [...state.userDocs, ...action.payload.docs];
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setRefresh(state) {
      state.refresh = !state.refresh;
    },
  },
});

export const docActions = docSlice.actions;
export default docSlice.reducer;
