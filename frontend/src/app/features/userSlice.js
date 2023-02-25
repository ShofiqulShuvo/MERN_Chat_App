import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  BASE_URL,
  postConfigureJason,
  postConfigureMultipart,
} from "../../api/api";

export const login = createAsyncThunk("user/login", async (loginData) => {
  const res = await fetch(
    `${BASE_URL}/user/login`,
    postConfigureJason(loginData)
  );
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
});

export const signup = createAsyncThunk("user/signup", async (signupData) => {
  const res = await fetch(
    `${BASE_URL}/user/signup`,
    postConfigureMultipart(signupData)
  );
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw new Error(data.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogedIn: undefined,
    userData: null,
    token: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("chat_app_token");

      state.isLogedIn = false;
      state.userData = null;
      state.token = null;
    },
    loginWithToken: (state, action) => {
      const { data, token } = action.payload;

      localStorage.setItem("chat_app_token", JSON.stringify(token));

      state.token = token;
      state.userData = data;
      state.isLogedIn = true;
    },
    noToken: (state) => {
      state.isLogedIn = false;
      state.userData = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const { data, token, message } = action.payload;

      localStorage.setItem("chat_app_token", JSON.stringify(token));

      state.token = token;
      state.userData = data;
      state.isLogedIn = true;
      toast.dismiss();
      toast.success(message);
    });
    builder.addCase(login.rejected, (state, action) => {
      const errMsg = action.error.message;
      toast.dismiss();
      toast.error(errMsg);
    });

    builder.addCase(signup.fulfilled, (state, action) => {
      const { data, token, message } = action.payload;

      localStorage.setItem("chat_app_token", JSON.stringify(token));

      state.token = token;
      state.userData = data;
      state.isLogedIn = true;
      toast.dismiss();
      toast.success(message);
    });
    builder.addCase(signup.rejected, (state, action) => {
      const errMsg = action.error.message;
      toast.dismiss();
      toast.error(errMsg);
    });
  },
});

export const { logout, noToken, loginWithToken } = userSlice.actions;
export default userSlice.reducer;
