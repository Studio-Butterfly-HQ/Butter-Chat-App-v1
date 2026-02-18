import { COMPANY_API } from "@/constants/api";
import { CompanyListResponse } from "./company.types";

export const fetchCompanyListApi = async (
  token: string,
): Promise<CompanyListResponse> => {
  const res = await fetch(COMPANY_API.GET_COMPANIES, {
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
};
