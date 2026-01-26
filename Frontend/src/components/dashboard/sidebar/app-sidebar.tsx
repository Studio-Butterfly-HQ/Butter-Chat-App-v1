import * as React from "react"
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
  CalendarCheck2 ,
  LayoutDashboard,
  Sparkles,
  Inbox,
  ShoppingBag,
  BellRing 
} from "lucide-react"

import { NavMain } from "@/components/dashboard/sidebar/nav-main"
import { NavProjects } from "@/components/dashboard/sidebar/nav-projects"
import { NavUser } from "@/components/dashboard/sidebar/nav-user"
import { TeamSwitcher } from "@/components/dashboard/sidebar/team-switcher"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
      icon: Sparkles ,
      isActive: true,
    },
    {
      title: "Conversations",
      url: "#",
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
      icon: CalendarCheck2 ,
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
      title: "Analytics",
      url: "#",
      icon: TrendingUp ,
    },
    {
      title: "Audiences",
      url: "/dashboard/Audiences",
      icon: Users ,
    },
    {
      title: "Training Center",
      url: "#",
      icon: Lightbulb ,
    },
    {
      title: "Bots",
      url: "/dashboard/Bots",
      icon: BotMessageSquare ,
    },
  ],
  projects: [
    {
      name: "Help",
      url: "#",
      icon: Info ,
    },
    {
      name: "Settings",
      url: "/dashboard/settings",
      icon: Settings ,
    },
    {
      name: "Notifications",
      url: "#",
      icon: BellRing,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader >
      <div className="px-4"><Separator /></div>
      <SidebarContent className="overflow-y-auto scrollbar-hide flex justify-between">
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <div className="px-4"><Separator /></div>
      <SidebarFooter >
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
