import type {
  CreateAgentPayload,
  UpdateAgentPayload,
  ApiResponse,
  Agent,
} from "./agent.types";
import { AGENT_API } from "@/constants/api";

export const updateAgentApi = async (
  id: string,
  payload: UpdateAgentPayload,
  token: string,
): Promise<ApiResponse<Agent>> => {
  try {
    const res = await fetch(`${AGENT_API.CREATE_AGENT}/${id}`, {
      method: "PATCH",
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

export const createAgentApi = async (
  payload: CreateAgentPayload,
  token: string,
): Promise<ApiResponse<Agent>> => {
  try {
    const res = await fetch(AGENT_API.CREATE_AGENT, {
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

export const getAgentsApi = async (
  token: string,
): Promise<ApiResponse<Agent[]>> => {
  try {
    const res = await fetch(AGENT_API.CREATE_AGENT, {
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
