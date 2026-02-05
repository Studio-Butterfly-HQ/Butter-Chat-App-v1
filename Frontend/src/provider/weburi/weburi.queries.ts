import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createWeburiApi, getWeburisApi } from "./weburi.api";
import type { CreateWeburiPayload } from "./weburi.types";
import { useAppSelector } from "@/store/hooks";

export const useGetWeburis = () => {
  const token = useAppSelector((state) => state.auth.token);

  return useQuery({
    queryKey: ["weburis"],
    queryFn: () => {
      if (!token) {
        throw new Error("Token not found");
      }
      return getWeburisApi(token);
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Data stays in cache for 30 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
};

export const useCreateWeburi = () => {
  const queryClient = useQueryClient();
  const token = useAppSelector((state) => state.auth.token);

  return useMutation({
    mutationFn: (payload: CreateWeburiPayload) => {
      if (!token) {
        throw new Error("Token not found");
      }
      return createWeburiApi(payload, token);
    },

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      // Invalidate weburis query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["weburis"] });
    },

    onError: (error: any) => {
      console.error("Create weburi error details: ", error?.error?.details);
      toast.error(error.message || "Failed to add website");
    },
  });
};
