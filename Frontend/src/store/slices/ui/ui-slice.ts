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
    setSelectedInboxUserId(state, action: PayloadAction<string | null>) {
      state.selectedInboxUserId = action.payload;
    },
    openUserSidebar(state) {
      state.isUserSidebarOpen = true;
    },
    closeUserSidebar(state) {
      state.isUserSidebarOpen = false;
    },
    toggleUserSidebar(state) {
      state.isUserSidebarOpen = !state.isUserSidebarOpen;
    },
    openCustomerChat(state) {
      state.isCustomerChatOpen = true;
    },
    closeCustomerChat(state) {
      state.isCustomerChatOpen = false;
    },
    toggleCustomerChat(state) {
      state.isCustomerChatOpen = !state.isCustomerChatOpen;
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
  resetTeamsTabs,
  setSelectedInboxUserId,
  openUserSidebar,
  closeUserSidebar,
  toggleUserSidebar,
  openCustomerChat,
  closeCustomerChat,
  toggleCustomerChat,
} = uiSlice.actions;
export default uiSlice.reducer;
