import { useMutation, } from "@tanstack/react-query"
import { loginApi, signupApi, resetPasswordApi} from "./auth.api"
import { toast } from "sonner"
import { useAppDispatch } from "@/store/hooks"
import { setUser } from "@/store/slices/auth/auth-slice"


export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message)
      }
      //useAppDispatch(setUser(res.user)) //todo
        // todo: localStorage.setItem("token", res.token)
      toast.success(res.message)
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
      if (!res.success) {
        toast.error(res.message)
      }
      toast.success(res.message)
    },

    onError: (e: Error) => {
      toast.error(e.message)
    },
  })

export const useResetPassword = () =>
  useMutation({
    mutationFn: resetPasswordApi,

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message)
        return
      }
      toast.success(res.message)
    },

    onError: (error) => {
      toast.error(error.message)
    },
  })

