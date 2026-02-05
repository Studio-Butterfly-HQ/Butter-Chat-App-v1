import { USER_API } from "@/constants/api";
import type { ApiResponse, InviteUserPayload, User } from "./user.types";

export const inviteUserApi = async (
  payload: InviteUserPayload,
  token: string,
): Promise<ApiResponse<null>> => {
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
};

export const getUsersApi = async (
  token: string,
): Promise<ApiResponse<User[]>> => {
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
};
