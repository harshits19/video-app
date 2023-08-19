import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "suggestionsCache",
  initialState: {},
  reducers: {
    addQuery: (state, action) => {
      state = Object.assign(state, action.payload);
    },
  },
});
export const { addQuery } = searchSlice.actions;
export default searchSlice.reducer;
