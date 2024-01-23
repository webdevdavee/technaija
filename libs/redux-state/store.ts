import { configureStore } from "@reduxjs/toolkit";
import OverlayReducer from "./features/overlay/overSlice";
import SlideInCartReducer from "./features/slide-in-cart/slideInCart";
import ProductReducer from "./features/product/productSlice";
import QuickviewReducer from "./features/quickview/quickviewSlice";

export const store = configureStore({
  reducer: {
    overlay: OverlayReducer,
    theSlideInCart: SlideInCartReducer,
    product: ProductReducer,
    quickview: QuickviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
