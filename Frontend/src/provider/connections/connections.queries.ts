import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toggleConnectionApi } from "./connections.api"
import { toast } from "sonner"
import { useAppSelector } from "@/store/hooks"

export const useToggleConnection = () => {
  const queryClient = useQueryClient()
  const token = useAppSelector((state) => state.auth.token)

  return useMutation({
    mutationFn: () => {
      if (!token) {
        throw new Error("No auth token found")
      }
     return toggleConnectionApi(token);
    },

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message)
        return
      }
      toast.success(res.message)
      // refresh connections if you later fetch from backend
      queryClient.invalidateQueries({queryKey: ["connections"],})
    },

    onError: (error: any) => {
        console.error("Toggle connection error details:", error?.error?.details)
        toast.error(error.message);
    },
  })
}
