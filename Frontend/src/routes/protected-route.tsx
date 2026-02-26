import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";


export default function ProtectedRoute() {
  const location = useLocation();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isOnboardingComplete = useAppSelector(
    (state) => state.auth.isOnboardingComplete,
  );

  // console.log("ProtectedRoute check:", {
  //   isAuthenticated,
  //   isOnboardingComplete,
  //   pathname: location.pathname,
  // });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // // if onboarding is not done
  // if (!isOnboardingComplete && location.pathname !== "/onboarding") {
  //   return <Navigate to="/onboarding" replace />;
  // }

  // // if onboarding is done
  // if (isOnboardingComplete && location.pathname === "/onboarding") {
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />
}