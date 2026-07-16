import { createSlice } from "@reduxjs/toolkit";
const initialProfileState = {
  data: {
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    bloodGroup: "",
    emergencyContact: "",
    profileImage: null,
  },
  loading: false,
  error: null,
};
const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,
  reducers: {
    setProfile(state, action) {
      state.data = action.payload;
    },
    updateField(state, action) {
      const { field, value } = action.payload;
      state.data[field] = value;
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice.reducer;
