import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IProduct } from "@/libs/database/models/product.model";

const initialState = {
  product: {} as IProduct,
};

export const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const productState = (state: RootState) => state.product;
export const { setProduct } = product.actions;
export default product.reducer;
