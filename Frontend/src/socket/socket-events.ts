import { store } from "@/store";
import { SocketMessage } from "./socket-types";

import {
  addUnassignedChat,
  moveToActive,
  addMessage,
  endChat,
} from "@/store/slices/chat/chat-slice";
import { addNotification } from "@/store/slices/ui/notification-slice";

export const handleSocketEvent = (event: SocketMessage) => {
  const { type, payload } = event;

  switch (type) {
    case "connection_established":
      console.log("Connection established");
      break;

    case "transfer_chat":
      store.dispatch(addUnassignedChat(payload));
      store.dispatch(
        addNotification({
          id: crypto.randomUUID(),
          title: "New Chat Transferred",
          description: `A new chat from ${payload.customer?.contact || "Unknown"} has been transferred.`,
          time: new Date().toISOString(),
          type: "transfer",
        }),
      );
      break;

    case "accept_chat":
      store.dispatch(moveToActive(payload));
      break;

    case "message":
      store.dispatch(addMessage(payload));
      // only if customer send message
      if (payload.sender_type === "Customer") {
        store.dispatch(
          addNotification({
            id: crypto.randomUUID(),
            title: "New Message",
            description: payload.content,
            time: new Date().toISOString(),
            type: "message",
          }),
        );
      }
      break;

    case "end_chat":
      store.dispatch(endChat(payload));
      break;

    default:
      console.warn("Unknown socket event:", type);
  }
};
