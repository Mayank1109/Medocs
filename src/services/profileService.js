import { httpService } from "../api/httpService";
import { PROFILE_URI } from "../api/uriConfig";

const getProfile = () => {
  return httpService.get(PROFILE_URI.GET);
};

const updateProfile = (updatedData) => {
  return httpService.put(PROFILE_URI.UPDATE, updatedData);
};

const uploadAvatar = (formData) => {
  return httpService.patch(PROFILE_URI.UPLOAD_AVATAR, formData);
};

export { getProfile, updateProfile, uploadAvatar };
