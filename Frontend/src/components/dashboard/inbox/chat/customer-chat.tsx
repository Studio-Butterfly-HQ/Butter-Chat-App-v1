import { useState, useRef, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, EllipsisVertical, Tag, Sparkles, PanelLeft } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closeCustomerChat,
  openUserSidebar,
  closeUserSidebar,
} from "@/store/slices/ui/ui-slice";
import ChatWaitingBanner from "./chat-waiting-banner";
import ChatClosedBanner from "./chat-closed-banner";
import ChatMessageInput from "./chat-message-input";
import { SidebarHeader } from "@/components/ui/sidebar";
import { getSocket } from "@/socket/socket";
import { toast } from "sonner";

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
  const unassignedRecord = useAppSelector((state) => state.chat.unassigned);
  const activeRecord = useAppSelector((state) => state.chat.active);
  const closedRecord = useAppSelector((state) => state.chat.closed);

  const chatMessages = useAppSelector((state) => state.chat.messages);

  const messages = useMemo(() => {
    // console.log("chatMessages", chatMessages);
    if (!selectedInboxUserId || !chatMessages[selectedInboxUserId]) {
      console.log("No messages found for user", selectedInboxUserId);
      return [];
    }
    return chatMessages[selectedInboxUserId].map((msg: any, index: number) => ({
      id: msg.id || `${selectedInboxUserId}-${index}`,
      type: msg.sender_type === "Human-Agent" ? "user" : "external",
      content: msg.content,
      timestamp: new Date(
        msg.created_at.replace(/ m=\+[\d.]+$/, ""),
      ).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    })) as Message[];
  }, [selectedInboxUserId, chatMessages]);

  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const selectedConversation = useMemo(() => {
    if (!selectedInboxUserId) return null;
    return (
      unassignedRecord[selectedInboxUserId] ??
      activeRecord[selectedInboxUserId] ??
      closedRecord[selectedInboxUserId] ??
      null
    );
  }, [selectedInboxUserId, unassignedRecord, activeRecord, closedRecord]);

  // check if the chat is waiting or closed
  const isWaiting = selectedInboxUserId
    ? Boolean(unassignedRecord[selectedInboxUserId])
    : false;
  const isClosed = selectedInboxUserId
    ? Boolean(closedRecord[selectedInboxUserId])
    : false;

  useEffect(() => {
    if (selectedInboxUserId && !selectedConversation) {
      dispatch(closeCustomerChat());
      dispatch(closeUserSidebar());
    }
  }, [selectedInboxUserId, selectedConversation, dispatch]);

  if (!selectedConversation) return null;

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
      const socket = getSocket();
      if (socket && socket.readyState === WebSocket.OPEN) {
        // const messagePayload = {
        //   receiver_id: selectedConversation.customer.id,
        //   conversation_id: selectedConversation.id,
        //   content: inputValue,
        //   sender_type: "Human-Agent",
        //   created_at: new Date().toISOString(),
        // };

        socket.send(
          JSON.stringify({
            type: "message",
            payload: {
              receiver_id: selectedConversation.customer.id,
              conversation_id: selectedConversation.id,
              content: inputValue,
            },
          }),
        );

        // update in the store and in the UI
        //dispatch(addMessage(messagePayload));
        setInputValue("");
      } else {
        toast.error("Failed to send message: Connection lost");
      }
    }
  };

  const handleClose = () => {
    dispatch(closeCustomerChat());
    dispatch(closeUserSidebar());
    const socket = getSocket();
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "end_chat",
          payload: selectedConversation,
        }),
      );
      toast.success("Chat ended successfully");
    }
  };

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
            {selectedConversation.customer.name}
          </h1>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Tag className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <EllipsisVertical className="h-4 w-4" />
          </Button>
          {!isWaiting && !isClosed && (
            <Button
              variant="default"
              onClick={handleClose}
              className="h-7 gap-1 px-3 text-xs rounded-full font-semibold"
            >
              <X className="h-3 w-3" />
              Resolve
            </Button>
          )}
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
              <div className="flex max-w-md gap-2">
                {message.type === "external" && (
                  <Avatar className="h-6 w-6 flex-shrink-0">
                    <AvatarImage src={selectedConversation.customer.picture} />
                    <AvatarFallback className="text-xs">
                      {selectedConversation.customer.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={`flex flex-col gap-1`}>
                  <div
                    className={`rounded-lg px-3 py-2 text-sm ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="break-words whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-2 px-1 text-xs text-muted-foreground">
                    {message.type === "user" ? (
                      <>
                        {/* <button className="hover:text-foreground">
                          Translate
                        </button> */}
                        <div></div>
                        <span>
                          {message.date && `${message.date}, `}
                          {message.timestamp}
                        </span>
                      </>
                    ) : (
                      <>
                        <span>
                          {message.date && `${message.date}, `}
                          {message.timestamp}
                        </span>
                        {/* <button className="hover:text-foreground">
                          Translate
                        </button> */}
                      </>
                    )}
                  </div>
                </div>
                {message.type === "user" && (
                  <Avatar className="h-6 w-6 flex-shrink-0">
                    <AvatarImage src="/user-avatar.png" />
                    <AvatarFallback className="text-xs">U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}

          {/* Chat Summary - shown when status is waiting or closed */}
          {(isWaiting || isClosed) && selectedConversation.summary && (
            <div className="mt-4 rounded-lg border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-foreground" />
                <span className="text-sm font-semibold text-foreground">
                  Chat Summary
                </span>
                <span className="text-xs text-muted-foreground">
                  | AI generated
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedConversation.summary}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area / shown when status is waiting or closed/ present in the store */}
      {isClosed ? (
        <ChatClosedBanner />
      ) : isWaiting ? (
        <ChatWaitingBanner conversation={selectedConversation} />
      ) : (
        <ChatMessageInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSend={handleSend}
        />
      )}
    </div>
  );
}
