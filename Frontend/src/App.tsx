import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import SignupPage from "./pages/auth/signup-page"
import LoginPage from "./pages/auth/login-page"
import ResetPasswordPage from "./pages/auth/reset-password-page"
import OnboardingPage from "./pages/onboarding/onboarding-page"
import DashboardLayout from "./pages/dashboard/dashboard-layout"
import DashboardHome from "./pages/dashboard/home/dashboard-home"
import Audiences from "./pages/dashboard/audiences/audiences"
import Bots from "./pages/dashboard/bots/bots"


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

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="Audiences" element={<Audiences />} />
          <Route path="Bots" element={<Bots />} />
        </Route>
        
        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

