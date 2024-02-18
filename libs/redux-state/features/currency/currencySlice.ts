import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  currentCurrency: {
    id: 1,
    text: "NGN",
    flag: "https://flagsapi.com/NG/flat/64.png",
  },
};

export const currency = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrentCurrency: (state, action) => {
      state.currentCurrency = action.payload;
    },
  },
});

export const currencyState = (state: RootState) => state.currency;
export const { setCurrentCurrency } = currency.actions;
export default currency.reducer;
