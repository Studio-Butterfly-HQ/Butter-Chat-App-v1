export type User = {
  id: string
  name: string
  email: string
}

export type AuthState = {
  user: User | null
  isAuthenticated: boolean
}

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
}