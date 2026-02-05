export interface CreateAgentPayload {
  agent_name: string;
  personality: string;
  general_instructions: string;
  choice_when_unable: string;
  conversation_pass_instructions: string;
  auto_tranfer: string;
  transfer_connecting_message: string;
}

export type UpdateAgentPayload = Partial<CreateAgentPayload>;

export interface Agent {
  id: string;
  agent_name: string;
  personality: string;
  general_instructions: string;
  avatar: string;
  choice_when_unable: string;
  conversation_pass_instructions: string;
  auto_tranfer: string;
  transfer_connecting_message: string;
  company_id: string;
  enabled: boolean;
  createdDate: string;
  updatedDate: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: {
    code?: string;
    details?: Record<string, string[]>;
  };
  timestamp?: string;
  path?: string;
}
