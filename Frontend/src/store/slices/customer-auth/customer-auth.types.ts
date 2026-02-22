import { Customer } from "@/provider/customer/customer.types";

export interface CustomerAuthState {
  customer: Customer | null;
  token: string | null;
  isAuthenticated: boolean;
}

export const initialState: CustomerAuthState = {
  customer: null,
  token: null,
  isAuthenticated: false,
};
