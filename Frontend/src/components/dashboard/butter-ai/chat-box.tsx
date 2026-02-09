import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Plus,
  Mic,
  BotMessageSquare,
  User,
  Sparkles,
  Settings2,
} from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { useAppSelector } from "@/store/hooks";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: string;
}

const suggestedPrompts = [
  "What's the most selling product on my store this month?",
  "How many orders do I have today?",
  "Let customers know that our outlet will be closed on upcoming Friday due to Puja 2025",
];

export default function ChatBox() {
  const userName = useAppSelector((state) => state.auth.user?.user_name);
  const [messages, setMessages] = useState<Message[]>([]);
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

  const handleSend = (content?: string) => {
    const messageContent = content || inputValue.trim();
    if (messageContent) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: messageContent,
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

      // both messages at the same time
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

  const hasMessages = messages.length > 0;

  return (
    <div className="flex z-50 flex-1 min-h-0 flex-col overflow-hidden">
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {!hasMessages ? (
          /* Welcome State */
          <div className="flex-1 flex flex-col items-center justify-start p-4">
            <div className="mb-6">
              <div className="relative">
                <Sparkles className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-semibold text-foreground mb-1">
              Hello, {userName || "there"}
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              What do you need help with Today?
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(prompt)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card hover:bg-accent text-sm text-foreground transition-colors"
                >
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Chat Messages */
          <ScrollArea ref={scrollAreaRef} className="flex-1">
            <div className="space-y-4 p-4 max-w-3xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex max-w-md gap-2">
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
        )}
      </div>

      {/* Input Area */}
      <div className="flex justify-center">
        <div className="pb-4 px-3 max-w-3xl w-full">
          <div className="rounded-2xl border border-border bg-card overflow-hidden focus-within:ring-1 focus-within:ring-primary/20">
            <div className="px-4 pt-3">
              <TextareaAutosize
                placeholder="Ask Butter bot anything!"
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
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1.5 text-muted-foreground"
                >
                  <Settings2 className="h-4 w-4" />
                  <span>Tools</span>
                </Button>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 rounded-full w-8"
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 rounded-full w-8"
                  onClick={() => handleSend()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
