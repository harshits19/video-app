import { configureStore } from "@reduxjs/toolkit";
import navSlice from "./navSlice";
import searchSlice from "./searchSlice";

const store = configureStore({
  reducer: {
    navState: navSlice,
    suggestionsCache: searchSlice,
  },
});
export default store;
