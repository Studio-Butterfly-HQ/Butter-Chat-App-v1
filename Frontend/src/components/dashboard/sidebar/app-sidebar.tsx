import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Info,
  LogOut,
  Settings,
  Users,
  Lightbulb,
  BotMessageSquare,
  TrendingUp,
  CalendarCheck2,
  LayoutDashboard,
  Sparkles,
  Inbox,
  ShoppingBag,
  ListChecks,
  BellRing,
  FileText
} from "lucide-react";

import { NavMain } from "@/components/dashboard/sidebar/nav-main";
import { NavProjects } from "@/components/dashboard/sidebar/nav-projects";
import { NavUser } from "@/components/dashboard/sidebar/nav-user";
import { TeamSwitcher } from "@/components/dashboard/sidebar/team-switcher";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/store/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Ask Butter AI",
      url: "#",
      icon: Sparkles,
      isActive: true,
    },
    {
      title: "Inbox",
      url: "/inbox",
      icon: Inbox,
      isActive: true,
    },
    {
      title: "Ecommerce",
      url: "#",
      icon: ShoppingBag,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Appointments",
      url: "#",
      icon: CalendarCheck2,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Save Replies",
      url: "#",
      icon: FileText,
    },
    {
      title: "Tasks",
      url: "#",
      icon: ListChecks,
    },
    {
      title: "Analytics",
      url: "#",
      icon: TrendingUp,
    },
    {
      title: "Customers",
      url: "#",
      icon: Users,
    },
    // {
    //   title: "Training Center",
    //   url: "#",
    //   icon: Lightbulb,
    // },
    {
      title: "AI Agent",
      url: "/ai-agent",
      icon: BotMessageSquare,
    },
  ],
  projects: [
    {
      name: "Help",
      url: "#",
      icon: Info,
    },
    {
      name: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      name: "Notifications",
      url: "#",
      icon: BellRing,
    },
  ],
};

export function AppSidebar({
  isLoading,
  ...props
}: React.ComponentProps<typeof Sidebar> & { isLoading?: boolean }) {
  const company = useAppSelector((state) => state.auth.company);
  const user = useAppSelector((state) => state.auth.user);
  return (
    <Sidebar className="py-1" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto scrollbar-hide flex justify-between">
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <div className="px-4">
        <Separator />
      </div>
      <SidebarFooter>
        {isLoading ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" className="cursor-default">
                <Skeleton className="h-8 w-8 rounded-sm" />
                <div className="grid flex-1 gap-1.5 text-left text-sm leading-tight">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : user && (
          <NavUser
            user={{
              name: user.user_name,
              email: user.email,
              avatar: user.profile_uri || "",
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
