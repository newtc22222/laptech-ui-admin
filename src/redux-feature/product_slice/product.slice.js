import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: null,
  isFetching: false,
  error: false
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProductStart: (state) => {
      state.isFetching = true;
    },
    fetchProductFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.productList = action.payload;
    },
    createProductSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.productList = [...state.productList, action.payload];
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.productList = state.productList.map((product) => {
        if (product.id === action.payload.id) {
          return action.payload;
        }
        return product;
      });
    },
    removeProductSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.productList = state.productList.filter(product => product.id !== action.payload);
    },
  },
});

export const {
  fetchProductStart,
  fetchProductFailed,
  getProductSuccess,
  createProductSuccess,
  updateProductSuccess,
  removeProductSuccess,
} = productSlice.actions;

export default productSlice.reducer;