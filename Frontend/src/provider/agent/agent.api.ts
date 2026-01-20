import type {CreateAgentPayload, ApiResponse,Agent,} from "./agent.types"

export const createAgentApi = async (payload: CreateAgentPayload) => {
  const res = await fetch("/api/agents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error("Failed to create agent")
  }

  return res.json()
}
