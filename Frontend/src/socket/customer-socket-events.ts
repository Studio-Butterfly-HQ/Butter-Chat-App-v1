import { store } from "@/store";
import { addCustomerMessage } from "@/store/slices/customer-chat/customer-chat-slice";

export const handleCustomerSocketEvent = (event: any) => {
  const { type, payload } = event;

  switch (type) {
    case "connection_established":
      console.log("[Customer] Connection established");
      break;

    case "message":
      store.dispatch(
        addCustomerMessage({
          id: payload.id,
          sender_type: payload.sender_type,
          content: payload.content,
          timestamp: new Date(payload.timestamp).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
          conversation_id: payload.conversation_id,
        }),
      );
      break;

    default:
      console.warn("[Customer] Unknown socket event:", type);
  }
};
