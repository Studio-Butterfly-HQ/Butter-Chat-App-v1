export interface CustomerChatMessage {
  id: string;
  sender_type: "Human-Agent" | "AI-AGENT";
  content: string;
  timestamp: string;
  conversation_id?: string;
  isTyping?: boolean;
}

export interface CustomerChatState {
  messages: CustomerChatMessage[];
}

export const initialState: CustomerChatState = {
  messages: [],
};
