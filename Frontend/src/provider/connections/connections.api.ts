import { CONNECTIONS_API } from "@/constants"

export const toggleConnectionApi = async ( token: string) => {
  const res = await fetch(CONNECTIONS_API.FACEBOOK_LOGIN, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
  const data = await res.json()
  if (!res.ok) {
    throw data;
  }

  return data
}
