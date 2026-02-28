export interface ProfilePayload {
  company_category: string;
  country: string;
  language: string;
  timezone: string;
  logo?: string;
}

export interface PasswordUpdatePayload {
  oldPassword?: string;
  newPassword?: string;
}

export interface AvatarUploadResponse {
  filename: string;
  url: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Profile {
  company_category: string;
  country: string;
  language: string;
  timezone: string;
}

export interface User {
  id: string;
  company_id: string;
  user_name: string;
  email: string;
  profile_uri: string | null;
  bio: string | null;
  role: string;
  status: string;
  createdDate: string;
  updatedDate: string;
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: User;
  timestamp: string;
  path: string;
}

export interface CountryAPI {
  name?: { common: string };
  cca2?: string;
  languages?: Record<string, string>;
  timezones?: string[];
}

export interface Option {
  value: string;
  label: string;
}

export interface ProfileMetaResponse {
  countries: Option[];
  languages: Option[];
  timezones: Option[];
}

export interface LocationDefaults {
  country: string | null;
  timezone: string | null;
  language: string | null;
}
