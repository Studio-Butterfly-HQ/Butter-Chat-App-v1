export type User = {
  id: string
  name: string
  email: string
}

export type AuthState = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
}