import axios from "axios"

const API_BASE_URL = "https://api.studiobutterfly.io"

export const initiateMetaConnectionApi = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/auth/meta/login`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}