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
import { BotMessageSquare, PenLine, Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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

import { useAppDispatch } from "@/store/hooks";
import { closeAskButterAiSidebar } from "@/store/slices/ui/ui-slice";

export default function ButterAiSidebar() {
  const dispatch = useAppDispatch();
  return (
    <div className="flex border dark:border-0 bg-popover rounded-xl h-full flex-col">
      <SidebarHeader className="border-b border-border h-16 p-4 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <BotMessageSquare className="h-6 w-5" />
          <span className="text-base font-semibold">Chat History</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => dispatch(closeAskButterAiSidebar())}
        >
          <X className="h-4 w-4" />
        </Button>
      </SidebarHeader>
      <SidebarHeader>
        <SidebarGroup>
          <SidebarMenu className="space-y-1">
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-10">
                <div className="cursor-pointer border border-border">
                  <Plus className="h-4 w-4" />
                  <span className="text-sm">New Chat</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-10">
                <div className="cursor-pointer border border-border">
                  <Search className="h-4 w-4" />
                  <span className="text-sm">Search Chats</span>
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
              <SidebarMenuItem key={chat.id} className="border-b border-border">{/*todo hover:border-transparent*/}
                <SidebarMenuButton asChild className="h-9">
                  <div className="cursor-pointer">
                    <span className="text-sm text-muted-foreground truncate">
                      {chat.title}
                    </span>
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
