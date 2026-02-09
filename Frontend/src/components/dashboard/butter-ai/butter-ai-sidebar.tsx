import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarContent,
  SidebarGroupLabel,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { PenLine, Plus, Search } from "lucide-react";

// Demo chat history data
const chatHistory = [
  { id: "1", title: "What's the most selling product on my store this month?" },
  { id: "2", title: "How many orders do I have today?" },
  {
    id: "3",
    title:
      "Let customers know that our outlet will be closed on upcoming Friday due to Puja 2025",
  },
  { id: "4", title: "What's the most selling product on my store this month?" },
  { id: "5", title: "How many orders do I have today?" },
  {
    id: "6",
    title:
      "Let customers know that our outlet will be closed on upcoming Friday due to Puja 2025",
  },
  { id: "7", title: "What's the most selling product on my store this month?" },
  { id: "8", title: "How many orders do I have today?" },
  {
    id: "9",
    title:
      "Let customers know that our outlet will be closed on upcoming Friday due to Puja 2025",
  },
  {
    id: "10",
    title: "What's the most selling product on my store this month?",
  },
  { id: "11", title: "How many orders do I have today?" },
  {
    id: "12",
    title:
      "Let customers know that our outlet will be closed on upcoming Friday due to Puja 2025",
  },
  {
    id: "13",
    title: "What's the most selling product on my store this month?",
  },
  { id: "14", title: "How many orders do I have today?" },
  {
    id: "15",
    title:
      "Let customers know that our outlet will be closed on upcoming Friday due to Puja 2025",
  },
];

export default function ButterAiSidebar() {
  return (
    <div className="flex bg-popover rounded-xl h-full flex-col">
      <SidebarHeader className="border-b border-border h-16 justify-center">
        <div className="flex items-center gap-2 px-2">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-6"
          />
          <span className="text-base font-semibold">Butter AI</span>
        </div>
      </SidebarHeader>
      <SidebarHeader>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <div className="cursor-pointer">
                  <Plus className="h-4 w-4" />
                  <span className="text-sm">New chat</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <div className="cursor-pointer">
                  <Search className="h-4 w-4" />
                  <span className="text-sm">Search chats</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent className="scrollbar-hide">
        {/* Chat History */}
        <SidebarGroup className="px-4">
          <SidebarGroupLabel className="text-xs text-muted-foreground">
            Your chats
          </SidebarGroupLabel>
          <SidebarMenu>
            {chatHistory.map((chat) => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton asChild>
                  <div className="cursor-pointer">
                    <span className="text-sm truncate">{chat.title}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </div>
  );
}
