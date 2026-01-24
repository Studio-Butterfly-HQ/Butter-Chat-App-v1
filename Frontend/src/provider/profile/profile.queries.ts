import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfileApi } from "./profile.api"
import { ApiResponse, Profile, ProfilePayload } from "./profile.types"
import { useQuery } from "@tanstack/react-query"
import { fetchProfileMetaApi } from "./profile.api"
import { ProfileMetaResponse } from "./profile.types"
import { toast } from "sonner"
import { useAppSelector } from "@/store/hooks"

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  const token = useAppSelector((state) => state.auth.token)

  return useMutation({
    mutationFn: (payload: ProfilePayload) => {
      if (!token) {
        throw new Error("No auth token found")
      }
      return updateProfileApi(payload, token)
    },

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message)
        return
      }
      toast.success(res.message)
      queryClient.invalidateQueries({queryKey: ["profile"],})
    },

    onError: (error: any) => {
      console.error("Update profile error details:", error?.error?.details)
      toast.error(error.message);
    },
  })
}



export const useProfileMeta = () =>
  useQuery({
    queryKey: ["profile-meta"],
    queryFn: fetchProfileMetaApi,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  })
