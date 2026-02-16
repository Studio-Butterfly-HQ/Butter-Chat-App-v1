import { Outlet } from "react-router-dom";

import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useCompanyProfile } from "@/provider/profile/profile.queries";
import { TestAiAgentWrapper } from "@/components/dashboard/agent/test-ai-agent/test-ai-agent-wrapper";
import { SettingsSidebarWrapper } from "@/components/dashboard/settings/settings-sidebar-wrapper";
import { InboxSidebarWrapper } from "@/components/dashboard/inbox/sidebar/inbox-sidebar-wrapper";

import { UserSidebarWrapper } from "@/components/dashboard/inbox/user-details/user-sidebar-wrapper";
import { CustomerChatWrapper } from "@/components/dashboard/inbox/chat/customer-chat-wrapper";
import { ButterAiSidebarWrapper } from "@/components/dashboard/butter-ai/butter-ai-sidebar-wrapper";

export default function DashboardLayout() {
  const { isLoading } = useCompanyProfile();

  return (
    <SidebarProvider>
      <AppSidebar isLoading={isLoading} />
      <InboxSidebarWrapper />
      <SettingsSidebarWrapper />
      <SidebarInset className="max-h-svh overflow-hidden">
        <main
          className={`h-full md:m-2 md:ml-0 border dark:border-0 md:rounded-xl bg-popover flex-1 overflow-hidden`}
        >
          <Outlet />
        </main>
      </SidebarInset>
      <ButterAiSidebarWrapper />
      <TestAiAgentWrapper />
      <CustomerChatWrapper />
      <UserSidebarWrapper />
    </SidebarProvider>
  );
}
