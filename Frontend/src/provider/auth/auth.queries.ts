import { useMutation, } from "@tanstack/react-query"
import { loginApi, signupApi, resetPasswordApi} from "./auth.api"
import { toast } from "sonner"
import { useAppDispatch } from "@/store/hooks"
import { setAuth, completeOnboarding} from "@/store/slices/auth/auth-slice"
import { DUMMY_TOKEN } from "@/constants"


export const useLogin = () => {
  const dispatch = useAppDispatch()
  return useMutation({
    mutationFn: loginApi,
    
    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message)
      } 
      else {
        dispatch(
          setAuth({
            token: res.data.accessToken,
          }),
        );
        dispatch(completeOnboarding());
        toast.success(res.message);
      }
    },
    
    onError: (error: any) => {
      console.error("login error details:", error?.error?.details);
      toast.error(error.message);
    },
  })
}


export const useSignup = () => {
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: signupApi,

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message)
      }
      else {
        dispatch(
          setAuth({
            token: res.data.accessToken,
            })
          )
        toast.success(res.message)
      }
    },

    onError: (error: any) => {
      console.error("Signup error details:", error?.error?.details)
      toast.error(error.message);
    },
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPasswordApi,

    onSuccess: (res) => {
      if (!res.success) {
        toast.error(res.message)
      }
      else {
        toast.success(res.message)
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}