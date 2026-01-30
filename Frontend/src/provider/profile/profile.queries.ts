import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfileApi } from "./profile.api"
import { ApiResponse, Profile, ProfilePayload } from "./profile.types"
import { useQuery } from "@tanstack/react-query"
import { fetchProfileMetaApi } from "./profile.api"
import { ProfileMetaResponse } from "./profile.types"
import { toast } from "sonner"
import { useAppSelector } from "@/store/hooks"
import { fetchCompanyProfileApi } from "./profile.api"
import { useAppDispatch } from "@/store/hooks"
import { setCompany } from "@/store/slices/auth/auth-slice"
import { logout } from "@/store/slices/auth/auth-slice"
import { persistor } from "@/store/index"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

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

export const useCompanyProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = useAppSelector((state) => state.auth.token);

  const query = useQuery({
    queryKey: ["company-profile", token],
    enabled: !!token,

    queryFn: async () => {
      if (!token) {
        throw { message: "No auth token found" };
      }
      return fetchCompanyProfileApi(token);
    },

    retry: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  /* Handle SUCCESS (including success:false) */
  useEffect(() => {
    if (!query.isSuccess) return

    if (!query.data?.success) {
      console.error(
        "Company profile error details:",
        query.data?.error?.details,
      );
      dispatch(logout());
      persistor.purge().then(() => {
        navigate("/login", { replace: true });
      });
      return;
    }
    dispatch(setCompany(query.data.data));
  }, [query.isSuccess, query.data, dispatch, navigate]);

  /* Handle HTTP / Network errors */
  useEffect(() => {
    if (!query.isError) return;

    console.error(
      "Company profile request failed:",
      (query.error as any)?.error?.details ?? query.error,
    );

    dispatch(logout())
    persistor.purge().then(() => {
      navigate("/login", { replace: true })
    })
  }, [query.isError, query.error, dispatch, navigate])

  return query
}




export const useProfileMeta = () =>
  useQuery({
    queryKey: ["profile-meta"],
    queryFn: fetchProfileMetaApi,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  })
