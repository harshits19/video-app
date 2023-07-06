import { createSlice } from "@reduxjs/toolkit";

const backdropSlice = createSlice({
  name: "backdropState",
  initialState: {
    isBackdrop: "false",
  },
  reducers: {
    toggleBackdropState: (state) => {
      state.isBackdrop = !state.isBackdrop;
    },
    closeBackdrop: (state) => {
      state.isBackdrop = false;
    },
    openBackdrop: (state) => {
      state.isBackdrop = true;
    },
  },
});

export const { toggleBackdropState, closeBackdrop, openBackdrop } =
  backdropSlice.actions;
export default backdropSlice.reducer;
