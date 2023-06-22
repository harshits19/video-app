import { configureStore } from "@reduxjs/toolkit";
import navSlice from "./navSlice";

const store = configureStore({
  reducer: {
    navState: navSlice,
  },
});
export default store;
