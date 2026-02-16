import * as React from "react";
import { useLocation } from "react-router-dom";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import ButterAiSidebar from "./butter-ai-sidebar";
import { useAppSelector } from "@/store/hooks";

export function ButterAiSidebarWrapper({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const isButterAiPage = location.pathname.startsWith("/ask-butter-ai");
  const isAskButterAiSidebarOpen = useAppSelector(
    (state) => state.ui.isAskButterAiSidebarOpen,
  );
  if (!isButterAiPage || !isAskButterAiSidebarOpen) return null;
  return (
    <Sidebar
      collapsible="none"
      side="right"
      className="sticky hidden lg:flex top-0 h-svh p-2 pl-0 w-1/5"
      {...props}
    >
      <SidebarContent className="bg-transparent overflow-hidden">
        <ButterAiSidebar />
      </SidebarContent>
    </Sidebar>
  );
}
