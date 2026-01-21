import { useMutation, } from "@tanstack/react-query"
import { loginApi, signupApi, resetPasswordApi} from "./auth.api"
import { toast } from "sonner"
import { useAppDispatch } from "@/store/hooks"
import { setAuth } from "@/store/slices/auth/auth-slice"
import { DUMMY_TOKEN } from "@/constants"


export const useLogin = () => {
  const dispatch = useAppDispatch()
  return useMutation({
    mutationFn: loginApi,
    
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message)
      }
      dispatch(
        setAuth({
          token: res.data.accessToken,
        })
      )
      toast.success(res.message)
    },
    
    onError: (error: any) => {
      console.error("login error details:", error?.error?.details);
      toast.error(error.message);
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

    onError: (error: any) => {
      console.error("Signup error details:", error?.error?.details)
      toast.error(error.message);
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

