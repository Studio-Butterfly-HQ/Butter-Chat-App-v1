import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SignupPage from "./pages/auth/signup-page";
import LoginPage from "./pages/auth/login-page";
import ResetPasswordPage from "./pages/auth/reset-password-page";
import OnboardingPage from "./pages/onboarding/onboarding-page";
import DashboardLayout from "./pages/dashboard/dashboard-layout";
import DashboardHome from "./pages/dashboard/home/dashboard-home";
import AiAgentPage from "./pages/dashboard/ai-agent/ai-agent-page";
import AiAgentLayout from "./pages/dashboard/ai-agent/ai-agent-layout";
import TeamsPage from "./pages/dashboard/user-profile/teams-page";
import SettingsLayout from "./pages/dashboard/settings/settings-layout";
import SettingsGeneral from "./pages/dashboard/settings/general/general-page";
import SettingsSecurity from "./pages/dashboard/settings/security/security-page";
import SettingsNotifications from "./pages/dashboard/settings/notifications/notifications-page";
import ProtectedRoute from "./routes/protected-route";
import AuthRoute from "./routes/auth-route";
import WebsitePage from "./pages/dashboard/ai-agent/websites/websites-page";

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
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="settings" element={<SettingsLayout />}>
              <Route index element={<Navigate to="general" replace />} />
              <Route path="general" element={<SettingsGeneral />} />
              <Route path="security" element={<SettingsSecurity />} />
              <Route path="notifications" element={<SettingsNotifications />} />
            </Route>
            <Route path="ai-agent" element={<AiAgentLayout />}>
              <Route index element={<AiAgentPage />} />
              <Route path="websites" element={<WebsitePage />} />
            </Route>
            <Route path="teams" element={<TeamsPage />} />
          </Route>
        </Route>
        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
