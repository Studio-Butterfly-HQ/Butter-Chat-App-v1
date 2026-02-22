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
  FileText,
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
      title: "Ask Butter AI",
      url: "/ask-butter-ai",
      icon: Sparkles,
      isActive: true,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Inbox",
      url: "/inbox",
      icon: Inbox,
      isActive: true,
    },
    // {
    //   title: "Ecommerce",
    //   url: "#",
    //   icon: ShoppingBag,
    //   items: [
    //     {
    //       title: "Genesis",
    //       url: "#",
    //     },
    //     {
    //       title: "Explorer",
    //       url: "#",
    //     },
    //     {
    //       title: "Quantum",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Appointments",
    //   url: "#",
    //   icon: CalendarCheck2,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    {
      title: "Save Replies",
      url: "/save-reply",
      icon: FileText,
    },
    {
      title: "Tasks",
      url: "#",
      icon: ListChecks,
    },
    {
      title: "Analytics",
      url: "/activity",
      icon: TrendingUp,
    },
    {
      title: "Customers",
      url: "/customers",
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
    {
      title: "Test Agent",
      url: "/test-agent",
      icon: Lightbulb,
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
      url: "/settings/general",
      icon: Settings,
    },
    {
      name: "Notifications",
      url: "#",
      icon: BellRing,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
