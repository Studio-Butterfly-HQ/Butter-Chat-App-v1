import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfileApi } from "./profile.api"
import { ApiResponse, Profile, ProfilePayload } from "./profile.types"
import { useQuery } from "@tanstack/react-query"
import { fetchProfileMetaApi } from "./profile.api"
import { ProfileMetaResponse } from "./profile.types"
import { toast } from "sonner"




export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateProfileApi,

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message)
        return
      }
      toast.success(res.message)
      queryClient.invalidateQueries({queryKey: ["profile"],})
    },

    onError: (error: Error) => {
      toast.error(error.message)
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
