export interface CreateShiftPayload {
  shift_name: string;
  shift_start_time: string;
  shift_end_time: string;
}

export interface User {
  id: string;
  user_name: string;
  email: string;
  profile_uri?: string;
  status: string;
}

export interface Shift {
  id: string;
  shift_name: string;
  shift_start_time: string;
  shift_end_time: string;
  company_id: string;
  created_date: string;
  updated_date: string;
  users: User[];
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
