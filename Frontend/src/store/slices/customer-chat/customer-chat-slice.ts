import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, CustomerChatMessage } from "./customer-chat.types";

const customerChatSlice = createSlice({
  name: "customerChat",
  initialState,
  reducers: {
    addCustomerMessage(state, action: PayloadAction<CustomerChatMessage>) {
      state.messages.push(action.payload);
    },
    setCustomerMessages(state, action: PayloadAction<CustomerChatMessage[]>) {
      state.messages = action.payload;
    },
    clearCustomerMessages(state) {
      state.messages = [];
    },
  },
});

export const {
  addCustomerMessage,
  setCustomerMessages,
  clearCustomerMessages,
} = customerChatSlice.actions;
export default customerChatSlice.reducer;
