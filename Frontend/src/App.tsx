import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import SignupPage from "./pages/auth/signup-page"
import LoginPage from "./pages/auth/login-page"
import ResetPasswordPage from "./pages/auth/reset-password-page"
import OnboardingPage from "./pages/onboarding/onboarding-page"
import DashboardPage from "./pages/dashboard/dashboard-page"

import ProtectedRoute from "./routes/protected-route"
import AuthRoute from "./routes/auth-route"

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
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
