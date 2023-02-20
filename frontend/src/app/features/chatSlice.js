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

export const { createNewChat } = chatSlice.actions;
export default chatSlice.reducer;
