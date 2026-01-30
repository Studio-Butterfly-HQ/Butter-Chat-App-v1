import type {
  CreateDepartmentPayload,
  ApiResponse,
  Department,
} from "./department.types";
import { DEPARTMENT_API } from "@/constants/api";

export const getDepartmentsApi = async (token: string): Promise<ApiResponse<Department[]>> => {
  const res = await fetch(`${DEPARTMENT_API.GET_DEPARTMENTS}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw data;
  }

  return data;
};

export const createDepartmentApi = async ( payload: CreateDepartmentPayload, token: string): Promise<ApiResponse<Department>> => {
  const res = await fetch(`${DEPARTMENT_API.CREATE_DEPARTMENT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw data;
  }

  return data;
};
