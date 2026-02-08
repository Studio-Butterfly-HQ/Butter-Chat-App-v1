import type { CreateWeburiPayload, ApiResponse, Weburi } from "./weburi.types";
import { WEBURI_API } from "@/constants/api";

export const createWeburiApi = async (
  payload: CreateWeburiPayload,
  token: string,
): Promise<ApiResponse<Weburi>> => {
  try {
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
  } catch (error) {
    throw error;
  }
};

export const getWeburisApi = async (
  token: string,
): Promise<ApiResponse<Weburi[]>> => {
  try {
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
  } catch (error) {
    throw error;
  }
};

export const deleteWeburiApi = async (
  id: string,
  token: string,
): Promise<ApiResponse<null>> => {
  try {
    const res = await fetch(WEBURI_API.DELETE_WEBURI(id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 204) {
      return {
        success: true,
        message: "Website URL deleted successfully",
        timestamp: new Date().toISOString(),
      };
    }
    const data = await res.json();
    if (!res.ok) {
      throw data;
    }
    return data;
  } catch (error) {
    throw error;
  }
};
