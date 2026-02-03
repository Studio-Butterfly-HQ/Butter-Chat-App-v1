export type UiState = {
  isTestAiAgentOpen: boolean;
  activeAiAgentTab: string;
  activeTeamsTab: string;
  selectedInboxUserId: string | null;
  isUserSidebarOpen: boolean;
};

export const initialState: UiState = {
  isTestAiAgentOpen: true,
  activeAiAgentTab: "configure",
  activeTeamsTab: "employees",
  selectedInboxUserId: "1",
  isUserSidebarOpen: false,
};
