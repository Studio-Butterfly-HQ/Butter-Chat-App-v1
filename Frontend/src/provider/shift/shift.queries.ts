import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createShiftApi } from "./shift.api"
import type { CreateShiftPayload } from "./shift.types"
import { useAppSelector } from "@/store/hooks"


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
