import { useQuery, useMutation } from "@tanstack/react-query";
import { getCustomerListApi, customerLoginApi } from "./customer.api";
import { useAppSelector } from "@/store/hooks";
import { toast } from "sonner";

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

export const useCustomerLogin = () => {
  return useMutation({
    mutationFn: customerLoginApi,

    onSuccess: (res: any) => {
      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
      }
    },

    onError: (error: any) => {
      console.error("Customer login error:", error);
      toast.error(error.message);
    },
  });
};
