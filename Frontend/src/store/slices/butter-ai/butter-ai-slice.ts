import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { initialState, ButterAiMessage, SenderType } from "./butter-ai-types";

const butterAiSlice = createSlice({
  name: "butterAi",
  initialState,
  reducers: {
    addButterAiMessage(state, action: PayloadAction<ButterAiMessage>) {
      state.messages.push(action.payload);
      if (!state.selectedConversationId && action.payload.conversation_id) {
        state.selectedConversationId = action.payload.conversation_id;
      }
      console.log("[ButterAI] Message store", current(state));
    },

    startStreaming(
      state,
      action: PayloadAction<{
        id: string;
        sender_type: SenderType;
        conversation_id: string;
      }>,
    ) {
      state.isStreaming = true;
      state.messages.push({
        id: action.payload.id,
        sender_type: action.payload.sender_type,
        content: "",
        created_at: "",
        conversation_id: action.payload.conversation_id,
        isTyping: true,
      });
    },

    appendStreamChunk(
      state,
      action: PayloadAction<{ id: string; chunk: string }>,
    ) {
      const msg = state.messages.find((m) => m.id === action.payload.id);
      if (msg) {
        msg.content += action.payload.chunk;
      }
    },

    endStreaming(state, action: PayloadAction<{ id: string }>) {
      state.isStreaming = false;
      const msg = state.messages.find((m) => m.id === action.payload.id);
      if (msg) {
        msg.isTyping = false;
        msg.created_at = new Date().toISOString();
      }
    },

    clearButterAiMessages(state) {
      state.messages = [];
      state.selectedConversationId = null;
    },

    setSelectedConversationId(state, action: PayloadAction<string | null>) {
      state.selectedConversationId = action.payload;
    },
  },
});

export const {
  addButterAiMessage,
  startStreaming,
  appendStreamChunk,
  endStreaming,
  clearButterAiMessages,
  setSelectedConversationId,
} = butterAiSlice.actions;

export default butterAiSlice.reducer;
