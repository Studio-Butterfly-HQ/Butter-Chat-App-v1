export type UiState = {
  isTestAiAgentOpen: boolean;
  activeAiAgentTab: string;
  activeTeamsTab: string;
  isUserSidebarOpen: boolean;
  isCustomerChatOpen: boolean;
  selectedAiAgentId: string | null;
  onboardingStep: number;
  activeInboxTab: string;
  selectedInboxUserId: string | null;
};

export const initialState: UiState = {
  isTestAiAgentOpen: true,
  activeAiAgentTab: "configure",
  activeTeamsTab: "employees",
  isUserSidebarOpen: false,
  isCustomerChatOpen: false,
  selectedAiAgentId: null,
  onboardingStep: 1,
  activeInboxTab: "your-inbox",
  selectedInboxUserId: null,
};
