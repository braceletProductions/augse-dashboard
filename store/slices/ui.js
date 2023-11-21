import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = {
  sidebar: false,
};

const uiSlice = createSlice({
  name: "UI",
  initialState: uiInitialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar;
    },
  },
});

export const { toggleSidebar } = uiSlice.actions;

export default uiSlice.reducer;
