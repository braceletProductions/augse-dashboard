import { createSlice } from "@reduxjs/toolkit";

const isBrowser = typeof window !== "undefined";

const initialState = {
  userId: isBrowser ? sessionStorage.getItem("userId") || null : null,
  token: isBrowser ? sessionStorage.getItem("token") || null : null,
  userType: isBrowser ? sessionStorage.getItem("userType") || null : null,
};

const authSlice = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.userType = action.payload.userType;
      if (isBrowser) {
        sessionStorage.setItem("userId", action.payload.userId);
        sessionStorage.setItem("token", action.payload.token);
        sessionStorage.setItem("userType", action.payload.userType);
      }
    },
    logout: (state) => {
      state.userId = null;
      state.token = null;
      state.userType = null;
      if (isBrowser) {
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userType");
      }
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
