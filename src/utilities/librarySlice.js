import { createSlice } from "@reduxjs/toolkit";

const librarySlice = createSlice({
  name: "library",
  initialState: {
    watchLater: localStorage.getItem("wlData")
      ? JSON.parse(localStorage.getItem("wlData"))
      : [],
  },
  reducers: {
    addVideo: (state, action) => {
      state.watchLater.push(action.payload);
      localStorage.setItem("wlData", JSON.stringify(state.watchLater));
    },
    removeVideo: (state, action) => {
      state.watchLater = state.watchLater.filter(
        (item) => item != action.payload
      );
      localStorage.setItem("wlData", JSON.stringify(state.watchLater));
    },
    clearData: (state) => {
      state.watchLater = [];
      localStorage.removeItem("wlData");
    },
  },
});
export const { addVideo, removeVideo, clearData } = librarySlice.actions;
export default librarySlice.reducer;
