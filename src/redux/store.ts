import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import cartMiddleware from './cartMiddleware';
import {  Middleware } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import wishlistReducer from "./wishlistSlice";
import { AnyAction, Dispatch } from 'redux';

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