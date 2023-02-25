import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { BASE_URL, getConfigureToken } from "../../api/api";
import { toast } from "react-toastify";

export const getChat = createAsyncThunk("chat/getChat", async (token) => {
  const res = await fetch(`${BASE_URL}/chats`, getConfigureToken(token));
  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
});

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chat: [],
    currentChat: null,
    selectedChat: false,
    notification: [],
  },
  reducers: {
    createNewChat: (state, action) => {
      const chat = action.payload;

      const findChat = current(state.chat).findIndex((c) => c._id === chat._id);

      if (findChat === -1) {
        state.chat.unshift(chat);
      } else {
        state.chat.splice(findChat, 1);
        state.chat.unshift(chat);
      }

      const findInNotification = state.notification.some(
        (n) => n.chat._id === chat._id
      );

      if (findInNotification) {
        state.notification = state.notification.filter(
          (n) => n.chat._id !== chat._id
        );
      }

      state.currentChat = chat;
      state.selectedChat = true;
    },
    createGroupChat: (state, action) => {
      const chat = action.payload;

      state.chat.unshift(chat);
      state.currentChat = chat;
      state.selectedChat = true;
    },
    goToChat: (state, action) => {
      const chat = action.payload;

      const findInNotification = state.notification.some(
        (n) => n.chat._id === chat._id
      );

      if (findInNotification) {
        state.notification = state.notification.filter(
          (n) => n.chat._id !== chat._id
        );
      }

      state.currentChat = chat;
      state.selectedChat = true;
    },
    closeChat: (state) => {
      state.selectedChat = false;
      state.currentChat = null;
    },
    updateChat: (state, action) => {
      const chat = action.payload;
      const targetChat = state.chat.findIndex((c) => c._id === chat._id);

      if (targetChat >= 0) {
        state.chat[targetChat] = chat;
      }

      state.currentChat = { ...state.currentChat, ...chat };
    },
    leaveGroupChat: (state, action) => {
      const chat = action.payload;

      state.chat = state.chat.filter((c) => c._id !== chat._id);

      state.currentChat = null;
    },
    updateNotification: (state, action) => {
      const message = action.payload;

      state.notification = [message, ...state.notification];

      const targetChat = state.chat.find((c) => c._id === message.chat._id);

      if (targetChat) {
        targetChat.latestMessage = message;
      }
    },
    goChatFromNotification: (state, action) => {
      const message = action.payload;

      state.notification = state.notification.filter(
        (m) => m.chat._id !== message.chat._id
      );

      state.currentChat = message.chat;
      state.selectedChat = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChat.fulfilled, (state, action) => {
      state.chat = action.payload;
    });
    builder.addCase(getChat.rejected, (state, action) => {
      const error = action.error;
      toast.error(error.message);
    });
  },
});

export const {
  createNewChat,
  createGroupChat,
  goToChat,
  closeChat,
  updateChat,
  leaveGroupChat,
  updateNotification,
  goChatFromNotification,
} = chatSlice.actions;
export default chatSlice.reducer;
