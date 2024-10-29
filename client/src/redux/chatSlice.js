import { createSlice } from "@reduxjs/toolkit";
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    onlineUsers: [],
    messages: [],
  },
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = Array.isArray(action.payload) ? action.payload : []; // Ensure payload is an array
    },
    deleteMessage: (state, action) => {
        state.messages = state.messages.filter(msg => msg._id !== action.payload);
    },
  },
});
export const { setOnlineUsers, setMessages, deleteMessage } = chatSlice.actions;

export default chatSlice.reducer;
