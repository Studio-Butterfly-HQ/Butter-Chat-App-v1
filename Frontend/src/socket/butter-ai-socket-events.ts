import { store } from "@/store";
import { SocketMessage } from "./socket-types";
import {
  startStreaming,
  appendStreamChunk,
  endStreaming,
} from "@/store/slices/butter-ai/butter-ai-slice";

// Tracks the ID of the message currently being streamed
let activeStreamingId: string | null = null;

export const handleButterAiSocketEvent = (event: SocketMessage) => {
  const { type, payload } = event;

  switch (type) {
    case "connection_established":
      console.log("[ButterAI] Connection established");
      break;

    case "butter_typing_start": {
      const id = `stream-${Date.now()}`;
      activeStreamingId = id;
      store.dispatch(
        startStreaming({
          id,
          sender_type: "AI-AGENT",
          conversation_id: payload?.conversation_id ?? "",
        }),
      );
      break;
    }

    case "butter_stream": {
      if (activeStreamingId && payload?.content) {
        store.dispatch(
          appendStreamChunk({ id: activeStreamingId, chunk: payload.content }),
        );
      }
      break;
    }

    case "butter_typing_end": {
      if (activeStreamingId) {
        store.dispatch(endStreaming({ id: activeStreamingId }));
        activeStreamingId = null;
      }
      break;
    }

    default:
      console.warn("[ButterAI] Unknown socket event:", type);
  }
};
