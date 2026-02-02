"use client";

import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Inbox,
  Users,
  Archive,
  Book,
  Search,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarContent,
  SidebarMenuBadge,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

export function InboxSidebar() {
  const location = useLocation();

  const navigationItems = [
    {
      title: "Your Inbox",
      url: "/inbox/your-inbox",
      icon: Inbox,
      badge: 15,
    },
    {
      title: "Unassigned",
      url: "/inbox/unassigned",
      icon: Users,
      badge: 15,
    },
    {
      title: "Closed",
      url: "/inbox/closed-box",
      icon: Archive,
      badge: 15,
    },
    {
      title: "Closed",
      url: "/inbox/closed-chat",
      icon: Book,
      badge: 15,
    },
    {
      title: "Categories",
      url: "#",
      icon: LayoutGrid,
      items: [
        {
          title: "eCommerce",
          url: "/inbox/category/ecommerce",
          badge: 15,
        },
        {
          title: "General",
          url: "/inbox/category/general",
          badge: 15,
        },
        {
          title: "Support",
          url: "/inbox/category/support",
          badge: 15,
        },
      ],
    },
    {
      title: "Views",
      url: "#",
      icon: LayoutGrid,
      items: [
        {
          title: "eCommerce",
          url: "/inbox/view/view-ecommerce",
          badge: 15,
        },
        {
          title: "General",
          url: "/inbox/view/view-general",
          badge: 15,
        },
        {
          title: "Support",
          url: "/inbox/view/view-support",
          badge: 15,
        },
      ],
    },
  ];

  return (
    <div className="flex bg-popover rounded-xl border border-border dark:border-none h-full flex-col">
      <SidebarHeader className="border-b border-border h-16 justify-center">
        <div className="flex items-center gap-2 px-2">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-6"
          />
          <span className="text-base font-semibold">Inbox</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="scrollbar-hide">
        <SidebarGroup className="p-4">
          <SidebarMenu>
            {navigationItems.map((item, index) => {
              const isActive =
                location.pathname === item.url ||
                // any nested route under the parent (e.g. /ai-agent/websites)
                location.pathname.startsWith(item.url) ||
                // or any explicit sub-item match
                item.items?.some((sub) =>
                  location.pathname.startsWith(sub.url),
                );
              return (
                <Collapsible
                  key={index}
                  asChild
                  defaultOpen={isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem
                    className={`${item?.title === "Categories" ? "pt-4" : ""}`}
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        className={isActive ? "bg-muted font-medium" : ""}
                        tooltip={item.title}
                      >
                        <NavLink to={item.url}>
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span>{item.title}</span>
                          {item.items && (
                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.badge && !item.items && (
                      <SidebarMenuBadge className="text-xs text-muted-foreground">
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                    {item.items && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem, subIndex) => (
                            <SidebarMenuSubItem key={subIndex}>
                              <SidebarMenuSubButton asChild>
                                <NavLink
                                  to={subItem.url}
                                  className={({ isActive }) =>
                                    isActive
                                      ? "bg-muted font-medium w-full flex justify-between pr-2"
                                      : "w-full flex justify-between pr-2"
                                  }
                                >
                                  <span className="font-normal">{subItem.title}</span>
                                  {subItem.badge && (
                                    <span className="text-xs text-muted-foreground">
                                      {subItem.badge}
                                    </span>
                                  )}
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </div>
  );
}
