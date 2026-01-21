import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User, initialState } from "./auth.types"

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ user?: User; token: string }>) {
      state.token = action.payload.token
      state.user = action.payload.user ?? null
      state.isAuthenticated = true
    },
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
  },
})

export const { setAuth, logout } = authSlice.actions
export default authSlice.reducer
