import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useCompanyProfile } from "@/provider/profile/profile.queries";
import { TestAiAgentWrapper } from "@/components/dashboard/agent/test-ai-agent/test-ai-agent-wrapper";
import { SettingsSidebarWrapper } from "@/components/dashboard/settings/settings-sidebar-wrapper";
import { InboxSidebarWrapper } from "@/components/dashboard/inbox/inbox-sidebar-wrapper";
import { useAppDispatch } from "@/store/hooks";
import { UserSidebarWrapper } from "@/components/dashboard/inbox/user-sidebar-wrapper";
import {
  closeTestAiAgent,
  resetTeamsTabs,
  resetAiAgentTabs,
} from "@/store/slices/ui/ui-slice";

export default function DashboardLayout() {
  const { isLoading } = useCompanyProfile();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!location.pathname.startsWith("/ai-agent")) {
      dispatch(resetAiAgentTabs());
    }
    if (!location.pathname.startsWith("/teams")) {
      dispatch(resetTeamsTabs());
    }
  }, [location.pathname, dispatch]);

  return (
    <SidebarProvider>
      <AppSidebar isLoading={isLoading} />
      <SettingsSidebarWrapper />
      <SidebarInset>
        <main
          className={`min-h-[calc(100vh-1.5rem)] md:m-3 md:ml-0 border dark:border-0 md:rounded-xl bg-popover flex-1 overflow-y-auto scrollbar-hide`}
        >
          <Outlet />
        </main>
      </SidebarInset>
      <TestAiAgentWrapper />
      <InboxSidebarWrapper />
      <UserSidebarWrapper />
    </SidebarProvider>
  );
}
