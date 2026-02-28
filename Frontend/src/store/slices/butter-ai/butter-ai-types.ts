export type SenderType = "Human-Agent" | "AI-AGENT";

export interface ButterAiMessage {
  id: string;
  sender_type: SenderType;
  content: string;
  created_at: string;
  conversation_id: string;
  isTyping?: boolean;
}

export interface ButterAiState {
  messages: ButterAiMessage[];
  isStreaming: boolean;
  selectedConversationId: string | null;
}

export const initialState: ButterAiState = {
  messages: [],
  isStreaming: false,
  selectedConversationId: null,
};
