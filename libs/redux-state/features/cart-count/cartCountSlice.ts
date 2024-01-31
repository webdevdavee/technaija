import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  cartCount: 0,
};

export const cartCount = createSlice({
  name: "cart-count",
  initialState,
  reducers: {
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
  },
});

export const cartCountState = (state: RootState) => state.cartCount;
export const { setCartCount } = cartCount.actions;
export default cartCount.reducer;
