import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./features/chatSlice";
import userSlice from "./features/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    chat: chatSlice,
  },
});

export default store;
