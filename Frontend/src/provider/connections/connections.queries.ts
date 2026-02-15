import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSocialConnectionsApi,
  initiateFacebookConnectionApi,
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

export const useInitiateFacebookConnection = () => {
  const queryClient = useQueryClient();
  const token = useAppSelector((state) => state.auth.token);

  return useMutation({
    mutationFn: () => {
      if (!token) {
        throw new Error("No auth token found");
      }
      return initiateFacebookConnectionApi(token);
    },

    onError: (error: any) => {
      console.log("Error in initiateFacebookConnectionApi: ", error);
      toast.error(error?.message || "Connection failed");
    },
  });
};
