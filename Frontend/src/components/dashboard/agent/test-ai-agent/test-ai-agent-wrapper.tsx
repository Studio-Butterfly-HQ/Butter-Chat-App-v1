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

export function TestAiAgentWrapper({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const isOpen = useAppSelector((state) => state.ui.isTestAiAgentOpen);
  if (!isOpen) return null;

  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh p-3 pl-0 w-1/4"
      {...props}
    >
      <Testaiagent />
    </Sidebar>
  )
}
