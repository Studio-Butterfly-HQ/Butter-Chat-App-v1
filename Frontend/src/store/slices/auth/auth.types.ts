export type CompanyUser = {
  user_name: string;
  email: string;
  profile_uri: string | null;
  bio: string | null;
  role: string;
};

export type Company = {
  company_name: string;
  subdomain: string;
  users: CompanyUser[];
  logo: string;
  company_category?: string;
  country?: string;
  language?: string;
  timezone?: string;
};

export type AuthState = {
  user: CompanyUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isOnboardingComplete: boolean;
  company: Company | null;
};

export const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isOnboardingComplete: false,
  company: null,
};
