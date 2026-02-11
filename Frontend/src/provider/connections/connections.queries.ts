import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSocialConnectionsApi,
  toggleConnectionApi,
} from "./connections.api";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";

export const useGetSocialConnections = () => {
  const token = useAppSelector((state) => state.auth.token);

  return useQuery({
    queryKey: ["social-connections"],
    queryFn: () => {
      if (!token) {
        throw new Error("No auth token found");
      }
      return getSocialConnectionsApi(token);
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Data stays in cache for 30 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: true, // Only refetch on component mount
  });
};

export const useToggleConnection = () => {
  const queryClient = useQueryClient();
  const token = useAppSelector((state) => state.auth.token);

  return useMutation({
    mutationFn: () => {
      if (!token) {
        throw new Error("No auth token found");
      }
      return toggleConnectionApi(token);
    },

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      // refresh connections if you later fetch from backend
      queryClient.invalidateQueries({ queryKey: ["social-connections"] });
    },

    onError: (error: any) => {
      console.error("Toggle connection error details:", error?.error?.details);
      toast.error(error.message);
    },
  });
};
