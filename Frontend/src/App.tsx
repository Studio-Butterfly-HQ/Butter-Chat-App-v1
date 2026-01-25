import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SignupPage from "./pages/auth/signup-page";
import LoginPage from "./pages/auth/login-page";
import ResetPasswordPage from "./pages/auth/reset-password-page";
import OnboardingPage from "./pages/onboarding/onboarding-page";
import DashboardLayout from "./pages/dashboard/dashboard-layout";
import DashboardHome from "./pages/dashboard/home/dashboard-home";
import Audiences from "./pages/dashboard/audiences/audiences-page";
import Bots from "./pages/dashboard/bots/bots";

import ProtectedRoute from "./routes/protected-route";
import AuthRoute from "./routes/auth-route";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route element={<AuthRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="audiences" element={<Audiences />} />
            <Route path="bots" element={<Bots />} />
          </Route>
        </Route>
        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
