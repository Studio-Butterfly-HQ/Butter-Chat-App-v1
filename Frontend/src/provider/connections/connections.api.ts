import { CONNECTIONS_API } from "@/constants";

import { SocialConnection } from "./connections.types";

export const getSocialConnectionsApi = async (
  token: string,
): Promise<SocialConnection[]> => {
  try {
    const res = await fetch(CONNECTIONS_API.SOCIAL_CONNECTIONS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const data = await res.json();
      throw data;
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const initiateFacebookConnectionApi = async (token: string) => {
  const res = await fetch(CONNECTIONS_API.FACEBOOK_LOGIN, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({ message: "Request failed" }));
    throw data;
  }

  const data = await res.json();
  if (data.url) {
    window.location.href = data.url; // redirect to Facebook
    return;
  }

  return data;
};
