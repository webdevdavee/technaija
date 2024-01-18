import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  showSlideInCart: false,
};

export const slideInCart = createSlice({
  name: "slideincart",
  initialState,
  reducers: {
    setSlideInCart: (state, action) => {
      state.showSlideInCart = action.payload;
    },
  },
});

export const slideInCartState = (state: RootState) => state.theSlideInCart;
export const { setSlideInCart } = slideInCart.actions;
export default slideInCart.reducer;
