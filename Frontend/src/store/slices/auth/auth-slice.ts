import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {initialState, CompanyUser, Company} from "./auth.types"

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ user?: CompanyUser | null; token: string }>) {
      state.token = action.payload.token
      state.user = action.payload.user ?? null
      state.isAuthenticated = true
    },
    setCompany(state, action: PayloadAction<Company>) {
      state.company = action.payload
    },
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.company = null
    },
  },
})

export const { setAuth, logout, setCompany } = authSlice.actions
export default authSlice.reducer
