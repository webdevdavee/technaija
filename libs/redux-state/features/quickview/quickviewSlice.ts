import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  showQuickview: false,
};

export const quickview = createSlice({
  name: "quickview",
  initialState,
  reducers: {
    setQuickview: (state, action) => {
      state.showQuickview = action.payload;
    },
  },
});

export const quickviewState = (state: RootState) => state.quickview;
export const { setQuickview } = quickview.actions;
export default quickview.reducer;
