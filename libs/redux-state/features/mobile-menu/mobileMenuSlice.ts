import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  openMobileMenu: false,
};

export const mobileMenu = createSlice({
  name: "mobile-menu",
  initialState,
  reducers: {
    setOpenMobileMenu: (state, action) => {
      state.openMobileMenu = action.payload;
    },
  },
});

export const mobileMenuState = (state: RootState) => state.mobileMenu;
export const { setOpenMobileMenu } = mobileMenu.actions;
export default mobileMenu.reducer;
