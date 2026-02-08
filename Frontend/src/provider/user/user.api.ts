import { USER_API } from "@/constants/api";
import type {
  ApiResponse,
  InviteUserPayload,
  RegisterUserPayload,
  User,
} from "./user.types";

export const inviteUserApi = async (
  payload: InviteUserPayload,
  token: string,
): Promise<ApiResponse<null>> => {
  try {
    const res = await fetch(`${USER_API.INVITE_USER}`, {
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

export const registerUserApi = async (
  payload: RegisterUserPayload,
  token: string,
): Promise<ApiResponse<null>> => {
  try {
    const res = await fetch(`${USER_API.REGISTER_USER}`, {
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

export const getUsersApi = async (
  token: string,
): Promise<ApiResponse<User[]>> => {
  try {
    const res = await fetch(`${USER_API.GET_USERS}`, {
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
