import { User } from "../shift/shift.types";

export interface CreateDepartmentPayload {
  department_name: string;
}

export interface Department {
  id: string;
  department_name: string;
  company_id: string;
  description: string;
  department_profile_uri: string;
  employee_count: number;
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
