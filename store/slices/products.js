import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalProducts: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.totalProducts = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
