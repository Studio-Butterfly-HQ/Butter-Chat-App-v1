export type UiState = {
  isTestAiAgentOpen: boolean;
  activeAiAgentTab: string;
  activeTeamsTab: string;
};

export const initialState: UiState = {
  isTestAiAgentOpen: false,
  activeAiAgentTab: "configure",
  activeTeamsTab: "employees",
};
