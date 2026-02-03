import * as React from "react";
import { useAppSelector } from "@/store/hooks";

import Testaiagent from "@/components/dashboard/agent/test-ai-agent/test-ai-agent";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useAppDispatch } from "@/store/hooks";
import { closeTestAiAgent } from "@/store/slices/ui/ui-slice";
import { useLocation } from "react-router-dom";

export function TestAiAgentWrapper({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isTestAiAgentPage = location.pathname.startsWith("/ai-agent");

  const isTestAiAgentOpen = useAppSelector(
    (state) => state.ui.isTestAiAgentOpen,
  );
  if (!isTestAiAgentPage || !isTestAiAgentOpen) {
    return null;
  }

  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh p-3 pl-0 w-1/4"
      {...props}
    >
      <Testaiagent />
    </Sidebar>
  );
}
