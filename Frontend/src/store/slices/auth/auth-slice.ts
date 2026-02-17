import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, CompanyUser, Company } from "./auth.types";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ user?: CompanyUser | null; token: string }>) {
      state.token = action.payload.token;
      state.user = action.payload.user ?? null;
      state.isAuthenticated = true;
    },
    setCompany(state, action: PayloadAction<Company>) {
      state.company = action.payload;
    },
    completeOnboarding(state) {
      state.isOnboardingComplete = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isOnboardingComplete = false;
      state.company = null;
    },
    setUser(state, action: PayloadAction<CompanyUser>) {
      state.user = action.payload;
    },
  },
});

export const { setAuth, logout, setCompany, setUser, completeOnboarding } = authSlice.actions;
export default authSlice.reducer;
