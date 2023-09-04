import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalOrders: [],
  cancelledOrders: [],
  returnedOrders: [],
  deliveredOrders: [],
  pendingOrders: [],
  shippedOrders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      console.log(action.payload);
      state.totalOrders = action.payload;
      state.cancelledOrders = action.payload.filter(
        (order) => order.cancelled == true
      );
      state.returnedOrders = action.payload.filter(
        (order) => order.isReturned == true
      );
      state.deliveredOrders = action.payload.filter(
        (order) => !!order.delivered && !order.isReturned
      );
      state.pendingOrders = action.payload.filter(
        (order) => !order.shipped && !order.cancelled
      );
      state.shippedOrders = action.payload.filter(
        (order) => order.shipped && !order.delivered && !order.cancelled
      );
    },
  },
});

export const { setOrders } = orderSlice.actions;

export default orderSlice.reducer;
