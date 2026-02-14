import { NavLink, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NotificationsMenu } from "@/components/dashboard/notifications/notifications-menu";

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const location = useLocation();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {projects.map((item) => {
          if (item.name === "Notifications") {
            return (
              <SidebarMenuItem key={item.name}>
                <NotificationsMenu>
                  <SidebarMenuButton tooltip={item.name}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </NotificationsMenu>
              </SidebarMenuItem>
            );
          }

          const isActive = location.pathname.startsWith(item.url);

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                tooltip={item.name}
                className={
                  isActive ? "font-medium text-foreground bg-muted" : ""
                }
              >
                <NavLink to={item.url} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
