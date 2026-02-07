import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/store/hooks";
import { inviteUserApi, getUsersApi, registerUserApi } from "./user.api";
import type { InviteUserPayload, RegisterUserPayload } from "./user.types";
import { toast } from "sonner";

export const useInviteUser = () => {
  const queryClient = useQueryClient();
  const token = useAppSelector((state) => state.auth.token);

  return useMutation({
    mutationFn: (payload: InviteUserPayload) => {
      if (!token) {
        throw new Error("Token not found");
      }
      return inviteUserApi(payload, token);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
    },
    onError: (error: any) => {
      console.error("Invite user error details: ", error?.error?.details);
      toast.error(error.message || "Failed to invite user");
    },
  });
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      payload,
      token,
    }: {
      payload: RegisterUserPayload;
      token: string;
    }) => {
      return registerUserApi(payload, token);
    },
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({ queryKey: ["shifts"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      console.error("Register user error details: ", error?.error?.details);
      toast.error(error.message || "Failed to complete registration");
    },
  });
};

export const useGetUsers = () => {
  const token = useAppSelector((state) => state.auth.token);

  return useQuery({
    queryKey: ["users"],
    queryFn: () => {
      if (!token) {
        throw new Error("Token not found");
      }
      return getUsersApi(token);
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Data stays in cache for 30 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: true, // Only refetch on component mount
  });
};
