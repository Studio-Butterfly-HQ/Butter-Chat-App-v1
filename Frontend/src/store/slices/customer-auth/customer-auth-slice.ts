import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, CustomerAuthState } from "./customer-auth.types";
import { Customer } from "@/provider/customer/customer.types";

const customerAuthSlice = createSlice({
  name: "customerAuth",
  initialState,
  reducers: {
    setCustomerAuth(
      state,
      action: PayloadAction<{ customer?: Customer | null; token: string }>,
    ) {
      state.token = action.payload.token;
      state.customer = action.payload.customer ?? null;
      state.isAuthenticated = true;
    },
    logoutCustomer(state) {
      state.customer = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setCustomer(state, action: PayloadAction<Customer>) {
      state.customer = action.payload;
    },
  },
});

export const { setCustomerAuth, logoutCustomer, setCustomer } =
  customerAuthSlice.actions;
export default customerAuthSlice.reducer;
