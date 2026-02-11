import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  X,
  Send,
  Paperclip,
  Smile,
  BotMessageSquare,
  RefreshCw,
  User,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeTestAiAgent } from "@/store/slices/ui/ui-slice";
import TextareaAutosize from "react-textarea-autosize";
import { SidebarHeader } from "@/components/ui/sidebar";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: string;
}

export default function AIAgentChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "2",
      type: "user",
      content:
        "Hi, I have a question about my recent invoice. It seems higher than usual.",
      timestamp: "8:02 AM",
    },
    {
      id: "3",
      type: "ai",
      content:
        "Absolutely, the email address tied to my account is jdoe@example.com.",
      timestamp: "7:48 AM",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom
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
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: inputValue,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      };

      const aiMessageId = (Date.now() + 1).toString();
      const aiMessage: Message = {
        id: aiMessageId,
        type: "ai",
        content: "typing...",
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      };

      // Both messages at the same time
      setMessages((prev) => [...prev, userMessage, aiMessage]);
      setInputValue("");

      // Update AI message after delay
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? {
                  ...msg,
                  content:
                    "Thanks for your message! I'm processing your request.",
                }
              : msg,
          ),
        );
      }, 2000);
    }
  };

  const dispatch = useAppDispatch();

  return (
    <div className="flex h-full border dark:border-0 flex-col rounded-xl bg-popover">
      {/* Header */}
      <SidebarHeader className="border-b border-border h-16 p-4 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <BotMessageSquare className="h-6 w-5 " />
          <h1 className="text-sm md:text-base font-semibold text-foreground">
            AI Agent
          </h1>
        </div>
        <div className="flex gap-1 items-center">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => dispatch(closeTestAiAgent())}
            size="icon"
            className="h-7 w-7"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </SidebarHeader>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 ">
        <div className="space-y-4 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex max-w-xs gap-2">
                {message.type === "ai" && (
                  <div className="flex-shrink-0">
                    <BotMessageSquare className="h-5 w-6 text-muted-foreground" />
                  </div>
                )}
                <div className={`flex flex-col gap-1`}>
                  <div
                    className={`rounded-lg px-3 py-2 text-sm ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="break-all whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-2 px-1 text-xs text-muted-foreground">
                    {message.type === "user" ? (
                      <>
                        <button className="hover:text-foreground">
                          Translate
                        </button>
                        <span>{message.timestamp}</span>
                      </>
                    ) : (
                      <>
                        <span>{message.timestamp}</span>
                        <button className="hover:text-foreground">
                          Translate
                        </button>
                      </>
                    )}
                  </div>
                </div>
                {message.type === "user" && (
                  <div className="flex-shrink-0">
                    <User className="h-5 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 pt-0 rounded-b-xl">
        <div className="rounded-2xl border border-border bg-popover overflow-hidden focus-within:ring-1 focus-within:ring-primary/20">
          {/* Text Input */}
          <div className="px-4 pt-3">
            <TextareaAutosize
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              minRows={1}
              maxRows={6}
              className="w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none scrollbar-hide"
            />
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 rounded-full w-8"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 rounded-full w-8"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 rounded-full w-8"
              onClick={handleSend}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
