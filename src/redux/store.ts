import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { cartReducer } from "./cartSlice";
import  wishlistReducer  from "./wishlistSlice";

export const store = configureStore({
   reducer: {
      cart: cartReducer,
      user: userReducer,
      wishlist: wishlistReducer,
   },
});

// Export the reducer
export default store;