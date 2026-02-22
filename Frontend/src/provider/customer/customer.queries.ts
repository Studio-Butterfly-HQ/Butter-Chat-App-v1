import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getCustomerListApi,
  customerLoginApi,
  customerRegisterApi,
} from "./customer.api";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toast } from "sonner";
import { setCustomerAuth } from "@/store/slices/customer-auth/customer-auth-slice";

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
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: customerLoginApi,

    onSuccess: (res: any) => {
      if (!res.success) {
        toast.error(res.message);
      } else {
        dispatch(
          setCustomerAuth({
            token: res.data.access_token,
            customer: res.data.customer,
          }),
        );
        toast.success(res.message);
      }
    },

    onError: (error: any) => {
      console.error("Customer login error details:", error?.error?.details);
      toast.error(error.message);
    },
  });
};

export const useCustomerRegister = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: customerRegisterApi,

    onSuccess: (res: any) => {
      if (!res.success) {
        toast.error(res.message);
      } else {
        dispatch(
          setCustomerAuth({
            token: res.data.access_token,
            customer: res.data.customer,
          }),
        );
        toast.success(res.message);
      }
    },

    onError: (error: any) => {
      console.error("Customer register error details:", error?.error?.details);
      toast.error(error.message);
    },
  });
};
