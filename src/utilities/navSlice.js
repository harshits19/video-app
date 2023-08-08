import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
  name: "navState",
  initialState: {
    isOpen: "true",
    isVideoPage: "false",
  },
  reducers: {
    toggleNavState: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeNav: (state) => {
      state.isOpen = false;
    },
    openNav: (state) => {
      state.isOpen = true;
    },
    openPageState: (state) => {
      state.isVideoPage = true;
    },
    closePageState: (state) => {
      state.isVideoPage = false;
    },
  },
});

export const {
  toggleNavState,
  closeNav,
  openNav,
  openPageState,
  closePageState,
} = navSlice.actions;
export default navSlice.reducer;
