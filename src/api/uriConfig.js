const BASE_URI = "/api";

const VIEW_URI =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:7000";

const AUTH_URI = {
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
};

const DOCUMENT_URI = {
  UPLOAD: "/dashboard/upload",
  LIST: "/dashboard/documents",
  DELETE: (id) => `/dashboard/documents/${id}`,
  EDIT: (id) => `/dashboard/documents/${id}`,
  ANALYZE: (id) => `/dashboard/documents/${id}/analyze`,
  ASK: (id) => `/dashboard/documents/${id}/ask`,
  TOGGLE_FAVORITE: (id) => `/dashboard/documents/${id}/favorite`,
};

const PROFILE_URI = {
  GET: "/profile/me",
  UPDATE: "/profile/me",
  UPLOAD_AVATAR: "/profile/me/avatar",
};

export { BASE_URI, AUTH_URI, DOCUMENT_URI, VIEW_URI, PROFILE_URI };
