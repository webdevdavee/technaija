import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  categoryArray: [],
};

export const shopFilter = createSlice({
  name: "shop-filter",
  initialState,
  reducers: {
    setCategoryArray: (state, action) => {
      state.categoryArray = action.payload;
    },
  },
});

export const shopFilterState = (state: RootState) => state.shopFilter;
export const { setCategoryArray } = shopFilter.actions;
export default shopFilter.reducer;
