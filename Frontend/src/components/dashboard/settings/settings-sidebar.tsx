import { NavLink, useLocation } from "react-router-dom";
import { Settings, Bell, Shield, Link2 } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export function SettingsSidebar() {
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
    <div className="flex bg-popover rounded-xl h-full flex-col">
      <SidebarHeader className="border-b border-border h-16 justify-center">
        <div className="flex items-center gap-2 px-2">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-6"
          />
          <span className="text-base font-semibold">Settings</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
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
                    <NavLink to={`/settings/${item.path}`}>
                      <item.icon className="h-4 w-4 mr-2" />
                      <span className="text-sm">{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </div>
  );
}
