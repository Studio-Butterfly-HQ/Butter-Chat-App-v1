import type { CreateShiftPayload, ApiResponse, Shift } from "./shift.types";
import { SHIFT_API } from "@/constants/api";

export const getShiftsApi = async (
  token: string,
): Promise<ApiResponse<Shift[]>> => {
  try {
    const res = await fetch(`${SHIFT_API.GET_SHIFTS}`, {
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
  } catch (error) {
    throw error;
  }
};

export const createShiftApi = async (
  payload: CreateShiftPayload,
  token: string,
): Promise<ApiResponse<Shift>> => {
  try {
    const res = await fetch(`${SHIFT_API.CREATE_SHIFT}`, {
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
  } catch (error) {
    throw error;
  }
};
