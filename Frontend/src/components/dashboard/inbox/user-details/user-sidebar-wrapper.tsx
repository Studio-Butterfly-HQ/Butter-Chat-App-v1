import * as React from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "@/components/ui/sidebar";
import { useAppSelector } from "@/store/hooks";
import UserSidebar from "@/components/dashboard/inbox/user-details/user-sidebar";

export function UserSidebarWrapper({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const isInboxPage = location.pathname.startsWith("/inbox");
  const isUserSidebarOpen = useAppSelector(
    (state) => state.ui.isUserSidebarOpen,
  );

  if (!isInboxPage || !isUserSidebarOpen) return null;

  return (
    <Sidebar
      collapsible="none"
      side="right"
      className="sticky hidden lg:flex top-0 h-svh p-3 pl-0 w-1/5"
      {...props}
    >
      <UserSidebar />
    </Sidebar>
  );
}
