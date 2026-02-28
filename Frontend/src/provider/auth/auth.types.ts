export interface LoginPayload {
  email: string
  password: string
}

export interface SignupPayload {
  company_name: string
  subdomain: string
  email: string
  password: string
}

export interface ResetPasswordPayload {
  email: string
}

export interface ApiResponse<T = null> {
  success: boolean
  message: string
  data: T
}
