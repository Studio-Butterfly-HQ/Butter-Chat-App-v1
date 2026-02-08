import { CONNECTIONS_API } from "@/constants";

export const toggleConnectionApi = async (token: string) => {
  try {
    const res = await fetch(CONNECTIONS_API.FACEBOOK_LOGIN, {
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
    if (data.url) {
      window.location.href = data.url;
    }

    return data;
  } catch (error) {
    throw error;
  }
};
