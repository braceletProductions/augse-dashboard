import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./slices/orders";
import productReducer from "./slices/products";

const store = configureStore({
  reducer: {
    orders: orderReducer,
    products: productReducer,
  },
});

export default store;
