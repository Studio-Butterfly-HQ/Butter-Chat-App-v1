import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import SignupPage from "./pages/auth/signup-page"
import LoginPage from "./pages/auth/login-page"
import ResetPasswordPage from "./pages/auth/reset-password-page"
import OnboardingPage from "./pages/onboarding/onboarding-page"
import DashboardPage from "./pages/dashboard/dashboard-page"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

