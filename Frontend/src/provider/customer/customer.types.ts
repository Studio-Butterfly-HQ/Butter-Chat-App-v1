export interface Customer {
  createdDate: string;
  updatedDate: string;
  id: string;
  company_id: string;
  name: string;
  profile_uri: string | null;
  contact: string;
  source: string;
  conversation_count: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: {
    code?: string;
    details?: Record<string, string[]>;
  };
  timestamp?: string;
  path?: string;
}

export interface CustomerLoginPayload {
  contact: string;
  password: string;
  source: string;
  company_id: string;
}

export interface CustomerRegisterPayload {
  name: string;
  contact: string;
  password: string;
  source: string;
  profile_uri?: string;
  company_id: string;
}
