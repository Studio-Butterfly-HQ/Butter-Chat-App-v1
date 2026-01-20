export interface CreateAgentPayload {
  name: string
  personality: string
  instructions: string
}

export interface Agent {
  id: string
  name: string
  personality: string
  instructions: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}
