export interface CreateWeburiPayload {
  uri: string;
}

export interface Weburi {
  id: string;
  uri: string;
  company_id: string;
  status: string;
  createdDate: string;
  updatedDate: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    code?: string;
    details?: string;
  };
  timestamp: string;
  path?: string;
}
