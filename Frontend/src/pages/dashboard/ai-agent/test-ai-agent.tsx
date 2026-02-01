"use client";

import { Input } from "@/components/ui/input";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send, Paperclip, Smile, Bot } from "lucide-react";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: string;
}

export default function AIAgentChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hi! I have a question about my recent invoice. It seems higher than usual.",
      timestamp: "7:48 AM",
    },
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
        "Absolutely, the email address tied to my account is jdoe@example.com. I've had this account for a couple of years now and haven't changed the password recently, which makes this issue really confusing.",
      timestamp: "7:48 AM",
    },
    {
      id: "4",
      type: "user",
      content:
        "Hi, I have a question about my recent invoice. It seems higher than usual.",
      timestamp: "8:02 AM",
    },
    {
      id: "5",
      type: "ai",
      content:
        "Yes, my password includes a few special characters like the @ and # symbols. I thought that might be causing problems, but I've used it the same successfully before, including just a few days ago. I attached a screenshot of the error message I'm seeing during login.",
      timestamp: "7:48 AM",
    },
    {
      id: "6",
      type: "user",
      content:
        "Hi, I have a question about my recent invoice. It seems higher than usual.",
      timestamp: "8:02 AM",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 40,
    maxHeight: 200,
  });

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
      if (textareaRef.current) {
        adjustHeight(true);
      }

      // Simulate AI response
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content: "Thanks for your message! I'm processing your request.",
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }, 1000);
    }
  };

  return (
    <div className="flex h-full flex-col rounded-xl bg-popover">
      {/* Header */}
      <div className="flex rounded-t-xl items-center justify-between border-b border-border bg-card px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-semibold text-foreground">AI Agent</h1>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1">
        <div className="space-y-4 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex max-w-xs gap-3 lg:max-w-md">
                {message.type === "ai" && (
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                      <Bot className="h-4 w-4 text-muted-foreground" />
                    </div>
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
                    <p className="text-balance">{message.content}</p>
                  </div>
                  <div className="flex items-center justify-between gap-2 px-1 text-xs text-muted-foreground">
                    <span>{message.timestamp}</span>
                    <button className="hover:text-foreground">Translate</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border bg-card p-4 rounded-b-xl">
        <div className="relative">
          <textarea
            ref={textareaRef}
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              adjustHeight();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="w-full resize-none rounded-md border border-input bg-background pr-14 pl-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
          <div className="absolute right-2 bottom-2 flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Smile className="h-4 w-4" />
            </Button>
            <Button onClick={handleSend} size="icon" className="h-8 w-8">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
