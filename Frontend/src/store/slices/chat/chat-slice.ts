import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { ChatState } from "./chat-types";

const initialState: ChatState = {
  unassigned: {},
  active: {},
  messages: {},
  closed: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addUnassignedChat(state, action: PayloadAction<any>) {
      state.unassigned[action.payload.id] = action.payload;
      console.log("addUnassignedChat", current(state));
    },

    moveToActive(state, action: PayloadAction<any>) {
      const id = action.payload.id;
      if (!id) {
        console.warn("moveToActive: no valid id found", action.payload);
        return;
      }
      const { [id]: removed, ...rest } = current(state.unassigned);
      state.unassigned = rest;
      state.active[id] = action.payload;
      console.log("moveToActive", current(state));
    },

    addMessage(state, action: PayloadAction<any>) {
      const msg = action.payload;
      if (!state.messages[msg.conversation_id]) {
        //if this is the first message of that chat
        state.messages[msg.conversation_id] = [];
      }
      state.messages[msg.conversation_id].push(msg);
      // console.log("addMessage", current(state));
    },

    endChat(state, action: PayloadAction<any>) {
      const id = action.payload.id;
      if (!id) {
        console.warn("endChat: no valid id found", action.payload);
        return;
      }
      const { [id]: removed, ...rest } = current(state.active);
      state.active = rest;
      state.closed[id] = action.payload;
      console.log("endChat", current(state));
    },
  },
});

export const { addUnassignedChat, moveToActive, addMessage, endChat } =
  chatSlice.actions;

export default chatSlice.reducer;
