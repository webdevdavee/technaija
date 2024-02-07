import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  showSlideInSearch: false,
};

export const slideInSearch = createSlice({
  name: "slide-in-search",
  initialState,
  reducers: {
    setSlideInSearch: (state, action) => {
      state.showSlideInSearch = action.payload;
    },
  },
});

export const slideInSearchState = (state: RootState) => state.theSlideInSearch;
export const { setSlideInSearch } = slideInSearch.actions;
export default slideInSearch.reducer;
