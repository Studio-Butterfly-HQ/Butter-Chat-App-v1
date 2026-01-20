import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAgentApi } from "./agent.api"
import { toast } from "sonner"
import type { CreateAgentPayload } from "./agent.types"

export const useCreateAgent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAgentApi,

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message)
        return
      }
      toast.success(res.message)
      // if you later have agents list
      queryClient.invalidateQueries({queryKey: ["agents"],})
    },

    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
