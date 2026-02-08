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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setActiveInboxTab } from "@/store/slices/ui/ui-slice";

export function InboxSidebar() {
  const location = useLocation();
  const activeInboxTab = useAppSelector((state) => state.ui.activeInboxTab);
  const dispatch = useAppDispatch();

  const navigationItems = [
    {
      title: "Your Inbox",
      url: "/inbox",
      icon: Inbox,
      badge: 15,
      onClick: () => dispatch(setActiveInboxTab("your-inbox")),
      activeTab: "your-inbox",
    },
    {
      title: "Unassigned",
      url: "/inbox",
      icon: Users,
      badge: 15,
      onClick: () => dispatch(setActiveInboxTab("unassigned")),
      activeTab: "unassigned",
    },
    {
      title: "Closed",
      url: "/inbox",
      icon: Archive,
      badge: 15,
      onClick: () => dispatch(setActiveInboxTab("closed-box")),
      activeTab: "closed-box",
    },
    {
      title: "Categories",
      url: "#",
      icon: LayoutGrid,
      items: [
        {
          title: "eCommerce",
          url: "/inbox",
          badge: 15,
          onClick: () => dispatch(setActiveInboxTab("category-ecommerce")),
          activeTab: "category-ecommerce",
        },
        {
          title: "General",
          url: "/inbox",
          badge: 15,
          onClick: () => dispatch(setActiveInboxTab("category-general")),
          activeTab: "category-general",
        },
        {
          title: "Support",
          url: "/inbox",
          badge: 15,
          onClick: () => dispatch(setActiveInboxTab("category-support")),
          activeTab: "category-support",
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
          url: "/inbox",
          badge: 15,
          onClick: () => dispatch(setActiveInboxTab("view-ecommerce")),
          activeTab: "view-ecommerce",
        },
        {
          title: "General",
          url: "/inbox",
          badge: 15,
          onClick: () => dispatch(setActiveInboxTab("view-general")),
          activeTab: "view-general",
        },
        {
          title: "Support",
          url: "/inbox",
          badge: 15,
          onClick: () => dispatch(setActiveInboxTab("view-support")),
          activeTab: "view-support",
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
                item.activeTab && item.activeTab === activeInboxTab;
              const hasActiveSubItem = item.items?.some(
                (subItem) => subItem.activeTab === activeInboxTab,
              );
              const shouldBeOpen = isActive || hasActiveSubItem;

              return (
                <Collapsible
                  key={index}
                  asChild
                  defaultOpen={!!shouldBeOpen}
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
                        onClick={item.onClick}
                      >
                        <div className="cursor-pointer">
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span>{item.title}</span>
                          {item.items && (
                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          )}
                        </div>
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
                          {item.items.map((subItem, subIndex) => {
                            const isSubActive =
                              subItem.activeTab === activeInboxTab;
                            return (
                              <SidebarMenuSubItem key={subIndex}>
                                <SidebarMenuSubButton
                                  asChild
                                  onClick={subItem.onClick}
                                >
                                  <div
                                    className={`cursor-pointer w-full flex justify-between pr-2 ${
                                      isSubActive ? "bg-muted font-medium" : ""
                                    }`}
                                  >
                                    <span className="font-normal">
                                      {subItem.title}
                                    </span>
                                    {subItem.badge && (
                                      <span className="text-xs text-muted-foreground">
                                        {subItem.badge}
                                      </span>
                                    )}
                                  </div>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
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
