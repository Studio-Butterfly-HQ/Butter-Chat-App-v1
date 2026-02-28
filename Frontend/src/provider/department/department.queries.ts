import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createDepartmentApi, getDepartmentsApi } from "./department.api";
import type { CreateDepartmentPayload } from "./department.types";
import { useAppSelector } from "@/store/hooks";

export const useGetDepartments = () => {
  const token = useAppSelector((state) => state.auth.token);

  return useQuery({
    queryKey: ["departments"],
    queryFn: () => {
      if (!token) {
        throw new Error("Token not found");
      }
      return getDepartmentsApi(token);
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Data stays in cache for 30 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: true, // Only refetch on component mount
  });
};

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  const token = useAppSelector((state) => state.auth.token);

  return useMutation({
    mutationFn: (payload: CreateDepartmentPayload) => {
      if (!token) {
        throw new Error("Token not found");
      }
      return createDepartmentApi(payload, token);
    },

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },

    onError: (error: any) => {
      console.error("Create department error details: ", error?.error?.details);
      toast.error(error.message);
    },
  });
};
