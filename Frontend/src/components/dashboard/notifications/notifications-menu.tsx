import {
  ChevronRight,
  MessageSquare,
  Settings,
  X,
  BellOff,
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { markAllAsRead, clearAll } from "@/store/slices/ui/notification-slice";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const iconMap = {
  transfer: MessageSquare,
  message: MessageSquare,
  info: MessageSquare,
};

const bgMap = {
  transfer: "bg-primary/20",
  message: "bg-blue-500/20",
  info: "bg-orange-500/20",
};

const colorMap = {
  transfer: "text-primary",
  message: "text-blue-500",
  info: "text-orange-500",
};

export function NotificationsMenu({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.notifications.notifications);
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleSettingsClick = () => {
    navigate("/settings/notifications");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="right" className="w-80">
        <div className="flex items-center justify-between py-2 px-4">
          <h4 className="font-medium leading-none">Notifications</h4>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => dispatch(clearAll())}
              title="Clear all"
            >
              <X className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSettingsClick} className="h-7 w-7">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[350px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground gap-2">
              <BellOff className="h-8 w-8 opacity-20" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="grid gap-1 p-2">
              {notifications.map((notification) => {
                const Icon = iconMap[notification.type] || MessageSquare;
                return (
                  <Button
                    key={notification.id}
                    variant="ghost"
                    className={cn(
                      "grid grid-cols-[auto,1fr,auto] items-center gap-2 h-auto py-2 px-2 justify-start w-full transition-colors",
                      !notification.isRead && "bg-accent/50",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg",
                        bgMap[notification.type] || "bg-primary/20",
                        colorMap[notification.type] || "text-primary",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col gap-0.5 text-left min-w-0">
                      <p className="text-sm font-normal leading-none truncate">
                        {notification.title}
                      </p>
                      {notification.description && (
                        <p className="text-xs font-normal text-muted-foreground truncate line-clamp-1">
                          {notification.description}
                        </p>
                      )}
                      <p className="text-[10px] leading-none text-muted-foreground/70">
                        {formatDistanceToNow(new Date(notification.time), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground mt-1" />
                  </Button>
                );
              })}
            </div>
          )}
        </ScrollArea>
        <DropdownMenuSeparator />
        <div className="p-1 text-right">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs w-fit font-normal justify-end"
            onClick={() => dispatch(markAllAsRead())}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
