import { LoginPayload, SignupPayload, ResetPasswordPayload } from "./auth.types"

export const loginApi = async (payload: LoginPayload) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error("Login failed please try again later");
  return res.json()
}

export const signupApi = async (payload: SignupPayload) => {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error("Signup failed please try again later");
  return res.json()
}

export const resetPasswordApi = async (payload: ResetPasswordPayload) => {
  const res = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error("Failed to send reset link")
  }

  return res.json()
}

