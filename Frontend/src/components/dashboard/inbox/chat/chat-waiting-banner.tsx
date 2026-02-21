import { Button } from "@/components/ui/button";
import { Check, Forward } from "lucide-react";
import { getSocket } from "@/socket/socket";
import { toast } from "sonner";
import { Conversation } from "@/store/slices/chat/chat-types";
import { useAppDispatch } from "@/store/hooks";
import { setActiveInboxTab } from "@/store/slices/ui/ui-slice";

interface ChatWaitingBannerProps {
  conversation: Conversation;
}

export default function ChatWaitingBanner({
  conversation,
}: ChatWaitingBannerProps) {
  const dispatch = useAppDispatch();

  const handleAccept = () => {
    const socket = getSocket();
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "accept_chat",
          payload: conversation,
        }),
      );
      toast.success("Chat accepted successfully");
      dispatch(setActiveInboxTab("your-inbox"));
    }
  };

  return (
    <div className="p-4 pt-0">
      <div className="flex flex-col bg-card items-center justify-center gap-3 border border-border rounded-2xl p-4 min-h-[137px]">
        <p className="text-sm text-muted-foreground">
          You have been assigned a new conversation
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            className="h-8 gap-1.5 px-4 rounded-full"
            onClick={handleAccept}
          >
            <Check className="h-3.5 w-3.5" />
            Accept
          </Button>
          <Button
            variant="default"
            size="sm"
            className="h-8 gap-1.5 px-4 rounded-full"
          >
            <Forward className="h-3.5 w-3.5" />
            Forward
          </Button>
        </div>
      </div>
    </div>
  );
}
