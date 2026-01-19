import { useMutation, useQueryClient } from "@tanstack/react-query"
import { loginApi, signupApi } from "./auth.api"
import { toast } from "sonner"
import { useAppDispatch } from "@/store/hooks"
import { setUser } from "@/store/slices/auth/auth-slice"

export const useLogin = () => {
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      if (res.success) {
        dispatch(setUser(res.user))
        // todo: localStorage.setItem("token", res.token)
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
    },
    onError: (e: Error) => {
      toast.error(e.message)
    },
  })
}


export const useSignup = () =>
  useMutation({
    mutationFn: signupApi,
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
    },
    onError: (e: Error) => {
      toast.error(e.message)
    },
  })
