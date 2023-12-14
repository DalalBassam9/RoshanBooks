import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../redux/cartSlice";

let initialCartItems = [];
if (typeof window !== "undefined") {
  initialCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
}

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
  preloadedState: {
    cart: {
      cartItems: initialCartItems,
      cartTotal: 0,
    },
  },
});

export default store;
