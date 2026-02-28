import * as React from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "@/components/ui/sidebar";
import { SettingsSidebar } from "./settings-sidebar";

export function SettingsSidebarWrapper({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const isSettingsPage = location.pathname.startsWith("/settings");

  if (!isSettingsPage) return null;

  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh p-2 pl-0 w-1/5"
      {...props}
    >
      <SettingsSidebar />
    </Sidebar>
  );
}
