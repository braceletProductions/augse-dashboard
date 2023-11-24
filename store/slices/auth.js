import { createSlice } from "@reduxjs/toolkit";

const isBrowser = typeof window !== "undefined";

const initialState = {
  userId: isBrowser ? sessionStorage.getItem("userId") || null : null,
  token: isBrowser ? sessionStorage.getItem("token") || null : null,
};

const authSlice = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      if (isBrowser) {
        sessionStorage.setItem("userId", action.payload.userId);
        sessionStorage.setItem("token", action.payload.token);
      }
    },
    logout: (state) => {
      state.userId = null;
      state.token = null;
      if (isBrowser) {
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("token");
      }
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
