import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
  name: "navState",
  initialState: {
    isOpen: "true",
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
  },
});

export const { toggleNavState, closeNav, openNav } = navSlice.actions;
export default navSlice.reducer;
