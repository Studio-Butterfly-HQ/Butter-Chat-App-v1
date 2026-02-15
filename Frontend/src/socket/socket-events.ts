import { store } from "@/store";
import { SocketMessage } from "./socket-types";

import {
  addUnassignedChat,
  moveToActive,
  addMessage,
  endChat,
} from "@/store/slices/chat/chat-slice";

export const handleSocketEvent = (event: SocketMessage) => {
  const { type, payload } = event;

  switch (type) {
    case "connection_established":
      console.log("Connection established");
      break;

    case "transfer_chat":
      store.dispatch(addUnassignedChat(payload));
      break;

    case "accept_chat":
      store.dispatch(moveToActive(payload));
      break;

    case "message":
      store.dispatch(addMessage(payload));
      break;

    case "end_chat":
      store.dispatch(endChat(payload?.id));
      break;

    default:
      console.warn("Unknown socket event:", type);
  }
};
