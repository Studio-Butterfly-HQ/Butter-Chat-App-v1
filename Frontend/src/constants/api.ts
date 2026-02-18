export const BACKEND_BASE_URL_LOCAL = "http://localhost:5599";
export const BACKEND_BASE_URL = "https://api.studiobutterfly.io";

export const AUTH_API = {
  LOGIN: `${BACKEND_BASE_URL}/auth/login`,
  SIGNUP: `${BACKEND_BASE_URL}/auth/register`,
  RESET_PASSWORD: `${BACKEND_BASE_URL}/auth/reset-password`,
};
export const COMPANY_API = {
  UPDATE_PROFILE: `${BACKEND_BASE_URL}/company/update`,
  GET_PROFILE: `${BACKEND_BASE_URL}/company/profile`,
  GET_COMPANIES: `${BACKEND_BASE_URL}/company/list`,
};

export const CONNECTIONS_API = {
  FACEBOOK_LOGIN: `${BACKEND_BASE_URL}/auth/meta/login`,
  SOCIAL_CONNECTIONS: `${BACKEND_BASE_URL}/social-connections`,
};
export const SHIFT_API = {
  CREATE_SHIFT: `${BACKEND_BASE_URL}/shift`,
  GET_SHIFTS: `${BACKEND_BASE_URL}/shift`,
};

export const DEPARTMENT_API = {
  CREATE_DEPARTMENT: `${BACKEND_BASE_URL}/department`,
  GET_DEPARTMENTS: `${BACKEND_BASE_URL}/department`,
};

export const DOCUMENT_API = {
  GET_DOCUMENTS: `${BACKEND_BASE_URL}/documents/list`,
  UPLOAD_DOCUMENTS: `${BACKEND_BASE_URL}/documents/upload-multiple`,
  DELETE_DOCUMENT: (filename: string) =>
    `${BACKEND_BASE_URL}/documents/${encodeURIComponent(filename)}`,
};

export const WEBURI_API = {
  CREATE_WEBURI: `${BACKEND_BASE_URL}/weburi-resources`,
  GET_WEBURIS: `${BACKEND_BASE_URL}/weburi-resources`,
  DELETE_WEBURI: (id: string) => `${BACKEND_BASE_URL}/weburi-resources/${id}`,
};

export const AGENT_API = {
  CREATE_AGENT: `${BACKEND_BASE_URL}/ai-agents`,
};

export const CUSTOMER_API = {
  GET_CUSTOMERS: `${BACKEND_BASE_URL}/customer/list`,
};

export const USER_API = {
  INVITE_USER: `${BACKEND_BASE_URL}/users/invite`,
  GET_USERS: `${BACKEND_BASE_URL}/users`,
  REGISTER_USER: `${BACKEND_BASE_URL}/users/registration`,
  GET_PROFILE: `${BACKEND_BASE_URL}/users/profile`,
  UPDATE_PROFILE: `${BACKEND_BASE_URL}/users/profile`,
  UPDATE_PASSWORD: `${BACKEND_BASE_URL}/users/profile/password`,
};

export const FILE_HANDLE_API = {
  UPLOAD_AVATAR: `${BACKEND_BASE_URL}/file-handle/image/avatar`,
};

export const COUNTRY_API_URL = "https://restcountries.com/v3.1/all?fields=name,cca2,languages";

export const IP_INFO_URL = "https://ipinfo.io/json";
