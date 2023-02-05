import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  discountList: null,
  isFetching: false,
  error: false
}

const discountSlice = createSlice({
  name: 'discount',
  initialState,
  reducers: {
    fetchDiscountStart: (state) => {
      state.isFetching = true;
    },
    fetchDiscountFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getDiscountSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.discountList = action.payload;
    },
    createDiscountSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.discountList = [...state.discountList, action.payload];
    },
    updateDiscountSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.discountList = state.discountList.map((discount) => {
        if (discount.id === action.payload.id) {
          return action.payload;
        }
        return discount;
      });
    },
    removeDiscountSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.discountList = state.discountList.filter(discount => discount.id !== action.payload);
    },
  },
});

export const {
  fetchDiscountStart,
  fetchDiscountFailed,
  getDiscountSuccess,
  createDiscountSuccess,
  updateDiscountSuccess,
  removeDiscountSuccess,
} = discountSlice.actions;

export default discountSlice.reducer;