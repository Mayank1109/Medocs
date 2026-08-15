import { createSelector } from "@reduxjs/toolkit";

// Base selectors
export const selectProfileState = (state) => state.profile;
export const selectProfileData = (state) => state.profile.data;
export const selectProfileLoading = (state) => state.profile.loading;
export const selectProfileError = (state) => state.profile.error;

// Derived selectors
export const selectProfileCompletion = createSelector(
  [selectProfileData],
  (profile) => {
    if (!profile) return 0;
    const requiredFields = [
      "userName",
      "email",
      "phone",
      "dateOfBirth",
      "gender",
      "bloodGroup",
    ];

    const completed = requiredFields.filter(
      (field) => profile[field] && String(profile[field]).trim() !== "",
    ).length;

    return Math.round((completed / requiredFields.length) * 100);
  },
);

export const selectEmergencyContact = createSelector(
  [selectProfileData],
  (profile) =>
    profile?.emergencyContact || { name: "", phone: "", relation: "" },
);

export const selectHealthInfo = createSelector(
  [selectProfileData],
  (profile) => ({
    height: profile?.height,
    weight: profile?.weight,
    bloodGroup: profile?.bloodGroup,
    allergies: profile?.allergies || [],
    chronicConditions: profile?.chronicConditions || [],
    currentMedications: profile?.currentMedications || [],
    pastSurgeries: profile?.pastSurgeries || [],
  }),
);

export const selectPersonalInfo = createSelector(
  [selectProfileData],
  (profile) => ({
    userName: profile?.userName,
    email: profile?.email,
    phone: profile?.phone,
    dateOfBirth: profile?.dateOfBirth,
    gender: profile?.gender,
    avatarUrl: profile?.avatarUrl,
  }),
);
