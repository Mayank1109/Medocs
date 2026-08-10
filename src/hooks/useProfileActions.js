import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../store/profileSlice";
import { modalActions } from "../store/modalSlice";
import {
  getProfile,
  updateProfile,
  uploadAvatar,
  exportData,
  deleteAccount,
} from "../services/profileService";
import { useToast } from "./useToast";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_CAP_BYTES = 1024 * 1024 * 1024;

export const useProfileActions = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile.data);
  const loading = useSelector((state) => state.profile.loading);

  const storagePct = useMemo(
    () =>
      Math.min(
        100,
        Math.round(((profile.storageUsedBytes || 0) / STORAGE_CAP_BYTES) * 100),
      ),
    [profile.storageUsedBytes],
  );

  const fetchProfileHandler = async () => {
    dispatch(profileActions.setLoading(true));
    try {
      const response = await getProfile();
      if (response.data.messageType !== "Success") {
        throw new Error(response.data.message || "Failed to load profile");
      }
      dispatch(profileActions.setProfile(response.data.data));
    } catch (err) {
      dispatch(profileActions.setError("Could not load profile."));
      toast.error("Load failed", "Could not load your profile.");
    } finally {
      dispatch(profileActions.setLoading(false));
    }
  };

  const editProfileHandler = async (updatedFields) => {
    try {
      const response = await updateProfile(updatedFields);
      if (response.data.messageType !== "Success") {
        throw new Error(response.data.message || "Update failed");
      }
      dispatch(
        profileActions.setProfile({ ...profile, ...response.data.data }),
      );
      toast.success("Profile updated", "Your changes were saved.");
      dispatch(modalActions.hide());
      return response.data;
    } catch (error) {
      toast.error(
        "Update failed",
        error.response?.data?.message || "Could not update profile.",
      );
      throw error;
    }
  };

  const modalCloseHandler = () => {
    dispatch(modalActions.hide());
  };

  const uploadAvatarHandler = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await uploadAvatar(formData);
      if (response.data.messageType !== "Success") {
        throw new Error(response.data.message || "Avatar upload failed");
      }
      dispatch(
        profileActions.setProfile({ ...profile, ...response.data.data }),
      );
      toast.success("Avatar updated", "Your profile photo was updated.");
    } catch (error) {
      console.error("Avatar upload error:", error);
      toast.error(
        "Upload failed",
        error.response?.data?.message || "Could not upload avatar.",
      );
    }
  };

  const downloadDataHandler = async () => {
    try {
      const response = await exportData();
      const blob = new Blob([response.data], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "medocs-data-export.json";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Export ready", "Your data export has downloaded.");
    } catch (error) {
      toast.error("Export failed", "Could not export your data.");
    }
  };

  const deleteAccountHandler = async () => {
    const response = await deleteAccount();
    if (response.data.messageType !== "Success") {
      throw new Error(response.data.message || "Delete failed");
    }
    toast.success(
      "Account deleted",
      "Your account has been permanently deleted.",
    );
    dispatch(modalActions.hide());
    await performLogout(dispatch, navigate, authActions.logout());
  };

  return {
    profile,
    loading,
    storagePct,
    fetchProfileHandler,
    editProfileHandler,
    modalCloseHandler,
    uploadAvatarHandler,
    downloadDataHandler,
    deleteAccountHandler,
  };
};
