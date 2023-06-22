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
  },
});

export const { toggleNavState } = navSlice.actions;
export default navSlice.reducer;
