import { httpService } from "../api/httpService";
import { AUTH_URI } from "../api/uriConfig";

export const login = (credentials) => {
  return httpService.post(AUTH_URI.LOGIN, credentials);
};

export const signup = (data) => {
  return httpService.post(AUTH_URI.SIGNUP, data);
};
