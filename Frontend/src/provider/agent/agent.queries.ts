import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAgentApi, getAgentsApi, updateAgentApi } from "./agent.api";
import { toast } from "sonner";
import type { CreateAgentPayload, UpdateAgentPayload } from "./agent.types";
import { useAppSelector } from "@/store/hooks";

export const useUpdateAgent = () => {
  const queryClient = useQueryClient();
  const token = useAppSelector((state) => state.auth.token);

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateAgentPayload;
    }) => {
      if (!token) {
        throw new Error("Token not found");
      }
      return updateAgentApi(id, payload, token);
    },

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["agents"] });
    },

    onError: (error: any) => {
      console.error("Update agent error: ", error);
      console.error("Update agent error:", error?.error?.details);
      toast.error(error.message);
    },
  });
};

export const useCreateAgent = () => { //todo showing the old in the select-fix
  const queryClient = useQueryClient();
  const token = useAppSelector((state) => state.auth.token);

  return useMutation({
    mutationFn: (payload: CreateAgentPayload) => {
      if (!token) {
        throw new Error("Token not found");
      }
      return createAgentApi(payload, token);
    },

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      // Still invalidate to ensure consistency with server
      queryClient.invalidateQueries({ queryKey: ["agents"] });
    },

    onError: (error: any) => {
      console.error("Create agent error: ", error);
      console.error("Create agent error:", error?.error?.details);
      toast.error(error.message);
    },
  });
};

export const useGetAgents = () => {
  const token = useAppSelector((state) => state.auth.token);
  return useQuery({
    queryKey: ["agents"],
    queryFn: () => {
      if (!token) {
        throw new Error("Token not found");
      }
      return getAgentsApi(token);
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Data stays in cache for 30 minutes
    refetchOnMount: true, // Only refetch on component mount
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  });
};
