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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Export the reducer
export default store;