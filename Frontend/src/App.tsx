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
import SettingsConnectAccounts from "./pages/dashboard/settings/connect-accounts/connect-accounts-page";
import InvitationPage from "./pages/invitation/invitation-page";
import ProtectedRoute from "./routes/protected-route";
import AuthRoute from "./routes/auth-route";
import WebsitePage from "./pages/dashboard/ai-agent/websites/websites-page";
import DocumentsPage from "./pages/dashboard/ai-agent/documents/documents-page";
import FormsPage from "./pages/dashboard/ai-agent/forms/forms-page";
import FormDetailsPage from "./pages/dashboard/ai-agent/forms/form-details-page";
import InboxLayout from "./pages/dashboard/inbox/inbox-layout";
import YourInboxPage from "./pages/dashboard/inbox/your-inbox/your-inbox-page";
import UnassignedPage from "./pages/dashboard/inbox/unassigned/unassigned-page";
import AskButterAiPage from "./pages/dashboard/ask-butter-ai/ask-butter-ai-page";
import CustomerPage from "./pages/dashboard/customer/customer-page";
import SaveReplyPage from "./pages/dashboard/save-reply/save-reply-page";
import CustomerDetailsPage from "./pages/dashboard/customer/customer-details/customer-details-page";
import AccountPage from "./pages/dashboard/account/account-page";
import AddReplyPage from "./pages/dashboard/save-reply/add-reply/add-reply-page";
import SnippetsPage from "./pages/dashboard/ai-agent/snippets/snippets-page";
import AddNewSnippetsPage from "./pages/dashboard/ai-agent/snippets/add-new-snippets-page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/invitation" element={<InvitationPage />} />

        <Route element={<AuthRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/ask-butter-ai" replace />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="settings" element={<SettingsLayout />}>
              <Route index element={<Navigate to="general" replace />} />
              <Route path="general" element={<SettingsGeneral />} />
              <Route path="connect-accounts" element={<SettingsConnectAccounts />} />
              <Route path="notifications" element={<SettingsNotifications />} />
              <Route path="security" element={<SettingsSecurity />} />
            </Route>
            <Route path="ai-agent" element={<AiAgentLayout />}>
              <Route index element={<AiAgentPage />} />
              <Route path="websites" element={<WebsitePage />} />
              <Route path="documents" element={<DocumentsPage />} />
              <Route path="forms" element={<FormsPage />} />
              <Route path="forms/:formId" element={<FormDetailsPage />} />
              <Route path="snippets" element={<SnippetsPage />} />
              <Route path="snippets/new" element={<AddNewSnippetsPage />} />
            </Route>
            <Route path="inbox" element={<InboxLayout />}>
              {/* <Route index element={<Navigate to="your-inbox" replace />} />
              <Route path="your-inbox" element={<YourInboxPage />} />
              <Route path="unassigned" element={<UnassignedPage />} /> */}
            </Route>
            <Route path="ask-butter-ai" element={<AskButterAiPage />} />
            <Route path="teams" element={<TeamsPage />} />
            <Route path="customers" element={<CustomerPage />} />
            <Route path="save-reply" element={<SaveReplyPage />} />
            <Route path="save-reply/add-reply" element={<AddReplyPage />} />
            <Route path="customers/details" element={<CustomerDetailsPage />} />
            <Route path="account" element={<AccountPage />} />
          </Route>
        </Route>
        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
