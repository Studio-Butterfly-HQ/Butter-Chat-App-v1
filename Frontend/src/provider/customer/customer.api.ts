import type { ApiResponse, Customer } from "./customer.types";
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
