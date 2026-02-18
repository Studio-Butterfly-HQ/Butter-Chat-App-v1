export interface Company {
  id: string;
  createdDate: string;
  updatedDate: string;
  company_name: string;
  subdomain: string;
  logo: string | null;
  banner: string | null;
  bio: string | null;
  company_category: string | null;
  country: string | null;
  language: string | null;
  timezone: string | null;
  status: string;
}

export interface CompanyListResponse {
  success: boolean;
  message: string;
  data: Company[];
  timestamp: string;
}

export interface CompanyResponse {
  success: boolean;
  message: string;
  data: Company;
  timestamp: string;
}
