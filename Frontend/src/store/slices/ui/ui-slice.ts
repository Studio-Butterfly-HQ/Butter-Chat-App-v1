import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./ui.types";

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openTestAiAgent(state) {
      state.isTestAiAgentOpen = true;
    },
    closeTestAiAgent(state) {
      state.isTestAiAgentOpen = false;
    },
    toggleTestAiAgent(state) {
      state.isTestAiAgentOpen = !state.isTestAiAgentOpen;
    },
    setActiveAiAgentTab(state, action: PayloadAction<string>) {
      state.activeAiAgentTab = action.payload;
    },
    setActiveTeamsTab(state, action: PayloadAction<string>) {
      state.activeTeamsTab = action.payload;
    },
    resetAiAgentTabs(state) {
      state.activeAiAgentTab = initialState.activeAiAgentTab;
    },
    resetTeamsTabs(state) {
      state.activeTeamsTab = initialState.activeTeamsTab;
    },
  },
});

export const {
  openTestAiAgent,
  closeTestAiAgent,
  toggleTestAiAgent,
  setActiveAiAgentTab,
  setActiveTeamsTab,
  resetAiAgentTabs,
  resetTeamsTabs
} = uiSlice.actions;
export default uiSlice.reducer;
