import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

interface ChatState {
  unassigned: any[];
  active: any[];
  messages: Record<string, any[]>; // an object where: key = string value = array
  // messages = {
  // "conversation_id1": [msg1, msg2],
  // "conversation_id2": [msg1],
  // }
}

const initialState: ChatState = {
  unassigned: [],
  active: [],
  messages: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUnassignedChat(state, action: PayloadAction<any>) {
      state.unassigned.unshift(action.payload);
      console.log("addUnassignedChat", {
        unassigned: current(state.unassigned),
        active: current(state.active),
        messages: current(state.messages),
      });
    },

    moveToActive(state, action: PayloadAction<any>) {
      state.unassigned = state.unassigned.filter(
        (c) => c.id !== action.payload.id,
      );
      state.active.unshift(action.payload);
      console.log("moveToActive", {
        unassigned: current(state.unassigned),
        active: current(state.active),
        messages: current(state.messages),
      });
    },

    addMessage(state, action: PayloadAction<any>) {
      const msg = action.payload;
      if (!state.messages[msg.conversation_id]) {
        //if this is the first message of that chat
        state.messages[msg.conversation_id] = [];
      }
      state.messages[msg.conversation_id].push(msg);
      console.log("addMessage", {
        unassigned: current(state.unassigned),
        active: current(state.active),
        messages: current(state.messages),
      });
    },

    endChat(state, action: PayloadAction<string>) {
      delete state.messages[action.payload];
      state.active = state.active.filter((c) => c.id !== action.payload);
      console.log("endChat", {
        unassigned: current(state.unassigned),
        active: current(state.active),
        messages: current(state.messages),
      });
    },
  },
});

export const { addUnassignedChat, moveToActive, addMessage, endChat } =
  chatSlice.actions;

export default chatSlice.reducer;
