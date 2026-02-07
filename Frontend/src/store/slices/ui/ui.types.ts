export type UiState = {
  isTestAiAgentOpen: boolean;
  activeAiAgentTab: string;
  activeTeamsTab: string;
  selectedInboxUserId: string | null;
  isUserSidebarOpen: boolean;
  isCustomerChatOpen: boolean;
  selectedAiAgentId: string | null;
  onboardingStep: number;
};

export const initialState: UiState = {
  isTestAiAgentOpen: true,
  activeAiAgentTab: "configure",
  activeTeamsTab: "employees",
  selectedInboxUserId: "1",
  isUserSidebarOpen: false,
  isCustomerChatOpen: false,
  selectedAiAgentId: null,
  onboardingStep: 1,
};
