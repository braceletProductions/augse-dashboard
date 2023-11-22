import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./slices/orders";
import productReducer from "./slices/products";
import uiReducer from "./slices/ui";
import authSlice from "./slices/auth";

const store = configureStore({
  reducer: {
    orders: orderReducer,
    products: productReducer,
    ui: uiReducer,
    auth: authSlice,
  },
});

export default store;
