import { LoginPayload, SignupPayload, ResetPasswordPayload } from "./auth.types"
import { AUTH_API } from "@/constants";

export const loginApi = async (payload: LoginPayload) => {
  const res = await fetch(`${AUTH_API.LOGIN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  const data = await res.json();
  if (!res.ok) {
    throw data;
  }
  return data
}

export const signupApi = async (payload: SignupPayload) => {
  const res = await fetch(`${AUTH_API.SIGNUP}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  const data = await res.json();
  if (!res.ok) {
    throw data;
  }
  return data
}

export const resetPasswordApi = async (payload: ResetPasswordPayload) => {
  const res = await fetch(`${AUTH_API.RESET_PASSWORD}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  const data = await res.json();
  if (!res.ok) {
    throw data;
  }

  return data;
}

