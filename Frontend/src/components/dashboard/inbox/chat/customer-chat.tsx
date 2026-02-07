import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  X,
  Send,
  Paperclip,
  Smile,
  EllipsisVertical,
  Tag,
  Bookmark,
  Image as ImageIcon,
  Sparkles,
  ChevronDown,
  PanelLeft,
  MessageSquare,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closeCustomerChat,
  openUserSidebar,
  closeUserSidebar,
} from "@/store/slices/ui/ui-slice";
import TextareaAutosize from "react-textarea-autosize";
import { SidebarHeader } from "@/components/ui/sidebar";
import userData from "@/constants/dummy/user.json";

interface Message {
  id: string;
  type: "user" | "external"; // user is the platform user, external is the customer
  content: string;
  timestamp: string;
  date?: string;
}

export default function CustomerChat() {
  const selectedInboxUserId = useAppSelector(
    (state) => state.ui.selectedInboxUserId,
  );
  const selectedUser = (userData as any[]).find(
    (u) => u.id === selectedInboxUserId,
  );

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "external",
      content:
        "Hi, I have a question about my recent invoice. It seems higher than usual.",
      timestamp: "7:48 AM",
    },
    {
      id: "2",
      type: "user",
      content:
        "Hi, I have a question about my recent invoice. It seems higher than usual.",
      timestamp: "8:02 AM",
      date: "Dec 18",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedInboxUserId) {
      setMessages([
        {
          id: "1",
          type: "external",
          content:
            "Hi, I have a question about my recent invoice. It seems higher than usual.",
          timestamp: "7:48 AM",
        },
        {
          id: "2",
          type: "user",
          content:
            "Hi, I have a question about my recent invoice. It seems higher than usual.",
          timestamp: "8:02 AM",
          date: "Dec 18",
        },
      ]);
    }
  }, [selectedInboxUserId]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: inputValue,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  const handleClose = () => {
    dispatch(closeCustomerChat());
    dispatch(closeUserSidebar());
  };

  if (!selectedUser) return null;

  return (
    <div className="flex h-full border dark:border-0 flex-col rounded-xl bg-popover overflow-hidden">
      {/* Header */}
      <SidebarHeader className="border-b border-border h-16 p-4 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground"
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
          <h1
            onClick={() => dispatch(openUserSidebar())}
            className="text-sm md:text-xl font-semibold text-foreground cursor-pointer"
          >
            {selectedUser.user.name}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <EllipsisVertical className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Tag className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={handleClose}
            className="h-7 gap-1 px-3 text-xs rounded-full font-semibold"
          >
            <X className="h-3 w-3" />
            Close
          </Button>
        </div>
      </SidebarHeader>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1">
        <div className="space-y-4 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-3 max-w-lg ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <Avatar className="h-8 w-8 mt-1 border border-border">
                  <AvatarImage
                    src={
                      message.type === "external"
                        ? selectedUser.user.avatar
                        : "/user-avatar.png"
                    }
                  />
                  <AvatarFallback>
                    {message.type === "external"
                      ? selectedUser.user.name.charAt(0)
                      : "U"}
                  </AvatarFallback>
                </Avatar>

                <div
                  className={`flex flex-col gap-1 ${message.type === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`rounded-xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-all">
                      {message.content}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 px-1 text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-tighter">
                    {message.type === "user" && (
                      <button className="hover:text-foreground text-xs">
                        Translate
                      </button>
                    )}
                    <span>
                      {message.date && `${message.date}, `}
                      {message.timestamp}
                    </span>
                    {message.type === "external" && (
                      <button className="hover:text-foreground text-xs">
                        Translate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 bg-popover">
        <div className="border border-border rounded-2xl p-4 transition-all focus-within:ring-1 focus-within:ring-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-sm font-medium gap-2 mt-[-10px]"
            >
              <MessageSquare className="h-4 w-4" />
              Message
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>

          <TextareaAutosize
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            minRows={1}
            maxRows={8}
            className="w-full min-h-10 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground/50 scrollbar-hide mb-4"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Smile className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Sparkles className="h-4 w-4" />
              </Button>
            </div>

            <Button
              onClick={handleSend}
              size="sm"
              className="h-7 px-4 rounded-full"
            >
              Send Reply
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
