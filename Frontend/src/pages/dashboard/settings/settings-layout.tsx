import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Settings, User, Bell, Shield, Link2 } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "react-router-dom";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function SettingsLayout() {
  const navigationItems = [
    {
      name: "General",
      path: "general",
      icon: Settings,
    },
    {
      name: "Connect Accounts",
      path: "connect-accounts",
      icon: Link2,
    },
    {
      name: "Notifications",
      path: "notifications",
      icon: Bell,
    },
    {
      name: "Security",
      path: "security",
      icon: Shield,
    },
  ];
  const location = useLocation();
  return (
    <div className="flex min-h-[calc(100vh-1.5rem)] gap-3 bg-background">
      {/* Left Sidebar Navigation */}
      <div className="w-1/5  md:rounded-xl bg-popover flex flex-col">
        <header className="flex border-b border-border mb-0.5 h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-6"
            />
            <div className="flex items-center gap-4">
              <span className="text-base font-semibold">Settings</span>
            </div>
          </div>
        </header>
        <nav className="flex-1 overflow-auto">
          <SidebarGroup className="p-4">
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive =
                  location.pathname === `/settings/${item.path}` ||
                  location.pathname.startsWith(`/settings/${item.path}/`);
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      className={
                        isActive ? "font-medium text-foreground bg-muted" : ""
                      }
                    >
                      <NavLink to={item.path}>
                        <span className="text-sm">{item.name}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </nav>
      </div>
      {/* Right Side */}
      <div className="flex-1 md:rounded-xl bg-popover overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
