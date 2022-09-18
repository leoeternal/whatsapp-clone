import { createSlice } from "@reduxjs/toolkit";

import { fetchConversation, fetchMessages, createMessage } from "./ChatAction";

const initialState = {
  conversation: {},
  conversationFetched: false,
  messages: [],
  messagesFetched: false,
  messageCreated: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateConversationFetchedValue: (state, action) => {
      state.conversationFetched = false;
    },
    updateMessagesFetchedValue: (state, action) => {
      state.messagesFetched = false;
    },
    updateMessageCreatedValue: (state, action) => {
      state.messageCreated = false;
    },
    updateMessagesArray: (state, action) => {
      state.messages.push({
        conversationId: action.payload.conversationId,
        senderId: action.payload.senderId,
        text: action.payload.text,
        date: action.payload.date,
      });
    },
  },
  extraReducers: {
    [fetchConversation.pending]: (state, action) => {
      console.log("pending");
    },
    [fetchConversation.fulfilled]: (state, action) => {
      if (action.payload.status === "already exist") {
        state.conversation = action.payload.data[0];
        state.conversationFetched = true;
      } else if (action.payload.status === "success") {
        state.conversation = action.payload.data;
        state.conversationFetched = true;
      } else {
        state.conversationFetched = false;
      }
    },
    [fetchConversation.rejected]: (state, action) => {
      console.log("rejected");
    },
    [fetchMessages.pending]: (state, action) => {
      console.log("pending");
    },
    [fetchMessages.fulfilled]: (state, action) => {
      if (action.payload.status === "success") {
        state.messages = action.payload.data;
        state.messagesFetched = true;
      }
    },
    [fetchMessages.rejected]: (state, action) => {
      console.log("rejected");
    },
    [createMessage.pending]: (state, action) => {
      console.log("pending");
    },
    [createMessage.fulfilled]: (state, action) => {
      if (action.payload.status === "success") {
        state.messageCreated = true;
      }
    },
    [createMessage.rejected]: (state, action) => {
      console.log("rejected");
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice;
