import { configureStore } from "@reduxjs/toolkit";
import OverlayReducer from "./features/overlay/overSlice";
import SlideInCartReducer from "./features/slide-in-cart/slideInCart";
import ProductReducer from "./features/product/productSlice";
import QuickviewReducer from "./features/quickview/quickviewSlice";
import CartCountReducer from "./features/cart-count/cartCountSlice";
import ShopFilterReducer from "./features/shop-filter/shopFilter";
import SlideInSearchReducer from "./features/slide-in-search/slideInSearch";
import CurrencyReducer from "./features/currency/currencySlice";
import MobileMenuReducer from "./features/mobile-menu/mobileMenuSlice";

export const store = configureStore({
  reducer: {
    overlay: OverlayReducer,
    theSlideInCart: SlideInCartReducer,
    product: ProductReducer,
    quickview: QuickviewReducer,
    cartCount: CartCountReducer,
    shopFilter: ShopFilterReducer,
    theSlideInSearch: SlideInSearchReducer,
    currency: CurrencyReducer,
    mobileMenu: MobileMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
