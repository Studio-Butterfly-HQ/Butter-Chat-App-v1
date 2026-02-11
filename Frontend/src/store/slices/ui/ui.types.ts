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
  isAskButterAiSidebarOpen: boolean;
};

export const initialState: UiState = {
  isTestAiAgentOpen: true,
  activeAiAgentTab: "knowledgeBase",
  activeTeamsTab: "employees",
  isUserSidebarOpen: false,
  isCustomerChatOpen: false,
  selectedAiAgentId: null,
  onboardingStep: 1,
  activeInboxTab: "your-inbox",
  selectedInboxUserId: null,
  isAskButterAiSidebarOpen: false,
};
