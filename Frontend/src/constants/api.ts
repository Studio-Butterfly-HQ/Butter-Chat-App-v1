export const BACKEND_BASE_URL = "http://localhost:5599"

export const AUTH_API = {
    LOGIN: `${BACKEND_BASE_URL}/auth/login`,
    SIGNUP: `${BACKEND_BASE_URL}/auth/register`,
    RESET_PASSWORD: `${BACKEND_BASE_URL}/auth/reset-password`,
}

export const COUNTRY_API_URL = "https://restcountries.com/v3.1/all?fields=name,cca2,languages,timezones"
