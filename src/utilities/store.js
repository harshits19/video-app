import { configureStore } from "@reduxjs/toolkit";
import navSlice from "./navSlice";
import searchSlice from "./searchSlice";
import librarySlice from "./librarySlice";

const store = configureStore({
  reducer: {
    sidebar: navSlice,
    suggestionsCache: searchSlice,
    library: librarySlice,
  },
});
export default store;
