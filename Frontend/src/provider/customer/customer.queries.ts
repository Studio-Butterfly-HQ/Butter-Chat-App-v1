import { useQuery } from "@tanstack/react-query";
import { getCustomerListApi } from "./customer.api";
import { useAppSelector } from "@/store/hooks";

export const useGetCustomers = () => {
  const token = useAppSelector((state) => state.auth.token);
  return useQuery({
    queryKey: ["customers"],
    queryFn: () => {
      if (!token) {
        throw new Error("Token not found");
      }
      return getCustomerListApi(token);
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};
