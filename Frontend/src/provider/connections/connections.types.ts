export type ConnectionCategory = "social" | "ecommerce"

export interface Connection {
  id: string
  connected: boolean
}

export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data: T
}
