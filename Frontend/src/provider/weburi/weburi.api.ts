import type { CreateWeburiPayload, ApiResponse, Weburi } from "./weburi.types";
import { WEBURI_API } from "@/constants/api";

export const createWeburiApi = async (
  payload: CreateWeburiPayload,
  token: string
): Promise<ApiResponse<Weburi>> => {
  const res = await fetch(`${WEBURI_API.CREATE_WEBURI}`, {
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

export const getWeburisApi = async (
  token: string,
): Promise<ApiResponse<Weburi[]>> => {
  const res = await fetch(`${WEBURI_API.GET_WEBURIS}`, {
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
