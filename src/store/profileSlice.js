import { createSlice } from "@reduxjs/toolkit";

const initialProfileState = {
  data: {
    // from User
    userName: "",
    email: "",
    role: "",
    memberSince: null,
    lastLogin: null,
    authProviders: { local: false, google: false },

    // from Profile
    avatarUrl: null,
    phone: "",
    dateOfBirth: null,
    gender: "",
    height: null,
    weight: null,
    occupation: "",
    location: "",
    bloodGroup: "",
    allergies: [],
    chronicConditions: [],
    currentMedications: [],
    pastSurgeries: [],
    emergencyContact: { name: "", phone: "", relation: "" },
    notesForDoctor: "",
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
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
