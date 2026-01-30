import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "@/store/hooks"

export default function AuthRoute() {
  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated
  )

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
