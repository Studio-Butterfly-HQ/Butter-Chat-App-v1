export interface LoginPayload {
  email: string
  password: string
}

export interface SignupPayload {
  companyName: string
  subdomain: string
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message: string
  token?: string
  user?: any
}
