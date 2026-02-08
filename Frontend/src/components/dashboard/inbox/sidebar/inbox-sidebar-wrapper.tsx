import * as React from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "@/components/ui/sidebar";
import { InboxSidebar } from "../inbox-sidebar";
import { useAppSelector } from "@/store/hooks";

export function InboxSidebarWrapper({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const isInboxPage = location.pathname.startsWith("/inbox");
  const isUserSidebarOpen = useAppSelector(
      (state) => state.ui.isUserSidebarOpen,
    );

  if (!isInboxPage || isUserSidebarOpen) return null;

  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex bg-background top-0 h-svh p-3 pl-0 w-1/5"
      {...props}
    >
      <InboxSidebar />
    </Sidebar>
  );
}
