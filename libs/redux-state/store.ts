import { configureStore } from "@reduxjs/toolkit";
import OverlayReducer from "./features/overlay/overSlice";
import SlideInCartReducer from "./features/slide-in-cart/slideInCart";

export const store = configureStore({
  reducer: {
    overlay: OverlayReducer,
    theSlideInCart: SlideInCartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
