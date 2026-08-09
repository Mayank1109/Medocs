import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../store/profileSlice";
import { modalActions } from "../store/modalSlice";
import {
  getProfile,
  updateProfile,
  uploadAvatar,
} from "../services/profileService";
import { useToast } from "./useToast";

export const useProfileActions = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const profile = useSelector((state) => state.profile.data);
  const loading = useSelector((state) => state.profile.loading);

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

  return {
    profile,
    loading,
    fetchProfileHandler,
    editProfileHandler,
    modalCloseHandler,
    uploadAvatarHandler,
  };
};
