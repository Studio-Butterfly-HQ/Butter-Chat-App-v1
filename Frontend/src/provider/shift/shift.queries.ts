import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createShiftApi, getShiftsApi } from "./shift.api"
import type { CreateShiftPayload } from "./shift.types"
import { useAppSelector } from "@/store/hooks"

export const useGetShifts = () => {
  const token = useAppSelector((state) => state.auth.token);
  
  return useQuery({
    queryKey: ["shifts"],
    queryFn: () => {
      if (!token) {
        throw new Error("Token not found");
      }
      return getShiftsApi(token);
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Data stays in cache for 30 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: true, // Only refetch on component mount
  }); 
};

export const useCreateShift = () => {
  const queryClient = useQueryClient()
  const token = useAppSelector((state) => state.auth.token);
  return useMutation({
    mutationFn: (payload: CreateShiftPayload ) => {
        if(!token){
            throw new Error("Token not found");
        }
        return createShiftApi( payload, token);
    },

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message)
        return
      }

      toast.success(res.message)

      queryClient.invalidateQueries({ queryKey: ["shifts"]})
    },

    onError: (error: any) => {
      console.error("Create shift error details: ", error?.error?.details);
      toast.error(error.message)
    },
  })
}
