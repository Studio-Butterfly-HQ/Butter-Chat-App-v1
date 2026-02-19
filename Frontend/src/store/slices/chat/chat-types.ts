export interface Conversation {
  id: string;
  status: string;
  customer: {
    id: string;
    name: string;
    picture: string;
    contact: string;
    source: string;
    company_id: string;
  };
  summary: string;
  tags: string[];
  messages: any[];
  assigned_to: {
    name: string;
    profile_uri: string;
  } | null;
  department: {
    department_id: string;
    department_name: string;
  } | null;
  metadata: {
    created_at: string;
    last_updated: string;
  };
}

export interface ChatState {
  unassigned: Record<string, Conversation>;
  active: Record<string, Conversation>;
  messages: Record<string, any[]>; // an object where: key = string value = array
  // messages = {
  // "conversation_id1": [msg1, msg2],
  // "conversation_id2": [msg1],
  // }
}
