export const BACKEND_BASE_URL_LOCAL = "http://localhost:5599"
export const BACKEND_BASE_URL = "https://api.studiobutterfly.io"

export const AUTH_API = {
  LOGIN: `${BACKEND_BASE_URL}/auth/login`,
  SIGNUP: `${BACKEND_BASE_URL}/auth/register`,
  RESET_PASSWORD: `${BACKEND_BASE_URL}/auth/reset-password`,
}
export const COMPANY_API = {
  UPDATE_PROFILE: `${BACKEND_BASE_URL}/company/update`,
  GET_PROFILE: `${BACKEND_BASE_URL}/company/profile`,
}

export const CONNECTIONS_API = {
  FACEBOOK_LOGIN: `${BACKEND_BASE_URL}/auth/meta/login`,
}
export const SHIFT_API = {
  CREATE_SHIFT: `${BACKEND_BASE_URL}/shift`,
  GET_SHIFTS: `${BACKEND_BASE_URL}/shift`,
};

export const DEPARTMENT_API = {
  CREATE_DEPARTMENT: `${BACKEND_BASE_URL}/department`,
  GET_DEPARTMENTS: `${BACKEND_BASE_URL}/department`,
};

export const COUNTRY_API_URL = "https://restcountries.com/v3.1/all?fields=name,cca2,languages,timezones"
