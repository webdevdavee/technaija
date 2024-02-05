import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  categoryFilterArray: [],
  modelFilterArray: [],
};

export const shopFilter = createSlice({
  name: "shop-filter",
  initialState,
  reducers: {
    setCategoryFilterArray: (state, action) => {
      state.categoryFilterArray = action.payload;
    },
    setModelFilterArray: (state, action) => {
      state.modelFilterArray = action.payload;
    },
  },
});

export const shopFilterState = (state: RootState) => state.shopFilter;
export const { setCategoryFilterArray, setModelFilterArray } =
  shopFilter.actions;
export default shopFilter.reducer;
