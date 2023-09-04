import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./slices/orders";

const store = configureStore({
  reducer: {
    orders: orderReducer,
  },
});

export default store;
