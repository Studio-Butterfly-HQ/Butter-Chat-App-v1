import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  Mic,
  BotMessageSquare,
  User,
  Sparkles,
  Settings2,
  ArrowDownRight,
  ArrowUp,
} from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { useAppSelector } from "@/store/hooks";
import { useSocket } from "@/socket/socket-provider";
import { SocketMessage } from "@/socket/socket-types";
import AIMessageRenderer from "./aI-message-renderer";
import { useSocketParser } from "@/hooks/use-socket-parser";
import { handleButterAiSocketEvent } from "@/socket/butter-ai-socket-events";
import { addButterAiMessage } from "@/store/slices/butter-ai/butter-ai-slice";
import { store } from "@/store";

const suggestedPrompts = [
  "What's the most selling product on my store this month?",
  "How many orders do I have today?",
  "Let customers know that our outlet will be closed on upcoming Friday due to Puja 2025",
];

export default function ChatBox() {
  const userName = useAppSelector((state) => state.auth.user?.user_name);
  const userAvatar = useAppSelector((state) => state.auth.user?.profile_uri);
  const messages = useAppSelector((state) => state.butterAi.messages);
  const isAiTyping = useAppSelector((state) => state.butterAi.isStreaming);
  const socket = useSocket();
  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { parseMultipleJSON } = useSocketParser();

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, isAiTyping]);

  // Handle WebSocket messages
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event: MessageEvent) => {
      const packets = parseMultipleJSON(event.data as string);
      for (const data of packets) {
        handleButterAiSocketEvent(data);
      }
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket]);

  const handleSend = (content?: string) => {
    const messageContent = content || inputValue.trim();
    if (!messageContent) return;

    store.dispatch(
      addButterAiMessage({
        id: crypto.randomUUID(),
        sender_type: "Human-Agent",
        content: messageContent,
        created_at: new Date().toISOString(),
        conversation_id: "",
      }),
    );

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected");
      return;
    }

    const message: SocketMessage = {
      type: "butter_chat",
      payload: {
        sender_type: "Human-Agent",
        content: messageContent,
      },
    };

    socket.send(JSON.stringify(message));
    console.log("Sent message:", message);
    setInputValue("");
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-1 min-h-0 flex-col overflow-hidden p-4">
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {!hasMessages ? (
          /* Welcome State */
          <div className="flex-1 flex flex-col items-center justify-between">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-4">
                <div className="relative">
                  <Sparkles className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h1 className="md:text-2xl  text-xl font-semibold text-foreground mb-1">
                Hello, {userName || "there"}
              </h1>
              <h1 className="md:text-2xl text-xl font-semibold">
                What do you need help with today?
              </h1>
            </div>
            <div className="flex flex-wrap justify-center gap-3 pb-12 max-w-3xl">
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(prompt)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card hover:bg-accent text-sm text-foreground transition-colors"
                >
                  <span>{prompt}</span>
                  <ArrowDownRight className="h-4 w-4 shrink-0" />
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
                  className={`flex ${message.sender_type === "Human-Agent" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex max-w-xl gap-2">
                    {message.sender_type === "AI-AGENT" && (
                      <div className="flex-shrink-0 flex items-center justify-center h-7 w-7 border border-border rounded-full bg-card">
                        <BotMessageSquare className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                    <div className={`flex flex-col gap-1 min-w-0`}>
                      <div
                        className={`rounded-lg px-3 py-2 text-sm ${
                          message.sender_type === "Human-Agent"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        {message.isTyping && !message.content ? (
                          <div className="flex items-center gap-1 h-5 px-1 text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></div>
                          </div>
                        ) : message.sender_type === "AI-AGENT" ? (
                          <AIMessageRenderer content={message.content} />
                        ) : (
                          <p className="break-words whitespace-pre-wrap">
                            {message.content}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-2 px-1 text-xs text-muted-foreground">
                        {message.sender_type === "Human-Agent" ? (
                          <>
                            {/* <button className="hover:text-foreground">
                              Translate
                            </button> */}
                            <span></span>
                            <span>
                              {message.created_at
                                ? new Date(
                                    message.created_at,
                                  ).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                  })
                                : ""}
                            </span>
                          </>
                        ) : (
                          <>
                            <span>
                              {message.created_at
                                ? new Date(
                                    message.created_at,
                                  ).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                  })
                                : ""}
                            </span>
                            {/* {!isAiTyping && (
                              <button className="hover:text-foreground">
                                Translate
                              </button>
                            )} */}
                          </>
                        )}
                      </div>
                    </div>
                    {message.sender_type === "Human-Agent" && (
                      <div className="flex-shrink-0">
                        <Avatar className="h-7 w-7">
                          {userAvatar && (
                            <AvatarImage
                              src={userAvatar}
                              alt={userName || "User"}
                              className="object-cover"
                            />
                          )}
                          <AvatarFallback>
                            <User className="h-4 w-4 text-muted-foreground" />
                          </AvatarFallback>
                        </Avatar>
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
                disabled={isAiTyping}
              />
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between px-2 py-2">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 rounded-full w-8"
                  disabled={isAiTyping}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1.5 text-muted-foreground"
                  disabled={isAiTyping}
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
                  disabled={isAiTyping}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button
                  variant="default"
                  size="icon"
                  className="h-8 rounded-full w-8"
                  onClick={() => handleSend()}
                  disabled={isAiTyping || !inputValue.trim()}
                >
                  {isAiTyping ? (
                    <div className="w-full h-full rounded-full bg-muted-foreground flex items-center justify-center">
                      <div className="h-3.5 w-3.5 rounded-sm bg-primary animate-pulse"></div>
                    </div>
                  ) : (
                    <ArrowUp className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
