import { useMutation } from "@tanstack/react-query"
import { initiateMetaConnectionApi } from "./connection.api"
import { toast } from "sonner"
import { useAppSelector } from "@/store/hooks"

export const useMetaConnection = () => {
  const token = useAppSelector((state) => state.auth.token)

  return useMutation({
    mutationFn: () => {
      if (!token) {
        throw new Error("No auth token found")
      }
      return initiateMetaConnectionApi(token)
    },

    onSuccess: (data) => {
      if (data.redirectUrl) {
        // Open Facebook OAuth in new window
        window.open(data.redirectUrl, "_blank")
      }
    },

    onError: (error: any) => {
      console.error("Meta connection error:", error)
      toast.error(error.message || "Failed to initiate connection")
    },
  })
}