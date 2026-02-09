export interface ProfilePayload {
  company_category: string;
  country: string;
  language: string;
  timezone: string;
  logo?: string;
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
