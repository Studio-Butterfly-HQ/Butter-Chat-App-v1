"use client";

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
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeTestAiAgent } from "@/store/slices/ui/ui-slice";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import TextareaAutosize from "react-textarea-autosize";

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
      }, 100);
    }
  };
  const isOpen = useAppSelector((state) => state.ui.isTestAiAgentOpen);
  const dispatch = useAppDispatch();

  if (!isOpen) return null;

  return (
    <div className="flex h-full border dark:border-0 flex-col rounded-xl bg-popover">
      {/* Header */}
      <div className="flex rounded-t-xl items-center justify-between border-b border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <BotMessageSquare className="h-6 w-5 " />
          <h1 className="text-sm md:text-base font-semibold text-foreground">
            AI Agent
          </h1>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => dispatch(closeTestAiAgent())}
            size="icon"
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1">
        <div className="space-y-4 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="flex max-w-xs gap-2 lg:max-w-md">
                {message.type === "ai" && (
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                      <BotMessageSquare className="h-4 w-5 text-muted-foreground" />
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
        <InputGroup className="!bg-popover">
          <TextareaAutosize
            data-slot="input-group-control"
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
            className="flex field-sizing-content min-h-10 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-sm transition-[color,box-shadow] outline-none scrollbar-hide"
          />
          <InputGroupAddon align="block-end">
            <div className="flex gap-1 w-full justify-between">
              <div className="flex">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Smile className="h-4 w-4" />
                </Button>
              </div>
              <InputGroupButton
                onClick={handleSend}
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <Send className="h-4 w-4" />
              </InputGroupButton>
            </div>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
