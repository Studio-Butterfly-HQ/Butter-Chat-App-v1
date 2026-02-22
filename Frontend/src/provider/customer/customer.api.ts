import type {
  ApiResponse,
  Customer,
  CustomerLoginPayload,
} from "./customer.types";
import { CUSTOMER_API } from "@/constants/api";

export const getCustomerListApi = async (
  token: string,
): Promise<ApiResponse<Customer[]>> => {
  try {
    const res = await fetch(CUSTOMER_API.GET_CUSTOMERS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const customerLoginApi = async (payload: CustomerLoginPayload) => {
  try {
    const res = await fetch(CUSTOMER_API.CUSTOMER_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      throw data;
    }
    return data;
  } catch (error) {
    throw error;
  }
};
