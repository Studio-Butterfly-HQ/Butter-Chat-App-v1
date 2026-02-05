export interface InviteUserPayload {
  email: string;
  department_ids: string[];
  shift_ids: string[];
}

export interface UserDepartment {
  id: string;
  department_name: string;
}

export interface User {
  id: string;
  user_name: string;
  email: string;
  avatar: string | null;
  role: string;
  status: string;
  departments: UserDepartment[];
  assigned_conversations?: number; // Added as optional for now
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
