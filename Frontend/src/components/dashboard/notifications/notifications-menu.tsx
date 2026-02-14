import {
  ChevronRight,
  MessageSquare,
  Settings,
  ShoppingBag,
  Lightbulb,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const notifications = [
  {
    title: "You have been assigned a new conversation",
    time: "6 Hours Ago",
    icon: MessageSquare,
    bg: "bg-primary/20",
    color: "text-primary",
  },
  {
    title: "You have been assigned a new conversation",
    time: "6 Hours Ago",
    icon: ShoppingBag,
    bg: "bg-orange-500/20",
    color: "text-orange-500",
  },
  {
    title: "You have been assigned a new conversation",
    time: "6 Hours Ago",
    icon: MessageSquare,
    bg: "bg-primary/20",
    color: "text-primary",
  },
  {
    title: "You have been assigned a new conversation",
    time: "6 Hours Ago",
    icon: MessageSquare,
    bg: "bg-primary/20",
    color: "text-primary",
  },
  {
    title: "You have been assigned a new conversation",
    time: "6 Hours Ago",
    icon: Lightbulb,
    bg: "bg-blue-500/20",
    color: "text-blue-500",
  },
  {
    title: "You have been assigned a new conversation",
    time: "6 Hours Ago",
    icon: MessageSquare,
    bg: "bg-primary/20",
    color: "text-primary",
  },
  {
    title: "You have been assigned a new conversation",
    time: "6 Hours Ago",
    icon: MessageSquare,
    bg: "bg-primary/20",
    color: "text-primary",
  },
  {
    title: "You have been assigned a new conversation",
    time: "6 Hours Ago",
    icon: ShoppingBag,
    bg: "bg-orange-500/20",
    color: "text-orange-500",
  },
  {
    title: "You have been assigned a new conversation",
    time: "6 Hours Ago",
    icon: MessageSquare,
    bg: "bg-primary/20",
    color: "text-primary",
  },
  {
    title: "You have been assigned a new conversation",
    time: "6 Hours Ago",
    icon: MessageSquare,
    bg: "bg-primary/20",
    color: "text-primary",
  },
];

export function NotificationsMenu({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="right" className="max-w-xs">
        <div className="flex items-center justify-between py-2 px-4">
          <h4 className="font-medium leading-none">Notifications</h4>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[350px]">
          <div className="grid gap-1 p-2">
            {notifications.map((notification, index) => (
              <Button
                key={index}
                variant="ghost"
                className="grid grid-cols-[auto,1fr,auto] items-start gap-4 h-auto py-2 px-2 justify-start w-full"
              >
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg group-hover:bg-background transition-colors",
                    notification.bg,
                    notification.color,
                  )}
                >
                  <notification.icon className="h-5 w-5" />
                </div>
                <div className="grid gap-1 text-left min-w-0">
                  <p className="text-sm font-medium leading-none truncate">
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Button>
            ))}
          </div>
        </ScrollArea>
        <DropdownMenuSeparator />
        <div className="p-2 text-right">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs w-fit justify-end"
          >
            Mark all as read
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
